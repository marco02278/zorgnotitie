"use client";

import { Plug, ArrowRight, CheckCircle2 } from "lucide-react";
import Image from "next/image";
import Container from "@/components/ui/Container";

const integrations = [
  {
    name: "HiX",
    logo: "https://images.unsplash.com/photo-1633409361618-c73427e4e206?auto=format&fit=crop&w=200&q=80",
    description: "Directe koppeling met ChipSoft HiX EPD",
  },
  {
    name: "Medicom",
    logo: "https://images.unsplash.com/photo-1611162617474-5b21e879e113?auto=format&fit=crop&w=200&q=80",
    description: "Naadloze integratie met Medicom",
  },
  {
    name: "Nedap",
    logo: "https://images.unsplash.com/photo-1614064641938-3bbee52942c7?auto=format&fit=crop&w=200&q=80",
    description: "Automatische sync met Nedap Ons",
  },
  {
    name: "Zorgdomein",
    logo: "https://images.unsplash.com/photo-1618044733300-9472054094ee?auto=format&fit=crop&w=200&q=80",
    description: "Koppeling met Zorgdomein platform",
  },
  {
    name: "Epic",
    logo: "https://images.unsplash.com/photo-1614064548237-d3c8c4e4e8e8?auto=format&fit=crop&w=200&q=80",
    description: "Integratie met Epic Systems",
  },
  {
    name: "Custom API",
    logo: "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?auto=format&fit=crop&w=200&q=80",
    description: "Uw eigen EPD-systeem via API",
  },
];

const features = [
  "Automatische synchronisatie van verslagen",
  "Bidirectionele data-uitwisseling",
  "Real-time updates in uw EPD",
  "Veilige HL7/FHIR standaarden",
  "Geen handmatige invoer meer nodig",
];

export default function APIIntegrations() {
  return (
    <section className="py-16 lg:py-24">
      <Container>
        <div className="grid gap-12 lg:grid-cols-2 lg:gap-16">
          {/* Left: Content */}
          <div>
            <div className="mb-6 inline-flex items-center gap-2 rounded-full bg-[#772d07]/10 px-4 py-2">
              <Plug className="h-4 w-4 text-[#772d07]" />
              <span
                className="text-sm font-semibold text-[#772d07]"
                style={{ fontFamily: 'Satoshi, "Satoshi Placeholder", sans-serif' }}
              >
                API Integraties
              </span>
            </div>

            <h2
              className="mb-6 text-4xl font-bold text-slate-900 sm:text-5xl"
              style={{ fontFamily: 'Satoshi, "Satoshi Placeholder", sans-serif' }}
            >
              Naadloos gekoppeld aan uw EPD
            </h2>

            <p
              className="mb-8 text-lg leading-relaxed text-slate-600"
              style={{ fontFamily: 'Satoshi, "Satoshi Placeholder", sans-serif' }}
            >
              ZorgNotitie integreert direct met alle grote EPD-systemen in Nederland. Verslagen worden automatisch overgezet naar uw dossier — zonder handmatige invoer.
            </p>

            {/* Features list */}
            <ul className="mb-8 space-y-3">
              {features.map((feature, index) => (
                <li key={index} className="flex items-start gap-3">
                  <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-[#772d07]" />
                  <span
                    className="text-slate-700"
                    style={{ fontFamily: 'Satoshi, "Satoshi Placeholder", sans-serif' }}
                  >
                    {feature}
                  </span>
                </li>
              ))}
            </ul>

            {/* CTA */}
            <a
              href="#contact"
              className="group inline-flex items-center gap-2 rounded-full bg-[#772d07] px-6 py-3 font-semibold text-white transition-all hover:bg-[#5a2105]"
              style={{ fontFamily: 'Satoshi, "Satoshi Placeholder", sans-serif' }}
            >
              Bespreek uw integratie
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </a>
          </div>

          {/* Right: Integration logos grid */}
          <div>
            <div className="grid grid-cols-2 gap-6 sm:grid-cols-3">
              {integrations.map((integration, index) => (
                <div
                  key={index}
                  className="group flex flex-col items-center rounded-2xl border border-slate-200 bg-white p-6 text-center transition-all hover:border-[#772d07]/30 hover:shadow-lg"
                >
                  {/* Logo placeholder */}
                  <div className="relative mb-4 h-16 w-16 overflow-hidden rounded-xl bg-slate-100">
                    <Image
                      src={integration.logo}
                      alt={integration.name}
                      fill
                      className="object-cover opacity-60 transition-opacity group-hover:opacity-100"
                    />
                  </div>

                  {/* Name */}
                  <h3
                    className="mb-2 font-bold text-slate-900"
                    style={{ fontFamily: 'Satoshi, "Satoshi Placeholder", sans-serif' }}
                  >
                    {integration.name}
                  </h3>

                  {/* Description */}
                  <p
                    className="text-xs text-slate-500"
                    style={{ fontFamily: 'Satoshi, "Satoshi Placeholder", sans-serif' }}
                  >
                    {integration.description}
                  </p>
                </div>
              ))}
            </div>

            {/* Bottom note */}
            <p
              className="mt-8 text-center text-sm text-slate-500"
              style={{ fontFamily: 'Satoshi, "Satoshi Placeholder", sans-serif' }}
            >
              Uw EPD staat er niet tussen?{" "}
              <a
                href="#contact"
                className="font-semibold text-[#772d07] underline decoration-[#772d07]/30 underline-offset-4 transition-colors hover:decoration-[#772d07]"
              >
                Neem contact op
              </a>{" "}
              voor maatwerk integraties.
            </p>
          </div>
        </div>
      </Container>
    </section>
  );
}
