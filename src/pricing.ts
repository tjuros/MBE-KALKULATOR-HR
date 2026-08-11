import {
  INTIME_ZONE_BY_PLACE,
  INTIME_ZONE_BY_POSTAL,
  OVERSEAS_CARGO_BY_PLACE,
  OVERSEAS_CARGO_BY_POSTAL,
  PLACE_OPTIONS_BY_POSTAL,
} from "./destinationRules";

export type NumericPackageItem = {
  weight: number;
  length: number;
  width: number;
  height: number;
};

export type CarrierStatus = "ok" | "surcharge" | "manual" | "no";
export type ServiceType = "MBE Economy" | "MBE Express" | "MBE Paketomati";

export type AdditionalServices = {
  documentReturn: boolean;
  addresseeOnly: boolean;
  specialHandling: boolean;
};

export type PricingInput = {
  postalCode: string;
  destinationPlace: string;
  packages: NumericPackageItem[];
  cod: boolean;
  codAmount: number;
  shippingDate: string;
  additionalServices: AdditionalServices;
};

export type PriceResult = {
  id: string;
  name: string;
  carrier: string;
  price: number | null;
  possible: boolean;
  details: string[];
  serviceType: ServiceType;
  warning?: string;
  status: CarrierStatus;
};

export type PricingResults = {
  economy: PriceResult[];
  express: PriceResult[];
  lockers: PriceResult[];
  economyWinner: PriceResult | null;
  expressWinner: PriceResult | null;
  lockerWinner: PriceResult | null;
  overallWinner: PriceResult | null;
};

type Tier = { max: number; price: number };
type Zone = 1 | 2 | 3;

const GLS_SINGLE: Tier[] = [
  { max: 2, price: 3.62 }, { max: 3, price: 3.62 }, { max: 5, price: 3.62 },
  { max: 10, price: 4.79 }, { max: 15, price: 5.47 }, { max: 20, price: 6.38 },
  { max: 25, price: 7.51 }, { max: 30, price: 8.86 }, { max: 40, price: 9.99 },
];

const GLS_MULTI_2_4: Tier[] = [
  { max: 2, price: 2.64 }, { max: 3, price: 2.84 }, { max: 5, price: 2.96 },
  { max: 10, price: 3.75 }, { max: 15, price: 4.81 }, { max: 20, price: 5.59 },
  { max: 25, price: 6.41 }, { max: 30, price: 7.9 }, { max: 40, price: 8.75 },
];

const GLS_MULTI_5_PLUS: Tier[] = [
  { max: 2, price: 2.31 }, { max: 3, price: 2.54 }, { max: 5, price: 2.67 },
  { max: 10, price: 3.48 }, { max: 15, price: 4.47 }, { max: 20, price: 5.24 },
  { max: 25, price: 6.08 }, { max: 30, price: 7.31 }, { max: 40, price: 8.52 },
];

const DPD_SINGLE: Tier[] = [
  { max: 2, price: 2.39 }, { max: 5, price: 2.47 }, { max: 15, price: 3.05 },
  { max: 25, price: 3.89 }, { max: 31.5, price: 5.44 },
];

const HP_PARCEL: Tier[] = [
  { max: 5, price: 2.2 }, { max: 10, price: 2.8 }, { max: 15, price: 3.3 },
  { max: 20, price: 4.05 }, { max: 30, price: 5.45 },
];

const OVERSEAS_SINGLE: Tier[] = [
  { max: 10, price: 2.61 }, { max: 20, price: 3.24 }, { max: 31.5, price: 3.52 },
];

const OVERSEAS_MULTI: Tier[] = [
  { max: 5, price: 2.63 }, { max: 10, price: 2.84 }, { max: 20, price: 4.17 },
  { max: 30, price: 5.4 }, { max: 40, price: 6.31 }, { max: 50, price: 7.81 },
  { max: 60, price: 8.74 }, { max: 70, price: 10.09 }, { max: 80, price: 11.8 },
  { max: 90, price: 13.21 }, { max: 100, price: 14.56 },
];

