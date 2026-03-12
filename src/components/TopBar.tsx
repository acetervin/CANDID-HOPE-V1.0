import { Mail, Phone, Heart } from "lucide-react";
import { Link } from "react-router-dom";

const TopBar = () => {
  return (
    <div className="bg-gradient-to-r from-primary to-primary/95 text-primary-foreground py-3 text-sm shadow-sm">
      <div className="container flex items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="p-1.5 bg-secondary/20 rounded-full">
            <Heart className="w-4 h-4 text-secondary animate-pulse" />
          </div>
          <span className="font-body font-medium">LET'S HELP OTHERS:</span>
          <Link
            to="/volunteers"
            className="font-semibold text-secondary hover:text-secondary/80 transition-all duration-200 flex items-center gap-1 group"
          >
            BECOME A VOLUNTEER
            <span className="inline-block group-hover:translate-x-1 transition-transform duration-200">→</span>
          </Link>
        </div>
        <div className="hidden md:flex items-center gap-4">
          <a
            href="mailto:candidhope1@gmail.com"
            className="flex items-center gap-2 px-3 py-1.5 rounded-full hover:bg-white/10 transition-all duration-200 group"
          >
            <Mail className="w-4 h-4 group-hover:text-secondary transition-colors duration-200" />
            <span className="text-xs font-medium">candidhope1@gmail.com</span>
          </a>
          <div className="w-px h-4 bg-white/20"></div>
          <a
            href="tel:+254757975701"
            className="flex items-center gap-2 px-3 py-1.5 rounded-full hover:bg-white/10 transition-all duration-200 group"
          >
            <Phone className="w-4 h-4 group-hover:text-secondary transition-colors duration-200" />
            <span className="text-xs font-medium">+254 757 975701</span>
          </a>
        </div>
      </div>
    </div>
  );
};

export default TopBar;
