import { useEffect, useMemo, useState, type CSSProperties, type FocusEvent } from "react";

type PackageItem = {
  weight: string;
  length: string;
  width: string;
  height: string;
};

type NumericPackageItem = {
  weight: number;
  length: number;
  width: number;
  height: number;
};

type CarrierStatus = "ok" | "surcharge" | "no";
type ServiceType = "MBE Economy" | "MBE Express";

type PriceResult = {
  name: string;
  price: number | null;
  possible: boolean;
  details: string[];
  serviceType: ServiceType;
  warning?: string;
  status: CarrierStatus;
};

const DEFAULT_FIRST_PACKAGE: PackageItem = {
  weight: "2",
  length: "30",
  width: "20",
  height: "10",
};

const DEFAULT_NEW_PACKAGE: PackageItem = {
  weight: "1",
  length: "10",
  width: "10",
  height: "10",
};

const ISLAND_POSTALS = new Set([
  "20221", "20222", "20223", "20224", "20225", "20226", "20289", "20290",
  "20260", "20263", "20264", "20267", "20269", "20270", "20271", "20272", "20273", "20274", "20275",
  "21225",
  "21400", "21403", "21404", "21405", "21410", "21412", "21413", "21420", "21423", "21424", "21425", "21426",
  "21430", "21432",
  "21450", "21454", "21460", "21462", "21463", "21465", "21466", "21467", "21468", "21469",
  "21480", "21483", "21485",
  "22232", "22233", "22234", "22235", "22236",
  "23281", "23282", "23283", "23284", "23285", "23286", "23287",
  "23291", "23292", "23293", "23294", "23295", "23296",
  "51280", "51281",
  "51550", "51551", "51552", "51554", "51555", "51557", "51561", "51562",
]);

const DPD_FREE_ISLANDS = new Set([
  "51500", "51511", "51512", "51513", "51514", "51515", "51516", "51517",
  "23250", "53291",
  "21220", "21223",
  "23234",
  "22243",
]);

const GLS_ALLOWED_ISLANDS = new Set([
  "51280",
  "51500", "51511", "51512", "51513", "51514", "51515", "51516", "51517",
  "51550", "51551", "51552", "51554", "51555", "51557", "51562",
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

// Svi otoci iz master liste automatski idu u InTime zonu 3.
const INTIME_ZONE_3 = new Set([...Array.from(ISLAND_POSTALS)]);

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
} as const;

const round2 = (n: number) => Math.round((n + Number.EPSILON) * 100) / 100;

function money(n: number | null) {
  if (n === null) return "—";
  return new Intl.NumberFormat("hr-HR", {
    style: "currency",
    currency: "EUR",
  }).format(n);
}

function parseNum(value: string) {
  if (value.trim() === "") return null;
  const parsed = Number(value.replace(",", "."));
  return Number.isFinite(parsed) ? parsed : null;
}

const isIsland = (postal: string) => ISLAND_POSTALS.has(postal);
const isOverseasSpecial = (postal: string) => isIsland(postal) || postal.startsWith("20") || OVERSEAS_ZONE2.has(postal);

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
  return table.find((r) => value <= r.max)?.price ?? null;
}

function totalWeight(items: Array<{ weight: number }>) {
  return round2(items.reduce((sum, item) => sum + Number(item.weight || 0), 0));
}

function volumeWeightInTime(items: Array<{ length: number; width: number; height: number }>) {
  return round2(
    items.reduce(
      (sum, p) => sum + (p.length / 100) * (p.width / 100) * (p.height / 100) * 200,
      0
    )
  );
}

function girth(p: { length: number; width: number; height: number }) {
  return p.length + 2 * p.width + 2 * p.height;
}

