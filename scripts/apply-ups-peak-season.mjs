const fs = require('node:fs');
function edit(file, pairs) {
  let s = fs.readFileSync(file, 'utf8');
  for (const [from, to, expected = 1] of pairs) {
    const count = s.split(from).length - 1;
    if (count !== expected) throw new Error(`${file}: expected ${expected}, got ${count}: ${from.slice(0, 90)}`);
    s = s.split(from).join(to);
  }
  fs.writeFileSync(file, s);
}
edit('src/upsTariffs.ts', [[
  'export const UPS_OVER_MAXIMUM = 346.95;\n',
  'export const UPS_OVER_MAXIMUM = 346.95;\nexport const UPS_PEAK_SEASON = { from: "2026-10-04", through: "2027-02-06", expressPerKgZones1To7And703: 0.30, expressPerKgZones8To11: 1.10, additionalHandling: 3.50, largePackage: 35, overMaximum: 175 } as const;\n'
]]);
edit('src/pricing.ts', [
  ['  UPS_OVER_MAXIMUM,\n', '  UPS_OVER_MAXIMUM,\n  UPS_PEAK_SEASON,\n'],
  ['const upsPackageCharges = (input: PricingInput): UpsPackageCharge[] | PriceResult => {',
   'const upsPeakSeasonActive=(d: string) => d >= UPS_PEAK_SEASON.from && d <= UPS_PEAK_SEASON.through;\nconst upsAdditionalFees=(d: string) => upsPeakSeasonActive(d) ? { handling: UPS_PEAK_SEASON.additionalHandling, large: UPS_PEAK_SEASON.largePackage, overMaximum: UPS_PEAK_SEASON.overMaximum } : { handling: UPS_ADDITIONAL_HANDLING, large: UPS_LARGE_PACKAGE, overMaximum: UPS_OVER_MAXIMUM };\nconst upsPeakExpressPerKg=(d: string, z: number) => !upsPeakSeasonActive(d) ? 0 : z === 703 || (z >= 1 && z <= 7) ? UPS_PEAK_SEASON.expressPerKgZones1To7And703 : z >= 8 && z <= 11 ? UPS_PEAK_SEASON.expressPerKgZones8To11 : 0;\nconst upsPackageCharges = (input: PricingInput): UpsPackageCharge[] | PriceResult => {'],
  ['  const serviceType: ServiceType = "MBE Express";\n  for (const item of input.packages) {', '  const serviceType: ServiceType = "MBE Express";\n  const additionalFees = upsAdditionalFees(input.pricingDate);\n  for (const item of input.packages) {'],
  ['${UPS_OVER_MAXIMUM.toFixed(2)} € po paketu.', '${additionalFees.overMaximum.toFixed(2)} € po paketu${upsPeakSeasonActive(input.pricingDate) ? " do 06.02.2027." : ""}.'],
  ['  const { billableWeight, largeCount, handlingCount } = upsChargeSummary(chargeResult);\n', '  const { billableWeight, largeCount, handlingCount } = upsChargeSummary(chargeResult);\n  const additionalFees = upsAdditionalFees(input.pricingDate);\n', 2],
  ['  const largeFee = largeCount * UPS_LARGE_PACKAGE;\n', '  const largeFee = largeCount * additionalFees.large;\n', 2],
  ['  const handlingFee = handlingCount * UPS_ADDITIONAL_HANDLING;\n', '  const handlingFee = handlingCount * additionalFees.handling;\n', 2],
  ['  const fuelBasis = transport + largeFee + handlingFee;\n  const fuel = fuelBasis * UPS_EXPRESS_SAVER_FUEL;', '  const peakPerKg = upsPeakExpressPerKg(input.pricingDate, country.saverZone);\n  const peakSeasonFee = billableWeight * peakPerKg;\n  const fuelBasis = transport + largeFee + handlingFee + peakSeasonFee;\n  const fuel = fuelBasis * UPS_EXPRESS_SAVER_FUEL;'],
  ['if (largeFee) details.push(`veliki paket ${largeCount} × ${UPS_LARGE_PACKAGE.toFixed(2)} € = ${largeFee.toFixed(2)} €; minimalno 40 kg po takvom paketu`);', 'if (largeFee) details.push(`veliki paket ${largeCount} × ${additionalFees.large.toFixed(2)} € = ${largeFee.toFixed(2)} €; minimalno 40 kg po takvom paketu${upsPeakSeasonActive(input.pricingDate) ? " (privremeni iznos do 06.02.2027.)" : ""}`);', 2],
  ['if (handlingFee) details.push(`dodatna manipulacija ${handlingCount} × ${UPS_ADDITIONAL_HANDLING.toFixed(2)} € = ${handlingFee.toFixed(2)} €`);', 'if (handlingFee) details.push(`dodatna manipulacija ${handlingCount} × ${additionalFees.handling.toFixed(2)} € = ${handlingFee.toFixed(2)} €${upsPeakSeasonActive(input.pricingDate) ? " (privremeni iznos do 06.02.2027.)" : ""}`);', 2],
  ['  details.push(`gorivo ${(UPS_EXPRESS_SAVER_FUEL * 100).toFixed(2).replace(".", ",")}% (od ${UPS_FUEL_EFFECTIVE_FROM}) = ${fuel.toFixed(2)} €`);', '  if (peakSeasonFee) details.push(`UPS Season Peak – sezonska naknada za povećanu potražnju (${peakPerKg.toFixed(2)} €/kg × ${billableWeight.toFixed(1)} kg) = ${peakSeasonFee.toFixed(2)} €; vrijedi 04.10.2026.–06.02.2027. i na nju se obračunava gorivo`);\n  details.push(`gorivo ${(UPS_EXPRESS_SAVER_FUEL * 100).toFixed(2).replace(".", ",")}% (od ${UPS_FUEL_EFFECTIVE_FROM}) = ${fuel.toFixed(2)} €`);']
]);