const INTIME: Record<Zone, Tier[]> = {
  1: [
    { max: 2, price: 3.9 }, { max: 5, price: 4.47 }, { max: 10, price: 5.57 }, { max: 15, price: 6.69 },
    { max: 20, price: 7.79 }, { max: 25, price: 10.03 }, { max: 30, price: 11.29 }, { max: 35, price: 13.8 },
    { max: 40, price: 16.29 }, { max: 45, price: 21.9 }, { max: 50, price: 24.6 }, { max: 60, price: 27.3 },
    { max: 70, price: 30.2 }, { max: 80, price: 33.2 }, { max: 90, price: 36.17 }, { max: 100, price: 39.12 },
    { max: 150, price: 44.07 }, { max: 200, price: 49.9 }, { max: 250, price: 54.8 }, { max: 300, price: 59.7 },
    { max: 350, price: 64.6 }, { max: 400, price: 74.5 }, { max: 450, price: 84.3 }, { max: 500, price: 94.2 },
    { max: 600, price: 109.8 }, { max: 700, price: 124.5 }, { max: 800, price: 139.1 }, { max: 900, price: 154.8 },
    { max: 1000, price: 169.3 }, { max: 1500, price: 239.6 }, { max: 2000, price: 309.9 },
    { max: 2500, price: 379.1 }, { max: 3000, price: 449.4 },
  ],
  2: [
    { max: 2, price: 4.47 }, { max: 5, price: 5.57 }, { max: 10, price: 6.69 }, { max: 15, price: 7.79 },
    { max: 20, price: 10.03 }, { max: 25, price: 13.8 }, { max: 30, price: 15.06 }, { max: 35, price: 17.56 },
    { max: 40, price: 20.7 }, { max: 45, price: 27.4 }, { max: 50, price: 32.9 }, { max: 60, price: 37.4 },
    { max: 70, price: 42.1 }, { max: 80, price: 47.9 }, { max: 90, price: 52.8 }, { max: 100, price: 57.7 },
    { max: 150, price: 64.6 }, { max: 200, price: 71.5 }, { max: 250, price: 78.5 }, { max: 300, price: 85.3 },
    { max: 350, price: 92.1 }, { max: 400, price: 102.9 }, { max: 450, price: 112.8 }, { max: 500, price: 122.7 },
    { max: 600, price: 137.3 }, { max: 700, price: 152.1 }, { max: 800, price: 167.5 }, { max: 900, price: 182.1 },
    { max: 1000, price: 197.8 }, { max: 1500, price: 267.6 }, { max: 2000, price: 337.2 },
    { max: 2500, price: 407.2 }, { max: 3000, price: 477.4 },
  ],
  3: [
    { max: 2, price: 8.61 }, { max: 5, price: 10.33 }, { max: 10, price: 12.05 }, { max: 15, price: 14.56 },
    { max: 20, price: 17.2 }, { max: 25, price: 18.93 }, { max: 30, price: 20.65 }, { max: 35, price: 25.15 },
    { max: 40, price: 29.13 }, { max: 45, price: 35.8 }, { max: 50, price: 40.1 }, { max: 60, price: 45.2 },
    { max: 70, price: 50.1 }, { max: 80, price: 55.2 }, { max: 90, price: 60.2 }, { max: 100, price: 65.4 },
    { max: 150, price: 80.4 }, { max: 200, price: 95.4 }, { max: 250, price: 110.1 }, { max: 300, price: 125.6 },
    { max: 350, price: 140.7 }, { max: 400, price: 155.9 }, { max: 450, price: 170.1 }, { max: 500, price: 185.6 },
    { max: 600, price: 225.8 }, { max: 700, price: 265.6 }, { max: 800, price: 305.5 }, { max: 900, price: 345.7 },
    { max: 1000, price: 385.9 }, { max: 1500, price: 465.7 }, { max: 2000, price: 545.4 },
    { max: 2500, price: 625.2 }, { max: 3000, price: 705.1 },
  ],
};

const ISLAND_POSTALS = new Set([
  "20221", "20222", "20223", "20224", "20225", "20226", "20289", "20290",
  "20260", "20263", "20264", "20267", "20269", "20270", "20271", "20272", "20273", "20274", "20275",
  "21225", "21400", "21403", "21404", "21405", "21410", "21412", "21413", "21420", "21423", "21424",
  "21425", "21426", "21430", "21432", "21450", "21454", "21460", "21462", "21463", "21465", "21466",
  "21467", "21468", "21469", "21480", "21483", "21485", "22232", "22233", "22234", "22235", "22236",
  "23262", "23263", "23264", "23271", "23272", "23273", "23274", "23281", "23282", "23283", "23284", "23285", "23286", "23287", "23291", "23292", "23293", "23294",
  "23295", "23296", "51280", "51281", "51550", "51551", "51552", "51554", "51555", "51557", "51561", "51562",
]);

const BRIDGE_ISLAND_POSTALS = new Set([
  "51500", "51511", "51512", "51513", "51514", "51515", "51516", "51517",
  "23234", "23250", "53291", "21220", "21223", "22243",
]);

const GLS_SPECIAL_POSTALS = new Set([
  "20221", "20222", "20223", "20224", "20225", "20226", "20290", "21225", "21430", "21432",
  "22232", "22233", "22234", "22235", "22236", "23281", "23282", "23283", "23284", "23285",
  "23286", "23287", "23291", "23292", "23293", "23294", "23295", "23296", "51552", "51561", "51562",
]);

const LAGERMAX_DELIVERABLE_ISLANDS = new Set([
  "51500", "51511", "51512", "51513", "51514", "51515", "51516", "51517",
  "20260", "20263", "20264", "20267", "20269", "20270", "20271", "20272", "20273", "20274", "20275",
  "21400", "21403", "21404", "21405", "21410", "21412", "21413", "21420", "21423", "21424", "21425", "21426",
  "21430", "21432", "21450", "21454", "21460", "21462", "21463", "21465", "21466", "21467", "21468", "21469",
  "21480", "21483", "21485", "23262", "23263", "23264", "23271", "23272", "23273", "23274",
  "51280", "51281", "51550", "51551", "51552", "51554", "51555", "51557", "51561", "51562",
]);

const OVERSEAS_REMOTE_POSTALS = new Set([
  "20000", "20205", "20207", "20210", "20213", "20215", "20216", "20217", "20218",
  "20231", "20232", "20233", "20234", "20235", "20236",
]);

