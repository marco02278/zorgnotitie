"use client";

import { useState } from "react";
import { FileText, Download, Eye, Copy, CheckCircle } from "lucide-react";

const templates = [
  { id: "intake", name: "Intake Verslag", description: "Standaard intake formulier voor nieuwe patiënten" },
  { id: "voortgang", name: "Voortgangsverslag", description: "Periodiek voortgangsverslag voor behandeltraject" },
  { id: "afsluiting", name: "Afsluitverslag", description: "Eindverslag bij afsluiting van behandeling" },
  { id: "mdoverleg", name: "MDO Verslag", description: "Multidisciplinair overleg samenvatting" },
  { id: "verwijzing", name: "Verwijsbrief", description: "Verwijzing naar andere zorgverlener" },
];

const rapportages = [
  { id: 1, patient: "J. de Vries", template: "Voortgangsverslag", date: "12.04.2024", gesprekId: "12345", status: "Gereed" },
  { id: 2, patient: "M. Bakker", template: "Intake Verslag", date: "11.04.2024", gesprekId: "67890", status: "Gereed" },
  { id: 3, patient: "A. Jansen", template: "Voortgangsverslag", date: "10.04.2024", gesprekId: "54321", status: "In Verwerking" },
  { id: 4, patient: "P. Smit", template: "Afsluitverslag", date: "09.04.2024", gesprekId: "45678", status: "Gereed" },
  { id: 5, patient: "K. van Dijk", template: "MDO Verslag", date: "07.04.2024", gesprekId: "33456", status: "Gereed" },
];

