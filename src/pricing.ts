import {
  INTIME_ZONE_BY_PLACE,
  INTIME_ZONE_BY_POSTAL,
  OVERSEAS_CARGO_BY_PLACE,
  OVERSEAS_CARGO_BY_POSTAL,
  PLACE_OPTIONS_BY_POSTAL,
} from "./destinationRules";
import { EXPORT_TARIFFS, type ExportCountryTariff, type ExportTier } from "./exportTariffs";
import { DPD_ROAD_FUEL_PER_PACKAGE, FUEL_CONFIG } from "./fuelConfig";
import {
  UPS_ADDITIONAL_HANDLING,
  UPS_BALKANS_SAVER_OVER_70,
  UPS_BALKANS_SAVER_RATES,
  UPS_EXPRESS_SAVER_FUEL,
  UPS_FUEL_EFFECTIVE_FROM,
  UPS_EXPORT_CLEARANCE,
  UPS_LARGE_PACKAGE,
  UPS_NON_EXPRESS_CUSTOMS_BROKERAGE,
  UPS_OVER_MAXIMUM,
  UPS_REMOTE_MINIMUM,
  UPS_REMOTE_RATE_PER_KG,
  UPS_TRUE_REMOTE_MINIMUM,
  UPS_TRUE_REMOTE_RATE_PER_KG,
  UPS_US_PROCESSING_FEE,
  UPS_SAVER_OVER_70,
  UPS_SAVER_PACKAGE_RATES,
  UPS_STANDARD_FUEL,
  UPS_STANDARD_MULTI_RATES,
  UPS_STANDARD_OVER_100,
  UPS_STANDARD_SINGLE_RATES,
  getUpsCountry,
  type UpsCountry,
  type UpsOverWeightRate,
  type UpsTier,
} from "./upsTariffs";

export type NumericPackageItem = {
  weight: number;
  length: number;
  width: number;
  height: number;
};

export type CarrierStatus = "ok" | "surcharge" | "manual" | "no";
export type ServiceType = "MBE Economy" | "MBE Express" | "MBE Paketomati";

export type AdditionalServices = {
  documentReturn: boolean;
  addresseeOnly: boolean;
  specialHandling: boolean;
};

export type CodPaymentMethod = "cash" | "card";
export type RecipientType = "private" | "business";

export type InTimeOptions = {
  smsNotification: boolean;
  pickupAttempt: boolean;
  nonStandard: boolean;
  otherProvider: boolean;
  dataCorrection: boolean;
  proofOfDelivery: boolean;
  returnToSender: boolean;
  declaredValue: number;
};

export type PricingInput = {
  originPostalCode: string;
  pricingDate: string;
  destinationCountry: string;
  postalCode: string;
  destinationPlace: string;
  recipientType: RecipientType;
  packages: NumericPackageItem[];
  cod: boolean;
  codAmount: number;
  codPaymentMethod: CodPaymentMethod;
  goodsValue: number;
  additionalServices: AdditionalServices;
  inTimeOptions: InTimeOptions;
};

export type PriceResult = {
  id: string;
  name: string;
  carrier: string;
  price: number | null;
  possible: boolean;
  details: string[];
  serviceType: ServiceType;
  warning?: string;
  status: CarrierStatus;
};

export type PricingResults = {
  economy: PriceResult[];
  express: PriceResult[];
  lockers: PriceResult[];
  economyWinner: PriceResult | null;
  expressWinner: PriceResult | null;
  lockerWinner: PriceResult | null;
  overallWinner: PriceResult | null;
  recommendedWinner: PriceResult | null;
};

type Tier = { max: number; price: number };
type Zone = 1 | 2 | 3;

const OVERSEAS_VOLUME_DISCOUNT = 0.06; // Effective from 2026-10-01.
const OVERSEAS_OVSZ_FEE = 1.5; // Effective from 2026-10-01; acceptance of out-of-standard parcels still requires confirmation.

const GLS_SINGLE: Tier[] = [
  { max: 2, price: 3.62 }, { max: 3, price: 3.62 }, { max: 5, price: 3.62 },
  { max: 10, price: 4.79 }, { max: 15, price: 5.47 }, { max: 20, price: 6.38 },
  { max: 25, price: 7.51 }, { max: 30, price: 8.86 }, { max: 40, price: 9.99 },
];

const GLS_MULTI_2_4: Tier[] = [
  { max: 2, price: 2.64 }, { max: 3, price: 2.84 }, { max: 5, price: 2.96 },
  { max: 10, price: 3.75 }, { max: 15, price: 4.81 }, { max: 20, price: 5.59 },
  { max: 25, price: 6.41 }, { max: 30, price: 7.9 }, { max: 40, price: 8.75 },
];

const GLS_MULTI_5_PLUS: Tier[] = [
  { max: 2, price: 2.31 }, { max: 3, price: 2.54 }, { max: 5, price: 2.67 },
  { max: 10, price: 3.48 }, { max: 15, price: 4.47 }, { max: 20, price: 5.24 },
  { max: 25, price: 6.08 }, { max: 30, price: 7.31 }, { max: 40, price: 8.52 },
];

const GLS_LOCKER_SINGLE: Tier[] = [
  { max: 2, price: 2.29 }, { max: 3, price: 2.29 }, { max: 5, price: 2.29 },
  { max: 10, price: 3.46 }, { max: 15, price: 4.14 }, { max: 20, price: 5.05 },
  { max: 25, price: 6.18 }, { max: 30, price: 7.53 }, { max: 40, price: 8.66 },
];

const GLS_LOCKER_MULTI_2_4: Tier[] = [
  { max: 2, price: 1.31 }, { max: 3, price: 1.51 }, { max: 5, price: 1.63 },
  { max: 10, price: 2.42 }, { max: 15, price: 3.48 }, { max: 20, price: 4.26 },
  { max: 25, price: 5.08 }, { max: 30, price: 6.57 }, { max: 40, price: 7.42 },
];

const GLS_LOCKER_MULTI_5_PLUS: Tier[] = [
  { max: 2, price: 0.98 }, { max: 3, price: 1.21 }, { max: 5, price: 1.34 },
  { max: 10, price: 2.15 }, { max: 15, price: 3.14 }, { max: 20, price: 3.91 },
  { max: 25, price: 4.75 }, { max: 30, price: 5.98 }, { max: 40, price: 7.19 },
];

const GLS_DOMESTIC_SMS = 0.12;
const GLS_DOMESTIC_COD = 0.49;
const GLS_BANK_CARD_RATE = 0.01;

const DPD_SINGLE: Tier[] = [
  { max: 2, price: 2.39 }, { max: 5, price: 2.47 }, { max: 15, price: 3.05 },
  { max: 25, price: 3.89 }, { max: 31.5, price: 5.44 },
];

const DPD_SHOP: Tier[] = [
  { max: 2, price: 1.70 }, { max: 5, price: 1.80 }, { max: 10, price: 2.00 },
  { max: 15, price: 2.25 }, { max: 20, price: 2.70 },
];

const DPD_ISLAND_SURCHARGE = 3.50;

const HP_PARCEL: Tier[] = [
  { max: 5, price: 2.2 }, { max: 10, price: 2.8 }, { max: 15, price: 3.3 },
  { max: 20, price: 4.05 }, { max: 30, price: 5.45 },
];
const HP_DOMESTIC_CONTRACT_VALID_UNTIL = "2026-10-31";
const HP_PALLET_HEIGHT = 180;

const HP_LOCKER_PRICE = 2.05;
const HP_INCLUDED_INSURED_VALUE = 420;
const HP_PALLET_INCLUDED_INSURED_VALUE = 400;
const HP_PALLET_OVER_500_STEP = 15.04;
const HP_PALLET_SUPPORTED_CITY_POSTALS = new Set([
  "10000", "20000", "21000", "22000", "23000", "31000", "35000",
  "42000", "43000", "44000", "47000", "51000", "52100", "53000",
]);
const HP_PALLET_SUPPORTED_CITIES = new Set([
  "ZAGREB", "DUBROVNIK", "SPLIT", "SIBENIK", "ŠIBENIK", "ZADAR", "OSIJEK",
  "SLAVONSKI BROD", "BJELOVAR", "VARAZDIN", "VARAŽDIN", "KARLOVAC", "SISAK",
  "RIJEKA", "PULA", "GOSPIC", "GOSPIĆ",
]);
const HP_LOCKER_COMPARTMENTS: Array<[number, number, number]> = [
  [9, 16, 64],
  [9, 38, 64],
  [19, 38, 64],
  [39, 38, 64],
];


const SCHENKER_PACKAGE_PRICE = 5.44;
const SCHENKER_KORCULA_PACKAGE_PRICE = 14.00;
const SCHENKER_PACKAGE_MINIMUM = 12.00;
const SCHENKER_PACKAGE_MAX_WEIGHT = 25;
const SCHENKER_PACKAGE_LIMITS: [number, number, number] = [60, 50, 40];
const SCHENKER_PALLET_LIMITS: [number, number, number] = [120, 80, 190];
const SCHENKER_PALLET_MAX_WEIGHT = 600;
const SCHENKER_ISLAND_SURCHARGE = 0.50;
const SCHENKER_KORCULA_POSTALS = new Set(["20260","20263","20264","20270","20271","20272","20273","20274","20275"]);

type SchenkerBand =
  | "10000"
  | "40000"
  | "51000"
  | "31000"
  | "52000"
  | "23000"
  | "53000"
  | "21000"
  | "20000";

const schenkerBand = (postalCode: string): SchenkerBand | null => {
  const value = Number(postalCode);
  if (!Number.isFinite(value)) return null;
  if (value >= 10000 && value <= 10999) return "10000";
  if (value >= 40000 && value <= 49999) return "40000";
  if (value >= 51000 && value <= 51999) return "51000";
  if (value >= 31000 && value <= 35999) return "31000";
  if (value >= 52000 && value <= 52999) return "52000";
  if (value >= 23000 && value <= 23999) return "23000";
  if (value >= 53000 && value <= 53999) return "53000";
  if (value >= 21000 && value <= 22999) return "21000";
  if (value >= 20000 && value <= 20999) return "20000";
  return null;
};

const SCHENKER_PALLET_RATES: Partial<Record<SchenkerBand, Partial<Record<SchenkerBand, number>>>> = {
  "10000": {
    "10000": 22.99, "40000": 33.40, "51000": 35.43, "31000": 36.33,
    "52000": 44.32, "23000": 44.32, "53000": 44.32, "21000": 47.60, "20000": 67.47,
  },
  "40000": {
    "40000": 23.68, "10000": 34.40, "51000": 37.55, "31000": 38.51,
    "52000": 46.97, "23000": 46.97, "53000": 46.97, "21000": 50.45, "20000": 71.52,
  },
  "51000": {
    "51000": 24.37, "10000": 35.40, "52000": 35.40, "40000": 37.55,
    "53000": 38.51, "31000": 46.97, "21000": 50.45, "23000": 50.45, "20000": 71.52,
  },
  "52000": {
    "51000": 24.37, "10000": 35.40, "52000": 35.40, "40000": 37.55,
    "53000": 38.51, "31000": 46.97, "21000": 50.45, "23000": 50.45, "20000": 71.52,
  },
  "31000": {
    "31000": 24.37, "10000": 35.40, "40000": 37.55, "51000": 38.51,
    "52000": 46.97, "23000": 46.97, "53000": 46.97, "21000": 50.45, "20000": 71.52,
  },
  "23000": {
    "23000": 24.37, "10000": 35.40, "40000": 37.55, "21000": 38.51,
    "51000": 46.97, "52000": 50.45, "53000": 50.45, "31000": 50.45, "20000": 71.52,
  },
  "53000": {
    "23000": 24.37, "10000": 35.40, "40000": 37.55, "21000": 38.51,
    "51000": 46.97, "52000": 50.45, "53000": 50.45, "31000": 50.45, "20000": 71.52,
  },
  "21000": {
    "21000": 24.37, "20000": 35.40, "10000": 37.55, "40000": 38.51,
    "51000": 46.97, "52000": 50.45, "23000": 50.45, "53000": 50.45, "31000": 71.52,
  },
  "20000": {
    "21000": 24.37, "20000": 35.40, "10000": 37.55, "40000": 38.51,
    "51000": 46.97, "52000": 50.45, "23000": 50.45, "53000": 50.45, "31000": 71.52,
  },
};

