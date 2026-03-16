"use client";

import { useState } from "react";
import { Send, Mail, Phone, MapPin, ArrowRight } from "lucide-react";
import Container from "@/components/ui/Container";

export default function Contact() {
  const [formState, setFormState] = useState({
    naam: "",
    email: "",
    organisatie: "",
    telefoon: "",
    bericht: "",
  });
  const [submitted, setSubmitted] = useState(false);
  const [focusedField, setFocusedField] = useState<string | null>(null);

  function handleChange(
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) {
    setFormState({ ...formState, [e.target.name]: e.target.value });
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSubmitted(true);
  }

  return (
    <section id="contact" className="bg-white py-24 lg:py-32">
      <Container>
        <div className="mx-auto max-w-6xl">
          {/* Header */}
          <div className="text-center mb-16">
            <h2 className="text-5xl font-light text-slate-800 mb-4">
              Laten we <span className="italic text-[#772d07]">kennismaken</span>
            </h2>
            <p className="text-lg text-slate-600 max-w-2xl mx-auto">
              Heeft u vragen of wilt u een demo aanvragen? We nemen binnen 24 uur contact met u op.
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-12">
            {/* Contact Info - Left Side */}
            <div className="space-y-8">
              <div>
                <h3 className="text-2xl font-medium text-slate-800 mb-6">Contactgegevens</h3>
                <div className="space-y-6">
                  <a
                    href="mailto:info@zorgnotitie.nl"
                    className="group flex items-start gap-4 p-4 rounded-xl transition-all hover:bg-white hover:shadow-sm"
                  >
                    <div className="flex h-12 w-12 items-center justify-center rounded-full bg-[#772d07]/10 text-[#772d07] transition-colors group-hover:bg-[#772d07] group-hover:text-white">
                      <Mail className="h-5 w-5" />
                    </div>
                    <div>
                      <p className="text-sm font-medium text-slate-500 mb-1">Email</p>
                      <p className="text-base text-slate-800 group-hover:text-[#772d07]">info@zorgnotitie.nl</p>
                    </div>
                  </a>

                  <a
                    href="tel:+31201234567"
                    className="group flex items-start gap-4 p-4 rounded-xl transition-all hover:bg-white hover:shadow-sm"
                  >
                    <div className="flex h-12 w-12 items-center justify-center rounded-full bg-[#772d07]/10 text-[#772d07] transition-colors group-hover:bg-[#772d07] group-hover:text-white">
                      <Phone className="h-5 w-5" />
                    </div>
                    <div>
                      <p className="text-sm font-medium text-slate-500 mb-1">Telefoon</p>
                      <p className="text-base text-slate-800 group-hover:text-[#772d07]">+31 (0)20 123 4567</p>
                    </div>
                  </a>

                  <div className="flex items-start gap-4 p-4">
                    <div className="flex h-12 w-12 items-center justify-center rounded-full bg-[#772d07]/10 text-[#772d07]">
                      <MapPin className="h-5 w-5" />
                    </div>
                    <div>
                      <p className="text-sm font-medium text-slate-500 mb-1">Adres</p>
                      <p className="text-base text-slate-800">Keizersgracht 520</p>
                      <p className="text-base text-slate-800">1017 EK Amsterdam</p>
                    </div>
                  </div>
                </div>
              </div>

            </div>

            {/* Form - Right Side */}
            <div className="bg-white rounded-2xl shadow-lg p-8 lg:p-10">
              {submitted ? (
                <div className="flex flex-col items-center justify-center py-12 text-center">
                  <div className="flex h-20 w-20 items-center justify-center rounded-full bg-emerald-100 mb-6">
                    <Send className="h-9 w-9 text-emerald-600" />
                  </div>
                  <h3 className="text-2xl font-medium text-slate-800 mb-3">
                    Bericht verzonden!
                  </h3>
                  <p className="text-base text-slate-600 max-w-sm">
                    Bedankt voor uw bericht. We nemen zo snel mogelijk contact met u op.
                  </p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-8">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    <div className="relative">
                      <input
                        type="text"
                        id="naam"
                        name="naam"
                        required
                        value={formState.naam}
                        onChange={handleChange}
                        onFocus={() => setFocusedField("naam")}
                        onBlur={() => setFocusedField(null)}
                        className="peer w-full border-b-2 border-slate-200 bg-transparent px-0 py-3 text-base text-slate-800 outline-none transition-colors focus:border-[#772d07] placeholder-transparent"
                        placeholder="Naam"
                      />
                      <label
                        htmlFor="naam"
                        className={`absolute left-0 -top-3.5 text-sm font-medium transition-all peer-placeholder-shown:top-3 peer-placeholder-shown:text-base peer-placeholder-shown:text-slate-400 peer-focus:-top-3.5 peer-focus:text-sm ${
                          focusedField === "naam" ? "text-[#772d07]" : "text-slate-600"
                        }`}
                      >
                        Naam *
                      </label>
                    </div>

                    <div className="relative">
                      <input
                        type="email"
                        id="email"
                        name="email"
                        required
                        value={formState.email}
                        onChange={handleChange}
                        onFocus={() => setFocusedField("email")}
                        onBlur={() => setFocusedField(null)}
                        className="peer w-full border-b-2 border-slate-200 bg-transparent px-0 py-3 text-base text-slate-800 outline-none transition-colors focus:border-[#772d07] placeholder-transparent"
                        placeholder="Email"
                      />
                      <label
                        htmlFor="email"
                        className={`absolute left-0 -top-3.5 text-sm font-medium transition-all peer-placeholder-shown:top-3 peer-placeholder-shown:text-base peer-placeholder-shown:text-slate-400 peer-focus:-top-3.5 peer-focus:text-sm ${
                          focusedField === "email" ? "text-[#772d07]" : "text-slate-600"
                        }`}
                      >
                        E-mailadres *
                      </label>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    <div className="relative">
                      <input
                        type="text"
                        id="organisatie"
                        name="organisatie"
                        value={formState.organisatie}
                        onChange={handleChange}
                        onFocus={() => setFocusedField("organisatie")}
                        onBlur={() => setFocusedField(null)}
                        className="peer w-full border-b-2 border-slate-200 bg-transparent px-0 py-3 text-base text-slate-800 outline-none transition-colors focus:border-[#772d07] placeholder-transparent"
                        placeholder="Organisatie"
                      />
                      <label
                        htmlFor="organisatie"
                        className={`absolute left-0 -top-3.5 text-sm font-medium transition-all peer-placeholder-shown:top-3 peer-placeholder-shown:text-base peer-placeholder-shown:text-slate-400 peer-focus:-top-3.5 peer-focus:text-sm ${
                          focusedField === "organisatie" ? "text-[#772d07]" : "text-slate-600"
                        }`}
                      >
                        Organisatie
                      </label>
                    </div>

                    <div className="relative">
                      <input
                        type="tel"
                        id="telefoon"
                        name="telefoon"
                        value={formState.telefoon}
                        onChange={handleChange}
                        onFocus={() => setFocusedField("telefoon")}
                        onBlur={() => setFocusedField(null)}
                        className="peer w-full border-b-2 border-slate-200 bg-transparent px-0 py-3 text-base text-slate-800 outline-none transition-colors focus:border-[#772d07] placeholder-transparent"
                        placeholder="Telefoon"
                      />
                      <label
                        htmlFor="telefoon"
                        className={`absolute left-0 -top-3.5 text-sm font-medium transition-all peer-placeholder-shown:top-3 peer-placeholder-shown:text-base peer-placeholder-shown:text-slate-400 peer-focus:-top-3.5 peer-focus:text-sm ${
                          focusedField === "telefoon" ? "text-[#772d07]" : "text-slate-600"
                        }`}
                      >
                        Telefoonnummer
                      </label>
                    </div>
                  </div>

                  <div className="relative">
                    <textarea
                      id="bericht"
                      name="bericht"
                      required
                      rows={4}
                      value={formState.bericht}
                      onChange={handleChange}
                      onFocus={() => setFocusedField("bericht")}
                      onBlur={() => setFocusedField(null)}
                      className="peer w-full resize-none border-b-2 border-slate-200 bg-transparent px-0 py-3 text-base text-slate-800 outline-none transition-colors focus:border-[#772d07] placeholder-transparent"
                      placeholder="Bericht"
                    />
                    <label
                      htmlFor="bericht"
                      className={`absolute left-0 -top-3.5 text-sm font-medium transition-all peer-placeholder-shown:top-3 peer-placeholder-shown:text-base peer-placeholder-shown:text-slate-400 peer-focus:-top-3.5 peer-focus:text-sm ${
                        focusedField === "bericht" ? "text-[#772d07]" : "text-slate-600"
                      }`}
                    >
                      Bericht *
                    </label>
                  </div>

                  <div className="flex items-center justify-between pt-4">
                    <p className="text-sm text-slate-500">
                      * Verplichte velden
                    </p>
                    <button
                      type="submit"
                      className="group inline-flex items-center gap-2 rounded-full bg-[#772d07] px-8 py-3.5 text-base font-medium text-white shadow-lg transition-all hover:bg-[#5a2205] hover:shadow-xl hover:scale-105"
                    >
                      Verstuur bericht
                      <ArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-1" />
                    </button>
                  </div>
                </form>
              )}
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
