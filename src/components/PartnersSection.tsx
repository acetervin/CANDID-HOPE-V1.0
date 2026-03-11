import { motion } from "framer-motion";

const partners = [
  { name: "UNICEF Kenya", logo: "https://images.pexels.com/photos/6646918/pexels-photo-6646918.jpeg?auto=compress&cs=tinysrgb&w=200" },
  { name: "Nairobi County", logo: "https://images.pexels.com/photos/3184418/pexels-photo-3184418.jpeg?auto=compress&cs=tinysrgb&w=200" },
  { name: "World Vision", logo: "https://images.pexels.com/photos/6646773/pexels-photo-6646773.jpeg?auto=compress&cs=tinysrgb&w=200" },
  { name: "Kenya Red Cross", logo: "https://images.pexels.com/photos/8613312/pexels-photo-8613312.jpeg?auto=compress&cs=tinysrgb&w=200" },
  { name: "Save the Children", logo: "https://images.pexels.com/photos/6647037/pexels-photo-6647037.jpeg?auto=compress&cs=tinysrgb&w=200" },
  { name: "Plan International", logo: "https://images.pexels.com/photos/3184398/pexels-photo-3184398.jpeg?auto=compress&cs=tinysrgb&w=200" },
  { name: "Oxfam", logo: "https://images.pexels.com/photos/6646917/pexels-photo-6646917.jpeg?auto=compress&cs=tinysrgb&w=200" },
  { name: "AMREF Health", logo: "https://images.pexels.com/photos/8613089/pexels-photo-8613089.jpeg?auto=compress&cs=tinysrgb&w=200" },
];

// Triple for seamless loop
const marqueePartners = [...partners, ...partners, ...partners];

const PartnersSection = () => {
  return (
    <section className="py-20 bg-background overflow-hidden">
      <div className="container">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <p className="text-secondary font-semibold mb-2">Our Partners & Supporters</p>
          <h2 className="text-3xl md:text-4xl font-display font-bold text-foreground">
            Trusted by leading organizations
          </h2>
        </motion.div>
      </div>

      <div className="relative w-full">
        {/* Fade edges */}
        <div className="absolute left-0 top-0 bottom-0 w-32 bg-gradient-to-r from-background via-background/80 to-transparent z-10 pointer-events-none" />
        <div className="absolute right-0 top-0 bottom-0 w-32 bg-gradient-to-l from-background via-background/80 to-transparent z-10 pointer-events-none" />

        <div className="flex overflow-hidden">
          <motion.div
            className="flex gap-12 items-center w-max py-4"
            animate={{ x: ["0%", "-33.33%"] }}
            transition={{
              x: {
                repeat: Infinity,
                repeatType: "loop",
                duration: 40,
                ease: "linear",
              },
            }}
          >
            {marqueePartners.map((partner, i) => (
              <div
                key={`${partner.name}-${i}`}
                className="flex flex-col items-center gap-3 group shrink-0"
              >
                <div className="w-24 h-24 rounded-2xl overflow-hidden bg-card border border-border group-hover:border-secondary group-hover:shadow-lg group-hover:shadow-secondary/10 transition-all duration-500 p-4">
                  <img
                    src={partner.logo}
                    alt={partner.name}
                    className="w-full h-full object-contain grayscale group-hover:grayscale-0 transition-all duration-500 transform group-hover:scale-110"
                  />
                </div>
                <span className="text-xs text-muted-foreground font-semibold tracking-wide uppercase group-hover:text-foreground transition-colors whitespace-nowrap">
                  {partner.name}
                </span>
              </div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default PartnersSection;
