import { useEffect, useMemo, useState, type CSSProperties, type FocusEvent } from "react";
import {
  calculatePrices,
  destinationIsIsland,
  getPlaceOptions,
  resolveInTimeZone,
  shipmentMetrics,
  type AdditionalServices,
  type CarrierStatus,
  type NumericPackageItem,
  type PriceResult,
  type ServiceType,
} from "./pricing";
import { EXPORT_COUNTRIES } from "./exportTariffs";

type PackageItem = {
  weight: string;
  length: string;
  width: string;
  height: string;
};

const DEFAULT_FIRST_PACKAGE: PackageItem = { weight: "2", length: "30", width: "20", height: "10" };
const DEFAULT_NEW_PACKAGE: PackageItem = { weight: "1", length: "10", width: "10", height: "10" };
const DEFAULT_ADDITIONAL_SERVICES: AdditionalServices = {
  documentReturn: false,
  addresseeOnly: false,
  specialHandling: false,
};

const parseNum = (value: string) => {
  if (!value.trim()) return null;
  const parsed = Number(value.replace(",", "."));
  return Number.isFinite(parsed) ? parsed : null;
};

const money = (value: number | null) => value === null
  ? "—"
  : new Intl.NumberFormat("hr-HR", { style: "currency", currency: "EUR" }).format(value);

function useIsMobile() {
  const [isMobile, setIsMobile] = useState(() => typeof window !== "undefined" && window.innerWidth < 760);
  useEffect(() => {
    const onResize = () => setIsMobile(window.innerWidth < 760);
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);
  return isMobile;
}

const cardStyle = (accent = false): CSSProperties => ({
  background: "#fff",
  border: accent ? "2px solid #111827" : "1px solid #e5e7eb",
  borderRadius: 16,
  padding: 16,
  boxShadow: accent ? "0 12px 28px rgba(15,23,42,.09)" : "0 6px 18px rgba(15,23,42,.05)",
});

const inputStyle = (): CSSProperties => ({
  width: "100%",
  minHeight: 44,
  border: "1px solid #cbd5e1",
  borderRadius: 10,
  padding: "10px 11px",
  color: "#111827",
  background: "#fff",
  outline: "none",
});

const buttonStyle = (primary = false): CSSProperties => ({
  border: primary ? "1px solid #dc2626" : "1px solid #cbd5e1",
  borderRadius: 10,
  minHeight: 42,
  padding: "9px 12px",
  background: primary ? "#dc2626" : "#fff",
  color: primary ? "#fff" : "#111827",
  fontWeight: 800,
  cursor: "pointer",
});

const sectionSummaryStyle = (): CSSProperties => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
  gap: 12,
  cursor: "pointer",
  listStyle: "none",
  fontWeight: 900,
  fontSize: 17,
});

const carrierColors: Record<string, { bg: string; color: string; border?: string }> = {
  MBE: { bg: "#dc2626", color: "#fff" },
  GLS: { bg: "#1026b3", color: "#ffd100", border: "#ffd100" },
  DPD: { bg: "#dc0032", color: "#fff" },
  HP: { bg: "#ffd500", color: "#111827", border: "#111827" },
  Overseas: { bg: "#ef7d00", color: "#fff" },
  InTime: { bg: "#78be20", color: "#111827", border: "#111827" },
  Lagermax: { bg: "#08377c", color: "#fff" },
  "BOX NOW": { bg: "#44d62c", color: "#efefe6" },
  UPS: { bg: "#351c15", color: "#ffb500", border: "#ffb500" },
};

const carrierPillStyle = (carrier: string): CSSProperties => {
  const colors = carrierColors[carrier] ?? { bg: "#334155", color: "#fff" };
  return {
    display: "inline-flex",
    alignItems: "center",
    borderRadius: 999,
    padding: "5px 9px",
    background: colors.bg,
    color: colors.color,
    border: `1px solid ${colors.border ?? colors.bg}`,
    fontWeight: 900,
    fontSize: 12,
    letterSpacing: ".02em",
  };
};

