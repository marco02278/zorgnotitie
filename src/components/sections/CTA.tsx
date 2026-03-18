import { ArrowRight } from "lucide-react";
import Container from "@/components/ui/Container";
import Button from "@/components/ui/Button";

export default function CTA() {
  return (
    <section className="py-24 lg:py-32">
      <Container>
        <div className="mx-auto max-w-3xl text-center">
          <h2 className="text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
            Klaar om uw verslaglegging te transformeren?
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-lg leading-relaxed text-slate-500">
            Sluit u aan bij honderden zorgverleners die al dagelijks tijd
            besparen met ZorgNotitie. Start vandaag nog met uw gratis proefperiode.
          </p>
          <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
            <Button href="/contact" variant="primary" size="lg">
              Neem contact op
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </div>
          <p className="mt-6 text-sm text-slate-400">
            Geen creditcard nodig &middot; 14 dagen gratis &middot; Vrijblijvend
          </p>
        </div>
      </Container>
    </section>
  );
}
