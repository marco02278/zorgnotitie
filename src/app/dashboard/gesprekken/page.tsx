"use client";

import { useState, useSyncExternalStore } from "react";
import Link from "next/link";
import { Mic, Search, Filter, Download, ExternalLink, Edit, Trash2, RefreshCw, Play, FileText, CheckSquare, Square } from "lucide-react";
import { getGesprekken, subscribe, deleteGesprek, deleteMultipleGesprekken } from "../store";

export default function GesprekkenPage() {
  const gesprekken = useSyncExternalStore(subscribe, getGesprekken, getGesprekken);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterStatus, setFilterStatus] = useState("Alle");
  const [selectedIds, setSelectedIds] = useState<number[]>([]);

  const filteredGesprekken = gesprekken.filter((g) => {
    const matchesSearch = g.patientName.toLowerCase().includes(searchTerm.toLowerCase()) || g.patientId.includes(searchTerm);
    const matchesFilter = filterStatus === "Alle" || g.status === filterStatus;
    return matchesSearch && matchesFilter;
  });

  const toggleSelectAll = () => {
    if (selectedIds.length === filteredGesprekken.length) {
      setSelectedIds([]);
    } else {
      setSelectedIds(filteredGesprekken.map((g) => g.id));
    }
  };

  const toggleSelect = (id: number) => {
    setSelectedIds((prev) =>
      prev.includes(id) ? prev.filter((i) => i !== id) : [...prev, id]
    );
  };

  const handleDeleteSelected = () => {
    if (selectedIds.length === 0) return;
    if (confirm(`Weet je zeker dat je ${selectedIds.length} gesprek(ken) wilt verwijderen?`)) {
      deleteMultipleGesprekken(selectedIds);
      setSelectedIds([]);
    }
  };

  const handleDeleteSingle = (e: React.MouseEvent, id: number) => {
    e.preventDefault();
    e.stopPropagation();
    if (confirm('Weet je zeker dat je dit gesprek wilt verwijderen?')) {
      deleteGesprek(id);
      setSelectedIds((prev) => prev.filter((i) => i !== id));
    }
  };

  return (
    <div>
      {/* Page header */}
      <div className="mb-8 flex items-center justify-between">
        <div>
          <h2
            className="text-2xl font-bold text-slate-900"
            style={{ fontFamily: 'Satoshi, "Satoshi Placeholder", sans-serif' }}
          >
            Gesprekken
          </h2>
          <p className="mt-1 text-[14px] text-slate-500" style={{ fontFamily: 'Satoshi, "Satoshi Placeholder", sans-serif' }}>
            Bekijk en beheer al je opgenomen gesprekken
          </p>
        </div>
        <Link
          href="/dashboard/opname"
          className="flex items-center gap-2 rounded-xl bg-[#772d07] px-6 py-3 text-[14px] font-semibold text-white transition-all hover:bg-[#5a2205] hover:shadow-lg"
        >
          <Mic className="h-4 w-4" />
          Nieuw Gesprek
        </Link>
      </div>

      {/* Bulk actions bar */}
      {selectedIds.length > 0 && (
        <div className="mb-4 flex items-center justify-between rounded-xl border border-[#772d07]/20 bg-[#faf6f0] px-6 py-3">
          <p className="text-[14px] font-semibold text-slate-700" style={{ fontFamily: 'Satoshi, "Satoshi Placeholder", sans-serif' }}>
            {selectedIds.length} gesprek(ken) geselecteerd
          </p>
          <button
            onClick={handleDeleteSelected}
            className="flex items-center gap-2 rounded-lg bg-red-500 px-4 py-2 text-[13px] font-semibold text-white transition-all hover:bg-red-600"
            style={{ fontFamily: 'Satoshi, "Satoshi Placeholder", sans-serif' }}
          >
            <Trash2 className="h-4 w-4" />
            Verwijder geselecteerde
          </button>
        </div>
      )}

      {/* Search and filter bar */}
      <div className="mb-6 flex flex-wrap items-center gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
          <input
            type="text"
            placeholder="Zoek op patiënt naam of ID..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full rounded-xl border border-slate-200 bg-white py-3 pl-11 pr-4 text-[14px] text-slate-700 outline-none transition-colors focus:border-[#772d07]/30 focus:ring-2 focus:ring-[#772d07]/10"
            style={{ fontFamily: 'Satoshi, "Satoshi Placeholder", sans-serif' }}
          />
        </div>
        <div className="flex items-center gap-2">
          <Filter className="h-4 w-4 text-slate-400" />
          {["Alle", "Concept", "In Verwerking", "Afgerond", "Definitief"].map((status) => (
            <button
              key={status}
              onClick={() => setFilterStatus(status)}
              className={`rounded-full px-4 py-2 text-[13px] font-medium transition-all ${
                filterStatus === status
                  ? "bg-[#772d07] text-white"
                  : "bg-white text-slate-600 hover:bg-[#772d07]/5 hover:text-[#772d07]"
              }`}
              style={{ fontFamily: 'Satoshi, "Satoshi Placeholder", sans-serif' }}
            >
              {status}
            </button>
          ))}
        </div>
      </div>

      {/* Table */}
      <div className="rounded-2xl border border-slate-200/60 bg-white shadow-sm">
        {/* Table header */}
        <div className="grid grid-cols-9 gap-4 border-b border-slate-100 px-6 py-4">
          <div className="flex items-center">
            <button
              onClick={toggleSelectAll}
              className="flex h-5 w-5 items-center justify-center rounded border-2 border-slate-300 text-white transition-all hover:border-[#772d07]"
              style={{
                backgroundColor: selectedIds.length === filteredGesprekken.length && filteredGesprekken.length > 0 ? '#772d07' : 'transparent',
                borderColor: selectedIds.length === filteredGesprekken.length && filteredGesprekken.length > 0 ? '#772d07' : '#cbd5e1'
              }}
            >
              {selectedIds.length === filteredGesprekken.length && filteredGesprekken.length > 0 && (
                <CheckSquare className="h-4 w-4" />
              )}
            </button>
          </div>
          <p className="text-[13px] font-semibold text-slate-500" style={{ fontFamily: 'Satoshi, "Satoshi Placeholder", sans-serif' }}>Datum</p>
          <p className="text-[13px] font-semibold text-slate-500" style={{ fontFamily: 'Satoshi, "Satoshi Placeholder", sans-serif' }}>Tijd</p>
          <p className="text-[13px] font-semibold text-slate-500" style={{ fontFamily: 'Satoshi, "Satoshi Placeholder", sans-serif' }}>Patiënt</p>
          <p className="text-[13px] font-semibold text-slate-500" style={{ fontFamily: 'Satoshi, "Satoshi Placeholder", sans-serif' }}>ID</p>
          <p className="text-[13px] font-semibold text-slate-500" style={{ fontFamily: 'Satoshi, "Satoshi Placeholder", sans-serif' }}>Duur</p>
          <p className="text-[13px] font-semibold text-slate-500" style={{ fontFamily: 'Satoshi, "Satoshi Placeholder", sans-serif' }}>Status</p>
          <p className="text-[13px] font-semibold text-slate-500" style={{ fontFamily: 'Satoshi, "Satoshi Placeholder", sans-serif' }}>Bestanden</p>
          <p className="text-[13px] font-semibold text-slate-500" style={{ fontFamily: 'Satoshi, "Satoshi Placeholder", sans-serif' }}>Acties</p>
        </div>

        {/* Table rows */}
        <div className="divide-y divide-slate-100">
          {filteredGesprekken.map((row) => (
            <div
              key={row.id}
              className="grid grid-cols-9 items-center gap-4 px-6 py-4 transition-colors hover:bg-slate-50/50"
            >
              <div className="flex items-center">
                <button
                  onClick={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    toggleSelect(row.id);
                  }}
                  className="flex h-5 w-5 items-center justify-center rounded border-2 border-slate-300 text-white transition-all hover:border-[#772d07]"
                  style={{
                    backgroundColor: selectedIds.includes(row.id) ? '#772d07' : 'transparent',
                    borderColor: selectedIds.includes(row.id) ? '#772d07' : '#cbd5e1'
                  }}
                >
                  {selectedIds.includes(row.id) && <CheckSquare className="h-4 w-4" />}
                </button>
              </div>
              <Link href={`/dashboard/gesprekken/${row.id}`} className="contents">
              <p className="text-[14px] text-slate-700" style={{ fontFamily: 'Satoshi, "Satoshi Placeholder", sans-serif' }}>{row.date}</p>
              <p className="text-[14px] text-slate-500" style={{ fontFamily: 'Satoshi, "Satoshi Placeholder", sans-serif' }}>{row.time}</p>
              <p className="text-[14px] font-medium text-slate-800" style={{ fontFamily: 'Satoshi, "Satoshi Placeholder", sans-serif' }}>{row.patientName}</p>
              <p className="text-[14px] text-slate-500" style={{ fontFamily: 'Satoshi, "Satoshi Placeholder", sans-serif' }}>{row.patientId}</p>
              <p className="text-[14px] text-slate-500" style={{ fontFamily: 'Satoshi, "Satoshi Placeholder", sans-serif' }}>{row.duration}</p>
              <div>
                <span className={`inline-flex rounded-full px-3 py-1 text-[12px] font-semibold ${row.statusColor}`}>
                  {row.status}
                </span>
              </div>
              <div className="flex items-center gap-1.5">
                {row.hasTranscript && (
                  <span className="flex items-center gap-1 rounded-md bg-[#faf6f0] px-2 py-1 text-[11px] font-medium text-[#772d07]">
                    <FileText className="h-3 w-3" /> Transcript
                  </span>
                )}
                {row.hasSummary && (
                  <span className="flex items-center gap-1 rounded-md bg-[#faf6f0] px-2 py-1 text-[11px] font-medium text-[#772d07]">
                    <FileText className="h-3 w-3" /> Verslag
                  </span>
                )}
              </div>
              <div className="flex items-center gap-1">
                {row.audioUrl && (
                  <div className="flex h-8 w-8 items-center justify-center rounded-lg text-[#772d07] bg-[#772d07]/5" title="Audio beschikbaar">
                    <Play className="h-4 w-4" />
                  </div>
                )}
                <div className="flex h-8 w-8 items-center justify-center rounded-lg text-slate-400 transition-colors hover:bg-slate-100 hover:text-[#772d07]" title="Bekijken">
                  <ExternalLink className="h-4 w-4" />
                </div>
                <button
                  onClick={(e) => handleDeleteSingle(e, row.id)}
                  className="flex h-8 w-8 items-center justify-center rounded-lg text-slate-400 transition-colors hover:bg-red-50 hover:text-red-500"
                  title="Verwijderen"
                >
                  <Trash2 className="h-4 w-4" />
                </button>
              </div>
              </Link>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