const INTIME_POSTAL_ZONES = INTIME_ZONE_BY_POSTAL as Record<string, 0 | Zone>;
const INTIME_PLACE_ZONES = INTIME_ZONE_BY_PLACE as Record<string, Record<string, 0 | Zone>>;
const OVERSEAS_POSTAL_CARGO = OVERSEAS_CARGO_BY_POSTAL as Record<string, 0 | 1 | 2>;
const OVERSEAS_PLACE_CARGO = OVERSEAS_CARGO_BY_PLACE as Record<string, Record<string, 0 | 1 | 2>>;
const PLACE_OPTIONS = PLACE_OPTIONS_BY_POSTAL as Record<string, readonly string[]>;

const round2 = (value: number) => Math.round((value + Number.EPSILON) * 100) / 100;
const totalWeight = (items: NumericPackageItem[]) => items.reduce((sum, item) => sum + item.weight, 0);
const totalVolume = (items: NumericPackageItem[]) => items.reduce((sum, item) => sum + item.length * item.width * item.height, 0);
const volumeWeightInTime = (items: NumericPackageItem[]) => totalVolume(items) / 5000;
const tierPrice = (table: Tier[], value: number) => table.find((tier) => value <= tier.max)?.price ?? null;

const normalizePlace = (value: string) => value
  .normalize("NFD")
  .replace(/[\u0300-\u036f]/g, "")
  .trim()
  .toLocaleUpperCase("hr-HR");

const dimensions = (item: NumericPackageItem) => {
  const sorted = [item.length, item.width, item.height].sort((a, b) => b - a);
  return {
    longest: sorted[0],
    middle: sorted[1],
    shortest: sorted[2],
    girth: sorted[0] + 2 * (sorted[1] + sorted[2]),
    sum: sorted[0] + sorted[1] + sorted[2],
  };
};

const fitsDimensions = (item: NumericPackageItem, limits: [number, number, number]) => {
  const itemSides = [item.length, item.width, item.height].sort((a, b) => a - b);
  const limitSides = [...limits].sort((a, b) => a - b);
  return itemSides.every((side, index) => side <= limitSides[index]);
};

const isIsland = (postalCode: string) => ISLAND_POSTALS.has(postalCode);
const isAnyIsland = (postalCode: string) => ISLAND_POSTALS.has(postalCode) || BRIDGE_ISLAND_POSTALS.has(postalCode);
const isOverseasRemote = (postalCode: string) => postalCode.startsWith("20") || isIsland(postalCode) || OVERSEAS_REMOTE_POSTALS.has(postalCode);

const unavailable = (
  id: string,
  name: string,
  carrier: string,
  serviceType: ServiceType,
  reason: string,
  status: CarrierStatus = "no",
): PriceResult => ({
  id,
  name,
  carrier,
  price: null,
  possible: false,
  details: [reason],
  serviceType,
  warning: reason,
  status,
});

type AddOnRates = Partial<Record<keyof AdditionalServices, number>>;

const addOptionalServices = (
  amount: number,
  input: PricingInput,
  rates: AddOnRates,
  details: string[],
) => {
  const labels: Record<keyof AdditionalServices, string> = {
    documentReturn: "povrat ovjerenog dokumenta",
    addresseeOnly: "osobno uručenje",
    specialHandling: "posebno rukovanje",
  };

  let nextAmount = amount;
  for (const key of Object.keys(input.additionalServices) as Array<keyof AdditionalServices>) {
    if (!input.additionalServices[key]) continue;
    const rate = rates[key];
    if (rate === undefined) return { amount: nextAmount, unsupported: labels[key] };
    nextAmount += rate;
    details.push(`${labels[key]} +${rate.toFixed(2)} €`);
  }
  return { amount: nextAmount, unsupported: null };
};

type Group = { count: number; weight: number; base: number };

const optimizeOrderedGroups = (
  items: NumericPackageItem[],
  maxWeight: number,
  maxCount: number,
  groupPrice: (weight: number) => number | null,
): Group[] | null => {
  const weights = [...items].map((item) => item.weight).sort((a, b) => b - a);
  const n = weights.length;
  const costs = Array(n + 1).fill(Infinity) as number[];
  const choices = Array(n).fill(0) as number[];
  costs[n] = 0;

  for (let index = n - 1; index >= 0; index -= 1) {
    let weight = 0;
    for (let end = index; end < Math.min(n, index + maxCount); end += 1) {
      weight += weights[end];
      if (weight > maxWeight) break;
      const base = groupPrice(weight);
      if (base === null) continue;
      const candidate = base + costs[end + 1];
      if (candidate < costs[index] - 1e-9) {
        costs[index] = candidate;
        choices[index] = end + 1;
      }
    }
  }

  if (!Number.isFinite(costs[0])) return null;
  const groups: Group[] = [];
  for (let index = 0; index < n;) {
    const next = choices[index];
    const weight = weights.slice(index, next).reduce((sum, value) => sum + value, 0);
    const base = groupPrice(weight);
    if (base === null || next <= index) return null;
    groups.push({ count: next - index, weight, base });
    index = next;
  }
  return groups;
};

export const getPlaceOptions = (postalCode: string) => PLACE_OPTIONS[postalCode] ?? [];

