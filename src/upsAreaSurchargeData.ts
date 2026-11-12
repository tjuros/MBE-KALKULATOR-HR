// UPS global Extended Area workbook linked from the UPS Croatia rates page.
export type UpsAreaSurchargeLookup = "extended" | "remote" | "none" | "not-entered" | "city-check" | "not-loaded" | "load-error";

const postcodeCountries = new Set<string>(["AO","AR","AT","AU","BR","BY","CA","CD","CG","CH","CN","CR","CZ","DE","DK","ES","FI","FR","GB","GE","GR","GT","HR","HU","ID","IN","IT","JP","KZ","LK","LR","MR","MU","MX","MY","NL","NO","NP","NZ","OM","PH","PK","PL","PR","PT","QA","RO","RU","SE","SG","SI","SK","SM","TD","TH","TJ","TR","TW","UA","US","VN","YT","ZA"]);
const cityOnlyCountrySet = new Set<string>(["BN","BS","CL","CO","DO","EC","FJ","GP","GY","HN","HT","IQ","JM","KH","MP","MZ","NG","PA","PE","PF","SV","TT","VE"]);

type UpsAreaRangeMap = Record<string, readonly (readonly [string, string, 0 | 1])[]>;
let rangeData: UpsAreaRangeMap | null = null;
let loadPromise: Promise<void> | null = null;
let loadFailed = false;

export const hasUpsAreaSurchargePostcodeData = (countryIso: string) =>
  postcodeCountries.has(countryIso) || cityOnlyCountrySet.has(countryIso);

export const loadUpsAreaSurchargeData = async () => {
  if (rangeData) return;
  if (!loadPromise) {
    loadPromise = fetch("/upsAreaSurchargeRanges.json")
      .then((response) => {
        if (!response.ok) throw new Error("UPS area list unavailable");
        return response.json() as Promise<UpsAreaRangeMap>;
      })
      .then((data) => { rangeData = data; loadFailed = false; })
      .catch((error: unknown) => { loadFailed = true; loadPromise = null; throw error; });
  }
  await loadPromise;
};

const normalizePostalCode = (postalCode: string) => postalCode.toUpperCase().replace(/[^A-Z0-9]/g, "");

const comparePostalCodes = (left: string, right: string) => {
  if (/^\d+$/.test(left) && /^\d+$/.test(right)) {
    const normalizedLeft = left.replace(/^0+(?=\d)/, "");
    const normalizedRight = right.replace(/^0+(?=\d)/, "");
    if (normalizedLeft.length !== normalizedRight.length) return normalizedLeft.length - normalizedRight.length;
    return normalizedLeft.localeCompare(normalizedRight);
  }
  return left.localeCompare(right);
};

export const lookupUpsAreaSurcharge = (
  countryIso: string,
  postalCode: string,
  areaSurchargePossible = false,
): UpsAreaSurchargeLookup => {
  const code = normalizePostalCode(postalCode);
  if (!code) return areaSurchargePossible || hasUpsAreaSurchargePostcodeData(countryIso) ? "not-entered" : "none";
  if (!rangeData) return loadFailed ? "load-error" : "not-loaded";

  const ranges = rangeData[countryIso] ?? [];
  let low = 0;
  let high = ranges.length - 1;
  while (low <= high) {
    const middle = (low + high) >> 1;
    const [rangeStart, rangeEnd, kind] = ranges[middle];
    if (comparePostalCodes(code, rangeStart) < 0) high = middle - 1;
    else if (comparePostalCodes(code, rangeEnd) > 0) low = middle + 1;
    else return kind === 1 ? "remote" : "extended";
  }

  if (cityOnlyCountrySet.has(countryIso) || (areaSurchargePossible && !postcodeCountries.has(countryIso))) return "city-check";
  return "none";
};