const serviceBadgeStyle = (serviceType: ServiceType): CSSProperties => {
  const styles: Record<ServiceType, { bg: string; color: string }> = {
    "MBE Economy": { bg: "#dcfce7", color: "#166534" },
    "MBE Express": { bg: "#fee2e2", color: "#b91c1c" },
    "MBE Paketomati": { bg: "#ecfccb", color: "#3f6212" },
  };
  return {
    display: "inline-flex",
    borderRadius: 999,
    padding: "4px 8px",
    background: styles[serviceType].bg,
    color: styles[serviceType].color,
    fontSize: 12,
    fontWeight: 900,
  };
};

const statusBadge = (status: CarrierStatus) => {
  const styles: Record<CarrierStatus, { label: string; bg: string; color: string }> = {
    ok: { label: "U REDU", bg: "#dcfce7", color: "#166534" },
    surcharge: { label: "NADOPLATA / NAPOMENA", bg: "#ffedd5", color: "#9a3412" },
    manual: { label: "RUČNA PROVJERA", bg: "#fef3c7", color: "#92400e" },
    no: { label: "NIJE MOGUĆE", bg: "#fee2e2", color: "#991b1b" },
  };
  const current = styles[status];
  return (
    <span style={{ display: "inline-flex", borderRadius: 999, padding: "4px 8px", background: current.bg, color: current.color, fontSize: 12, fontWeight: 900 }}>
      {current.label}
    </span>
  );
};

function ResultRow({ result, highlighted }: { result: PriceResult; highlighted: boolean }) {
  return (
    <div style={{ ...cardStyle(highlighted), padding: 14, opacity: result.status === "no" ? 0.78 : 1 }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", gap: 12, flexWrap: "wrap" }}>
        <div style={{ minWidth: 0 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 8, flexWrap: "wrap" }}>
            <span style={carrierPillStyle(result.carrier)}>{result.carrier}</span>
            <strong style={{ fontSize: 18 }}>{result.name}</strong>
            {highlighted ? <span style={{ color: "#166534", fontWeight: 900, fontSize: 12 }}>{result.serviceType === "MBE Economy" ? "PREPORUČENO" : "NAJPOVOLJNIJE U GRUPI"}</span> : null}
          </div>
          <div style={{ display: "flex", gap: 8, flexWrap: "wrap", marginTop: 8 }}>
            <span style={serviceBadgeStyle(result.serviceType)}>{result.serviceType}</span>
            {statusBadge(result.status)}
          </div>
        </div>
        <div style={{ fontSize: 24, fontWeight: 900, whiteSpace: "nowrap" }}>{money(result.price)}</div>
      </div>

      <div style={{ marginTop: 10, display: "grid", gap: 4, color: "#475569", lineHeight: 1.45 }}>
        {result.details.map((detail, index) => <div key={`${result.id}-${index}`}>• {detail}</div>)}
      </div>
      {result.warning ? (
        <div style={{ marginTop: 10, padding: "9px 10px", borderRadius: 10, background: result.status === "no" ? "#fef2f2" : "#fff7ed", color: result.status === "no" ? "#991b1b" : "#9a3412", fontWeight: 750, lineHeight: 1.45 }}>
          PAZI: {result.warning}
        </div>
      ) : null}
    </div>
  );
}

function ChoiceCard({ label, result }: { label: ServiceType; result: PriceResult | null }) {
  const accents: Record<ServiceType, { border: string; background: string; color: string }> = {
    "MBE Economy": { border: "#16a34a", background: "#f0fdf4", color: "#166534" },
    "MBE Express": { border: "#dc2626", background: "#fef2f2", color: "#b91c1c" },
    "MBE Paketomati": { border: "#65a30d", background: "#f7fee7", color: "#3f6212" },
  };
  const roles: Record<ServiceType, string> = {
    "MBE Economy": "PREPORUKA",
    "MBE Express": "BRŽA OPCIJA",
    "MBE Paketomati": "DODATNA MOGUĆNOST",
  };
  const accent = accents[label];
  return (
    <div style={{ ...cardStyle(Boolean(result)), padding: 14, borderColor: result ? accent.border : "#e5e7eb", background: result ? accent.background : "#fff" }}>
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: 8, flexWrap: "wrap" }}>
        <div style={{ fontSize: 12, color: result ? accent.color : "#64748b", textTransform: "uppercase", fontWeight: 900 }}>{label}</div>
        <span style={{ borderRadius: 999, padding: "3px 7px", background: result ? accent.border : "#e2e8f0", color: result ? "#fff" : "#64748b", fontSize: 10, fontWeight: 900, letterSpacing: ".03em" }}>{roles[label]}</span>
      </div>
      {result ? (
        <>
          <div style={{ display: "flex", alignItems: "center", gap: 8, flexWrap: "wrap", marginTop: 7 }}>
            <span style={carrierPillStyle(result.carrier)}>{result.carrier}</span>
            <strong style={{ fontSize: 20 }}>{result.name}</strong>
          </div>
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: 8, marginTop: 8, flexWrap: "wrap" }}>
            {statusBadge(result.status)}
            <span style={{ fontSize: 26, fontWeight: 900 }}>{money(result.price)}</span>
          </div>
          {result.warning ? <div style={{ marginTop: 8, color: "#9a3412", fontSize: 13, lineHeight: 1.4 }}>{result.warning}</div> : null}
        </>
      ) : (
        <div style={{ marginTop: 8, color: "#64748b" }}>Čeka ispravan unos.</div>
      )}
    </div>
  );
}

