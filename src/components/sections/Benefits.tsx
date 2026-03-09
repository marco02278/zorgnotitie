import {
  Clock,
  ShieldCheck,
  TrendingUp,
  Users,
  FileCheck,
  Zap,
} from "lucide-react";
import Container from "@/components/ui/Container";
import SectionHeading from "@/components/ui/SectionHeading";

const benefits = [
  {
    icon: Clock,
    title: "Bespaar tot 2 uur per dag",
    description:
      "Geen handmatige verslaglegging meer. Besteed uw tijd aan wat écht telt: de zorg voor uw cliënten.",
  },
  {
    icon: ShieldCheck,
    title: "Altijd compliant",
    description:
      "Rapportages voldoen automatisch aan de geldende zorgstandaarden en richtlijnen in Nederland.",
  },
  {
    icon: TrendingUp,
    title: "Hogere kwaliteit verslaglegging",
    description:
      "AI vangt details op die bij handmatige notities verloren gaan. Consistente, volledige dossiers.",
  },
  {
    icon: Users,
    title: "Geschikt voor elk zorgdomein",
    description:
      "Van huisartsenpraktijk tot GGZ, van ziekenhuis tot wijkzorg — flexibele templates voor elke setting.",
  },
  {
    icon: FileCheck,
    title: "Voorgedefinieerde zorgtemplates",
    description:
      "SOEP, DAP, en andere gangbare formats. Configureer uw eigen templates of gebruik onze standaarden.",
  },
  {
    icon: Zap,
    title: "Direct inzetbaar",
    description:
      "Geen complexe implementatie. Start binnen minuten en integreer eenvoudig met bestaande systemen.",
  },
];

export default function Benefits() {
  return (
    <section id="voordelen" className="bg-cream-100 py-24 lg:py-32">
      <Container>
        <SectionHeading
          title="Waarom zorgverleners kiezen voor ZorgNotitie"
          subtitle="Minder administratie, betere verslaglegging en meer tijd voor de patiënt."
        />

        <div className="mt-16 grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
          {benefits.map((benefit) => (
            <div
              key={benefit.title}
              className="rounded-2xl bg-cream-50 p-8 shadow-sm transition-all duration-300 hover:shadow-md"
            >
              <div className="flex h-11 w-11 items-center justify-center rounded-lg bg-primary-50 text-primary-600">
                <benefit.icon className="h-5 w-5" />
              </div>
              <h3 className="mt-5 text-lg font-semibold text-slate-900">
                {benefit.title}
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-slate-500">
                {benefit.description}
              </p>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}
