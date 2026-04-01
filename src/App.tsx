import { useEffect, useMemo, useState } from "react";

type PackageItem = {
  weight: string;
  length: string;
  width: string;
  height: string;
};

type CarrierStatus = "ok" | "surcharge" | "no";

type PriceResult = {
  name: string;
  price: number | null;
  possible: boolean;
  details: string[];
  serviceType: "MBE Economy" | "MBE Express";
  warning?: string;
  manualCheck?: boolean;
  status: CarrierStatus;
};

const ISLAND_POSTALS = new Set([
  "20221", "20222", "20223", "20224", "20225", "20226", "20289", "20290",
  "21225",
  "21430", "21432",
  "22232", "22233", "22234", "22235", "22236",
  "23281", "23282", "23283", "23284", "23285", "23286", "23287",
  "23291", "23292", "23293", "23294", "23295", "23296",
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
  "51500", "51511", "51512", "51513", "51514", "51515", "51516", "51517",
  "51280",
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

function parseNum(value: string) {
  if (value.trim() === "") return null;
  const normalized = value.replace(",", ".");
  const parsed = Number(normalized);
  return Number.isFinite(parsed) ? parsed : null;
}

function isIsland(postal: string) {
  return ISLAND_POSTALS.has(postal);
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

function totalWeight(items: Array<{ weight: number; length: number; width: number; height: number }>) {
  return round2(items.reduce((sum, item) => sum + Number(item.weight || 0), 0));
}

function volumeWeightInTime(items: Array<{ weight: number; length: number; width: number; height: number }>) {
  return round2(
    items.reduce((sum, p) => {
      const l = Number(p.length || 0) / 100;
      const w = Number(p.width || 0) / 100;
      const h = Number(p.height || 0) / 100;
      return sum + l * w * h * 200;
    }, 0)
  );
}

function girth(p: { length: number; width: number; height: number }) {
  return Number(p.length) + 2 * Number(p.width) + 2 * Number(p.height);
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

function inputStyle(): React.CSSProperties {
  return {
    padding: "14px 12px",
    fontSize: 17,
