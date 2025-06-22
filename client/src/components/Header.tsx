import { useState } from "react";
import { cn } from "@/lib/utils";
import Bgilogo from "@assets/Bgilogo.png";

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
    setIsMenuOpen(false);
  };

  return (
    <header className="bg-white material-shadow-2 sticky top-0 z-50 w-full">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Logo and Titles */}
          <div className="flex items-center space-x-4">
            <img src={Bgilogo} alt="Bgi Logo" className="h-14 w-auto" />
            <div className="leading-tight">
              <h1 className="text-lg sm:text-xl font-bold text-gray-900">
                Ujjain Relay Centre
              </h1>
              <p className="text-xs sm:text-sm text-gray-600 font-semibold">
                Help Desk Portal By Burhani Guards Ujjain
              </p>
            </div>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex space-x-6 lg:space-x-8">
            {[
              ["Home", "home"],
              ["Submit Query", "submit-query"],
              ["Locations", "locations"],
              ["Ziyarat Locations", "ziyarat-locations"],
              ["Arrival Scanning", "Arrival-Scanning"],
              ["Contact", "contact"],
              ["Zonal Gates", "Zonal Gates"],
            ].map(([label, id]) => (
              <button
                key={id}
                onClick={() => scrollToSection(id)}
                className="text-gray-700 hover:text-red-600 px-3 py-2 rounded-md text-sm font-medium transition-colors"
              >
                {label}
              </button>
            ))}
          </nav>

          {/* Mobile Toggle Button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="text-gray-700 hover:text-red-600 p-2"
            >
              <span className="material-icons">{isMenuOpen ? "close" : "menu"}</span>
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden py-4 border-t border-gray-200">
            <div className="flex flex-col space-y-2">
              {[
                ["Home", "home"],
                ["Submit Query", "submit-query"],
                ["Locations", "locations"],
                ["Ziyarat Locations", "ziyarat-locations"],
                ["Arrival Scanning", "Arrival-Scanning"],
                ["Contact", "contact"],
                ["Zonal Gates", "Zonal Gates"],
              ].map(([label, id]) => (
                <button
                  key={id}
                  onClick={() => scrollToSection(id)}
                  className="text-gray-700 hover:text-red-600 px-3 py-2 rounded-md text-sm font-medium transition-colors text-left"
                >
                  {label}
                </button>
              ))}
            </div>
          </div>
        )}
      </div>
    </header>
  );
}
