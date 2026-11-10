import assert from "node:assert/strict";
import { calculatePrices, exportCodCarriers, type NumericPackageItem, type PricingInput, type PricingResults } from "../src/pricing";
import { DESTINATION_COUNTRIES } from "../src/upsTariffs";
import { DPD_ROAD_FUEL_PER_PACKAGE, FUEL_CONFIG } from "../src/fuelConfig";

assert.equal(FUEL_CONFIG.overseas.rate, 0.08);
assert.equal(FUEL_CONFIG.gls.domesticPerPackage, 0.44);
assert.equal(FUEL_CONFIG.gls.exportRate, 0.132);
assert.equal(DPD_ROAD_FUEL_PER_PACKAGE, 0.50);
assert.equal(FUEL_CONFIG.schenker.rate, 0.09);
assert.equal(FUEL_CONFIG.intime.rate, 0.15);
assert.equal(FUEL_CONFIG.lagermax.rate, 0.066);
assert.equal(FUEL_CONFIG.ups.standardRate, 0.34);
assert.equal(FUEL_CONFIG.ups.expressRate, 0.5325);
assert.equal(FUEL_CONFIG.boxNow.rate, 0);
assert.equal(FUEL_CONFIG.hp.rate, 0);

const noExtras = { documentReturn: false, addresseeOnly: false, specialHandling: false };
const noInTimeOptions = {
  smsNotification: false,
  pickupAttempt: false,
  nonStandard: false,
  otherProvider: false,
  dataCorrection: false,
  proofOfDelivery: false,
  returnToSender: false,
  declaredValue: 0,
};
const box = (weight: number, length: number, width: number, height: number): NumericPackageItem => ({ weight, length, width, height });
const shipment = (overrides: Partial<PricingInput>): PricingInput => ({
  originPostalCode: "48260",
  pricingDate: "2026-10-07",
  destinationCountry: "Croatia",
  postalCode: "10000",
  destinationPlace: "",
  recipientType: "business",
  packages: [box(1, 10, 10, 10)],
  cod: false,
  codAmount: 0,
  codPaymentMethod: "cash",
  goodsValue: 0,
  additionalServices: noExtras,
  inTimeOptions: noInTimeOptions,
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

const schenkerPrivate = calculatePrices(shipment({
  postalCode: "10000",
  recipientType: "private",
}));
assert.equal(find(schenkerPrivate, "schenker-packages").possible, false);

const schenkerBusinessPackages = calculatePrices(shipment({
  postalCode: "10000",
  recipientType: "business",
  packages: [box(5, 40, 30, 20), box(5, 40, 30, 20), box(5, 40, 30, 20)],
}));
price(schenkerBusinessPackages, "schenker-packages", 17.79);
assert.match(find(schenkerBusinessPackages, "schenker-packages").details.join(" "), /minimum po pošiljci 12\.00 €/);
assert.match(find(schenkerBusinessPackages, "schenker-packages").details.join(" "), /gorivo 9%/);

const schenkerKorcula = calculatePrices(shipment({
  postalCode: "20260",
  recipientType: "business",
  packages: [box(5, 40, 30, 20)],
}));
price(schenkerKorcula, "schenker-packages", 22.26);
assert.match(find(schenkerKorcula, "schenker-packages").details.join(" "), /Korčula/);

const schenkerPallet = calculatePrices(shipment({
  originPostalCode: "48260",
  postalCode: "10000",
  recipientType: "business",
  packages: [box(100, 100, 70, 60)],
}));
price(schenkerPallet, "schenker-pallet", 37.5);
assert.match(find(schenkerPallet, "schenker-pallet").details.join(" "), /34\.40 €/);

const virovitica = calculatePrices(shipment({
  postalCode: "33000",
  packages: [box(12, 60, 60, 40), box(12, 60, 60, 40)],
}));
price(virovitica, "hp-paket24", 5.45);
price(virovitica, "overseas-multi", 5.48);
assert.match(find(virovitica, "overseas-multi").details.join(" "), /volumni popust 6% od 01\.10\.2026\./);
assert.match(find(virovitica, "overseas-multi").details.join(" "), /gorivo 8%/);
price(virovitica, "dpd-standard", 6.78);
price(virovitica, "gls-express", 10.62);
price(virovitica, "lagermax", 30.91);
price(virovitica, "intime", 43.01);
assert.equal(find(virovitica, "box-now").possible, false);
assert.match(find(virovitica, "lagermax").details[0], /Z1 → Z2.*skuplja Z2/);

const lagermaxFromSplit = calculatePrices(shipment({
  originPostalCode: "21000",
  postalCode: "10000",
}));
price(lagermaxFromSplit, "lagermax", 13.86);
assert.match(find(lagermaxFromSplit, "lagermax").details[0], /Z2 → Z1.*skuplja Z2/);

const lagermaxMissingOrigin = calculatePrices(shipment({
  originPostalCode: "",
  postalCode: "10000",
}));
assert.equal(find(lagermaxMissingOrigin, "lagermax").status, "manual");
assert.match(find(lagermaxMissingOrigin, "lagermax").details.join(" "), /poštanski broj polazišta/);

const korcula = calculatePrices(shipment({
  postalCode: "20260",
  packages: [box(12, 60, 60, 40), box(12, 60, 60, 40)],
}));
price(korcula, "hp-paket24", 5.45);
price(korcula, "dpd-standard", 13.78);
price(korcula, "gls-express", 10.62);
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
assert.match(find(osijekCod, "box-now").details.join(" "), /gorivo: nema dodatka/);
assert.match(find(osijekCod, "box-now").warning ?? "", /COD se plaća karticom/);
price(osijekCod, "hp-paket24", 2.7);
price(osijekCod, "hp-paketomat", 2.05);
assert.match(find(osijekCod, "hp-paketomat").details.join(" "), /plaćanje pouzećem uključeno/);
price(osijekCod, "dpd-standard", 2.89);
assert.match(find(osijekCod, "dpd-standard").details.join(" "), /09\/2026 \(1\.96 €\/l\).*0\.50 €/);
assert.match(find(osijekCod, "dpd-standard").warning ?? "", /karticom\/online/);
assert.equal(find(osijekCod, "dpd-shop").status, "manual", "DPD Shop COD fee is not in the supplied contract");
price(osijekCod, "overseas-single", 2.95);
price(osijekCod, "gls-express", 4.67);
price(osijekCod, "gls-locker", 3.74);
assert.match(find(osijekCod, "gls-locker").details.join(" "), /kartično plaćanje COD 1% = 0\.40 €/);
assert.match(find(osijekCod, "gls-express").warning ?? "", /1% iznosa pouzeća/);
price(osijekCod, "intime", 5.49);
assert.equal(osijekCod.overallWinner?.id, "box-now", "BOX NOW remains the absolute cheapest transport option");
assert.equal(osijekCod.recommendedWinner?.id, "hp-paket24", "Recommendation must stay within MBE Economy");


const boxNowHighCod = calculatePrices(shipment({
  postalCode: "10000",
  cod: true,
  codAmount: 500,
  packages: [box(1, 30, 20, 5)],
}));
price(boxNowHighCod, "box-now", 6.40);
assert.match(find(boxNowHighCod, "box-now").warning ?? "", /limit naknade.*200\.00 €/);

const zagrebBulk = calculatePrices(shipment({
  postalCode: "10000",
  packages: Array.from({ length: 18 }, () => box(12, 40, 40, 30)),
}));
price(zagrebBulk, "box-now", 25.2);
price(zagrebBulk, "hp-paleta", 30.56);
assert.match(find(zagrebBulk, "hp-paleta").name, /HP Paleta/);
assert.match(find(zagrebBulk, "hp-paleta").details.join(" "), /rok uručenja D\+5/);
assert.match(find(zagrebBulk, "hp-paket24").details.join(" "), /do 31\.10\.2026/);
price(zagrebBulk, "hp-paket24", 41.8);
price(zagrebBulk, "overseas-multi", 44.22);
price(zagrebBulk, "dpd-standard", 61.02);
price(zagrebBulk, "intime", 63.02);
price(zagrebBulk, "gls-express", 88.5);
price(zagrebBulk, "lagermax", 89.54);



const dpdShop = calculatePrices(shipment({
  postalCode: "10000",
  packages: [box(1, 30, 20, 10)],
}));
price(dpdShop, "dpd-shop", 2.20);
assert.match(find(dpdShop, "dpd-shop").details.join(" "), /DPD Shop 1 paket/);

const dpdShopTooLarge = calculatePrices(shipment({
  postalCode: "10000",
  packages: [box(21, 30, 20, 10)],
}));
assert.equal(find(dpdShopTooLarge, "dpd-shop").possible, false);

const dpdOversize = calculatePrices(shipment({
  postalCode: "10000",
  packages: [box(10, 176, 30, 30)],
}));
assert.equal(find(dpdOversize, "dpd-standard").status, "manual");
assert.match(find(dpdOversize, "dpd-standard").details.join(" "), /oversize.*25,00 €/);


const hpMinSize = calculatePrices(shipment({
  postalCode: "10000",
  packages: [box(1, 10, 8, 2)],
}));
assert.equal(find(hpMinSize, "hp-paket24").possible, false);
assert.match(find(hpMinSize, "hp-paket24").details.join(" "), /9 × 14 cm/);

const hpOversizeLight = calculatePrices(shipment({
  postalCode: "10000",
  packages: [box(10, 70, 40, 30)],
}));
assert.equal(find(hpOversizeLight, "hp-paket24").possible, false);
price(hpOversizeLight, "hp-paleta", 30.56);

const hpPallet180 = calculatePrices(shipment({
  postalCode: "10000",
  packages: [box(35, 80, 70, 180)],
}));
price(hpPallet180, "hp-paleta", 30.56);


const hpLockerLarge = calculatePrices(shipment({
  postalCode: "10000",
  packages: [box(1, 65, 38, 39)],
}));
assert.equal(find(hpLockerLarge, "hp-paketomat").possible, false);

const hpSensitive = calculatePrices(shipment({
  postalCode: "10000",
  packages: [box(1, 20, 15, 10)],
  additionalServices: { ...noExtras, specialHandling: true },
}));
price(hpSensitive, "hp-paket24", 4.27);
assert.match(find(hpSensitive, "hp-paket24").details.join(" "), /posebno rukovanje \+2\.07 €/);

const hpExpiredTariff = calculatePrices(shipment({
  pricingDate: "2026-11-01",
  postalCode: "10000",
}));
assert.equal(find(hpExpiredTariff, "hp-paket24").status, "manual");
assert.match(find(hpExpiredTariff, "hp-paket24").details.join(" "), /novi cjenik/);

const overseasOversize = calculatePrices(shipment({
  postalCode: "10000",
  packages: [box(10, 101, 40, 30)],
}));
assert.equal(find(overseasOversize, "overseas-single").status, "manual");
assert.match(find(overseasOversize, "overseas-single").details.join(" "), /OVSZ je 1\.50/);


const glsLockerLimit = calculatePrices(shipment({
  postalCode: "10000",
  packages: [box(2, 51, 20, 20)],
}));
assert.equal(find(glsLockerLimit, "gls-locker").possible, false, "GLS locker must reject parcels above 50 cm on any side");

const unresolvedOsijek = calculatePrices(shipment({
  postalCode: "31000",
  destinationPlace: "",
  packages: [box(1, 10, 10, 10)],
}));
assert.equal(find(unresolvedOsijek, "intime").status, "manual", "Ambiguous InTime zone must not be guessed");

const ugljan = calculatePrices(shipment({ postalCode: "23273" }));
price(ugljan, "dpd-standard", 6.39);
price(ugljan, "lagermax", 20.36);
assert.match(find(ugljan, "lagermax").details.join(" "), /Ugljan - Pašman: dostava ponedjeljak/);
assert.match(find(ugljan, "lagermax").warning ?? "", /LMX Zadar jedan dan ranije/);


const lagermaxDugiOtok = calculatePrices(shipment({ postalCode: "23281" }));
assert.equal(find(lagermaxDugiOtok, "lagermax").possible, false);
assert.match(find(lagermaxDugiOtok, "lagermax").details.join(" "), /Dugi otok.*ne vozi/);

const lagermaxLastovo = calculatePrices(shipment({ postalCode: "20290" }));
price(lagermaxLastovo, "lagermax", 25.06);
assert.match(find(lagermaxLastovo, "lagermax").details.join(" "), /Lastovo: dostava 1 put mjesečno/);

const lagermaxKuciste = calculatePrices(shipment({ postalCode: "20267" }));
price(lagermaxKuciste, "lagermax", 17.06);
assert.doesNotMatch(find(lagermaxKuciste, "lagermax").details.join(" "), /otok 50%/);

const documentReturn = calculatePrices(shipment({
  postalCode: "10000",
  additionalServices: { ...noExtras, documentReturn: true },
}));
price(documentReturn, "gls-express", 6.64);

const longInTimeShipment = calculatePrices(shipment({
  postalCode: "10000",
  packages: [box(10, 310, 10, 10)],
}));
price(longInTimeShipment, "intime", 6.41);
assert.doesNotMatch(find(longInTimeShipment, "intime").details.join(" "), /nestandardna pošiljka/);

const inTimeNonStandard = calculatePrices(shipment({
  postalCode: "10000",
  inTimeOptions: { ...noInTimeOptions, nonStandard: true },
}));
price(inTimeNonStandard, "intime", 8.39);
assert.match(find(inTimeNonStandard, "intime").details.join(" "), /volumetrija nije primjenjiva.*\+100%/);

const inTimeSeasonal = calculatePrices(shipment({
  pricingDate: "2026-11-15",
  postalCode: "10000",
}));
price(inTimeSeasonal, "intime", 5.07);
assert.match(find(inTimeSeasonal, "intime").details.join(" "), /sezonski dodatak 15%/);

const inTimeCardCod = calculatePrices(shipment({
  postalCode: "10000",
  cod: true,
  codAmount: 40,
  codPaymentMethod: "card",
}));
price(inTimeCardCod, "intime", 6.69);
assert.match(find(inTimeCardCod, "intime").details.join(" "), /COD kartica 2,20%.*2\.20 €/);

const inTimeDeclaredValue = calculatePrices(shipment({
  postalCode: "10000",
  inTimeOptions: { ...noInTimeOptions, declaredValue: 500 },
}));
price(inTimeDeclaredValue, "intime", 7.49);
assert.match(find(inTimeDeclaredValue, "intime").details.join(" "), /iskazana vrijednost 500\.00 € × 0,60% = 3\.00 €/);

const inTimeExtras = calculatePrices(shipment({
  postalCode: "10000",
  additionalServices: { ...noExtras, documentReturn: true, addresseeOnly: true },
  inTimeOptions: {
    ...noInTimeOptions,
    smsNotification: true,
    pickupAttempt: true,
    otherProvider: true,
    dataCorrection: true,
    proofOfDelivery: true,
  },
}));
price(inTimeExtras, "intime", 37.16);
assert.match(find(inTimeExtras, "intime").details.join(" "), /SMS status \+0\.12 €/);
assert.match(find(inTimeExtras, "intime").details.join(" "), /pokušaj preuzimanja \+5\.00 €/);
assert.match(find(inTimeExtras, "intime").details.join(" "), /drugog pružatelja \+8\.00 €/);
assert.match(find(inTimeExtras, "intime").details.join(" "), /ispravak podataka \+2\.00 €/);
assert.match(find(inTimeExtras, "intime").details.join(" "), /potvrda o isporuci \+5\.00 €/);
assert.match(find(inTimeExtras, "intime").details.join(" "), /povrat ovjerenog dokumenta \+10\.00 €/);
assert.match(find(inTimeExtras, "intime").details.join(" "), /osobno uručenje \+2\.55 €/);

const inTimeReturnToSender = calculatePrices(shipment({
  postalCode: "10000",
  inTimeOptions: { ...noInTimeOptions, returnToSender: true },
}));
assert.equal(find(inTimeReturnToSender, "intime").status, "manual");
assert.match(find(inTimeReturnToSender, "intime").details.join(" "), /Povrat pošiljatelju.*prema cjeniku/);

const austria = calculatePrices(shipment({
  destinationCountry: "Austria",
  postalCode: "",
  packages: [box(2, 30, 20, 10)],
}));
price(austria, "dpd-export", 5.54);
price(austria, "gls-export", 7.03);
assert.match(find(austria, "gls-export").details.join(" "), /gorivo 13,2%/);
price(austria, "hp-ems", 24);
assert.match(find(austria, "hp-ems").details.join(" "), /osigurana vrijednost do 165,00 € uključena/);
price(austria, "ups-standard", 15.1);
price(austria, "ups-express-saver", 26.63);
assert.match(find(austria, "ups-standard").details.join(" "), /gorivo 34,00% \(od 05\.10\.2026\.\)/);
assert.match(find(austria, "ups-express-saver").details.join(" "), /gorivo 53,25% \(od 05\.10\.2026\.\)/);
assert.equal(austria.lockers.length, 0, "Export must not offer parcel lockers");
assert.equal(austria.express.length, 1, "UPS Express Saver must be the export Express option");
assert.equal(find(austria, "gls-export").serviceType, "MBE Economy");
assert.equal(find(austria, "ups-standard").serviceType, "MBE Economy");
assert.equal(find(austria, "ups-express-saver").serviceType, "MBE Express");
assert.equal(austria.recommendedWinner?.id, "dpd-export");
assert.deepEqual(exportCodCarriers("Austria"), []);
assert.deepEqual(exportCodCarriers("Slovenia"), ["GLS", "DPD"]);
assert.deepEqual(exportCodCarriers("Poland"), ["DPD"]);

const austriaHpDeclared = calculatePrices(shipment({
  destinationCountry: "Austria",
  goodsValue: 500,
  packages: [box(2, 30, 20, 10)],
}));
price(austriaHpDeclared, "hp-ems", 34.4);
assert.match(find(austriaHpDeclared, "hp-ems").details.join(" "), /dodatak na označenu vrijednost 500\.00 € = 10\.40 €/);

const hpEmsTooSmall = calculatePrices(shipment({
  destinationCountry: "Austria",
  packages: [box(1, 20, 10, 5)],
}));
assert.equal(find(hpEmsTooSmall, "hp-ems").possible, false);
assert.match(find(hpEmsTooSmall, "hp-ems").details.join(" "), /17,6 × 25,0 cm/);

const greatBritain = calculatePrices(shipment({
  destinationCountry: "Great Britain",
  postalCode: "",
  goodsValue: 100,
  packages: [box(2, 30, 20, 10)],
}));
price(greatBritain, "hp-ems", 32);
price(greatBritain, "gls-export", 42.11);
price(greatBritain, "dpd-export", 44.25);
price(greatBritain, "ups-standard", 63.5);
assert.match(find(greatBritain, "ups-standard").details.join(" "), /non-Express \+40\.00 €/);
price(greatBritain, "ups-express-saver", 36.44);

const ukraine = calculatePrices(shipment({
  destinationCountry: "Ukraine",
  postalCode: "",
  goodsValue: 100,
  packages: [box(2, 30, 20, 10)],
}));
price(ukraine, "dpd-export", 44.97);
assert.equal(find(ukraine, "gls-export").possible, false);
assert.equal(find(ukraine, "hp-ems").possible, false);
assert.equal(find(ukraine, "ups-express-saver").possible, false, "UPS Ukraine is suspended in the supplied zone table");

const germanyVolumetric = calculatePrices(shipment({
  destinationCountry: "Germany",
  packages: [box(2, 50, 40, 30)],
}));
price(germanyVolumetric, "ups-standard", 27.39);
price(germanyVolumetric, "ups-express-saver", 89.3);
assert.match(find(germanyVolumetric, "ups-standard").details.join(" "), /obračunska masa 12\.0 kg/);

const germanyMulti = calculatePrices(shipment({
  destinationCountry: "Germany",
  packages: [box(0.6, 10, 10, 10), box(0.6, 10, 10, 10)],
}));
price(germanyMulti, "ups-standard", 22.81);
price(germanyMulti, "ups-express-saver", 24);
assert.match(find(germanyMulti, "ups-standard").details.join(" "), /višepaketna pošiljka/);

const germanyHandling = calculatePrices(shipment({
  destinationCountry: "Germany",
  packages: [box(26, 50, 40, 30)],
}));
price(germanyHandling, "ups-standard", 54.19);
price(germanyHandling, "ups-express-saver", 174.46);
assert.match(find(germanyHandling, "ups-standard").details.join(" "), /dodatna manipulacija/);

const germanyLarge = calculatePrices(shipment({
  destinationCountry: "Germany",
  packages: [box(10, 101, 50, 50)],
}));
price(germanyLarge, "ups-standard", 178.72);
price(germanyLarge, "ups-express-saver", 386.16);
assert.match(find(germanyLarge, "ups-standard").details.join(" "), /veliki paket/);
assert.doesNotMatch(find(germanyLarge, "ups-standard").details.join(" "), /dodatna manipulacija/);

const usa = calculatePrices(shipment({
  destinationCountry: "UPS:US",
  goodsValue: 100,
  packages: [box(2, 30, 20, 10)],
}));
assert.equal(find(usa, "ups-standard").possible, false);
price(usa, "ups-express-saver", 56.69);
assert.match(find(usa, "ups-express-saver").details.join(" "), /US International Processing Fee \+2\.35 €/);
assert.equal(usa.recommendedWinner, null, "USA has no Economy tariff in the supplied UPS guide");
assert.equal(usa.expressWinner?.id, "ups-express-saver");

const austriaPrivateRecipient = calculatePrices(shipment({
  destinationCountry: "Austria",
  recipientType: "private",
  postalCode: "",
  packages: [box(2, 30, 20, 10)],
}));
price(austriaPrivateRecipient, "ups-standard", 15.1);
price(austriaPrivateRecipient, "ups-express-saver", 26.63);
assert.match(find(austriaPrivateRecipient, "ups-standard").warning ?? "", /Residential Delivery nije automatski uključen/);

const albania = calculatePrices(shipment({
  destinationCountry: "UPS:AL",
  goodsValue: 100,
  packages: [box(2, 30, 20, 10)],
}));
assert.equal(find(albania, "ups-standard").possible, false);
price(albania, "ups-express-saver", 127.4);
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
