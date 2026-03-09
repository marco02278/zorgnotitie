// Persistent store using localStorage so data survives page navigation

export interface Gesprek {
  id: number;
  date: string;
  time: string;
  patientId: string;
  patientName: string;
  duration: string;
  status: "Concept" | "In Verwerking" | "Afgerond" | "Definitief";
  statusColor: string;
  hasTranscript: boolean;
  hasSummary: boolean;
  specialisme?: string;
  verslagtype?: string;
  dossiernummer?: string;
  audioUrl?: string;
}

const STORAGE_KEY = "zorgnotitie_gesprekken";

const statusColors: Record<string, string> = {
  Concept: "bg-green-100 text-green-700",
  "In Verwerking": "bg-amber-100 text-amber-700",
  Afgerond: "bg-slate-100 text-slate-600",
  Definitief: "bg-blue-100 text-blue-700",
};

const defaultGesprekken: Gesprek[] = [
  { id: 1, date: "12.04.2024", time: "14:30", patientId: "12345", patientName: "J. de Vries", duration: "23 min", status: "Concept", statusColor: statusColors["Concept"], hasTranscript: true, hasSummary: true },
  { id: 2, date: "11.04.2024", time: "10:15", patientId: "67890", patientName: "M. Bakker", duration: "18 min", status: "Afgerond", statusColor: statusColors["Afgerond"], hasTranscript: true, hasSummary: true },
  { id: 3, date: "10.04.2024", time: "16:00", patientId: "54321", patientName: "A. Jansen", duration: "31 min", status: "In Verwerking", statusColor: statusColors["In Verwerking"], hasTranscript: false, hasSummary: false },
  { id: 4, date: "09.04.2024", time: "09:45", patientId: "45678", patientName: "P. Smit", duration: "12 min", status: "Definitief", statusColor: statusColors["Definitief"], hasTranscript: true, hasSummary: true },
  { id: 5, date: "08.04.2024", time: "11:30", patientId: "99887", patientName: "L. Meijer", duration: "27 min", status: "Afgerond", statusColor: statusColors["Afgerond"], hasTranscript: true, hasSummary: true },
  { id: 6, date: "07.04.2024", time: "15:00", patientId: "33456", patientName: "K. van Dijk", duration: "45 min", status: "Definitief", statusColor: statusColors["Definitief"], hasTranscript: true, hasSummary: true },
  { id: 7, date: "05.04.2024", time: "13:20", patientId: "77654", patientName: "R. Visser", duration: "19 min", status: "Afgerond", statusColor: statusColors["Afgerond"], hasTranscript: true, hasSummary: true },
];

function loadFromStorage(): Gesprek[] {
  if (typeof window === "undefined") return defaultGesprekken;
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) return JSON.parse(stored);
  } catch {}
  return defaultGesprekken;
}

function saveToStorage(data: Gesprek[]) {
  if (typeof window === "undefined") return;
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
  } catch {}
}

let gesprekken: Gesprek[] = loadFromStorage();
let listeners: (() => void)[] = [];

function notify() {
  saveToStorage(gesprekken);
  listeners.forEach((fn) => fn());
}

export function getGesprekken(): Gesprek[] {
  return gesprekken;
}

export function addGesprek(gesprek: Omit<Gesprek, "id" | "statusColor">): Gesprek {
  const newGesprek: Gesprek = {
    ...gesprek,
    id: Date.now(),
    statusColor: statusColors[gesprek.status] || statusColors["Concept"],
  };
  gesprekken = [newGesprek, ...gesprekken];
  notify();
  return newGesprek;
}

export function deleteGesprek(id: number): void {
  gesprekken = gesprekken.filter((g) => g.id !== id);
  notify();
}

export function deleteMultipleGesprekken(ids: number[]): void {
  gesprekken = gesprekken.filter((g) => !ids.includes(g.id));
  notify();
}

export function subscribe(fn: () => void) {
  listeners.push(fn);
  return () => {
    listeners = listeners.filter((l) => l !== fn);
  };
}
