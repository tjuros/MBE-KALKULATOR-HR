import { useState } from "react";

const SMALL_ISLANDS = new Set([
  "23283","23284","23291","23292","23293","23294","23295","23296",
  "20221","20222","20223","20224","20225","20226","20290"
]);

function isIsland(postal: string) {
  return SMALL_ISLANDS.has(postal);
}

function isOverseasSpecial(postal: string) {
  return isIsland(postal) || postal.startsWith("20");
}

export default function App() {
  const [postal, setPostal] = useState("");
  const [weight, setWeight] = useState(1);
  const [packages, setPackages] = useState(1);
  const [cod, setCod] = useState(false);

  // HP
  const calcHP = () => {
    let price = 2.2;
    if (weight > 5) price = 2.8;
    if (weight > 10) price = 3.3;
    if (weight > 20) price = 5.45;

    if (cod) price += 0.5;
    return price;
  };

  // GLS (Express)
  const calcGLS = () => {
    if (isIsland(postal)) return null;

    let price = 3.1;

    if (packages >= 2 && packages <= 4) price *= 0.75;
    if (packages >= 5) price *= 0.65;

    price = price * 1.19;

    if (cod) price += 0.43;

    return price;
  };

  // Overseas Single
  const calcOSSingle = () => {
    let price = 2.61;

    price *= 1.05;

    if (isOverseasSpecial(postal)) price *= 1.2;

    if (cod) price += 0.3;

    return price;
  };

  // Overseas Multi (samo ako 2+ paketa)
  const calcOSMulti = () => {
    if (packages < 2) return null;

    let price = 2.63;

    price *= 1.05;

    if (isOverseasSpecial(postal)) price *= 1.2;

    if (cod) price += 0.3;

    return price;
  };

  return (
    <div style={{ padding: 20, fontFamily: "Arial" }}>
      <h2>MBE kalkulator</h2>

      <input
        placeholder="Poštanski broj"
        value={postal}
        onChange={(e) => setPostal(e.target.value)}
      />
      <br /><br />

      <input
        type="number"
        value={weight}
        onChange={(e) => setWeight(Number(e.target.value))}
      /> kg
      <br /><br />

      <input
        type="number"
        value={packages}
        onChange={(e) => setPackages(Number(e.target.value))}
      /> paketa
      <br /><br />

      <label>
        <input
          type="checkbox"
          checked={cod}
          onChange={(e) => setCod(e.target.checked)}
        />
        COD
      </label>

      <hr />

      <h3>Rezultati</h3>

      <div>HP: {calcHP().toFixed(2)} €</div>

      <div>
        GLS:{" "}
        {calcGLS() === null
          ? "Nije moguće"
          : calcGLS()?.toFixed(2) + " €"}
      </div>

      <div>
        Overseas Single: {calcOSSingle().toFixed(2)} €
        {isOverseasSpecial(postal) && " (+20%)"}
      </div>

      {calcOSMulti() !== null && (
        <div>
          Overseas Multi: {calcOSMulti()?.toFixed(2)} €
          {isOverseasSpecial(postal) && " (+20%)"}
        </div>
      )}
    </div>
  );
}
