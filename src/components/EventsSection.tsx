import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { upcomingEvents } from "@/data/events";

const EventsSection = () => {
  const previewEvents = upcomingEvents.slice(0, 3);

  return (
    <section id="events" className="py-24 bg-background">
      <div className="container">
        <div className="text-center mb-16">
          <p className="text-secondary font-semibold mb-2">Upcoming Events</p>
          <h2 className="text-4xl md:text-5xl font-display font-bold text-foreground">
            Join us at our next community events
          </h2>
          <p className="mt-4 max-w-2xl mx-auto text-muted-foreground">
            Be part of workshops, summits, and community gatherings designed to empower youth, caregivers, and local leaders.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {previewEvents.map((event, i) => (
            <motion.div
              key={event.slug}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1, duration: 0.5 }}
              className="bg-card rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition-shadow"
            >
              <img src={event.image} alt={event.title} className="w-full aspect-[4/3] object-cover" />
              <div className="p-8">
                <h3 className="font-display text-2xl font-bold text-foreground mb-3">{event.title}</h3>
                <p className="text-muted-foreground mb-4">{event.desc}</p>
                <div className="flex items-center gap-3 text-sm text-muted-foreground mb-6">
                  <span className="font-medium">{event.date}</span>
                  <span className="before:content-['•'] before:mx-2">{event.time}</span>
                </div>
                <Link to={`/events/${event.slug}`}>
                  <Button className="bg-secondary text-secondary-foreground hover:bg-orange-glow font-semibold px-6 rounded-full">
                    Learn More
                  </Button>
                </Link>
              </div>
            </motion.div>
          ))}
        </div>

        <div className="mt-12 text-center">
          <Link to="/events">
            <Button className="bg-primary text-primary-foreground hover:bg-primary/90 font-semibold px-8 rounded-full">
              View All Events
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default EventsSection;
