import { motion, useInView, animate } from "framer-motion";
import { Heart, Users, GraduationCap, Globe } from "lucide-react";
import { useEffect, useRef, useState } from "react";

const stats = [
  {
    icon: Heart,
    value: "1,689+",
    label: "Families Helped",
    iconBg: "bg-[hsl(var(--stats-icon-yellow))]/20",
    iconColor: "text-[hsl(var(--stats-icon-yellow))]",
  },
  {
    icon: Users,
    value: "150+",
    label: "Active Volunteers",
    iconBg: "bg-[hsl(var(--stats-icon-blue))]/20",
    iconColor: "text-[hsl(var(--stats-icon-blue))]",
  },
  {
    icon: GraduationCap,
    value: "45+",
    label: "Programs",
    iconBg: "bg-[hsl(var(--stats-icon-purple))]/20",
    iconColor: "text-[hsl(var(--stats-icon-purple))]",
  },
  {
    icon: Globe,
    value: "12+",
    label: "Communities Served",
    iconBg: "bg-[hsl(var(--stats-icon-orange))]/20",
    iconColor: "text-[hsl(var(--stats-icon-orange))]",
  },
];

const StatCard = ({ stat, index }: { stat: typeof stats[0]; index: number }) => {
  const [displayValue, setDisplayValue] = useState("0");
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });

  useEffect(() => {
    if (isInView) {
      // Parse numeric value and suffix
      const numericString = stat.value.replace(/[^0-9]/g, "");
      const target = parseInt(numericString, 10);
      const suffix = stat.value.replace(/[0-9,]/g, "");
      const hasComma = stat.value.includes(",");

      const controls = animate(0, target, {
        duration: 2,
        ease: "easeOut",
        onUpdate: (latest) => {
          const val = Math.floor(latest);
          setDisplayValue(
            (hasComma ? val.toLocaleString() : val.toString()) + suffix
          );
        },
      });

      return () => controls.stop();
    }
  }, [isInView, stat.value]);

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 15 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.1, duration: 0.4 }}
      className="bg-card/50 backdrop-blur-sm rounded-2xl p-6 shadow-sm border border-border/40 text-center hover:shadow-md hover:border-secondary/20 transition-all duration-300 group"
    >
      <div className={`w-12 h-12 mx-auto mb-4 ${stat.iconBg} rounded-xl flex items-center justify-center transition-transform duration-300 group-hover:scale-110`}>
        <stat.icon className={`w-6 h-6 ${stat.iconColor}`} />
      </div>
      <p className="text-2xl md:text-3xl font-display font-bold text-foreground mb-1 tabular-nums">
        {displayValue}
      </p>
      <p className="text-muted-foreground text-[10px] font-bold uppercase tracking-widest">{stat.label}</p>
    </motion.div>
  );
};

const StatsSection = () => {
  return (
    <section className="py-20 bg-section-warm/30 relative overflow-hidden">
      {/* Subtle Background Blobs */}
      <div className="absolute top-0 left-0 w-64 h-64 bg-secondary/5 rounded-full -translate-x-1/2 -translate-y-1/2 blur-3xl" />
      <div className="absolute bottom-0 right-0 w-64 h-64 bg-primary/5 rounded-full translate-x-1/3 translate-y-1/3 blur-3xl" />
      
      <div className="container relative z-10">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <p className="text-secondary font-bold mb-2 tracking-[0.2em] uppercase text-[10px]">Impact Report</p>
            <h2 className="text-2xl md:text-4xl font-display font-bold text-foreground mb-4">
              Our Journey in Numbers
            </h2>
            <div className="w-12 h-1 bg-secondary mx-auto mb-6 rounded-full" />
            <p className="text-muted-foreground text-sm leading-relaxed max-w-lg mx-auto">
              Every statistic represents a life changed and a step towards a more empowered Nairobi through our holistic programs.
            </p>
          </motion.div>
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-8">
          {stats.map((stat, i) => (
            <StatCard key={stat.label} stat={stat} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default StatsSection;