export const resolveInTimeZone = (postalCode: string, destinationPlace: string): Zone | null => {
  const postalZone = INTIME_POSTAL_ZONES[postalCode];
  if ([1, 2, 3].includes(postalZone)) return postalZone as Zone;
  if (postalZone !== 0 || !destinationPlace) return null;
  const placeZone = INTIME_PLACE_ZONES[postalCode]?.[normalizePlace(destinationPlace)];
  return [1, 2, 3].includes(placeZone) ? placeZone as Zone : null;
};

const resolveOverseasCargo = (postalCode: string, destinationPlace: string): 0 | 1 | 2 | undefined => {
  const postalStatus = OVERSEAS_POSTAL_CARGO[postalCode];
  if (postalStatus !== 2) return postalStatus;
  if (!destinationPlace) return 2;
  return OVERSEAS_PLACE_CARGO[postalCode]?.[normalizePlace(destinationPlace)] ?? 2;
};

export const calcGLS = (input: PricingInput): PriceResult => {
  const { packages, postalCode } = input;
  const special = GLS_SPECIAL_POSTALS.has(postalCode);
  const serviceType: ServiceType = "MBE Express";
  const id = "gls-express";

  for (const item of packages) {
    const size = dimensions(item);
    const overLimit = special
      ? item.weight > 10 || size.longest > 150 || size.girth > 300
      : item.weight > 40 || size.longest > 200 || size.girth > 300;
    if (overLimit) {
      return unavailable(id, "GLS", "GLS", serviceType, special
        ? "Posebno područje: najviše 10 kg, duljina 150 cm i opseg 300 cm po paketu."
        : "Izvan GLS standarda (40 kg, duljina 200 cm ili opseg 300 cm); potrebna je ručna potvrda.", "manual");
    }
  }

  const table = packages.length === 1 ? GLS_SINGLE : packages.length <= 4 ? GLS_MULTI_2_4 : GLS_MULTI_5_PLUS;
  let base = 0;
  for (const item of packages) {
    const itemPrice = special ? (item.weight <= 5 ? 20.81 : 21.99) : tierPrice(table, item.weight);
    if (itemPrice === null) return unavailable(id, "GLS", "GLS", serviceType, "Nema tarife za unesenu težinu.");
    base += itemPrice;
  }

  const fuel = 0.42 * packages.length;
  const sms = 0.12;
  const codFee = input.cod ? 0.49 : 0;
  const details = [
    `${packages.length === 1 ? "single" : packages.length <= 4 ? "multi 2–4" : "multi 5+"}: ${base.toFixed(2)} €`,
    `gorivo ${packages.length} × 0,42 € = ${fuel.toFixed(2)} €`,
    "SMS za cijelu pošiljku +0,12 €",
  ];
  if (special) details.push("GLS posebno dostavno područje");
  if (input.cod) details.push("COD +0,49 €");

  const optional = addOptionalServices(base + fuel + sms + codFee, input, {
    documentReturn: 2.46,
    addresseeOnly: 2.5,
    specialHandling: 2.52,
  }, details);
  if (optional.unsupported) return unavailable(id, "GLS", "GLS", serviceType, `GLS: ${optional.unsupported} nije ugovoreno.`);

  return {
    id,
    name: "GLS",
    carrier: "GLS",
    price: round2(optional.amount),
    possible: true,
    details,
    serviceType,
    status: special || input.cod || Object.values(input.additionalServices).some(Boolean) ? "surcharge" : "ok",
  };
};

export const calcDPD = (input: PricingInput): PriceResult => {
  const { packages, postalCode } = input;
  const id = "dpd-standard";
  const serviceType: ServiceType = "MBE Economy";
  for (const item of packages) {
    const size = dimensions(item);
    if (item.weight > 31.5 || size.longest > 175 || size.girth > 300) {
      return unavailable(id, "DPD", "DPD", serviceType, "Izvan DPD standarda; nestandardne dimenzije ili masa zahtijevaju prethodni dogovor.", "manual");
    }
  }
  if (input.cod && input.codAmount > 2500) return unavailable(id, "DPD", "DPD", serviceType, "DPD gotovinska otkupnina može biti najviše 2.500 €.");

  const base = packages.length >= 2
    ? 2.89 * packages.length
    : tierPrice(DPD_SINGLE, packages[0].weight);
  if (base === null) return unavailable(id, "DPD", "DPD", serviceType, "Nema tarife za unesenu težinu.");
  const fuel = 0.4 * packages.length;
  const island = isIsland(postalCode) ? 3.5 * packages.length : 0;
  const details = [
    packages.length >= 2 ? `DPD Multi ${packages.length} × 2,89 € = ${base.toFixed(2)} €` : `osnovna tarifa ${base.toFixed(2)} €`,
    `gorivo ${packages.length} × 0,40 € = ${fuel.toFixed(2)} €`,
  ];
  if (island) details.push(`otočna nadoplata ${packages.length} × 3,50 € = ${island.toFixed(2)} €`);
  if (input.cod) details.push("gotovinski COD uključen");
  const optional = addOptionalServices(base + fuel + island, input, {
    documentReturn: 1.83,
    addresseeOnly: 1.83,
    specialHandling: 8,
  }, details);
  if (optional.unsupported) return unavailable(id, "DPD", "DPD", serviceType, `DPD: ${optional.unsupported} nije ugovoreno.`);

  return {
    id,
    name: packages.length >= 2 ? "DPD Multi" : "DPD",
    carrier: "DPD",
    price: round2(optional.amount),
    possible: true,
    details,
    serviceType,
    status: island || Object.values(input.additionalServices).some(Boolean) ? "surcharge" : "ok",
  };
};

