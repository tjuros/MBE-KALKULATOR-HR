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

const today = () => {
  const now = new Date();
  const offset = now.getTimezoneOffset() * 60_000;
  return new Date(now.getTime() - offset).toISOString().slice(0, 10);
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

const carrierColors: Record<string, { bg: string; color: string }> = {
  MBE: { bg: "#dc2626", color: "#fff" },
  GLS: { bg: "#ffd100", color: "#062b5c" },
  DPD: { bg: "#dc0032", color: "#fff" },
  HP: { bg: "#f3c400", color: "#111827" },
  Overseas: { bg: "#ef7d00", color: "#fff" },
  InTime: { bg: "#111827", color: "#fff" },
  Lagermax: { bg: "#e31b23", color: "#fff" },
  "BOX NOW": { bg: "#7c3aed", color: "#fff" },
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
    fontWeight: 900,
    fontSize: 12,
    letterSpacing: ".02em",
  };
};

const serviceBadgeStyle = (serviceType: ServiceType): CSSProperties => {
  const styles: Record<ServiceType, { bg: string; color: string }> = {
    "MBE Economy": { bg: "#e0f2fe", color: "#075985" },
    "MBE Express": { bg: "#fee2e2", color: "#991b1b" },
    "MBE Paketomati": { bg: "#ede9fe", color: "#5b21b6" },
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
            {highlighted ? <span style={{ color: "#166534", fontWeight: 900, fontSize: 12 }}>NAJPOVOLJNIJE U GRUPI</span> : null}
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
  return (
    <div style={{ ...cardStyle(Boolean(result)), padding: 14 }}>
      <div style={{ fontSize: 12, color: "#64748b", textTransform: "uppercase", fontWeight: 900 }}>{label}</div>
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
  const [postalCode, setPostalCode] = useState("");
  const [destinationPlace, setDestinationPlace] = useState("");
  const [shippingDate, setShippingDate] = useState(today);
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

  const isReady = useMemo(() => postalCode.length === 5
    && Boolean(shippingDate)
    && (!cod || (parseNum(codAmount) ?? 0) > 0)
    && packages.every((item) => [item.weight, item.length, item.width, item.height].every((value) => (parseNum(value) ?? 0) > 0)),
  [postalCode, shippingDate, cod, codAmount, packages]);

  const placeOptions = useMemo(() => getPlaceOptions(postalCode), [postalCode]);
  const results = useMemo(() => isReady ? calculatePrices({
    postalCode,
    destinationPlace,
    packages: numericPackages,
    cod,
    codAmount: parseNum(codAmount) ?? 0,
    shippingDate,
    additionalServices,
  }) : null, [isReady, postalCode, destinationPlace, numericPackages, cod, codAmount, shippingDate, additionalServices]);

  const metrics = useMemo(() => shipmentMetrics(numericPackages), [numericPackages]);
  const inTimeZone = useMemo(() => resolveInTimeZone(postalCode, destinationPlace), [postalCode, destinationPlace]);

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
    setPostalCode("");
    setDestinationPlace("");
    setShippingDate(today());
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
              <div style={{ color: "#64748b", marginTop: 4, fontSize: isMobile ? 14 : 16 }}>Mail Boxes Etc. Križevci · domaća dostava</div>
            </div>
            <button style={{ ...buttonStyle(), minHeight: 38, padding: "8px 12px" }} onClick={resetShipment}>Reset</button>
          </div>
        </header>

        <div style={{ ...cardStyle(), display: "grid", gap: 8, padding: "12px 14px", background: "#fff" }}>
          <strong>Križevci 48260 → odredište u Hrvatskoj</strong>
          <div style={{ color: "#475569", lineHeight: 1.45 }}>
            Sve cijene su ulazne i bez PDV-a. U cijenu su uključeni ugovoreni dodatci za gorivo; samo InTime koristi višu stvarnu ili volumensku masu.
          </div>
          <div style={{ color: "#64748b", fontSize: 12 }}>Tarifna konfiguracija: 11. 8. 2026. · Datum slanja aktivira InTime sezonski dodatak u studenome i prosincu.</div>
        </div>

        <div style={{ display: "grid", gap: 14, gridTemplateColumns: isMobile ? "1fr" : "1.05fr .95fr" }}>
          <section style={cardStyle()}>
            <div style={{ display: "grid", gap: 12 }}>
              <div style={{ display: "grid", gridTemplateColumns: isMobile ? "1fr" : "1fr .8fr", gap: 10 }}>
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
                <div>
                  <label style={{ display: "block", marginBottom: 6, fontWeight: 800 }}>Datum slanja</label>
                  <input {...commonInputProps} type="date" value={shippingDate} onChange={(event) => setShippingDate(event.target.value)} style={inputStyle()} />
                </div>
              </div>

              {postalCode.length === 5 && placeOptions.length ? (
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
            <ChoiceCard label="MBE Express" result={results?.expressWinner ?? null} />
            <ChoiceCard label="MBE Paketomati" result={results?.lockerWinner ?? null} />
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

        <ResultSection title="Sve MBE Economy opcije" results={results?.economy ?? null} winner={results?.economyWinner ?? null} />
        <ResultSection title="Sve MBE Express opcije" results={results?.express ?? null} winner={results?.expressWinner ?? null} />
        <ResultSection title="MBE Paketomati" results={results?.lockers ?? null} winner={results?.lockerWinner ?? null} />
      </div>

      <div style={{ position: isMobile ? "fixed" : "sticky", left: 0, right: 0, bottom: 0, zIndex: 30, padding: isMobile ? "10px 12px calc(10px + env(safe-area-inset-bottom))" : 0, background: isMobile ? "rgba(248,250,252,.96)" : "transparent", backdropFilter: isMobile ? "blur(10px)" : "none", borderTop: isMobile ? "1px solid #e5e7eb" : "none", marginTop: 14 }}>
        <div style={{ maxWidth: 1040, margin: "0 auto" }}>
          <details style={cardStyle()}>
            <summary style={sectionSummaryStyle()}>
              <span>Pregled pošiljke</span>
              <span style={{ color: "#64748b", fontWeight: 800, display: "flex", alignItems: "center", gap: 8 }}>
                <span>{results?.overallWinner ? money(results.overallWinner.price) : "—"}</span><span style={{ fontSize: 12 }}>▾</span>
              </span>
            </summary>
            <div style={{ marginTop: 12, display: "grid", gridTemplateColumns: isMobile ? "1fr" : "1fr 1fr", gap: 8, color: "#475569" }}>
              <div>Odredište: <strong>{destinationPlace ? `${postalCode} ${destinationPlace}` : postalCode || "—"}</strong></div>
              <div>Datum slanja: <strong>{shippingDate || "—"}</strong></div>
              <div>Broj paketa: <strong>{packages.length}</strong></div>
              <div>Stvarna masa: <strong>{metrics.actualWeight.toFixed(2)} kg</strong></div>
              <div>InTime volumenska masa: <strong>{metrics.inTimeVolumetricWeight.toFixed(2)} kg</strong></div>
              <div>InTime zona: <strong>{inTimeZone ? `Z${inTimeZone}` : postalCode ? "odaberi mjesto / provjeri" : "—"}</strong></div>
              <div>Otok: <strong>{postalCode ? (destinationIsIsland(postalCode) ? "Da" : "Ne") : "—"}</strong></div>
              <div>Najniži ulaz: <strong>{results?.overallWinner ? `${results.overallWinner.name} (${money(results.overallWinner.price)})` : "—"}</strong></div>
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

function ResultSection({ title, results, winner }: { title: string; results: PriceResult[] | null; winner: PriceResult | null }) {
  return (
    <details style={cardStyle()} open>
      <summary style={sectionSummaryStyle()}>
        <span>{title}</span>
        <span style={{ color: "#64748b", fontWeight: 700 }}>{results ? `${results.length} opcija` : "čeka unos"}</span>
      </summary>
      {results ? (
        <div style={{ marginTop: 14, display: "grid", gap: 12 }}>
          {results.map((result) => <ResultRow key={result.id} result={result} highlighted={result.id === winner?.id} />)}
        </div>
      ) : <div style={{ marginTop: 12, color: "#64748b" }}>Upiši poštanski broj, datum i sve podatke o paketima.</div>}
    </details>
  );
}