const schenkerIslandSchedule = (postalCode: string) => {
  if (SCHENKER_KORCULA_POSTALS.has(postalCode)) return "Korčula: subota ili ponedjeljak";
  if (["21450","21454","21460","21462","21463","21465","21466","21467","21468","21469"].includes(postalCode)) return "Hvar: srijeda, petak ili subota";
  if (["21400","21403","21404","21405","21410","21412","21413"].includes(postalCode)) return "Brač: srijeda";
  if (["51280","51281"].includes(postalCode)) return "Rab: petak ili subota";
  if (["51550","51551","51552","51554","51555","51557","51561","51562"].includes(postalCode)) return "Cres/Lošinj: subota";
  if (["51500","51511","51512","51513","51514","51515","51516","51517"].includes(postalCode)) return "Krk: ponedjeljak, srijeda ili petak";
  return null;
};

const OVERSEAS_SINGLE: Tier[] = [
  { max: 10, price: 2.61 }, { max: 20, price: 3.24 }, { max: 31.5, price: 3.52 },
];

const OVERSEAS_MULTI: Tier[] = [
  { max: 5, price: 2.63 }, { max: 10, price: 2.84 }, { max: 20, price: 4.17 },
  { max: 30, price: 5.4 }, { max: 40, price: 6.31 }, { max: 50, price: 7.81 },
  { max: 60, price: 8.74 }, { max: 70, price: 10.09 }, { max: 80, price: 11.8 },
  { max: 90, price: 13.21 }, { max: 100, price: 14.56 },
];

const INTIME: Record<Zone, Tier[]> = {
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
};

const INTIME_SEASONAL_SURCHARGE = 0.15;
const INTIME_DECLARED_VALUE_RATE = 0.006;
const INTIME_DECLARED_VALUE_THRESHOLD = 130;
const INTIME_DECLARED_VALUE_MAX = 2000;
const INTIME_SMS_FEE = 0.12;
const INTIME_PICKUP_ATTEMPT_FEE = 5;
const INTIME_OTHER_PROVIDER_FEE = 8;
const INTIME_DATA_CORRECTION_FEE = 2;
const INTIME_PROOF_OF_DELIVERY_FEE = 5;

const inTimeSeasonalSurchargeActive = (pricingDate: string) => {
  const monthDay = pricingDate.slice(5);
  return monthDay >= "11-01" && monthDay <= "12-31";
};


const ISLAND_POSTALS = new Set([
  "20221", "20222", "20223", "20224", "20225", "20226", "20289", "20290",
  "20260", "20263", "20264", "20270", "20271", "20272", "20273", "20274", "20275",
  "21225", "21400", "21403", "21404", "21405", "21410", "21412", "21413", "21420", "21423", "21424",
  "21425", "21426", "21430", "21432", "21450", "21454", "21460", "21462", "21463", "21465", "21466",
  "21467", "21468", "21469", "21480", "21483", "21485", "22232", "22233", "22234", "22235", "22236",
  "23262", "23263", "23264", "23271", "23272", "23273", "23274", "23281", "23282", "23283", "23284", "23285", "23286", "23287", "23291", "23292", "23293", "23294",
  "23295", "23296", "51280", "51281", "51550", "51551", "51552", "51554", "51555", "51557", "51561", "51562",
]);

const BRIDGE_ISLAND_POSTALS = new Set([
  "51500", "51511", "51512", "51513", "51514", "51515", "51516", "51517",
  "23234", "23250", "53291", "21220", "21223", "22243",
]);

const GLS_SPECIAL_POSTALS = new Set([
  "20221", "20222", "20223", "20224", "20225", "20226", "20290", "21225", "21430", "21432",
  "22232", "22233", "22234", "22235", "22236", "23281", "23282", "23283", "23284", "23285",
  "23286", "23287", "23291", "23292", "23293", "23294", "23295", "23296", "51552", "51561", "51562",
]);

const LAGERMAX_DELIVERABLE_ISLANDS = new Set([
  "51500", "51511", "51512", "51513", "51514", "51515", "51516", "51517",
  "20260", "20263", "20264", "20270", "20271", "20272", "20273", "20274", "20275", "20289", "20290",
  "21400", "21403", "21404", "21405", "21410", "21412", "21413", "21420", "21423", "21424", "21425", "21426",
  "21430", "21432", "21450", "21454", "21460", "21462", "21463", "21465", "21466", "21467", "21468", "21469",
  "21480", "21483", "21485", "23262", "23263", "23264", "23271", "23272", "23273", "23274",
  "51280", "51281", "51550", "51551", "51552", "51554", "51555", "51557", "51561", "51562",
]);

const LAGERMAX_DUGI_OTOK_POSTALS = new Set([
  "23281", "23282", "23283", "23284", "23285", "23286", "23287",
  "23291", "23292", "23293", "23294", "23295", "23296",
]);

const LAGERMAX_ISLAND_SCHEDULES: Array<{ postals: Set<string>; label: string; schedule: string; note: string }> = [
  {
    postals: new Set(["51500", "51511", "51512", "51513", "51514", "51515", "51516", "51517"]),
    label: "Krk",
    schedule: "ponedjeljak - petak",
    note: "Utovar LMX Rijeka jedan dan ranije; u sezoni su mogući dodatni kamioni kroz tjedan, ovisno o količini robe i kapacitetu.",
  },
  {
    postals: new Set(["51550", "51551", "51552", "51554", "51555", "51557", "51561", "51562"]),
    label: "Cres - Lošinj",
    schedule: "srijeda i subota",
    note: "Utovar LMX Rijeka jedan dan ranije.",
  },
  {
    postals: new Set(["51280", "51281"]),
    label: "Rab",
    schedule: "utorak i subota",
    note: "Utovar LMX Rijeka jedan dan ranije.",
  },
  {
    postals: new Set(["23262", "23263", "23264", "23271", "23272", "23273", "23274"]),
    label: "Ugljan - Pašman",
    schedule: "ponedjeljak",
    note: "Utovar LMX Zadar jedan dan ranije.",
  },
  {
    postals: new Set(["21450", "21454", "21460", "21462", "21463", "21465", "21466", "21467", "21468", "21469"]),
    label: "Hvar",
    schedule: "utorak i subota",
    note: "Utovar LMX Split jedan dan ranije.",
  },
  {
    postals: new Set(["21400", "21403", "21404", "21405", "21410", "21412", "21413"]),
    label: "Brač",
    schedule: "srijeda i subota",
    note: "Utovar LMX Split jedan dan ranije.",
  },
  {
    postals: new Set(["21430", "21432"]),
    label: "Šolta",
    schedule: "svaka 2 tjedna; subota prema rasporedu",
    note: "Utovar LMX Split jedan dan ranije.",
  },
  {
    postals: new Set(["20289", "20290"]),
    label: "Lastovo",
    schedule: "1 put mjesečno; subota prema rasporedu",
    note: "Utovar LMX Split jedan dan ranije.",
  },
  {
    postals: new Set(["21480", "21483", "21485"]),
    label: "Vis",
    schedule: "svaka 2 tjedna; subota prema rasporedu",
    note: "Utovar LMX Split jedan dan ranije.",
  },
  {
    postals: new Set(["20260", "20263", "20264", "20270", "20271", "20272", "20273", "20274", "20275"]),
    label: "Korčula",
    schedule: "srijeda i subota",
    note: "Utovar LMX Split jedan dan ranije.",
  },
];

const LAGERMAX_ISLAND_SURCHARGE = 0.50;

const lagermaxIslandSchedule = (postalCode: string) =>
  LAGERMAX_ISLAND_SCHEDULES.find((entry) => entry.postals.has(postalCode)) ?? null;

const OVERSEAS_REMOTE_POSTALS = new Set([
  "20000", "20205", "20207", "20210", "20213", "20215", "20216", "20217", "20218",
  "20231", "20232", "20233", "20234", "20235", "20236",
]);

const INTIME_POSTAL_ZONES = INTIME_ZONE_BY_POSTAL as Record<string, 0 | Zone>;
const INTIME_PLACE_ZONES = INTIME_ZONE_BY_PLACE as Record<string, Record<string, 0 | Zone>>;
const OVERSEAS_POSTAL_CARGO = OVERSEAS_CARGO_BY_POSTAL as Record<string, 0 | 1 | 2>;
const OVERSEAS_PLACE_CARGO = OVERSEAS_CARGO_BY_PLACE as Record<string, Record<string, 0 | 1 | 2>>;
const PLACE_OPTIONS = PLACE_OPTIONS_BY_POSTAL as Record<string, readonly string[]>;

const round2 = (value: number) => Math.round((value + Number.EPSILON) * 100) / 100;
const totalWeight = (items: NumericPackageItem[]) => items.reduce((sum, item) => sum + item.weight, 0);
const totalVolume = (items: NumericPackageItem[]) => items.reduce((sum, item) => sum + item.length * item.width * item.height, 0);
const volumeWeightInTime = (items: NumericPackageItem[]) => totalVolume(items) / 5000;
const tierPrice = (table: readonly Tier[], value: number) => table.find((tier) => value <= tier.max)?.price ?? null;

const normalizePlace = (value: string) => value
  .normalize("NFD")
  .replace(/[\u0300-\u036f]/g, "")
  .trim()
  .toLocaleUpperCase("hr-HR");

const dimensions = (item: NumericPackageItem) => {
  const sorted = [item.length, item.width, item.height].sort((a, b) => b - a);
  return {
    longest: sorted[0],
    middle: sorted[1],
    shortest: sorted[2],
    girth: sorted[0] + 2 * (sorted[1] + sorted[2]),
    sum: sorted[0] + sorted[1] + sorted[2],
  };
};

const fitsDimensions = (item: NumericPackageItem, limits: [number, number, number]) => {
  const itemSides = [item.length, item.width, item.height].sort((a, b) => a - b);
  const limitSides = [...limits].sort((a, b) => a - b);
  return itemSides.every((side, index) => side <= limitSides[index]);
};

const isIsland = (postalCode: string) => ISLAND_POSTALS.has(postalCode);
const isAnyIsland = (postalCode: string) => ISLAND_POSTALS.has(postalCode) || BRIDGE_ISLAND_POSTALS.has(postalCode);
const isOverseasRemote = (postalCode: string) => postalCode.startsWith("20") || isIsland(postalCode) || OVERSEAS_REMOTE_POSTALS.has(postalCode);

const unavailable = (
  id: string,
  name: string,
  carrier: string,
  serviceType: ServiceType,
  reason: string,
  status: CarrierStatus = "no",
): PriceResult => ({
  id,
  name,
  carrier,
  price: null,
  possible: false,
  details: [reason],
  serviceType,
  warning: reason,
  status,
});

type AddOnRates = Partial<Record<keyof AdditionalServices, number>>;

const addOptionalServices = (
  amount: number,
  input: PricingInput,
  rates: AddOnRates,
  details: string[],
) => {
  const labels: Record<keyof AdditionalServices, string> = {
    documentReturn: "povrat ovjerenog dokumenta",
    addresseeOnly: "osobno uručenje",
    specialHandling: "posebno rukovanje",
  };

  let nextAmount = amount;
  for (const key of Object.keys(input.additionalServices) as Array<keyof AdditionalServices>) {
    if (!input.additionalServices[key]) continue;
    const rate = rates[key];
    if (rate === undefined) return { amount: nextAmount, unsupported: labels[key] };
    nextAmount += rate;
    details.push(`${labels[key]} +${rate.toFixed(2)} €`);
  }
  return { amount: nextAmount, unsupported: null };
};

type Group = { count: number; weight: number; base: number };

const optimizeOrderedGroups = (
  items: NumericPackageItem[],
  maxWeight: number,
  maxCount: number,
  groupPrice: (weight: number) => number | null,
): Group[] | null => {
  const weights = [...items].map((item) => item.weight).sort((a, b) => b - a);
  const n = weights.length;
  const costs = Array(n + 1).fill(Infinity) as number[];
  const choices = Array(n).fill(0) as number[];
  costs[n] = 0;

  for (let index = n - 1; index >= 0; index -= 1) {
    let weight = 0;
    for (let end = index; end < Math.min(n, index + maxCount); end += 1) {
      weight += weights[end];
      if (weight > maxWeight) break;
      const base = groupPrice(weight);
      if (base === null) continue;
      const candidate = base + costs[end + 1];
      if (candidate < costs[index] - 1e-9) {
        costs[index] = candidate;
        choices[index] = end + 1;
      }
    }
  }

  if (!Number.isFinite(costs[0])) return null;
  const groups: Group[] = [];
  for (let index = 0; index < n;) {
    const next = choices[index];
    const weight = weights.slice(index, next).reduce((sum, value) => sum + value, 0);
    const base = groupPrice(weight);
    if (base === null || next <= index) return null;
    groups.push({ count: next - index, weight, base });
    index = next;
  }
  return groups;
};

