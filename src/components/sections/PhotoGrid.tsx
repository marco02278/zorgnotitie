"use client";

import { useState } from "react";
import Image from "next/image";

const categories = [
  {
    id: "zorgprofessionals",
    title: "Zorgprofessionals",
    image: "https://images.unsplash.com/photo-1666214280557-f1b5022eb634?auto=format&fit=crop&w=2400&q=95",
    examples: [
      "Psychologen / psychotherapeuten",
      "Bedrijfsartsen",
      "Praktijkondersteuners somatiek",
    ],
    description:
      "Van intake tot evaluatie — automatiseer uw verslaglegging zodat u zich volledig kunt richten op het gesprek met uw cliënt.",
  },
  {
    id: "medisch-specialisten",
    title: "Zelfstandige Medische Specialisten",
    image: "https://images.unsplash.com/photo-1631217868264-e5b90bb7e133?auto=format&fit=crop&w=2400&q=95",
    examples: [
      "Dermatologen",
      "KNO-artsen",
      "Oogartsen",
    ],
    description:
      "Gestructureerde verslagen die naadloos aansluiten bij uw specialisme. Minder typen, meer tijd voor diagnostiek en behandeling.",
  },
  {
    id: "alternatief",
    title: "Alternatieve Zorgprofessionals",
    image: "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?auto=format&fit=crop&w=2400&q=95",
    examples: [
      "Fysiotherapeuten",
      "Logopedisten",
      "Chiropractors / Osteopaten",
    ],
    description:
      "Of het nu gaat om behandelverslagen of voortgangsrapportages — leg alles automatisch vast terwijl u behandelt.",
  },
  {
    id: "wellness",
    title: "Health & Wellness Coaches",
    image: "https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?auto=format&fit=crop&w=2400&q=95",
    examples: [
      "Health coaches (voeding, leefstijl, preventie)",
      "Mental wellness coaches (stress, burn-out)",
      "Sports / performance coaches",
    ],
    description:
      "Houd sessienotities bij zonder uit het gesprek te stappen. Ideaal voor coachingtrajecten waar de relatie centraal staat.",
  },
];

export default function PhotoGrid() {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  return (
    <section className="relative overflow-hidden py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Intro text */}
        <div className="mb-16 text-center">
          <h2 className="mb-6 text-3xl font-light leading-tight text-slate-800 sm:text-4xl lg:text-5xl">
            AI-gestuurde verslaglegging voor{" "}
            <span className="italic text-primary-600">
              elke zorgprofessional
            </span>
          </h2>
          <p className="mx-auto mb-8 max-w-3xl text-lg leading-relaxed text-slate-600 sm:text-xl">
            Van psychologen tot performance coaches — ZorgNotitie automatiseert
            uw verslaglegging, bespaart tijd en verbetert de kwaliteit van zorg.
          </p>

          <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
            <a
              href="#contact"
              className="inline-flex items-center justify-center rounded-full border-2 border-primary-600 bg-white px-8 py-4 text-base font-semibold text-primary-600 transition-all hover:bg-primary-50"
            >
              Neem contact op
            </a>
          </div>
        </div>

        {/* Photo grid */}
        <div className="flex gap-2">
          {categories.map((category, index) => {
            const isHovered = hoveredIndex === index;
            const isOtherHovered = hoveredIndex !== null && hoveredIndex !== index;

            return (
              <div
                key={category.id}
                className="group relative overflow-hidden rounded-2xl transition-all duration-500 ease-out"
                style={{
                  flex: isHovered ? "2" : "1",
                  opacity: isOtherHovered ? 0.6 : 1,
                }}
                onMouseEnter={() => setHoveredIndex(index)}
                onMouseLeave={() => setHoveredIndex(null)}
              >
                {/* Image */}
                <div className="relative h-[600px] w-full">
                  <Image
                    src={category.image}
                    alt={category.title}
                    fill
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                    priority={index === 0}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-900/90 via-slate-900/40 to-transparent" />
                </div>

                {/* Content */}
                <div className="absolute inset-0 flex flex-col justify-end p-8">
                  <h3 className="mb-2 text-2xl font-bold text-white transition-all duration-300 sm:text-3xl">
                    {category.title}
                  </h3>

                  {/* Hover content: description + examples */}
                  <div
                    className="overflow-hidden transition-all duration-700 ease-out"
                    style={{
                      maxHeight: isHovered ? "300px" : "0px",
                      opacity: isHovered ? 1 : 0,
                      transitionDelay: isHovered ? "200ms" : "0ms",
                    }}
                  >
                    <p className="mb-4 text-sm leading-relaxed text-white/85">
                      {category.description}
                    </p>
                    <ul className="space-y-1.5">
                      {category.examples.map((example) => (
                        <li
                          key={example}
                          className="flex items-center gap-2 text-sm text-white/75"
                        >
                          <span className="h-1 w-1 shrink-0 rounded-full bg-white/50" />
                          {example}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
