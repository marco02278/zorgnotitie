"use client";

import { useState } from "react";
import Image from "next/image";
import { FileText, Sparkles } from "lucide-react";
import Container from "@/components/ui/Container";

const templates = [
  {
    id: "soep",
    name: "SOEP",
    title: "SOEP-methodiek",
    description:
      "Subjectief, Objectief, Evaluatie, Plan. De meest gebruikte methodiek in de Nederlandse gezondheidszorg. Onze AI herkent automatisch deze structuur en vult alle velden correct in voor een compleet SOEP-verslag.",
    image: "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?auto=format&fit=crop&w=800&q=80",
    badges: ["🌿 Gestructureerd", "📊 Compleet"],
  },
  {
    id: "dap",
    name: "DAP",
    title: "DAP-methodiek",
    description:
      "Data, Analyse, Plan. Een efficiënte verslagmethodiek voor kortere consulten. Perfect voor follow-up gesprekken en controles. ZorgNotitie genereert automatisch een beknopt maar volledig DAP-verslag.",
    image: "https://images.unsplash.com/photo-1586281380349-632531db7ed4?auto=format&fit=crop&w=800&q=80",
    badges: ["⚡ Efficiënt", "✅ Beknopt"],
  },
  {
    id: "biopsychosociaal",
    name: "Biopsychosociaal",
    title: "Biopsychosociaal model",
    description:
      "Een holistische benadering die biologische, psychologische en sociale factoren integreert. Ideaal voor GGZ en integrale zorg. Onze AI analyseert het gesprek vanuit alle drie de domeinen.",
    image: "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?auto=format&fit=crop&w=800&q=80",
    badges: ["🧠 Holistisch", "💚 Integraal"],
  },
  {
    id: "verpleegkundig",
    name: "Verpleegkundig",
    title: "Verpleegkundig verslag",
    description:
      "Specifiek voor verpleegkundige zorg met focus op ADL, observaties en interventies. Voldoet aan alle kwaliteitseisen voor verpleegkundige verslaglegging volgens V&VN richtlijnen.",
    image: "https://images.unsplash.com/photo-1576091160550-2173dba999ef?auto=format&fit=crop&w=800&q=80",
    badges: ["🏥 V&VN", "📋 ADL-gericht"],
  },
  {
    id: "custom",
    name: "Eigen template",
    title: "Uw eigen template",
    description:
      "Heeft u een specifieke verslagstructuur? Wij kunnen onze AI trainen op uw eigen template. Upload uw format en wij zorgen ervoor dat alle verslagen perfect aansluiten bij uw werkwijze en organisatie.",
    image: "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&w=800&q=80",
    badges: ["🎨 Op maat", "🔧 Flexibel"],
  },
];

export default function Templates() {
  const [activeTemplate, setActiveTemplate] = useState(0);

  return (
    <section className="py-16 lg:py-24">
      <Container>
        {/* Header */}
        <div className="mb-12">
          <p
            className="mb-3 text-sm font-semibold uppercase tracking-wider text-[#772d07]"
            style={{ fontFamily: 'Satoshi, "Satoshi Placeholder", sans-serif' }}
          >
            Templates
          </p>
          <h2
            className="text-4xl font-bold text-slate-900 sm:text-5xl"
            style={{ fontFamily: 'Satoshi, "Satoshi Placeholder", sans-serif' }}
          >
            Kies uw verslagmethodiek
          </h2>
        </div>

        {/* Tabs */}
        <div className="mb-8 flex flex-wrap gap-3">
          {templates.map((template, index) => (
            <button
              key={template.id}
              onClick={() => setActiveTemplate(index)}
              className={`rounded-full px-6 py-3 text-sm font-semibold transition-all duration-300 ${
                activeTemplate === index
                  ? "bg-[#772d07] text-white shadow-lg"
                  : "bg-white text-[#772d07] hover:bg-slate-50"
              }`}
              style={{ fontFamily: 'Satoshi, "Satoshi Placeholder", sans-serif' }}
            >
              {template.name}
            </button>
          ))}
        </div>

        {/* Content area */}
        <div className="overflow-hidden rounded-3xl bg-white shadow-lg">
          <div className="grid lg:grid-cols-[1fr_1.2fr]">
            {/* Left: Image */}
            <div className="relative h-[780px] lg:h-auto">
              <Image
                key={activeTemplate}
                src={templates[activeTemplate].image}
                alt={templates[activeTemplate].title}
                fill
                className="animate-fade-in object-cover"
              />
            </div>

            {/* Right: Brown content block */}
            <div className="bg-[#772d07] p-10 text-white sm:p-14 lg:p-16">
              <div
                key={activeTemplate}
                className="animate-fade-in-up"
              >
                <h3
                  className="mb-6 text-3xl font-bold sm:text-4xl"
                  style={{ fontFamily: 'Satoshi, "Satoshi Placeholder", sans-serif' }}
                >
                  {templates[activeTemplate].title}
                </h3>

                <p
                  className="mb-8 text-lg leading-relaxed text-white/90"
                  style={{ fontFamily: 'Satoshi, "Satoshi Placeholder", sans-serif' }}
                >
                  {templates[activeTemplate].description}
                </p>

                {/* Badges */}
                <div className="flex flex-wrap gap-3">
                  {templates[activeTemplate].badges.map((badge, idx) => (
                    <span
                      key={idx}
                      className="rounded-full bg-white/20 px-5 py-2 text-sm font-medium backdrop-blur-sm"
                      style={{ fontFamily: 'Satoshi, "Satoshi Placeholder", sans-serif' }}
                    >
                      {badge}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