export const getPlaceOptions = (postalCode: string) => PLACE_OPTIONS[postalCode] ?? [];

export const resolveInTimeZone = (postalCode: string, destinationPlace: string): Zone | null => {
  const postalZone = INTIME_POSTAL_ZONES[postalCode];
  if ([1, 2, 3].includes(postalZone)) return postalZone as Zone;
  if (postalZone !== 0 || !destinationPlace) return null;
  const placeZone = INTIME_PLACE_ZONES[postalCode]?.[normalizePlace(destinationPlace)];
  return [1, 2, 3].includes(placeZone) ? placeZone as Zone : null;
};

const resolveOverseasCargo = (postalCode: string, destinationPlace: string): 0 | 1 | 2 | undefined => {
  const postalStatus = OVERSEAS_POSTAL_CARGO[postalCode];
  if (postalStatus !== 2) return postalStatus;
  if (!destinationPlace) return 2;
  return OVERSEAS_PLACE_CARGO[postalCode]?.[normalizePlace(destinationPlace)] ?? 2;
};

export const calcGLS = (input: PricingInput): PriceResult => {
  const { packages, postalCode } = input;
  const special = GLS_SPECIAL_POSTALS.has(postalCode);
  const serviceType: ServiceType = "MBE Express";
  const id = "gls-express";

  for (const item of packages) {
    const size = dimensions(item);
    const overLimit = special
      ? item.weight > 10 || size.longest > 150 || size.girth > 300
      : item.weight > 40 || size.longest > 200 || size.girth > 300;
    if (overLimit) {
      return unavailable(id, "GLS", "GLS", serviceType, special
        ? "Posebno područje: najviše 10 kg, duljina 150 cm i opseg 300 cm po paketu."
        : "Izvan GLS standarda (40 kg, duljina 200 cm ili opseg 300 cm); potrebna je ručna potvrda.", "manual");
    }
  }

  const table = packages.length === 1 ? GLS_SINGLE : packages.length <= 4 ? GLS_MULTI_2_4 : GLS_MULTI_5_PLUS;
  let base = 0;
  for (const item of packages) {
    const itemPrice = special ? (item.weight <= 5 ? 20.81 : 21.99) : tierPrice(table, item.weight);
    if (itemPrice === null) return unavailable(id, "GLS", "GLS", serviceType, "Nema tarife za unesenu težinu.");
    base += itemPrice;
  }

  const fuel = FUEL_CONFIG.gls.domesticPerPackage * packages.length;
  const sms = GLS_DOMESTIC_SMS;
  const codFee = input.cod ? GLS_DOMESTIC_COD : 0;
  const details = [
    `${packages.length === 1 ? "single" : packages.length <= 4 ? "multi 2–4" : "multi 5+"}: ${base.toFixed(2)} €`,
    `gorivo ${packages.length} × ${FUEL_CONFIG.gls.domesticPerPackage.toFixed(2)} € = ${fuel.toFixed(2)} €`,
    `SMS po pošiljci = ${sms.toFixed(2)} €`,
  ];
  if (special) details.push("GLS posebno dostavno područje");
  if (input.cod) details.push("COD +0,49 €");

  const optional = addOptionalServices(base + fuel + sms + codFee, input, {
    documentReturn: 2.46,
    addresseeOnly: 2.5,
    specialHandling: 2.52,
  }, details);
  if (optional.unsupported) return unavailable(id, "GLS", "GLS", serviceType, `GLS: ${optional.unsupported} nije ugovoreno.`);

  return {
    id,
    name: "GLS",
    carrier: "GLS",
    price: round2(optional.amount),
    possible: true,
    details,
    serviceType,
    status: special || input.cod || Object.values(input.additionalServices).some(Boolean) ? "surcharge" : "ok",
    warning: input.cod ? "Ako primatelj plati pouzeće karticom, GLS dodatno naplaćuje 1% iznosa pouzeća." : undefined,
  };
};

export const calcGLSLocker = (input: PricingInput): PriceResult => {
  const id = "gls-locker";
  const serviceType: ServiceType = "MBE Paketomati";

  if (Object.values(input.additionalServices).some(Boolean)) {
    return unavailable(id, "GLS Paketomat", "GLS", serviceType, "Odabrane dodatne usluge nisu ugovorene za GLS Paketomat.", "manual");
  }

  for (const item of input.packages) {
    if (item.weight > 40 || !fitsDimensions(item, [50, 50, 50])) {
      return unavailable(id, "GLS Paketomat", "GLS", serviceType, "GLS Paketomat: paket mora biti do 40 kg i najviše 50 × 50 × 50 cm.");
    }
  }

  const table = input.packages.length === 1
    ? GLS_LOCKER_SINGLE
    : input.packages.length <= 4
      ? GLS_LOCKER_MULTI_2_4
      : GLS_LOCKER_MULTI_5_PLUS;

  let base = 0;
  for (const item of input.packages) {
    const itemPrice = tierPrice(table, item.weight);
    if (itemPrice === null) return unavailable(id, "GLS Paketomat", "GLS", serviceType, "Nema GLS Paketomat tarife za unesenu težinu.");
    base += itemPrice;
  }

  const fuel = FUEL_CONFIG.gls.domesticPerPackage * input.packages.length;
  const sms = GLS_DOMESTIC_SMS;
  const codFee = input.cod ? GLS_DOMESTIC_COD : 0;
  const bankCardFee = input.cod ? input.codAmount * GLS_BANK_CARD_RATE : 0;
  const details = [
    `${input.packages.length === 1 ? "single" : input.packages.length <= 4 ? "multi 2–4" : "multi 5+"} Paketomat: ${base.toFixed(2)} €`,
    `gorivo ${input.packages.length} × ${FUEL_CONFIG.gls.domesticPerPackage.toFixed(2)} € = ${fuel.toFixed(2)} €`,
    `SMS po pošiljci = ${sms.toFixed(2)} €`,
  ];
  if (input.cod) {
    details.push(`COD +${codFee.toFixed(2)} €`);
    details.push(`kartično plaćanje COD 1% = ${bankCardFee.toFixed(2)} €`);
  }

  return {
    id,
    name: "GLS Paketomat",
    carrier: "GLS",
    price: round2(base + fuel + sms + codFee + bankCardFee),
    possible: true,
    details,
    serviceType,
    status: input.cod ? "surcharge" : "ok",
  };
};

export const calcDPD = (input: PricingInput): PriceResult => {
  const { packages, postalCode } = input;
  const id = "dpd-standard";
  const serviceType: ServiceType = "MBE Economy";
  for (const item of packages) {
    const size = dimensions(item);
    if (item.weight > 31.5 || size.longest > 175 || size.girth > 300) {
      const extras = [];
      if (size.girth > 300 || size.longest > 175) extras.push("oversize prema ponudi +25,00 € u domaćem prometu");
      if (item.weight > 31.5) extras.push("overweight prema ponudi +2,00 €/kg iznad 31,5 kg");
      return unavailable(id, "DPD", "DPD", serviceType, `Izvan DPD standarda; potreban prethodni dogovor. ${extras.join("; ")}.`, "manual");
    }
  }
  if (input.cod && input.codAmount > 2500) return unavailable(id, "DPD", "DPD", serviceType, "DPD gotovinska otkupnina može biti najviše 2.500 €.");

  const base = packages.length >= 2
    ? 2.89 * packages.length
    : tierPrice(DPD_SINGLE, packages[0].weight);
  if (base === null) return unavailable(id, "DPD", "DPD", serviceType, "Nema tarife za unesenu težinu.");
  const fuel = DPD_ROAD_FUEL_PER_PACKAGE * packages.length;
  const island = isIsland(postalCode) ? DPD_ISLAND_SURCHARGE * packages.length : 0;
  const details = [
    packages.length >= 2 ? `DPD Multi ${packages.length} × 2,89 € = ${base.toFixed(2)} €` : `osnovna tarifa ${base.toFixed(2)} €`,
    `gorivo ${FUEL_CONFIG.dpd.referenceMonth} (${FUEL_CONFIG.dpd.dieselReference.toFixed(2)} €/l): ${packages.length} × ${DPD_ROAD_FUEL_PER_PACKAGE.toFixed(2)} € = ${fuel.toFixed(2)} €`,
  ];
  if (island) details.push(`otočna nadoplata ${packages.length} × ${DPD_ISLAND_SURCHARGE.toFixed(2)} € = ${island.toFixed(2)} €`);
  if (input.cod) details.push("gotovinski COD uključen");
  const optional = addOptionalServices(base + fuel + island, input, {
    documentReturn: 1.83,
    addresseeOnly: 1.83,
    specialHandling: 8,
  }, details);
  if (optional.unsupported) return unavailable(id, "DPD", "DPD", serviceType, `DPD: ${optional.unsupported} nije ugovoreno.`);

  return {
    id,
    name: packages.length >= 2 ? "DPD Multi" : "DPD",
    carrier: "DPD",
    price: round2(optional.amount),
    possible: true,
    details,
    serviceType,
    status: island || Object.values(input.additionalServices).some(Boolean) ? "surcharge" : "ok",
    warning: input.cod ? "Gotovinski COD je uključen. Ako primatelj plati karticom/online, DPD može obračunati zasebnu kartičnu naknadu; njezin iznos nije naveden u dostavljenoj ugovornoj ponudi." : undefined,
  };
};

export const calcDPDShop = (input: PricingInput): PriceResult => {
  const id = "dpd-shop";
  const serviceType: ServiceType = "MBE Paketomati";

  if (Object.values(input.additionalServices).some(Boolean)) {
    return unavailable(id, "DPD Pickup / Paketomat", "DPD", serviceType, "Odabrane dodatne usluge nisu ugovorene za DPD Shop/Pickup dostavu.", "manual");
  }

  if (input.cod) {
    return unavailable(id, "DPD Pickup / Paketomat", "DPD", serviceType, "DPD paketomat podržava pouzeće preko Monri WSPay, ali ugovoreni trošak kartičnog plaćanja nije naveden u dostavljenoj ponudi; potrebna je ručna provjera.", "manual");
  }

  let base = 0;
  for (const item of input.packages) {
    const size = dimensions(item);
    if (item.weight > 20 || size.longest > 100 || size.girth > 250) {
      return unavailable(id, "DPD Pickup / Paketomat", "DPD", serviceType, "DPD Pickup: najviše 20 kg, duljina 100 cm i opseg 250 cm po paketu.");
    }
    const itemPrice = tierPrice(DPD_SHOP, item.weight);
    if (itemPrice === null) return unavailable(id, "DPD Pickup / Paketomat", "DPD", serviceType, "Nema DPD Shop tarife za unesenu težinu.");
    base += itemPrice;
  }

  const fuel = DPD_ROAD_FUEL_PER_PACKAGE * input.packages.length;
  const details = [
    `DPD Shop ${input.packages.length} paket(a): ${base.toFixed(2)} €`,
    `gorivo ${FUEL_CONFIG.dpd.referenceMonth} (${FUEL_CONFIG.dpd.dieselReference.toFixed(2)} €/l): ${input.packages.length} × ${DPD_ROAD_FUEL_PER_PACKAGE.toFixed(2)} € = ${fuel.toFixed(2)} €`,
  ];

  return {
    id,
    name: "DPD Pickup / Paketomat",
    carrier: "DPD",
    price: round2(base + fuel),
    possible: true,
    details,
    serviceType,
    status: "ok",
  };
};

