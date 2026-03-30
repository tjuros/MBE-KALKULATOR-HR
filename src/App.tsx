import { useMemo, useState } from "react";

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

function round2(n: number) {
  return Math.round((n + Number.EPSILON) * 100) / 100;
}

function money(n: number | null) {
  if (n === null) return "Nije moguće";
  return `${round2(n).toFixed(2)} €`;
}

function isIsland(postal: string) {
  return SMALL_ISLANDS.has(postal);
}

function isOverseasSpecial(postal: string) {
  return isIsland(postal) || postal.startsWith("20");
}

function isGlsPossible(postal: string) {
  if (!postal || postal.length !== 5) return false;
  if (!isIsland(postal)) return true;
  return GLS_ALLOWED_ISLANDS.has(postal);
}

function getInTimeZone(postal: string) {
  if (INTIME_ZONE_3.has(postal)) return 3;
  if (INTIME_ZONE_2.has(postal)) return 2;
  return 1;
}

function getInTimeBase(weight: number, zone: 1 | 2 | 3) {
  const tables: Record<1 | 2 | 3, Array<{ max: number; price: number }>> = {
    1: [
      { max: 2, price: 3.9 }, { max: 5, price: 4.47 }, { max: 10, price: 5.57 },
      { max: 15, price: 6.69 }, { max: 20, price: 7.79 }, { max: 25, price: 10.03 },
      { max: 30, price: 11.29 }, { max: 35, price: 13.8 }, { max: 40, price: 16.29 },
      { max: 45, price: 21.9 }, { max: 50, price: 24.6 }, { max: 60, price: 27.3 },
      { max: 70, price: 30.2 }, { max: 80, price: 33.2 }, { max: 90, price: 36.17 },
      { max: 100, price: 39.12 },
    ],
    2: [
      { max: 2, price: 4.47 }, { max: 5, price: 5.57 }, { max: 10, price: 6.69 },
      { max: 15, price: 7.79 }, { max: 20, price: 10.03 }, { max: 25, price: 13.8 },
      { max: 30, price: 15.06 }, { max: 35, price: 17.56 }, { max: 40, price: 20.7 },
      { max: 45, price: 27.4 }, { max: 50, price: 32.9 }, { max: 60, price: 37.4 },
      { max: 70, price: 42.1 }, { max: 80, price: 47.9 }, { max: 90, price: 52.8 },
      { max: 100, price: 57.7 },
    ],
    3: [
      { max: 2, price: 8.61 }, { max: 5, price: 10.33 }, { max: 10, price: 12.05 },
      { max: 15, price: 14.56 }, { max: 20, price: 17.2 }, { max: 25, price: 18.93 },
      { max: 30, price: 20.65 }, { max: 35, price: 25.15 }, { max: 40, price: 29.13 },
      { max: 45, price: 35.8 }, { max: 50, price: 40.1 }, { max: 60, price: 45.2 },
      { max: 70, price: 50.1 }, { max: 80, price: 55.2 }, { max: 90, price: 60.2 },
      { max: 100, price: 65.4 },
    ],
  };

  const row = tables[zone].find((r) => weight <= r.max);
  return row ? row.price : null;
}

