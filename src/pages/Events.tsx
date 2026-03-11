import TopBar from "@/components/TopBar";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import PageHero from "@/components/PageHero";
import { motion } from "framer-motion";
import { Calendar, MapPin, Clock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { upcomingEvents, pastEvents } from "@/data/events";

const Events = () => {
  return (
    <div className="min-h-screen bg-background">
      <TopBar />
      <Navbar />
      <main>
        <PageHero
          title="Events"
          subtitle="Join us at upcoming events and make a difference in your community."
          backgroundImage="https://images.pexels.com/photos/2774556/pexels-photo-2774556.jpeg?auto=compress&cs=tinysrgb&w=1260"
        />

        {/* Upcoming Events */}
        <section className="py-24 bg-background">
          <div className="container">
            <div className="text-center mb-16">
              <p className="text-secondary font-semibold mb-2">What's Coming</p>
              <h2 className="text-4xl md:text-5xl font-display font-bold text-foreground">
                Upcoming Events
              </h2>
            </div>
            <div className="space-y-8">
              {upcomingEvents.map((event, i) => (
                <motion.div
                  key={event.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1, duration: 0.5 }}
                  className="bg-card rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition-shadow flex flex-col md:flex-row"
                >
                  <img
                    src={event.image}
                    alt={event.title}
                    className="w-full md:w-80 h-60 md:h-auto object-cover"
                  />
                  <div className="p-8 flex-1">
                    <h3 className="font-display text-2xl font-bold text-foreground mb-3">{event.title}</h3>
                    <p className="text-muted-foreground mb-4">{event.desc}</p>
                    <div className="flex flex-wrap gap-4 text-sm text-muted-foreground mb-6">
                      <span className="flex items-center gap-1.5">
                        <Calendar className="w-4 h-4 text-secondary" /> {event.date}
                      </span>
                      <span className="flex items-center gap-1.5">
                        <Clock className="w-4 h-4 text-secondary" /> {event.time}
                      </span>
                      <span className="flex items-center gap-1.5">
                        <MapPin className="w-4 h-4 text-secondary" /> {event.location}
                      </span>
                    </div>
                    <Link to={`/events/${event.slug}`}>
                      <Button className="bg-secondary text-secondary-foreground hover:bg-orange-glow font-semibold px-6 rounded-full">
                        Register Now
                      </Button>
                    </Link>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Past Events */}
        <section className="py-24 bg-muted">
          <div className="container">
            <div className="text-center mb-16">
              <p className="text-secondary font-semibold mb-2">Looking Back</p>
              <h2 className="text-4xl md:text-5xl font-display font-bold text-foreground">
                Past Events
              </h2>
            </div>
            <div className="grid md:grid-cols-3 gap-8">
              {pastEvents.map((event, i) => (
                <motion.div
                  key={event.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1, duration: 0.5 }}
                  className="bg-card rounded-2xl overflow-hidden shadow-md"
                >
                  <img src={event.image} alt={event.title} className="w-full aspect-video object-cover" />
                  <div className="p-6">
                    <h3 className="font-display text-lg font-bold text-foreground mb-1">{event.title}</h3>
                    <p className="text-muted-foreground text-sm mb-2">{event.date}</p>
                    <p className="text-secondary font-semibold text-sm">{event.attendees}+ Attendees</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default Events;
