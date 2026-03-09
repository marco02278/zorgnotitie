"use client";

import { useState } from "react";
import { Check } from "lucide-react";

const plans = [
  {
    name: "Starter",
    description: "Perfect voor kleine praktijken",
    price: "149",
    period: "per maand",
    features: [
      "Tot 50 gesprekken per maand",
      "Automatische verslaglegging",
      "NHG-standaard rapportages",
      "Basis integraties",
      "Email support",
      "AVG-compliant opslag",
    ],
    highlighted: false,
  },
  {
    name: "Professional",
    description: "Voor groeiende zorgorganisaties",
    price: "349",
    period: "per maand",
    features: [
      "Tot 200 gesprekken per maand",
      "Geavanceerde AI-verslaglegging",
      "Alle rapportage templates",
      "Premium integraties (EPD/HIS)",
      "Prioriteit support (24/7)",
      "Team collaboration tools",
      "Custom workflows",
      "API toegang",
    ],
    highlighted: true,
    badge: "Meest gekozen",
  },
  {
    name: "Enterprise",
    description: "Voor grote ziekenhuizen en GGZ",
    price: "Op maat",
    period: "neem contact op",
    features: [
      "Onbeperkt aantal gesprekken",
      "Dedicated AI-model training",
      "Volledige EPD/HIS integratie",
      "Dedicated account manager",
      "24/7 premium support",
      "On-premise deployment optie",
      "Custom feature development",
      "SLA garanties",
      "Training & onboarding",
    ],
    highlighted: false,
  },
];

export default function Pricing() {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-cream-50 to-white py-24">
      {/* Background decoration */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -left-4 top-0 h-72 w-72 rounded-full bg-primary-100/30 blur-3xl" />
        <div className="absolute -right-4 bottom-0 h-72 w-72 rounded-full bg-primary-100/30 blur-3xl" />
      </div>

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-16 text-center">
          <h2 className="mb-4 text-4xl font-bold text-slate-800 sm:text-5xl lg:text-6xl">
            Transparante prijzen
          </h2>
          <p className="mx-auto max-w-2xl text-lg text-slate-600 sm:text-xl">
            Kies het plan dat past bij uw praktijk. Geen verborgen kosten, altijd opzegbaar.
          </p>
        </div>

        {/* Pricing cards */}
        <div className="grid gap-8 lg:grid-cols-3">
          {plans.map((plan, index) => {
            const isHovered = hoveredIndex === index;
            const isHighlighted = plan.highlighted;

            return (
              <div
                key={plan.name}
                className={`relative flex flex-col rounded-2xl border-2 bg-white p-8 shadow-lg transition-all duration-300 ${
                  isHighlighted
                    ? "border-primary-500 shadow-primary-500/20 lg:scale-105"
                    : "border-slate-200"
                } ${isHovered && !isHighlighted ? "scale-105 shadow-xl" : ""}`}
                onMouseEnter={() => setHoveredIndex(index)}
                onMouseLeave={() => setHoveredIndex(null)}
              >
                {/* Badge */}
                {plan.badge && (
                  <div className="absolute -top-4 left-1/2 -translate-x-1/2">
                    <span className="rounded-full bg-primary-500 px-4 py-1 text-sm font-semibold text-white shadow-lg">
                      {plan.badge}
                    </span>
                  </div>
                )}

                {/* Plan header */}
                <div className="mb-6">
                  <h3 className="mb-2 text-2xl font-bold text-slate-800">
                    {plan.name}
                  </h3>
                  <p className="text-sm text-slate-600">{plan.description}</p>
                </div>

                {/* Price */}
                <div className="mb-6">
                  {plan.price === "Op maat" ? (
                    <div>
                      <div className="text-4xl font-bold text-slate-800">
                        {plan.price}
                      </div>
                      <div className="mt-1 text-sm text-slate-600">
                        {plan.period}
                      </div>
                    </div>
                  ) : (
                    <div>
                      <div className="flex items-baseline">
                        <span className="text-5xl font-bold text-slate-800">
                          €{plan.price}
                        </span>
                        <span className="ml-2 text-slate-600">/{plan.period.split(" ")[1]}</span>
                      </div>
                      <div className="mt-1 text-sm text-slate-600">
                        Excl. BTW
                      </div>
                    </div>
                  )}
                </div>

                {/* CTA Button */}
                <button
                  className={`mb-8 w-full rounded-xl py-4 font-semibold transition-all duration-300 ${
                    isHighlighted
                      ? "bg-primary-500 text-white shadow-lg hover:bg-primary-600 hover:shadow-xl"
                      : "border-2 border-slate-300 bg-white text-slate-800 hover:border-primary-500 hover:bg-primary-50"
                  }`}
                >
                  {plan.price === "Op maat" ? "Neem contact op" : "Start gratis proefperiode"}
                </button>

                {/* Features */}
                <div className="flex-1">
                  <ul className="space-y-4">
                    {plan.features.map((feature, featureIndex) => (
                      <li
                        key={featureIndex}
                        className="flex items-start gap-3"
                        style={{
                          animation: isHovered
                            ? `slideIn 0.3s ease-out ${featureIndex * 0.05}s both`
                            : "none",
                        }}
                      >
                        <div
                          className={`mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full ${
                            isHighlighted
                              ? "bg-primary-100 text-primary-600"
                              : "bg-slate-100 text-slate-600"
                          }`}
                        >
                          <Check className="h-3 w-3" strokeWidth={3} />
                        </div>
                        <span className="text-sm text-slate-700">{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            );
          })}
        </div>

        {/* Bottom CTA */}
        <div className="mt-16 text-center">
          <p className="mb-4 text-slate-600">
            Niet zeker welk plan bij u past?
          </p>
          <a
            href="#contact"
            className="inline-flex items-center gap-2 rounded-xl border-2 border-primary-500 bg-white px-8 py-3 font-semibold text-primary-600 transition-all hover:bg-primary-50"
          >
            Plan vergelijking aanvragen
          </a>
        </div>
      </div>

      <style jsx>{`
        @keyframes slideIn {
          from {
            opacity: 0;
            transform: translateX(-10px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }
      `}</style>
    </section>
  );
}
