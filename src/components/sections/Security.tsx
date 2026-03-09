import { Shield, Lock, Server, Eye, FileKey, Building2 } from "lucide-react";
import Container from "@/components/ui/Container";
import SectionHeading from "@/components/ui/SectionHeading";

const securityFeatures = [
  {
    icon: Shield,
    title: "AVG/GDPR-proof",
    description:
      "Volledige naleving van de Algemene Verordening Gegevensbescherming. Uw data wordt verwerkt conform de strengste Europese privacywetgeving.",
  },
  {
    icon: Server,
    title: "Hosting in Nederland",
    description:
      "Alle data wordt opgeslagen en verwerkt op servers in Nederlandse datacenters. Uw gegevens verlaten nooit de EU.",
  },
  {
    icon: Lock,
    title: "End-to-end encryptie",
    description:
      "Alle gespreksdata wordt versleuteld tijdens transport én opslag met AES-256 encryptie.",
  },
  {
    icon: Eye,
    title: "Geen meekijken",
    description:
      "Gespreksopnames worden uitsluitend door AI verwerkt. Geen menselijke medewerker heeft toegang tot uw audio of transcripties.",
  },
  {
    icon: FileKey,
    title: "Verwerkersovereenkomst",
    description:
      "Standaard verwerkersovereenkomst beschikbaar, volledig in lijn met de eisen van de Autoriteit Persoonsgegevens.",
  },
  {
    icon: Building2,
    title: "NEN 7510 gecertificeerd",
    description:
      "Ons informatiebeveiliging managementsysteem voldoet aan de NEN 7510 norm, dé standaard voor informatiebeveiliging in de zorg.",
  },
];

export default function Security() {
  return (
    <section id="veiligheid" className="bg-cream-50 py-24 lg:py-32">
      <Container>
        <SectionHeading
          title="Veiligheid & privacy staan voorop"
          subtitle="Wij begrijpen dat zorgdata uiterst gevoelig is. Daarom hebben we beveiliging en privacy tot in de kern van ons platform ingebouwd."
        />

        <div className="mt-16 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {securityFeatures.map((feature) => (
            <div
              key={feature.title}
              className="flex gap-4 rounded-xl border border-cream-200 p-6 transition-all duration-300 hover:border-primary-200 hover:bg-primary-50/30"
            >
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-accent-50 text-accent-600">
                <feature.icon className="h-5 w-5" />
              </div>
              <div>
                <h3 className="font-semibold text-slate-900">
                  {feature.title}
                </h3>
                <p className="mt-1.5 text-sm leading-relaxed text-slate-500">
                  {feature.description}
                </p>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-12 rounded-2xl bg-gradient-to-r from-primary-700 to-primary-900 p-8 text-center text-white sm:p-12">
          <h3 className="text-2xl font-bold">
            Uw data is bij ons in veilige handen
          </h3>
          <p className="mx-auto mt-3 max-w-xl text-primary-100">
            Wij werken samen met toonaangevende beveiligingspartners en laten
            ons platform regelmatig auditen door onafhankelijke partijen.
          </p>
          <div className="mt-8 flex flex-wrap items-center justify-center gap-6 text-sm font-medium text-primary-200">
            <span className="rounded-full border border-primary-400 px-4 py-1.5">
              ISO 27001
            </span>
            <span className="rounded-full border border-primary-400 px-4 py-1.5">
              NEN 7510
            </span>
            <span className="rounded-full border border-primary-400 px-4 py-1.5">
              AVG/GDPR
            </span>
            <span className="rounded-full border border-primary-400 px-4 py-1.5">
              SOC 2 Type II
            </span>
          </div>
        </div>
      </Container>
    </section>
  );
}
