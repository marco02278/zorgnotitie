"use client";

import Image from "next/image";
import Container from "@/components/ui/Container";

const epdLogos = [
  { name: "ChipSoft HiX", logo: "https://www.chipsoft.nl/wp-content/themes/chipsoft/images/logo.svg" },
  { name: "Medicom", logo: "https://www.medicom.nl/wp-content/uploads/2021/03/medicom-logo.svg" },
  { name: "Nedap Ons", logo: "https://www.nedap.com/sites/default/files/styles/max_1300x1300/public/2021-03/nedap-logo.png" },
  { name: "Zorgdomein", logo: "https://www.zorgdomein.nl/images/logo.svg" },
  { name: "Epic", logo: "https://www.epic.com/epic/images/epic-logo.svg" },
  { name: "CGM", logo: "https://www.cgm.com/corp_en/media/logo.svg" },
];

export default function APIIntegrations() {
  return (
    <section className="relative overflow-hidden bg-slate-50 py-24 lg:py-32">
      {/* Animated EPD Icons Background */}
      <div className="absolute inset-0 overflow-hidden">
        {/* First row - moving left */}
        <div className="absolute top-1/4 flex w-[200%] animate-scroll-left gap-12">
          {[...epdLogos, ...epdLogos, ...epdLogos, ...epdLogos].map((item, index) => (
            <div key={index} className="flex flex-col items-center gap-2">
              <div className="relative h-20 w-32 rounded-2xl bg-white p-4 shadow-sm">
                <Image
                  src={item.logo}
                  alt={item.name}
                  fill
                  className="object-contain opacity-40"
                  unoptimized
                />
              </div>
              <span className="text-xs font-semibold text-slate-400/50" style={{ fontFamily: 'Satoshi, "Satoshi Placeholder", sans-serif' }}>
                {item.name}
              </span>
            </div>
          ))}
        </div>
        
        {/* Second row - moving right (opposite direction) */}
        <div className="absolute top-2/3 flex w-[200%] animate-scroll-right gap-12">
          {[...epdLogos, ...epdLogos, ...epdLogos, ...epdLogos].map((item, index) => (
            <div key={index} className="flex flex-col items-center gap-2">
              <div className="relative h-20 w-32 rounded-2xl bg-white p-4 shadow-sm">
                <Image
                  src={item.logo}
                  alt={item.name}
                  fill
                  className="object-contain opacity-40"
                  unoptimized
                />
              </div>
              <span className="text-xs font-semibold text-slate-400/50" style={{ fontFamily: 'Satoshi, "Satoshi Placeholder", sans-serif' }}>
                {item.name}
              </span>
            </div>
          ))}
        </div>
        
        {/* Blur overlay */}
        <div className="absolute inset-0 bg-slate-50/80" />
      </div>
      
      {/* Content overlay */}
      <Container>
        <div className="relative z-10 mx-auto max-w-3xl text-center">
          {/* Title */}
          <h2
            className="mb-6 text-5xl font-bold text-slate-900 sm:text-6xl lg:text-7xl"
            style={{ fontFamily: 'Satoshi, "Satoshi Placeholder", sans-serif' }}
          >
            EPD-koppeling
          </h2>
          
          {/* Coming soon text */}
          <div className="mb-8">
            <p
              className="text-2xl font-semibold text-[#772d07] sm:text-3xl"
              style={{ fontFamily: 'Satoshi, "Satoshi Placeholder", sans-serif' }}
            >
              Binnenkort beschikbaar
            </p>
          </div>
          
          {/* Description */}
          <p
            className="mx-auto mb-8 max-w-2xl text-lg leading-relaxed text-slate-600"
            style={{ fontFamily: 'Satoshi, "Satoshi Placeholder", sans-serif' }}
          >
            We bouwen iets speciaals voor uw praktijk. Wees de eerste die het weet wanneer we lanceren en krijg vroege toegang tot onze EPD-integraties.
          </p>
          
          {/* CTA */}
          <a
            href="#contact"
            className="inline-flex items-center gap-2 rounded-full bg-[#772d07] px-8 py-4 text-lg font-semibold text-white shadow-lg transition-all hover:bg-[#5a2105] hover:shadow-xl"
            style={{ fontFamily: 'Satoshi, "Satoshi Placeholder", sans-serif' }}
          >
            Houd mij op de hoogte
          </a>
        </div>
      </Container>
      
    </section>
  );
}