const hpGroupPrice = (weight: number) => {
  if (weight <= 30) return tierPrice(HP_PARCEL, weight);
  if (weight > 100) return null;
  return 5.45 + Math.ceil((weight - 30) / 5);
};

export const calcHPParcel = (input: PricingInput): PriceResult => {
  const id = "hp-paket24";
  const serviceType: ServiceType = "MBE Economy";
  for (const item of input.packages) {
    const size = dimensions(item);
    if (item.weight > 30 || size.longest > 60 || size.sum > 180) {
      return unavailable(id, "HP Paket24", "HP", serviceType, "Paket24: najviše 30 kg po paketu, najdulja stranica 60 cm i zbroj stranica 180 cm.");
    }
  }
  const groups = optimizeOrderedGroups(input.packages, 100, 10, hpGroupPrice);
  if (!groups) return unavailable(id, "HP Paket24", "HP", serviceType, "Pošiljku nije moguće rasporediti unutar 100 kg i 10 paketa po skupnoj pošiljci.");
  const base = groups.reduce((sum, group) => sum + group.base, 0);
  const codFee = input.cod ? 0.5 * groups.length : 0;
  const details = groups.map((group, index) => `skupina ${index + 1}: ${group.count} pak. / ${group.weight.toFixed(2)} kg = ${group.base.toFixed(2)} €`);
  if (input.cod) details.push(`COD ${groups.length} × 0,50 € = ${codFee.toFixed(2)} €`);
  const optional = addOptionalServices(base + codFee, input, {
    documentReturn: 1.59,
    addresseeOnly: 1.06,
    specialHandling: 2.07,
  }, details);
  if (optional.unsupported) return unavailable(id, "HP Paket24", "HP", serviceType, `HP: ${optional.unsupported} nije ugovoreno.`);
  return {
    id,
    name: "HP Paket24",
    carrier: "HP",
    price: round2(optional.amount),
    possible: true,
    details,
    serviceType,
    status: groups.length > 1 || input.cod || Object.values(input.additionalServices).some(Boolean) ? "surcharge" : "ok",
    warning: groups.length > 1 ? `Potrebno je otvoriti ${groups.length} odvojene skupne pošiljke.` : undefined,
  };
};

const getHpPalletZone = (postalCode: string): 1 | 2 | 3 | 4 | 5 | 6 | null => {
  if (isAnyIsland(postalCode)) return 6;
  if (["10000", "10010", "10020", "10040", "10090"].includes(postalCode)) return 1;
  const value = Number(postalCode);
  if (!Number.isFinite(value)) return null;
  if ((value >= 10000 && value <= 10999) || (value >= 40000 && value <= 49999)) return 2;
  if ((value >= 31000 && value <= 35999) || (value >= 51000 && value <= 53999)) return 3;
  if (value >= 21000 && value <= 23999) return 4;
  if (value >= 20000 && value <= 20999) return 5;
  return null;
};

export const calcHPPallet = (input: PricingInput): PriceResult => {
  const id = "hp-paleta";
  const serviceType: ServiceType = "MBE Economy";
  if (input.packages.length < 2 && totalWeight(input.packages) <= 30) {
    return unavailable(id, "HP Paleta", "HP", serviceType, "Paletna opcija prikazuje se za višekolične ili teže pošiljke.");
  }
  if (input.cod || Object.values(input.additionalServices).some(Boolean)) {
    return unavailable(id, "HP Paleta", "HP", serviceType, "Dodatne usluge za paletiziranu pošiljku nisu navedene u dostavljenoj ponudi.", "manual");
  }
  if (!input.packages.every((item) => fitsDimensions(item, [120, 80, 165]))) {
    return unavailable(id, "HP Paleta", "HP", serviceType, "Najmanje jedan paket nije moguće smjestiti na EURO paletu 120 × 80 × 180 cm.");
  }
  const estimatedWeight = totalWeight(input.packages) + 25;
  if (estimatedWeight > 500 || totalVolume(input.packages) > 120 * 80 * 165) {
    return unavailable(id, "HP Paleta", "HP", serviceType, "Procijenjena masa s paletom prelazi 500 kg ili ukupni volumen prelazi jednu EURO paletu.", "manual");
  }
  const zone = getHpPalletZone(input.postalCode);
  const rates: Record<1 | 2 | 3 | 4 | 5 | 6, number> = { 1: 30.56, 2: 49.04, 3: 55.04, 4: 70, 5: 90, 6: 90 };
  if (!zone) return unavailable(id, "HP Paleta", "HP", serviceType, "HP paletna zona nije određena za uneseni poštanski broj.", "manual");
  return {
    id,
    name: "HP Paleta (procjena)",
    carrier: "HP",
    price: rates[zone],
    possible: true,
    details: [
      `HP paletna zona ${zone}: ${rates[zone].toFixed(2)} €`,
      `procijenjena masa s EURO paletom: ${estimatedWeight.toFixed(2)} kg`,
      "rok D+5; preuzimanje, 3 SMS-a i e-mail uključeni",
    ],
    serviceType,
    status: "surcharge",
    warning: "Procjena pretpostavlja da sva roba fizički stane na jednu pravilno složenu EURO paletu; potvrditi pakiranje i konačnu masu.",
  };
};

