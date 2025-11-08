import AgencyCombo from "./AgencyCombo";
import KeywordInput from "./KeywordInput";
import type { Filters } from "../../utils/filters";
import Listbox from "./ListBox";
import MultiChips from "./MultiChips";

interface ParameterPanelProps {
  //   f: Filters;
  //   setF: (u: Partial<Filters>) => void;
  //   onApply: () => void;
  //   onReset: () => void;
  //   onSavePreset: () => void;
  //   onLoadPreset: () => void;
  //   applying: boolean;
  f: Filters;
  setF: (u: Partial<Filters>) => void;
  onApply: () => void;
  onReset: () => void;
  onSavePreset: () => void;
  onLoadPreset: () => void;
  applying: boolean;

  naicsOptions: string[];
  vehicleOptions: string[];
  setAsideOptions: string[];
  agencyOptions: string[];
}

export default function ParameterPanel({
  f,
  setF,
  onApply,
  onReset,
  onSavePreset,
  onLoadPreset,
  applying,
  naicsOptions,
  vehicleOptions,
  setAsideOptions,
  agencyOptions,
}: ParameterPanelProps) {
  const ceilingValid =
    f.ceilingMin === undefined ||
    f.ceilingMax === undefined ||
    f.ceilingMin <= f.ceilingMax;

  return (
    <div
      className="rounded-2xl p-5 shadow-sm space-y-5"
      style={{
        background: "var(--bg-card)",
        borderColor: "var(--border)",
      }}
    >
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-semibold ">Filters</h2>
        <div className="flex gap-2">
          <button
            className="rounded-lg border bg-gray-50 text-black px-2 py-1 text-xs
             sm:px-3 sm:py-1.5 sm:text-sm
             hover:bg-gray-100 focus:outline-none focus:ring"
            onClick={onSavePreset}
          >
            Save preset
          </button>
          <button
            className="rounded-lg border px-3 py-1.5 bg-gray-50 text-black text-sm hover:bg-gray-50 focus:outline-none focus:ring"
            onClick={onLoadPreset}
          >
            Load preset
          </button>
        </div>
      </div>

      <div className={`grid grid-cols-1 sm:grid-cols-2 gap-4 `}>
        <Listbox
          id="naics"
          label="NAICS"
          value={f.naics}
          onChange={(v) => setF({ naics: v })}
          options={naicsOptions}
        />

        <Listbox
          id="vehicle"
          label="Vehicle"
          value={f.vehicle}
          onChange={(v) => setF({ vehicle: v })}
          options={vehicleOptions}
        />

        <MultiChips
          label="Set-Aside"
          options={setAsideOptions}
          values={f.setAside}
          onToggle={(v) =>
            setF({
              setAside: f.setAside.includes(v)
                ? f.setAside.filter((x) => x !== v)
                : [...f.setAside, v],
            })
          }
        />

        <AgencyCombo
          options={agencyOptions}
          values={f.agencies}
          onAdd={(v) => setF({ agencies: [...new Set([...f.agencies, v])] })}
          onRemove={(v) =>
            setF({ agencies: f.agencies.filter((x) => x !== v) })
          }
        />

        <div>
          <label
            className="text-sm font-medium mb-1 block"
            style={{ color: "var(--text)" }}
          >
            Period
          </label>

          <div className="flex flex-wrap gap-2">
            {[30, 60, 90].map((n) => (
              <button
                key={n}
                onClick={() =>
                  setF({
                    periodQuick:
                      f.periodQuick === n ? undefined : (n as 30 | 60 | 90),
                    dateFrom: undefined,
                    dateTo: undefined,
                  })
                }
                className={`rounded-full border px-3 py-1 text-xs ${
                  f.periodQuick === n
                    ? "bg-gray-900 text-white border-gray-900"
                    : "bg-gray-100 text-gray-800 border-gray-300 hover:shadow"
                }`}
              >
                Next {n} days
              </button>
            ))}
          </div>

          <div className="mt-3 grid grid-cols-1 gap-2">
            <div>
              <label className="block text-xs" style={{ color: "var(--text)" }}>
                From
              </label>
              <input
                type="date"
                className="w-full rounded-lg border px-2 py-1.5 text-sm focus:outline-none focus:ring hover:border-gray-400"
                value={f.dateFrom || ""}
                onChange={(e) =>
                  setF({
                    dateFrom: e.target.value || undefined,
                    periodQuick: undefined,
                  })
                }
              />
            </div>
            <div>
              <label
                className="block text-xs "
                style={{ color: "var(--text)" }}
              >
                To
              </label>
              <input
                type="date"
                className="w-full rounded-lg border px-2 py-1.5 text-sm focus:outline-none focus:ring hover:border-gray-400"
                value={f.dateTo || ""}
                onChange={(e) =>
                  setF({
                    dateTo: e.target.value || undefined,
                    periodQuick: undefined,
                  })
                }
              />
            </div>
          </div>
        </div>

        <div>
          <label
            className="text-sm font-medium  mb-1 block"
            style={{ color: "var(--text)" }}
          >
            Ceiling ($)
          </label>
          <div className="grid grid-cols-2 gap-2">
            <input
              inputMode="numeric"
              className="rounded-lg border px-2 py-1.5 text-sm focus:outline-none focus:ring hover:border-gray-400"
              placeholder="Min"
              value={f.ceilingMin ?? ""}
              onChange={(e) =>
                setF({
                  ceilingMin: e.target.value
                    ? Number(e.target.value)
                    : undefined,
                })
              }
            />
            <input
              inputMode="numeric"
              className="rounded-lg border px-2 py-1.5 text-sm focus:outline-none focus:ring hover:border-gray-400"
              placeholder="Max"
              value={f.ceilingMax ?? ""}
              onChange={(e) =>
                setF({
                  ceilingMax: e.target.value
                    ? Number(e.target.value)
                    : undefined,
                })
              }
            />
          </div>
          {!ceilingValid && (
            <div className="mt-1 text-xs text-red-600">
              Minimum must be less than or equal to Maximum
            </div>
          )}
        </div>

        <div className="sm:col-span-2">
          <KeywordInput
            values={f.keywords}
            onAdd={(v) => setF({ keywords: [...new Set([...f.keywords, v])] })}
            onRemove={(v) =>
              setF({ keywords: f.keywords.filter((x) => x !== v) })
            }
          />
        </div>
      </div>

      <div className="flex gap-3">
        <button
          className="rounded-xl text-black px-4 py-2 text-sm font-medium hover:bg-black focus:outline-none focus:ring disabled:opacity-60"
          onClick={onApply}
          disabled={applying || !ceilingValid}
          style={{
            background: "var(--button-background-color) ",
            color: "var(--button-text-color)",
          }}
        >
          {applying ? "Applying…" : "Apply"}
        </button>

        <button
          className="rounded-xl border text-black px-4 py-2 text-sm hover:bg-gray-50 focus:outline-none focus:ring"
          onClick={onReset}
          style={{
            background: "var(--button-background-color) ",
            color: "var(--button-text-color)",
          }}
        >
          Reset All
        </button>
      </div>
    </div>
  );
}
