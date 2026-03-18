"use client";

import { Shield, Lock, Server } from "lucide-react";

import Image from "next/image";
import Container from "@/components/ui/Container";

const complianceItems = [
  {
    icon: Shield,
    title: "AVG/GDPR-compliant",
    description: "Volledig conforme gegevensverwerking volgens de strengste Europese privacywetgeving.",
  },
  {
    icon: Lock,
    title: "ISO 27001 compliant",
    description: "Informatiebeveiliging volgens de internationale standaard voor veilig omgaan met gevoelige data.",
  },
  {
    icon: Server,
    title: "NEN 7510 compliant",
    description: "Voldoet aan dé Nederlandse norm voor informatiebeveiliging in de zorgsector.",
  },
];

export default function Compliance() {
  return (
    <section className="py-20 lg:py-32">
      <Container>
        {/* Row 1: Compliance items (left) + Image (right) */}
        <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-20">
          {/* Left: badge, title, items */}
          <div>
            <h2
              className="mb-10 text-3xl font-bold text-slate-900 sm:text-4xl lg:text-5xl"
              style={{ fontFamily: 'Satoshi, "Satoshi Placeholder", sans-serif' }}
            >
              Veilige{" "}
              <span className="text-[#772d07]">Zorgdata</span>{" "}
              Verwerking
            </h2>

            <div className="space-y-6">
              {complianceItems.map((item) => (
                <div key={item.title} className="flex gap-4">
                  <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-[#772d07]/8">
                    <item.icon className="h-5 w-5 text-[#772d07]" />
                  </div>
                  <div>
                    <h3
                      className="text-base font-semibold text-slate-900"
                      style={{ fontFamily: 'Satoshi, "Satoshi Placeholder", sans-serif' }}
                    >
                      {item.title}
                    </h3>
                    <p
                      className="mt-1 text-sm leading-relaxed text-slate-500"
                      style={{ fontFamily: 'Satoshi, "Satoshi Placeholder", sans-serif' }}
                    >
                      {item.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right: Image */}
          <div className="relative h-[420px] w-full overflow-hidden rounded-3xl shadow-2xl">
            <Image
              src="https://images.unsplash.com/photo-1576091160550-2173dba999ef?auto=format&fit=crop&w=800&q=80"
              alt="Veilige zorgdata verwerking"
              fill
              className="object-cover"
              priority
            />
          </div>
        </div>

        {/* Row 2: Image (left) + Text (right) */}
        <div className="mt-32 lg:mt-40 grid items-center gap-12 lg:grid-cols-2 lg:gap-20">
          {/* Left: Image */}
          <div className="relative h-[360px] w-full overflow-hidden rounded-3xl shadow-2xl">
            <Image
              src="https://images.unsplash.com/photo-1504439468489-c8920d796a29?auto=format&fit=crop&w=800&q=80"
              alt="Data privacy en beveiliging"
              fill
              className="object-cover"
            />
          </div>

          {/* Right: Text */}
          <div>
            <h3
              className="mb-4 text-2xl font-bold text-slate-900 sm:text-3xl"
              style={{ fontFamily: 'Satoshi, "Satoshi Placeholder", sans-serif' }}
            >
              Uw data, volledig{" "}
              <span className="text-[#772d07]">beschermd</span>
            </h3>
            <p
              className="text-lg leading-relaxed text-slate-600"
              style={{ fontFamily: 'Satoshi, "Satoshi Placeholder", sans-serif' }}
            >
              Uw gegevens worden uitsluitend verwerkt op servers binnen de Europese Unie en verlaten nooit de EU-grenzen. Wij maken gebruik van beveiligde datacenters die voldoen aan de strengste internationale normen. Audio-opnames worden direct na het genereren van het transcript permanent verwijderd, waardoor er geen enkele kopie van de opname bewaard blijft. Transcripties en verslagen worden slechts tijdelijk bewaard en kunnen op elk moment door u worden verwijderd. Zo heeft u altijd volledige controle over uw data en die van uw cliënten.
            </p>
          </div>
        </div>
      </Container>
    </section>
  );
}
