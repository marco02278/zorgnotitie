import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import Hero from "@/components/sections/Hero";
import VideoStats from "@/components/sections/VideoStats";
import HowItWorksAnimated from "@/components/sections/HowItWorksAnimated";
import Compliance from "@/components/sections/Compliance";
import PhotoGrid from "@/components/sections/PhotoGrid";
import ClientLogos from "@/components/sections/ClientLogos";
import Templates from "@/components/sections/Templates";
import APIIntegrations from "@/components/sections/APIIntegrations";
import TestimonialsAnimated from "@/components/sections/TestimonialsAnimated";
import AboutUs from "@/components/sections/AboutUs";
import Pricing from "@/components/sections/Pricing";
import FAQ from "@/components/sections/FAQ";
import Contact from "@/components/sections/Contact";

export default function Home() {
  return (
    <>
      <Navbar />
      <main>

        {/* ── GLOW RECHTS #1: Hero + VideoStats + HowItWorks ── */}
        <div className="glow-block-right">
          <Hero />
          <div id="about">
            <VideoStats />
          </div>
          <HowItWorksAnimated />
        </div>

        {/* ── GLOW LINKS #1: Compliance + PhotoGrid + ClientLogos ── */}
        <div className="glow-block-left">
          <div id="veiligheid">
            <Compliance />
          </div>
          <PhotoGrid />
          <ClientLogos />
        </div>

        {/* ── GLOW RECHTS #2: Templates + API ── */}
        <div className="glow-block-right">
          <div id="templates">
            <Templates />
          </div>
          <div id="api">
            <APIIntegrations />
          </div>
        </div>

        {/* ── GLOW LINKS #2: Testimonials + AboutUs + Pricing + FAQ + Contact ── */}
        <div className="glow-block-left">
          <TestimonialsAnimated />
          <div id="over-ons">
            <AboutUs />
          </div>
          <div id="pricing">
            <Pricing />
          </div>
          <FAQ />
          <div id="contact">
            <Contact />
          </div>
        </div>

      </main>
      <Footer />
    </>
  );
}
