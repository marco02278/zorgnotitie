import { Mic, Brain, FileText, FolderOpen } from "lucide-react";
import Container from "@/components/ui/Container";
import SectionHeading from "@/components/ui/SectionHeading";

const steps = [
  {
    icon: Mic,
    step: "01",
    title: "Gesprek opnemen",
    description:
      "Start de opname tijdens het consult. ZorgNotitie luistert mee en legt het gesprek veilig vast — op elk apparaat.",
  },
  {
    icon: Brain,
    step: "02",
    title: "AI-analyse",
    description:
      "Onze AI analyseert het gesprek en herkent automatisch klachten, diagnoses, behandelplannen en afspraken.",
  },
  {
    icon: FileText,
    step: "03",
    title: "Samenvatting & rapportage",
    description:
      "Binnen seconden ontvangt u een gestructureerde samenvatting in het gewenste zorgtemplate (SOEP, DAP, etc.).",
  },
  {
    icon: FolderOpen,
    step: "04",
    title: "Dossiervorming",
    description:
      "De verslaglegging wordt automatisch gekoppeld aan het cliëntdossier, conform Nederlandse zorgstandaarden.",
  },
];

export default function HowItWorks() {
  return (
    <section id="hoe-werkt-het" className="bg-white py-24 lg:py-32">
      <Container>
        <SectionHeading
          title="Hoe werkt het?"
          subtitle="Van gesprek naar compleet dossier in vier eenvoudige stappen. Geen extra werk, geen typfouten, geen achterstanden."
        />

        <div className="mt-16 grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-4">
          {steps.map((item) => (
            <div
              key={item.step}
              className="group relative rounded-2xl border border-slate-100 bg-white p-8 transition-all duration-300 hover:border-primary-200 hover:shadow-lg hover:shadow-primary-100/50"
            >
              <span className="absolute top-6 right-6 text-sm font-bold text-slate-200 transition-colors group-hover:text-primary-200">
                {item.step}
              </span>
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary-50 text-primary-600 transition-colors group-hover:bg-primary-600 group-hover:text-white">
                <item.icon className="h-6 w-6" />
              </div>
              <h3 className="mt-5 text-lg font-semibold text-slate-900">
                {item.title}
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-slate-500">
                {item.description}
              </p>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}
