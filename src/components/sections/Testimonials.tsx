import { Star } from "lucide-react";
import Container from "@/components/ui/Container";
import SectionHeading from "@/components/ui/SectionHeading";

const testimonials = [
  {
    name: "Dr. Sarah van den Berg",
    role: "Huisarts",
    organization: "Huisartsenpraktijk De Linde, Utrecht",
    quote:
      "ZorgNotitie heeft mijn werkdag compleet veranderd. Ik bespaar minstens anderhalf uur per dag aan administratie. De samenvattingen zijn verrassend nauwkeurig en ik kan me eindelijk weer volledig op mijn patiënten richten.",
    rating: 5,
  },
  {
    name: "Mark de Vries",
    role: "GZ-psycholoog",
    organization: "GGZ Rivierduinen",
    quote:
      "Als GZ-psycholoog heb ik lange intake- en behandelgesprekken. De AI pikt nuances op die ik zelf soms mis bij het terugluisteren. De SOEP-notities zijn direct bruikbaar in ons EPD.",
    rating: 5,
  },
  {
    name: "Linda Bakker",
    role: "Wijkverpleegkundige",
    organization: "Buurtzorg Nederland",
    quote:
      "Tussen de huisbezoeken door had ik nooit genoeg tijd voor verslaglegging. Nu spreek ik mijn notities in tijdens het rijden en heb ik bij aankomst op kantoor alles al klaarstaan. Fantastisch!",
    rating: 5,
  },
  {
    name: "Prof. dr. Jan Mulder",
    role: "Internist",
    organization: "Erasmus MC, Rotterdam",
    quote:
      "We hebben ZorgNotitie getest op onze polikliniek en de resultaten zijn indrukwekkend. De nauwkeurigheid van de medische terminologie is uitstekend en het bespaart onze artsen aanzienlijk veel tijd.",
    rating: 5,
  },
  {
    name: "Annemiek Jansen",
    role: "Praktijkmanager",
    organization: "Gezondheidscentrum Amstelveen",
    quote:
      "De implementatie was verrassend eenvoudig. Binnen een week was het hele team aan boord. De klantenservice is uitstekend en denkt proactief mee over optimalisaties.",
    rating: 5,
  },
  {
    name: "Dr. Peter Hendriks",
    role: "Psychiater",
    organization: "Parnassia Groep, Den Haag",
    quote:
      "Privacy en veiligheid waren voor ons de belangrijkste criteria. ZorgNotitie voldoet aan alle eisen: NEN 7510, AVG-proof, hosting in Nederland. Dat geeft vertrouwen.",
    rating: 5,
  },
];

function StarRating({ rating }: { rating: number }) {
  return (
    <div className="flex gap-0.5">
      {Array.from({ length: rating }).map((_, i) => (
        <Star
          key={i}
          className="h-4 w-4 fill-amber-400 text-amber-400"
        />
      ))}
    </div>
  );
}

export default function Testimonials() {
  return (
    <section className="bg-cream-50 py-24 lg:py-32">
      <Container>
        <SectionHeading
          title="Wat zorgverleners zeggen"
          subtitle="Ontdek waarom honderden zorgprofessionals dagelijks vertrouwen op ZorgNotitie."
        />

        <div className="mt-16 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {testimonials.map((t) => (
            <div
              key={t.name}
              className="flex flex-col rounded-2xl border border-cream-200 bg-cream-50 p-8 shadow-sm transition-all duration-300 hover:shadow-md"
            >
              <StarRating rating={t.rating} />

              <blockquote className="mt-4 flex-1 text-sm leading-relaxed text-slate-600">
                &ldquo;{t.quote}&rdquo;
              </blockquote>

              <div className="mt-6 flex items-center gap-3 border-t border-cream-200 pt-5">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary-100 text-sm font-bold text-primary-700">
                  {t.name
                    .split(" ")
                    .map((n) => n[0])
                    .slice(0, 2)
                    .join("")}
                </div>
                <div>
                  <p className="text-sm font-semibold text-slate-900">
                    {t.name}
                  </p>
                  <p className="text-xs text-slate-400">
                    {t.role} — {t.organization}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}
