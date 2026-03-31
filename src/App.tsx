import { useMemo, useState } from "react";

type PackageItem = {
  weight: number;
  length: number;
  width: number;
  height: number;
};

type PriceResult = {
  name: string;
  price: number | null;
  possible: boolean;
  details: string[];
  serviceType: "MBE Economy" | "MBE Express";
};

const LOGOS: Record<string, string> = {
  MBE: "https://www.mbe.hr/wp-content/uploads/2020/04/mbe-logo.png",
  HP: "https://upload.wikimedia.org/wikipedia/commons/thumb/5/5e/Hrvatska_po%C5%A1ta_logo.svg/512px-Hrvatska_po%C5%A1ta_logo.svg.png",
  DPD: "https://upload.wikimedia.org/wikipedia/commons/thumb/3/3c/DPD_logo.svg/512px-DPD_logo.svg.png",
  GLS: "https://upload.wikimedia.org/wikipedia/commons/thumb/7/7a/GLS_Logo.svg/512px-GS_Logo.svg.png",
  "Overseas Single": "https://www.overseas.hr/wp-content/uploads/2020/10/overseas-logo.png",
  "Overseas Multi": "https://www.overseas.hr/wp-content/uploads/2020/10/overseas-logo.png",
  InTime: "https://www.in-time.hr/images/logo.png",
};

const SMALL_ISLANDS = new Set([
  "20221", "20222", "20223", "20224", "20225", "20226", "20290",
  "21225",
  "21430", "21432",
  "22232", "22233", "22234", "22235", "22236",
  "23281", "23282", "23283", "23284", "23285", "23286", "23287",
  "23291", "23292", "23293", "23294", "23295", "23296",
  "51552", "51561", "51562",
]);

const DPD_FREE_ISLANDS = new Set([
  "51500", "51511", "51512", "51513", "51514", "51515", "51516", "51517",
  "23250", "53291",
  "21220", "21223",
  "23234",
  "22243",
]);

const GLS_ALLOWED_ISLANDS = new Set([
  "51500", "51511", "51512", "51513", "51514", "51515", "51516", "51517",
  "51280",
  "51550", "51557", "51562",
  "23234", "23250", "53291",
  "21220", "21223",
  "22243",
  "21400", "21420", "21450", "21480",
  "20225", "20240", "20244", "20246", "20250",
  "23262", "23263", "23264", "23273", "23274", "23281",
]);

const OVERSEAS_ZONE2 = new Set([
  "20210", "20213", "20231", "20216", "20000", "20215", "20207", "20236",
  "20234", "20218", "20217", "20232", "20205", "20233", "20235",
]);

const INTIME_ZONE_2 = new Set([
  "20000", "20205", "20207", "20210", "20215", "20216", "20217", "20218",
  "20231", "20232", "20233", "20234", "20235", "20236",
  "20225", "20230", "20240", "20244", "20246", "20250",
]);

const INTIME_ZONE_3 = new Set([
  "20221", "20222", "20223", "20224", "20225", "20226", "20290",
  "21225",
  "21430", "21432",
  "22232", "22233", "22234", "22235", "22236",
  "23281", "23282", "23283", "23284", "23285", "23286", "23287",
  "23291", "23292", "23293", "23294", "23295", "23296",
  "51552", "51561", "51562",
]);

const GLS_1 = [
  { max: 1, price: 3.1 },
  { max: 2, price: 3.1 },
  { max: 3, price: 3.3 },
  { max: 5, price: 4.08 },
  { max: 10, price: 5.25 },
  { max: 15, price: 5.93 },
  { max: 20, price: 7.33 },
  { max: 25, price: 7.9 },
  { max: 30, price: 9.32 },
  { max: 40, price: 10.52 },
];

const GLS_2_4 = [
  { max: 1, price: 2.34 },
  { max: 2, price: 2.34 },
  { max: 3, price: 2.51 },
  { max: 5, price: 2.62 },
  { max: 10, price: 3.32 },
  { max: 15, price: 4.26 },
  { max: 20, price: 4.95 },
  { max: 25, price: 5.67 },
  { max: 30, price: 6.99 },
  { max: 40, price: 7.74 },
];