export default function App() {
  const [postal, setPostal] = useState("");
  const [weight, setWeight] = useState(1);
  const [packages, setPackages] = useState(1);
  const [cod, setCod] = useState(false);

  const hp = useMemo(() => {
    let price = 2.2;
    if (weight > 5) price = 2.8;
    if (weight > 10) price = 3.3;
    if (weight > 15) price = 4.05;
    if (weight > 20) price = 5.45;
    if (weight > 30) price = 5.45 + Math.ceil((weight - 30) / 5) * 1;
    if (cod) price += 0.5;
    return round2(price);
  }, [weight, cod]);

  const gls = useMemo(() => {
    if (!isGlsPossible(postal)) return null;

    let base = 3.1;
    if (weight > 2) base = 3.3;
    if (weight > 3) base = 4.08;
    if (weight > 5) base = 5.25;
    if (weight > 10) base = 5.93;
    if (weight > 15) base = 7.33;
    if (weight > 20) base = 7.9;
    if (weight > 25) base = 9.32;
    if (weight > 30) return null;

    if (packages >= 2 && packages <= 4) base *= 0.75;
    if (packages >= 5) base *= 0.65;

    let price = base * packages;
    price *= 1.19;
    if (cod) price += 0.43;
    return round2(price);
  }, [postal, weight, packages, cod]);

  const dpd = useMemo(() => {
    if (!postal || postal.length !== 5) return null;
    if (weight > 31.5) return null;

    let base = 2.59;
    if (weight > 2) base = 2.67;
    if (weight > 5) base = 3.25;
    if (weight > 15) base = 4.09;
    if (weight > 25) base = 5.64;

    let price = packages >= 2 ? packages * 2.89 : base * packages;

    if (isIsland(postal) && !DPD_FREE_ISLANDS.has(postal)) {
      price += 3.5;
    }

    return round2(price);
  }, [postal, weight, packages]);

  const overseasSingle = useMemo(() => {
    let base = 2.61;
    if (weight > 10) base = 3.24;
    if (weight > 20) base = 3.52;
    if (weight > 31.5) return null;

    let price = base * packages;
    price *= 1.05;
    if (isOverseasSpecial(postal)) price *= 1.2;
    if (cod) price += 0.3;
    return round2(price);
  }, [postal, weight, packages, cod]);

  const overseasMulti = useMemo(() => {
    if (packages < 2) return null;

    const totalWeight = weight * packages;
    let base = 2.63;
    if (totalWeight > 5) base = 2.84;
    if (totalWeight > 10) base = 4.17;
    if (totalWeight > 20) base = 5.4;
    if (totalWeight > 30) base = 6.31;
    if (totalWeight > 40) base = 7.81;
    if (totalWeight > 50) base = 8.74;
    if (totalWeight > 60) base = 10.09;
    if (totalWeight > 70) base = 11.8;
    if (totalWeight > 80) base = 13.21;
    if (totalWeight > 90) base = 14.56;
    if (totalWeight > 100) base = 14.56 + (totalWeight - 100) * 0.25;

    let price = base;
    price *= 1.05;
    if (isOverseasSpecial(postal)) price *= 1.2;
    if (cod) price += 0.3;
    return round2(price);
  }, [postal, weight, packages, cod]);

  const inTime = useMemo(() => {
    if (!postal || postal.length !== 5) return null;

    const totalWeight = weight * packages;
    const zone = getInTimeZone(postal) as 1 | 2 | 3;
    const base = getInTimeBase(totalWeight, zone);
    if (base === null) return null;
    return {
      zone,
      price: round2(base * 1.15),
    };
  }, [postal, weight, packages]);

  const economyOptions = [
    { name: "HP", price: hp },
    { name: "DPD", price: dpd },
    { name: "Overseas Single", price: overseasSingle },
    ...(overseasMulti !== null ? [{ name: "Overseas Multi", price: overseasMulti }] : []),
    { name: "InTime", price: inTime?.price ?? null },
  ].filter((x) => x.price !== null) as Array<{ name: string; price: number }>;

  const bestEconomy =
    economyOptions.length > 0
      ? [...economyOptions].sort((a, b) => a.price - b.price)[0]
      : null;

  return (
    <div style={{ padding: 20, fontFamily: "Arial", maxWidth: 760, margin: "0 auto" }}>
      <h1>MBE kalkulator</h1>

      <div style={{ display: "grid", gap: 12, marginBottom: 20 }}>
        <input
          placeholder="Poštanski broj"
          value={postal}
          onChange={(e) => setPostal(e.target.value.replace(/\D/g, "").slice(0, 5))}
          style={{ padding: 12, fontSize: 16 }}
        />

        <input
          type="number"
          value={weight}
          onChange={(e) => setWeight(Number(e.target.value))}
          style={{ padding: 12, fontSize: 16 }}
          placeholder="Težina po paketu"
        />

        <input
          type="number"
          value={packages}
          onChange={(e) => setPackages(Number(e.target.value))}
          style={{ padding: 12, fontSize: 16 }}
          placeholder="Broj paketa"
        />

        <label style={{ fontSize: 16 }}>
          <input
            type="checkbox"
            checked={cod}
            onChange={(e) => setCod(e.target.checked)}
            style={{ marginRight: 8 }}
          />
          COD
        </label>
      </div>

      <hr />

      <h2>MBE Economy</h2>
      {bestEconomy ? (
        <div style={{ marginBottom: 12, padding: 12, background: "#eef6ee", borderRadius: 8 }}>
          <strong>Najpovoljnija economy opcija:</strong> {bestEconomy.name} — {money(bestEconomy.price)}
        </div>
      ) : (
        <div>Nema valjane economy opcije.</div>
      )}

      <div style={{ display: "grid", gap: 8, marginBottom: 24 }}>
        <div>HP: {money(hp)}</div>
        <div>DPD: {money(dpd)}</div>
        <div>Overseas Single: {money(overseasSingle)}</div>
        {overseasMulti !== null && <div>Overseas Multi: {money(overseasMulti)}</div>}
        <div>
          InTime: {inTime ? `${money(inTime.price)} (Z${inTime.zone})` : "Nije moguće"}
        </div>
      </div>

      <h2>MBE Express</h2>
      <div>GLS: {money(gls)}</div>

      <hr style={{ margin: "24px 0" }} />

      <div style={{ fontSize: 14, color: "#555" }}>
        <div>Otok: {isIsland(postal) ? "Da" : "Ne"}</div>
        <div>Overseas posebna zona: {isOverseasSpecial(postal) ? "Da" : "Ne"}</div>
        <div>InTime zona: {postal.length === 5 ? `Z${getInTimeZone(postal)}` : "-"}</div>
      </div>
    </div>
  );
}
