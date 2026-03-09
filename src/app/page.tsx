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
import FAQ from "@/components/sections/FAQ";
import Contact from "@/components/sections/Contact";
import CTA from "@/components/sections/CTA";

export default function Home() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <div id="about">
          <VideoStats />
        </div>
        <div id="service">
          <HowItWorksAnimated />
          <Compliance />
          <PhotoGrid />
        </div>
        <ClientLogos />
        <div id="hoe-werkt-het">
          <Templates />
          <APIIntegrations />
        </div>
        <div id="pricing">
          <TestimonialsAnimated />
        </div>
        <div id="reviews">
          <AboutUs />
        </div>
        <FAQ />
        <div id="contact">
          <Contact />
        </div>
      </main>
      <Footer />
    </>
  );
}
