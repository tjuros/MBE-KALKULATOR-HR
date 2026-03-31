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

const INTIME_TABLE = {
  1: [
    { max: 2, price: 3.9 }, { max: 5, price: 4.47 }, { max: 10, price: 5.57 }, { max: 15, price: 6.69 },
    { max: 20, price: 7.79 }, { max: 25, price: 10.03 }, { max: 30, price: 11.29 }, { max: 35, price: 13.8 },
    { max: 40, price: 16.29 }, { max: 45, price: 21.9 }, { max: 50, price: 24.6 }, { max: 60, price: 27.3 },
    { max: 70, price: 30.2 }, { max: 80, price: 33.2 }, { max: 90, price: 36.17 }, { max: 100, price: 39.12 },
  ],
  2: [
    { max: 2, price: 4.47 }, { max: 5, price: 5.57 }, { max: 10, price: 6.69 }, { max: 15, price: 7.79 },
    { max: 20, price: 10.03 }, { max: 25, price: 13.8 }, { max: 30, price: 15.06 }, { max: 35, price: 17.56 },
    { max: 40, price: 20.7 }, { max: 45, price: 27.4 }, { max: 50, price: 32.9 }, { max: 60, price: 37.4 },
    { max: 70, price: 42.1 }, { max: 80, price: 47.9 }, { max: 90, price: 52.8 }, { max: 100, price: 57.7 },
  ],
  3: [
    { max: 2, price: 8.61 }, { max: 5, price: 10.33 }, { max: 10, price: 12.05 }, { max: 15, price: 14.56 },
    { max: 20, price: 17.2 }, { max: 25, price: 18.93 }, { max: 30, price: 20.65 }, { max: 35, price: 25.15 },
    { max: 40, price: 29.13 }, { max: 45, price: 35.8 }, { max: 50, price: 40.1 }, { max: 60, price: 45.2 },
    { max: 70, price: 50.1 }, { max: 80, price: 55.2 }, { max: 90, price: 60.2 }, { max: 100, price: 65.4 },
  ],
} as const;

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
  if (INTIME_ZONE_3.has(postal)) return 3 as const;
  if (INTIME_ZONE_2.has(postal)) return 2 as const;
  return 1 as const;
}

function tierPrice(table: Array<{ max: number; price: number }>, value: number) {
  const row = table.find((r) => value <= r.max);
  return row ? row.price : null;
}

function totalRealWeight(items: PackageItem[]) {
  return round2(items.reduce((sum, item) => sum + item.weight, 0));
}

function totalVolumetricWeight(items: PackageItem[]) {
  return round2(
    items.reduce((sum, item) => {
      const l = item.length / 100;
      const w = item.width / 100;
      const h = item.height / 100;
      return sum + l * w * h * 200;
    }, 0)
  );
}

function packageGirth(item: PackageItem) {
  return item.length + 2 * item.width + 2 * item.height;
}

function baseInputStyle(): React.CSSProperties {
  return {
    padding: 12,
    fontSize: 16,
    border: "1px solid #d0d7de",
    borderRadius: 8,
    width: "100%",
    boxSizing: "border-box",
  };
}

function cardStyle(highlight = false): React.CSSProperties {
  return {
    border: highlight ? "2px solid #16a34a" : "1px solid #e5e7eb",
    background: highlight ? "#f0fdf4" : "#fff",
    borderRadius: 12,
    padding: 16,
  };
}

function calcHP(items: PackageItem[], cod: boolean): PriceResult {
  for (let i = 0; i < items.length; i += 1) {
    const p = items[i];
    const longest = Math.max(p.length, p.width, p.height);
    const sum = p.length + p.width + p.height;
    if (longest > 60) {
      return { name: "HP", price: null, possible: false, details: [`Paket ${i + 1}: najduža stranica > 60 cm`] };
    }
    if (sum > 180) {
      return { name: "HP", price: null, possible: false, details: [`Paket ${i + 1}: zbroj stranica > 180 cm`] };
    }
  }

  const total = totalRealWeight(items);
  let price = tierPrice(HP_TABLE, total);
  if (price === null) price = 5.45 + Math.ceil((total - 30) / 5) * 1;
  if (cod) price += 0.5;

  return {
    name: "HP",
    price: round2(price),
    possible: true,
    details: ["Obračun po pošiljci", cod ? "COD +0,50 €" : "Bez COD dodatka", "Bez otočnih nadoplata"],
  };
}