const GLS_5P = [
  { max: 1, price: 2.04 },
  { max: 2, price: 2.04 },
  { max: 3, price: 2.25 },
  { max: 5, price: 2.36 },
  { max: 10, price: 3.08 },
  { max: 15, price: 3.96 },
  { max: 20, price: 4.64 },
  { max: 25, price: 5.38 },
  { max: 30, price: 6.47 },
  { max: 40, price: 7.54 },
];

const DPD_TABLE = [
  { max: 1, price: 2.59 },
  { max: 2, price: 2.59 },
  { max: 3, price: 2.67 },
  { max: 5, price: 2.67 },
  { max: 10, price: 3.25 },
  { max: 15, price: 3.25 },
  { max: 20, price: 4.09 },
  { max: 25, price: 4.09 },
  { max: 31.5, price: 5.64 },
];

const HP_TABLE = [
  { max: 5, price: 2.2 },
  { max: 10, price: 2.8 },
  { max: 15, price: 3.3 },
  { max: 20, price: 4.05 },
  { max: 30, price: 5.45 },
];

const OS_SINGLE = [
  { max: 10, price: 2.61 },
  { max: 20, price: 3.24 },
  { max: 31.5, price: 3.52 },
];

const OS_MULTI = [
  { max: 5, price: 2.63 },
  { max: 10, price: 2.84 },
  { max: 20, price: 4.17 },
  { max: 30, price: 5.4 },
  { max: 40, price: 6.31 },
  { max: 50, price: 7.81 },
  { max: 60, price: 8.74 },
  { max: 70, price: 10.09 },
  { max: 80, price: 11.8 },
  { max: 90, price: 13.21 },
  { max: 100, price: 14.56 },
];

const INTIME = {
  1: [
    { max: 2, price: 3.9 }, { max: 5, price: 4.47 }, { max: 10, price: 5.57 }, { max: 15, price: 6.69 },
    { max: 20, price: 7.79 }, { max: 25, price: 10.03 }, { max: 30, price: 11.29 }, { max: 35, price: 13.8 },
    { max: 40, price: 16.29 }, { max: 45, price: 21.9 }, { max: 50, price: 24.6 }, { max: 60, price: 27.3 },
    { max: 70, price: 30.2 }, { max: 80, price: 33.2 }, { max: 90, price: 36.17 }, { max: 100, price: 39.12 },
    { max: 150, price: 44.07 }, { max: 200, price: 49.9 }, { max: 250, price: 54.8 }, { max: 300, price: 59.7 },
    { max: 350, price: 64.6 }, { max: 400, price: 74.5 }, { max: 450, price: 84.3 }, { max: 500, price: 94.2 },
    { max: 600, price: 109.8 }, { max: 700, price: 124.5 }, { max: 800, price: 139.1 }, { max: 900, price: 154.8 },
    { max: 1000, price: 169.3 },
  ],
  2: [
    { max: 2, price: 4.47 }, { max: 5, price: 5.57 }, { max: 10, price: 6.69 }, { max: 15, price: 7.79 },
    { max: 20, price: 10.03 }, { max: 25, price: 13.8 }, { max: 30, price: 15.06 }, { max: 35, price: 17.56 },
    { max: 40, price: 20.7 }, { max: 45, price: 27.4 }, { max: 50, price: 32.9 }, { max: 60, price: 37.4 },
    { max: 70, price: 42.1 }, { max: 80, price: 47.9 }, { max: 90, price: 52.8 }, { max: 100, price: 57.7 },
    { max: 150, price: 64.6 }, { max: 200, price: 71.5 }, { max: 250, price: 78.5 }, { max: 300, price: 85.3 },
    { max: 350, price: 92.1 }, { max: 400, price: 102.9 }, { max: 450, price: 112.8 }, { max: 500, price: 122.7 },
    { max: 600, price: 137.3 }, { max: 700, price: 152.1 }, { max: 800, price: 167.5 }, { max: 900, price: 182.1 },
    { max: 1000, price: 197.8 },
  ],
  3: [
    { max: 2, price: 8.61 }, { max: 5, price: 10.33 }, { max: 10, price: 12.05 }, { max: 15, price: 14.56 },
    { max: 20, price: 17.2 }, { max: 25, price: 18.93 }, { max: 30, price: 20.65 }, { max: 35, price: 25.15 },
    { max: 40, price: 29.13 }, { max: 45, price: 35.8 }, { max: 50, price: 40.1 }, { max: 60, price: 45.2 },
    { max: 70, price: 50.1 }, { max: 80, price: 55.2 }, { max: 90, price: 60.2 }, { max: 100, price: 65.4 },
    { max: 150, price: 80.4 }, { max: 200, price: 95.4 }, { max: 250, price: 110.1 }, { max: 300, price: 125.6 },
    { max: 350, price: 140.7 }, { max: 400, price: 155.9 }, { max: 450, price: 170.1 }, { max: 500, price: 185.6 },
    { max: 600, price: 225.8 }, { max: 700, price: 265.6 }, { max: 800, price: 305.5 }, { max: 900, price: 345.7 },
    { max: 1000, price: 385.9 },
  ],
} as const;