export const calcSchenkerPackages = (input: PricingInput): PriceResult => {
  const id = "schenker-packages";
  const serviceType: ServiceType = "MBE Economy";
  if (input.recipientType !== "business") {
    return unavailable(id, "Schenker Paketi", "Schenker", serviceType, "Schenker ugovorene paketne cijene ne podržavaju dostavu fizičkim osobama.");
  }
  if (input.cod) return unavailable(id, "Schenker Paketi", "Schenker", serviceType, "COD nije naveden u Schenker ponudi; potrebna je ručna potvrda.", "manual");
  if (input.additionalServices.addresseeOnly || input.additionalServices.specialHandling) {
    return unavailable(id, "Schenker Paketi", "Schenker", serviceType, "Odabrana dodatna usluga nema ugovorenu Schenker paketnu cijenu.", "manual");
  }
  for (const item of input.packages) {
    if (item.weight > SCHENKER_PACKAGE_MAX_WEIGHT || !fitsDimensions(item, SCHENKER_PACKAGE_LIMITS)) {
      return unavailable(id, "Schenker Paketi", "Schenker", serviceType, "Schenker paket: max 25 kg i 60 × 50 × 40 cm; ostale dimenzije su prema upitu.", "manual");
    }
  }

  const korcula = SCHENKER_KORCULA_POSTALS.has(input.postalCode);
  const unit = korcula ? SCHENKER_KORCULA_PACKAGE_PRICE : SCHENKER_PACKAGE_PRICE;
  const base = Math.max(SCHENKER_PACKAGE_MINIMUM, unit * input.packages.length);
  const island = isAnyIsland(input.postalCode) ? base * SCHENKER_ISLAND_SURCHARGE : 0;
  const fuel = base * FUEL_CONFIG.schenker.rate;
  const documentReturn = input.additionalServices.documentReturn ? 1.70 : 0;
  const schedule = schenkerIslandSchedule(input.postalCode);

  const details = [
    `${input.packages.length} paket(a) × ${unit.toFixed(2)} €; minimum po pošiljci ${SCHENKER_PACKAGE_MINIMUM.toFixed(2)} € = ${base.toFixed(2)} €`,
    `gorivo ${(FUEL_CONFIG.schenker.rate * 100).toFixed(0)}% (ugovorna matrica; referenca ${FUEL_CONFIG.schenker.dieselReference.toFixed(2)} €/l) = ${fuel.toFixed(2)} €`,
  ];
  if (island) details.push(`otok +50% standardne cijene = ${island.toFixed(2)} €`);
  if (documentReturn) details.push(`povrat ovjerenog dokumenta +${documentReturn.toFixed(2)} €`);
  if (schedule) details.push(schedule);
  details.push("čekanje na istovar uključeno do 10 min; dulje čekanje se dodatno naplaćuje");

  return {
    id,
    name: "Schenker Paketi",
    carrier: "Schenker",
    price: round2(base + fuel + island + documentReturn),
    possible: true,
    details,
    serviceType,
    status: fuel || island || documentReturn ? "surcharge" : "ok",
    warning: schedule && /Hvar|Brač|Cres|Lošinj/.test(schedule)
      ? "Za Hvar, Brač, Cres i Lošinj pošiljka mora biti dan ranije u regionalnom distribucijskom centru."
      : undefined,
  };
};

export const calcSchenkerPallet = (input: PricingInput): PriceResult => {
  const id = "schenker-pallet";
  const serviceType: ServiceType = "MBE Economy";
  if (input.recipientType !== "business") {
    return unavailable(id, "Schenker Paleta", "Schenker", serviceType, "Schenker ugovorene paletne cijene ne podržavaju dostavu fizičkim osobama.");
  }
  if (input.cod || Object.values(input.additionalServices).some(Boolean)) {
    return unavailable(id, "Schenker Paleta", "Schenker", serviceType, "COD i odabrane dodatne usluge nisu uključeni u automatski Schenker paletni izračun.", "manual");
  }
  if (!input.originPostalCode || input.originPostalCode.length !== 5) {
    return unavailable(id, "Schenker Paleta", "Schenker", serviceType, "Za Schenker paletu potreban je poštanski broj polazišta.", "manual");
  }
  if (!input.packages.every((item) => fitsDimensions(item, SCHENKER_PALLET_LIMITS))) {
    return unavailable(id, "Schenker Paleta", "Schenker", serviceType, "Paleta mora biti unutar 120 × 80 × 190 cm; ostale dimenzije su prema upitu.", "manual");
  }
  const estimatedWeight = totalWeight(input.packages) + 25;
  if (estimatedWeight > SCHENKER_PALLET_MAX_WEIGHT || totalVolume(input.packages) > 120 * 80 * 190) {
    return unavailable(id, "Schenker Paleta", "Schenker", serviceType, "Jedna europaleta je ugovorena do 600 kg i 120 × 80 × 190 cm; veća pošiljka je prema upitu.", "manual");
  }
  const originBand = schenkerBand(input.originPostalCode);
  const destinationBand = schenkerBand(input.postalCode);
  if (!originBand || !destinationBand) {
    return unavailable(id, "Schenker Paleta", "Schenker", serviceType, "Polazišni ili odredišni poštanski broj nije obuhvaćen dostavljenom Schenker paletnom matricom.", "manual");
  }
  const base = SCHENKER_PALLET_RATES[originBand]?.[destinationBand] ?? null;
  if (base === null) return unavailable(id, "Schenker Paleta", "Schenker", serviceType, "Za ovu relaciju nema jednoznačne ugovorene Schenker paletne cijene.", "manual");
  const island = isAnyIsland(input.postalCode) ? base * SCHENKER_ISLAND_SURCHARGE : 0;
  const fuel = base * FUEL_CONFIG.schenker.rate;
  const schedule = schenkerIslandSchedule(input.postalCode);
  const details = [
    `paleta do 600 kg; relacija ${input.originPostalCode} → ${input.postalCode}: ${base.toFixed(2)} €`,
    `procijenjena masa s europaletom: ${estimatedWeight.toFixed(2)} kg`,
    `gorivo ${(FUEL_CONFIG.schenker.rate * 100).toFixed(0)}% = ${fuel.toFixed(2)} €`,
    "čekanje na utovar/istovar uključeno do 20 min",
  ];
  if (island) details.push(`otok +50% standardne cijene = ${island.toFixed(2)} €`);
  if (schedule) details.push(schedule);

  return {
    id,
    name: "Schenker Paleta",
    carrier: "Schenker",
    price: round2(base + fuel + island),
    possible: true,
    details,
    serviceType,
    status: "surcharge",
    warning: "Ponuda je za komercijalnu neopasnu robu i pravne osobe; ostale dimenzije/palete su prema upitu.",
  };
};

const hpGroupPrice = (weight: number) => {
  if (weight <= 30) return tierPrice(HP_PARCEL, weight);
  if (weight > 100) return null;
  return 5.45 + Math.ceil((weight - 30) / 5);
};

export const calcHPParcel = (input: PricingInput): PriceResult => {
  const id = "hp-paket24";
  const serviceType: ServiceType = "MBE Economy";
  if (input.pricingDate > HP_DOMESTIC_CONTRACT_VALID_UNTIL) {
    return unavailable(id, "HP Paket24", "HP", serviceType, "MBE ugovorene HP cijene u kalkulatoru vrijede do 31.10.2026.; za pošiljke od 1.11.2026. potrebno je unijeti novi cjenik.", "manual");
  }
  for (const item of input.packages) {
    const size = dimensions(item);
    const sorted = [item.length, item.width, item.height].sort((a, b) => b - a);
    if (sorted[0] < 14 || sorted[1] < 9) {
      return unavailable(id, "HP Paket24", "HP", serviceType, "Paket24: najmanja adresna ploha pošiljke je 9 × 14 cm.");
    }
    if (item.weight > 30 || size.longest > 60 || size.sum > 180) {
      return unavailable(id, "HP Paket24", "HP", serviceType, "Paket24: najviše 30 kg po paketu, najdulja stranica 60 cm i zbroj stranica 180 cm. Pošiljka izvan tih uvjeta tretira se kao paletizirana ako ispunjava uvjete HP-a.");
    }
  }
  const groups = optimizeOrderedGroups(input.packages, 100, 10, hpGroupPrice);
  if (!groups) return unavailable(id, "HP Paket24", "HP", serviceType, "Pošiljku nije moguće rasporediti unutar 100 kg i 10 paketa po skupnoj pošiljci.");
  const base = groups.reduce((sum, group) => sum + group.base, 0);
  const codFee = input.cod ? 0.5 * groups.length : 0;
  const details = [
    `MBE ugovorena HP tarifa do 31.10.2026.`,
    ...groups.map((group, index) => `skupina ${index + 1}: ${group.count} pak. / ${group.weight.toFixed(2)} kg = ${group.base.toFixed(2)} €`),
    "preuzimanje na adresi MBE centra uključeno",
    "dodatak za preuzimanje i dostavu izvan naselja s HP popisa uključen",
    "ručna obrada te izmjene COD iznosa, adrese i primatelja uključene",
    `povrat Paket24 pošiljke uključen; osigurana vrijednost do ${HP_INCLUDED_INSURED_VALUE.toFixed(2)} € uključena`,
  ];
  if (input.cod) details.push(`COD ${groups.length} × 0,50 € = ${codFee.toFixed(2)} €`);
  const optional = addOptionalServices(base + codFee, input, {
    documentReturn: 1.59,
    addresseeOnly: 1.06,
    specialHandling: 2.07,
  }, details);
  if (optional.unsupported) return unavailable(id, "HP Paket24", "HP", serviceType, `HP: ${optional.unsupported} nije ugovoreno.`);
  return {
    id,
    name: "HP Paket24",
    carrier: "HP",
    price: round2(optional.amount),
    possible: true,
    details,
    serviceType,
    status: groups.length > 1 || input.cod || Object.values(input.additionalServices).some(Boolean) ? "surcharge" : "ok",
    warning: [
      groups.length > 1 ? `Potrebno je otvoriti ${groups.length} odvojene skupne pošiljke.` : "",
      isAnyIsland(input.postalCode)
        ? "Rok uručenja za otoke je D+3."
        : "Rok je D+1 za naselja s HP popisa I zone, a za ostala naselja D+2; ugovorni dodatak za ta naselja je uključen u MBE cijenu.",
    ].filter(Boolean).join(" "),
  };
};

const getHpPalletZone = (postalCode: string): 1 | 2 | 3 | 4 | 5 | 6 | null => {
  if (isAnyIsland(postalCode)) return 6;
  if (["10000", "10010", "10020", "10040", "10090"].includes(postalCode)) return 1;
  const value = Number(postalCode);
  if (!Number.isFinite(value)) return null;
  if ((value >= 10000 && value <= 10999) || (value >= 40000 && value <= 49999)) return 2;
  if ((value >= 31000 && value <= 35999) || (value >= 51000 && value <= 53999)) return 3;
  if (value >= 21000 && value <= 23999) return 4;
  if (value >= 20000 && value <= 20999) return 5;
  return null;
};

export const calcHPPallet = (input: PricingInput): PriceResult => {
  const id = "hp-paleta";
  const serviceType: ServiceType = "MBE Economy";
  const outsidePaket24 = input.packages.some((item) => {
    const size = dimensions(item);
    return item.weight > 30 || size.longest > 60 || size.sum > 180;
  });
  if (input.packages.length < 2 && !outsidePaket24) {
    return unavailable(id, "HP Paleta", "HP", serviceType, "Paletna opcija prikazuje se za višekolične pošiljke ili pošiljke izvan Paket24 mase/dimenzija.");
  }
  if (input.cod || Object.values(input.additionalServices).some(Boolean)) {
    return unavailable(id, "HP Paleta", "HP", serviceType, "Dodatne usluge za paletiziranu pošiljku nisu uključene u ovaj automatski izračun.", "manual");
  }
  if (!input.packages.every((item) => fitsDimensions(item, [120, 80, HP_PALLET_HEIGHT]))) {
    return unavailable(id, "HP Paleta", "HP", serviceType, "Najmanje jedan komad nije moguće smjestiti unutar maksimalnih dimenzija paletizirane pošiljke 120 × 80 × 180 cm.");
  }
  const estimatedWeight = totalWeight(input.packages) + 25;
  if (totalVolume(input.packages) > 120 * 80 * HP_PALLET_HEIGHT) {
    return unavailable(id, "HP Paleta", "HP", serviceType, "Ukupni volumen prelazi jednu EURO paletu 120 × 80 × 180 cm; potrebna je ručna potvrda / raspodjela na više paleta.", "manual");
  }

  const normalizedDestination = normalizePlace(input.destinationPlace);
  const supportedCity = HP_PALLET_SUPPORTED_CITY_POSTALS.has(input.postalCode)
    || (normalizedDestination ? HP_PALLET_SUPPORTED_CITIES.has(normalizedDestination) : false);
  if (!supportedCity) {
    return unavailable(id, "HP Paleta", "HP", serviceType, "Odredište nije na popisu gradova s automatski ugovorenom paletnom dostavom; za ostala odredišta HP navodi prethodni dogovor.", "manual");
  }

  const zone = getHpPalletZone(input.postalCode);
  const rates: Record<1 | 2 | 3 | 4 | 5 | 6, number> = { 1: 30.56, 2: 49.04, 3: 55.04, 4: 70, 5: 90, 6: 90 };
  if (!zone) return unavailable(id, "HP Paleta", "HP", serviceType, "HP paletna zona nije određena za uneseni poštanski broj.", "manual");

  const over500Steps = estimatedWeight > 500 ? Math.ceil((estimatedWeight - 500) / 100) : 0;
  const over500Fee = over500Steps * HP_PALLET_OVER_500_STEP;
  const price = rates[zone] + over500Fee;
  const details = [
    `HP paletna zona ${zone}: ${rates[zone].toFixed(2)} €`,
    `procijenjena masa s EURO paletom: ${estimatedWeight.toFixed(2)} kg`,
    "EURO paleta 120 × 80 × 180 cm; rok uručenja D+5",
    `preuzimanje, 3 korporativna SMS-a, e-mail i osigurana vrijednost do ${HP_PALLET_INCLUDED_INSURED_VALUE.toFixed(2)} € uključeni`,
  ];
  if (over500Fee) details.push(`iznad 500 kg: ${over500Steps} × ${HP_PALLET_OVER_500_STEP.toFixed(2)} € = ${over500Fee.toFixed(2)} €`);

  return {
    id,
    name: "HP Paleta (procjena)",
    carrier: "HP",
    price: round2(price),
    possible: true,
    details,
    serviceType,
    status: "surcharge",
    warning: over500Fee
      ? "Ponuda istodobno navodi maksimalnu masu 500 kg i doplatu iznad 500 kg; izračun prikazuje ugovornu doplatu, ali takvu pošiljku prije slanja treba potvrditi s HP-om."
      : "Za odredišta izvan navedenog popisa gradova potreban je prethodni dogovor s HP-om.",
  };
};

