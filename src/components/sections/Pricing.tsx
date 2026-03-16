"use client";

import { useState } from "react";
import { Check } from "lucide-react";
import Container from "@/components/ui/Container";
import SectionHeading from "@/components/ui/SectionHeading";

const plans = [
  {
    name: "Trial",
    subtitle: "Starting at",
    monthlyPrice: "0",
    yearlyPrice: "0",
    description: "Onboard and engage users throughout their lifecycles. Ideal for startups and SMBs like:",
    features: [
      "Tot 3 gebruikers",
      "Basis verslaglegging",
      "Tot 3 branded themes",
      "Analytics integraties",
      "Email support",
    ],
    borderColor: "#772d07",
    highlighted: false,
  },
  {
    name: "Pro",
    subtitle: "Starting at",
    monthlyPrice: "249",
    yearlyPrice: "199",
    description: "Maximize activation, customer revenue, and retention. Ideal for rapidly growing companies like:",
    features: [
      "Tot 10 gebruikers",
      "Geavanceerde targeting en engagement patterns",
      "Volledig aanpasbare themes",
      "Toegang tot alle integraties",
      "Dedicated Customer Success Manager",
    ],
    borderColor: "#772d07",
    highlighted: true,
  },
  {
    name: "Business",
    subtitle: "Let's talk",
    monthlyPrice: null,
    yearlyPrice: null,
    description: "Transform your product experience. Ideal for businesses with >500 employees or multiple products like:",
    features: [
      "Onbeperkt aantal gebruikers",
      "Extra targeting en pattern customization",
      "Enterprise account administratie",
      "Enhanced Security & SLA",
      "Premium support en services",
    ],
    borderColor: "#772d07",
    highlighted: false,
  },
];

export default function Pricing() {
  const [isYearly, setIsYearly] = useState(false);

  return (
    <section id="pricing" className="relative bg-white py-24 lg:py-32">
      <Container>
        <SectionHeading
          title="Transparante prijzen"
          subtitle="Kies het plan dat past bij uw praktijk. Geen verborgen kosten, altijd opzegbaar."
        />

        {/* Billing toggle */}
        <div className="mt-12 flex flex-col items-center gap-4">
          <div className="flex items-center justify-center gap-3">
            <span className={`text-sm font-medium transition-colors ${!isYearly ? 'text-slate-900' : 'text-slate-500'}`}>
              Maandelijks
            </span>
            <button
              onClick={() => setIsYearly(!isYearly)}
              className="relative h-7 w-12 rounded-full bg-slate-200 transition-colors hover:bg-slate-300"
              style={{ backgroundColor: isYearly ? '#772d07' : undefined }}
            >
              <div
                className="absolute top-1 h-5 w-5 rounded-full bg-white shadow-sm transition-transform"
                style={{ transform: isYearly ? 'translateX(22px)' : 'translateX(2px)' }}
              />
            </button>
            <span className={`text-sm font-medium transition-colors ${isYearly ? 'text-slate-900' : 'text-slate-500'}`}>
              Jaarlijks
            </span>
          </div>
          {isYearly && (
            <span className="rounded-full bg-emerald-100 px-3 py-1 text-xs font-semibold text-emerald-700">
              Bespaar 20%
            </span>
          )}
        </div>

        {/* Pricing cards */}
        <div className="mt-12 grid gap-6 lg:grid-cols-3 lg:gap-8">
          {plans.map((plan) => {
            const price = isYearly ? plan.yearlyPrice : plan.monthlyPrice;
            const isHighlighted = plan.highlighted;

            return (
              <div
                key={plan.name}
                className="group relative flex flex-col overflow-hidden rounded-2xl bg-white shadow-lg transition-all duration-300 hover:shadow-xl"
              >
                {/* Colored top border */}
                <div className="h-1" style={{ backgroundColor: plan.borderColor }} />

                <div className="flex flex-1 flex-col p-8">
                  {/* Plan name */}
                  <div className="mb-6 text-center">
                    <h3 className="mb-2 text-2xl font-bold uppercase tracking-wide text-slate-400">
                      {plan.name}
                    </h3>
                  </div>

                  {/* Price */}
                  <div className="mb-6 text-center">
                    {price ? (
                      <>
                        <p className="mb-2 text-sm text-slate-500">
                          {plan.subtitle}
                        </p>
                        <div className="flex items-baseline justify-center gap-1">
                          <span className="text-5xl font-bold text-slate-900">
                            €{price}
                          </span>
                          <span className="text-xl text-slate-600">/mo</span>
                        </div>
                        {isYearly && (
                          <p className="mt-1 text-xs text-slate-500">
                            betaald jaarlijks
                          </p>
                        )}
                      </>
                    ) : (
                      <div className="text-4xl font-bold text-slate-900">
                        {plan.subtitle}
                      </div>
                    )}
                  </div>

                  {/* Description */}
                  <p className="mb-6 text-sm leading-relaxed text-slate-600">
                    {plan.description}
                  </p>

                  {/* Includes label */}
                  <p className="mb-4 text-sm font-semibold text-slate-900">
                    {plan.name === 'Pro' ? 'Everything in Essentials, plus:' : plan.name === 'Business' ? 'Everything in Growth, plus:' : 'Includes:'}
                  </p>

                  {/* Features */}
                  <ul className="mb-8 flex-1 space-y-3">
                    {plan.features.map((feature, idx) => (
                      <li key={idx} className="flex items-start gap-2 text-sm text-slate-700">
                        <span className="text-slate-400">•</span>
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>

                  {/* CTA Button */}
                  <button
                    className="w-full rounded-lg py-3 text-sm font-semibold text-white transition-all hover:opacity-90"
                    style={{ backgroundColor: '#772d07' }}
                  >
                    {plan.name === 'Business' ? 'Request a demo' : 'Test it out'}
                  </button>
                </div>
              </div>
            );
          })}
        </div>

        {/* Bottom CTA */}
        <div className="mt-16 text-center">
          <p className="mb-6 text-base text-slate-600">
            Niet zeker welk plan bij u past?
          </p>
          <a
            href="#contact"
            className="inline-flex items-center gap-2 rounded-xl border-2 border-[#772d07] bg-white px-8 py-3.5 text-sm font-semibold text-[#772d07] transition-all hover:bg-[#772d07] hover:text-white hover:shadow-lg"
          >
            Plan vergelijking aanvragen
          </a>
        </div>
      </Container>
    </section>
  );
}
