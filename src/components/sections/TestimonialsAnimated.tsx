"use client";

import Image from "next/image";
import { Quote } from "lucide-react";
import Container from "@/components/ui/Container";

const testimonials = [
  {
    quote: "ZorgNotitie heeft mijn werkdag compleet veranderd. Ik bespaar dagelijks 2 uur aan administratie en kan me volledig focussen op mijn cliënten.",
    author: "Dr. Sarah van den Berg",
    role: "Psycholoog, GGZ Rivierduinen",
    image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=200&q=80",
  },
  {
    quote: "De AI-verslagen zijn verrassend nauwkeurig en voldoen perfect aan onze NEN 7510 eisen. Een echte game-changer.",
    author: "Mark Jansen",
    role: "Verpleegkundige, Buurtzorg",
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&q=80",
  },
  {
    quote: "Eindelijk een tool die écht begrijpt wat er in een gesprek gebeurt. De SOEP-verslagen zijn compleet en professioneel.",
    author: "Linda de Vries",
    role: "Huisarts, Gezondheidscentrum Amsterdam",
    image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&w=200&q=80",
  },
  {
    quote: "De integratie met ons EPD werkt naadloos. Geen handmatige invoer meer, alles gaat automatisch.",
    author: "Peter Bakker",
    role: "Fysiotherapeut, FysioFit",
    image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=200&q=80",
  },
  {
    quote: "Mijn cliënten merken dat ik meer aanwezig ben tijdens het gesprek. Ik hoef niet meer te typen en kan écht luisteren.",
    author: "Emma Visser",
    role: "Maatschappelijk werker, Welzijn Rotterdam",
    image: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=200&q=80",
  },
  {
    quote: "De veiligheid en privacy zijn perfect geregeld. Al onze data blijft binnen Europa en voldoet aan alle eisen.",
    author: "Thomas Hendriks",
    role: "Privacy Officer, Zorggroep West",
    image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=200&q=80",
  },
];

const leftColumn = [...testimonials.filter((_, i) => i % 2 === 0), ...testimonials.filter((_, i) => i % 2 === 0)];
const rightColumn = [...testimonials.filter((_, i) => i % 2 === 1), ...testimonials.filter((_, i) => i % 2 === 1)];

function TestimonialCard({ testimonial }: { testimonial: typeof testimonials[0] }) {
  return (
    <div className="mb-4 max-w-sm rounded-2xl border border-slate-200/80 bg-white p-5">
      <Quote className="mb-2 h-6 w-6 text-[#772d07]" />
      <p
        className="mb-4 text-[15px] leading-snug text-[#4a2a10]"
        style={{ fontFamily: 'Satoshi, "Satoshi Placeholder", sans-serif' }}
      >
        {testimonial.quote}
      </p>
      <div className="flex items-center gap-3">
        <div className="relative h-9 w-9 overflow-hidden rounded-full">
          <Image
            src={testimonial.image}
            alt={testimonial.author}
            fill
            className="object-cover"
          />
        </div>
        <div>
          <p
            className="text-sm font-semibold text-[#3d1704]"
            style={{ fontFamily: 'Satoshi, "Satoshi Placeholder", sans-serif' }}
          >
            {testimonial.author}
          </p>
          <p
            className="text-xs text-[#7a6d5d]"
            style={{ fontFamily: 'Satoshi, "Satoshi Placeholder", sans-serif' }}
          >
            {testimonial.role}
          </p>
        </div>
      </div>
    </div>
  );
}

export default function TestimonialsAnimated() {
  return (
    <section className="py-16 lg:py-24">
      <Container>
        {/* Header */}
        <div className="mb-10 text-center">
          <p
            className="mb-3 text-sm font-semibold uppercase tracking-wider text-[#772d07]"
            style={{ fontFamily: 'Satoshi, "Satoshi Placeholder", sans-serif' }}
          >
            ⭐ Testimonials
          </p>
          <h2
            className="text-4xl font-bold text-slate-900 sm:text-5xl"
            style={{ fontFamily: 'Satoshi, "Satoshi Placeholder", sans-serif' }}
          >
            Wat onze klanten zeggen
          </h2>
        </div>

        {/* Rounded container */}
        <div className="relative z-10 overflow-hidden rounded-3xl bg-white p-6 shadow-[0_4px_50px_rgba(119,45,7,0.08)] lg:p-10">
          {/* Constrained animated area */}
          <div className="relative h-[500px] overflow-hidden">
            {/* Fade top */}
            <div className="pointer-events-none absolute inset-x-0 top-0 z-10 h-24 bg-gradient-to-b from-white to-transparent" />
            {/* Fade bottom */}
            <div className="pointer-events-none absolute inset-x-0 bottom-0 z-10 h-24 bg-gradient-to-t from-white to-transparent" />

            {/* Two columns */}
            <div className="mx-auto flex max-w-3xl justify-center gap-6">
              {/* Left column - scrolls down */}
              <div className="animate-scroll-down">
                {leftColumn.map((testimonial, index) => (
                  <TestimonialCard key={`left-${index}`} testimonial={testimonial} />
                ))}
              </div>

              {/* Right column - scrolls up */}
              <div className="animate-scroll-up">
                {rightColumn.map((testimonial, index) => (
                  <TestimonialCard key={`right-${index}`} testimonial={testimonial} />
                ))}
              </div>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
