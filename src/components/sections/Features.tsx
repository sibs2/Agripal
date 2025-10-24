import { BookOpen, GraduationCap, FileText, Users, Shield, Globe } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const features = [
  {
    icon: BookOpen,
    title: "Digital Library",
    description: "Access a comprehensive collection of agricultural books, research papers, and resources curated by experts."
  },
  {
    icon: GraduationCap,
    title: "Professional Courses",
    description: "Enhance your skills with structured courses designed for agricultural professionals at all levels."
  },
  {
    icon: FileText,
    title: "Expert Insights",
    description: "Stay informed with the latest agricultural trends, research findings, and industry best practices."
  },
  {
    icon: Users,
    title: "Community Network",
    description: "Connect with fellow farmers, researchers, and agricultural professionals worldwide."
  },
  {
    icon: Shield,
    title: "Reliable Content",
    description: "All our resources are verified by agricultural experts and updated regularly for accuracy."
  },
  {
    icon: Globe,
    title: "Global Reach",
    description: "Access knowledge and practices from agricultural communities around the world."
  }
];

const Features = () => {
  return (
    <section className="py-20 bg-background">
      <div className="container px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold font-heading mb-4">
            Why Choose Us
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            We provide comprehensive agricultural resources and education to help you grow sustainably and profitably
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <Card key={index} className="group hover:shadow-medium transition-all duration-300 hover:-translate-y-2 border-border/50">
              <CardHeader className="text-center pb-4">
                <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-primary rounded-full mb-4 mx-auto group-hover:scale-110 transition-transform duration-300">
                  <feature.icon className="h-8 w-8 text-primary-foreground" />
                </div>
                <CardTitle className="text-xl mb-2">{feature.title}</CardTitle>
              </CardHeader>
              <CardContent className="text-center">
                <p className="text-muted-foreground leading-relaxed">
                  {feature.description}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;