export const calcHPLocker = (input: PricingInput): PriceResult => {
  const id = "hp-paketomat";
  const serviceType: ServiceType = "MBE Paketomati";
  if (input.pricingDate > HP_DOMESTIC_CONTRACT_VALID_UNTIL) {
    return unavailable(id, "HP Paketomat", "HP", serviceType, "MBE ugovorena HP paketomat cijena u kalkulatoru vrijedi do 31.10.2026.; od 1.11.2026. potreban je novi cjenik.", "manual");
  }
  if (Object.values(input.additionalServices).some(Boolean)) {
    return unavailable(id, "HP Paketomat", "HP", serviceType, "Dodatne usluge iz forme nisu dio ugovorene paketomat tarife.", "manual");
  }
  for (const item of input.packages) {
    if (!HP_LOCKER_COMPARTMENTS.some((limits) => fitsDimensions(item, limits))) {
      return unavailable(id, "HP Paketomat", "HP", serviceType, "Paket ne stane u najveći HP paketomat pretinac 39 × 38 × 64 cm.");
    }
  }
  const base = HP_LOCKER_PRICE * input.packages.length;
  return {
    id,
    name: "HP Paketomat",
    carrier: "HP",
    price: round2(base),
    possible: true,
    details: [
      `${input.packages.length} × ${HP_LOCKER_PRICE.toFixed(2)} € = ${base.toFixed(2)} €`,
      "sve veličine pretinca po istoj ugovorenoj cijeni",
      "plaćanje pouzećem uključeno u cijenu",
      `osigurana vrijednost do ${HP_INCLUDED_INSURED_VALUE.toFixed(2)} € uključena`,
      "pretinci: XS 9×16×64, S 9×38×64, M 19×38×64, L 39×38×64 cm",
    ],
    serviceType,
    status: input.cod ? "surcharge" : "ok",
  };
};

export const calcOverseasSingle = (input: PricingInput): PriceResult => {
  const id = "overseas-single";
  const serviceType: ServiceType = "MBE Economy";
  if (input.packages.length !== 1) return unavailable(id, "Overseas single", "Overseas", serviceType, "Single vrijedi samo za jedan paket.");
  const item = input.packages[0];
  const size = dimensions(item);
  if (item.weight > 31.5 || size.longest > 100 || size.girth > 340) {
    return unavailable(id, "Overseas single", "Overseas", serviceType, `Izvan Overseas standarda (31,5 kg, duljina 100 cm ili opseg 340 cm); ako Overseas prihvati paket, ugovoreni OVSZ je ${OVERSEAS_OVSZ_FEE.toFixed(2)} €. Potrebna je potvrda.`, "manual");
  }
  const base = tierPrice(OVERSEAS_SINGLE, item.weight);
  if (base === null) return unavailable(id, "Overseas single", "Overseas", serviceType, "Nema tarife za unesenu težinu.");
  const volumeDiscount = base * OVERSEAS_VOLUME_DISCOUNT;
  const discountedBase = base - volumeDiscount;
  const fuel = discountedBase * FUEL_CONFIG.overseas.rate;
  const remote = isOverseasRemote(input.postalCode) ? discountedBase * 0.2 : 0;
  const codFee = input.cod ? 0.3 : 0;
  const details = [
    `osnovna tarifa ${base.toFixed(2)} €`,
    `volumni popust 6% od 01.10.2026. = -${volumeDiscount.toFixed(2)} €`,
    `tarifa nakon popusta ${discountedBase.toFixed(2)} €`,
    `gorivo ${(FUEL_CONFIG.overseas.rate * 100).toFixed(0)}% = ${fuel.toFixed(2)} €`,
  ];
  if (remote) details.push(`otok / posebni režim 20% = ${remote.toFixed(2)} €`);
  if (input.cod) details.push("COD +0,30 €");
  const optional = addOptionalServices(discountedBase + fuel + remote + codFee, input, {
    documentReturn: 0.53,
    addresseeOnly: 0,
  }, details);
  if (optional.unsupported) return unavailable(id, "Overseas single", "Overseas", serviceType, `Overseas: ${optional.unsupported} nema ugovorenu cijenu.`, "manual");
  return {
    id,
    name: "Overseas single",
    carrier: "Overseas",
    price: round2(optional.amount),
    possible: true,
    details,
    serviceType,
    status: remote || input.cod || Object.values(input.additionalServices).some(Boolean) ? "surcharge" : "ok",
  };
};

export const calcOverseasMulti = (input: PricingInput): PriceResult => {
  const id = "overseas-multi";
  const serviceType: ServiceType = "MBE Economy";
  if (input.packages.length < 2) return unavailable(id, "Overseas multi", "Overseas", serviceType, "Multi vrijedi za najmanje dva paketa.");
  const cargo = resolveOverseasCargo(input.postalCode, input.destinationPlace);
  if (cargo === 0) return unavailable(id, "Overseas multi", "Overseas", serviceType, "Cargo/Multi dostava nije dostupna za odabrano odredište.");
  if (cargo === 2 || cargo === undefined) return unavailable(id, "Overseas multi", "Overseas", serviceType, "Za Overseas Multi treba odabrati točno mjesto ili ručno potvrditi Cargo dostupnost.", "manual");
  for (const item of input.packages) {
    const size = dimensions(item);
    if (item.weight > 31.5 || size.longest > 100 || size.girth > 340) {
      return unavailable(id, "Overseas multi", "Overseas", serviceType, `Najmanje jedan paket je izvan Overseas standarda; ako Overseas prihvati paket, ugovoreni OVSZ je ${OVERSEAS_OVSZ_FEE.toFixed(2)} € po takvom paketu. Potrebna je ručna potvrda.`, "manual");
    }
  }
  const weight = totalWeight(input.packages);
  if (weight > 500) return unavailable(id, "Overseas multi", "Overseas", serviceType, "Ulazna Multi matrica potvrđena je do 500 kg ukupno.", "manual");
  const base = weight <= 100 ? tierPrice(OVERSEAS_MULTI, weight) : 14.56 + Math.ceil(weight - 100) * 0.25;
  if (base === null) return unavailable(id, "Overseas multi", "Overseas", serviceType, "Nema tarife za unesenu težinu.");
  const volumeDiscount = base * OVERSEAS_VOLUME_DISCOUNT;
  const discountedBase = base - volumeDiscount;
  const fuel = discountedBase * FUEL_CONFIG.overseas.rate;
  const remote = isOverseasRemote(input.postalCode) ? discountedBase * 0.2 : 0;
  const codFee = input.cod ? 0.3 : 0;
  const details = [
    `osnovna Multi tarifa ${base.toFixed(2)} €`,
    `volumni popust 6% od 01.10.2026. = -${volumeDiscount.toFixed(2)} €`,
    `tarifa nakon popusta ${discountedBase.toFixed(2)} €`,
    `gorivo ${(FUEL_CONFIG.overseas.rate * 100).toFixed(0)}% = ${fuel.toFixed(2)} €`,
  ];
  if (remote) details.push(`otok / posebni režim 20% = ${remote.toFixed(2)} €`);
  if (input.cod) details.push("COD +0,30 €");
  const optional = addOptionalServices(discountedBase + fuel + remote + codFee, input, {
    documentReturn: 0.53,
    addresseeOnly: 0,
  }, details);
  if (optional.unsupported) return unavailable(id, "Overseas multi", "Overseas", serviceType, `Overseas: ${optional.unsupported} nema ugovorenu cijenu.`, "manual");
  return {
    id,
    name: "Overseas multi",
    carrier: "Overseas",
    price: round2(optional.amount),
    possible: true,
    details,
    serviceType,
    status: remote || input.cod || Object.values(input.additionalServices).some(Boolean) ? "surcharge" : "ok",
  };
};