edit('src/pricing.ts', [
  ['warning: upsWarnings(country, false, input.postalCode),',
   'warning: [upsPeakSeasonActive(input.pricingDate) && peakSeasonFee > 0 ? `UPS Season Peak zaračunat: ${peakSeasonFee.toFixed(2)} € (${peakPerKg.toFixed(2)} €/kg × ${billableWeight.toFixed(1)} kg); na naknadu se obračunava gorivo.` : "", upsWarnings(country, false)].filter(Boolean).join(" ") || undefined,']
]);


edit('src/pricing.ts', [
  ['  if (country.remotePossible) {\\n    warnings.push(`Za pojedine poštanske brojeve moguća je nadoplata: proširena lokacija ${UPS_REMOTE_RATE_PER_KG.toFixed(2)} €/kg, min. ${UPS_REMOTE_MINIMUM.toFixed(2)} €; udaljena lokacija ${UPS_TRUE_REMOTE_RATE_PER_KG.toFixed(2)} €/kg, min. ${UPS_TRUE_REMOTE_MINIMUM.toFixed(2)} €. Nije uključeno bez stranog poštanskog broja.`);\\n  }',
   '  if (country.remotePossible && !postalCode.trim()) warnings.push("Unesite poštanski broj odredišta za UPS provjeru Extended/Remote Area naknade.");'],
  ['  warnings.push("UPS Residential Delivery nije automatski uključen u izračun; vrsta primatelja se u kalkulatoru koristi samo za Lagermax/Schenker.");\\n','']
]);


{
  const file = 'src/server/results.ts';
  let content = fs.readFileSync(file, 'utf8');
  content = content.replace('Procjena: korištena je posljednja referenca goriva, koja još nije potvrđena za aktualno razdoblje.', '');
  fs.writeFileSync(file, content);
}


{
  const { execFileSync } = require('node:child_process');
  const encoded = execFileSync('curl', ['-fsSL', 'https://raw.githubusercontent.com/tjuros/MBE-KALKULATOR-HR/codex/ups-peak-season-2026/data/ups-area-surcharge.json.gz.b64'], { encoding: 'utf8' }).trim();
  const moduleSource = [
    'import { gunzipSync } from "node:zlib";',
    'type Range = [string, string, string, 1 | 2];',
    'const ranges = JSON.parse(gunzipSync(Buffer.from(' + JSON.stringify(encoded) + ', "base64")).toString("utf8")) as Range[];',
    'const byCountry = new Map<string, Range[]>();',
    'for (const row of ranges) { const bucket = byCountry.get(row[0]) ?? []; bucket.push(row); byCountry.set(row[0], bucket); }',
    'export type UpsAreaMatch = { kind: "Extended Area" | "Remote Area"; perKg: number; minimum: number };',
    'export function lookupUpsAreaSurcharge(countryCode: string, postalInput: string): UpsAreaMatch | null {',
    '  const country = countryCode.toUpperCase();',
    '  let postal = postalInput.trim().toUpperCase().replace(/[\\s-]/g, "");',
    '  if (!postal) return null;',
    '  if (country === "US" && /^\\d{9}$/.test(postal)) postal = postal.slice(0, 5);',
    '  if (country === "GB") { const match = postal.match(/^([A-Z]{1,2}\\d[A-Z]?)\\d[A-Z]{2}$/); if (match) postal = match[1]; }',
    '  const numericPostal = /^\\d+$/.test(postal) ? Number(postal) : null;',
    '  let found: 1 | 2 | null = null;',
    '  for (const [, low, high, kind] of byCountry.get(country) ?? []) {',
    '    const numericRange = /^\\d+$/.test(low) && /^\\d+$/.test(high);',
    '    const matches = numericRange && numericPostal !== null',
    '      ? numericPostal >= Number(low) && numericPostal <= Number(high)',
    '      : postal >= low && postal <= high;',
    '    if (matches && (found === null || kind > found)) found = kind;',
    '  }',
    '  if (found === 1) return { kind: "Extended Area", perKg: 0.62, minimum: 31.50 };',
    '  if (found === 2) return { kind: "Remote Area", perKg: 0.66, minimum: 32.50 };',
    '  return null;',
    '}',
    ''
  ].join('\n');
  fs.writeFileSync('src/upsAreaSurcharges.ts', moduleSource);
}

