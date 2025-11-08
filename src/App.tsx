import React, { useState, useMemo, useEffect } from "react";
import Dashboard from "./components/dashboard/Dashboard";
import ParameterPanel from "./components/filters/ParameterPanel";
import DetailsDrawer from "./components/drawer/DetailsDrawer";
import { useToasts } from "./hooks/useToasts";
import { Toasts } from "./components/ui/Toasts";
import { matches, type Filters } from "./utils/filters";
import { APPLICATIONS, type Application } from "./data/application";
import ResultsList from "./components/results/ResultList";
import { useTheme } from "./hooks/useTheme";

export default function App() {
  const { toasts, push } = useToasts();

  const { theme, toggle } = useTheme();
  const [working, setWorking] = useState<Filters>({
    setAside: [],
    agencies: [],
    keywords: [],
  });
  const [applied, setApplied] = useState<Filters>({
    setAside: [],
    agencies: [],
    keywords: [],
  });

  const [sort, setSort] = useState("due");

  const [loading, setLoading] = useState(false);

  const [drawer, setDrawer] = useState<Application | null>(null);

  const ALL_NAICS = useMemo(
    () => [...new Set(APPLICATIONS.map((a) => a.naics))].sort(),
    []
  );
  const ALL_VEHICLES = useMemo(
    () => [...new Set(APPLICATIONS.map((a) => a.vehicle))].sort(),
    []
  );
  const ALL_SET_ASIDES = useMemo(
    () => [...new Set(APPLICATIONS.flatMap((a) => a.setAside))].sort(),
    []
  );

  const ALL_AGENCIES = useMemo(
    () => [...new Set(APPLICATIONS.map((a) => a.agency))].sort(),
    []
  );

  useEffect(() => {
    const saved = localStorage.getItem("gsa-filters-applied");
    if (saved) {
      const parsed = JSON.parse(saved);
      setWorking(parsed);
      setApplied(parsed);
    }
  }, []);

  function mergeWorking(update: Partial<Filters>) {
    setWorking((prev) => ({ ...prev, ...update }));
  }

  function onApply() {
    setLoading(true);
    setTimeout(() => {
      setApplied(working);

      localStorage.setItem("gsa-filters-applied", JSON.stringify(working));
      setLoading(false);
    }, 400);
  }

  function onReset() {
    const cleared: Filters = { setAside: [], agencies: [], keywords: [] };
    setWorking(cleared);
    setApplied(cleared);
    localStorage.removeItem("gsa-filters-applied");
  }

  function onSavePreset() {
    const name = window.prompt("Preset name?")?.trim();
    if (!name) return;
    const presets = JSON.parse(localStorage.getItem("gsa-presets") || "{}");
    presets[name] = working;
    localStorage.setItem("gsa-presets", JSON.stringify(presets));
    push("Preset saved.");
  }

  function onLoadPreset() {
    const presets = JSON.parse(localStorage.getItem("gsa-presets") || "{}");
    const names = Object.keys(presets);
    if (!names.length) return push("No presets saved yet.");

    const choice = window.prompt(`Enter preset name:\n${names.join(", ")}`);
    if (!choice || !presets[choice]) return push("Preset not found.");

    setWorking(presets[choice]);
    push("Preset loaded.");
  }

  const results = useMemo(
    () => APPLICATIONS.filter((a) => matches(a, applied)),
    [applied]
  );

  function markSubmitted(id: string) {
    const i = APPLICATIONS.findIndex((a) => a.id === id);
    if (i >= 0) {
      APPLICATIONS[i] = {
        ...APPLICATIONS[i],
        status: "Submitted",
        percentComplete: 100,
      };
      push("Marked as Submitted.");
      setDrawer({ ...APPLICATIONS[i] });
    }
  }

  return (
    <div className="min-h-screen ">
      <header
        style={{ background: "var(--bg)" }}
        className="flex justify-between px-4 py-4"
      >
        <div>
          <h6 className="text-xl font-bold" style={{ color: "var(--text)" }}>
            GSA Dashboard
          </h6>
        </div>
        <button
          onClick={toggle}
          className="rounded-lg px-3 py-1.5 border transition"
          style={{
            background: "var(--button-background-color) ",
            color: "var(--button-text-color)",
          }}
        >
          {theme === "light" ? "🌙 Dark Mode" : "☀ Light Mode"}
        </button>
      </header>

      <main className=" px-4 py-6 grid gap-4 lg:grid-cols-3">
        <div>
          <ParameterPanel
            f={working}
            setF={mergeWorking}
            onApply={onApply}
            onReset={onReset}
            onSavePreset={onSavePreset}
            onLoadPreset={onLoadPreset}
            applying={loading}
            naicsOptions={ALL_NAICS}
            vehicleOptions={ALL_VEHICLES}
            setAsideOptions={ALL_SET_ASIDES}
            agencyOptions={ALL_AGENCIES}
          />
        </div>
        <div className="lg:col-span-2 space-y-4">
          <Dashboard items={results} />

          {loading ? (
            <div className="rounded-xl border bg-white p-6 animate-pulse text-center text-gray-500">
              Loading results…
            </div>
          ) : (
            <ResultsList
              items={results}
              sort={sort}
              setSort={setSort}
              onOpen={setDrawer}
            />
          )}
        </div>
      </main>

      <DetailsDrawer
        app={drawer}
        onClose={() => setDrawer(null)}
        onMarkSubmitted={markSubmitted}
      />

      <Toasts toasts={toasts} />
    </div>
  );
}
