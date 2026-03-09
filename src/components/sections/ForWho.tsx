"use client";

import { useState } from "react";
import { ArrowRight } from "lucide-react";
import Image from "next/image";

const audiences = [
  {
    id: "psychologen",
    label: "Psychologen",
    description:
      "Automatische sessieverslagen na elk gesprek. SOEP- en DAP-notities in één klik, zodat u zich volledig kunt richten op uw cliënt.",
    image:
      "https://images.unsplash.com/photo-1573497620053-ea5300f94f21?auto=format&fit=crop&w=1920&q=90",
    href: "#contact",
  },
  {
    id: "ggz",
    label: "GGZ",
    description:
      "Multidisciplinaire teamverslagen en behandelplan-tracking. AI vangt nuances op die bij handmatige notities verloren gaan.",
    image:
      "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?auto=format&fit=crop&w=1920&q=90",
    href: "#contact",
  },
  {
    id: "huisartsen",
    label: "Huisartsen",
    description:
      "SOEP-notities binnen 30 seconden. Integratie met HIS-systemen als Medicom en Promedico. Verwijsbrieven automatisch gegenereerd.",
    image:
      "https://images.unsplash.com/photo-1666214280557-f1b5022eb634?auto=format&fit=crop&w=1920&q=90",
    href: "#contact",
  },
  {
    id: "ziekenhuizen",
    label: "Ziekenhuizen",
    description:
      "Enterprise-grade beveiliging met integratie voor HiX, Chipsoft & Epic. Afdeling-specifieke templates op schaal.",
    image:
      "https://images.unsplash.com/photo-1579684385127-1ef15d508118?auto=format&fit=crop&w=1920&q=90",
    href: "#contact",
  },
];

export default function ForWho() {
  const [hoveredIndex, setHoveredIndex] = useState(0);
  const [expandedIndex, setExpandedIndex] = useState<number | null>(null);

  function handleClick(index: number) {
    setExpandedIndex(expandedIndex === index ? null : index);
  }

  return (
    <section className="relative overflow-hidden bg-primary-900">
      {/* Full-bleed layout: text left, photo right covering entire right half */}
      <div className="relative grid min-h-[600px] grid-cols-1 lg:grid-cols-2">
        {/* Left — content */}
        <div className="relative z-10 flex flex-col justify-center px-6 py-24 sm:px-12 lg:py-32 lg:pl-[max(2rem,calc((100vw-1280px)/2+2rem))] lg:pr-16">
          <p className="text-sm font-medium uppercase tracking-widest text-primary-400">
            Zorgverslaglegging die werkt voor
          </p>

          <div className="mt-10">
            {audiences.map((audience, index) => {
              const isHovered = hoveredIndex === index;
              const isExpanded = expandedIndex === index;

              return (
                <div
                  key={audience.id}
                  className="cursor-pointer"
                  onMouseEnter={() => setHoveredIndex(index)}
                  onClick={() => handleClick(index)}
                >
                  {/* Top divider */}
                  {index === 0 && <div className="h-px w-full bg-white/10" />}

                  <div className="py-5">
                    <div className="flex items-center justify-between gap-4">
                      <span
                        className={`relative text-2xl font-semibold tracking-tight transition-colors duration-300 ease-out sm:text-3xl ${
                          isHovered ? "text-primary-400" : "text-white/90"
                        }`}
                      >
                        {audience.label}

                        {/* Underline */}
                        <span
                          className={`absolute -bottom-1 left-0 h-[2px] bg-primary-400 transition-all duration-500 ease-out ${
                            isHovered ? "w-full" : "w-0"
                          }`}
                        />
                      </span>

                      <a
                        href={audience.href}
                        onClick={(e) => e.stopPropagation()}
                        className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-full border transition-all duration-300 ease-out ${
                          isHovered
                            ? "border-primary-400/40 bg-primary-400/10 opacity-100"
                            : "border-transparent opacity-0"
                        }`}
                      >
                        <ArrowRight
                          className={`h-4 w-4 transition-all duration-300 ${
                            isHovered
                              ? "translate-x-0 text-primary-400"
                              : "-translate-x-1 text-white/30"
                          }`}
                        />
                      </a>
                    </div>

                    {/* Expandable description */}
                    <div
                      className={`grid transition-all duration-500 ease-in-out ${
                        isExpanded
                          ? "grid-rows-[1fr] opacity-100"
                          : "grid-rows-[0fr] opacity-0"
                      }`}
                    >
                      <div className="overflow-hidden">
                        <p className="pt-3 text-sm leading-relaxed text-white/50 sm:text-base lg:max-w-sm">
                          {audience.description}
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Divider */}
                  <div className="h-px w-full bg-white/10" />
                </div>
              );
            })}
          </div>
        </div>

        {/* Right — full-bleed photo */}
        <div className="relative hidden min-h-[600px] lg:block">
          {audiences.map((audience, index) => (
            <Image
              key={audience.id}
              src={audience.image}
              alt={audience.label}
              fill
              sizes="50vw"
              className={`object-cover transition-opacity duration-700 ease-in-out ${
                hoveredIndex === index ? "opacity-100" : "opacity-0"
              }`}
              priority={index === 0}
            />
          ))}
        </div>

        {/* Mobile photo */}
        <div className="relative aspect-[16/10] lg:hidden">
          {audiences.map((audience, index) => (
            <Image
              key={audience.id}
              src={audience.image}
              alt={audience.label}
              fill
              sizes="100vw"
              className={`object-cover transition-opacity duration-700 ease-in-out ${
                hoveredIndex === index ? "opacity-100" : "opacity-0"
              }`}
              priority={index === 0}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
