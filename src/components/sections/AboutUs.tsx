"use client";

import Image from "next/image";
import { Linkedin } from "lucide-react";
import Container from "@/components/ui/Container";

const teamMembers = [
  {
    name: "Marco Verkruissen",
    roles: [
      { emoji: "☁️", text: "AI & cloud engineer" },
      { emoji: "🙌", text: "volunteer data scientist for non-profits" },
    ],
    image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=800&q=80",
  },
  {
    name: "Sarah de Vries",
    roles: [
      { emoji: "💻", text: "Full-stack developer" },
      { emoji: "🎨", text: "UI/UX enthusiast" },
    ],
    image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=800&q=80",
  },
];

export default function AboutUs() {
  return (
    <section className="bg-slate-50 py-16 lg:py-24">
      <Container>
        {/* Header */}
        <div className="mb-16 text-center">
          <p
            className="mb-3 text-sm font-semibold uppercase tracking-wider text-[#772d07]"
            style={{ fontFamily: 'Satoshi, "Satoshi Placeholder", sans-serif' }}
          >
            Over ons
          </p>
          <h2
            className="text-4xl font-bold text-slate-900 sm:text-5xl"
            style={{ fontFamily: 'Satoshi, "Satoshi Placeholder", sans-serif' }}
          >
            Ons verhaal
          </h2>
        </div>

        {/* First row: Photo left, text right */}
        <div className="mb-20 grid items-center gap-12 lg:grid-cols-2">
          {/* Photo */}
          <div className="relative h-[400px] overflow-hidden rounded-3xl shadow-xl lg:h-[500px]">
            <Image
              src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=800&q=80"
              alt="Team collaboration"
              fill
              className="object-cover"
            />
          </div>

          {/* Text */}
          <div>
            <h3
              className="mb-6 text-3xl font-bold text-slate-900"
              style={{ fontFamily: 'Satoshi, "Satoshi Placeholder", sans-serif' }}
            >
              Innovatie in de zorg
            </h3>
            <p
              className="mb-4 text-lg leading-relaxed text-slate-600"
              style={{ fontFamily: 'Satoshi, "Satoshi Placeholder", sans-serif' }}
            >
              ZorgNotitie is ontstaan uit de frustratie van zorgprofessionals die dagelijks worstelen met tijdrovende administratie. Wij geloven dat technologie de zorg moet ondersteunen, niet belasten.
            </p>
            <p
              className="mb-4 text-lg leading-relaxed text-slate-600"
              style={{ fontFamily: 'Satoshi, "Satoshi Placeholder", sans-serif' }}
            >
              Onze missie is simpel: zorgverleners meer tijd geven voor waar het echt om draait - de patiënt. Door AI-gestuurde spraakherkenning en slimme templates maken we verslaglegging sneller, nauwkeuriger en minder belastend.
            </p>
          </div>
        </div>

        {/* Second row: Text left, photo right */}
        <div className="mb-20 grid items-center gap-12 lg:grid-cols-2">
          {/* Text */}
          <div className="order-2 lg:order-1">
            <h3
              className="mb-6 text-3xl font-bold text-slate-900"
              style={{ fontFamily: 'Satoshi, "Satoshi Placeholder", sans-serif' }}
            >
              Gebouwd door experts, voor experts
            </h3>
            <p
              className="mb-4 text-lg leading-relaxed text-slate-600"
              style={{ fontFamily: 'Satoshi, "Satoshi Placeholder", sans-serif' }}
            >
              Ons team bestaat uit zorgprofessionals, AI-specialisten en software-engineers die samen werken aan de toekomst van digitale zorg. We begrijpen de uitdagingen omdat we ze zelf hebben ervaren.
            </p>
            <p
              className="mb-4 text-lg leading-relaxed text-slate-600"
              style={{ fontFamily: 'Satoshi, "Satoshi Placeholder", sans-serif' }}
            >
              Met jarenlange ervaring in zowel de zorgsector als technologie, bouwen we oplossingen die echt werken in de praktijk. Privacy, veiligheid en gebruiksgemak staan altijd voorop.
            </p>
          </div>

          {/* Photo */}
          <div className="relative order-1 h-[400px] overflow-hidden rounded-3xl shadow-xl lg:order-2 lg:h-[500px]">
            <Image
              src="https://images.unsplash.com/photo-1551434678-e076c223a692?auto=format&fit=crop&w=800&q=80"
              alt="Technology and healthcare"
              fill
              className="object-cover"
            />
          </div>
        </div>

        {/* Team section */}
        <div className="mb-12 text-center">
          <h3
            className="mb-4 text-3xl font-bold text-slate-900"
            style={{ fontFamily: 'Satoshi, "Satoshi Placeholder", sans-serif' }}
          >
            Ons team
          </h3>
          <p
            className="mx-auto max-w-2xl text-lg text-slate-600"
            style={{ fontFamily: 'Satoshi, "Satoshi Placeholder", sans-serif' }}
          >
            Maak kennis met de mensen achter ZorgNotitie
          </p>
        </div>

        {/* Team members */}
        <div className="mx-auto flex max-w-5xl flex-wrap justify-center gap-8">
          {teamMembers.map((member, index) => (
            <div
              key={index}
              className="group w-full overflow-hidden rounded-3xl bg-white shadow-lg transition-all duration-300 hover:shadow-xl sm:w-80"
            >
              {/* Photo - larger and full width */}
              <div className="relative h-80 w-full overflow-hidden">
                <Image
                  src={member.image}
                  alt={member.name}
                  fill
                  className="object-cover object-center transition-transform duration-500 group-hover:scale-105"
                />
              </div>

              {/* Info */}
              <div className="p-8">
                <h3
                  className="mb-6 text-3xl font-bold text-slate-900"
                  style={{ fontFamily: 'Satoshi, "Satoshi Placeholder", sans-serif' }}
                >
                  {member.name}
                </h3>
                
                {/* Roles with emoji */}
                <div className="space-y-3">
                  {member.roles.map((role, roleIndex) => (
                    <p
                      key={roleIndex}
                      className="flex items-start gap-2 text-base text-slate-600"
                      style={{ fontFamily: 'Satoshi, "Satoshi Placeholder", sans-serif' }}
                    >
                      <span className="text-xl">{role.emoji}</span>
                      <span>{role.text}</span>
                    </p>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}