function calcGLS(items: PackageItem[], postal: string, cod: boolean): PriceResult {
  if (!isGlsPossible(postal)) {
    return { name: "GLS", price: null, possible: false, details: ["GLS nije moguć za ovaj poštanski broj / otok"] };
  }

  const table = items.length === 1 ? GLS_1 : items.length <= 4 ? GLS_2_4 : GLS_5P;
  let sum = 0;

  for (let i = 0; i < items.length; i += 1) {
    const p = items[i];
    if (p.weight > 40) return { name: "GLS", price: null, possible: false, details: [`Paket ${i + 1}: masa > 40 kg`] };
    if (p.length > 200 || p.width > 80 || p.height > 60) {
      return { name: "GLS", price: null, possible: false, details: [`Paket ${i + 1}: prelazi 200×80×60 cm`] };
    }
    if (packageGirth(p) > 300) {
      return { name: "GLS", price: null, possible: false, details: [`Paket ${i + 1}: L+2Š+2V > 300 cm`] };
    }
    const base = tierPrice(table, p.weight);
    if (base === null) return { name: "GLS", price: null, possible: false, details: [`Paket ${i + 1}: nema cijene za masu`] };
    sum += base;
  }

  sum *= 1.19;
  if (cod) sum += 0.43;

  return {
    name: "GLS",
    price: round2(sum),
    possible: true,
    details: [items.length === 1 ? "1 paket cjenik" : items.length <= 4 ? "2–4 paketa cjenik" : "5+ paketa cjenik", "+19% dodatak", cod ? "COD +0,43 €" : "Bez COD dodatka"],
  };
}

function calcDPD(items: PackageItem[], postal: string): PriceResult {
  for (let i = 0; i < items.length; i += 1) {
    const p = items[i];
    if (p.weight > 31.5) return { name: "DPD", price: null, possible: false, details: [`Paket ${i + 1}: masa > 31,5 kg`] };
    if (p.length > 175) return { name: "DPD", price: null, possible: false, details: [`Paket ${i + 1}: duljina > 175 cm`] };
    if (packageGirth(p) > 300) return { name: "DPD", price: null, possible: false, details: [`Paket ${i + 1}: L+2Š+2V > 300 cm`] };
  }

  let price = 0;
  if (items.length >= 2) {
    price = items.length * 2.89;
  } else {
    const base = tierPrice(DPD_TABLE, items[0].weight);
    if (base === null) return { name: "DPD", price: null, possible: false, details: ["Nema DPD cijene za ovu masu"] };
    price = base;
  }

  const details = [items.length >= 2 ? "2+ paketa: 2,89 € po paketu" : "Standardni cjenik", "COD uključen"];
  if (isIsland(postal) && !DPD_FREE_ISLANDS.has(postal)) {
    price += 3.5;
    details.push("Otočna nadoplata +3,50 €");
  }

  return { name: "DPD", price: round2(price), possible: true, details };
}

function calcOSSingle(items: PackageItem[], postal: string, cod: boolean): PriceResult {
  let base = 0;
  for (let i = 0; i < items.length; i += 1) {
    const p = items[i];
    if (p.weight > 31.5) return { name: "Overseas Single", price: null, possible: false, details: [`Paket ${i + 1}: masa > 31,5 kg`] };
    if (p.length > 100) return { name: "Overseas Single", price: null, possible: false, details: [`Paket ${i + 1}: duljina > 100 cm`] };
    if (packageGirth(p) > 340) return { name: "Overseas Single", price: null, possible: false, details: [`Paket ${i + 1}: L+2Š+2V > 340 cm`] };
    const row = tierPrice(OS_SINGLE, p.weight);
    if (row === null) return { name: "Overseas Single", price: null, possible: false, details: [`Paket ${i + 1}: nema cijene za ovu masu`] };
    base += row;
  }

  let price = base * 1.05;
  if (cod) price += 0.3;
  if (isOverseasSpecial(postal)) price *= 1.2;

  return {
    name: "Overseas Single",
    price: round2(price),
    possible: true,
    details: ["Obračun po paketu", "+5% dodatak", cod ? "COD +0,30 €" : "Bez COD dodatka", isOverseasSpecial(postal) ? "Posebna zona / otok +20%" : "Standardna zona"],
  };
}