export default function RapportagesPage() {
  const [activeTab, setActiveTab] = useState<"rapportages" | "templates">("rapportages");

  return (
    <div>
      {/* Page header */}
      <div className="mb-8">
        <h2
          className="text-2xl font-bold text-slate-900"
          style={{ fontFamily: 'Satoshi, "Satoshi Placeholder", sans-serif' }}
        >
          Rapportages
        </h2>
        <p className="mt-1 text-[14px] text-slate-500" style={{ fontFamily: 'Satoshi, "Satoshi Placeholder", sans-serif' }}>
          Bekijk samenvattingen en verslagen, of pas templates aan
        </p>
      </div>

      {/* Tabs */}
      <div className="mb-6 flex gap-2">
        <button
          onClick={() => setActiveTab("rapportages")}
          className={`rounded-full px-6 py-2.5 text-[14px] font-semibold transition-all ${
            activeTab === "rapportages"
              ? "bg-[#772d07] text-white"
              : "bg-white text-slate-600 hover:bg-[#772d07]/5 hover:text-[#772d07]"
          }`}
          style={{ fontFamily: 'Satoshi, "Satoshi Placeholder", sans-serif' }}
        >
          Rapportages
        </button>
        <button
          onClick={() => setActiveTab("templates")}
          className={`rounded-full px-6 py-2.5 text-[14px] font-semibold transition-all ${
            activeTab === "templates"
              ? "bg-[#772d07] text-white"
              : "bg-white text-slate-600 hover:bg-[#772d07]/5 hover:text-[#772d07]"
          }`}
          style={{ fontFamily: 'Satoshi, "Satoshi Placeholder", sans-serif' }}
        >
          Templates
        </button>
      </div>

      {activeTab === "rapportages" ? (
        /* Rapportages list */
        <div className="rounded-2xl border border-slate-200/60 bg-white shadow-sm">
          {/* Table header */}
          <div className="grid grid-cols-6 gap-4 border-b border-slate-100 px-6 py-4">
            <p className="text-[13px] font-semibold text-slate-500" style={{ fontFamily: 'Satoshi, "Satoshi Placeholder", sans-serif' }}>Patiënt</p>
            <p className="text-[13px] font-semibold text-slate-500" style={{ fontFamily: 'Satoshi, "Satoshi Placeholder", sans-serif' }}>Template</p>
            <p className="text-[13px] font-semibold text-slate-500" style={{ fontFamily: 'Satoshi, "Satoshi Placeholder", sans-serif' }}>Datum</p>
            <p className="text-[13px] font-semibold text-slate-500" style={{ fontFamily: 'Satoshi, "Satoshi Placeholder", sans-serif' }}>Gesprek ID</p>
            <p className="text-[13px] font-semibold text-slate-500" style={{ fontFamily: 'Satoshi, "Satoshi Placeholder", sans-serif' }}>Status</p>
            <p className="text-[13px] font-semibold text-slate-500" style={{ fontFamily: 'Satoshi, "Satoshi Placeholder", sans-serif' }}>Acties</p>
          </div>

          <div className="divide-y divide-slate-100">
            {rapportages.map((row) => (
              <div key={row.id} className="grid grid-cols-6 items-center gap-4 px-6 py-4 transition-colors hover:bg-slate-50/50">
                <p className="text-[14px] font-medium text-slate-800" style={{ fontFamily: 'Satoshi, "Satoshi Placeholder", sans-serif' }}>{row.patient}</p>
                <p className="text-[14px] text-slate-600" style={{ fontFamily: 'Satoshi, "Satoshi Placeholder", sans-serif' }}>{row.template}</p>
                <p className="text-[14px] text-slate-500" style={{ fontFamily: 'Satoshi, "Satoshi Placeholder", sans-serif' }}>{row.date}</p>
                <p className="text-[14px] text-slate-500" style={{ fontFamily: 'Satoshi, "Satoshi Placeholder", sans-serif' }}>{row.gesprekId}</p>
                <div>
                  <span
                    className={`inline-flex items-center gap-1 rounded-full px-3 py-1 text-[12px] font-semibold ${
                      row.status === "Gereed" ? "bg-green-100 text-green-700" : "bg-amber-100 text-amber-700"
                    }`}
                  >
                    {row.status === "Gereed" && <CheckCircle className="h-3 w-3" />}
                    {row.status}
                  </span>
                </div>
                <div className="flex items-center gap-1">
                  <button className="flex h-8 w-8 items-center justify-center rounded-lg text-slate-400 transition-colors hover:bg-slate-100 hover:text-[#772d07]" title="Bekijken">
                    <Eye className="h-4 w-4" />
                  </button>
                  <button className="flex h-8 w-8 items-center justify-center rounded-lg text-slate-400 transition-colors hover:bg-slate-100 hover:text-[#772d07]" title="Downloaden">
                    <Download className="h-4 w-4" />
                  </button>
                  <button className="flex h-8 w-8 items-center justify-center rounded-lg text-slate-400 transition-colors hover:bg-slate-100 hover:text-[#772d07]" title="Kopiëren">
                    <Copy className="h-4 w-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      ) : (
        /* Templates grid */
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {templates.map((template) => (
            <div
              key={template.id}
              className="group cursor-pointer rounded-2xl border border-slate-200/60 bg-white p-6 shadow-sm transition-all duration-300 hover:border-[#772d07]/20 hover:shadow-md"
            >
              <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-[#772d07]/10">
                <FileText className="h-6 w-6 text-[#772d07]" />
              </div>
              <h3
                className="mb-2 text-[16px] font-bold text-slate-900"
                style={{ fontFamily: 'Satoshi, "Satoshi Placeholder", sans-serif' }}
              >
                {template.name}
              </h3>
              <p
                className="mb-4 text-[13px] text-slate-500"
                style={{ fontFamily: 'Satoshi, "Satoshi Placeholder", sans-serif' }}
              >
                {template.description}
              </p>
              <button
                className="text-[13px] font-semibold text-[#772d07] transition-colors hover:text-[#5a2205]"
                style={{ fontFamily: 'Satoshi, "Satoshi Placeholder", sans-serif' }}
              >
                Template bekijken →
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
