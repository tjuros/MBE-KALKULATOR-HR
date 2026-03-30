import { useState } from "react";

export default function App() {
  const [postal, setPostal] = useState("");
  const [weight, setWeight] = useState(1);
  const [packages, setPackages] = useState(1);
  const [cod, setCod] = useState(false);

  const isIsland = (postal: string) => {
    const islands = ["23283", "23284", "23295"];
    return islands.includes(postal);
  };

  const isOverseasSpecial = (postal: string) => {
    return isIsland(postal) || postal.startsWith("20");
  };

  const calcHP = () => {
    let price = 2.2;
    if (weight > 5) price = 2.8;
    if (weight > 10) price = 3.3;
    if (weight > 20) price = 5.45;

    if (cod) price += 0.5;

    return price;
  };

  const calcOverseas = () => {
    let price = 2.61;

    price = price * 1.05; // gorivo

    if (isOverseasSpecial(postal)) {
      price = price * 1.2;
    }

    if (cod) price += 0.3;

    return price;
  };

  const calcGLS = () => {
    if (isIsland(postal)) return null;

    let price = 3.1;

    if (packages >= 2) price *= 0.75;

    price = price * 1.19;

    if (cod) price += 0.43;

    return price;
  };

  return (
    <div style={{ padding: 20, fontFamily: "Arial" }}>
      <h1>MBE kalkulator</h1>

      <div>
        <input
          placeholder="Poštanski broj"
          value={postal}
          onChange={(e) => setPostal(e.target.value)}
        />
      </div>

      <div>
        <input
          type="number"
          value={weight}
          onChange={(e) => setWeight(Number(e.target.value))}
        />
        kg
      </div>

      <div>
        <input
          type="number"
          value={packages}
          onChange={(e) => setPackages(Number(e.target.value))}
        />
        paketa
      </div>

      <div>
        <label>
          <input
            type="checkbox"
            checked={cod}
            onChange={(e) => setCod(e.target.checked)}
          />
          COD
        </label>
      </div>

      <hr />

      <h3>Rezultati:</h3>

      <div>HP: {calcHP().toFixed(2)} €</div>

      <div>
        Overseas: {calcOverseas().toFixed(2)} €
        {isOverseasSpecial(postal) && " (+20%)"}
      </div>

      <div>
        GLS:{" "}
        {calcGLS() === null
          ? "Nije moguće"
          : calcGLS()?.toFixed(2) + " €"}
      </div>
    </div>
  );
}
