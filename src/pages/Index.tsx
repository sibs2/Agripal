import Hero from "@/components/sections/Hero";
import Stats from "@/components/sections/Stats";
import Services from "@/components/sections/Services";
import AboutUs from "@/components/sections/AboutUs";
import CTA from "@/components/sections/CTA";

const Index = () => {
  return (
    <div className="min-h-screen">
      <Hero />
      <Services />
      <Stats />
      <AboutUs />
      <CTA />
    </div>
  );
};

export default Index;
