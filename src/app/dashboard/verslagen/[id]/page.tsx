"use client";

import { useSyncExternalStore, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, Play, Download, FileText, Edit, Trash2, Clock, User, Calendar, Stethoscope, Hash, PlayCircle, Save, X } from "lucide-react";
import { getGesprekken, subscribe, updateGesprek, deleteGesprek } from "../../store";

export default function GesprekDetailPage() {
  const params = useParams();
  const router = useRouter();
  const gesprekken = useSyncExternalStore(subscribe, getGesprekken, getGesprekken);
  
  const gesprekId = parseInt(params.id as string);
  const gesprek = gesprekken.find((g) => g.id === gesprekId);
  
  const handleResume = () => {
    sessionStorage.setItem('opname_returning', 'true');
    sessionStorage.setItem('resume_gesprek_id', gesprekId.toString());
    router.push('/dashboard/opname');
  };
  
  const handleEditTranscript = () => {
    sessionStorage.setItem('opname_returning', 'true');
    sessionStorage.setItem('resume_gesprek_id', gesprekId.toString());
    sessionStorage.setItem('edit_mode', 'transcript');
    router.push('/dashboard/opname');
  };
  
  const handleEditVerslag = () => {
    sessionStorage.setItem('opname_returning', 'true');
    sessionStorage.setItem('resume_gesprek_id', gesprekId.toString());
    sessionStorage.setItem('edit_mode', 'verslag');
    router.push('/dashboard/opname');
  };
  
  const handleDownloadAll = () => {
    if (!gesprek) return;
    
    let content = `VERSLAG - ${gesprek.patientName}\n`;
    content += `Gegenereerd op: ${new Date().toLocaleString('nl-NL')}\n\n`;
    content += "=".repeat(80) + "\n\n";
    
    content += `Patiënt: ${gesprek.patientName}\n`;
    content += `Patiënt-ID: ${gesprek.patientId}\n`;
    content += `Datum: ${gesprek.date} om ${gesprek.time}\n`;
    content += `Status: ${gesprek.status}\n`;
    content += `Duur: ${gesprek.duration}\n`;
    if (gesprek.specialisme) content += `Specialisme: ${gesprek.specialisme}\n`;
    if (gesprek.verslagtype) content += `Verslagtype: ${gesprek.verslagtype}\n`;
    if (gesprek.dossiernummer) content += `Dossiernummer: ${gesprek.dossiernummer}\n`;
    content += "\n" + "=".repeat(80) + "\n\n";
    
    if (gesprek.hasTranscript) {
      content += "TRANSCRIPTIE:\n";
      content += "-".repeat(80) + "\n";
      content += "[Transcriptie wordt hier weergegeven zodra deze beschikbaar is. In een productieomgeving zou hier de daadwerkelijke transcriptie staan, gegenereerd door AI.]\n\n";
      content += "=".repeat(80) + "\n\n";
    }
    
    if (gesprek.hasSummary) {
      content += "VERSLAG:\n";
      content += "-".repeat(80) + "\n";
      content += "[Verslag wordt hier weergegeven zodra deze beschikbaar is. In een productieomgeving zou hier het daadwerkelijke verslag staan, gegenereerd door AI.]\n\n";
    }
    
    const blob = new Blob([content], { type: "text/plain;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `verslag-${gesprek.patientId}-${gesprek.id}.txt`;
    a.click();
    URL.revokeObjectURL(url);
  };
  
  const handleDelete = () => {
    if (!gesprek) return;
    
    if (confirm(`Weet je zeker dat je dit verslag van ${gesprek.patientName} wilt verwijderen? Deze actie kan niet ongedaan worden gemaakt.`)) {
      deleteGesprek(gesprek.id);
      router.push('/dashboard/verslagen');
    }
  };

  if (!gesprek) {
    return (
      <div className="flex min-h-[400px] flex-col items-center justify-center">
        <p className="mb-4 text-lg text-slate-500" style={{ fontFamily: 'Satoshi, "Satoshi Placeholder", sans-serif' }}>
          Verslag niet gevonden
        </p>
        <Link
          href="/dashboard/verslagen"
          className="text-[14px] font-semibold text-[#772d07] hover:text-[#5a2205]"
          style={{ fontFamily: 'Satoshi, "Satoshi Placeholder", sans-serif' }}
        >
          ← Terug naar verslagen
        </Link>
      </div>
    );
  }

  return (
    <div>
      {/* Breadcrumb */}
      <div className="mb-6 flex items-center gap-2 text-[14px] text-slate-500" style={{ fontFamily: 'Satoshi, "Satoshi Placeholder", sans-serif' }}>
        <Link href="/dashboard" className="transition-colors hover:text-[#772d07]">
          Dashboard
        </Link>
        <span>/</span>
        <Link href="/dashboard/verslagen" className="transition-colors hover:text-[#772d07]">
          Verslagen
        </Link>
        <span>/</span>
        <span className="text-slate-800">Verslag #{gesprek.id}</span>
      </div>

      {/* Header */}
      <div className="mb-8 flex items-start justify-between">
        <div>
          <div className="mb-2 flex items-center gap-3">
            <h2
              className="text-2xl font-bold text-slate-900"
              style={{ fontFamily: 'Satoshi, "Satoshi Placeholder", sans-serif' }}
            >
              {gesprek.patientName}
            </h2>
            <span className={`inline-flex rounded-full px-3 py-1 text-[12px] font-semibold ${gesprek.statusColor}`}>
              {gesprek.status}
            </span>
          </div>
          <p className="text-[14px] text-slate-500" style={{ fontFamily: 'Satoshi, "Satoshi Placeholder", sans-serif' }}>
            Opgenomen op {gesprek.date} om {gesprek.time}
          </p>
        </div>
        <div className="flex items-center gap-3">
          {(gesprek.status === "Concept" || gesprek.status === "In Verwerking") && (
            <button
              onClick={handleResume}
              className="flex items-center gap-2 rounded-xl bg-[#772d07] px-6 py-2.5 text-[14px] font-semibold text-white transition-all hover:bg-[#5a2205] hover:shadow-lg"
              style={{ fontFamily: 'Satoshi, "Satoshi Placeholder", sans-serif' }}
            >
              <PlayCircle className="h-4 w-4" />
              Verder afmaken
            </button>
          )}
          <Link
            href="/dashboard/verslagen"
            className="flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-[14px] font-semibold text-slate-700 transition-all hover:border-[#772d07]/30 hover:text-[#772d07]"
            style={{ fontFamily: 'Satoshi, "Satoshi Placeholder", sans-serif' }}
          >
            <ArrowLeft className="h-4 w-4" />
            Terug
          </Link>
        </div>
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        {/* Main content - 2 columns */}
        <div className="space-y-6 lg:col-span-2">
          {/* Audio player card */}
          {gesprek.audioUrl && (
            <div className="rounded-2xl border border-slate-200/60 bg-white p-8 shadow-sm">
              <div className="mb-4 flex items-center gap-3">
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-[#772d07]/10">
                  <Play className="h-6 w-6 text-[#772d07]" />
                </div>
                <div>
                  <h3
                    className="text-lg font-bold text-slate-900"
                    style={{ fontFamily: 'Satoshi, "Satoshi Placeholder", sans-serif' }}
                  >
                    Audio Opname
                  </h3>
                  <p className="text-[13px] text-slate-500" style={{ fontFamily: 'Satoshi, "Satoshi Placeholder", sans-serif' }}>
                    Duur: {gesprek.duration}
                  </p>
                </div>
              </div>
              <audio controls src={gesprek.audioUrl} className="w-full rounded-xl" />
            </div>
          )}

          {!gesprek.audioUrl && (
            <div className="rounded-2xl border border-slate-200/60 bg-white p-8 shadow-sm">
              <div className="flex items-center gap-3 text-slate-400">
                <Play className="h-6 w-6" />
                <p className="text-[14px]" style={{ fontFamily: 'Satoshi, "Satoshi Placeholder", sans-serif' }}>
                  Geen audio beschikbaar voor dit verslag
                </p>
              </div>
            </div>
          )}

          {/* Transcript card */}
          <div className="rounded-2xl border border-slate-200/60 bg-white p-8 shadow-sm">
            <div className="mb-4 flex items-center justify-between">
              <h3
                className="text-lg font-bold text-slate-900"
                style={{ fontFamily: 'Satoshi, "Satoshi Placeholder", sans-serif' }}
              >
                Transcriptie
              </h3>
              {gesprek.hasTranscript && (
                <div className="flex items-center gap-2">
                  <button 
                    onClick={handleEditTranscript}
                    className="flex items-center gap-2 rounded-lg px-3 py-1.5 text-[13px] font-semibold text-[#772d07] transition-colors hover:bg-[#772d07]/5"
                  >
                    <Edit className="h-3.5 w-3.5" />
                    Bewerken
                  </button>
                  <button className="flex items-center gap-2 rounded-lg px-3 py-1.5 text-[13px] font-semibold text-[#772d07] transition-colors hover:bg-[#772d07]/5">
                    <Download className="h-3.5 w-3.5" />
                    Download
                  </button>
                </div>
              )}
            </div>
            {gesprek.hasTranscript ? (
              <div className="rounded-xl bg-[#faf6f0] p-6">
                <p className="text-[14px] leading-relaxed text-slate-700" style={{ fontFamily: 'Satoshi, "Satoshi Placeholder", sans-serif' }}>
                  [Transcriptie wordt hier weergegeven zodra deze beschikbaar is. In een productieomgeving zou hier de daadwerkelijke transcriptie staan, gegenereerd door AI.]
                </p>
              </div>
            ) : (
              <div className="rounded-xl border-2 border-dashed border-slate-200 bg-slate-50 p-8 text-center">
                <FileText className="mx-auto mb-3 h-8 w-8 text-slate-300" />
                <p className="text-[14px] text-slate-500" style={{ fontFamily: 'Satoshi, "Satoshi Placeholder", sans-serif' }}>
                  {gesprek.status === "In Verwerking"
                    ? "Transcriptie wordt verwerkt..."
                    : "Nog geen transcriptie beschikbaar"}
                </p>
              </div>
            )}
          </div>

          {/* Summary/Verslag card */}
          <div className="rounded-2xl border border-slate-200/60 bg-white p-8 shadow-sm">
            <div className="mb-4 flex items-center justify-between">
              <h3
                className="text-lg font-bold text-slate-900"
                style={{ fontFamily: 'Satoshi, "Satoshi Placeholder", sans-serif' }}
              >
                Verslag
              </h3>
              {gesprek.hasSummary && (
                <div className="flex items-center gap-2">
                  <button 
                    onClick={handleEditVerslag}
                    className="flex items-center gap-2 rounded-lg px-3 py-1.5 text-[13px] font-semibold text-[#772d07] transition-colors hover:bg-[#772d07]/5"
                  >
                    <Edit className="h-3.5 w-3.5" />
                    Bewerken
                  </button>
                  <button className="flex items-center gap-2 rounded-lg px-3 py-1.5 text-[13px] font-semibold text-[#772d07] transition-colors hover:bg-[#772d07]/5">
                    <Download className="h-3.5 w-3.5" />
                    Download
                  </button>
                </div>
              )}
            </div>
            {gesprek.hasSummary ? (
              <div>
                <p className="mb-4 text-[13px] font-semibold text-slate-600" style={{ fontFamily: 'Satoshi, "Satoshi Placeholder", sans-serif' }}>
                  {gesprek.verslagtype || "SOEP-structuur"}
                </p>
                <div className="rounded-xl bg-[#faf6f0] p-6">
                  <p className="text-[14px] leading-relaxed text-slate-700" style={{ fontFamily: 'Satoshi, "Satoshi Placeholder", sans-serif' }}>
                    [Verslag wordt hier weergegeven zodra deze beschikbaar is. In een productieomgeving zou hier het daadwerkelijke verslag staan, gegenereerd door AI.]
                  </p>
                </div>
              </div>
            ) : (
              <div className="rounded-xl border-2 border-dashed border-slate-200 bg-slate-50 p-8 text-center">
                <FileText className="mx-auto mb-3 h-8 w-8 text-slate-300" />
                <p className="text-[14px] text-slate-500" style={{ fontFamily: 'Satoshi, "Satoshi Placeholder", sans-serif' }}>
                  {gesprek.status === "In Verwerking"
                    ? "Verslag wordt gegenereerd..."
                    : "Nog geen verslag beschikbaar"}
                </p>
                {(gesprek.status === "Concept" || gesprek.status === "In Verwerking") && (
                  <button 
                    onClick={handleResume}
                    className="mt-4 flex items-center gap-2 rounded-xl bg-[#772d07] px-6 py-2.5 text-[13px] font-semibold text-white transition-all hover:bg-[#5a2205]"
                  >
                    <PlayCircle className="h-4 w-4" />
                    Verder afmaken
                  </button>
                )}
              </div>
            )}
          </div>
        </div>

        {/* Sidebar - 1 column */}
        <div className="space-y-6">
          {/* Details card */}
          <div className="rounded-2xl border border-slate-200/60 bg-white p-6 shadow-sm">
            <h3
              className="mb-4 text-[15px] font-bold text-slate-900"
              style={{ fontFamily: 'Satoshi, "Satoshi Placeholder", sans-serif' }}
            >
              Details
            </h3>
            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <User className="mt-0.5 h-4 w-4 text-slate-400" />
                <div className="flex-1">
                  <p className="text-[12px] text-slate-500" style={{ fontFamily: 'Satoshi, "Satoshi Placeholder", sans-serif' }}>
                    Patiënt-ID
                  </p>
                  <p className="text-[14px] font-semibold text-slate-800" style={{ fontFamily: 'Satoshi, "Satoshi Placeholder", sans-serif' }}>
                    {gesprek.patientId}
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <Calendar className="mt-0.5 h-4 w-4 text-slate-400" />
                <div className="flex-1">
                  <p className="text-[12px] text-slate-500" style={{ fontFamily: 'Satoshi, "Satoshi Placeholder", sans-serif' }}>
                    Datum & Tijd
                  </p>
                  <p className="text-[14px] font-semibold text-slate-800" style={{ fontFamily: 'Satoshi, "Satoshi Placeholder", sans-serif' }}>
                    {gesprek.date} om {gesprek.time}
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <Clock className="mt-0.5 h-4 w-4 text-slate-400" />
                <div className="flex-1">
                  <p className="text-[12px] text-slate-500" style={{ fontFamily: 'Satoshi, "Satoshi Placeholder", sans-serif' }}>
                    Duur
                  </p>
                  <p className="text-[14px] font-semibold text-slate-800" style={{ fontFamily: 'Satoshi, "Satoshi Placeholder", sans-serif' }}>
                    {gesprek.duration}
                  </p>
                </div>
              </div>

              {gesprek.specialisme && (
                <div className="flex items-start gap-3">
                  <Stethoscope className="mt-0.5 h-4 w-4 text-slate-400" />
                  <div className="flex-1">
                    <p className="text-[12px] text-slate-500" style={{ fontFamily: 'Satoshi, "Satoshi Placeholder", sans-serif' }}>
                      Specialisme
                    </p>
                    <p className="text-[14px] font-semibold text-slate-800" style={{ fontFamily: 'Satoshi, "Satoshi Placeholder", sans-serif' }}>
                      {gesprek.specialisme}
                    </p>
                  </div>
                </div>
              )}

              {gesprek.dossiernummer && (
                <div className="flex items-start gap-3">
                  <Hash className="mt-0.5 h-4 w-4 text-slate-400" />
                  <div className="flex-1">
                    <p className="text-[12px] text-slate-500" style={{ fontFamily: 'Satoshi, "Satoshi Placeholder", sans-serif' }}>
                      Dossiernummer
                    </p>
                    <p className="text-[14px] font-semibold text-slate-800" style={{ fontFamily: 'Satoshi, "Satoshi Placeholder", sans-serif' }}>
                      {gesprek.dossiernummer}
                    </p>
                  </div>
                </div>
              )}

              {gesprek.verslagtype && (
                <div className="flex items-start gap-3">
                  <FileText className="mt-0.5 h-4 w-4 text-slate-400" />
                  <div className="flex-1">
                    <p className="text-[12px] text-slate-500" style={{ fontFamily: 'Satoshi, "Satoshi Placeholder", sans-serif' }}>
                      Verslagtype
                    </p>
                    <p className="text-[14px] font-semibold text-slate-800" style={{ fontFamily: 'Satoshi, "Satoshi Placeholder", sans-serif' }}>
                      {gesprek.verslagtype}
                    </p>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Actions card */}
          <div className="rounded-2xl border border-slate-200/60 bg-white p-6 shadow-sm">
            <h3
              className="mb-4 text-[15px] font-bold text-slate-900"
              style={{ fontFamily: 'Satoshi, "Satoshi Placeholder", sans-serif' }}
            >
              Acties
            </h3>
            <div className="space-y-2">
              {(gesprek.status === "Concept" || gesprek.status === "In Verwerking") && (
                <button 
                  onClick={handleResume}
                  className="flex w-full items-center gap-3 rounded-xl bg-[#772d07]/5 px-4 py-3 text-[14px] font-semibold text-[#772d07] transition-all hover:bg-[#772d07]/10"
                >
                  <PlayCircle className="h-4 w-4" />
                  Verder afmaken
                </button>
              )}
              <button 
                onClick={handleDownloadAll}
                className="flex w-full items-center gap-3 rounded-xl bg-slate-50 px-4 py-3 text-[14px] font-semibold text-slate-700 transition-all hover:bg-slate-100"
              >
                <Download className="h-4 w-4" />
                Download alles
              </button>
              <button 
                onClick={handleDelete}
                className="flex w-full items-center gap-3 rounded-xl bg-red-50 px-4 py-3 text-[14px] font-semibold text-red-600 transition-all hover:bg-red-100"
              >
                <Trash2 className="h-4 w-4" />
                Verwijderen
              </button>
            </div>
          </div>

          {/* Info card */}
          <div className="rounded-2xl border border-[#772d07]/20 bg-[#faf6f0] p-6">
            <p className="text-[13px] leading-relaxed text-slate-600" style={{ fontFamily: 'Satoshi, "Satoshi Placeholder", sans-serif' }}>
              <strong className="text-[#772d07]">AVG-compliant:</strong> Deze opname wordt versleuteld opgeslagen en automatisch verwijderd na 30 dagen.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
