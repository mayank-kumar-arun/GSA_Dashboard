import type { Application } from "../data/application";

export interface Filters {
  naics?: string;
  setAside: string[];
  vehicle?: string;
  agencies: string[];
  periodQuick?: 30 | 60 | 90;
  dateFrom?: string;
  dateTo?: string;
  ceilingMin?: number;
  ceilingMax?: number;
  keywords: string[];
}

export function matches(app: Application, f: Filters): boolean {
  if (f.naics && app.naics !== f.naics) return false;
  if (f.setAside.length && !f.setAside.some(s => app.setAside.includes(s))) return false;
  if (f.vehicle && app.vehicle !== f.vehicle) return false;
  if (f.agencies.length && !f.agencies.includes(app.agency)) return false;

  let from = f.dateFrom;
  let to = f.dateTo;
  if (f.periodQuick) {
    const today = new Date().toISOString().slice(0, 10);
    const d = new Date();
    d.setDate(d.getDate() + f.periodQuick);
    from = today;
    to = d.toISOString().slice(0, 10);
  }
  if (from && app.dueDate < from) return false;
  if (to && app.dueDate > to) return false;

  if (typeof f.ceilingMin === "number" && app.ceiling < f.ceilingMin) return false;
  if (typeof f.ceilingMax === "number" && app.ceiling > f.ceilingMax) return false;

  if (f.keywords.length) {
    const t = app.title.toLowerCase();
    const ks = app.keywords.map(k => k.toLowerCase());
    if (!f.keywords.some(k => t.includes(k.toLowerCase()) || ks.includes(k.toLowerCase()))) return false;
  }

  return true;
}