function round2(n: number) {
  return Math.round((n + Number.EPSILON) * 100) / 100;
}

function money(n: number | null) {
  if (n === null) return "—";
  return new Intl.NumberFormat("hr-HR", {
    style: "currency",
    currency: "EUR",
  }).format(n);
}

function isIsland(postal: string) {
  return SMALL_ISLANDS.has(postal);
}

function isOverseasSpecial(postal: string) {
  return isIsland(postal) || postal.startsWith("20") || OVERSEAS_ZONE2.has(postal);
}

function isGlsPossible(postal: string) {
  if (!postal || postal.length !== 5) return false;
  if (!isIsland(postal)) return true;
  return GLS_ALLOWED_ISLANDS.has(postal);
}

function getInTimeZone(postal: string) {
  if (INTIME_ZONE_3.has(postal)) return 3 as const;
  if (INTIME_ZONE_2.has(postal)) return 2 as const;
  return 1 as const;
}

function tierPrice(table: Array<{ max: number; price: number }>, value: number) {
  const row = table.find((r) => value <= r.max);
  return row ? row.price : null;
}

function totalWeight(items: PackageItem[]) {
  return round2(items.reduce((sum, item) => sum + Number(item.weight || 0), 0));
}

function volumeWeightInTime(items: PackageItem[]) {
  return round2(
    items.reduce((sum, p) => {
      const l = Number(p.length || 0) / 100;
      const w = Number(p.width || 0) / 100;
      const h = Number(p.height || 0) / 100;
      return sum + l * w * h * 200;
    }, 0)
  );
}

function girth(p: PackageItem) {
  return Number(p.length) + 2 * Number(p.width) + 2 * Number(p.height);
}

function inputStyle(): React.CSSProperties {
  return {
    padding: 14,
    fontSize: 16,
    border: "1px solid #d0d7de",
    borderRadius: 10,
    width: "100%",
    boxSizing: "border-box",
  };
}

function buttonStyle(primary = false): React.CSSProperties {
  return {
    padding: "10px 14px",
    borderRadius: 10,
    border: primary ? "1px solid #111827" : "1px solid #d1d5db",
    background: primary ? "#111827" : "#fff",
    color: primary ? "#fff" : "#111827",
    cursor: "pointer",
    fontWeight: 600,
  };
}

function cardStyle(highlight = false, sticky = false): React.CSSProperties {
  return {
    border: highlight ? "2px solid #16a34a" : "1px solid #e5e7eb",
    background: highlight ? "#f0fdf4" : "#fff",
    borderRadius: 14,
    padding: 16,
    boxShadow: sticky ? "0 8px 20px rgba(0,0,0,0.08)" : "none",
  };
}