function calcOSMulti(items: PackageItem[], postal: string, cod: boolean): PriceResult | null {
  if (items.length < 2) return null;

  for (let i = 0; i < items.length; i += 1) {
    const p = items[i];
    if (p.weight > 31.5) return { name: "Overseas Multi", price: null, possible: false, details: [`Paket ${i + 1}: masa > 31,5 kg`] };
    if (p.length > 100) return { name: "Overseas Multi", price: null, possible: false, details: [`Paket ${i + 1}: duljina > 100 cm`] };
    if (packageGirth(p) > 340) return { name: "Overseas Multi", price: null, possible: false, details: [`Paket ${i + 1}: L+2Š+2V > 340 cm`] };
  }

  const total = totalRealWeight(items);
  let base = tierPrice(OS_MULTI, total);
  if (base === null) base = 14.56 + Math.max(0, total - 100) * 0.25;

  let price = base * 1.05;
  if (cod) price += 0.3;
  if (isOverseasSpecial(postal)) price *= 1.2;

  return {
    name: "Overseas Multi",
    price: round2(price),
    possible: true,
    details: ["Obračun po pošiljci", "+5% dodatak", cod ? "COD +0,30 €" : "Bez COD dodatka", isOverseasSpecial(postal) ? "Posebna zona / otok +20%" : "Standardna zona"],
  };
}

function calcInTime(items: PackageItem[], postal: string): PriceResult {
  const real = totalRealWeight(items);
  const volumetric = totalVolumetricWeight(items);
  const chargeable = Math.max(real, volumetric);
  const zone = getInTimeZone(postal);
  const base = tierPrice([...INTIME_TABLE[zone]], chargeable);

  if (base === null) {
    return { name: "InTime", price: null, possible: false, details: ["Obračunska masa prelazi 100 kg u ovoj verziji"] };
  }

  return {
    name: "InTime",
    price: round2(base * 1.15),
    possible: true,
    details: [`Zona ${zone}`, `Stvarna masa ${real} kg`, `Volumetrijska masa ${volumetric} kg`, `Obračunska masa ${chargeable} kg`, "+15% gorivo"],
  };
}