export const calcOverseasSingle = (input: PricingInput): PriceResult => {
  const id = "overseas-single";
  const serviceType: ServiceType = "MBE Economy";
  if (input.packages.length !== 1) return unavailable(id, "Overseas single", "Overseas", serviceType, "Single vrijedi samo za jedan paket.");
  const item = input.packages[0];
  const size = dimensions(item);
  if (item.weight > 31.5 || size.longest > 100 || size.girth > 340) {
    return unavailable(id, "Overseas single", "Overseas", serviceType, "Izvan Overseas standarda (31,5 kg, duljina 100 cm ili opseg 340 cm); potrebna je potvrda.", "manual");
  }
  const base = tierPrice(OVERSEAS_SINGLE, item.weight);
  if (base === null) return unavailable(id, "Overseas single", "Overseas", serviceType, "Nema tarife za unesenu težinu.");
  const fuel = base * 0.06;
  const remote = isOverseasRemote(input.postalCode) ? base * 0.2 : 0;
  const codFee = input.cod ? 0.3 : 0;
  const details = [`osnovna tarifa ${base.toFixed(2)} €`, `gorivo 6% = ${fuel.toFixed(2)} €`];
  if (remote) details.push(`otok / posebni režim 20% = ${remote.toFixed(2)} €`);
  if (input.cod) details.push("COD +0,30 €");
  const optional = addOptionalServices(base + fuel + remote + codFee, input, {
    documentReturn: 0.53,
    addresseeOnly: 0,
  }, details);
  if (optional.unsupported) return unavailable(id, "Overseas single", "Overseas", serviceType, `Overseas: ${optional.unsupported} nema ugovorenu cijenu.`, "manual");
  return {
    id,
    name: "Overseas single",
    carrier: "Overseas",
    price: round2(optional.amount),
    possible: true,
    details,
    serviceType,
    status: remote || input.cod || Object.values(input.additionalServices).some(Boolean) ? "surcharge" : "ok",
  };
};

export const calcOverseasMulti = (input: PricingInput): PriceResult => {
  const id = "overseas-multi";
  const serviceType: ServiceType = "MBE Economy";
  if (input.packages.length < 2) return unavailable(id, "Overseas multi", "Overseas", serviceType, "Multi vrijedi za najmanje dva paketa.");
  const cargo = resolveOverseasCargo(input.postalCode, input.destinationPlace);
  if (cargo === 0) return unavailable(id, "Overseas multi", "Overseas", serviceType, "Cargo/Multi dostava nije dostupna za odabrano odredište.");
  if (cargo === 2 || cargo === undefined) return unavailable(id, "Overseas multi", "Overseas", serviceType, "Za Overseas Multi treba odabrati točno mjesto ili ručno potvrditi Cargo dostupnost.", "manual");
  for (const item of input.packages) {
    const size = dimensions(item);
    if (item.weight > 31.5 || size.longest > 100 || size.girth > 340) {
      return unavailable(id, "Overseas multi", "Overseas", serviceType, "Najmanje jedan paket je izvan Overseas standarda; potrebna je ručna potvrda.", "manual");
    }
  }
  const weight = totalWeight(input.packages);
  if (weight > 500) return unavailable(id, "Overseas multi", "Overseas", serviceType, "Ulazna Multi matrica potvrđena je do 500 kg ukupno.", "manual");
  const base = weight <= 100 ? tierPrice(OVERSEAS_MULTI, weight) : 14.56 + Math.ceil(weight - 100) * 0.25;
  if (base === null) return unavailable(id, "Overseas multi", "Overseas", serviceType, "Nema tarife za unesenu težinu.");
  const fuel = base * 0.06;
  const remote = isOverseasRemote(input.postalCode) ? base * 0.2 : 0;
  const codFee = input.cod ? 0.3 : 0;
  const details = [`osnovna Multi tarifa ${base.toFixed(2)} €`, `gorivo 6% = ${fuel.toFixed(2)} €`];
  if (remote) details.push(`otok / posebni režim 20% = ${remote.toFixed(2)} €`);
  if (input.cod) details.push("COD +0,30 €");
  const optional = addOptionalServices(base + fuel + remote + codFee, input, {
    documentReturn: 0.53,
    addresseeOnly: 0,
  }, details);
  if (optional.unsupported) return unavailable(id, "Overseas multi", "Overseas", serviceType, `Overseas: ${optional.unsupported} nema ugovorenu cijenu.`, "manual");
  return {
    id,
    name: "Overseas multi",
    carrier: "Overseas",
    price: round2(optional.amount),
    possible: true,
    details,
    serviceType,
    status: remote || input.cod || Object.values(input.additionalServices).some(Boolean) ? "surcharge" : "ok",
  };
};

