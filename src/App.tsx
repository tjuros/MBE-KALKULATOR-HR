// === APP.TSX (FINAL) ===

import { useEffect, useMemo, useState, type CSSProperties, type FocusEvent } from "react";

/* =========================
   TIPOVI
========================= */

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

/* =========================
   DEFAULT
========================= */

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

/* =========================
   OTOK = MASTER LISTA
========================= */

const ISLAND_POSTALS = new Set([
  "20221","20222","20223","20224","20225","20226","20289","20290",
  "20260","20263","20264","20267","20269","20270","20271","20272","20273","20274","20275",
  "21225",
  "21400","21403","21404","21405","21410","21412","21413","21420","21423","21424","21425","21426",
  "21430","21432",
  "21450","21454","21460","21462","21463","21465","21466","21467","21468","21469",
  "21480","21483","21485",
  "22232","22233","22234","22235","22236",
  "23281","23282","23283","23284","23285","23286","23287",
  "23291","23292","23293","23294","23295","23296",
  "51280","51281",
  "51550","51551","51552","51554","51555","51557","51561","51562",
]);

const INTIME_ZONE_3 = new Set([...Array.from(ISLAND_POSTALS)]);

const INTIME_ZONE_2 = new Set([
  "20000","20205","20207","20210","20215","20216","20217","20218",
  "20231","20232","20233","20234","20235","20236",
  "20225","20230","20240","20244","20246","20250",
]);

/* =========================
   CIJENE (skraćeno - već imaš sve)
========================= */

const INTIME = {
  1: [{ max: 2, price: 3.9 }, { max: 1000, price: 169.3 }],
  2: [{ max: 2, price: 4.47 }, { max: 1000, price: 197.8 }],
  3: [{ max: 2, price: 8.61 }, { max: 1000, price: 385.9 }],
} as const;

/* =========================
   HELPERI
========================= */

const round2 = (n: number) => Math.round((n + Number.EPSILON) * 100) / 100;

function money(n: number | null) {
  if (n === null) return "—";
  return new Intl.NumberFormat("hr-HR", {
    style: "currency",
    currency: "EUR",
  }).format(n);
}

function parseNum(v: string) {
  if (!v) return null;
  const n = Number(v.replace(",", "."));
  return isFinite(n) ? n : null;
}

const isIsland = (postal: string) => ISLAND_POSTALS.has(postal);

function getInTimeZone(postal: string) {
  if (INTIME_ZONE_3.has(postal)) return 3;
  if (INTIME_ZONE_2.has(postal)) return 2;
  return 1;
}

/* =========================
   CALC INTIME (FINAL)
========================= */

function calcInTime(
  items: NumericPackageItem[],
  postal: string,
  cod: boolean,
  codAmountStr: string
): PriceResult {
  const weight = items.reduce((s, p) => s + p.weight, 0);
  const zone = getInTimeZone(postal);

  const base = INTIME[zone][0].price;
  let price = base * 1.2; // gorivo

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
      `Težina ${weight} kg`,
      "+20% gorivo",
      ...(codFee ? [`COD +${round2(codFee)} €`] : []),
    ],
  };
}

/* =========================
   UI
========================= */

export default function App() {
  const [postal, setPostal] = useState("");
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

  const result = useMemo(() => {
    if (postal.length !== 5) return null;
    return calcInTime(normalized, postal, cod, codAmount);
  }, [postal, normalized, cod, codAmount]);

  return (
    <div style={{ padding: 20, fontFamily: "Arial" }}>
      <h2>MBE Križevci kalkulator</h2>

      <input
        placeholder="Poštanski broj"
        value={postal}
        onChange={(e) => setPostal(e.target.value)}
      />

      <br /><br />

      <input
        placeholder="Težina"
        value={packages[0].weight}
        onChange={(e) =>
          setPackages([{ ...packages[0], weight: e.target.value }])
        }
      />

      <br /><br />

      <label>
        <input type="checkbox" checked={cod} onChange={() => setCod(!cod)} />
        COD
      </label>

      {cod && (
        <>
          <br />
          <input
            placeholder="Iznos"
            value={codAmount}
            onChange={(e) => setCodAmount(e.target.value)}
          />
        </>
      )}

      <br /><br />

      {result && (
        <div>
          <h3>{result.name}</h3>
          <strong>{money(result.price)}</strong>
          <div>{result.details.join(" | ")}</div>
        </div>
      )}
    </div>
  );
}
