"use client";

import { useState } from "react";
import Image from "next/image";

const categories = [
  {
    id: "psychologen",
    title: "Psychologen",
    image: "https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?auto=format&fit=crop&w=1200&q=90",
    description: "Ondersteun uw psychologen met efficiënte verslaglegging en meer tijd voor cliëntcontact. Onze AI-gestuurde oplossing automatiseert administratieve taken en zorgt voor gestructureerde dossiervorming conform BIG-register eisen.",
  },
  {
    id: "huisartsen",
    title: "Huisartsen",
    image: "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?auto=format&fit=crop&w=1200&q=90",
    description: "Geef huisartsen meer tijd voor patiëntenzorg door gespreksverslagen automatisch te genereren. Voldoet aan NHG-standaarden en integreert naadloos met bestaande HIS-systemen voor een optimale workflow.",
  },
  {
    id: "ziekenhuizen",
    title: "Ziekenhuizen",
    image: "https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?auto=format&fit=crop&w=1200&q=90",
    description: "Verhoog de efficiëntie in uw ziekenhuis met geautomatiseerde verslaglegging voor alle afdelingen. Van polikliniek tot spoedeisende hulp - onze oplossing schaalt mee met uw organisatie en voldoet aan alle ziekenhuisprotocollen.",
  },
  {
    id: "ggz",
    title: "GGZ Instellingen",
    image: "https://images.unsplash.com/photo-1576091160550-2173dba999ef?auto=format&fit=crop&w=1200&q=90",
    description: "Optimaliseer de zorgverlening in GGZ-instellingen met veilige, AVG-proof verslaglegging. Onze oplossing ondersteunt ROM-metingen, behandelplannen en multidisciplinaire rapportages voor een complete dossiervorming.",
  },
];

export default function PhotoGrid() {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const [expandedIndex, setExpandedIndex] = useState<number | null>(null);

  return (
    <section className="relative overflow-hidden bg-cream-50 py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Intro text section with buttons */}
        <div className="mb-16 text-center">
          <h2 className="mb-6 text-3xl font-light leading-tight text-slate-800 sm:text-4xl lg:text-5xl">
            AI-gestuurde verslaglegging voor{" "}
            <span className="italic text-primary-600">
              de Nederlandse gezondheidszorg
            </span>
          </h2>
          <p className="mx-auto mb-8 max-w-3xl text-lg leading-relaxed text-slate-600 sm:text-xl">
            Van huisartsenpraktijken tot grote ziekenhuizen — ZorgNotitie automatiseert
            uw verslaglegging, bespaart tijd en verbetert de kwaliteit van zorg.
          </p>
          
          {/* Buttons */}
          <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
            <a
              href="/demo"
              className="inline-flex items-center justify-center rounded-full bg-primary-600 px-8 py-4 text-base font-semibold text-white shadow-lg transition-all hover:bg-primary-700"
            >
              Gratis demo aanvragen
            </a>
            <a
              href="#contact"
              className="inline-flex items-center justify-center rounded-full border-2 border-primary-600 bg-white px-8 py-4 text-base font-semibold text-primary-600 transition-all hover:bg-primary-50"
            >
              Neem contact op
            </a>
          </div>
        </div>

        <div className="flex gap-2">
          {categories.map((category, index) => {
            const isHovered = hoveredIndex === index;
            const isExpanded = expandedIndex === index;
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
                  {/* Gradient overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-900/90 via-slate-900/40 to-transparent" />
                </div>

                {/* Content */}
                <div className="absolute inset-0 flex flex-col justify-end p-8">
                  <h3 className="mb-4 text-2xl font-bold text-white transition-all duration-300 sm:text-3xl">
                    {category.title}
                  </h3>

                  {/* Description - shows on hover */}
                  <div
                    className="overflow-hidden transition-all duration-500 ease-out"
                    style={{
                      maxHeight: isHovered ? "200px" : "0px",
                      opacity: isHovered ? 1 : 0,
                    }}
                  >
                    <p className="mb-4 text-sm leading-relaxed text-white/90">
                      {isExpanded
                        ? category.description
                        : category.description.substring(0, 120) + "..."}
                    </p>
                  </div>

                  {/* Learn more button - shows on hover */}
                  <div
                    className="transition-all duration-500 ease-out"
                    style={{
                      maxHeight: isHovered ? "60px" : "0px",
                      opacity: isHovered ? 1 : 0,
                    }}
                  >
                    <button
                      onClick={() =>
                        setExpandedIndex(isExpanded ? null : index)
                      }
                      className="inline-flex items-center gap-2 rounded-lg border-2 border-white/30 bg-white/10 px-6 py-2 text-sm font-semibold text-white backdrop-blur-sm transition-all hover:border-white/60 hover:bg-white/20"
                    >
                      {isExpanded ? "Minder tonen" : "Meer informatie"}
                      <svg
                        className={`h-4 w-4 transition-transform duration-300 ${
                          isExpanded ? "rotate-180" : ""
                        }`}
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M19 9l-7 7-7-7"
                        />
                      </svg>
                    </button>
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
