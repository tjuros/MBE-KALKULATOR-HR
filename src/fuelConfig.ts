// Central carrier fuel configuration.
// Update this file when carrier fuel indices/surcharges change.
// All monetary values are EUR, all rates are decimal fractions.

export const FUEL_CONFIG = {
  overseas: {
    rate: 0.08,
    referencePrice: 1.86,
    effectiveFrom: "01.10.2026.",
    note: "MBE/Overseas fuel matrix",
  },
  gls: {
    publishedIndex: 1.652,
    referenceMonth: "09/2026",
    domesticPerPackage: 0.44,
    exportRate: 0.132,
    note: "GLS Croatia monthly published index; 22 fuel categories",
  },
  dpd: {
    dieselReference: 1.96,
    referenceMonth: "09/2026",
    note: "MBE-specific DPD road-fuel matrix from 01.04.2026.",
  },
  schenker: {
    dieselReference: 1.79,
    referenceMonth: "09/2026",
    rate: 0.09,
    note: "Contract matrix based on monthly Petrol/Crodux Eurodiesel average",
  },
  intime: {
    rate: 0.15,
    effectiveFrom: "01.03.2026.",
    note: "MBE contracted InTime price list",
  },
  lagermax: {
    rate: 0.066,
    reviewedOn: "06.10.2026.",
    note: "Current contracted/working MBE factor",
  },
  ups: {
    standardRate: 0.34,
    expressRate: 0.5325,
    effectiveFrom: "05.10.2026.",
    note: "UPS Croatia weekly fuel surcharge",
  },
  boxNow: {
    rate: 0,
    note: "No fuel surcharge in current MBE calculation",
  },
  hp: {
    rate: 0,
    note: "No separate fuel surcharge in current Paket24/EMS calculation",
  },
} as const;

export const dpdRoadFuelPerPackage = (dieselPrice: number) => {
  if (dieselPrice <= 1.60) return 0;
  if (dieselPrice <= 1.70) return 0.10;
  if (dieselPrice <= 1.80) return 0.20;
  if (dieselPrice <= 1.90) return 0.40;
  if (dieselPrice <= 2.00) return 0.50;
  if (dieselPrice <= 2.20) return 0.55;
  if (dieselPrice <= 2.30) return 0.60;
  if (dieselPrice <= 2.40) return 0.65;
  if (dieselPrice <= 2.50) return 0.70;
  return 0.70 + Math.ceil((dieselPrice - 2.50) / 0.10) * 0.05;
};

export const DPD_ROAD_FUEL_PER_PACKAGE = dpdRoadFuelPerPackage(FUEL_CONFIG.dpd.dieselReference);
