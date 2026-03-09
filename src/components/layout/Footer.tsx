import Link from "next/link";
import { Mail, Phone, MapPin } from "lucide-react";
import Container from "@/components/ui/Container";

const footerLinks = {
  product: [
    { label: "Functies", href: "#voordelen" },
    { label: "Hoe werkt het", href: "#hoe-werkt-het" },
    { label: "Prijzen", href: "/prijzen" },
    { label: "Demo aanvragen", href: "/demo" },
  ],
  bedrijf: [
    { label: "Over ons", href: "/over-ons" },
    { label: "Contact", href: "/contact" },
    { label: "Vacatures", href: "/vacatures" },
  ],
  juridisch: [
    { label: "Privacybeleid", href: "/privacy" },
    { label: "Algemene voorwaarden", href: "/voorwaarden" },
    { label: "Verwerkersovereenkomst", href: "/verwerkersovereenkomst" },
  ],
};

export default function Footer() {
  return (
    <footer className="border-t border-cream-200 bg-cream-100">
      <Container className="py-16">
        <div className="grid grid-cols-1 gap-12 md:grid-cols-2 lg:grid-cols-5">
          <div className="lg:col-span-2">
            <Link href="/" className="flex items-center gap-2">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary-700">
                <span className="text-sm font-bold text-white">ZN</span>
              </div>
              <span className="text-lg font-semibold text-slate-900">
                ZorgNotitie
              </span>
            </Link>
            <p className="mt-4 max-w-xs text-sm leading-relaxed text-slate-500">
              AI-gestuurde verslaglegging voor de Nederlandse zorgsector.
              Veilig, betrouwbaar en AVG-proof.
            </p>
            <div className="mt-6 flex flex-col gap-3">
              <a
                href="mailto:info@zorgnotitie.nl"
                className="flex items-center gap-2 text-sm text-slate-500 transition-colors hover:text-primary-600"
              >
                <Mail className="h-4 w-4" />
                info@zorgnotitie.nl
              </a>
              <a
                href="tel:+31201234567"
                className="flex items-center gap-2 text-sm text-slate-500 transition-colors hover:text-primary-600"
              >
                <Phone className="h-4 w-4" />
                +31 (0)20 123 4567
              </a>
              <span className="flex items-center gap-2 text-sm text-slate-500">
                <MapPin className="h-4 w-4" />
                Amsterdam, Nederland
              </span>
            </div>
          </div>

          <div>
            <h4 className="text-sm font-semibold text-slate-900">Product</h4>
            <ul className="mt-4 flex flex-col gap-2.5">
              {footerLinks.product.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-slate-500 transition-colors hover:text-primary-600"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-sm font-semibold text-slate-900">Bedrijf</h4>
            <ul className="mt-4 flex flex-col gap-2.5">
              {footerLinks.bedrijf.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-slate-500 transition-colors hover:text-primary-600"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-sm font-semibold text-slate-900">Juridisch</h4>
            <ul className="mt-4 flex flex-col gap-2.5">
              {footerLinks.juridisch.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-slate-500 transition-colors hover:text-primary-600"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-12 flex flex-col items-center justify-between gap-4 border-t border-cream-200 pt-8 sm:flex-row">
          <p className="text-sm text-slate-400">
            &copy; {new Date().getFullYear()} ZorgNotitie B.V. Alle rechten
            voorbehouden.
          </p>
          <div className="flex items-center gap-2">
            <span className="inline-flex items-center rounded-full bg-accent-50 px-3 py-1 text-xs font-medium text-accent-700">
              NEN 7510 gecertificeerd
            </span>
            <span className="inline-flex items-center rounded-full bg-primary-50 px-3 py-1 text-xs font-medium text-primary-700">
              AVG-proof
            </span>
          </div>
        </div>
      </Container>
    </footer>
  );
}