export const calcInTime = (input: PricingInput): PriceResult => {
  const id = "intime";
  const serviceType: ServiceType = "MBE Economy";
  const zone = resolveInTimeZone(input.postalCode, input.destinationPlace);
  if (!zone) return unavailable(id, "InTime", "InTime", serviceType, "InTime zona nije jednoznačna; odaberi točno mjesto ili provjeri odredište.", "manual");
  for (const item of input.packages) {
    const size = dimensions(item);
    if (item.weight > 35 || !fitsDimensions(item, [135, 60, 60]) || size.girth > 375) {
      return unavailable(id, "InTime", "InTime", serviceType, "Nestandardna InTime pošiljka zahtijeva prethodni dogovor; standard je 35 kg i 135 × 60 × 60 cm po koletu.", "manual");
    }
  }
  if (input.cod && input.codAmount > 2500) return unavailable(id, "InTime", "InTime", serviceType, "Gotovinska otkupnina može biti najviše 2.500 €.");
  const actual = totalWeight(input.packages);
  const volumetric = volumeWeightInTime(input.packages);
  const chargeable = Math.max(actual, volumetric);
  if (chargeable > 3000) return unavailable(id, "InTime", "InTime", serviceType, "Iznad 3.000 kg obračun dodatnih 100 kg treba ručno potvrditi.", "manual");
  const base = tierPrice(INTIME[zone], chargeable);
  if (base === null) return unavailable(id, "InTime", "InTime", serviceType, "Nema tarife za obračunsku masu.");
  const fuel = base * 0.15;
  const month = Number(input.shippingDate.slice(5, 7));
  const seasonal = month === 11 || month === 12 ? base * 0.15 : 0;
  const codFee = input.cod ? Math.max(1, input.codAmount * 0.01) : 0;
  const details = [
    `InTime zona ${zone}; obračunska masa ${chargeable.toFixed(2)} kg`,
    `stvarna ${actual.toFixed(2)} kg / volumenska ${volumetric.toFixed(2)} kg`,
    `osnovna tarifa ${base.toFixed(2)} €`,
    `fiksno gorivo 15% = ${fuel.toFixed(2)} €`,
  ];
  if (seasonal) details.push(`sezonski dodatak 15% = ${seasonal.toFixed(2)} €`);
  if (input.cod) details.push(`COD 1%, min 1,00 € = ${codFee.toFixed(2)} €`);
  const optional = addOptionalServices(base + fuel + seasonal + codFee, input, {
    documentReturn: 10,
    addresseeOnly: 2.55,
  }, details);
  if (optional.unsupported) return unavailable(id, "InTime", "InTime", serviceType, `InTime: ${optional.unsupported} nema izravno primjenjivu ugovorenu cijenu.`, "manual");
  return {
    id,
    name: "InTime",
    carrier: "InTime",
    price: round2(optional.amount),
    possible: true,
    details,
    serviceType,
    status: seasonal || input.cod || Object.values(input.additionalServices).some(Boolean) ? "surcharge" : "ok",
    warning: zone === 3 ? "Moguća je dodatna naknada 8,00 € kada InTime koristi drugog pružatelja; popis tih odredišta nije dostavljen i iznos nije automatski dodan." : undefined,
  };
};

const getLagermaxZone = (postalCode: string): Zone | null => {
  const value = Number(postalCode);
  if (!Number.isFinite(value)) return null;
  if ((value >= 10000 && value <= 10999) || (value >= 49000 && value <= 49290) || (value >= 40000 && value <= 48999) || (value >= 51000 && value <= 51999)) return 1;
  if ((value >= 53000 && value <= 53999) || (value >= 31000 && value <= 35999) || (value >= 52000 && value <= 52999) || (value >= 23000 && value <= 23999) || (value >= 21000 && value <= 22999)) return 2;
  if (value >= 20000 && value <= 20999) return 3;
  return null;
};

const lagermaxBase = (zone: Zone, weight: number) => {
  const rates: Record<Zone, Tier[]> = {
    1: [{ max: 5, price: 10 }, { max: 20, price: 20 }, { max: 50, price: 24 }, { max: 80, price: 28 }],
    2: [{ max: 5, price: 13 }, { max: 20, price: 22 }, { max: 50, price: 29 }, { max: 80, price: 35 }],
    3: [{ max: 5, price: 16 }, { max: 20, price: 30 }, { max: 50, price: 40 }, { max: 80, price: 60 }],
  };
  return tierPrice(rates[zone], weight);
};

