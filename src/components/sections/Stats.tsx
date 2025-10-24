import { BookOpen, Users, Award, Leaf } from "lucide-react";
import { useState, useEffect } from "react";

const AnimatedCounter = ({ end, suffix = "" }: { end: number; suffix?: string }) => {
  const [count, setCount] = useState(0);

  useEffect(() => {
    let startTime: number | null = null;
    const duration = 2000; // 2 seconds

    const animate = (currentTime: number) => {
      if (startTime === null) startTime = currentTime;
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);
      
      // Easing function for smoother animation
      const easeOutQuart = 1 - Math.pow(1 - progress, 4);
      const currentValue = Math.floor(easeOutQuart * end);
      
      setCount(currentValue);

      if (progress < 1) {
        requestAnimationFrame(animate);
      }
    };

    requestAnimationFrame(animate);
  }, [end]);

  return <span>{count}{suffix}</span>;
};

const StatCard = ({ icon: Icon, value, label }: { icon: typeof BookOpen; value: number; label: string; suffix?: string }) => (
  <div className="text-center space-y-2 flex-shrink-0 w-64 sm:w-80">
    <div className="inline-flex items-center justify-center w-12 h-12 bg-white/20 rounded-full mb-4">
      <Icon className="h-6 w-6 text-white" />
    </div>
    <h3 className="text-2xl font-bold text-primary-foreground">
      <AnimatedCounter end={value} suffix="+" />
    </h3>
    <p className="text-base text-primary-foreground/80">{label}</p>
  </div>
);

const Stats = () => {
  const stats = [
    { icon: BookOpen, value: 100, label: "Agricultural Resources" },
    { icon: Users, value: 5000, label: "Farmers Empowered" },
    { icon: Award, value: 5, label: "Years of Experience" },
  ];

  return (
    <section className="py-8 bg-gradient-primary text-primary-foreground relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="grid grid-cols-6 gap-8 h-full">
          {Array.from({length: 24}).map((_, i) => (
            <Leaf key={i} className="h-6 w-6 animate-pulse" style={{animationDelay: `${i * 0.5}s`}} />
          ))}
        </div>
      </div>

      <div className="relative z-10 overflow-hidden">
        <div className="flex animate-[scroll_12s_linear_infinite] hover:[animation-play-state:paused]">
          {/* First set */}
          {stats.map((stat, i) => (
            <StatCard key={`stat-1-${i}`} {...stat} />
          ))}
          {/* Duplicate for seamless loop */}
          {stats.map((stat, i) => (
            <StatCard key={`stat-2-${i}`} {...stat} />
          ))}
          {/* Third set for extra smoothness */}
          {stats.map((stat, i) => (
            <StatCard key={`stat-3-${i}`} {...stat} />
          ))}
        </div>
      </div>

      <style>{`
        @keyframes scroll {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(-33.333%);
          }
        }
      `}</style>
    </section>
  );
};

export default Stats;