export default function App() {
  const [postal, setPostal] = useState("");
  const [cod, setCod] = useState(false);
  const [items, setItems] = useState<PackageItem[]>([
    { weight: 2, length: 30, width: 20, height: 10 },
  ]);

  const updateItem = (index: number, field: keyof PackageItem, value: number) => {
    setItems((prev) => prev.map((item, i) => (i === index ? { ...item, [field]: value } : item)));
  };

  const addPackage = () => {
    setItems((prev) => [...prev, { weight: 1, length: 20, width: 20, height: 10 }]);
  };

  const duplicatePackage = (index: number) => {
    setItems((prev) => [...prev.slice(0, index + 1), { ...prev[index] }, ...prev.slice(index + 1)]);
  };

  const removePackage = (index: number) => {
    setItems((prev) => (prev.length === 1 ? prev : prev.filter((_, i) => i !== index)));
  };

  const ready = postal.length === 5 && items.every((p) => p.weight > 0 && p.length > 0 && p.width > 0 && p.height > 0);

  const results = useMemo(() => {
    if (!ready) return null;

    const multi = calcOSMulti(items, postal, cod);
    const economy = [
      calcDPD(items, postal),
      calcHP(items, cod),
      calcOSSingle(items, postal, cod),
      calcInTime(items, postal),
      ...(multi ? [multi] : []),
    ].sort((a, b) => {
      if (a.possible !== b.possible) return a.possible ? -1 : 1;
      if (a.price === null && b.price === null) return 0;
      if (a.price === null) return 1;
      if (b.price === null) return -1;
      return a.price - b.price;
    });

    const express = calcGLS(items, postal, cod);
    const economyWinner = economy.find((x) => x.possible) || null;

    return { economy, express, economyWinner };
  }, [ready, items, postal, cod]);

  return (
    <div style={{ padding: 20, fontFamily: "Arial, sans-serif", maxWidth: 980, margin: "0 auto" }}>
      <h1 style={{ marginBottom: 8 }}>MBE kalkulator</h1>
      <div style={{ color: "#555", marginBottom: 20 }}>Paket po paket, s dimenzijama i stvarnom logikom za economy i express.</div>

      <div style={{ display: "grid", gap: 16, gridTemplateColumns: "1fr", marginBottom: 24 }}>
        <div>
          <label style={{ display: "block", marginBottom: 6, fontWeight: 700 }}>Poštanski broj</label>
          <input
            value={postal}
            onChange={(e) => setPostal(e.target.value.replace(/\D/g, "").slice(0, 5))}
            placeholder="npr. 48260"
            style={baseInputStyle()}
          />
        </div>

        <label style={{ display: "flex", alignItems: "center", gap: 8, fontSize: 16 }}>
          <input type="checkbox" checked={cod} onChange={(e) => setCod(e.target.checked)} />
          COD / pouzeće
        </label>
      </div>

      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 12 }}>
        <h2 style={{ margin: 0 }}>Paketi u pošiljci</h2>
        <button onClick={addPackage} style={{ padding: "10px 14px", borderRadius: 8, border: "1px solid #ccc", background: "#fff", cursor: "pointer" }}>
          Dodaj paket
        </button>
      </div>

      <div style={{ display: "grid", gap: 12, marginBottom: 24 }}>
        {items.map((item, index) => (
          <div key={index} style={cardStyle()}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 12, gap: 8, flexWrap: "wrap" }}>
              <strong>Paket {index + 1}</strong>
              <div style={{ display: "flex", gap: 8 }}>
                <button onClick={() => duplicatePackage(index)} style={{ padding: "8px 12px", borderRadius: 8, border: "1px solid #ccc", background: "#fff", cursor: "pointer" }}>
                  Dupliciraj
                </button>
                {items.length > 1 && (
                  <button onClick={() => removePackage(index)} style={{ padding: "8px 12px", borderRadius: 8, border: "1px solid #ccc", background: "#fff", cursor: "pointer" }}>
                    Obriši
                  </button>
                )}
              </div>
            </div>

            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(160px, 1fr))", gap: 12 }}>
              <div>
                <label style={{ display: "block", marginBottom: 6 }}>Težina (kg)</label>
                <input type="number" step="0.01" value={item.weight} onChange={(e) => updateItem(index, "weight", Number(e.target.value))} style={baseInputStyle()} />
              </div>
              <div>
                <label style={{ display: "block", marginBottom: 6 }}>Duljina (cm)</label>
                <input type="number" value={item.length} onChange={(e) => updateItem(index, "length", Number(e.target.value))} style={baseInputStyle()} />
              </div>
              <div>
                <label style={{ display: "block", marginBottom: 6 }}>Širina (cm)</label>
                <input type="number" value={item.width} onChange={(e) => updateItem(index, "width", Number(e.target.value))} style={baseInputStyle()} />
              </div>
              <div>
                <label style={{ display: "block", marginBottom: 6 }}>Visina (cm)</label>
                <input type="number" value={item.height} onChange={(e) => updateItem(index, "height", Number(e.target.value))} style={baseInputStyle()} />
              </div>
            </div>
          </div>
        ))}
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: 16, marginBottom: 24 }}>
        <div style={cardStyle()}>
          <div style={{ color: "#666", fontSize: 14, marginBottom: 8 }}>MBE Economy</div>
          {results?.economyWinner ? (
            <>
              <div style={{ fontSize: 24, fontWeight: 700 }}>{results.economyWinner.name}</div>
              <div style={{ fontSize: 32, fontWeight: 800, marginTop: 8 }}>{money(results.economyWinner.price)}</div>
              <div style={{ color: "#555", marginTop: 8 }}>{results.economyWinner.details.join(" · ")}</div>
            </>
          ) : (
            <div style={{ color: "#666" }}>Upiši sve podatke pošiljke.</div>
          )}
        </div>

        <div style={cardStyle()}>
          <div style={{ color: "#666", fontSize: 14, marginBottom: 8 }}>MBE Express</div>
          {results ? (
            <>
              <div style={{ fontSize: 24, fontWeight: 700 }}>GLS</div>
              <div style={{ fontSize: 32, fontWeight: 800, marginTop: 8 }}>{money(results.express.price)}</div>
              <div style={{ color: "#555", marginTop: 8 }}>{results.express.possible ? results.express.details.join(" · ") : results.express.details[0]}</div>
            </>
          ) : (
            <div style={{ color: "#666" }}>Upiši sve podatke pošiljke.</div>
          )}
        </div>
      </div>

      {results && (
        <>
          <h2>Sve economy opcije</h2>
          <div style={{ display: "grid", gap: 12, marginBottom: 24 }}>
            {results.economy.map((result) => (
              <div key={result.name} style={cardStyle(result.name === results.economyWinner?.name)}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", gap: 12, flexWrap: "wrap" }}>
                  <div>
                    <div style={{ fontWeight: 700, fontSize: 20 }}>{result.name}</div>
                    <div style={{ color: "#555", marginTop: 6 }}>{result.details.join(" · ")}</div>
                  </div>
                  <div style={{ fontWeight: 800, fontSize: 28 }}>{money(result.price)}</div>
                </div>
              </div>
            ))}
          </div>

          <h2>Express opcija</h2>
          <div style={cardStyle()}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", gap: 12, flexWrap: "wrap" }}>
              <div>
                <div style={{ fontWeight: 700, fontSize: 20 }}>GLS</div>
                <div style={{ color: "#555", marginTop: 6 }}>{results.express.possible ? results.express.details.join(" · ") : results.express.details[0]}</div>
              </div>
              <div style={{ fontWeight: 800, fontSize: 28 }}>{money(results.express.price)}</div>
            </div>
          </div>

          <div style={{ marginTop: 24, color: "#555", fontSize: 
