"use client";

import { useState } from "react";
import { Plus } from "lucide-react";
import Container from "@/components/ui/Container";

const faqCategories = [
  {
    title: "Product & Technologie",
    faqs: [
      {
        question: "Is ZorgNotitie AVG/GDPR-proof?",
        answer:
          "Ja, volledig. Alle data wordt verwerkt en opgeslagen op servers in Nederlandse datacenters. We hebben een verwerkersovereenkomst beschikbaar en voldoen aan de strengste Europese privacywetgeving. Daarnaast zijn we NEN 7510 gecertificeerd.",
      },
      {
        question: "Welke zorgtemplates worden ondersteund?",
        answer:
          "We ondersteunen standaard SOEP, DAP en diverse andere gangbare zorgformats. Daarnaast kunt u uw eigen templates configureren die passen bij uw specifieke werkwijze of organisatie.",
      },
      {
        question: "Kan ZorgNotitie integreren met ons EPD-systeem?",
        answer:
          "Ja, we bieden integraties met veelgebruikte EPD-systemen zoals HiX (Chipsoft), Medicom, Promedico en meer. Via onze API kunt u ook een eigen koppeling bouwen.",
      },
      {
        question: "Hoe nauwkeurig zijn de AI-samenvattingen?",
        answer:
          "Ons taalmodel is specifiek getraind op Nederlandse medische terminologie en behaalt een nauwkeurigheid van meer dan 95%. Elke samenvatting wordt ter review aangeboden voordat deze definitief wordt opgeslagen, zodat u altijd de controle behoudt.",
      },
      {
        question: "In welke talen werkt ZorgNotitie?",
        answer:
          "ZorgNotitie is primair geoptimaliseerd voor het Nederlands, inclusief dialecten en medisch jargon. Naast Nederlands ondersteunt het platform ook Engels, Duits en Frans voor organisaties die internationaal werken.",
      },
      {
        question: "Wat gebeurt er met de audio-opnames na verwerking?",
        answer:
          "Audio-opnames worden direct na verwerking automatisch verwijderd van onze servers, tenzij u expliciet kiest voor opslag. U heeft volledige controle over het retentiebeleid.",
      },
      {
        question: "Werkt ZorgNotitie ook op mobiele apparaten?",
        answer:
          "Ja, ZorgNotitie is volledig responsief en werkt op smartphones en tablets. Daarnaast bieden we een native iOS- en Android-app waarmee u ook onderweg gesprekken kunt opnemen en verwerken.",
      },
    ],
  },
  {
    title: "Prijzen & Aan de slag",
    faqs: [
      {
        question: "Hoeveel kost ZorgNotitie?",
        answer:
          "We bieden flexibele abonnementen op basis van het aantal gebruikers en het volume aan gesprekken. Neem contact op voor een offerte op maat, of vraag een gratis demo aan om het platform te ervaren.",
      },
      {
        question: "Is er een proefperiode beschikbaar?",
        answer:
          "Ja, we bieden een gratis proefperiode van 14 dagen aan. Geen creditcard nodig. U krijgt toegang tot alle functies zodat u het platform volledig kunt evalueren.",
      },
      {
        question: "Hoe snel kan ik starten?",
        answer:
          "U kunt binnen enkele minuten aan de slag. Na het aanmaken van uw account kunt u direct gesprekken opnemen en laten verwerken. Voor EPD-integraties plannen we een kort implementatietraject in.",
      },
      {
        question: "Kan ik op elk moment opzeggen?",
        answer:
          "Ja, maandelijkse abonnementen zijn op elk moment opzegbaar met een opzegtermijn van één maand. Jaarlijkse abonnementen zijn opzegbaar aan het einde van de contractperiode. Er zijn geen verborgen kosten of boetes.",
      },
      {
        question: "Wie heeft toegang tot patiëntgegevens?",
        answer:
          "Alleen bevoegde medewerkers van uw eigen organisatie hebben toegang tot patiëntgegevens. ZorgNotitie-medewerkers hebben geen inzage in patiëntdata. Alle toegang wordt gelogd en is auditeerbaar.",
      },
      {
        question: "Hoe is de beveiliging van de verbinding geregeld?",
        answer:
          "Alle communicatie verloopt via TLS 1.3-versleuteling. Data in rust wordt versleuteld opgeslagen via AES-256. We voeren regelmatige penetratietests uit en hebben een responsible disclosure-programma.",
      },
      {
        question: "Kan ik data exporteren of verwijderen?",
        answer:
          "Ja, u heeft altijd het recht op dataportabiliteit en verwijdering. Via het beheerportaal kunt u alle gegevens exporteren in gangbare formaten (JSON, CSV, PDF) of definitief verwijderen conform de AVG.",
      },
    ],
  },
];

function FAQItem({
  question,
  answer,
  isOpen,
  onToggle,
}: {
  question: string;
  answer: string;
  isOpen: boolean;
  onToggle: () => void;
}) {
  return (
    <div className="border-b border-slate-200 py-6">
      <button
        onClick={onToggle}
        className="flex w-full cursor-pointer items-center justify-between text-left group"
      >
        <span className="text-lg font-medium text-slate-800 pr-8">
          {question}
        </span>
        <Plus
          className={`h-6 w-6 shrink-0 transition-all duration-300 text-[#772d07] ${
            isOpen ? "rotate-45" : ""
          }`}
        />
      </button>
      <div
        className={`overflow-hidden transition-all duration-300 ${
          isOpen ? "max-h-96 pt-4" : "max-h-0"
        }`}
      >
        <p className="text-base leading-relaxed text-slate-600">{answer}</p>
      </div>
    </div>
  );
}

export default function FAQ() {
  const [openIndices, setOpenIndices] = useState<{ [key: string]: number | null }>({
    0: null,
    1: null,
  });

  const toggleFAQ = (categoryIndex: number, faqIndex: number) => {
    setOpenIndices(prev => ({
      ...prev,
      [categoryIndex]: prev[categoryIndex] === faqIndex ? null : faqIndex,
    }));
  };

  return (
    <section id="faq" className="relative bg-slate-50 py-24 lg:py-32">
      {/* Angled top edge */}
      <div className="absolute inset-x-0 -top-16 h-16 bg-white" style={{ clipPath: "polygon(0 0, 100% 0, 100% 100%, 0 40%)" }} />

      <Container>
        <div className="text-center mb-16">
          <h2 className="text-5xl font-serif text-slate-800 mb-4">FAQ</h2>
          <p className="text-lg text-slate-500 max-w-xl mx-auto">
            Alles wat u wilt weten over ZorgNotitie — van privacy tot prijzen.
          </p>
        </div>

        <div className="grid gap-16 md:grid-cols-2 max-w-5xl mx-auto">
          {faqCategories.map((category, categoryIndex) => (
            <div key={categoryIndex}>
              <h3 className="text-xl font-semibold text-slate-800 mb-6 pb-3 border-b-2 border-[#772d07]/20">
                {category.title}
              </h3>
              <div>
                {category.faqs.map((faq, faqIndex) => (
                  <FAQItem
                    key={faqIndex}
                    question={faq.question}
                    answer={faq.answer}
                    isOpen={openIndices[categoryIndex] === faqIndex}
                    onToggle={() => toggleFAQ(categoryIndex, faqIndex)}
                  />
                ))}
              </div>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}
