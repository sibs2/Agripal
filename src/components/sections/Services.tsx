import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { GraduationCap, Settings, MessageSquare } from "lucide-react";
import trainingService from "@/assets/training-service-new.jpg";
import projectSetupService from "@/assets/project-setup-service-new.jpg";
import consultationService from "@/assets/consultation-service-new.jpg";

const services = [
  {
    icon: GraduationCap,
    title: "Trainings",
    description: "Physical and online learning that equips farmers with the skills to boost yields and profits.",
    image: trainingService
  },
  {
    icon: Settings,
    title: "Project Setup",
    description: "From planning to implementation—we help you establish sustainable and profitable farm projects.",
    image: projectSetupService
  },
  {
    icon: MessageSquare,
    title: "Consultation",
    description: "Expert advice tailored to your farm's unique challenges, guiding you toward smarter decisions.",
    image: consultationService
  }
];

const Services = () => {
  return (
    <section id="services" className="py-12 sm:py-16 lg:py-20 bg-background/50">
      <div className="container mx-auto px-4 sm:px-6">
        <div className="text-center mb-8 sm:mb-10 lg:mb-12">
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-foreground mb-3 sm:mb-4">
            Our Services
          </h2>
          <div className="w-20 sm:w-24 h-1 bg-gradient-to-r from-primary to-accent mx-auto mb-3 sm:mb-4"></div>
          <p className="text-sm sm:text-base lg:text-lg text-muted-foreground max-w-2xl mx-auto px-4">
            Comprehensive agricultural solutions tailored to meet your farming needs
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {services.map((service, index) => {
            const Icon = service.icon;
            return (
              <Card key={index} className="group hover:shadow-lg transition-all duration-300 border-border/50 bg-card/50 backdrop-blur-sm">
                <div className="aspect-video relative overflow-hidden rounded-t-lg">
                  <img 
                    src={service.image} 
                    alt={service.title}
                    loading="lazy"
                    decoding="async"
                    width="800"
                    height="450"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
                </div>
                <CardHeader className="text-center pb-4">
                  <div className="mx-auto mb-4 p-3 rounded-full bg-primary/10 w-fit">
                    <Icon className="h-8 w-8 text-primary" />
                  </div>
                  <CardTitle className="text-xl font-semibold text-foreground">
                    {service.title}
                  </CardTitle>
                </CardHeader>
                <CardContent className="text-center pt-0">
                  <p className="text-muted-foreground leading-relaxed">
                    {service.description}
                  </p>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Services;