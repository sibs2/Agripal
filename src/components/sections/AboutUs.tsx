import { Quote } from "lucide-react";
import aboutTeamBanner from "@/assets/about-team-banner.jpg";
import aboutTeamField from "@/assets/about-team-field.jpg";

const AboutUs = () => {
  return (
    <section id="about" className="py-12 sm:py-16 lg:py-20 bg-background">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-8 sm:mb-12 lg:mb-16">
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-foreground mb-4 sm:mb-6">About Us</h2>
            <div className="w-20 sm:w-24 h-1 bg-gradient-to-r from-primary to-accent mx-auto"></div>
          </div>
          
          {/* Quote Section */}
          <div className="bg-muted/30 rounded-lg sm:rounded-2xl p-4 sm:p-6 lg:p-8 border border-border/50 mb-8 sm:mb-12 lg:mb-16">
            <Quote className="h-6 w-6 sm:h-8 sm:w-8 text-primary mb-3 sm:mb-4 mx-auto" />
            <blockquote className="text-base sm:text-lg lg:text-2xl font-medium text-center text-foreground mb-3 sm:mb-4">
              "By 2030, agriculture in Africa will be a trillion-dollar industry."
            </blockquote>
            <cite className="text-center block text-primary font-medium text-sm sm:text-base">
              - Dr. Akinwumi Adesina
            </cite>
          </div>

          {/* Main Content with Image */}
          <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center mb-12 lg:mb-16">
            <div className="order-2 lg:order-1 relative">
              {/* Layered Images Container */}
              <div className="relative w-full h-[300px] sm:h-[350px] lg:h-[450px]">
                {/* Main larger image */}
                <div className="absolute top-0 left-0 w-[70%] sm:w-3/4 h-[70%] sm:h-4/5 rounded-lg sm:rounded-2xl p-1 bg-gradient-to-br from-primary to-accent shadow-2xl">
                  <div className="w-full h-full rounded-lg sm:rounded-2xl overflow-hidden">
                    <img 
                      src={aboutTeamBanner} 
                      alt="AgriPal team members at outdoor event"
                      loading="lazy"
                      decoding="async"
                      width="600"
                      height="400"
                      className="w-full h-full object-cover"
                    />
                  </div>
                </div>
                
                {/* Overlapping smaller image */}
                <div className="absolute bottom-0 right-0 w-[55%] sm:w-3/5 h-[55%] sm:h-3/5 rounded-lg sm:rounded-2xl p-1 bg-gradient-to-br from-primary to-accent shadow-xl">
                  <div className="w-full h-full rounded-lg sm:rounded-2xl overflow-hidden">
                    <img 
                      src={aboutTeamField} 
                      alt="AgriPal team members presenting certificate at training event"
                      loading="lazy"
                      decoding="async"
                      width="500"
                      height="350"
                      className="w-full h-full object-cover"
                    />
                  </div>
                </div>
              </div>
            </div>
            
            <div className="order-1 lg:order-2 space-y-3 sm:space-y-4 lg:space-y-6">
              <p className="text-sm sm:text-base lg:text-lg text-muted-foreground leading-relaxed">
                <strong className="text-foreground">AgriPal was founded in 2021</strong>, inspired by the vision captured in Dr. Akinwumi Adesina's words. With this belief at heart, we set out not only to build a business but to be part of shaping the future of African agriculture.
              </p>
              
              <p className="text-sm sm:text-base lg:text-lg text-muted-foreground leading-relaxed">
                We began with simple consultation services, helping farmers and agripreneurs access the knowledge they needed to start and grow. Over the years, our work expanded beyond advisory roles into broader areas of the agricultural value chain.
              </p>
              
              <p className="text-sm sm:text-base lg:text-lg text-muted-foreground leading-relaxed">
                Today, <strong className="text-foreground">AgriPal is actively involved in project setup, training, and innovative solutions</strong> designed to unlock opportunities across the industry.
              </p>
              
              <p className="text-sm sm:text-base lg:text-lg text-muted-foreground leading-relaxed">
                From humble beginnings, our journey has been guided by a mission larger than profit: <strong className="text-primary">empowering communities, creating sustainable livelihoods, and contributing to Africa's agricultural transformation</strong>.
              </p>
            </div>
          </div>

          {/* Mission Highlights */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
            <div className="text-center p-4 sm:p-6 rounded-lg bg-primary/5 border border-primary/10">
              <h3 className="font-semibold text-foreground mb-2 text-sm sm:text-base">Empowering Communities</h3>
              <p className="text-xs sm:text-sm text-muted-foreground">Building stronger agricultural communities across Africa</p>
            </div>
            <div className="text-center p-4 sm:p-6 rounded-lg bg-accent/5 border border-accent/10">
              <h3 className="font-semibold text-foreground mb-2 text-sm sm:text-base">Sustainable Livelihoods</h3>
              <p className="text-xs sm:text-sm text-muted-foreground">Creating lasting economic opportunities for farmers</p>
            </div>
            <div className="text-center p-4 sm:p-6 rounded-lg bg-primary/5 border border-primary/10 sm:col-span-2 lg:col-span-1">
              <h3 className="font-semibold text-foreground mb-2 text-sm sm:text-base">Agricultural Transformation</h3>
              <p className="text-xs sm:text-sm text-muted-foreground">Leading Africa's agricultural revolution</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutUs;