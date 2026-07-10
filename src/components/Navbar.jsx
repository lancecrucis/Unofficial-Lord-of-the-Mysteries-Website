import { useState, useEffect } from "react";
import navLogo from '../assets/navLogo.png'

function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { label: "The World", href: "#world" },
    { label: "Pathways", href: "#pathways" },
    { label: "I was Here", href: "#characters" },
    { label: "Tarot Reading", href: "#factions" },
  ];

  return (
    <>
      <nav
        className={`fixed top-0 left-0 w-full z-50 transition-all duration-500 ${
          scrolled
            ? "bg-void/90 backdrop-blur-md border-gold-dim/20 py-3"
            : "bg-transparent py-6"
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
          <a href="#" className="flex items-center gap-3 group">
            <div className="relative w-14 h-14 flex items-center justify-center">
              <div className="absolute inset-0 rounded-full border-2 border-gold-dim group-hover:border-gold transition-colors duration-300" />

              <img 
                src={navLogo} 
                alt="Logo" 
                className="w-12 h-12 object-contain" // Limits the image size so it sits nicely inside the circle
                />
            </div>
            <span className="font-heading text-parchment text-lg tracking-[0.15em] hidden sm:block">
              LOTM
            </span>
          </a>

          <div className="hidden md:flex items-center gap-10">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                className="font-heading text-parchment/70 text-sm tracking-[0.15em] uppercase hover:text-gold transition-colors duration-300 relative group"
              >
                {link.label}
                <span className="absolute -bottom-1 left-0 w-0 h-px bg-gold group-hover:w-full transition-all duration-300" />
              </a>
            ))}
          </div>

          <a
            href="#characters"
            className="hidden md:block font-heading text-xs tracking-[0.2em] uppercase text-gold border border-gold-dim px-5 py-2 hover:bg-gold-dim/10 hover:border-gold transition-all duration-300"
          >
            Enter the Fog
          </a>

          <button
            onClick={() => setMenuOpen((o) => !o)}
            className="md:hidden text-gold text-2xl z-50 relative"
          >
            {menuOpen ? "✕" : "☰"}
          </button>
        </div>
      </nav>

      {/* Mobile slide-down menu */}
      <div
        className={`fixed inset-0 z-40 bg-void/98 backdrop-blur-md flex flex-col items-center justify-center gap-8 transition-all duration-500 md:hidden ${
          menuOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
        }`}
      >
        {navLinks.map((link) => (
          <a
            key={link.label}
            href={link.href}
            onClick={() => setMenuOpen(false)}
            className="font-display text-gold text-2xl tracking-wide hover:text-gold-light transition-colors duration-300"
          >
            {link.label}
          </a>
        ))}
        <a
          href="#characters"
          onClick={() => setMenuOpen(false)}
          className="font-heading text-xs tracking-[0.2em] uppercase text-gold border border-gold-dim px-6 py-3 mt-4 hover:bg-gold-dim/10 transition-all duration-300"
        >
          Enter the Fog
        </a>
      </div>
    </>
  );
}

export default Navbar;