function useIsMobile(breakpoint = 900) {
  const [isMobile, setIsMobile] = useState(() =>
    typeof window !== "undefined" ? window.innerWidth < breakpoint : false
  );

  useEffect(() => {
    const onResize = () => setIsMobile(window.innerWidth < breakpoint);
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, [breakpoint]);

  return isMobile;
}

function inputStyle(): CSSProperties {
  return {
    padding: "14px 12px",
    fontSize: 17,
    border: "1px solid #d0d7de",
    borderRadius: 12,
    width: "100%",
    boxSizing: "border-box",
    fontFamily: "inherit",
    background: "#fff",
    minHeight: 50,
  };
}

function buttonStyle(primary = false): CSSProperties {
  return {
    padding: "12px 14px",
    borderRadius: 12,
    border: primary ? "1px solid #111827" : "1px solid #d1d5db",
    background: primary ? "#111827" : "#fff",
    color: primary ? "#fff" : "#111827",
    cursor: "pointer",
    fontWeight: 700,
    fontFamily: "inherit",
    minHeight: 46,
  };
}

function cardStyle(highlight = false): CSSProperties {
  return {
    border: highlight ? "2px solid #16a34a" : "1px solid #e5e7eb",
    background: highlight ? "#f0fdf4" : "#fff",
    borderRadius: 16,
    padding: 16,
    boxShadow: "0 1px 2px rgba(0,0,0,0.04)",
  };
}

function badgeStyle(type: "ok" | "warn" | "info" | "danger"): CSSProperties {
  const styles = {
    ok: { background: "#dcfce7", color: "#166534" },
    warn: { background: "#ffedd5", color: "#9a3412" },
    info: { background: "#e0f2fe", color: "#075985" },
    danger: { background: "#fee2e2", color: "#991b1b" },
  };

  return {
    display: "inline-block",
    padding: "5px 9px",
    borderRadius: 999,
    fontSize: 12,
    fontWeight: 800,
    ...styles[type],
  };
}

function serviceBadgeStyle(serviceType: ServiceType): CSSProperties {
  return {
    display: "inline-block",
    padding: "5px 10px",
    borderRadius: 999,
    fontSize: 12,
    fontWeight: 800,
    background: serviceType === "MBE Economy" ? "#16a34a" : "#dc2626",
    color: "#fff",
  };
}

function carrierPillStyle(name: string): CSSProperties {
  const base: CSSProperties = {
    display: "inline-flex",
    alignItems: "center",
    justifyContent: "center",
    padding: "6px 12px",
    borderRadius: 999,
    fontWeight: 800,
    fontSize: 14,
    minHeight: 34,
  };

  if (name === "GLS") return { ...base, background: "#0b4ea2", color: "#ffd400" };
  if (name === "InTime") return { ...base, background: "#16a34a", color: "#111" };
  if (name === "HP") return { ...base, background: "#ffd400", color: "#111" };
  if (name.includes("Overseas")) return { ...base, background: "#f97316", color: "#fff" };
  if (name === "DPD") return { ...base, background: "#dc2626", color: "#fff" };
  if (name === "MBE") return { ...base, background: "#111", color: "#fff" };
  return { ...base, background: "#e5e7eb", color: "#111827" };
}

function sectionSummaryStyle(): CSSProperties {
  return {
    cursor: "pointer",
    fontWeight: 800,
    listStyle: "none",
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    gap: 10,
  };
}

function statusBadge(status: CarrierStatus) {
  if (status === "ok") return <span style={badgeStyle("ok")}>Moguće</span>;
  if (status === "surcharge") return <span style={badgeStyle("warn")}>Moguće uz nadoplatu</span>;
  return <span style={badgeStyle("danger")}>Nije moguće</span>;
}

function CarrierPill({ name }: { name: string }) {
  return <div style={carrierPillStyle(name)}>{name}</div>;
}

function fail(name: string, serviceType: ServiceType, details: string[]): PriceResult {
  return {
    name,
    price: null,
    possible: false,
    details,
    serviceType,
    status: "no",
  };
}

function calcHP(items: NumericPackageItem[], cod: boolean): PriceResult {
  const reasons: string[] = [];

  for (let i = 0; i < items.length; i += 1) {
    const p = items[i];
    const longest = Math.max(p.length, p.width, p.height);
    const sum = p.length + p.width + p.height;

    if (p.weight > 30) reasons.push(`Paket ${i + 1}: masa > 30 kg`);
    if (longest > 60) reasons.push(`Paket ${i + 1}: najduža stranica > 60 cm`);
    if (sum > 180) reasons.push(`Paket ${i + 1}: zbroj stranica > 180 cm`);
  }

  if (reasons.length) return fail("HP", "MBE Economy", reasons);

  const kg = totalWeight(items);
  let price = tierPrice(HP_TABLE, kg);

  if (price === null) {
    price = 5.45 + Math.ceil((kg - 30) / 5) * 1;
  }

  if (cod) price += 0.5;

  return {
    name: "HP",
    price: round2(price),
    possible: true,
    details: [
      "Max 30 kg po paketu",
      "Obračun po pošiljci",
      cod ? "COD +0,50 €" : "Bez COD dodatka",
      "Bez otočnih nadoplata",
    ],
    serviceType: "MBE Economy",
    status: "ok",
  };
}

function calcGLS(items: NumericPackageItem[], postal: string, cod: boolean): PriceResult {
  const reasons: string[] = [];
  const warnings: string[] = [];
  const table = items.length === 1 ? GLS_1 : items.length <= 4 ? GLS_2_4 : GLS_5P;

  let oversize = 0;
  let overweight = 0;

  for (let i = 0; i < items.length; i += 1) {
    const p = items[i];

    if (p.weight > 50 || p.length > 250 || p.width > 120 || p.height > 80 || girth(p) > 360) {
      reasons.push(`Paket ${i + 1}: grubo prelazi GLS limite, moguća samo ručna provjera`);
      continue;
    }

    if (p.length > 200 || p.width > 80 || p.height > 60 || girth(p) > 300) {
      oversize += 5.39;
      warnings.push(`Paket ${i + 1}: paket prekomjernih dimenzija +5,39 €`);
    }

    if (p.weight > 40) {
      overweight += 2.06;
      warnings.push(`Paket ${i + 1}: paket prekomjerne težine +2,06 €`);
    }
  }

  if (!isGlsPossible(postal)) reasons.push("GLS nije moguć za ovaj poštanski broj / otok");
  if (reasons.length) return fail("GLS", "MBE Express", reasons);

  let price = items.reduce((sum, p) => sum + (tierPrice(table, Math.min(p.weight, 40)) || 0), 0);
  price = price * 1.19 + (cod ? 0.43 : 0) + oversize + overweight;

  const hasSurcharge = oversize > 0 || overweight > 0;

  return {
    name: "GLS",
    price: round2(price),
    possible: true,
    serviceType: "MBE Express",
    status: hasSurcharge ? "surcharge" : "ok",
    details: [
      items.length === 1 ? "1 paket cjenik" : items.length <= 4 ? "2–4 paketa cjenik" : "5+ paketa cjenik",
      "+19% dodatak",
      cod ? "COD +0,43 €" : "Bez COD dodatka",
      ...(oversize ? [`Prekomjerne dimenzije +${oversize.toFixed(2)} €`] : []),
      ...(overweight ? [`Prekomjerna težina +${overweight.toFixed(2)} €`] : []),
    ],
    warning: warnings.length ? warnings.join(" · ") : undefined,
  };
}

function calcDPD(items: NumericPackageItem[], postal: string): PriceResult {
  const reasons: string[] = [];
  const warnings: string[] = [];

  let oversize = 0;
  let overweight = 0;

  for (let i = 0; i < items.length; i += 1) {
    const p = items[i];

    if (p.weight > 70 || p.length > 220 || girth(p) > 360) {
      reasons.push(`Paket ${i + 1}: grubo prelazi DPD limite, moguća samo ručna provjera`);
      continue;
    }

    if (p.length > 175 || girth(p) > 300) {
      oversize += 25;
      warnings.push(`Paket ${i + 1}: nestandardna dimenzija +25,00 €`);
    }

    if (p.weight > 31.5) {
      const surcharge = Math.ceil(p.weight - 31.5) * 2;
      overweight += surcharge;
      warnings.push(`Paket ${i + 1}: prekomjerna težina +${surcharge.toFixed(2)} €`);
    }
  }

  if (reasons.length) return fail("DPD", "MBE Economy", reasons);

  let price = items.length >= 2
    ? items.length * 2.89
    : tierPrice(DPD_TABLE, Math.min(items[0].weight, 31.5)) || 0;

  const details = [
    items.length >= 2 ? "2+ paketa: 2,89 € po paketu" : "Standardni cjenik",
    "COD uključen",
  ];

  if (isIsland(postal) && !DPD_FREE_ISLANDS.has(postal)) {
    price += 3.5;
    details.push("Otočna nadoplata +3,50 €");
  }

  if (oversize) details.push(`Nestandardna dimenzija +${oversize.toFixed(2)} €`);
  if (overweight) details.push(`Prekomjerna težina +${overweight.toFixed(2)} €`);

  price += oversize + overweight;

  const hasSurcharge = oversize > 0 || overweight > 0 || details.some((d) => d.includes("Otočna"));

  return {
    name: "DPD",
    price: round2(price),
    possible: true,
    serviceType: "MBE Economy",
    status: hasSurcharge ? "surcharge" : "ok",
    details,
    warning: warnings.length ? warnings.join(" · ") : undefined,
  };
}

function calcOSSingle(items: NumericPackageItem[], postal: string, cod: boolean): PriceResult {
  const reasons: string[] = [];
  const warnings: string[] = [];

  let base = 0;
  let heavy = 0;
  let bulky = 0;

  for (let i = 0; i < items.length; i += 1) {
    const p = items[i];

    if (p.weight > 50 || girth(p) > 340 || p.length > 200) {
      reasons.push(`Paket ${i + 1}: grubo prelazi Overseas limite, moguća samo ručna provjera`);
      continue;
    }

    if (p.weight > 31.5) {
      heavy += 4;
      warnings.push(`Paket ${i + 1}: teški paket +4,00 €`);
    }

    if (p.length > 100) {
      bulky += 4;
      warnings.push(`Paket ${i + 1}: glomazni paket +4,00 €`);
    }

    base += tierPrice(OS_SINGLE, Math.min(p.weight, 31.5)) || 0;
  }

  if (reasons.length) return fail("Overseas Single", "MBE Economy", reasons);

  let price = base * 1.05 + (cod ? 0.3 : 0);
  if (isOverseasSpecial(postal)) price *= 1.2;
  price += heavy + bulky;

  const hasSurcharge = heavy > 0 || bulky > 0;

  return {
    name: "Overseas Single",
    price: round2(price),
    possible: true,
    serviceType: "MBE Economy",
    status: hasSurcharge ? "surcharge" : "ok",
    details: [
      "Obračun po paketu",
      "+5% dodatak",
      cod ? "COD +0,30 €" : "Bez COD dodatka",
      isOverseasSpecial(postal) ? "Posebna zona / otok +20%" : "Standardna zona",
      ...(heavy ? [`Teški paket +${heavy.toFixed(2)} €`] : []),
      ...(bulky ? [`Glomazni paket +${bulky.toFixed(2)} €`] : []),
    ],
    warning: warnings.length ? warnings.join(" · ") : undefined,
  };
}

function calcOSMulti(items: NumericPackageItem[], postal: string, cod: boolean): PriceResult | null {
  if (items.length < 2) return null;

  const reasons: string[] = [];
  const warnings: string[] = [];

  let heavy = 0;
  let bulky = 0;

  for (let i = 0; i < items.length; i += 1) {
    const p = items[i];

    if (p.weight > 50 || girth(p) > 340 || p.length > 200) {
      reasons.push(`Paket ${i + 1}: grubo prelazi Overseas limite, moguća samo ručna provjera`);
      continue;
    }

    if (p.weight > 31.5) {
      heavy += 4;
      warnings.push(`Paket ${i + 1}: teški paket +4,00 €`);
    }

    if (p.length > 100) {
      bulky += 4;
      warnings.push(`Paket ${i + 1}: glomazni paket +4,00 €`);
    }
  }

  if (reasons.length) return fail("Overseas Multi", "MBE Economy", reasons);

  const kg = totalWeight(items);
  let base = tierPrice(OS_MULTI, kg);

  if (base === null) {
    base = 14.56 + Math.max(0, kg - 100) * 0.25;
  }

  let price = base * 1.05 + (cod ? 0.3 : 0);
  if (isOverseasSpecial(postal)) price *= 1.2;
  price += heavy + bulky;

  const hasSurcharge = heavy > 0 || bulky > 0;

  return {
    name: "Overseas Multi",
    price: round2(price),
    possible: true,
    serviceType: "MBE Economy",
    status: hasSurcharge ? "surcharge" : "ok",
    details: [
      "Obračun po pošiljci",
      "+5% dodatak",
      cod ? "COD +0,30 €" : "Bez COD dodatka",
      isOverseasSpecial(postal) ? "Posebna zona / otok +20%" : "Standardna zona",
      ...(heavy ? [`Teški paket +${heavy.toFixed(2)} €`] : []),
      ...(bulky ? [`Glomazni paket +${bulky.toFixed(2)} €`] : []),
    ],
    warning: warnings.length ? warnings.join(" · ") : undefined,
  };
}

function calcInTime(
  items: NumericPackageItem[],
  postal: string,
  cod: boolean,
  codAmountStr: string
): PriceResult {
  const actual = totalWeight(items);
  const volumetric = volumeWeightInTime(items);
  const chargeable = Math.max(actual, volumetric);
  const zone = getInTimeZone(postal);
  const base = tierPrice(INTIME[zone], chargeable);

  if (base === null) {
    return fail("InTime", "MBE Economy", ["Obračunska masa prelazi 3000 kg"]);
  }

  let price = base * 1.2;

  let codFee = 0;
  const codAmount = parseNum(codAmountStr) ?? 0;

  if (cod && codAmount > 0) {
    codFee = Math.max(1, Math.min(20, codAmount * 0.01));
    price += codFee;
  }

  return {
    name: "InTime",
    price: round2(price),
    possible: true,
    serviceType: "MBE Economy",
    status: codFee > 0 ? "surcharge" : "ok",
    details: [
      `Zona ${zone}`,
      `Stvarna masa ${actual} kg`,
      `Volumetrijska masa ${volumetric} kg`,
      `Obračunska masa ${chargeable} kg`,
      "+20% gorivo",
      ...(codFee ? [`COD ${codAmount} € → +${round2(codFee)} €`] : []),
    ],
  };
}

function ResultRow({ result, highlighted }: { result: PriceResult; highlighted: boolean }) {
  return (
    <div style={cardStyle(highlighted)}>
      <div style={{ display: "flex", justifyContent: "space-between", gap: 12, flexWrap: "wrap" }}>
        <div style={{ minWidth: 0, flex: 1 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 10, flexWrap: "wrap" }}>
            <CarrierPill name={result.name} />
            <div style={{ fontWeight: 700, fontSize: 20 }}>{result.name}</div>
          </div>

          <div style={{ marginTop: 8, display: "flex", gap: 8, flexWrap: "wrap" }}>
            <span style={serviceBadgeStyle(result.serviceType)}>{result.serviceType}</span>
            {statusBadge(result.status)}
            {highlighted && result.possible ? <span style={badgeStyle("info")}>Preporuka</span> : null}
          </div>

          <div style={{ color: "#555", marginTop: 10, lineHeight: 1.5 }}>{result.details.join(" · ")}</div>

          {result.warning ? (
            <div style={{ marginTop: 10, color: "#9a3412", fontWeight: 700, lineHeight: 1.5 }}>
              PAZI: {result.warning}
            </div>
          ) : null}
        </div>

        <div style={{ fontSize: 30, fontWeight: 800, whiteSpace: "nowrap" }}>{money(result.price)}</div>
      </div>
    </div>
  );
}

function CompactHero({ overallWinner, express }: { overallWinner: PriceResult | null; express: PriceResult | null }) {
  return (
    <div style={{ display: "grid", gap: 12 }}>
      <div style={cardStyle(!!overallWinner)}>
        <div style={{ fontSize: 12, color: "#64748b", textTransform: "uppercase", fontWeight: 800 }}>
          Preporuka
        </div>

        {overallWinner ? (
          <>
            <div style={{ display: "flex", alignItems: "center", gap: 10, flexWrap: "wrap", marginTop: 8 }}>
              <CarrierPill name={overallWinner.name} />
              <div style={{ fontSize: 26, fontWeight: 900 }}>{overallWinner.name}</div>
            </div>

            <div style={{ marginTop: 8, display: "flex", gap: 8, flexWrap: "wrap" }}>
              <span style={serviceBadgeStyle(overallWinner.serviceType)}>{overallWinner.serviceType}</span>
              {statusBadge(overallWinner.status)}
            </div>

            <div style={{ fontSize: 34, fontWeight: 900, marginTop: 8 }}>{money(overallWinner.price)}</div>

            {overallWinner.warning ? (
              <div style={{ marginTop: 8, color: "#9a3412", fontWeight: 700, lineHeight: 1.5 }}>
                PAZI: {overallWinner.warning}
              </div>
            ) : null}
          </>
        ) : (
          <div style={{ color: "#64748b", marginTop: 8 }}>Upiši poštanski broj i paket.</div>
        )}
      </div>

      <div style={cardStyle(false)}>
        <div style={{ fontSize: 12, color: "#64748b", textTransform: "uppercase", fontWeight: 800 }}>
          Express
        </div>

        {express ? (
          <>
            <div style={{ display: "flex", alignItems: "center", gap: 10, flexWrap: "wrap", marginTop: 8 }}>
              <CarrierPill name="GLS" />
              <div style={{ fontSize: 24, fontWeight: 900 }}>GLS</div>
            </div>

            <div style={{ marginTop: 8, display: "flex", gap: 8, flexWrap: "wrap" }}>
              <span style={serviceBadgeStyle(express.serviceType)}>{express.serviceType}</span>
              {statusBadge(express.status)}
            </div>

            <div style={{ fontSize: 30, fontWeight: 900, marginTop: 8 }}>{money(express.price)}</div>

            {express.warning ? (
              <div style={{ marginTop: 8, color: "#9a3412", fontWeight: 700, lineHeight: 1.5 }}>
                PAZI: {express.warning}
              </div>
            ) : null}
          </>
        ) : (
          <div style={{ color: "#64748b", marginTop: 8 }}>Rezultat će se prikazati ovdje.</div>
        )}
      </div>
    </div>
  );
}

export default function App() {
  const isMobile = useIsMobile();

  const [postalCode, setPostalCode] = useState("");
  const [cod, setCod] = useState(false);
  const [codAmount, setCodAmount] = useState("");
  const [packages, setPackages] = useState<PackageItem[]>([DEFAULT_FIRST_PACKAGE]);

  const normalized = useMemo(
    () =>
      packages.map((p) => ({
        weight: parseNum(p.weight) ?? 0,
        length: parseNum(p.length) ?? 0,
        width: parseNum(p.width) ?? 0,
        height: parseNum(p.height) ?? 0,
      })),
    [packages]
  );

  const isReady = useMemo(
    () =>
      postalCode.length === 5 &&
      packages.every((p) =>
        [p.weight, p.length, p.width, p.height].every((v) => v.trim() !== "" && (parseNum(v) ?? 0) > 0)
      ),
    [postalCode, packages]
  );

  const total = useMemo(() => totalWeight(normalized), [normalized]);

  const results = useMemo(() => {
    if (!isReady) return null;

    const multi = calcOSMulti(normalized, postalCode, cod);

    const economy = [
      calcDPD(normalized, postalCode),
      calcHP(normalized, cod),
      ...(normalized.length === 1 ? [calcOSSingle(normalized, postalCode, cod)] : []),
      calcInTime(normalized, postalCode, cod, codAmount),
      ...(multi ? [multi] : []),
    ].sort((a, b) => {
      if (a.possible !== b.possible) return a.possible ? -1 : 1;
      return (a.price ?? Infinity) - (b.price ?? Infinity);
    });

    const express = calcGLS(normalized, postalCode, cod);

    const allPossible = [...economy, express].filter((x) => x.possible && x.price !== null);
    const overallWinner = allPossible.length
      ? [...allPossible].sort((a, b) => (a.price ?? Infinity) - (b.price ?? Infinity))[0]
      : null;

    return { economy, express, overallWinner };
  }, [postalCode, normalized, cod, codAmount, isReady]);

  const reviewSurcharges = useMemo(() => {
    if (!results) return [];

    const surchargeDetails = [...results.economy, results.express]
      .filter((r) => r.status === "surcharge")
      .flatMap((r) =>
        r.details.filter((d) => d.includes("+") && /(dimenz|tež|teški|glomaz|otočna|cod)/i.test(d))
      );

    return [...new Set(surchargeDetails)];
  }, [results]);

  const updatePackage = (index: number, field: keyof PackageItem, value: string) => {
    setPackages((prev) => prev.map((p, i) => (i === index ? { ...p, [field]: value } : p)));
  };

  const addPackage = () => {
    setPackages((prev) => [...prev, { ...DEFAULT_NEW_PACKAGE }]);
  };

  const duplicatePackage = (index: number) => {
    setPackages((prev) => [
      ...prev.slice(0, index + 1),
      { ...prev[index] },
      ...prev.slice(index + 1),
    ]);
  };

  const removePackage = (index: number) => {
    setPackages((prev) => (prev.length === 1 ? prev : prev.filter((_, i) => i !== index)));
  };

  const resetShipment = () => {
    setPostalCode("");
    setCod(false);
    setCodAmount("");
    setPackages([{ ...DEFAULT_FIRST_PACKAGE }]);
  };

  const commonInputProps = {
    onFocus: (e: FocusEvent<HTMLInputElement>) => e.target.select(),
  };

  const additionalPackages = packages.slice(1);

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "#f8fafc",
        padding: isMobile ? 12 : 16,
        paddingBottom: isMobile ? 140 : 16,
        fontFamily: "Ubuntu, Arial, sans-serif",
      }}
    >
      <div style={{ maxWidth: 980, margin: "0 auto", display: "grid", gap: 14 }}>
        <div style={{ ...cardStyle(), padding: isMobile ? 14 : 16 }}>
          <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", gap: 12 }}>
            <div>
              <div style={{ display: "flex", alignItems: "center", gap: 10, flexWrap: "wrap" }}>
                <div style={carrierPillStyle("MBE")}>MAIL BOXES ETC.</div>
                <div style={{ fontSize: isMobile ? 18 : 24, fontWeight: 900, lineHeight: 1.05 }}>
                  SmartChoice
                </div>
              </div>
              <div style={{ color: "#64748b", marginTop: 4, fontSize: isMobile ? 14 : 16 }}>
                Mail Boxes Etc. Križevci
              </div>
            </div>

            <button
              style={{
                ...buttonStyle(),
                minHeight: 38,
                padding: isMobile ? "8px 12px" : "10px 14px",
                fontSize: isMobile ? 15 : 16,
              }}
              onClick={resetShipment}
            >
              Reset
            </button>
          </div>
        </div>

        <div style={{ display: "grid", gap: 14, gridTemplateColumns: isMobile ? "1fr" : "1.05fr 0.95fr" }}>
          <div style={cardStyle()}>
            <div style={{ display: "grid", gap: 10 }}>
              <div>
                <label style={{ display: "block", marginBottom: 6, fontWeight: 800 }}>Poštanski broj</label>
                <input
                  {...commonInputProps}
                  inputMode="numeric"
                  value={postalCode}
                  onChange={(e) => setPostalCode(e.target.value.replace(/\D/g, "").slice(0, 5))}
                  placeholder="npr. 51550"
                  style={inputStyle()}
                />
              </div>

              <div>
                <div style={{ fontWeight: 800, marginBottom: 6, fontSize: isMobile ? 16 : 18 }}>Paket 1</div>

                <div style={{ display: "grid", gridTemplateColumns: isMobile ? "1fr 1fr" : "repeat(4, minmax(0,1fr))", gap: 10 }}>
                  {(["weight", "length", "width", "height"] as const).map((field) => (
                    <div key={field}>
                      <label style={{ display: "block", marginBottom: 6 }}>
                        {field === "weight" ? "Težina" : field === "length" ? "Duljina" : field === "width" ? "Širina" : "Visina"}
                      </label>
                      <input
                        {...commonInputProps}
                        inputMode="decimal"
                        type="text"
                        value={packages[0]?.[field] ?? ""}
                        onChange={(e) => updatePackage(0, field, e.target.value)}
                        placeholder={field === "weight" ? "kg" : "cm"}
                        style={inputStyle()}
                      />
                    </div>
                  ))}
                </div>
              </div>

              <label style={{ display: "flex", alignItems: "center", gap: 10, fontSize: 16 }}>
                <input type="checkbox" checked={cod} onChange={(e) => setCod(e.target.checked)} />
                COD / pouzeće
              </label>

              {cod ? (
                <div>
                  <label style={{ display: "block", marginBottom: 6, fontWeight: 700 }}>Iznos pouzeća (€)</label>
                  <input
                    {...commonInputProps}
                    type="text"
                    inputMode="decimal"
                    value={codAmount}
                    onChange={(e) => setCodAmount(e.target.value)}
                    placeholder="npr. 100"
                    style={inputStyle()}
                  />
                  <div style={{ fontSize: 12, color: "#64748b", marginTop: 4 }}>
                    InTime COD: 1% od iznosa, min 1 €, max 20 €.
                  </div>
                </div>
              ) : null}

              <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
                <button style={buttonStyle()} onClick={() => duplicatePackage(0)}>Dupliciraj paket 1</button>
                <button style={buttonStyle(true)} onClick={addPackage}>Dodaj paket</button>
              </div>
            </div>
          </div>

          <CompactHero overallWinner={results?.overallWinner ?? null} express={results?.express ?? null} />
        </div>

        <details open={additionalPackages.length > 0} style={cardStyle()}>
          <summary style={sectionSummaryStyle()}>
            <span>Dodatni paketi {additionalPackages.length ? `(${additionalPackages.length})` : ""}</span>
            <span style={{ color: "#64748b", fontWeight: 700 }}>
              {additionalPackages.length ? "otvori / zatvori" : "nema"}
            </span>
          </summary>

          {additionalPackages.length ? (
            <div style={{ marginTop: 14, display: "grid", gap: 12 }}>
              {additionalPackages.map((pkg, localIndex) => {
                const index = localIndex + 1;

                return (
                  <div key={index} style={{ ...cardStyle(), padding: 14 }}>
                    <div style={{ display: "flex", justifyContent: "space-between", gap: 8, flexWrap: "wrap", marginBottom: 10 }}>
                      <strong>Paket {index + 1}</strong>
                      <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
                        <button style={buttonStyle()} onClick={() => duplicatePackage(index)}>Dupliciraj</button>
                        <button style={buttonStyle()} onClick={() => removePackage(index)}>Obriši</button>
                      </div>
                    </div>

                    <div style={{ display: "grid", gridTemplateColumns: isMobile ? "1fr 1fr" : "repeat(4, minmax(0,1fr))", gap: 10 }}>
                      {(["weight", "length", "width", "height"] as const).map((field) => (
                        <div key={field}>
                          <label style={{ display: "block", marginBottom: 6 }}>
                            {field === "weight" ? "Težina" : field === "length" ? "Duljina" : field === "width" ? "Širina" : "Visina"}
                          </label>
                          <input
                            {...commonInputProps}
                            inputMode="decimal"
                            type="text"
                            value={pkg[field]}
                            onChange={(e) => updatePackage(index, field, e.target.value)}
                            placeholder={field === "weight" ? "kg" : "cm"}
                            style={inputStyle()}
                          />
                        </div>
                      ))}
                    </div>
                  </div>
                );
              })}
            </div>
          ) : (
            <div style={{ marginTop: 12, color: "#64748b" }}>Za više od jednog paketa klikni “Dodaj paket”.</div>
          )}
        </details>

        <details style={cardStyle()} open>
          <summary style={sectionSummaryStyle()}>
            <span>Sve economy opcije</span>
            <span style={{ color: "#64748b", fontWeight: 700 }}>
              {results ? `${results.economy.length} opcija` : "čeka unos"}
            </span>
          </summary>

          {results ? (
            <div style={{ marginTop: 14, display: "grid", gap: 12 }}>
              {results.economy.map((r) => (
                <ResultRow key={r.name} result={r} highlighted={r.name === results.overallWinner?.name} />
              ))}
            </div>
          ) : (
            <div style={{ marginTop: 12, color: "#64748b" }}>Upiši poštanski broj i sve dimenzije paketa.</div>
          )}
        </details>
      </div>

      <div
        style={{
          position: isMobile ? "fixed" : "sticky",
          left: 0,
          right: 0,
          bottom: 0,
          zIndex: 30,
          padding: isMobile ? "10px 12px calc(10px + env(safe-area-inset-bottom))" : 0,
          background: isMobile ? "rgba(248,250,252,.96)" : "transparent",
          backdropFilter: isMobile ? "blur(10px)" : "none",
          borderTop: isMobile ? "1px solid #e5e7eb" : "none",
        }}
      >
        <div style={{ maxWidth: 980, margin: "0 auto" }}>
          <details style={cardStyle()}>
            <summary style={sectionSummaryStyle()}>
              <span>Pregled pošiljke</span>
              <span style={{ color: "#64748b", fontWeight: 700, display: "flex", alignItems: "center", gap: 8 }}>
                <span>{results?.overallWinner ? money(results.overallWinner.price) : postalCode || "—"}</span>
                <span style={{ fontSize: 12 }}>otvori ▾</span>
              </span>
            </summary>

            <div style={{ marginTop: 12, display: "grid", gap: 8, color: "#475569" }}>
              <div>Poštanski broj: <strong>{postalCode || "-"}</strong></div>
              <div>Broj paketa: <strong>{packages.length}</strong></div>
              <div>Pošiljka: <strong>{packages.length === 1 ? "1 paket" : `${packages.length} paketa`}</strong></div>
              <div>Ukupna težina: <strong>{total.toFixed(2)} kg</strong></div>
              <div>Otok: <strong>{postalCode ? (isIsland(postalCode) ? "Da" : "Ne") : "-"}</strong></div>
              <div>
                Nestandardno: {" "}
                <strong>
                  {results
                    ? [...results.economy, results.express].some((r) => r.status === "surcharge")
                      ? "Da"
                      : "Ne"
                    : "-"}
                </strong>
              </div>
              <div>
                Nadoplate: {" "}
                <strong>
                  {results
                    ? reviewSurcharges.length
                      ? reviewSurcharges.join(" · ")
                      : "Nema"
                    : "-"}
                </strong>
              </div>
              <div>
                Najpovoljnija opcija: {" "}
                <strong>
                  {results?.overallWinner
                    ? `${results.overallWinner.name} (${money(results.overallWinner.price)})`
                    : "-"}
                </strong>
              </div>
            </div>
          </details>
        </div>
      </div>
    </div>
  );
}