edit('src/pricing.ts', [
  ['export type NumericPackageItem = {', 'import { lookupUpsAreaSurcharge } from "./upsAreaSurcharges";\n\nexport type NumericPackageItem = {'],
  ['const upsChargeSummary = (charges: UpsPackageCharge[]) => ({\n  billableWeight: charges.reduce((sum, charge) => sum + charge.billableWeight, 0),\n  largeCount: charges.filter((charge) => charge.large).length,\n  handlingCount: charges.filter((charge) => charge.additionalHandling).length,\n});\n\nexport const calcUPSStandard',
   'const upsChargeSummary = (charges: UpsPackageCharge[]) => ({\n  billableWeight: charges.reduce((sum, charge) => sum + charge.billableWeight, 0),\n  largeCount: charges.filter((charge) => charge.large).length,\n  handlingCount: charges.filter((charge) => charge.additionalHandling).length,\n});\n\nconst upsAreaSurcharge = (country: UpsCountry, postalCode: string, billableWeight: number) => {\n  const match = lookupUpsAreaSurcharge(country.iso, postalCode);\n  return match ? { ...match, amount: Math.round(Math.max(match.perKg * billableWeight, match.minimum) * 100) / 100 } : null;\n};\n\nexport const calcUPSStandard'],
  ['  const additionalFees = upsAdditionalFees(input.pricingDate);\n  const zone', '  const additionalFees = upsAdditionalFees(input.pricingDate);\n  const areaSurcharge = upsAreaSurcharge(country, input.postalCode, billableWeight);\n  const areaFee = areaSurcharge?.amount ?? 0;\n  const zone', 2],
  ['  const fuelBasis = transport + largeFee + handlingFee;\n', '  const fuelBasis = transport + largeFee + handlingFee + areaFee;\n'],
  ['  const fuelBasis = transport + largeFee + handlingFee + peakFee;\n', '  const fuelBasis = transport + largeFee + handlingFee + peakFee + areaFee;\n'],
  ['  if (largeFee) details.push(`veliki paket', '  if (areaSurcharge) details.push("UPS " + areaSurcharge.kind + " (" + input.postalCode + "): " + areaSurcharge.perKg.toFixed(2) + " €/kg × " + billableWeight.toFixed(1) + " kg, minimum " + areaSurcharge.minimum.toFixed(2) + " € = " + areaFee.toFixed(2) + " €; na iznos se obračunava gorivo");\n  else if (input.postalCode.trim()) details.push("UPS provjera poštanskog broja " + input.postalCode + ": nema Extended/Remote Area naknade");\n  if (largeFee) details.push(`veliki paket', 2]
]);

edit('scripts/golden-pricing.ts', [
  ['price(austria, "ups-express-saver", 26.63);','price(austria, "ups-express-saver", 27.55);'],
  ['price(greatBritain, "ups-express-saver", 36.44);','price(greatBritain, "ups-express-saver", 37.35);'],
  ['price(germanyVolumetric, "ups-express-saver", 89.3);','price(germanyVolumetric, "ups-express-saver", 94.82);'],
  ['price(germanyMulti, "ups-express-saver", 24);','price(germanyMulti, "ups-express-saver", 24.92);'],
  ['price(germanyHandling, "ups-standard", 54.19);','price(germanyHandling, "ups-standard", 41.19);'],
  ['price(germanyHandling, "ups-express-saver", 174.46);','price(germanyHandling, "ups-express-saver", 171.55);'],
  ['price(germanyLarge, "ups-standard", 178.72);','price(germanyLarge, "ups-standard", 152.25);'],
  ['price(germanyLarge, "ups-express-saver", 386.16);','price(germanyLarge, "ups-express-saver", 379.11);'],
  ['price(usa, "ups-express-saver", 56.69);','price(usa, "ups-express-saver", 57.6);'],
  ['price(austriaPrivateRecipient, "ups-express-saver", 26.63);','price(austriaPrivateRecipient, "ups-express-saver", 27.55);'],
  ['price(albania, "ups-express-saver", 127.4);','price(albania, "ups-express-saver", 128.32);'],
  ['/346\\.95/);','/175\\.00/);']
]);
