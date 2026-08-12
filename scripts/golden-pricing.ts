import assert from "node:assert/strict";
import { calculatePrices, exportCodCarriers, type NumericPackageItem, type PricingInput, type PricingResults } from "../src/pricing";
import { DESTINATION_COUNTRIES } from "../src/upsTariffs";

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
  safeValue: false,
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
price(virovitica, "gls-express", 10.58);
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
price(korcula, "gls-express", 10.58);
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
price(zagrebBulk, "gls-express", 88.14);
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
price(austria, "ups-standard", 14.79);
price(austria, "ups-express-saver", 25.77);
assert.equal(austria.lockers.length, 0, "Export must not offer parcel lockers");
assert.equal(austria.express.length, 1, "UPS Express Saver must be the export Express option");
assert.equal(find(austria, "gls-export").serviceType, "MBE Economy");
assert.equal(find(austria, "ups-standard").serviceType, "MBE Economy");
assert.equal(find(austria, "ups-express-saver").serviceType, "MBE Express");
assert.equal(austria.recommendedWinner?.id, "dpd-export");
assert.deepEqual(exportCodCarriers("Austria"), []);
assert.deepEqual(exportCodCarriers("Slovenia"), ["GLS", "DPD"]);
assert.deepEqual(exportCodCarriers("Poland"), ["DPD"]);

const austriaSafeValue = calculatePrices(shipment({
  destinationCountry: "Austria",
  postalCode: "",
  goodsValue: 1000,
  safeValue: true,
  packages: [box(2, 30, 20, 10)],
}));
price(austriaSafeValue, "dpd-export", 16.94);
assert.match(find(austriaSafeValue, "dpd-export").details.join(" "), /MBE SafeValue 1,15%.*11\.50 €/);

const austriaSafeValueMinimum = calculatePrices(shipment({
  destinationCountry: "Austria",
  postalCode: "",
  goodsValue: 100,
  safeValue: true,
  packages: [box(2, 30, 20, 10)],
}));
price(austriaSafeValueMinimum, "dpd-export", 10.94);
assert.match(find(austriaSafeValueMinimum, "dpd-export").details.join(" "), /min\. 5,50 € = 5\.50 €/);

const greatBritain = calculatePrices(shipment({
  destinationCountry: "Great Britain",
  postalCode: "",
  goodsValue: 100,
  packages: [box(2, 30, 20, 10)],
}));
price(greatBritain, "hp-ems", 33.97);
price(greatBritain, "gls-export", 42.07);
price(greatBritain, "dpd-export", 44.15);
price(greatBritain, "ups-standard", 78.14);
price(greatBritain, "ups-express-saver", 35.44);

const ukraine = calculatePrices(shipment({
  destinationCountry: "Ukraine",
  postalCode: "",
  goodsValue: 100,
  packages: [box(2, 30, 20, 10)],
}));
price(ukraine, "dpd-export", 44.87);
assert.equal(find(ukraine, "gls-export").possible, false);
assert.equal(find(ukraine, "hp-ems").possible, false);
assert.equal(find(ukraine, "ups-express-saver").possible, false, "UPS Ukraine is suspended in the supplied zone table");

const germanyVolumetric = calculatePrices(shipment({
  destinationCountry: "Germany",
  packages: [box(2, 50, 40, 30)],
}));
price(germanyVolumetric, "ups-standard", 26.83);
price(germanyVolumetric, "ups-express-saver", 86.39);
assert.match(find(germanyVolumetric, "ups-standard").details.join(" "), /obračunska masa 12\.0 kg/);

const germanyMulti = calculatePrices(shipment({
  destinationCountry: "Germany",
  packages: [box(0.6, 10, 10, 10), box(0.6, 10, 10, 10)],
}));
price(germanyMulti, "ups-standard", 22.34);
price(germanyMulti, "ups-express-saver", 23.22);
assert.match(find(germanyMulti, "ups-standard").details.join(" "), /višepaketna pošiljka/);

const germanyHandling = calculatePrices(shipment({
  destinationCountry: "Germany",
  packages: [box(26, 50, 40, 30)],
}));
price(germanyHandling, "ups-standard", 53.08);
price(germanyHandling, "ups-express-saver", 168.77);
assert.match(find(germanyHandling, "ups-standard").details.join(" "), /dodatna manipulacija/);

const germanyLarge = calculatePrices(shipment({
  destinationCountry: "Germany",
  packages: [box(10, 101, 50, 50)],
}));
price(germanyLarge, "ups-standard", 175.05);
price(germanyLarge, "ups-express-saver", 373.56);
assert.match(find(germanyLarge, "ups-standard").details.join(" "), /veliki paket/);
assert.doesNotMatch(find(germanyLarge, "ups-standard").details.join(" "), /dodatna manipulacija/);

const usa = calculatePrices(shipment({
  destinationCountry: "UPS:US",
  goodsValue: 100,
  packages: [box(2, 30, 20, 10)],
}));
assert.equal(find(usa, "ups-standard").possible, false);
price(usa, "ups-express-saver", 52.76);
assert.equal(usa.recommendedWinner, null, "USA has no Economy tariff in the supplied UPS guide");
assert.equal(usa.expressWinner?.id, "ups-express-saver");

const albania = calculatePrices(shipment({
  destinationCountry: "UPS:AL",
  goodsValue: 100,
  packages: [box(2, 30, 20, 10)],
}));
assert.equal(find(albania, "ups-standard").possible, false);
price(albania, "ups-express-saver", 123.44);
assert.match(find(albania, "ups-express-saver").details[0], /posebni Express Saver cjenik/);

const upsOverMaximum = calculatePrices(shipment({
  destinationCountry: "Germany",
  packages: [box(71, 30, 20, 10)],
}));
assert.equal(find(upsOverMaximum, "ups-standard").status, "manual");
assert.match(find(upsOverMaximum, "ups-standard").warning ?? "", /346\.95/);

const destinationValues = new Set(DESTINATION_COUNTRIES.map((country) => country.value));
assert.ok(destinationValues.has("UPS:JP"), "UPS-only destinations must be selectable");
assert.ok(destinationValues.has("UPS:US"), "USA must be selectable through UPS");
assert.ok(!destinationValues.has("UPS:RU"), "UPS-only suspended Russia must not be selectable");
assert.ok(!destinationValues.has("UPS:BY"), "UPS-only suspended Belarus must not be selectable");
assert.ok(destinationValues.has("Ukraine"), "Ukraine remains selectable for its non-UPS contracted tariffs");

console.log("Golden pricing scenarios: OK");
