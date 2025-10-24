import { ArrowRight, Leaf, Users, BookOpen } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useState, useEffect } from "react";
import heroField1 from "@/assets/hero-agripal-team.jpg";
import heroField2 from "@/assets/hero-team-1.jpg";
import heroField3 from "@/assets/hero-team-2.jpg";

const Hero = () => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const images = [heroField1, heroField2, heroField3];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, 5000); // Change image every 5 seconds

    return () => clearInterval(interval);
  }, []);
  const scrollToServices = () => {
    const servicesSection = document.getElementById('services');
    if (servicesSection) {
      servicesSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const scrollToFooter = () => {
    const footerSection = document.getElementById('footer');
    if (footerSection) {
      footerSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section id="hero" className="relative min-h-[65vh] sm:min-h-[75vh] flex items-start overflow-hidden">
      {/* Background Image Carousel with Overlay */}
      {images.map((image, index) => (
        <div
          key={index}
          className={`absolute inset-0 bg-cover bg-center bg-no-repeat transition-transform duration-700 ease-in-out ${
            index === currentImageIndex ? 'translate-x-0' : index < currentImageIndex ? '-translate-x-full' : 'translate-x-full'
          }`}
          style={{ backgroundImage: `url(${image})` }}
        >
          <div className="absolute inset-0 bg-green-900/90" />
          {/* Preload images */}
          <link rel="preload" as="image" href={image} />
        </div>
      ))}

      <div className="relative z-10 container px-4 text-white pt-40 sm:pt-36 md:pt-40 pb-12 md:pb-16 lg:pb-20">
        <div className="max-w-6xl space-y-4 sm:space-y-8">
          {/* Main Heading */}
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-5xl xl:text-5xl font-bold font-heading leading-tight max-w-4xl cursor-default">
            <span style={{color: '#e16600'}}>Unlocking</span> Your{" "}
            <span style={{color: '#e16600'}}>Farming Potential</span>
            <br className="hidden sm:block" />
            <span className="sm:hidden"> </span>With{" "}
            <span style={{color: '#e16600'}}>Smart</span> Agricultural
            <br className="hidden sm:block" />
            <span className="sm:hidden"> </span><span style={{color: '#e16600'}}>Solutions</span>
          </h1>

          <p className="text-sm sm:text-base md:text-lg lg:text-xl text-white/90 max-w-3xl leading-relaxed animate-[fade-in_0.8s_ease-out_0.3s_both]">
            We empower farmers to reach commercial standards through the use of modern
            technologies, continuous innovation and agric skills transfer.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row items-start gap-3 sm:gap-4 pt-4 sm:pt-8">
            <Button 
              size="lg" 
              className="bg-accent hover:bg-accent/90 text-white font-medium px-6 sm:px-8 w-full sm:w-auto"
              onClick={scrollToServices}
            >
              Our Services
            </Button>
            <Button 
              variant="outline" 
              size="lg" 
              className="border-2 border-accent text-accent bg-transparent hover:bg-accent hover:text-white px-6 sm:px-8 font-bold w-full sm:w-auto"
              onClick={scrollToFooter}
            >
              Contact Now
            </Button>
          </div>

        </div>
      </div>

    </section>
  );
};

export default Hero;