function badgeStyle(type: "ok" | "warn" | "info"): React.CSSProperties {
  const styles = {
    ok: { background: "#dcfce7", color: "#166534" },
    warn: { background: "#ffedd5", color: "#9a3412" },
    info: { background: "#e0f2fe", color: "#075985" },
  };
  return {
    display: "inline-block",
    padding: "4px 8px",
    borderRadius: 999,
    fontSize: 12,
    fontWeight: 700,
    ...styles[type],
  };
}

function calcHP(items: PackageItem[], cod: boolean): PriceResult {
  const reasons: string[] = [];
  for (let i = 0; i < items.length; i += 1) {
    const p = items[i];
    const longest = Math.max(p.length, p.width, p.height);
    const sum = p.length + p.width + p.height;
    if (longest > 60) reasons.push(`Paket ${i + 1}: najduža stranica > 60 cm`);
    if (sum > 180) reasons.push(`Paket ${i + 1}: zbroj stranica > 180 cm`);
  }

  if (reasons.length) {
    return { name: "HP", price: null, possible: false, details: reasons, serviceType: "MBE Economy" };
  }

  const kg = totalWeight(items);
  let price = tierPrice(HP_TABLE, kg);
  if (price === null) price = 5.45 + Math.ceil((kg - 30) / 5) * 1;
  if (cod) price += 0.5;

  return {
    name: "HP",
    price: round2(price),
    possible: true,
    details: ["Obračun po pošiljci", cod ? "COD +0,50 €" : "Bez COD dodatka", "Bez otočnih nadoplata"],
    serviceType: "MBE Economy",
  };
}

function calcGLS(items: PackageItem[], postal: string, cod: boolean): PriceResult {
  const reasons: string[] = [];
  const table = items.length === 1 ? GLS_1 : items.length <= 4 ? GLS_2_4 : GLS_5P;

  for (let i = 0; i < items.length; i += 1) {
    const p = items[i];
    if (p.weight > 40) reasons.push(`Paket ${i + 1}: masa > 40 kg`);
    if (p.length > 200 || p.width > 80 || p.height > 60) reasons.push(`Paket ${i + 1}: prelazi 200×80×60 cm`);
    if (girth(p) > 300) reasons.push(`Paket ${i + 1}: L+2Š+2V > 300 cm`);
  }

  if (!isGlsPossible(postal)) reasons.push("GLS nije moguć za ovaj poštanski broj / otok");

  if (reasons.length) {
    return { name: "GLS", price: null, possible: false, details: reasons, serviceType: "MBE Express" };
  }

  let price = items.reduce((sum, p) => sum + (tierPrice(table, p.weight) || 0), 0);
  price *= 1.19;
  if (cod) price += 0.43;

  return {
    name: "GLS",
    price: round2(price),
    possible: true,
    details: [
      items.length === 1 ? "1 paket cjenik" : items.length <= 4 ? "2–4 paketa cjenik" : "5+ paketa cjenik",
      "+19% dodatak",
      cod ? "COD +0,43 €" : "Bez COD dodatka",
    ],
    serviceType: "MBE Express",
  };
}

function calcDPD(items: PackageItem[], postal: string): PriceResult {
  const reasons: string[] = [];
  for (let i = 0; i < items.length; i += 1) {
    const p = items[i];
    if (p.weight > 31.5) reasons.push(`Paket ${i + 1}: masa > 31,5 kg`);
    if (p.length > 175) reasons.push(`Paket ${i + 1}: duljina > 175 cm`);
    if (girth(p) > 300) reasons.push(`Paket ${i + 1}: L+2Š+2V > 300 cm`);
  }

  if (reasons.length) {
    return { name: "DPD", price: null, possible: false, details: reasons, serviceType: "MBE Economy" };
  }

  let price = 0;
  if (items.length >= 2) price = items.length * 2.89;
  else price = tierPrice(DPD_TABLE, items[0].weight) || 0;

  const details = [items.length >= 2 ? "2+ paketa: 2,89 € po paketu" : "Standardni cjenik", "COD uključen"];
  if (isIsland(postal) && !DPD_FREE_ISLANDS.has(postal)) {
    price += 3.5;
    details.push("Otočna nadoplata +3,50 €");
  }

  return {
    name: "DPD",
    price: round2(price),
    possible: true,
    details,
    serviceType: "MBE Economy",
  };
}

