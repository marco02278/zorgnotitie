"use client";

import { Shield, FileCheck, MapPin, Check } from "lucide-react";
import Image from "next/image";
import Container from "@/components/ui/Container";

const complianceFeatures = [
  "AVG-compliant gegevensverwerking",
  "NEN 7510 gecertificeerd",
  "Data opslag binnen Europa",
];

export default function Compliance() {
  return (
    <section className="py-16 lg:py-24">
      <Container>
        <div className="grid gap-12 lg:grid-cols-2 lg:gap-16">
          {/* Left content */}
          <div className="flex flex-col justify-center">
            {/* Badge */}
            <div className="mb-6 inline-flex items-center gap-2 self-start">
              <Shield className="h-5 w-5 text-[#772d07]" />
              <p
                className="text-sm font-semibold uppercase tracking-wider text-[#772d07]"
                style={{ fontFamily: 'Satoshi, "Satoshi Placeholder", sans-serif' }}
              >
                Veiligheid & Compliance
              </p>
            </div>

            {/* Title */}
            <h2
              className="mb-6 text-4xl font-bold text-slate-900 sm:text-5xl"
              style={{ fontFamily: 'Satoshi, "Satoshi Placeholder", sans-serif' }}
            >
              Veilige{" "}
              <span className="text-[#772d07]">
                Zorgdata
              </span>{" "}
              Verwerking
            </h2>

            {/* Features list */}
            <div className="mb-8 space-y-4">
              {complianceFeatures.map((feature, index) => (
                <div key={index} className="flex items-start gap-3">
                  <div className="mt-1 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-[#772d07]">
                    <Check className="h-3 w-3 text-white" strokeWidth={3} />
                  </div>
                  <p
                    className="text-lg text-slate-700"
                    style={{ fontFamily: 'Satoshi, "Satoshi Placeholder", sans-serif' }}
                  >
                    {feature}
                  </p>
                </div>
              ))}
            </div>

            {/* CTA Button */}
            <div>
              <a
                href="#contact"
                className="inline-flex items-center justify-center rounded-full bg-[#772d07] px-8 py-4 text-base font-semibold text-white transition-all duration-300 hover:bg-[#5a2205] hover:shadow-lg"
                style={{ fontFamily: 'Satoshi, "Satoshi Placeholder", sans-serif' }}
              >
                Meer informatie
              </a>
            </div>
          </div>

          {/* Right image */}
          <div className="flex items-center justify-center">
            <div className="relative h-[500px] w-full overflow-hidden rounded-3xl shadow-xl">
              <Image
                src="https://images.unsplash.com/photo-1576091160550-2173dba999ef?auto=format&fit=crop&w=800&q=80"
                alt="Veilige zorgdata verwerking"
                fill
                className="object-cover"
                priority
              />
              
              {/* Floating card overlay */}
              <div className="absolute bottom-8 left-8 right-8 rounded-2xl bg-white p-6 shadow-2xl">
                <div className="mb-4 flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#772d07]/10">
                    <FileCheck className="h-5 w-5 text-[#772d07]" />
                  </div>
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#772d07]/10">
                    <Shield className="h-5 w-5 text-[#772d07]" />
                  </div>
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#772d07]/10">
                    <MapPin className="h-5 w-5 text-[#772d07]" />
                  </div>
                </div>
                <p
                  className="text-sm font-semibold text-slate-900"
                  style={{ fontFamily: 'Satoshi, "Satoshi Placeholder", sans-serif' }}
                >
                  100% veilig en compliant
                </p>
                <p
                  className="mt-1 text-xs text-slate-600"
                  style={{ fontFamily: 'Satoshi, "Satoshi Placeholder", sans-serif' }}
                >
                  Gecertificeerd volgens de hoogste normen
                </p>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
