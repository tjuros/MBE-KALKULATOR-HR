import assert from "node:assert/strict";
import { calculatePrices, type NumericPackageItem, type PricingInput, type PricingResults } from "../src/pricing";

const noExtras = { documentReturn: false, addresseeOnly: false, specialHandling: false };
const box = (weight: number, length: number, width: number, height: number): NumericPackageItem => ({ weight, length, width, height });
const shipment = (overrides: Partial<PricingInput>): PricingInput => ({
  destinationCountry: "Croatia",
  postalCode: "10000",
  destinationPlace: "",
  packages: [box(1, 10, 10, 10)],
  cod: false,
  codAmount: 0,
  goodsValue: 0,
  additionalServices: noExtras,
  ...overrides,
});

const find = (results: PricingResults, id: string) => {
  const result = [...results.economy, ...results.express, ...results.lockers].find((item) => item.id === id);
  assert.ok(result, `Missing result ${id}`);
  return result;
};

const price = (results: PricingResults, id: string, expected: number) => {
  const result = find(results, id);
  assert.equal(result.possible, true, `${id} should be possible: ${result.warning ?? ""}`);
  assert.equal(result.price, expected, `${id} price`);
};

const virovitica = calculatePrices(shipment({
  postalCode: "33000",
  packages: [box(12, 60, 60, 40), box(12, 60, 60, 40)],
}));
price(virovitica, "hp-paket24", 5.45);
price(virovitica, "overseas-multi", 5.72);
price(virovitica, "dpd-standard", 6.58);
price(virovitica, "gls-express", 10.7);
price(virovitica, "lagermax", 30.91);
price(virovitica, "intime", 43.01);
assert.equal(find(virovitica, "box-now").possible, false);
assert.match(find(virovitica, "lagermax").details[0], /Z1 → Z2.*skuplja Z2/);

const korcula = calculatePrices(shipment({
  postalCode: "20260",
  packages: [box(12, 60, 60, 40), box(12, 60, 60, 40)],
}));
price(korcula, "hp-paket24", 5.45);
price(korcula, "dpd-standard", 13.58);
price(korcula, "gls-express", 10.7);
price(korcula, "intime", 51.98);
price(korcula, "lagermax", 62.64);
assert.equal(find(korcula, "overseas-multi").possible, false, "Overseas Cargo is not available for 20260");

const osijekCod = calculatePrices(shipment({
  postalCode: "31000",
  destinationPlace: "Osijek",
  packages: [box(0.6, 30, 40, 5)],
  cod: true,
  codAmount: 40,
}));
price(osijekCod, "box-now", 1.8);
price(osijekCod, "hp-paket24", 2.7);
price(osijekCod, "dpd-standard", 2.79);
price(osijekCod, "overseas-single", 3.07);
price(osijekCod, "gls-express", 4.65);
price(osijekCod, "intime", 5.49);
assert.equal(osijekCod.overallWinner?.id, "box-now", "BOX NOW remains the absolute cheapest transport option");
assert.equal(osijekCod.recommendedWinner?.id, "hp-paket24", "Recommendation must stay within MBE Economy");

const zagrebBulk = calculatePrices(shipment({
  postalCode: "10000",
  packages: Array.from({ length: 18 }, () => box(12, 40, 40, 30)),
}));
price(zagrebBulk, "box-now", 25.2);
price(zagrebBulk, "hp-paleta", 30.56);
price(zagrebBulk, "hp-paket24", 41.8);
price(zagrebBulk, "overseas-multi", 46.17);
price(zagrebBulk, "dpd-standard", 59.22);
price(zagrebBulk, "intime", 63.02);
price(zagrebBulk, "gls-express", 90.18);
price(zagrebBulk, "lagermax", 89.54);

const unresolvedOsijek = calculatePrices(shipment({
  postalCode: "31000",
  destinationPlace: "",
  packages: [box(1, 10, 10, 10)],
}));
assert.equal(find(unresolvedOsijek, "intime").status, "manual", "Ambiguous InTime zone must not be guessed");

const ugljan = calculatePrices(shipment({ postalCode: "23273" }));
price(ugljan, "dpd-standard", 6.29);
price(ugljan, "lagermax", 20.36);

const documentReturn = calculatePrices(shipment({
  postalCode: "10000",
  additionalServices: { ...noExtras, documentReturn: true },
}));
price(documentReturn, "gls-express", 6.62);

const longInTimeShipment = calculatePrices(shipment({
  postalCode: "10000",
  packages: [box(10, 310, 10, 10)],
}));
price(longInTimeShipment, "intime", 11.98);
assert.equal(find(longInTimeShipment, "intime").status, "surcharge");
assert.match(find(longInTimeShipment, "intime").details.join(" "), /nestandardna pošiljka \+100%/);
assert.match(find(longInTimeShipment, "intime").warning ?? "", /prethodni dogovor i potvrdu InTimea/);
assert.equal(longInTimeShipment.recommendedWinner?.id, "intime");

const austria = calculatePrices(shipment({
  destinationCountry: "Austria",
  postalCode: "",
  packages: [box(2, 30, 20, 10)],
}));
price(austria, "dpd-export", 5.44);
price(austria, "gls-export", 7);
price(austria, "hp-ems", 24);
assert.equal(austria.lockers.length, 0, "Export must not offer parcel lockers");
assert.equal(austria.express.length, 0, "Export Express is reserved for future UPS tariffs");
assert.equal(find(austria, "gls-export").serviceType, "MBE Economy");
assert.equal(austria.recommendedWinner?.id, "dpd-export");

const greatBritain = calculatePrices(shipment({
  destinationCountry: "Great Britain",
  postalCode: "",
  goodsValue: 100,
  packages: [box(2, 30, 20, 10)],
}));
price(greatBritain, "hp-ems", 33.97);
price(greatBritain, "gls-export", 42.07);
price(greatBritain, "dpd-export", 44.15);

const ukraine = calculatePrices(shipment({
  destinationCountry: "Ukraine",
  postalCode: "",
  goodsValue: 100,
  packages: [box(2, 30, 20, 10)],
}));
price(ukraine, "dpd-export", 44.87);
assert.equal(find(ukraine, "gls-export").possible, false);
assert.equal(find(ukraine, "hp-ems").possible, false);

console.log("Golden pricing scenarios: OK");