export const calcLagermax = (input: PricingInput): PriceResult => {
  const id = "lagermax";
  const serviceType: ServiceType = "MBE Economy";
  if (input.cod || Object.values(input.additionalServices).some(Boolean)) {
    return unavailable(id, "Lagermax", "Lagermax", serviceType, "COD i odabrane dodatne usluge nisu navedeni u Lagermax ponudi.");
  }
  const zone = getLagermaxZone(input.postalCode);
  if (!zone) return unavailable(id, "Lagermax", "Lagermax", serviceType, "Odredište nije pokriveno dostavljenom Lagermax zonskom tablicom.", "manual");
  const anyIsland = isAnyIsland(input.postalCode);
  if (anyIsland && !LAGERMAX_DELIVERABLE_ISLANDS.has(input.postalCode)) {
    return unavailable(id, "Lagermax", "Lagermax", serviceType, "Otok nije naveden u Lagermax rasporedu dostave; Dugi otok nije pokriven.", "manual");
  }
  for (const item of input.packages) {
    if (item.weight > 35 || dimensions(item).longest > 250) {
      return unavailable(id, "Lagermax", "Lagermax", serviceType, "Lagermax: najviše 35 kg i 250 cm duljine po paketu.");
    }
  }
  const groups = optimizeOrderedGroups(input.packages, 80, input.packages.length, (weight) => lagermaxBase(zone, weight));
  if (!groups) return unavailable(id, "Lagermax", "Lagermax", serviceType, "Pošiljku nije moguće rasporediti u pošiljke do 80 kg.");
  const base = groups.reduce((sum, group) => sum + group.base, 0);
  const fuel = base * 0.066;
  const island = anyIsland ? base * 0.5 : 0;
  const details = groups.map((group, index) => `pošiljka ${index + 1}: ${group.count} pak. / ${group.weight.toFixed(2)} kg = ${group.base.toFixed(2)} €`);
  details.push(`gorivo 6,6% = ${fuel.toFixed(2)} €`);
  if (island) details.push(`otok 50% osnovne tarife = ${island.toFixed(2)} €`);
  return {
    id,
    name: "Lagermax",
    carrier: "Lagermax",
    price: round2(base + fuel + island),
    possible: true,
    details,
    serviceType,
    status: "surcharge",
    warning: "Ponuda navodi polazište 10000 Zagreb. Primjenu iste tarife za preuzimanje u Križevcima treba pisano potvrditi s Lagermaxom.",
  };
};

export const calcBoxNow = (input: PricingInput): PriceResult => {
  const id = "box-now";
  const serviceType: ServiceType = "MBE Paketomati";
  if (Object.values(input.additionalServices).some(Boolean)) {
    return unavailable(id, "BOX NOW", "BOX NOW", serviceType, "Povrat dokumenta, osobno uručenje i posebno rukovanje nisu dio BOX NOW paketomat usluge.");
  }
  if (input.cod && input.codAmount > 200) {
    return unavailable(id, "BOX NOW", "BOX NOW", serviceType, "Ugovorena maksimalna vrijednost BOX NOW pošiljke je 200 €.");
  }
  let largeCount = 0;
  for (const item of input.packages) {
    if (item.weight <= 2 && fitsDimensions(item, [8, 45, 60])) continue;
    if (item.weight <= 5 && fitsDimensions(item, [17, 45, 60])) continue;
    if (item.weight <= 20 && fitsDimensions(item, [36, 45, 60])) {
      largeCount += 1;
      continue;
    }
    return unavailable(id, "BOX NOW", "BOX NOW", serviceType, "Najmanje jedan paket ne stane u pretinac L (20 kg; 36 × 45 × 60 cm).");
  }
  const base = 1.4 * input.packages.length;
  const codFee = input.cod ? input.codAmount * 0.01 : 0;
  const contingency = largeCount * 1.2;
  const details = [`${input.packages.length} × 1,40 € = ${base.toFixed(2)} €`];
  if (input.cod) details.push(`online COD karticom 1% = ${codFee.toFixed(2)} €`);
  if (largeCount) details.push(`${largeCount} L paket(a); moguća mrežna nadoplata do ${contingency.toFixed(2)} €`);
  return {
    id,
    name: "BOX NOW",
    carrier: "BOX NOW",
    price: round2(base + codFee),
    possible: true,
    details,
    serviceType,
    status: largeCount ? "surcharge" : "ok",
    warning: largeCount ? `Prikazana je osnovna cijena. Ako mreža prijeđe ugovorni prag od 5% L paketa kroz dva puna mjeseca, cijena može porasti na ${round2(base + codFee + contingency).toFixed(2)} €.` : undefined,
  };
};

const sortResults = (results: PriceResult[]) => [...results].sort((a, b) => {
  if (a.possible !== b.possible) return a.possible ? -1 : 1;
  if (a.status !== b.status && !a.possible) return a.status === "manual" ? -1 : 1;
  return (a.price ?? Infinity) - (b.price ?? Infinity);
});

const winner = (results: PriceResult[]) => results.find((result) => result.possible && result.price !== null) ?? null;

export const calculatePrices = (input: PricingInput): PricingResults => {
  const economy = sortResults([
    calcDPD(input),
    calcHPParcel(input),
    ...(input.packages.length === 1 ? [calcOverseasSingle(input)] : [calcOverseasMulti(input)]),
    calcInTime(input),
    calcLagermax(input),
    calcHPPallet(input),
  ]);
  const express = sortResults([calcGLS(input)]);
  const lockers = sortResults([calcBoxNow(input)]);
  const economyWinner = winner(economy);
  const expressWinner = winner(express);
  const lockerWinner = winner(lockers);
  const overallWinner = winner(sortResults([...economy, ...express, ...lockers]));
  return { economy, express, lockers, economyWinner, expressWinner, lockerWinner, overallWinner };
};

export const shipmentMetrics = (packages: NumericPackageItem[]) => ({
  actualWeight: round2(totalWeight(packages)),
  inTimeVolumetricWeight: round2(volumeWeightInTime(packages)),
});

export const destinationIsIsland = isAnyIsland;