export default function App() {
  const isMobile = useIsMobile();
  const [destinationCountry, setDestinationCountry] = useState("Croatia");
  const [postalCode, setPostalCode] = useState("");
  const [destinationPlace, setDestinationPlace] = useState("");
  const [goodsValue, setGoodsValue] = useState("");
  const [cod, setCod] = useState(false);
  const [codAmount, setCodAmount] = useState("");
  const [packages, setPackages] = useState<PackageItem[]>([{ ...DEFAULT_FIRST_PACKAGE }]);
  const [additionalServices, setAdditionalServices] = useState<AdditionalServices>({ ...DEFAULT_ADDITIONAL_SERVICES });

  const numericPackages = useMemo<NumericPackageItem[]>(() => packages.map((item) => ({
    weight: parseNum(item.weight) ?? 0,
    length: parseNum(item.length) ?? 0,
    width: parseNum(item.width) ?? 0,
    height: parseNum(item.height) ?? 0,
  })), [packages]);

  const selectedExportCountry = useMemo(() => EXPORT_COUNTRIES.find((country) => country.value === destinationCountry), [destinationCountry]);
  const isDomestic = destinationCountry === "Croatia";
  const isWorldwide = selectedExportCountry?.region === "WW";
  const destinationLabel = isDomestic ? "Hrvatska" : selectedExportCountry?.label ?? destinationCountry;

  const isReady = useMemo(() => (!isDomestic || postalCode.length === 5)
    && (!isWorldwide || (parseNum(goodsValue) ?? 0) > 0)
    && (!cod || (parseNum(codAmount) ?? 0) > 0)
    && packages.every((item) => [item.weight, item.length, item.width, item.height].every((value) => (parseNum(value) ?? 0) > 0)),
  [isDomestic, isWorldwide, postalCode, goodsValue, cod, codAmount, packages]);

  const placeOptions = useMemo(() => getPlaceOptions(postalCode), [postalCode]);
  const results = useMemo(() => isReady ? calculatePrices({
    destinationCountry,
    postalCode,
    destinationPlace,
    packages: numericPackages,
    cod,
    codAmount: parseNum(codAmount) ?? 0,
    goodsValue: parseNum(goodsValue) ?? 0,
    additionalServices,
  }) : null, [isReady, destinationCountry, postalCode, destinationPlace, numericPackages, cod, codAmount, goodsValue, additionalServices]);

  const metrics = useMemo(() => shipmentMetrics(numericPackages), [numericPackages]);
  const inTimeZone = useMemo(() => resolveInTimeZone(postalCode, destinationPlace), [postalCode, destinationPlace]);
  const recommendation = results?.recommendedWinner ?? null;

  const updatePackage = (index: number, field: keyof PackageItem, value: string) => {
    setPackages((current) => current.map((item, itemIndex) => itemIndex === index ? { ...item, [field]: value } : item));
  };
  const addPackage = () => setPackages((current) => [...current, { ...DEFAULT_NEW_PACKAGE }]);
  const duplicatePackage = (index: number) => setPackages((current) => [
    ...current.slice(0, index + 1),
    { ...current[index] },
    ...current.slice(index + 1),
  ]);
  const removePackage = (index: number) => setPackages((current) => current.length === 1 ? current : current.filter((_, itemIndex) => itemIndex !== index));
  const resetShipment = () => {
    setDestinationCountry("Croatia");
    setPostalCode("");
    setDestinationPlace("");
    setGoodsValue("");
    setCod(false);
    setCodAmount("");
    setPackages([{ ...DEFAULT_FIRST_PACKAGE }]);
    setAdditionalServices({ ...DEFAULT_ADDITIONAL_SERVICES });
  };
  const commonInputProps = { onFocus: (event: FocusEvent<HTMLInputElement>) => event.target.select() };
  const additionalPackages = packages.slice(1);

  return (
    <div style={{ minHeight: "100vh", background: "#f8fafc", padding: isMobile ? 12 : 16, paddingBottom: isMobile ? 160 : 18, fontFamily: "Ubuntu, Arial, sans-serif" }}>
      <div style={{ maxWidth: 1040, margin: "0 auto", display: "grid", gap: 14 }}>
        <header style={{ ...cardStyle(), padding: isMobile ? 14 : 16 }}>
          <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", gap: 12 }}>
            <div>
              <div style={{ display: "flex", alignItems: "center", gap: 10, flexWrap: "wrap" }}>
                <div style={carrierPillStyle("MBE")}>MAIL BOXES ETC.</div>
                <div style={{ fontSize: isMobile ? 19 : 25, fontWeight: 900, lineHeight: 1.05 }}>SmartChoice</div>
              </div>
              <div style={{ color: "#64748b", marginTop: 4, fontSize: isMobile ? 14 : 16 }}>Mail Boxes Etc. Križevci · ulazne cijene bez PDV-a</div>
            </div>
            <button style={{ ...buttonStyle(), minHeight: 38, padding: "8px 12px" }} onClick={resetShipment}>Reset</button>
          </div>
        </header>

        <div style={{ ...cardStyle(), padding: "12px 14px", background: "#fff" }}>
          <label style={{ display: "block", marginBottom: 6, fontWeight: 900 }}>Destination country</label>
          <select
            value={destinationCountry}
            onChange={(event) => {
              setDestinationCountry(event.target.value);
              setPostalCode("");
              setDestinationPlace("");
              setGoodsValue("");
              setCod(false);
              setCodAmount("");
            }}
            style={inputStyle()}
          >
            <option value="Croatia">Hrvatska</option>
            <optgroup label="Europska unija">
              {EXPORT_COUNTRIES.filter((country) => country.region === "EU").map((country) => (
                <option key={country.value} value={country.value}>{country.label}</option>
              ))}
            </optgroup>
            <optgroup label="Ostale države s ugovorenim cijenama">
              {EXPORT_COUNTRIES.filter((country) => country.region === "WW").map((country) => (
                <option key={country.value} value={country.value}>{country.label}</option>
              ))}
            </optgroup>
          </select>
        </div>

        <div style={{ display: "grid", gap: 14, gridTemplateColumns: isMobile ? "1fr" : "1.05fr .95fr" }}>
          <section style={cardStyle()}>
            <div style={{ display: "grid", gap: 12 }}>
              {isDomestic ? (
                <div>
                  <label style={{ display: "block", marginBottom: 6, fontWeight: 800 }}>Poštanski broj odredišta</label>
                  <input
                    {...commonInputProps}
                    inputMode="numeric"
                    value={postalCode}
                    onChange={(event) => {
                      setPostalCode(event.target.value.replace(/\D/g, "").slice(0, 5));
                      setDestinationPlace("");
                    }}
                    placeholder="npr. 33000"
                    style={inputStyle()}
                  />
                </div>
              ) : null}

              {isWorldwide ? (
                <div>
                  <label style={{ display: "block", marginBottom: 6, fontWeight: 800 }}>Vrijednost robe (€)</label>
                  <input {...commonInputProps} type="text" inputMode="decimal" value={goodsValue} onChange={(event) => setGoodsValue(event.target.value)} placeholder="bez PDV-a" style={inputStyle()} />
                  <div style={{ fontSize: 12, color: "#64748b", marginTop: 5 }}>Potrebno za točan obračun carinskih dodataka.</div>
                </div>
              ) : null}

              {isDomestic && postalCode.length === 5 && placeOptions.length ? (
                <div>
                  <label style={{ display: "block", marginBottom: 6, fontWeight: 800 }}>Točno mjesto <span style={{ color: "#dc2626" }}>(za pojedine zone)</span></label>
                  <input
                    list="destination-place-options"
                    value={destinationPlace}
                    onChange={(event) => setDestinationPlace(event.target.value)}
                    placeholder="upiši ili odaberi mjesto"
                    style={inputStyle()}
                  />
                  <datalist id="destination-place-options">
                    {placeOptions.map((place) => <option key={place} value={place} />)}
                  </datalist>
                  <div style={{ fontSize: 12, color: "#92400e", marginTop: 5, lineHeight: 1.4 }}>
                    Ovaj poštanski broj pokriva više InTime zona ili različitu Overseas Cargo dostupnost. Bez točnog mjesta te će opcije ostati na ručnoj provjeri.
                  </div>
                </div>
              ) : null}

              <div>
                <div style={{ fontWeight: 900, marginBottom: 7, fontSize: isMobile ? 16 : 18 }}>Paket 1</div>
                <PackageFields item={packages[0]} index={0} isMobile={isMobile} updatePackage={updatePackage} commonInputProps={commonInputProps} />
              </div>

              <label style={{ display: "flex", alignItems: "center", gap: 10, fontSize: 16 }}>
                <input type="checkbox" checked={cod} onChange={(event) => setCod(event.target.checked)} />
                COD / pouzeće
              </label>
              {cod ? (
                <div>
                  <label style={{ display: "block", marginBottom: 6, fontWeight: 800 }}>Iznos pouzeća (€)</label>
                  <input {...commonInputProps} type="text" inputMode="decimal" value={codAmount} onChange={(event) => setCodAmount(event.target.value)} placeholder="npr. 40" style={inputStyle()} />
                  <div style={{ fontSize: 12, color: "#64748b", marginTop: 5 }}>Primjenjuje se ugovoreni COD model svakog kurira.</div>
                </div>
              ) : null}

              <details style={{ border: "1px solid #e5e7eb", borderRadius: 12, padding: 12 }}>
                <summary style={{ ...sectionSummaryStyle(), fontSize: 15 }}>Dodatne usluge</summary>
                <div style={{ display: "grid", gap: 10, marginTop: 12 }}>
                  {([
                    ["documentReturn", "Povrat ovjerenog dokumenta"],
                    ["addresseeOnly", "Uručiti osobno primatelju"],
                    ["specialHandling", "Posebno rukovanje / osjetljiv sadržaj"],
                  ] as Array<[keyof AdditionalServices, string]>).map(([key, label]) => (
                    <label key={key} style={{ display: "flex", alignItems: "center", gap: 10 }}>
                      <input type="checkbox" checked={additionalServices[key]} onChange={(event) => setAdditionalServices((current) => ({ ...current, [key]: event.target.checked }))} />
                      {label}
                    </label>
                  ))}
                  <div style={{ fontSize: 12, color: "#64748b", lineHeight: 1.45 }}>Ako kurir nema ugovorenu cijenu za odabranu uslugu, rezultat će biti označen za ručnu provjeru.</div>
                </div>
              </details>

              <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
                <button style={buttonStyle()} onClick={() => duplicatePackage(0)}>Dupliciraj paket 1</button>
                <button style={buttonStyle(true)} onClick={addPackage}>Dodaj paket</button>
              </div>
            </div>
          </section>

          <div style={{ display: "grid", gap: 12, alignContent: "start" }}>
            <ChoiceCard label="MBE Economy" result={results?.economyWinner ?? null} />
            {isDomestic ? <ChoiceCard label="MBE Express" result={results?.expressWinner ?? null} /> : null}
            {isDomestic ? <ChoiceCard label="MBE Paketomati" result={results?.lockerWinner ?? null} /> : null}
          </div>
        </div>

        <details open={additionalPackages.length > 0} style={cardStyle()}>
          <summary style={sectionSummaryStyle()}>
            <span>Dodatni paketi {additionalPackages.length ? `(${additionalPackages.length})` : ""}</span>
            <span style={{ color: "#64748b", fontWeight: 700 }}>{additionalPackages.length ? "otvori / zatvori" : "nema"}</span>
          </summary>
          {additionalPackages.length ? (
            <div style={{ marginTop: 14, display: "grid", gap: 12 }}>
              {additionalPackages.map((item, localIndex) => {
                const index = localIndex + 1;
                return (
                  <div key={index} style={{ ...cardStyle(), padding: 14 }}>
                    <div style={{ display: "flex", justifyContent: "space-between", gap: 8, flexWrap: "wrap", marginBottom: 10 }}>
                      <strong>Paket {index + 1}</strong>
                      <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
                        <button style={buttonStyle()} onClick={() => duplicatePackage(index)}>Dupliciraj</button>
                        <button style={buttonStyle()} onClick={() => removePackage(index)}>Obriši</button>
                      </div>
                    </div>
                    <PackageFields item={item} index={index} isMobile={isMobile} updatePackage={updatePackage} commonInputProps={commonInputProps} />
                  </div>
                );
              })}
            </div>
          ) : <div style={{ marginTop: 12, color: "#64748b" }}>Za više paketa klikni “Dodaj paket”.</div>}
        </details>

        <ResultSection title="MBE Economy · usporedba kurira" results={results?.economy ?? null} winner={results?.economyWinner ?? null} defaultOpen />
        {isDomestic ? <ResultSection title="MBE Express · brža opcija" results={results?.express ?? null} winner={results?.expressWinner ?? null} /> : null}
        {isDomestic ? <ResultSection title="Paketomati · dodatna mogućnost" results={results?.lockers ?? null} winner={results?.lockerWinner ?? null} /> : null}
      </div>

      <div style={{ position: isMobile ? "fixed" : "sticky", left: 0, right: 0, bottom: 0, zIndex: 30, padding: isMobile ? "10px 12px calc(10px + env(safe-area-inset-bottom))" : 0, background: isMobile ? "rgba(248,250,252,.96)" : "transparent", backdropFilter: isMobile ? "blur(10px)" : "none", borderTop: isMobile ? "1px solid #e5e7eb" : "none", marginTop: 14 }}>
        <div style={{ maxWidth: 1040, margin: "0 auto" }}>
          <details style={cardStyle()}>
            <summary style={sectionSummaryStyle()}>
              <span style={{ display: "grid", gap: 2 }}>
                <span>MBE Economy preporuka</span>
                <span style={{ color: "#64748b", fontSize: 12, fontWeight: 700 }}>{recommendation ? recommendation.name : "Pregled pošiljke"}</span>
              </span>
              <span style={{ color: recommendation ? "#166534" : "#64748b", fontWeight: 900, display: "flex", alignItems: "center", gap: 8 }}>
                <span>{recommendation ? money(recommendation.price) : "—"}</span><span style={{ fontSize: 12 }}>▾</span>
              </span>
            </summary>
            {recommendation ? (
              <div style={{ marginTop: 12, padding: 12, borderRadius: 12, border: "1px solid #86efac", background: "#f0fdf4", display: "flex", alignItems: "center", justifyContent: "space-between", gap: 12, flexWrap: "wrap" }}>
                <div>
                  <div style={{ color: "#166534", fontSize: 11, fontWeight: 900, letterSpacing: ".04em" }}>PREPORUČENA MBE ECONOMY OPCIJA</div>
                  <div style={{ display: "flex", alignItems: "center", gap: 8, flexWrap: "wrap", marginTop: 6 }}>
                    <span style={carrierPillStyle(recommendation.carrier)}>{recommendation.carrier}</span>
                    <strong>{recommendation.name}</strong>
                  </div>
                </div>
                <strong style={{ color: "#166534", fontSize: 24 }}>{money(recommendation.price)}</strong>
              </div>
            ) : null}
            <div style={{ marginTop: 12, display: "grid", gridTemplateColumns: isMobile ? "1fr" : "1fr 1fr", gap: 8, color: "#475569" }}>
              <div>Država odredišta: <strong>{destinationLabel}</strong></div>
              {isDomestic ? <div>Odredište: <strong>{destinationPlace ? `${postalCode} ${destinationPlace}` : postalCode || "—"}</strong></div> : null}
              {isWorldwide ? <div>Vrijednost robe: <strong>{(parseNum(goodsValue) ?? 0) > 0 ? money(parseNum(goodsValue)) : "—"}</strong></div> : null}
              <div>Broj paketa: <strong>{packages.length}</strong></div>
              <div>Stvarna masa: <strong>{metrics.actualWeight.toFixed(2)} kg</strong></div>
              {isDomestic ? <div>InTime volumenska masa: <strong>{metrics.inTimeVolumetricWeight.toFixed(2)} kg</strong></div> : null}
              {isDomestic ? <div>InTime zona: <strong>{inTimeZone ? `Z${inTimeZone}` : postalCode ? "odaberi mjesto / provjeri" : "—"}</strong></div> : null}
              {isDomestic ? <div>Otok: <strong>{postalCode ? (destinationIsIsland(postalCode) ? "Da" : "Ne") : "—"}</strong></div> : null}
              {isDomestic && results?.expressWinner ? <div>Brža opcija: <strong>{results.expressWinner.name} ({money(results.expressWinner.price)})</strong></div> : null}
              {isDomestic && results?.lockerWinner ? <div>Paketomat, dodatno: <strong>{results.lockerWinner.name} ({money(results.lockerWinner.price)})</strong></div> : null}
            </div>
          </details>
        </div>
      </div>
    </div>
  );
}