function calcOSSingle(items: PackageItem[], postal: string, cod: boolean): PriceResult {
  const reasons: string[] = [];
  let base = 0;

  for (let i = 0; i < items.length; i += 1) {
    const p = items[i];
    if (p.weight > 31.5) reasons.push(`Paket ${i + 1}: masa > 31,5 kg`);
    if (p.length > 100) reasons.push(`Paket ${i + 1}: duljina > 100 cm`);
    if (girth(p) > 340) reasons.push(`Paket ${i + 1}: L+2Š+2V > 340 cm`);
    base += tierPrice(OS_SINGLE, p.weight) || 0;
  }

  if (reasons.length) {
    return { name: "Overseas Single", price: null, possible: false, details: reasons, serviceType: "MBE Economy" };
  }

  let price = base * 1.05;
  if (cod) price += 0.3;
  if (isOverseasSpecial(postal)) price *= 1.2;

  return {
    name: "Overseas Single",
    price: round2(price),
    possible: true,
    details: [
      "Obračun po paketu",
      "+5% dodatak",
      cod ? "COD +0,30 €" : "Bez COD dodatka",
      isOverseasSpecial(postal) ? "Posebna zona / otok +20%" : "Standardna zona",
    ],
    serviceType: "MBE Economy",
  };
}

function calcOSMulti(items: PackageItem[], postal: string, cod: boolean): PriceResult | null {
  if (items.length < 2) return null;

  const reasons: string[] = [];
  for (let i = 0; i < items.length; i += 1) {
    const p = items[i];
    if (p.weight > 31.5) reasons.push(`Paket ${i + 1}: masa > 31,5 kg`);
    if (p.length > 100) reasons.push(`Paket ${i + 1}: duljina > 100 cm`);
    if (girth(p) > 340) reasons.push(`Paket ${i + 1}: L+2Š+2V > 340 cm`);
  }

  if (reasons.length) {
    return { name: "Overseas Multi", price: null, possible: false, details: reasons, serviceType: "MBE Economy" };
  }

  const kg = totalWeight(items);
  let base = tierPrice(OS_MULTI, kg);
  if (base === null) base = 14.56 + Math.max(0, kg - 100) * 0.25;

  let price = base * 1.05;
  if (cod) price += 0.3;
  if (isOverseasSpecial(postal)) price *= 1.2;

  return {
    name: "Overseas Multi",
    price: round2(price),
    possible: true,
    details: [
      "Obračun po pošiljci",
      "+5% dodatak",
      cod ? "COD +0,30 €" : "Bez COD dodatka",
      isOverseasSpecial(postal) ? "Posebna zona / otok +20%" : "Standardna zona",
    ],
    serviceType: "MBE Economy",
  };
}

function calcInTime(items: PackageItem[], postal: string): PriceResult {
  const actual = totalWeight(items);
  const volumetric = volumeWeightInTime(items);
  const chargeable = Math.max(actual, volumetric);
  const zone = getInTimeZone(postal);
  const base = tierPrice(INTIME[zone], chargeable);

  if (base === null) {
    return {
      name: "InTime",
      price: null,
      possible: false,
      details: ["Obračunska masa prelazi 1000 kg"],
      serviceType: "MBE Economy",
    };
  }

  return {
    name: "InTime",
    price: round2(base * 1.15),
    possible: true,
    details: [
      `Zona ${zone}`,
      `Stvarna masa ${actual} kg`,
      `Volumetrijska masa ${volumetric} kg`,
      `Obračunska masa ${chargeable} kg`,
      "+15% gorivo",
    ],
    serviceType: "MBE Economy",
  };
}