export const calcInTime = (input: PricingInput): PriceResult => {
  const id = "intime";
  const serviceType: ServiceType = "MBE Economy";
  const zone = resolveInTimeZone(input.postalCode, input.destinationPlace);
  if (!zone) return unavailable(id, "InTime", "InTime", serviceType, "InTime zona nije jednoznačna; odaberi točno mjesto ili provjeri odredište.", "manual");

  if (input.inTimeOptions.returnToSender) {
    return unavailable(id, "InTime", "InTime", serviceType, "Povrat pošiljatelju se prema ugovoru obračunava prema cjeniku; konačan iznos treba ručno potvrditi.", "manual");
  }
  if (input.inTimeOptions.declaredValue > INTIME_DECLARED_VALUE_MAX) {
    return unavailable(id, "InTime", "InTime", serviceType, "InTime naknada za iskazanu vrijednost ugovorena je najviše do 2.000,00 €.", "manual");
  }

  const actual = totalWeight(input.packages);
  const volumetric = volumeWeightInTime(input.packages);
  const chargeable = Math.max(actual, volumetric);
  const tariffWeight = Math.min(chargeable, 3000);
  const base = tierPrice(INTIME[zone], tariffWeight);
  if (base === null) return unavailable(id, "InTime", "InTime", serviceType, "Nema tarife za obračunsku masu.");

  const extraHundreds = chargeable > 3000 ? Math.ceil((chargeable - 3000) / 100) : 0;
  const weightSurcharge = extraHundreds * base * 0.10;
  const fuel = base * FUEL_CONFIG.intime.rate;
  const seasonal = inTimeSeasonalSurchargeActive(input.pricingDate) ? base * INTIME_SEASONAL_SURCHARGE : 0;
  const nonStandardFee = input.inTimeOptions.nonStandard ? base : 0;
  const declaredValueFee = input.inTimeOptions.declaredValue > INTIME_DECLARED_VALUE_THRESHOLD
    ? input.inTimeOptions.declaredValue * INTIME_DECLARED_VALUE_RATE
    : 0;
  const codFee = input.cod
    ? input.codPaymentMethod === "card"
      ? Math.max(2.20, input.codAmount * 0.022)
      : Math.max(1, input.codAmount * 0.01)
    : 0;
  const smsFee = input.inTimeOptions.smsNotification ? INTIME_SMS_FEE : 0;
  const pickupAttemptFee = input.inTimeOptions.pickupAttempt ? INTIME_PICKUP_ATTEMPT_FEE : 0;
  const otherProviderFee = input.inTimeOptions.otherProvider ? INTIME_OTHER_PROVIDER_FEE : 0;
  const dataCorrectionFee = input.inTimeOptions.dataCorrection ? INTIME_DATA_CORRECTION_FEE : 0;
  const proofOfDeliveryFee = input.inTimeOptions.proofOfDelivery ? INTIME_PROOF_OF_DELIVERY_FEE : 0;

  const details = [
    `InTime zona ${zone}; obračunska masa ${chargeable.toFixed(2)} kg`,
    `stvarna ${actual.toFixed(2)} kg / volumenska ${volumetric.toFixed(2)} kg (D × Š × V × 200 kg/m³)`,
    `osnovna tarifa ${base.toFixed(2)} €`,
    `gorivo ${(FUEL_CONFIG.intime.rate * 100).toFixed(0)}% = ${fuel.toFixed(2)} €`,
  ];
  if (weightSurcharge) details.push(`iznad 3.000 kg: ${extraHundreds} × 10% osnovne cijene = ${weightSurcharge.toFixed(2)} €`);
  if (seasonal) details.push(`sezonski dodatak 15% (1.11.–31.12.) = ${seasonal.toFixed(2)} €`);
  if (input.inTimeOptions.nonStandard) details.push(`nestandardna pošiljka / volumetrija nije primjenjiva: +100% osnovne cijene = ${nonStandardFee.toFixed(2)} €`);
  if (declaredValueFee) details.push(`iskazana vrijednost ${input.inTimeOptions.declaredValue.toFixed(2)} € × 0,60% = ${declaredValueFee.toFixed(2)} €`);
  if (input.cod) details.push(
    input.codPaymentMethod === "card"
      ? `COD kartica 2,20%, min 2,20 € = ${codFee.toFixed(2)} €`
      : `COD gotovina 1%, min 1,00 € = ${codFee.toFixed(2)} €`
  );
  if (smsFee) details.push(`SMS status +${smsFee.toFixed(2)} €`);
  if (pickupAttemptFee) details.push(`pokušaj preuzimanja +${pickupAttemptFee.toFixed(2)} €`);
  if (otherProviderFee) details.push(`isporuka putem drugog pružatelja +${otherProviderFee.toFixed(2)} €`);
  if (dataCorrectionFee) details.push(`naknadni ispravak podataka +${dataCorrectionFee.toFixed(2)} €`);
  if (proofOfDeliveryFee) details.push(`potvrda o isporuci +${proofOfDeliveryFee.toFixed(2)} €`);

  const beforeCommonAddOns = base + weightSurcharge + fuel + seasonal + nonStandardFee + declaredValueFee
    + codFee + smsFee + pickupAttemptFee + otherProviderFee + dataCorrectionFee + proofOfDeliveryFee;
  const optional = addOptionalServices(beforeCommonAddOns, input, {
    documentReturn: 10,
    addresseeOnly: 2.55,
  }, details);
  if (optional.unsupported) return unavailable(id, "InTime", "InTime", serviceType, `InTime: ${optional.unsupported} nema izravno primjenjivu ugovorenu cijenu.`, "manual");

  const anyContractExtra = weightSurcharge > 0
    || seasonal > 0
    || input.inTimeOptions.nonStandard
    || declaredValueFee > 0
    || input.cod
    || smsFee > 0
    || pickupAttemptFee > 0
    || otherProviderFee > 0
    || dataCorrectionFee > 0
    || proofOfDeliveryFee > 0
    || Object.values(input.additionalServices).some(Boolean);

  const warnings: string[] = [];
  if (input.inTimeOptions.nonStandard) warnings.push("Ugovorna naknada +100% primjenjuje se kada obračun volumenske težine nije primjenjiv.");
  if (input.inTimeOptions.declaredValue > 0 && input.inTimeOptions.declaredValue <= INTIME_DECLARED_VALUE_THRESHOLD) warnings.push("Naknada za iskazanu vrijednost počinje iznad 130,00 €.");
  if (proofOfDeliveryFee) warnings.push("Potvrda o isporuci dostavlja se isključivo elektronički putem e-pošte.");

  return {
    id,
    name: "InTime",
    carrier: "InTime",
    price: round2(optional.amount),
    possible: true,
    details,
    serviceType,
    status: anyContractExtra ? "surcharge" : "ok",
    warning: warnings.length ? warnings.join(" ") : undefined,
  };
};

const getLagermaxZone = (postalCode: string): Zone | null => {
  const value = Number(postalCode);
  if (!Number.isFinite(value)) return null;
  if ((value >= 10000 && value <= 10999) || (value >= 49000 && value <= 49290) || (value >= 40000 && value <= 48999) || (value >= 51000 && value <= 51999)) return 1;
  if ((value >= 53000 && value <= 53999) || (value >= 31000 && value <= 35999) || (value >= 52000 && value <= 52999) || (value >= 23000 && value <= 23999) || (value >= 21000 && value <= 22999)) return 2;
  if (value >= 20000 && value <= 20999) return 3;
  return null;
};

const lagermaxBase = (zone: Zone, weight: number) => {
  const rates: Record<Zone, Tier[]> = {
    1: [{ max: 5, price: 10 }, { max: 20, price: 20 }, { max: 50, price: 24 }, { max: 80, price: 28 }],
    2: [{ max: 5, price: 13 }, { max: 20, price: 22 }, { max: 50, price: 29 }, { max: 80, price: 35 }],
    3: [{ max: 5, price: 16 }, { max: 20, price: 30 }, { max: 50, price: 40 }, { max: 80, price: 60 }],
  };
  return tierPrice(rates[zone], weight);
};

export const calcLagermax = (input: PricingInput): PriceResult => {
  const id = "lagermax";
  const serviceType: ServiceType = "MBE Economy";
  if (input.cod || Object.values(input.additionalServices).some(Boolean)) {
    return unavailable(id, "Lagermax", "Lagermax", serviceType, "COD i odabrane dodatne usluge nisu navedeni u Lagermax ponudi.");
  }
  if (!input.originPostalCode || input.originPostalCode.length !== 5) {
    return unavailable(id, "Lagermax", "Lagermax", serviceType, "Za Lagermax je potreban poštanski broj polazišta radi izračuna zone.", "manual");
  }
  const originZone = getLagermaxZone(input.originPostalCode);
  const destinationZone = getLagermaxZone(input.postalCode);
  if (!originZone || !destinationZone) return unavailable(id, "Lagermax", "Lagermax", serviceType, "Polazište ili odredište nije pokriveno dostavljenom Lagermax zonskom tablicom.", "manual");
  const zone = Math.max(originZone, destinationZone) as Zone;
  if (LAGERMAX_DUGI_OTOK_POSTALS.has(input.postalCode)) {
    return unavailable(id, "Lagermax", "Lagermax", serviceType, "Dugi otok: Lagermax prema dostavljenom rasporedu ne vozi.");
  }
  const anyIsland = isAnyIsland(input.postalCode);
  if (anyIsland && !LAGERMAX_DELIVERABLE_ISLANDS.has(input.postalCode)) {
    return unavailable(id, "Lagermax", "Lagermax", serviceType, "Otok nije naveden u dostavljenom Lagermax rasporedu; potrebna je ručna potvrda.", "manual");
  }
  for (const item of input.packages) {
    if (item.weight > 35 || dimensions(item).longest > 250) {
      return unavailable(id, "Lagermax", "Lagermax", serviceType, "Lagermax: najviše 35 kg i 250 cm duljine po paketu.");
    }
  }
  const groups = optimizeOrderedGroups(input.packages, 80, input.packages.length, (weight) => lagermaxBase(zone, weight));
  if (!groups) return unavailable(id, "Lagermax", "Lagermax", serviceType, "Pošiljku nije moguće rasporediti u pošiljke do 80 kg.");
  const base = groups.reduce((sum, group) => sum + group.base, 0);
  const fuel = base * FUEL_CONFIG.lagermax.rate;
  const island = anyIsland ? base * LAGERMAX_ISLAND_SURCHARGE : 0;
  const schedule = lagermaxIslandSchedule(input.postalCode);
  const details = [`relacija Z${originZone} → Z${destinationZone}; primijenjena skuplja Z${zone}`];
  details.push(...groups.map((group, index) => `pošiljka ${index + 1}: ${group.count} pak. / ${group.weight.toFixed(2)} kg = ${group.base.toFixed(2)} €`));
  details.push(`gorivo ${(FUEL_CONFIG.lagermax.rate * 100).toFixed(1).replace(".", ",")}% = ${fuel.toFixed(2)} €`);
  if (island) details.push(`otok 50% osnovne tarife = ${island.toFixed(2)} €`);
  if (schedule) details.push(`${schedule.label}: dostava ${schedule.schedule}`);
  return {
    id,
    name: "Lagermax",
    carrier: "Lagermax",
    price: round2(base + fuel + island),
    possible: true,
    details,
    serviceType,
    status: "surcharge",
    warning: schedule ? schedule.note : undefined,
  };
};

const BOX_NOW_BASE_PRICE = 1.40;
const BOX_NOW_CARD_COD_RATE = 0.01;
const BOX_NOW_L_NETWORK_SURCHARGE = 1.20;
const BOX_NOW_L_THRESHOLD = 0.05;
const BOX_NOW_LIABILITY_LIMIT = 200;

export const calcBoxNow = (input: PricingInput): PriceResult => {
  const id = "box-now";
  const serviceType: ServiceType = "MBE Paketomati";
  if (Object.values(input.additionalServices).some(Boolean)) {
    return unavailable(id, "BOX NOW", "BOX NOW", serviceType, "Povrat dokumenta, osobno uručenje i posebno rukovanje nisu dio BOX NOW paketomat usluge.");
  }

  let largeCount = 0;
  for (const item of input.packages) {
    if (item.weight <= 2 && fitsDimensions(item, [8, 45, 60])) continue;
    if (item.weight <= 5 && fitsDimensions(item, [17, 45, 60])) continue;
    if (item.weight <= 20 && fitsDimensions(item, [36, 45, 60])) {
      largeCount += 1;
      continue;
    }
    return unavailable(id, "BOX NOW", "BOX NOW", serviceType, "Najmanje jedan paket ne stane u pretinac L (20 kg; 36 × 45 × 60 cm).");
  }

  const base = BOX_NOW_BASE_PRICE * input.packages.length;
  const codFee = input.cod ? input.codAmount * BOX_NOW_CARD_COD_RATE : 0;
  const contingency = largeCount * BOX_NOW_L_NETWORK_SURCHARGE;
  const details = [
    `${input.packages.length} × ${BOX_NOW_BASE_PRICE.toFixed(2)} € = ${base.toFixed(2)} €`,
    "gorivo: nema dodatka",
    `ugovorna odgovornost/naknada za gubitak ili oštećenje do ${BOX_NOW_LIABILITY_LIMIT.toFixed(2)} € po paketu`,
  ];
  if (input.cod) details.push(`online COD karticom 1% = ${codFee.toFixed(2)} €`);
  if (largeCount) details.push(`${largeCount} L paket(a); moguća mrežna nadoplata do ${contingency.toFixed(2)} €`);

  const warnings: string[] = [];
  if (input.cod) warnings.push("BOX NOW COD se plaća karticom/online; odabir gotovine u formi ne mijenja BOX NOW obračun.");
  if (largeCount) warnings.push(
    `Prikazana je osnovna cijena. Ako mrežni udio L paketa prijeđe ${(BOX_NOW_L_THRESHOLD * 100).toFixed(0)}% kroz ugovoreno promatrano razdoblje, cijena se može povećati za ${BOX_NOW_L_NETWORK_SURCHARGE.toFixed(2)} € po L paketu.`
  );
  if (Math.max(input.codAmount, input.goodsValue) > BOX_NOW_LIABILITY_LIMIT) {
    warnings.push(`Vrijednost/COD može biti viši od ${BOX_NOW_LIABILITY_LIMIT.toFixed(2)} €, ali ugovorni limit naknade štete/gubitka ostaje ${BOX_NOW_LIABILITY_LIMIT.toFixed(2)} € po paketu.`);
  }

  return {
    id,
    name: "BOX NOW",
    carrier: "BOX NOW",
    price: round2(base + codFee),
    possible: true,
    details,
    serviceType,
    status: input.cod || largeCount ? "surcharge" : "ok",
    warning: warnings.length ? warnings.join(" ") : undefined,
  };
};

const EXPORT_TARIFF_MAP = EXPORT_TARIFFS as Record<string, ExportCountryTariff>;
const GLS_EXPORT_SMS = 1.13;
const GLS_EXPORT_COD_COUNTRIES = new Set(["Slovakia", "Romania", "Slovenia", "Hungary", "Czech Republic"]);
const DPD_EXPORT_COD_RATES: Record<string, number> = {
  Slovenia: 0.5,
  Hungary: 0.9,
  "Czech Republic": 0.9,
  Slovakia: 0.9,
  Poland: 0.9,
  Bulgaria: 0.9,
  Romania: 0.9,
};

