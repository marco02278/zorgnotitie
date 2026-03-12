"use client";

import { useState, useMemo, useSyncExternalStore } from "react";
import { Search, UserPlus, Phone, Mail, FileText, ChevronRight } from "lucide-react";
import { getGesprekken, subscribe } from "../store";
import Link from "next/link";

export default function PatientenPage() {
  const gesprekken = useSyncExternalStore(subscribe, getGesprekken, getGesprekken);
  const [searchTerm, setSearchTerm] = useState("");

  // Derive unique patients from gesprekken data
  const patienten = useMemo(() => {
    const patientMap = new Map<string, { id: string; name: string; lastVisit: string; totalGesprekken: number }>();

    gesprekken.forEach((g) => {
      const existing = patientMap.get(g.patientId);
      if (existing) {
        existing.totalGesprekken += 1;
        // Keep the most recent visit date
        if (g.date > existing.lastVisit) {
          existing.lastVisit = g.date;
        }
      } else {
        patientMap.set(g.patientId, {
          id: g.patientId,
          name: g.patientName,
          lastVisit: g.date,
          totalGesprekken: 1,
        });
      }
    });

    return Array.from(patientMap.values());
  }, [gesprekken]);

  const filtered = patienten.filter(
    (p) => p.name.toLowerCase().includes(searchTerm.toLowerCase()) || p.id.includes(searchTerm)
  );

  return (
    <div>
      {/* Page header */}
      <div className="mb-8 flex items-center justify-between">
        <div>
          <h2
            className="text-2xl font-bold text-slate-900"
            style={{ fontFamily: 'Satoshi, "Satoshi Placeholder", sans-serif' }}
          >
            Patiënten
          </h2>
          <p className="mt-1 text-[14px] text-slate-500" style={{ fontFamily: 'Satoshi, "Satoshi Placeholder", sans-serif' }}>
            Beheer je patiënten en bekijk hun gespreksgeschiedenis
          </p>
        </div>
        <button className="flex items-center gap-2 rounded-xl bg-[#772d07] px-6 py-3 text-[14px] font-semibold text-white transition-all hover:bg-[#5a2205] hover:shadow-lg">
          <UserPlus className="h-4 w-4" />
          Nieuwe Patiënt
        </button>
      </div>

      {/* Search */}
      <div className="mb-6">
        <div className="relative max-w-md">
          <Search className="absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
          <input
            type="text"
            placeholder="Zoek op naam of patiënt-ID..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full rounded-xl border border-slate-200 bg-white py-3 pl-11 pr-4 text-[14px] text-slate-700 outline-none transition-colors focus:border-[#772d07]/30 focus:ring-2 focus:ring-[#772d07]/10"
            style={{ fontFamily: 'Satoshi, "Satoshi Placeholder", sans-serif' }}
          />
        </div>
      </div>

      {/* Patient cards grid */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {filtered.map((patient) => (
          <Link
            key={patient.id}
            href={`/dashboard/patienten/${patient.id}`}
            className="group cursor-pointer rounded-2xl border border-slate-200/60 bg-white p-6 shadow-sm transition-all duration-300 hover:border-[#772d07]/20 hover:shadow-md"
          >
            <div className="mb-4 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="flex h-11 w-11 items-center justify-center rounded-full bg-[#772d07]/10 text-[15px] font-bold text-[#772d07]">
                  {patient.name.split(" ").map(n => n[0]).join("")}
                </div>
                <div>
                  <h3
                    className="text-[15px] font-bold text-slate-900"
                    style={{ fontFamily: 'Satoshi, "Satoshi Placeholder", sans-serif' }}
                  >
                    {patient.name}
                  </h3>
                  <p className="text-[12px] text-slate-500" style={{ fontFamily: 'Satoshi, "Satoshi Placeholder", sans-serif' }}>
                    ID: {patient.id}
                  </p>
                </div>
              </div>
              <span
                className="rounded-full bg-green-100 px-3 py-1 text-[11px] font-semibold text-green-700"
              >
                {patient.totalGesprekken} verslag{patient.totalGesprekken !== 1 ? "en" : ""}
              </span>
            </div>

            <div className="mb-4 grid grid-cols-2 gap-3">
              <div className="rounded-xl bg-[#faf6f0] p-3">
                <p className="text-[11px] text-slate-500" style={{ fontFamily: 'Satoshi, "Satoshi Placeholder", sans-serif' }}>Verslagen</p>
                <p className="text-[18px] font-bold text-[#772d07]" style={{ fontFamily: 'Satoshi, "Satoshi Placeholder", sans-serif' }}>
                  {patient.totalGesprekken}
                </p>
              </div>
              <div className="rounded-xl bg-[#faf6f0] p-3">
                <p className="text-[11px] text-slate-500" style={{ fontFamily: 'Satoshi, "Satoshi Placeholder", sans-serif' }}>Laatste bezoek</p>
                <p className="text-[13px] font-semibold text-slate-700" style={{ fontFamily: 'Satoshi, "Satoshi Placeholder", sans-serif' }}>
                  {patient.lastVisit}
                </p>
              </div>
            </div>

            <div className="flex items-center justify-between border-t border-slate-100 pt-4">
              <div className="flex gap-2">
                <button className="flex h-8 w-8 items-center justify-center rounded-lg text-slate-400 transition-colors hover:bg-[#772d07]/5 hover:text-[#772d07]">
                  <FileText className="h-4 w-4" />
                </button>
                <button className="flex h-8 w-8 items-center justify-center rounded-lg text-slate-400 transition-colors hover:bg-[#772d07]/5 hover:text-[#772d07]">
                  <Phone className="h-4 w-4" />
                </button>
                <button className="flex h-8 w-8 items-center justify-center rounded-lg text-slate-400 transition-colors hover:bg-[#772d07]/5 hover:text-[#772d07]">
                  <Mail className="h-4 w-4" />
                </button>
              </div>
              <ChevronRight className="h-4 w-4 text-slate-300 transition-colors group-hover:text-[#772d07]" />
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
