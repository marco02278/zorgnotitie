"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";
import Container from "@/components/ui/Container";
import SectionHeading from "@/components/ui/SectionHeading";

const faqs = [
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
    question: "Wat gebeurt er met de audio-opnames na verwerking?",
    answer:
      "Audio-opnames worden direct na verwerking automatisch verwijderd van onze servers, tenzij u expliciet kiest voor opslag. U heeft volledige controle over het retentiebeleid.",
  },
  {
    question: "Hoeveel kost ZorgNotitie?",
    answer:
      "We bieden flexibele abonnementen op basis van het aantal gebruikers en het volume aan gesprekken. Neem contact op voor een offerte op maat, of vraag een gratis demo aan om het platform te ervaren.",
  },
  {
    question: "Hoe snel kan ik starten?",
    answer:
      "U kunt binnen enkele minuten aan de slag. Na het aanmaken van uw account kunt u direct gesprekken opnemen en laten verwerken. Voor EPD-integraties plannen we een kort implementatietraject in.",
  },
  {
    question: "Is er een proefperiode beschikbaar?",
    answer:
      "Ja, we bieden een gratis proefperiode van 14 dagen aan. Geen creditcard nodig. U krijgt toegang tot alle functies zodat u het platform volledig kunt evalueren.",
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
    <div className="rounded-2xl bg-[#fae6bf] p-6 shadow-sm transition-all duration-300 hover:shadow-md">
      <button
        onClick={onToggle}
        className="flex w-full cursor-pointer items-center justify-between text-left"
      >
        <span
          className={`text-base font-semibold transition-colors ${
            isOpen ? "text-[#772d07]" : "text-slate-800"
          }`}
        >
          {question}
        </span>
        <ChevronDown
          className={`ml-4 h-5 w-5 shrink-0 transition-transform duration-300 ${
            isOpen ? "rotate-180 text-[#772d07]" : "text-slate-600"
          }`}
        />
      </button>
      <div
        className={`overflow-hidden transition-all duration-300 ${
          isOpen ? "max-h-96 pt-4" : "max-h-0"
        }`}
      >
        <p className="text-sm leading-relaxed text-slate-700">{answer}</p>
      </div>
    </div>
  );
}

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <section id="faq" className="bg-cream-100 py-24 lg:py-32">
      <Container>
        <SectionHeading
          title="Veelgestelde vragen"
          subtitle="Alles wat u wilt weten over ZorgNotitie."
        />

        <div className="mt-16 grid gap-6 md:grid-cols-2">
          {faqs.map((faq, index) => (
            <FAQItem
              key={index}
              question={faq.question}
              answer={faq.answer}
              isOpen={openIndex === index}
              onToggle={() =>
                setOpenIndex(openIndex === index ? null : index)
              }
            />
          ))}
        </div>
      </Container>
    </section>
  );
}