export const exportCodCarriers = (destinationCountry: string) => [
  ...(GLS_EXPORT_COD_COUNTRIES.has(destinationCountry) ? ["GLS"] : []),
  ...(DPD_EXPORT_COD_RATES[destinationCountry] !== undefined ? ["DPD"] : []),
];

const exportBase = (table: readonly ExportTier[], packages: NumericPackageItem[], allowLastTierTo = 0) => {
  let amount = 0;
  for (const item of packages) {
    let itemPrice = tierPrice(table, item.weight);
    if (itemPrice === null && allowLastTierTo && item.weight <= allowLastTierTo) {
      itemPrice = table.at(-1)?.price ?? null;
    }
    if (itemPrice === null) return null;
    amount += itemPrice;
  }
  return amount;
};

const exportAddOnSelected = (input: PricingInput) => Object.values(input.additionalServices).some(Boolean);

export const calcGLSExport = (input: PricingInput, tariff: ExportCountryTariff): PriceResult => {
  const id = "gls-export";
  const serviceType: ServiceType = "MBE Economy";
  if (!tariff.gls.length) return unavailable(id, "GLS Export", "GLS", serviceType, `GLS nema ulaznu tarifu za ${tariff.label}.`);
  if (exportAddOnSelected(input)) {
    return unavailable(id, "GLS Export", "GLS", serviceType, "Odabrane dodatne usluge nemaju ugovorenu izvoznu GLS cijenu.", "manual");
  }
  for (const item of input.packages) {
    const size = dimensions(item);
    if (item.weight > 40 || size.longest > 200 || size.girth > 300) {
      return unavailable(id, "GLS Export", "GLS", serviceType, "GLS izvoz: najviše 40 kg, duljina 200 cm i opseg 300 cm po paketu.", "manual");
    }
  }
  if (input.cod && !GLS_EXPORT_COD_COUNTRIES.has(input.destinationCountry)) {
    return unavailable(id, "GLS Export", "GLS", serviceType, `GLS COD nije ugovoren za ${tariff.label}.`);
  }
  const base = exportBase(tariff.gls, input.packages);
  if (base === null) return unavailable(id, "GLS Export", "GLS", serviceType, "Nema GLS izvozne tarife za unesenu težinu.");
  const fuel = base * FUEL_CONFIG.gls.exportRate;
  const sms = GLS_EXPORT_SMS * input.packages.length;
  const codFee = input.cod ? 0.65 * input.packages.length : 0;
  const customs = tariff.region === "WW" ? 33.18 : 0;
  const details = [
    `osnovna tarifa ${base.toFixed(2)} €`,
    `gorivo ${(FUEL_CONFIG.gls.exportRate * 100).toFixed(1).replace(".", ",")}% = ${fuel.toFixed(2)} €`,
    `FlexDelivery e-mail + SMS ${input.packages.length} × 1,13 € = ${sms.toFixed(2)} €`,
  ];
  if (codFee) details.push(`COD ${input.packages.length} × 0,65 € = ${codFee.toFixed(2)} €`);
  if (customs) details.push(`izvozno carinjenje DAP +${customs.toFixed(2)} €`);
  return {
    id,
    name: "GLS Export",
    carrier: "GLS",
    price: round2(base + fuel + sms + codFee + customs),
    possible: true,
    details,
    serviceType,
    status: "surcharge",
  };
};

const dpdExportCustoms = (input: PricingInput) => {
  if (input.destinationCountry === "Great Britain") return 14.6 + Math.max(0, input.packages.length - 1) * 5.31;
  if (input.destinationCountry === "Ukraine") return input.goodsValue <= 1000 ? 15.93 : 30.53;
  if (["Bosnia and Herzegovina", "Serbia", "Switzerland", "Norway", "Liechtenstein"].includes(input.destinationCountry)) {
    return input.goodsValue <= 1000 ? 0 : 40;
  }
  return 0;
};

export const calcDPDExport = (input: PricingInput, tariff: ExportCountryTariff): PriceResult => {
  const id = "dpd-export";
  const serviceType: ServiceType = "MBE Economy";
  if (!tariff.dpd.length) return unavailable(id, "DPD Export", "DPD", serviceType, `DPD nema ulaznu tarifu za ${tariff.label}.`);
  for (const item of input.packages) {
    const size = dimensions(item);
    if (item.weight > 31.5 || size.longest > 175 || size.girth > 300) {
      const extras = [];
      if (size.longest > 175 || size.girth > 300) extras.push("oversize prema ponudi +35,00 € u međunarodnom prometu");
      if (item.weight > 31.5) extras.push("overweight prema ponudi +35,00 € u međunarodnom prometu");
      return unavailable(id, "DPD Export", "DPD", serviceType, `DPD izvoz je izvan standarda; potreban prethodni dogovor. ${extras.join("; ")}.`, "manual");
    }
  }
  const codRate = DPD_EXPORT_COD_RATES[input.destinationCountry];
  if (input.cod && codRate === undefined) {
    return unavailable(id, "DPD Export", "DPD", serviceType, `DPD COD nije ugovoren za ${tariff.label}.`);
  }
  const base = exportBase(tariff.dpd, input.packages, 31.5);
  if (base === null) return unavailable(id, "DPD Export", "DPD", serviceType, "Nema DPD izvozne tarife za unesenu težinu.");
  const fuel = DPD_ROAD_FUEL_PER_PACKAGE * input.packages.length;
  const codFee = input.cod ? (codRate ?? 0) * input.packages.length : 0;
  const customs = tariff.region === "WW" ? dpdExportCustoms(input) : 0;
  const details = [
    `osnovna tarifa ${base.toFixed(2)} €`,
    `gorivo ${FUEL_CONFIG.dpd.referenceMonth} (${FUEL_CONFIG.dpd.dieselReference.toFixed(2)} €/l): ${input.packages.length} × ${DPD_ROAD_FUEL_PER_PACKAGE.toFixed(2)} € = ${fuel.toFixed(2)} €`,
  ];
  if (codFee) details.push(`COD ${input.packages.length} × ${codRate.toFixed(2)} € = ${codFee.toFixed(2)} €`);
  if (customs) details.push(`izvozno carinjenje +${customs.toFixed(2)} €`);
  const optional = addOptionalServices(base + fuel + codFee + customs, input, {
    documentReturn: 1.83 * input.packages.length,
    addresseeOnly: 1.83 * input.packages.length,
    specialHandling: 8 * input.packages.length,
  }, details);
  if (optional.unsupported) return unavailable(id, "DPD Export", "DPD", serviceType, `DPD: ${optional.unsupported} nije ugovoreno.`);
  return {
    id,
    name: "DPD Export",
    carrier: "DPD",
    price: round2(optional.amount),
    possible: true,
    details,
    serviceType,
    status: fuel || codFee || customs || exportAddOnSelected(input) ? "surcharge" : "ok",
  };
};

const hpEmsValueSurcharge = (value: number) => {
  if (value <= 165) return 0;
  if (value <= 390) return 6.00;
  if (value <= 660) return 10.40;
  if (value <= 920) return 14.00;
  if (value <= 1330) return 20.00;
  return null;
};

export const calcHPExport = (input: PricingInput, tariff: ExportCountryTariff): PriceResult => {
  const id = "hp-ems";
  const serviceType: ServiceType = "MBE Economy";
  if (!tariff.hp.length) return unavailable(id, "HP EMS", "HP", serviceType, `HP EMS nema ulaznu tarifu za ${tariff.label}.`);
  if (input.cod) return unavailable(id, "HP EMS", "HP", serviceType, "Pouzeće nije navedeno kao dopunska usluga uz Paket24 International (EMS).");
  if (input.additionalServices.addresseeOnly || input.additionalServices.specialHandling) {
    return unavailable(id, "HP EMS", "HP", serviceType, "Osobno uručenje / osjetljiv sadržaj nisu navedeni kao dopunske usluge uz EMS; potrebna je ručna provjera.", "manual");
  }

  for (const item of input.packages) {
    const size = dimensions(item);
    const sorted = [item.length, item.width, item.height].sort((a, b) => b - a);
    if (sorted[0] < 25 || sorted[1] < 17.6) {
      return unavailable(id, "HP EMS", "HP", serviceType, "HP EMS: najmanje dimenzije pošiljke su 17,6 × 25,0 cm.");
    }
    if (item.weight > 30 || size.longest > 150 || size.girth > 300) {
      return unavailable(id, "HP EMS", "HP", serviceType, "Automatski EMS cjenik je dostavljen do 30 kg; najveća stranica je 150 cm, a duljina + opseg 300 cm. Za odstupanja je potrebna ručna provjera.", "manual");
    }
  }

  const valueSurcharge = hpEmsValueSurcharge(input.goodsValue);
  if (valueSurcharge === null) {
    return unavailable(id, "HP EMS", "HP", serviceType, "Označena vrijednost Paket24 International (EMS) može biti najviše 1.330,00 €.", "manual");
  }

  const base = exportBase(tariff.hp, input.packages);
  if (base === null) return unavailable(id, "HP EMS", "HP", serviceType, "Nema HP EMS tarife za unesenu težinu.");

  const details = [
    `osnovna EMS tarifa ${base.toFixed(2)} €`,
    "nema dodatka za gorivo",
    "osigurana vrijednost do 165,00 € uključena u osnovnu cijenu",
  ];
  if (valueSurcharge) details.push(`dodatak na označenu vrijednost ${input.goodsValue.toFixed(2)} € = ${valueSurcharge.toFixed(2)} €`);
  if (!input.goodsValue) details.push("ako je vrijednost robe iznad 165,00 €, upiši je radi dodatka na označenu vrijednost");
  details.push("ručna obrada EMS-a, ako je potrebna, iznosi 1,60 € i nije automatski uključena");

  const optional = addOptionalServices(base + valueSurcharge, input, {
    documentReturn: 1.70 * input.packages.length,
  }, details);
  if (optional.unsupported) return unavailable(id, "HP EMS", "HP", serviceType, `HP EMS: ${optional.unsupported} nije ugovoreno / navedeno za EMS.`, "manual");

  return {
    id,
    name: "HP EMS",
    carrier: "HP",
    price: round2(optional.amount),
    possible: true,
    details,
    serviceType,
    status: valueSurcharge || exportAddOnSelected(input) ? "surcharge" : "ok",
    warning: "Paket24 International (EMS): cijene su bez PDV-a; za odredišta izvan EU carina, PDV i ostala javna davanja u odredištu nisu uključeni.",
  };
};

type UpsPackageCharge = {
  billableWeight: number;
  dimensionalWeight: number;
  large: boolean;
  additionalHandling: boolean;
};

const roundUpHalfKg = (value: number) => Math.ceil((value - 1e-9) * 2) / 2;

const upsPackageCharges = (input: PricingInput): UpsPackageCharge[] | PriceResult => {
  const serviceType: ServiceType = "MBE Express";
  for (const item of input.packages) {
    const size = dimensions(item);
    if (item.weight > 70 || size.longest > 274 || size.girth > 400) {
      return unavailable(
        "ups-limits",
        "UPS",
        "UPS",
        serviceType,
        `UPS paket prelazi maksimalno ograničenje (70 kg, duljina 274 cm ili duljina + opseg 400 cm). UPS ga standardno ne prihvaća; ako ipak uđe u sustav, cjenik navodi doplatu ${UPS_OVER_MAXIMUM.toFixed(2)} € po paketu.`,
        "manual",
      );
    }
  }

  return input.packages.map((item) => {
    const size = dimensions(item);
    const dimensionalWeight = item.length * item.width * item.height / 5000;
    const large = size.girth > 300;
    const additionalHandling = !large && (item.weight > 25 || size.longest > 100 || size.middle > 76);
    const billableWeight = Math.max(
      roundUpHalfKg(Math.max(item.weight, dimensionalWeight)),
      large ? 40 : 0,
    );
    return { billableWeight, dimensionalWeight, large, additionalHandling };
  });
};

const upsTierPrice = (table: readonly UpsTier[], weight: number) => table.find((tier) => weight <= tier.max)?.price ?? null;

const upsOverWeightPrice = (rate: UpsOverWeightRate, weight: number) => Math.max(rate.minimum, Math.ceil(weight - 1e-9) * rate.perKg);

