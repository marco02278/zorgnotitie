import Container from "@/components/ui/Container";

const clients = [
  { 
    name: "Amsterdam UMC", 
    abbr: "AMC",
    color: "#E31C23",
    bgColor: "#FFFFFF",
    icon: (
      <svg viewBox="0 0 120 80" className="h-10 w-16">
        {/* Amsterdam UMC Tulip Logo */}
        <g>
          {/* Left petal - red */}
          <path d="M25 20 L15 50 L25 70 L35 50 Z" fill="#E31C23"/>
          {/* Center diamond - dark teal */}
          <path d="M35 30 L30 40 L35 50 L40 40 Z" fill="#1B4D5C"/>
          {/* Right petal - orange */}
          <path d="M40 20 L30 50 L40 70 L50 50 Z" fill="#F47920"/>
        </g>
      </svg>
    )
  },
  { 
    name: "Erasmus MC", 
    abbr: "EMC",
    color: "#0066CC",
    bgColor: "#FFFFFF",
    icon: (
      <svg viewBox="0 0 100 60" className="h-8 w-14">
        <text x="5" y="35" fontFamily="Arial, sans-serif" fontSize="28" fontWeight="bold" fill="#0066CC">EMC</text>
        <rect x="5" y="42" width="85" height="3" fill="#0066CC"/>
      </svg>
    )
  },
  { 
    name: "Radboudumc", 
    abbr: "RU",
    color: "#DC2626",
    bgColor: "#FFFFFF",
    icon: (
      <svg viewBox="0 0 80 80" className="h-10 w-10">
        <circle cx="40" cy="40" r="35" fill="none" stroke="#DC2626" strokeWidth="3"/>
        <path d="M25 40 L35 50 L55 30" fill="none" stroke="#DC2626" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    )
  },
  { 
    name: "LUMC", 
    abbr: "LUMC",
    color: "#0047AB",
    bgColor: "#FFFFFF",
    icon: (
      <svg viewBox="0 0 100 60" className="h-8 w-14">
        <text x="5" y="38" fontFamily="Arial, sans-serif" fontSize="32" fontWeight="bold" fill="#0047AB">LUMC</text>
      </svg>
    )
  },
  { 
    name: "GGZ Rivierduinen", 
    abbr: "GGZ-R",
    color: "#772d07",
    bgColor: "#FFFFFF",
    icon: (
      <svg viewBox="0 0 80 80" className="h-10 w-10">
        <path d="M20 60 Q20 30 40 20 Q60 30 60 60" fill="none" stroke="#772d07" strokeWidth="3"/>
        <path d="M30 60 Q30 40 40 30 Q50 40 50 60" fill="none" stroke="#772d07" strokeWidth="3"/>
        <circle cx="40" cy="25" r="4" fill="#772d07"/>
      </svg>
    )
  },
  { 
    name: "Parnassia Groep", 
    abbr: "PG",
    color: "#7C3AED",
    bgColor: "#FFFFFF",
    icon: (
      <svg viewBox="0 0 80 80" className="h-10 w-10">
        <text x="15" y="50" fontFamily="Georgia, serif" fontSize="42" fontWeight="bold" fill="#7C3AED">P</text>
        <circle cx="40" cy="40" r="32" fill="none" stroke="#7C3AED" strokeWidth="2"/>
      </svg>
    )
  },
  { 
    name: "Huisartsen Utrecht", 
    abbr: "HU",
    color: "#EA580C",
    bgColor: "#FFFFFF",
    icon: (
      <svg viewBox="0 0 80 80" className="h-10 w-10">
        <path d="M40 15 L60 35 L60 65 L20 65 L20 35 Z" fill="none" stroke="#EA580C" strokeWidth="3"/>
        <path d="M30 40 L50 40 M40 30 L40 50" stroke="#EA580C" strokeWidth="3" strokeLinecap="round"/>
      </svg>
    )
  },
  { 
    name: "Zorggroep Almere", 
    abbr: "ZGA",
    color: "#0891B2",
    bgColor: "#FFFFFF",
    icon: (
      <svg viewBox="0 0 100 60" className="h-8 w-14">
        <text x="5" y="38" fontFamily="Arial, sans-serif" fontSize="28" fontWeight="bold" fill="#0891B2">ZGA</text>
        <circle cx="85" cy="30" r="8" fill="#0891B2"/>
      </svg>
    )
  },
  { 
    name: "Buurtzorg", 
    abbr: "BZ",
    color: "#772d07",
    bgColor: "#FFFFFF",
    icon: (
      <svg viewBox="0 0 80 80" className="h-10 w-10">
        <path d="M40 25 C25 25 15 35 15 45 C15 60 40 70 40 70 C40 70 65 60 65 45 C65 35 55 25 40 25 Z" fill="#772d07"/>
      </svg>
    )
  },
  { 
    name: "Lentis GGZ", 
    abbr: "LG",
    color: "#DB2777",
    bgColor: "#FFFFFF",
    icon: (
      <svg viewBox="0 0 100 60" className="h-8 w-14">
        <text x="5" y="40" fontFamily="Arial, sans-serif" fontSize="36" fontWeight="bold" fill="#DB2777" fontStyle="italic">L</text>
        <path d="M45 20 L45 50" stroke="#DB2777" strokeWidth="3"/>
      </svg>
    )
  },
  { 
    name: "Isala Ziekenhuis", 
    abbr: "ISA",
    color: "#2563EB",
    bgColor: "#FFFFFF",
    icon: (
      <svg viewBox="0 0 80 80" className="h-10 w-10">
        <path d="M40 20 L40 60 M20 40 L60 40" stroke="#2563EB" strokeWidth="6" strokeLinecap="round"/>
        <circle cx="40" cy="40" r="30" fill="none" stroke="#2563EB" strokeWidth="2"/>
      </svg>
    )
  },
  { 
    name: "Reinier de Graaf", 
    abbr: "RdG",
    color: "#0D9488",
    bgColor: "#FFFFFF",
    icon: (
      <svg viewBox="0 0 100 60" className="h-8 w-14">
        <text x="5" y="38" fontFamily="Georgia, serif" fontSize="32" fontWeight="bold" fill="#0D9488">RdG</text>
      </svg>
    )
  },
];

function LogoCard({ name, abbr, color, bgColor, icon }: { 
  name: string; 
  abbr: string; 
  color: string;
  bgColor: string;
  icon: React.ReactNode;
}) {
  return (
    <div className="mx-6 flex shrink-0 items-center gap-3 rounded-xl border border-cream-200 bg-white px-6 py-4 shadow-sm transition-all hover:shadow-md">
      <div 
        className="flex h-12 w-12 items-center justify-center rounded-lg"
        style={{ backgroundColor: bgColor, color: color }}
      >
        {icon}
      </div>
      <span className="whitespace-nowrap text-sm font-medium text-slate-700">
        {name}
      </span>
    </div>
  );
}

export default function ClientLogos() {
  return (
    <section className="overflow-hidden border-y border-cream-200 bg-cream-100 py-12">
      <Container className="mb-8">
        <p className="text-center text-sm font-medium uppercase tracking-wider text-slate-400">
          Vertrouwd door zorgorganisaties door heel Nederland
        </p>
      </Container>

      <div className="relative">
        {/* Fade edges */}
        <div className="pointer-events-none absolute left-0 top-0 z-10 h-full w-24 bg-gradient-to-r from-cream-100 to-transparent" />
        <div className="pointer-events-none absolute right-0 top-0 z-10 h-full w-24 bg-gradient-to-l from-cream-100 to-transparent" />

        {/* Scrolling track — duplicated for seamless loop */}
        <div className="animate-scroll-left flex w-max">
          {clients.map((c, i) => (
            <LogoCard key={`a-${i}`} name={c.name} abbr={c.abbr} color={c.color} bgColor={c.bgColor} icon={c.icon} />
          ))}
          {clients.map((c, i) => (
            <LogoCard key={`b-${i}`} name={c.name} abbr={c.abbr} color={c.color} bgColor={c.bgColor} icon={c.icon} />
          ))}
        </div>
      </div>
    </section>
  );
}
