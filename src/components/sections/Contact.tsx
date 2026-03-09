"use client";

import { useState } from "react";
import { Send, Mail, Phone, MapPin } from "lucide-react";
import Container from "@/components/ui/Container";
import SectionHeading from "@/components/ui/SectionHeading";

export default function Contact() {
  const [formState, setFormState] = useState({
    naam: "",
    email: "",
    organisatie: "",
    telefoon: "",
    bericht: "",
  });
  const [submitted, setSubmitted] = useState(false);

  function handleChange(
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) {
    setFormState({ ...formState, [e.target.name]: e.target.value });
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    // TODO: Koppel aan API endpoint
    setSubmitted(true);
  }

  return (
    <section id="contact" className="bg-cream-50 py-24 lg:py-32">
      <Container>
        <SectionHeading
          title="Neem contact op"
          subtitle="Heeft u vragen of wilt u een demo aanvragen? Vul het formulier in en we nemen binnen 24 uur contact met u op."
        />

        <div className="mx-auto mt-16 grid max-w-5xl grid-cols-1 gap-12 lg:grid-cols-5">
          {/* Contact info */}
          <div className="lg:col-span-2">
            <div className="rounded-2xl bg-gradient-to-br from-primary-700 to-primary-900 p-8 text-white">
              <h3 className="text-xl font-bold">Contactgegevens</h3>
              <p className="mt-2 text-sm text-primary-100">
                We staan klaar om u te helpen.
              </p>

              <div className="mt-8 flex flex-col gap-5">
                <a
                  href="mailto:info@zorgnotitie.nl"
                  className="flex items-center gap-3 text-sm text-primary-100 transition-colors hover:text-white"
                >
                  <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-white/10">
                    <Mail className="h-5 w-5" />
                  </div>
                  info@zorgnotitie.nl
                </a>
                <a
                  href="tel:+31201234567"
                  className="flex items-center gap-3 text-sm text-primary-100 transition-colors hover:text-white"
                >
                  <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-white/10">
                    <Phone className="h-5 w-5" />
                  </div>
                  +31 (0)20 123 4567
                </a>
                <div className="flex items-center gap-3 text-sm text-primary-100">
                  <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-white/10">
                    <MapPin className="h-5 w-5" />
                  </div>
                  <div>
                    <p>Keizersgracht 520</p>
                    <p>1017 EK Amsterdam</p>
                  </div>
                </div>
              </div>

              <div className="mt-10 border-t border-white/20 pt-6">
                <p className="text-xs text-primary-200">
                  Bereikbaar op werkdagen van 09:00 tot 17:30
                </p>
              </div>
            </div>
          </div>

          {/* Form */}
          <div className="lg:col-span-3">
            {submitted ? (
              <div className="flex h-full items-center justify-center rounded-2xl border border-accent-200 bg-accent-50 p-12 text-center">
                <div>
                  <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-accent-100">
                    <Send className="h-7 w-7 text-accent-600" />
                  </div>
                  <h3 className="mt-4 text-xl font-bold text-slate-900">
                    Bericht verzonden!
                  </h3>
                  <p className="mt-2 text-sm text-slate-500">
                    Bedankt voor uw bericht. We nemen zo snel mogelijk contact
                    met u op.
                  </p>
                </div>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="flex flex-col gap-5">
                <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
                  <div>
                    <label
                      htmlFor="naam"
                      className="mb-1.5 block text-sm font-medium text-slate-700"
                    >
                      Naam *
                    </label>
                    <input
                      type="text"
                      id="naam"
                      name="naam"
                      required
                      value={formState.naam}
                      onChange={handleChange}
                      className="w-full rounded-lg border border-cream-300 bg-cream-50 px-4 py-2.5 text-sm text-slate-800 outline-none transition-colors placeholder:text-slate-400 focus:border-primary-400 focus:ring-2 focus:ring-primary-100"
                      placeholder="Uw volledige naam"
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="email"
                      className="mb-1.5 block text-sm font-medium text-slate-700"
                    >
                      E-mailadres *
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      required
                      value={formState.email}
                      onChange={handleChange}
                      className="w-full rounded-lg border border-cream-300 bg-cream-50 px-4 py-2.5 text-sm text-slate-800 outline-none transition-colors placeholder:text-slate-400 focus:border-primary-400 focus:ring-2 focus:ring-primary-100"
                      placeholder="naam@organisatie.nl"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
                  <div>
                    <label
                      htmlFor="organisatie"
                      className="mb-1.5 block text-sm font-medium text-slate-700"
                    >
                      Organisatie
                    </label>
                    <input
                      type="text"
                      id="organisatie"
                      name="organisatie"
                      value={formState.organisatie}
                      onChange={handleChange}
                      className="w-full rounded-lg border border-cream-300 bg-cream-50 px-4 py-2.5 text-sm text-slate-800 outline-none transition-colors placeholder:text-slate-400 focus:border-primary-400 focus:ring-2 focus:ring-primary-100"
                      placeholder="Naam van uw organisatie"
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="telefoon"
                      className="mb-1.5 block text-sm font-medium text-slate-700"
                    >
                      Telefoonnummer
                    </label>
                    <input
                      type="tel"
                      id="telefoon"
                      name="telefoon"
                      value={formState.telefoon}
                      onChange={handleChange}
                      className="w-full rounded-lg border border-cream-300 bg-cream-50 px-4 py-2.5 text-sm text-slate-800 outline-none transition-colors placeholder:text-slate-400 focus:border-primary-400 focus:ring-2 focus:ring-primary-100"
                      placeholder="+31 6 12345678"
                    />
                  </div>
                </div>

                <div>
                  <label
                    htmlFor="bericht"
                    className="mb-1.5 block text-sm font-medium text-slate-700"
                  >
                    Bericht *
                  </label>
                  <textarea
                    id="bericht"
                    name="bericht"
                    required
                    rows={5}
                    value={formState.bericht}
                    onChange={handleChange}
                    className="w-full resize-none rounded-lg border border-cream-300 bg-cream-50 px-4 py-2.5 text-sm text-slate-800 outline-none transition-colors placeholder:text-slate-400 focus:border-primary-400 focus:ring-2 focus:ring-primary-100"
                    placeholder="Vertel ons hoe we u kunnen helpen..."
                  />
                </div>

                <div className="flex items-center justify-between">
                  <p className="text-xs text-slate-400">
                    * Verplichte velden
                  </p>
                  <button
                    type="submit"
                    className="inline-flex cursor-pointer items-center gap-2 rounded-lg bg-primary-700 px-6 py-2.5 text-sm font-medium text-white shadow-sm transition-colors hover:bg-primary-800"
                  >
                    Verstuur bericht
                    <Send className="h-4 w-4" />
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      </Container>
    </section>
  );
}
