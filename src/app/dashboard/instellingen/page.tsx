"use client";

import { useState } from "react";
import { User, Lock, Bell, Globe, Shield, Save } from "lucide-react";

export default function InstellingenPage() {
  const [activeTab, setActiveTab] = useState("profiel");

  const tabs = [
    { id: "profiel", label: "Profiel", icon: User },
    { id: "beveiliging", label: "Beveiliging", icon: Lock },
    { id: "meldingen", label: "Meldingen", icon: Bell },
    { id: "taal", label: "Taal & Regio", icon: Globe },
    { id: "privacy", label: "Privacy", icon: Shield },
  ];

  return (
    <div>
      {/* Page header */}
      <div className="mb-8">
        <h2
          className="text-2xl font-bold text-slate-900"
          style={{ fontFamily: 'Satoshi, "Satoshi Placeholder", sans-serif' }}
        >
          Instellingen
        </h2>
        <p className="mt-1 text-[14px] text-slate-500" style={{ fontFamily: 'Satoshi, "Satoshi Placeholder", sans-serif' }}>
          Beheer je account en voorkeuren
        </p>
      </div>

      <div className="flex gap-8">
        {/* Settings sidebar */}
        <div className="w-[220px] shrink-0">
          <div className="space-y-1">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex w-full items-center gap-3 rounded-xl px-4 py-3 text-[14px] font-medium transition-all ${
                  activeTab === tab.id
                    ? "bg-[#772d07]/10 text-[#772d07]"
                    : "text-slate-600 hover:bg-slate-50 hover:text-slate-900"
                }`}
                style={{ fontFamily: 'Satoshi, "Satoshi Placeholder", sans-serif' }}
              >
                <tab.icon className="h-4 w-4" />
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        {/* Settings content */}
        <div className="flex-1">
          {activeTab === "profiel" && (
            <div className="rounded-2xl border border-slate-200/60 bg-white p-8 shadow-sm">
              <h3
                className="mb-6 text-lg font-bold text-slate-900"
                style={{ fontFamily: 'Satoshi, "Satoshi Placeholder", sans-serif' }}
              >
                Profiel informatie
              </h3>

              <div className="mb-8 flex items-center gap-6">
                <div className="flex h-20 w-20 items-center justify-center rounded-2xl bg-[#772d07]/10 text-2xl font-bold text-[#772d07]">
                  DJ
                </div>
                <div>
                  <button
                    className="rounded-xl bg-[#772d07] px-5 py-2.5 text-[13px] font-semibold text-white transition-all hover:bg-[#5a2205]"
                    style={{ fontFamily: 'Satoshi, "Satoshi Placeholder", sans-serif' }}
                  >
                    Foto wijzigen
                  </button>
                </div>
              </div>

              <div className="grid gap-6 md:grid-cols-2">
                <div>
                  <label className="mb-2 block text-[13px] font-semibold text-slate-600" style={{ fontFamily: 'Satoshi, "Satoshi Placeholder", sans-serif' }}>
                    Voornaam
                  </label>
                  <input
                    type="text"
                    defaultValue="Dr."
                    className="w-full rounded-xl border border-slate-200 px-4 py-3 text-[14px] text-slate-700 outline-none transition-colors focus:border-[#772d07]/30 focus:ring-2 focus:ring-[#772d07]/10"
                    style={{ fontFamily: 'Satoshi, "Satoshi Placeholder", sans-serif' }}
                  />
                </div>
                <div>
                  <label className="mb-2 block text-[13px] font-semibold text-slate-600" style={{ fontFamily: 'Satoshi, "Satoshi Placeholder", sans-serif' }}>
                    Achternaam
                  </label>
                  <input
                    type="text"
                    defaultValue="Janssen"
                    className="w-full rounded-xl border border-slate-200 px-4 py-3 text-[14px] text-slate-700 outline-none transition-colors focus:border-[#772d07]/30 focus:ring-2 focus:ring-[#772d07]/10"
                    style={{ fontFamily: 'Satoshi, "Satoshi Placeholder", sans-serif' }}
                  />
                </div>
                <div>
                  <label className="mb-2 block text-[13px] font-semibold text-slate-600" style={{ fontFamily: 'Satoshi, "Satoshi Placeholder", sans-serif' }}>
                    E-mailadres
                  </label>
                  <input
                    type="email"
                    defaultValue="dr.janssen@praktijk.nl"
                    className="w-full rounded-xl border border-slate-200 px-4 py-3 text-[14px] text-slate-700 outline-none transition-colors focus:border-[#772d07]/30 focus:ring-2 focus:ring-[#772d07]/10"
                    style={{ fontFamily: 'Satoshi, "Satoshi Placeholder", sans-serif' }}
                  />
                </div>
                <div>
                  <label className="mb-2 block text-[13px] font-semibold text-slate-600" style={{ fontFamily: 'Satoshi, "Satoshi Placeholder", sans-serif' }}>
                    Functie
                  </label>
                  <input
                    type="text"
                    defaultValue="Psycholoog"
                    className="w-full rounded-xl border border-slate-200 px-4 py-3 text-[14px] text-slate-700 outline-none transition-colors focus:border-[#772d07]/30 focus:ring-2 focus:ring-[#772d07]/10"
                    style={{ fontFamily: 'Satoshi, "Satoshi Placeholder", sans-serif' }}
                  />
                </div>
                <div className="md:col-span-2">
                  <label className="mb-2 block text-[13px] font-semibold text-slate-600" style={{ fontFamily: 'Satoshi, "Satoshi Placeholder", sans-serif' }}>
                    Organisatie
                  </label>
                  <input
                    type="text"
                    defaultValue="Praktijk Janssen & Partners"
                    className="w-full rounded-xl border border-slate-200 px-4 py-3 text-[14px] text-slate-700 outline-none transition-colors focus:border-[#772d07]/30 focus:ring-2 focus:ring-[#772d07]/10"
                    style={{ fontFamily: 'Satoshi, "Satoshi Placeholder", sans-serif' }}
                  />
                </div>
              </div>

              <div className="mt-8 flex justify-end">
                <button className="flex items-center gap-2 rounded-xl bg-[#772d07] px-6 py-3 text-[14px] font-semibold text-white transition-all hover:bg-[#5a2205] hover:shadow-lg">
                  <Save className="h-4 w-4" />
                  Opslaan
                </button>
              </div>
            </div>
          )}

          {activeTab === "beveiliging" && (
            <div className="rounded-2xl border border-slate-200/60 bg-white p-8 shadow-sm">
              <h3
                className="mb-6 text-lg font-bold text-slate-900"
                style={{ fontFamily: 'Satoshi, "Satoshi Placeholder", sans-serif' }}
              >
                Beveiliging
              </h3>
              <div className="space-y-6">
                <div className="rounded-xl border border-slate-200 p-6">
                  <h4 className="mb-2 text-[15px] font-semibold text-slate-800" style={{ fontFamily: 'Satoshi, "Satoshi Placeholder", sans-serif' }}>
                    Wachtwoord wijzigen
                  </h4>
                  <p className="mb-4 text-[13px] text-slate-500" style={{ fontFamily: 'Satoshi, "Satoshi Placeholder", sans-serif' }}>
                    Laatst gewijzigd: 15 dagen geleden
                  </p>
                  <button className="rounded-xl border border-[#772d07] px-5 py-2.5 text-[13px] font-semibold text-[#772d07] transition-all hover:bg-[#772d07]/5">
                    Wachtwoord wijzigen
                  </button>
                </div>
                <div className="rounded-xl border border-slate-200 p-6">
                  <h4 className="mb-2 text-[15px] font-semibold text-slate-800" style={{ fontFamily: 'Satoshi, "Satoshi Placeholder", sans-serif' }}>
                    Twee-factor authenticatie
                  </h4>
                  <p className="mb-4 text-[13px] text-slate-500" style={{ fontFamily: 'Satoshi, "Satoshi Placeholder", sans-serif' }}>
                    Voeg een extra beveiligingslaag toe aan uw account
                  </p>
                  <button className="rounded-xl bg-[#772d07] px-5 py-2.5 text-[13px] font-semibold text-white transition-all hover:bg-[#5a2205]">
                    Activeren
                  </button>
                </div>
                <div className="rounded-xl border border-slate-200 p-6">
                  <h4 className="mb-2 text-[15px] font-semibold text-slate-800" style={{ fontFamily: 'Satoshi, "Satoshi Placeholder", sans-serif' }}>
                    Actieve sessies
                  </h4>
                  <p className="mb-4 text-[13px] text-slate-500" style={{ fontFamily: 'Satoshi, "Satoshi Placeholder", sans-serif' }}>
                    1 actieve sessie op dit apparaat
                  </p>
                  <button className="rounded-xl border border-red-300 px-5 py-2.5 text-[13px] font-semibold text-red-600 transition-all hover:bg-red-50">
                    Alle sessies beëindigen
                  </button>
                </div>
              </div>
            </div>
          )}

          {activeTab === "meldingen" && (
            <div className="rounded-2xl border border-slate-200/60 bg-white p-8 shadow-sm">
              <h3
                className="mb-6 text-lg font-bold text-slate-900"
                style={{ fontFamily: 'Satoshi, "Satoshi Placeholder", sans-serif' }}
              >
                Meldingen
              </h3>
              <div className="space-y-4">
                {[
                  { label: "Verslag gereed", desc: "Ontvang een melding wanneer een verslag klaar is" },
                  { label: "Nieuwe transcriptie", desc: "Melding bij voltooide transcripties" },
                  { label: "Systeem updates", desc: "Updates over nieuwe functies en verbeteringen" },
                  { label: "E-mail notificaties", desc: "Ontvang meldingen via e-mail" },
                ].map((item, i) => (
                  <div key={i} className="flex items-center justify-between rounded-xl border border-slate-200 p-5">
                    <div>
                      <h4 className="text-[14px] font-semibold text-slate-800" style={{ fontFamily: 'Satoshi, "Satoshi Placeholder", sans-serif' }}>
                        {item.label}
                      </h4>
                      <p className="text-[13px] text-slate-500" style={{ fontFamily: 'Satoshi, "Satoshi Placeholder", sans-serif' }}>
                        {item.desc}
                      </p>
                    </div>
                    <label className="relative inline-flex cursor-pointer items-center">
                      <input type="checkbox" defaultChecked={i < 2} className="peer sr-only" />
                      <div className="peer h-6 w-11 rounded-full bg-slate-200 after:absolute after:left-[2px] after:top-[2px] after:h-5 after:w-5 after:rounded-full after:bg-white after:transition-all after:content-[''] peer-checked:bg-[#772d07] peer-checked:after:translate-x-full"></div>
                    </label>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === "taal" && (
            <div className="rounded-2xl border border-slate-200/60 bg-white p-8 shadow-sm">
              <h3
                className="mb-6 text-lg font-bold text-slate-900"
                style={{ fontFamily: 'Satoshi, "Satoshi Placeholder", sans-serif' }}
              >
                Taal & Regio
              </h3>
              <div className="space-y-6">
                <div>
                  <label className="mb-2 block text-[13px] font-semibold text-slate-600" style={{ fontFamily: 'Satoshi, "Satoshi Placeholder", sans-serif' }}>
                    Taal
                  </label>
                  <select className="w-full max-w-xs rounded-xl border border-slate-200 px-4 py-3 text-[14px] text-slate-700 outline-none focus:border-[#772d07]/30 focus:ring-2 focus:ring-[#772d07]/10">
                    <option>Nederlands</option>
                    <option>English</option>
                    <option>Deutsch</option>
                  </select>
                </div>
                <div>
                  <label className="mb-2 block text-[13px] font-semibold text-slate-600" style={{ fontFamily: 'Satoshi, "Satoshi Placeholder", sans-serif' }}>
                    Tijdzone
                  </label>
                  <select className="w-full max-w-xs rounded-xl border border-slate-200 px-4 py-3 text-[14px] text-slate-700 outline-none focus:border-[#772d07]/30 focus:ring-2 focus:ring-[#772d07]/10">
                    <option>Europe/Amsterdam (CET)</option>
                    <option>Europe/London (GMT)</option>
                  </select>
                </div>
                <div>
                  <label className="mb-2 block text-[13px] font-semibold text-slate-600" style={{ fontFamily: 'Satoshi, "Satoshi Placeholder", sans-serif' }}>
                    Datumformaat
                  </label>
                  <select className="w-full max-w-xs rounded-xl border border-slate-200 px-4 py-3 text-[14px] text-slate-700 outline-none focus:border-[#772d07]/30 focus:ring-2 focus:ring-[#772d07]/10">
                    <option>DD.MM.YYYY</option>
                    <option>MM/DD/YYYY</option>
                    <option>YYYY-MM-DD</option>
                  </select>
                </div>
              </div>
            </div>
          )}

          {activeTab === "privacy" && (
            <div className="rounded-2xl border border-slate-200/60 bg-white p-8 shadow-sm">
              <h3
                className="mb-6 text-lg font-bold text-slate-900"
                style={{ fontFamily: 'Satoshi, "Satoshi Placeholder", sans-serif' }}
              >
                Privacy & Gegevens
              </h3>
              <div className="space-y-6">
                <div className="rounded-xl bg-[#faf6f0] p-6">
                  <div className="mb-2 flex items-center gap-2">
                    <Shield className="h-5 w-5 text-[#772d07]" />
                    <h4 className="text-[15px] font-semibold text-[#772d07]" style={{ fontFamily: 'Satoshi, "Satoshi Placeholder", sans-serif' }}>
                      AVG-compliant
                    </h4>
                  </div>
                  <p className="text-[13px] text-slate-600" style={{ fontFamily: 'Satoshi, "Satoshi Placeholder", sans-serif' }}>
                    Uw gegevens worden verwerkt volgens de AVG. Alle data wordt opgeslagen binnen de EU.
                  </p>
                </div>
                <div className="rounded-xl border border-slate-200 p-6">
                  <h4 className="mb-2 text-[15px] font-semibold text-slate-800" style={{ fontFamily: 'Satoshi, "Satoshi Placeholder", sans-serif' }}>
                    Gegevens exporteren
                  </h4>
                  <p className="mb-4 text-[13px] text-slate-500" style={{ fontFamily: 'Satoshi, "Satoshi Placeholder", sans-serif' }}>
                    Download een kopie van al uw gegevens
                  </p>
                  <button className="rounded-xl border border-[#772d07] px-5 py-2.5 text-[13px] font-semibold text-[#772d07] transition-all hover:bg-[#772d07]/5">
                    Gegevens exporteren
                  </button>
                </div>
                <div className="rounded-xl border border-red-200 p-6">
                  <h4 className="mb-2 text-[15px] font-semibold text-red-700" style={{ fontFamily: 'Satoshi, "Satoshi Placeholder", sans-serif' }}>
                    Account verwijderen
                  </h4>
                  <p className="mb-4 text-[13px] text-slate-500" style={{ fontFamily: 'Satoshi, "Satoshi Placeholder", sans-serif' }}>
                    Dit verwijdert permanent al uw gegevens en kan niet ongedaan worden gemaakt.
                  </p>
                  <button className="rounded-xl border border-red-300 px-5 py-2.5 text-[13px] font-semibold text-red-600 transition-all hover:bg-red-50">
                    Account verwijderen
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
