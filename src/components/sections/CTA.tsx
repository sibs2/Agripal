import { ArrowRight, Leaf } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const CTA = () => {
  return (
    <section className="py-12 sm:py-16 lg:py-20 bg-gradient-primary text-primary-foreground relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="grid grid-cols-6 gap-8 h-full">
          {Array.from({length: 24}).map((_, i) => (
            <Leaf key={i} className="h-6 w-6 animate-pulse" style={{animationDelay: `${i * 0.5}s`}} />
          ))}
        </div>
      </div>
      
      <div className="container px-4 relative z-10">
        <div className="max-w-4xl mx-auto text-center space-y-4 sm:space-y-6 lg:space-y-8">
          <h2 className="text-2xl sm:text-3xl lg:text-4xl xl:text-5xl font-bold font-heading leading-tight">
            Ready to Transform Your 
            <span className="text-accent block">Agricultural Journey?</span>
          </h2>
          
          <p className="text-sm sm:text-base lg:text-lg xl:text-xl text-primary-foreground/90 max-w-2xl mx-auto px-4">
            Join thousands of agricultural professionals who are already using AgriPal 
            to enhance their knowledge and improve their practices.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-6 pt-4 sm:pt-6 lg:pt-8">
            <Button variant="secondary" size="lg" className="group" asChild>
              <Link to="/courses">
                Find A Course Today
                <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Link>
            </Button>
            <Button variant="outline" size="lg" className="border-primary-foreground text-primary-foreground hover:bg-primary-foreground hover:text-primary">
              <Link to="/books">
                Explore Library
              </Link>
            </Button>
          </div>

          <div className="pt-8 flex flex-wrap justify-center items-center gap-8 text-sm text-primary-foreground/70">
            <div className="flex items-center space-x-2">
              <div className="w-2 h-2 bg-accent rounded-full"></div>
              <span>Expert-Curated Content</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-2 h-2 bg-accent rounded-full"></div>
              <span>Regular Updates</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-2 h-2 bg-accent rounded-full"></div>
              <span>Community Support</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CTA;