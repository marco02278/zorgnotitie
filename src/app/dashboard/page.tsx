"use client";

import { useSyncExternalStore } from "react";
import Link from "next/link";
import { Mic, Clock, FileText, Download, Edit, Trash2, RefreshCw, ExternalLink } from "lucide-react";
import { getGesprekken, subscribe } from "./store";

export default function DashboardPage() {
  const gesprekken = useSyncExternalStore(subscribe, getGesprekken, getGesprekken);
  const tableData = gesprekken.slice(0, 5);
  const inVerwerkingData = gesprekken.filter(g => g.status === "In Verwerking").slice(0, 2);
  const recenteGesprekkenList = gesprekken.slice(0, 3);
  
  const totalMinutes = gesprekken.reduce((sum, g) => {
    const mins = parseInt(g.duration.split(' ')[0]) || 0;
    return sum + mins;
  }, 0);
  
  const totalTranscripts = gesprekken.filter(g => g.hasTranscript).length;

  return (
    <div>
      {/* Top cards row */}
      <div className="mb-8 grid gap-6 md:grid-cols-3">
        {/* Nieuw Gesprek card */}
        <div className="rounded-2xl border border-slate-200/60 bg-white p-6 shadow-sm">
          <h3
            className="mb-4 text-lg font-bold text-slate-900"
            style={{ fontFamily: 'Satoshi, "Satoshi Placeholder", sans-serif' }}
          >
            Nieuw Gesprek Opnemen
          </h3>
          <Link
            href="/dashboard/opname"
            className="flex w-full items-center justify-center gap-3 rounded-xl bg-[#772d07] px-6 py-4 text-[15px] font-semibold text-white transition-all duration-300 hover:bg-[#5a2205] hover:shadow-lg"
          >
            <Mic className="h-5 w-5" />
            Start Opname
          </Link>
        </div>

        {/* In Verwerking card */}
        <div className="rounded-2xl border border-slate-200/60 bg-white p-6 shadow-sm">
          <div className="mb-4 flex items-center justify-between">
            <h3
              className="text-lg font-bold text-slate-900"
              style={{ fontFamily: 'Satoshi, "Satoshi Placeholder", sans-serif' }}
            >
              In Verwerking
            </h3>
            <button className="text-slate-400 hover:text-slate-600">
              <span className="text-lg tracking-wider">•••</span>
            </button>
          </div>
          <div className="space-y-3">
            {inVerwerkingData.length > 0 ? (
              inVerwerkingData.map((item, i) => (
                <div key={i} className="flex items-start gap-3">
                  <div className="mt-1.5 h-2.5 w-2.5 shrink-0 rounded-full bg-[#772d07]" />
                  <div>
                    <span
                      className="text-[14px] font-semibold text-slate-800"
                      style={{ fontFamily: 'Satoshi, "Satoshi Placeholder", sans-serif' }}
                    >
                      {item.patientName}
                    </span>
                    <span className="text-[14px] text-slate-500"> - Verslag wordt verwerkt...</span>
                  </div>
                </div>
              ))
            ) : (
              <p className="text-[14px] text-slate-400" style={{ fontFamily: 'Satoshi, "Satoshi Placeholder", sans-serif' }}>
                Geen gesprekken in verwerking
              </p>
            )}
          </div>
        </div>

        {/* Gebruiksoverzicht card */}
        <div className="rounded-2xl border border-slate-200/60 bg-white p-6 shadow-sm">
          <h3
            className="mb-4 text-lg font-bold text-slate-900"
            style={{ fontFamily: 'Satoshi, "Satoshi Placeholder", sans-serif' }}
          >
            Gebruiksoverzicht
          </h3>
          <div className="space-y-4">
            <div>
              <p className="text-[13px] text-slate-500" style={{ fontFamily: 'Satoshi, "Satoshi Placeholder", sans-serif' }}>
                Gesprekstijd deze maand:
              </p>
              <p className="text-[28px] font-bold text-[#772d07]" style={{ fontFamily: 'Satoshi, "Satoshi Placeholder", sans-serif' }}>
                {totalMinutes} minuten
              </p>
            </div>
            <div>
              <p className="text-[13px] text-slate-500" style={{ fontFamily: 'Satoshi, "Satoshi Placeholder", sans-serif' }}>
                Transcripten afgerond:
              </p>
              <p className="text-[28px] font-bold text-[#772d07]" style={{ fontFamily: 'Satoshi, "Satoshi Placeholder", sans-serif' }}>
                {totalTranscripts}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Recent Gesprekken card */}
      <div className="mb-8 rounded-2xl border border-slate-200/60 bg-white p-6 shadow-sm">
        <div className="mb-4 flex items-center justify-between">
          <h3
            className="text-lg font-bold text-slate-900"
            style={{ fontFamily: 'Satoshi, "Satoshi Placeholder", sans-serif' }}
          >
            Recent Gesprekken
          </h3>
          <button className="text-slate-400 hover:text-slate-600">
            <span className="text-lg tracking-wider">•••</span>
          </button>
        </div>
        <div className="space-y-3">
          {recenteGesprekkenList.length > 0 ? (
            recenteGesprekkenList.map((item, i) => {
              const statusColor = item.status === "Concept" ? "text-green-600" : 
                                 item.status === "In Verwerking" ? "text-amber-600" : 
                                 item.status === "Definitief" ? "text-blue-600" : "text-slate-500";
              return (
                <div key={i} className="flex items-start gap-3">
                  <div className="mt-1.5 h-2.5 w-2.5 shrink-0 rounded-full bg-[#772d07]" />
                  <p className="text-[14px] text-slate-700" style={{ fontFamily: 'Satoshi, "Satoshi Placeholder", sans-serif' }}>
                    {item.date}: {item.patientName} - <span className={statusColor}>{item.status}</span>
                  </p>
                </div>
              );
            })
          ) : (
            <p className="text-[14px] text-slate-400" style={{ fontFamily: 'Satoshi, "Satoshi Placeholder", sans-serif' }}>
              Nog geen gesprekken
            </p>
          )}
        </div>

        {/* Action buttons */}
        <div className="mt-6 flex flex-wrap gap-4">
          <Link
            href="/dashboard/gesprekken"
            className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white px-6 py-3 text-[14px] font-semibold text-slate-700 transition-all hover:border-[#772d07]/30 hover:text-[#772d07]"
            style={{ fontFamily: 'Satoshi, "Satoshi Placeholder", sans-serif' }}
          >
            ← Alle Gesprekken Bekijken
          </Link>
          <Link
            href="#"
            className="inline-flex items-center gap-2 rounded-full bg-[#772d07] px-6 py-3 text-[14px] font-semibold text-white transition-all hover:bg-[#5a2205]"
            style={{ fontFamily: 'Satoshi, "Satoshi Placeholder", sans-serif' }}
          >
            <Download className="h-4 w-4" />
            Verwerkersovereenkomst Downloaden →
          </Link>
        </div>
      </div>

      {/* Mijn Gesprekken table */}
      <div className="rounded-2xl border border-slate-200/60 bg-white p-6 shadow-sm">
        <h3
          className="mb-6 text-lg font-bold text-slate-900"
          style={{ fontFamily: 'Satoshi, "Satoshi Placeholder", sans-serif' }}
        >
          Mijn Gesprekken
        </h3>

        {/* Table header */}
        <div className="mb-2 grid grid-cols-4 border-b border-slate-100 pb-3">
          <p className="text-[13px] font-semibold text-slate-500" style={{ fontFamily: 'Satoshi, "Satoshi Placeholder", sans-serif' }}>
            Datum ↓
          </p>
          <p className="text-[13px] font-semibold text-slate-500" style={{ fontFamily: 'Satoshi, "Satoshi Placeholder", sans-serif' }}>
            Patiënt-ID
          </p>
          <p className="text-[13px] font-semibold text-slate-500" style={{ fontFamily: 'Satoshi, "Satoshi Placeholder", sans-serif' }}>
            Status
          </p>
          <p className="text-[13px] font-semibold text-slate-500" style={{ fontFamily: 'Satoshi, "Satoshi Placeholder", sans-serif' }}>
            Acties
          </p>
        </div>

        {/* Table rows */}
        <div className="divide-y divide-slate-100">
          {tableData.map((row, i) => (
            <div key={i} className="grid grid-cols-4 items-center py-4">
              <p className="text-[14px] text-slate-700" style={{ fontFamily: 'Satoshi, "Satoshi Placeholder", sans-serif' }}>
                {row.date}
              </p>
              <p className="text-[14px] text-slate-700" style={{ fontFamily: 'Satoshi, "Satoshi Placeholder", sans-serif' }}>
                {row.patientId}
              </p>
              <div>
                <span className={`inline-flex rounded-full px-3 py-1 text-[12px] font-semibold ${row.statusColor}`}>
                  {row.status}
                </span>
              </div>
              <div className="flex items-center gap-2">
                {row.status === "Concept" && (
                  <button className="flex h-8 w-8 items-center justify-center rounded-lg text-slate-400 transition-colors hover:bg-slate-100 hover:text-[#772d07]">
                    <Edit className="h-4 w-4" />
                  </button>
                )}
                {row.status === "In Verwerking" && (
                  <button className="flex h-8 w-8 items-center justify-center rounded-lg text-slate-400 transition-colors hover:bg-slate-100 hover:text-amber-600">
                    <RefreshCw className="h-4 w-4" />
                  </button>
                )}
                <button className="flex h-8 w-8 items-center justify-center rounded-lg text-slate-400 transition-colors hover:bg-slate-100 hover:text-[#772d07]">
                  <Download className="h-4 w-4" />
                </button>
                <button className="flex h-8 w-8 items-center justify-center rounded-lg text-slate-400 transition-colors hover:bg-slate-100 hover:text-[#772d07]">
                  <ExternalLink className="h-4 w-4" />
                </button>
                {row.status === "Concept" && (
                  <button className="flex h-8 w-8 items-center justify-center rounded-lg text-slate-400 transition-colors hover:bg-red-50 hover:text-red-500">
                    <Trash2 className="h-4 w-4" />
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
