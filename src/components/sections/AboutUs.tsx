"use client";

import Image from "next/image";
import { Linkedin } from "lucide-react";
import Container from "@/components/ui/Container";

const teamMembers = [
  {
    name: "Marco Verkruissen",
    role: "Founder & CEO",
    image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=400&q=80",
    linkedin: "https://www.linkedin.com/in/marcoverkruissen",
    bio: "Marco heeft meer dan 10 jaar ervaring in de zorgsector en zag de noodzaak voor betere digitale oplossingen in de verslaglegging.",
  },
  {
    name: "Sarah de Vries",
    role: "Chief Technology Officer",
    image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=400&q=80",
    linkedin: "https://www.linkedin.com/in/sarahdevries",
    bio: "Sarah is gespecialiseerd in AI en machine learning, met een passie voor het verbeteren van zorgprocessen door technologie.",
  },
];

export default function AboutUs() {
  return (
    <section className="bg-white py-16 lg:py-24">
      <Container>
        {/* Header */}
        <div className="mb-12 text-center">
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
            Ons team
          </h2>
          <p
            className="mx-auto mt-4 max-w-2xl text-lg text-slate-600"
            style={{ fontFamily: 'Satoshi, "Satoshi Placeholder", sans-serif' }}
          >
            Wij zijn een team van zorgprofessionals en technologie-experts die geloven in betere tools voor de zorgsector.
          </p>
        </div>

        {/* Team members grid */}
        <div className="mx-auto grid max-w-4xl gap-8 md:grid-cols-2">
          {teamMembers.map((member, index) => (
            <div
              key={index}
              className="group relative overflow-hidden rounded-3xl bg-cream-50 p-8 shadow-sm transition-all duration-300 hover:shadow-lg"
            >
              {/* Photo */}
              <div className="relative mx-auto mb-6 h-48 w-48 overflow-hidden rounded-2xl">
                <Image
                  src={member.image}
                  alt={member.name}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                />
              </div>

              {/* Info */}
              <div className="text-center">
                <h3
                  className="mb-1 text-2xl font-bold text-slate-900"
                  style={{ fontFamily: 'Satoshi, "Satoshi Placeholder", sans-serif' }}
                >
                  {member.name}
                </h3>
                <p
                  className="mb-4 text-sm font-semibold text-[#772d07]"
                  style={{ fontFamily: 'Satoshi, "Satoshi Placeholder", sans-serif' }}
                >
                  {member.role}
                </p>
                <p
                  className="mb-6 text-sm leading-relaxed text-slate-600"
                  style={{ fontFamily: 'Satoshi, "Satoshi Placeholder", sans-serif' }}
                >
                  {member.bio}
                </p>

                {/* LinkedIn button */}
                <a
                  href={member.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 rounded-full bg-[#0077b5] px-6 py-3 text-sm font-semibold text-white transition-all duration-300 hover:bg-[#006399] hover:shadow-lg"
                  style={{ fontFamily: 'Satoshi, "Satoshi Placeholder", sans-serif' }}
                >
                  <Linkedin className="h-4 w-4" />
                  Verbind op LinkedIn
                </a>
              </div>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}
