"use client";

import { HelpCircle, MessageCircle, FileText, Mail, ExternalLink } from "lucide-react";

const faqItems = [
  { q: "Hoe start ik een nieuw gesprek?", a: "Ga naar het Dashboard en klik op 'Start Opname'. Zorg ervoor dat je microfoon is ingeschakeld." },
  { q: "Hoe lang duurt het om een transcriptie te verwerken?", a: "Gemiddeld duurt het 2-5 minuten, afhankelijk van de lengte van het gesprek." },
  { q: "Kan ik een verslag achteraf bewerken?", a: "Ja, verslagen met de status 'Concept' kunnen bewerkt worden voordat ze definitief worden gemaakt." },
  { q: "Hoe exporteer ik een verslag naar een specifiek template?", a: "Ga naar Rapportages, selecteer het gewenste verslag en kies het template waarin je het wilt exporteren." },
  { q: "Is mijn data veilig?", a: "Ja, alle gegevens worden AVG-compliant verwerkt en opgeslagen op servers binnen de EU. We zijn NEN 7510 gecertificeerd." },
];

export default function HelpPage() {
  return (
    <div>
      {/* Page header */}
      <div className="mb-8">
        <h2
          className="text-2xl font-bold text-slate-900"
          style={{ fontFamily: 'Satoshi, "Satoshi Placeholder", sans-serif' }}
        >
          Help & Ondersteuning
        </h2>
        <p className="mt-1 text-[14px] text-slate-500" style={{ fontFamily: 'Satoshi, "Satoshi Placeholder", sans-serif' }}>
          Vind antwoorden op veelgestelde vragen of neem contact op
        </p>
      </div>

      {/* Quick links */}
      <div className="mb-8 grid gap-4 md:grid-cols-3">
        <div className="rounded-2xl border border-slate-200/60 bg-white p-6 shadow-sm transition-all hover:shadow-md">
          <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-[#772d07]/10">
            <MessageCircle className="h-6 w-6 text-[#772d07]" />
          </div>
          <h3 className="mb-2 text-[15px] font-bold text-slate-900" style={{ fontFamily: 'Satoshi, "Satoshi Placeholder", sans-serif' }}>
            Live Chat
          </h3>
          <p className="mb-4 text-[13px] text-slate-500" style={{ fontFamily: 'Satoshi, "Satoshi Placeholder", sans-serif' }}>
            Chat direct met ons support team
          </p>
          <button className="text-[13px] font-semibold text-[#772d07] hover:text-[#5a2205]">
            Start chat →
          </button>
        </div>
        <div className="rounded-2xl border border-slate-200/60 bg-white p-6 shadow-sm transition-all hover:shadow-md">
          <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-[#772d07]/10">
            <Mail className="h-6 w-6 text-[#772d07]" />
          </div>
          <h3 className="mb-2 text-[15px] font-bold text-slate-900" style={{ fontFamily: 'Satoshi, "Satoshi Placeholder", sans-serif' }}>
            E-mail Support
          </h3>
          <p className="mb-4 text-[13px] text-slate-500" style={{ fontFamily: 'Satoshi, "Satoshi Placeholder", sans-serif' }}>
            Stuur ons een e-mail voor hulp
          </p>
          <button className="text-[13px] font-semibold text-[#772d07] hover:text-[#5a2205]">
            support@zorgnotitie.nl →
          </button>
        </div>
        <div className="rounded-2xl border border-slate-200/60 bg-white p-6 shadow-sm transition-all hover:shadow-md">
          <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-[#772d07]/10">
            <FileText className="h-6 w-6 text-[#772d07]" />
          </div>
          <h3 className="mb-2 text-[15px] font-bold text-slate-900" style={{ fontFamily: 'Satoshi, "Satoshi Placeholder", sans-serif' }}>
            Documentatie
          </h3>
          <p className="mb-4 text-[13px] text-slate-500" style={{ fontFamily: 'Satoshi, "Satoshi Placeholder", sans-serif' }}>
            Bekijk onze uitgebreide handleiding
          </p>
          <button className="text-[13px] font-semibold text-[#772d07] hover:text-[#5a2205]">
            Bekijk docs →
          </button>
        </div>
      </div>

      {/* FAQ */}
      <div className="rounded-2xl border border-slate-200/60 bg-white p-8 shadow-sm">
        <h3
          className="mb-6 text-lg font-bold text-slate-900"
          style={{ fontFamily: 'Satoshi, "Satoshi Placeholder", sans-serif' }}
        >
          Veelgestelde vragen
        </h3>
        <div className="space-y-4">
          {faqItems.map((item, i) => (
            <details key={i} className="group rounded-xl border border-slate-200 transition-all open:bg-[#faf6f0]">
              <summary className="flex cursor-pointer items-center justify-between px-6 py-4 text-[14px] font-semibold text-slate-800" style={{ fontFamily: 'Satoshi, "Satoshi Placeholder", sans-serif' }}>
                {item.q}
                <HelpCircle className="h-4 w-4 shrink-0 text-slate-400 transition-transform group-open:rotate-180 group-open:text-[#772d07]" />
              </summary>
              <div className="px-6 pb-4">
                <p className="text-[13px] leading-relaxed text-slate-600" style={{ fontFamily: 'Satoshi, "Satoshi Placeholder", sans-serif' }}>
                  {item.a}
                </p>
              </div>
            </details>
          ))}
        </div>
      </div>
    </div>
  );
}
