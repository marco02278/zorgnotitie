"use client";

import { useSyncExternalStore } from "react";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, FileText, Mic, Calendar, Clock, CheckCircle2, AlertCircle, Download, Trash2 } from "lucide-react";
import { getGesprekken, subscribe, deleteMultipleGesprekken } from "../../store";

export default function PatientDetailPage() {
  const params = useParams();
  const router = useRouter();
  const patientId = params.id as string;
  const gesprekken = useSyncExternalStore(subscribe, getGesprekken, getGesprekken);

  // Filter all gesprekken for this patient
  const patientGesprekken = gesprekken.filter((g) => g.patientId === patientId);
  
  if (patientGesprekken.length === 0) {
    return (
      <div className="flex min-h-[400px] flex-col items-center justify-center">
        <p className="mb-4 text-lg text-slate-500" style={{ fontFamily: 'Satoshi, "Satoshi Placeholder", sans-serif' }}>
          Patiënt niet gevonden
        </p>
        <Link
          href="/dashboard/patienten"
          className="text-[14px] font-semibold text-[#772d07] hover:text-[#5a2205]"
          style={{ fontFamily: 'Satoshi, "Satoshi Placeholder", sans-serif' }}
        >
          ← Terug naar patiënten
        </Link>
      </div>
    );
  }

  const patientName = patientGesprekken[0].patientName;
  const totalGesprekken = patientGesprekken.length;
  const completedGesprekken = patientGesprekken.filter(g => g.status === "Definitief").length;
  const conceptGesprekken = patientGesprekken.filter(g => g.status === "Concept").length;

  const handleDownloadAll = () => {
    // Create a text file with all verslagen data
    let content = `Dossier voor ${patientName} (ID: ${patientId})\n`;
    content += `Gegenereerd op: ${new Date().toLocaleString('nl-NL')}\n`;
    content += `Totaal aantal verslagen: ${totalGesprekken}\n\n`;
    content += "=".repeat(80) + "\n\n";

    patientGesprekken.forEach((gesprek, index) => {
      content += `VERSLAG ${index + 1}\n`;
      content += `-`.repeat(80) + "\n";
      content += `ID: ${gesprek.id}\n`;
      content += `Datum: ${gesprek.date} om ${gesprek.time}\n`;
      content += `Status: ${gesprek.status}\n`;
      content += `Duur: ${gesprek.duration}\n`;
      if (gesprek.specialisme) content += `Specialisme: ${gesprek.specialisme}\n`;
      if (gesprek.verslagtype) content += `Verslagtype: ${gesprek.verslagtype}\n`;
      if (gesprek.dossiernummer) content += `Dossiernummer: ${gesprek.dossiernummer}\n`;
      content += `Transcript beschikbaar: ${gesprek.hasTranscript ? 'Ja' : 'Nee'}\n`;
      content += `Verslag beschikbaar: ${gesprek.hasSummary ? 'Ja' : 'Nee'}\n`;
      content += "\n" + "=".repeat(80) + "\n\n";
    });

    const blob = new Blob([content], { type: "text/plain;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `dossier-${patientId}-${patientName.replace(/\s+/g, '-')}.txt`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const handleDeleteAll = () => {
    if (confirm(`Weet je zeker dat je alle ${totalGesprekken} verslag(en) van ${patientName} wilt verwijderen? Deze actie kan niet ongedaan worden gemaakt.`)) {
      const idsToDelete = patientGesprekken.map(g => g.id);
      deleteMultipleGesprekken(idsToDelete);
      router.push('/dashboard/patienten');
    }
  };

  return (
    <div>
      {/* Breadcrumb */}
      <div className="mb-6 flex items-center gap-2 text-[14px] text-slate-500" style={{ fontFamily: 'Satoshi, "Satoshi Placeholder", sans-serif' }}>
        <Link href="/dashboard" className="transition-colors hover:text-[#772d07]">
          Dashboard
        </Link>
        <span>/</span>
        <Link href="/dashboard/patienten" className="transition-colors hover:text-[#772d07]">
          Patiënten
        </Link>
        <span>/</span>
        <span className="text-slate-800">{patientName}</span>
      </div>

      {/* Header */}
      <div className="mb-8 flex items-start justify-between">
        <div className="flex items-center gap-4">
          <div className="flex h-16 w-16 items-center justify-center rounded-full bg-[#772d07]/10 text-[20px] font-bold text-[#772d07]">
            {patientName.split(" ").map(n => n[0]).join("")}
          </div>
          <div>
            <h2
              className="text-2xl font-bold text-slate-900"
              style={{ fontFamily: 'Satoshi, "Satoshi Placeholder", sans-serif' }}
            >
              {patientName}
            </h2>
            <p className="mt-1 text-[14px] text-slate-500" style={{ fontFamily: 'Satoshi, "Satoshi Placeholder", sans-serif' }}>
              Patiënt-ID: {patientId}
            </p>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <button
            onClick={handleDownloadAll}
            className="flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-[14px] font-semibold text-slate-700 transition-all hover:border-[#772d07]/30 hover:text-[#772d07]"
            style={{ fontFamily: 'Satoshi, "Satoshi Placeholder", sans-serif' }}
          >
            <Download className="h-4 w-4" />
            Download alles
          </button>
          <button
            onClick={handleDeleteAll}
            className="flex items-center gap-2 rounded-xl border border-red-200 bg-white px-4 py-2.5 text-[14px] font-semibold text-red-600 transition-all hover:border-red-300 hover:bg-red-50"
            style={{ fontFamily: 'Satoshi, "Satoshi Placeholder", sans-serif' }}
          >
            <Trash2 className="h-4 w-4" />
            Verwijderen
          </button>
          <Link
            href="/dashboard/patienten"
            className="flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-[14px] font-semibold text-slate-700 transition-all hover:border-[#772d07]/30 hover:text-[#772d07]"
            style={{ fontFamily: 'Satoshi, "Satoshi Placeholder", sans-serif' }}
          >
            <ArrowLeft className="h-4 w-4" />
            Terug
          </Link>
        </div>
      </div>

      {/* Stats */}
      <div className="mb-8 grid gap-4 md:grid-cols-3">
        <div className="rounded-2xl border border-slate-200/60 bg-white p-6 shadow-sm">
          <div className="mb-2 flex items-center gap-2">
            <FileText className="h-5 w-5 text-[#772d07]" />
            <p className="text-[13px] font-semibold text-slate-500" style={{ fontFamily: 'Satoshi, "Satoshi Placeholder", sans-serif' }}>
              Totaal Gesprekken
            </p>
          </div>
          <p className="text-3xl font-bold text-slate-900" style={{ fontFamily: 'Satoshi, "Satoshi Placeholder", sans-serif' }}>
            {totalGesprekken}
          </p>
        </div>
        <div className="rounded-2xl border border-slate-200/60 bg-white p-6 shadow-sm">
          <div className="mb-2 flex items-center gap-2">
            <CheckCircle2 className="h-5 w-5 text-emerald-600" />
            <p className="text-[13px] font-semibold text-slate-500" style={{ fontFamily: 'Satoshi, "Satoshi Placeholder", sans-serif' }}>
              Definitief
            </p>
          </div>
          <p className="text-3xl font-bold text-emerald-600" style={{ fontFamily: 'Satoshi, "Satoshi Placeholder", sans-serif' }}>
            {completedGesprekken}
          </p>
        </div>
        <div className="rounded-2xl border border-slate-200/60 bg-white p-6 shadow-sm">
          <div className="mb-2 flex items-center gap-2">
            <AlertCircle className="h-5 w-5 text-amber-600" />
            <p className="text-[13px] font-semibold text-slate-500" style={{ fontFamily: 'Satoshi, "Satoshi Placeholder", sans-serif' }}>
              Concept
            </p>
          </div>
          <p className="text-3xl font-bold text-amber-600" style={{ fontFamily: 'Satoshi, "Satoshi Placeholder", sans-serif' }}>
            {conceptGesprekken}
          </p>
        </div>
      </div>

      {/* Gesprekken list */}
      <div className="rounded-2xl border border-slate-200/60 bg-white shadow-sm">
        <div className="border-b border-slate-100 p-6">
          <h3 className="text-lg font-bold text-slate-900" style={{ fontFamily: 'Satoshi, "Satoshi Placeholder", sans-serif' }}>
            Opnames & Verslagen
          </h3>
          <p className="mt-1 text-[13px] text-slate-500" style={{ fontFamily: 'Satoshi, "Satoshi Placeholder", sans-serif' }}>
            Alle opnames en verslagen voor deze patiënt
          </p>
        </div>

        <div className="divide-y divide-slate-100">
          {patientGesprekken.map((gesprek) => (
            <Link
              key={gesprek.id}
              href={`/dashboard/verslagen/${gesprek.id}`}
              className="block p-6 transition-colors hover:bg-slate-50"
            >
              <div className="flex items-start justify-between">
                <div className="flex items-start gap-4">
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#772d07]/10">
                    <Mic className="h-5 w-5 text-[#772d07]" />
                  </div>
                  <div>
                    <div className="mb-2 flex items-center gap-3">
                      <h4 className="text-[15px] font-semibold text-slate-900" style={{ fontFamily: 'Satoshi, "Satoshi Placeholder", sans-serif' }}>
                        Verslag #{gesprek.id}
                      </h4>
                      <span className={`inline-flex rounded-full px-3 py-1 text-[12px] font-semibold ${gesprek.statusColor}`}>
                        {gesprek.status}
                      </span>
                    </div>
                    <div className="flex items-center gap-4 text-[13px] text-slate-500">
                      <div className="flex items-center gap-1.5">
                        <Calendar className="h-3.5 w-3.5" />
                        {gesprek.date}
                      </div>
                      <div className="flex items-center gap-1.5">
                        <Clock className="h-3.5 w-3.5" />
                        {gesprek.time}
                      </div>
                      <div className="flex items-center gap-1.5">
                        <FileText className="h-3.5 w-3.5" />
                        {gesprek.duration}
                      </div>
                    </div>
                    {gesprek.verslagtype && (
                      <p className="mt-2 text-[13px] text-slate-600" style={{ fontFamily: 'Satoshi, "Satoshi Placeholder", sans-serif' }}>
                        <span className="font-semibold">Type:</span> {gesprek.verslagtype}
                      </p>
                    )}
                    {gesprek.specialisme && (
                      <p className="mt-1 text-[13px] text-slate-600" style={{ fontFamily: 'Satoshi, "Satoshi Placeholder", sans-serif' }}>
                        <span className="font-semibold">Specialisme:</span> {gesprek.specialisme}
                      </p>
                    )}
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  {gesprek.hasTranscript && (
                    <div className="flex items-center gap-1 text-emerald-600">
                      <CheckCircle2 className="h-4 w-4" />
                      <span className="text-[12px] font-medium">Transcript</span>
                    </div>
                  )}
                  {gesprek.hasSummary && (
                    <div className="flex items-center gap-1 text-emerald-600">
                      <CheckCircle2 className="h-4 w-4" />
                      <span className="text-[12px] font-medium">Verslag</span>
                    </div>
                  )}
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