function PackageFields({
  item,
  index,
  isMobile,
  updatePackage,
  commonInputProps,
}: {
  item: PackageItem;
  index: number;
  isMobile: boolean;
  updatePackage: (index: number, field: keyof PackageItem, value: string) => void;
  commonInputProps: { onFocus: (event: FocusEvent<HTMLInputElement>) => void };
}) {
  return (
    <div style={{ display: "grid", gridTemplateColumns: isMobile ? "1fr 1fr" : "repeat(4, minmax(0,1fr))", gap: 10 }}>
      {(["weight", "length", "width", "height"] as const).map((field) => (
        <div key={field}>
          <label style={{ display: "block", marginBottom: 6 }}>
            {field === "weight" ? "Težina" : field === "length" ? "Duljina" : field === "width" ? "Širina" : "Visina"}
          </label>
          <input
            {...commonInputProps}
            inputMode="decimal"
            type="text"
            value={item[field]}
            onChange={(event) => updatePackage(index, field, event.target.value)}
            placeholder={field === "weight" ? "kg" : "cm"}
            style={inputStyle()}
          />
        </div>
      ))}
    </div>
  );
}

function ResultSection({
  title,
  results,
  winner,
  defaultOpen = false,
}: {
  title: string;
  results: PriceResult[] | null;
  winner: PriceResult | null;
  defaultOpen?: boolean;
}) {
  return (
    <details style={cardStyle()} open={defaultOpen}>
      <summary style={sectionSummaryStyle()}>
        <span>{title}</span>
        <span style={{ color: "#64748b", fontWeight: 700 }}>{results ? `${results.length} opcija` : "čeka unos"}</span>
      </summary>
      {results ? (
        <div style={{ marginTop: 14, display: "grid", gap: 12 }}>
          {results.map((result) => <ResultRow key={result.id} result={result} highlighted={result.id === winner?.id} />)}
        </div>
      ) : <div style={{ marginTop: 12, color: "#64748b" }}>Popuni sve obavezne podatke o odredištu i paketima.</div>}
    </details>
  );
}