function ResultRow({
  result,
  highlighted,
}: {
  result: PriceResult;
  highlighted: boolean;
}) {
  return (
    <div style={boxStyle(highlighted)}>
      <div style={{ display: "flex", justifyContent: "space-between", gap: 12, flexWrap: "wrap" }}>
        <div>
          <div style={{ fontWeight: 700, fontSize: 20 }}>{result.name}</div>
          <div style={{ marginTop: 8, display: "flex", gap: 8, flexWrap: "wrap" }}>
            <span style={badgeStyle(result.serviceType === "MBE Express" ? "warn" : "ok")}>{result.serviceType}</span>
            <span style={badgeStyle(result.possible ? "ok" : "warn")}>{result.possible ? "Moguće" : "Nije moguće"}</span>
            {highlighted && result.possible ? <span style={badgeStyle("info")}>Preporuka</span> : null}
          </div>
          <div style={{ color: "#555", marginTop: 10 }}>{result.details.join(" · ")}</div>
        </div>
        <div style={{ fontSize: 30, fontWeight: 800 }}>{money(result.price)}</div>
      </div>
    </div>
  );
}

export default function App() {
  const [postalCode, setPostalCode] = useState("");
  const [cod, setCod] = useState(false);
  const [packages, setPackages] = useState<PackageItem[]>([
    { weight: 2, length: 30, width: 20, height: 10 },
  ]);

  const normalized = useMemo(
    () =>
      packages.map((p) => ({
        weight: Number(p.weight) || 0,
        length: Number(p.length) || 0,
        width: Number(p.width) || 0,
        height: Number(p.height) || 0,
      })),
    [packages]
  );

  const total = useMemo(() => totalWeight(normalized), [normalized]);

  const results = useMemo(() => {
    const ready =
      postalCode.length === 5 &&
      normalized.every((p) => p.weight > 0 && p.length > 0 && p.width > 0 && p.height > 0);

    if (!ready) return null;

    const multi = calcOSMulti(normalized, postalCode, cod);
    const economy = [
      calcDPD(normalized, postalCode),
      calcHP(normalized, cod),
      calcOSSingle(normalized, postalCode, cod),
      calcInTime(normalized, postalCode),
      ...(multi ? [multi] : []),
    ].sort((a, b) => {
      if (a.possible !== b.possible) return a.possible ? -1 : 1;
      if (a.price === null && b.price === null) return 0;
      if (a.price === null) return 1;
      if (b.price === null) return -1;
      return a.price - b.price;
    });

    const express = calcGLS(normalized, postalCode, cod);
    const economyWinner = economy.find((x) => x.possible) || null;

    return { economy, express, economyWinner };
  }, [postalCode, normalized, cod]);

  const updatePackage = (index: number, field: keyof PackageItem, value: number) => {
    setPackages((prev) => prev.map((p, i) => (i === index ? { ...p, [field]: value } : p)));
  };

  const addPackage = () => {
    setPackages((prev) => [...prev, { weight: 1, length: 20, width: 20, height: 10 }]);
  };

  const duplicatePackage = (index: number) => {
    setPackages((prev) => [...prev.slice(0, index + 1), { ...prev[index] }, ...prev.slice(index + 1)]);
  };

  const removePackage = (index: number) => {
    setPackages((prev) => (prev.length === 1 ? prev : prev.filter((_, i) => i !== index)));
  };

  const resetShipment = () => {
    setPostalCode("");
    setCod(false);
    setPackages([{ weight: 2, length: 30, width: 20, height: 10 }]);
  };

  const quickSet = (count: number) => {
    const base = packages[0] || { weight: 1, length: 20, width: 20, height: 10 };
    setPackages(Array.from({ length: count }, () => ({ ...base })));
  };

  const applyPreset = (preset: PackageItem) => {
    setPackages((prev) => prev.map(() => ({ ...preset })));
  };

  return (
    <div style={{ minHeight: "100vh", background: "#f8fafc", padding: 16 }}>
      <div style={{ maxWidth: 1100, margin: "0 auto", display: "grid", gap: 16 }}>
        <div style={{ position: "sticky", top: 8, zIndex: 50 }}>
          <div style={cardStyle(false, true)}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", gap: 12, flexWrap: "wrap" }}>
              <div>
                <div style={{ fontSize: 12, color: "#64748b", textTransform: "uppercase", fontWeight: 700 }}>Sticky pregled</div>
                <div style={{ fontSize: 28, fontWeight: 800 }}>
                  {results?.economyWinner ? `${results.economyWinner.name} — ${money(results.economyWinner.price)}` : "Upiši pošiljku"}
                </div>
                <div style={{ color: "#64748b", marginTop: 4 }}>
                  Express: {results ? money(results.express.price) : "—"} · Paketa: {packages.length} · Ukupno: {total.toFixed(2)} kg
                </div>
              </div>
              <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
                <button style={buttonStyle()} onClick={() => quickSet(1)}>1 paket</button>
                <button style={buttonStyle()} onClick={() => quickSet(2)}>2 paketa</button>
                <button style={buttonStyle()} onClick={() => quickSet(5)}>5 paketa</button>
                <button style={buttonStyle()} onClick={resetShipment}>Reset</button>
              </div>
            </div>
          </div>
        </div>

        <div style={{ display: "grid", gap: 16, gridTemplateColumns: "1.1fr 1fr" }}>
          <div style={cardStyle()}>
            <h2 style={{ marginTop: 0 }}>Unos pošiljke</h2>

            <div style={{ display: "grid", gap: 14 }}>
              <div>
                <label style={{ display: "block", marginBottom: 6, fontWeight: 700 }}>Poštanski broj</label>
                <input
                  value={postalCode}
                  onChange={(e) => setPostalCode(e.target.value.replace(/\D/g, "").slice(0, 5))}
                  placeholder="npr. 48260"
                  style={inputStyle()}
                />
              </div>

              <label style={{ display: "flex", alignItems: "center", gap: 8, fontSize: 16 }}>
                <input type="checkbox" checked={cod} onChange={(e) => setCod(e.target.checked)} />
                COD / pouzeće
              </label>

              <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
                <button style={buttonStyle()} onClick={() => applyPreset({ weight: 1, length: 20, width: 20, height: 10 })}>Mala kutija</button>
                <button style={buttonStyle()} onClick={() => applyPreset({ weight: 3, length: 40, width: 30, height: 20 })}>Srednja</button>
                <button style={buttonStyle()} onClick={() => applyPreset({ weight: 8, length: 60, width: 40, height: 40 })}>Velika</button>
              </div>
            </div>

            <hr style={{ margin: "18px 0", border: 0, borderTop: "1px solid #e5e7eb" }} />

            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 12 }}>
              <h3 style={{ margin: 0 }}>Paketi</h3>
              <button style={buttonStyle(true)} onClick={addPackage}>Dodaj paket</button>
            </div>

            <div style={{ display: "grid", gap: 12 }}>
              {packages.map((pkg, index) => (
                <div key={index} style={{ ...cardStyle(), padding: 14 }}>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 10, gap: 8, flexWrap: "wrap" }}>
                    <strong>Paket {index + 1}</strong>
                    <div style={{ display: "flex", gap: 8 }}>
                      <button style={buttonStyle()} onClick={() => duplicatePackage(index)}>Dupliciraj</button>
                      {packages.length > 1 ? (
                        <button style={buttonStyle()} onClick={() => removePackage(index)}>Obriši</button>
                      ) : null}
                    </div>
                  </div>

                  <div style={{ display: "grid", gridTemplateColumns: "repeat(2, minmax(0,1fr))", gap: 10 }}>
                    <div>
                      <label style={{ display: "block", marginBottom: 6 }}>Težina (kg)</label>
                      <input type="number" step="0.01" value={pkg.weight} onChange={(e) => updatePackage(index, "weight", Number(e.target.value))} style={inputStyle()} />
                    </div>
                    <div>
                      <label style={{ display: "block", marginBottom: 6 }}>Duljina (cm)</label>
                      <input type="number" value={pkg.length} onChange={(e) => updatePackage(index, "length", Number(e.target.value))} style={inputStyle()} />
                    </div>
                    <div>
                      <label style={{ display: "block", marginBottom: 6 }}>Širina (cm)</label>
                      <input type="number" value={pkg.width} onChange={(e) => updatePackage(index, "width", Number(e.target.value))} style={inputStyle()} />
                    </div>
                    <div>
                      <label style={{ display: "block", marginBottom: 6 }}>Visina (cm)</label>
                      <input type="number" value={pkg.height} onChange={(e) => updatePackage(index, "height", Number(e.target.value))} style={inputStyle()} />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div style={{ display: "grid", gap: 16, alignContent: "start" }}>
            <div style={cardStyle()}>
              <div style={{ fontSize: 12, color: "#64748b", textTransform: "uppercase", fontWeight: 700 }}>MBE Economy</div>
              {results?.economyWinner ? (
                <>
                  <div style={{ fontSize: 30, fontWeight: 800, marginTop: 8 }}>{results.economyWinner.name}</div>
                  <div style={{ fontSize: 36, fontWeight: 900, marginTop: 8 }}>{money(results.economyWinner.price)}</div>
                  <div style={{ marginTop: 10, color: "#475569" }}>{results.economyWinner.details.join(" · ")}</div>
                </>
              ) : (
                <div style={{ color: "#64748b", marginTop: 8 }}>Upiši sve podatke pošiljke.</div>
              )}
            </div>

            <div style={cardStyle()}>
              <div style={{ fontSize: 12, color: "#64748b", textTransform: "uppercase", fontWeight: 700 }}>MBE Express</div>
              {results ? (
                <>
                  <div style={{ fontSize: 30, fontWeight: 800, marginTop: 8 }}>GLS</div>
                  <div style={{ fontSize: 36, fontWeight: 900, marginTop: 8 }}>{money(results.express.price)}</div>
                  <div style={{ marginTop: 10, color: "#475569" }}>
                    {results.express.details.join(" · ")}
                  </div>
                </>
              ) : (
                <div style={{ color: "#64748b", marginTop: 8 }}>Upiši sve podatke pošiljke.</div>
              )}
            </div>

            <div style={cardStyle()}>
              <div style={{ fontSize: 12, color: "#64748b", textTransform: "uppercase", fontWeight: 700 }}>Brzi status</div>
              <div style={{ marginTop: 10, display: "grid", gap: 8, color: "#475569" }}>
                <div>Otok: <strong>{postalCode ? (isIsland(postalCode) ? "Da" : "Ne") : "-"}</strong></div>
                <div>Overseas posebna zona: <strong>{postalCode ? (isOverseasSpecial(postalCode) ? "Da" : "Ne") : "-"}</strong></div>
                <div>InTime zona: <strong>{postalCode.length === 5 ? `Z${getInTimeZone(postalCode)}` : "-"}</strong></div>
                <div>Ukupna težina: <strong>{total.toFixed(2)} kg</strong></div>
              </div>
            </div>
          </div>
        </div>

        {results ? (
          <>
            <div>
              <h2>Sve economy opcije</h2>
              <div style={{ display: "grid", gap: 12 }}>
                {results.economy.map((r) => (
                  <ResultRow
                    key={r.name}
                    result={r}
                    highlighted={r.name === results.economyWinner?.name}
                  />
                ))}
              </div>
            </div>

            <div>
              <h2>Express opcija</h2>
              <ResultRow result={results.express} highlighted={false} />
            </div>
          </>
        ) : null}
      </div>
    </div>
  );
}