const upsUnavailableForSelections = (
  input: PricingInput,
  id: string,
  name: string,
  serviceType: ServiceType,
) => {
  if (input.cod) return unavailable(id, name, "UPS", serviceType, "UPS pouzeće nije navedeno u ugovorenom cjeniku.");
  if (exportAddOnSelected(input)) {
    return unavailable(id, name, "UPS", serviceType, "Odabrane dodatne usluge nemaju ugovorenu UPS cijenu; potrebna je ručna provjera.", "manual");
  }
  return null;
};

const upsWarnings = (country: UpsCountry, standard: boolean) => {
  const warnings: string[] = [];
  if (country.remotePossible) {
    warnings.push(`Za pojedine poštanske brojeve moguća je nadoplata: proširena lokacija ${UPS_REMOTE_RATE_PER_KG.toFixed(2)} €/kg, min. ${UPS_REMOTE_MINIMUM.toFixed(2)} €; udaljena lokacija ${UPS_TRUE_REMOTE_RATE_PER_KG.toFixed(2)} €/kg, min. ${UPS_TRUE_REMOTE_MINIMUM.toFixed(2)} €. Nije uključeno bez stranog poštanskog broja.`);
  }
  if (country.region === "WW") {
    warnings.push(standard
      ? "Uključeni su izvozno carinjenje i ugovoreno posredovanje za non-Express pošiljku; PDV, carina i davanja u odredištu nisu uključeni."
      : "Uključeno je izvozno carinjenje; PDV, carina, uvozne pristojbe i davanja u odredištu nisu uključeni.");
  }
  warnings.push("UPS Residential Delivery nije automatski uključen u izračun; vrsta primatelja se u kalkulatoru koristi samo za Lagermax/Schenker.");
  return warnings.join(" ") || undefined;
};

const upsChargeSummary = (charges: UpsPackageCharge[]) => ({
  billableWeight: charges.reduce((sum, charge) => sum + charge.billableWeight, 0),
  largeCount: charges.filter((charge) => charge.large).length,
  handlingCount: charges.filter((charge) => charge.additionalHandling).length,
});

export const calcUPSStandard = (input: PricingInput, country: UpsCountry): PriceResult => {
  const id = "ups-standard";
  const name = "UPS Standard";
  const serviceType: ServiceType = "MBE Economy";
  if (country.suspended) return unavailable(id, name, "UPS", serviceType, `UPS usluga za ${country.label} privremeno je suspendirana.`);
  if (country.standardZone === null) return unavailable(id, name, "UPS", serviceType, `UPS Standard nije dostupan za ${country.label}.`);
  const selectionIssue = upsUnavailableForSelections(input, id, name, serviceType);
  if (selectionIssue) return selectionIssue;

  const chargeResult = upsPackageCharges(input);
  if (!Array.isArray(chargeResult)) return { ...chargeResult, id, name, serviceType };
  const { billableWeight, largeCount, handlingCount } = upsChargeSummary(chargeResult);
  const zone = String(country.standardZone);
  let transport: number | null;
  let tariffLabel: string;
  if (input.packages.length === 1) {
    transport = upsTierPrice((UPS_STANDARD_SINGLE_RATES as Record<string, readonly UpsTier[]>)[zone], billableWeight);
    tariffLabel = "jedan paket";
  } else if (billableWeight <= 100) {
    transport = upsTierPrice((UPS_STANDARD_MULTI_RATES as Record<string, readonly UpsTier[]>)[zone], billableWeight);
    tariffLabel = "višepaketna pošiljka";
  } else {
    transport = upsOverWeightPrice((UPS_STANDARD_OVER_100 as Record<string, UpsOverWeightRate>)[zone], billableWeight);
    tariffLabel = "višepaketna pošiljka iznad 100 kg";
  }
  if (transport === null) return unavailable(id, name, "UPS", serviceType, "Nema UPS Standard tarife za izračunatu obračunsku masu.", "manual");

  const largeFee = largeCount * UPS_LARGE_PACKAGE;
  const handlingFee = handlingCount * UPS_ADDITIONAL_HANDLING;
  const fuelBasis = transport + largeFee + handlingFee;
  const fuel = fuelBasis * UPS_STANDARD_FUEL;
  const exportClearance = country.region === "WW" ? UPS_EXPORT_CLEARANCE : 0;
  const nonExpressCustoms = country.region === "WW" ? UPS_NON_EXPRESS_CUSTOMS_BROKERAGE : 0;
  const usProcessing = input.destinationCountry === "UPS:US" ? UPS_US_PROCESSING_FEE : 0;
  const details = [
    `zona ${country.standardZone}; ${tariffLabel}`,
    `UPS obračunska masa ${billableWeight.toFixed(1)} kg`,
    `osnovna tarifa ${transport.toFixed(2)} €`,
  ];
  if (largeFee) details.push(`veliki paket ${largeCount} × ${UPS_LARGE_PACKAGE.toFixed(2)} € = ${largeFee.toFixed(2)} €; minimalno 40 kg po takvom paketu`);
  if (handlingFee) details.push(`dodatna manipulacija ${handlingCount} × ${UPS_ADDITIONAL_HANDLING.toFixed(2)} € = ${handlingFee.toFixed(2)} €`);
  details.push(`gorivo ${(UPS_STANDARD_FUEL * 100).toFixed(2).replace(".", ",")}% (od ${UPS_FUEL_EFFECTIVE_FROM}) = ${fuel.toFixed(2)} €`);
  if (exportClearance) details.push(`izvozno carinjenje +${exportClearance.toFixed(2)} €`);
  if (nonExpressCustoms) details.push(`carinsko posredovanje za non-Express +${nonExpressCustoms.toFixed(2)} €`);
  if (usProcessing) details.push(`US International Processing Fee +${usProcessing.toFixed(2)} €`);

  return {
    id,
    name,
    carrier: "UPS",
    price: round2(fuelBasis + fuel + exportClearance + nonExpressCustoms + usProcessing),
    possible: true,
    details,
    serviceType,
    warning: upsWarnings(country, true),
    status: "surcharge",
  };
};

export const calcUPSExpressSaver = (input: PricingInput, country: UpsCountry): PriceResult => {
  const id = "ups-express-saver";
  const name = "UPS Express Saver";
  const serviceType: ServiceType = "MBE Express";
  if (country.suspended) return unavailable(id, name, "UPS", serviceType, `UPS usluga za ${country.label} privremeno je suspendirana.`);
  if (country.saverZone === null) return unavailable(id, name, "UPS", serviceType, `UPS Express Saver nije dostupan za ${country.label}.`);
  const selectionIssue = upsUnavailableForSelections(input, id, name, serviceType);
  if (selectionIssue) return selectionIssue;

  const chargeResult = upsPackageCharges(input);
  if (!Array.isArray(chargeResult)) return { ...chargeResult, id, name, serviceType };
  const { billableWeight, largeCount, handlingCount } = upsChargeSummary(chargeResult);
  const zone = String(country.saverZone);
  const specialBalkans = country.specialSaver === "BALKANS";
  const rateTable = specialBalkans
    ? UPS_BALKANS_SAVER_RATES
    : (UPS_SAVER_PACKAGE_RATES as Record<string, readonly UpsTier[]>)[zone];
  const overWeightRate = specialBalkans
    ? UPS_BALKANS_SAVER_OVER_70
    : (UPS_SAVER_OVER_70 as Record<string, UpsOverWeightRate>)[zone];
  const transport = billableWeight <= 70
    ? upsTierPrice(rateTable, billableWeight)
    : upsOverWeightPrice(overWeightRate, billableWeight);
  if (transport === null) return unavailable(id, name, "UPS", serviceType, "Nema UPS Express Saver tarife za izračunatu obračunsku masu.", "manual");

  const largeFee = largeCount * UPS_LARGE_PACKAGE;
  const handlingFee = handlingCount * UPS_ADDITIONAL_HANDLING;
  const fuelBasis = transport + largeFee + handlingFee;
  const fuel = fuelBasis * UPS_EXPRESS_SAVER_FUEL;
  const exportClearance = country.region === "WW" ? UPS_EXPORT_CLEARANCE : 0;
  const usProcessing = input.destinationCountry === "UPS:US" ? UPS_US_PROCESSING_FEE : 0;
  const details = [
    specialBalkans ? "posebni Express Saver cjenik za BiH / Sjevernu Makedoniju / Albaniju" : `zona ${country.saverZone}`,
    `UPS obračunska masa ${billableWeight.toFixed(1)} kg`,
    `osnovna tarifa ${transport.toFixed(2)} €`,
  ];
  if (largeFee) details.push(`veliki paket ${largeCount} × ${UPS_LARGE_PACKAGE.toFixed(2)} € = ${largeFee.toFixed(2)} €; minimalno 40 kg po takvom paketu`);
  if (handlingFee) details.push(`dodatna manipulacija ${handlingCount} × ${UPS_ADDITIONAL_HANDLING.toFixed(2)} € = ${handlingFee.toFixed(2)} €`);
  details.push(`gorivo ${(UPS_EXPRESS_SAVER_FUEL * 100).toFixed(2).replace(".", ",")}% (od ${UPS_FUEL_EFFECTIVE_FROM}) = ${fuel.toFixed(2)} €`);
  if (exportClearance) details.push(`izvozno carinjenje +${exportClearance.toFixed(2)} €`);
  if (usProcessing) details.push(`US International Processing Fee +${usProcessing.toFixed(2)} €`);

  return {
    id,
    name,
    carrier: "UPS",
    price: round2(fuelBasis + fuel + exportClearance + usProcessing),
    possible: true,
    details,
    serviceType,
    warning: upsWarnings(country, false),
    status: "surcharge",
  };
};

const sortResults = (results: PriceResult[]) => [...results].sort((a, b) => {
  if (a.possible !== b.possible) return a.possible ? -1 : 1;
  if (a.status !== b.status && !a.possible) return a.status === "manual" ? -1 : 1;
  return (a.price ?? Infinity) - (b.price ?? Infinity);
});

const winner = (results: PriceResult[]) => results.find((result) => result.possible && result.price !== null) ?? null;

export const calculatePrices = (input: PricingInput): PricingResults => {
  if (input.destinationCountry !== "Croatia") {
    const tariff = EXPORT_TARIFF_MAP[input.destinationCountry];
    const upsCountry = getUpsCountry(input.destinationCountry);
    if (!tariff && !upsCountry) {
      const missing = unavailable("export-country", "Izvoz", "MBE", "MBE Economy", "Za odabranu državu nema ulaznih tarifa.");
      return {
        economy: [missing],
        express: [],
        lockers: [],
        economyWinner: null,
        expressWinner: null,
        lockerWinner: null,
        overallWinner: null,
        recommendedWinner: null,
      };
    }
    const economyCandidates: PriceResult[] = [];
    if (tariff) economyCandidates.push(calcDPDExport(input, tariff), calcHPExport(input, tariff), calcGLSExport(input, tariff));
    if (upsCountry) economyCandidates.push(calcUPSStandard(input, upsCountry));
    const expressCandidates: PriceResult[] = upsCountry ? [calcUPSExpressSaver(input, upsCountry)] : [];
    const economy = sortResults(economyCandidates);
    const express = sortResults(expressCandidates);
    const economyWinner = winner(economy);
    const expressWinner = winner(express);
    const overallWinner = winner(sortResults([...economy, ...express]));
    return {
      economy,
      express,
      lockers: [],
      economyWinner,
      expressWinner,
      lockerWinner: null,
      overallWinner,
      recommendedWinner: economyWinner,
    };
  }
  const economy = sortResults([
    calcDPD(input),
    calcHPParcel(input),
    ...(input.packages.length === 1 ? [calcOverseasSingle(input)] : [calcOverseasMulti(input)]),
    calcInTime(input),
    calcLagermax(input),
    calcSchenkerPackages(input),
    calcSchenkerPallet(input),
    calcHPPallet(input),
  ]);
  const express = sortResults([calcGLS(input)]);
  const lockers = sortResults([calcBoxNow(input), calcHPLocker(input), calcGLSLocker(input), calcDPDShop(input)]);
  const economyWinner = winner(economy);
  const expressWinner = winner(express);
  const lockerWinner = winner(lockers);
  const overallWinner = winner(sortResults([...economy, ...express, ...lockers]));
  return { economy, express, lockers, economyWinner, expressWinner, lockerWinner, overallWinner, recommendedWinner: economyWinner };
};

export const shipmentMetrics = (packages: NumericPackageItem[]) => ({
  actualWeight: round2(totalWeight(packages)),
  inTimeVolumetricWeight: round2(volumeWeightInTime(packages)),
});

export const destinationIsIsland = isAnyIsland;
