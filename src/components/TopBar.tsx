import { Mail, Phone, Heart } from "lucide-react";
import { Link } from "react-router-dom";

const TopBar = () => {
  return (
    <div className="bg-gradient-to-r from-primary to-primary/95 text-primary-foreground py-2 md:py-3 text-xs md:text-sm shadow-sm">
      <div className="container flex flex-col md:flex-row items-center justify-between gap-2 md:gap-4">
        {/* Left Section */}
        <div className="flex items-center gap-1.5 md:gap-3 flex-wrap justify-center md:justify-start">
          <div className="p-1 md:p-1.5 bg-secondary/20 rounded-full flex-shrink-0">
            <Heart className="w-3 h-3 md:w-4 md:h-4 text-secondary animate-pulse" />
          </div>
          <span className="font-body font-medium hidden sm:inline">LET'S HELP OTHERS:</span>
          <span className="font-body font-medium sm:hidden">HELP OTHERS:</span>
          <Link
            to="/volunteers"
            className="font-semibold text-secondary hover:text-secondary/80 transition-all duration-200 flex items-center gap-1 group whitespace-nowrap"
          >
            <span className="hidden sm:inline">BECOME A VOLUNTEER</span>
            <span className="sm:hidden">VOLUNTEER</span>
            <span className="inline-block group-hover:translate-x-1 transition-transform duration-200">→</span>
          </Link>
        </div>

        {/* Right Section */}
        <div className="hidden md:flex items-center gap-4">
          <a
            href="mailto:candidhope1@gmail.com"
            className="flex items-center gap-2 px-3 py-1.5 rounded-full hover:bg-white/10 transition-all duration-200 group"
          >
            <Mail className="w-4 h-4 group-hover:text-secondary transition-colors duration-200 flex-shrink-0" />
            <span className="text-xs font-medium">candidhope1@gmail.com</span>
          </a>
          <div className="w-px h-4 bg-white/20"></div>
          <a
            href="tel:+254757975701"
            className="flex items-center gap-2 px-3 py-1.5 rounded-full hover:bg-white/10 transition-all duration-200 group"
          >
            <Phone className="w-4 h-4 group-hover:text-secondary transition-colors duration-200 flex-shrink-0" />
            <span className="text-xs font-medium">+254 757 975701</span>
          </a>
        </div>

        {/* Mobile Contact Icons */}
        <div className="flex md:hidden items-center gap-2">
          <a
            href="mailto:candidhope1@gmail.com"
            className="p-2 hover:bg-white/10 rounded-full transition-all duration-200"
            title="Email us"
          >
            <Mail className="w-4 h-4" />
          </a>
          <a
            href="tel:+254757975701"
            className="p-2 hover:bg-white/10 rounded-full transition-all duration-200"
            title="Call us"
          >
            <Phone className="w-4 h-4" />
          </a>
        </div>
      </div>
    </div>
  );
};

export default TopBar;
