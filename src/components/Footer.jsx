const footerLinks = [
  { label: "The World", href: "#world" },
  { label: "Pathways", href: "#pathways" },
  { label: "Characters", href: "#characters" },
  { label: "Factions", href: "#factions" },
];

function Footer() {
  return (
    <footer className="relative bg-void border-t border-gold-dim/20 py-20 px-6 overflow-hidden">
      {/* Subtle fog background */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-fog/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-fog/5 rounded-full blur-3xl pointer-events-none" />
      
      {/* Full section shine animation */}
      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-gold-light/5 to-transparent animate-shine pointer-events-none" />
      
      <div className="relative max-w-6xl mx-auto">
        {/* Top section with brand */}
        <div className="text-center mb-16">
          <h3 className="font-heading text-gold-light/60 text-3xl md:text-4xl mb-4 tracking-widest">
            LOTM
          </h3>
          <p className="font-heading text-parchment/70 text-lg md:text-xl tracking-wide">
            Cuttlefish That Loves Diving
          </p>
        </div>

        {/* Main content grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 mb-16">
          {/* Column 1: About */}
          <div className="sm:col-span-2 lg:col-span-1">
            <h4 className="font-heading text-gold-light/60 text-base font-semibold tracking-[0.2em] uppercase mb-4">
              About
            </h4>
            <p className="font-heading text-parchment/70 text-base font-medium leading-relaxed">
              A fan tribute to the world of Lord of the Mysteries
            </p>
          </div>

          {/* Column 2: Navigate */}
          <div>
            <h4 className="font-heading text-gold-light/60 text-base font-semibold tracking-[0.2em] uppercase mb-4">
              Navigate
            </h4>
            <ul className="space-y-3">
              {footerLinks.map((item) => (
                <li key={item.label}>
                  <a
                    href={item.href}
                    className="font-heading text-parchment/70 text-base hover:text-gold transition-colors duration-300 relative group"
                  >
                    {item.label}
                    <span className="absolute -bottom-1 left-0 w-0 h-px bg-gold group-hover:w-full transition-all duration-300" />
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3: Connect */}
          <div>
            <h4 className="font-heading text-gold-light/60 text-base font-semibold tracking-[0.2em] uppercase mb-4">
              Connect
            </h4>
            <div className="flex flex-wrap gap-3">
              <a
                href="https://www.facebook.com/lance.christian.c.crucis"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 flex items-center justify-center border border-gold-dim/30 hover:border-gold hover:bg-gold-dim/10 transition-all duration-300"
                aria-label="Facebook"
              >
                <img src="/images/icons/facebook.svg" alt="Facebook" className="w-5 h-5 opacity-60" loading="lazy" />
              </a>
              <a
                href="https://www.linkedin.com/in/lance-christian-crucis-317144351/"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 flex items-center justify-center border border-gold-dim/30 hover:border-gold hover:bg-gold-dim/10 transition-all duration-300"
                aria-label="LinkedIn"
              >
                <img src="/images/icons/linkedin.svg" alt="LinkedIn" className="w-5 h-5 opacity-60" loading="lazy" />
              </a>
              <a
                href="https://www.tiktok.com/@lancecrucis"
                className="w-10 h-10 flex items-center justify-center border border-gold-dim/30 hover:border-gold hover:bg-gold-dim/10 transition-all duration-300"
                aria-label="Tiktok"
              >
                <img src="/images/icons/tiktok.svg" alt="Tiktok" className="w-5 h-5 opacity-60" loading="lazy" />
              </a>
              <a
                href="mailto:lancecrucis123@gmail.com"
                className="w-10 h-10 flex items-center justify-center border border-gold-dim/30 hover:border-gold hover:bg-gold-dim/10 transition-all duration-300"
                aria-label="Email"
              >
                <img src="/images/icons/gmail.svg" alt="Email" className="w-5 h-5 opacity-60" loading="lazy" />
              </a>
            </div>
          </div>

          {/* Column 4: Disclaimer */}
          <div>
            <h4 className="font-heading text-gold-light/60 text-base font-semibold tracking-[0.2em] uppercase mb-4">
              Disclaimer
            </h4>
            <p className="font-heading text-parchment/70 text-base font-medium leading-relaxed">
              Lord of the Mysteries and all related characters belong to their
              original author, Cuttlefish That Loves Diving. This is an
              unofficial fan project made with reverence for the source
              material.
            </p>
          </div>
        </div>

        {/* Bottom section */}
        <div className="border-t border-gold-dim/10 pt-8">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <p className="font-heading text-gold-light/80 text-xl tracking-wide">
              © {new Date().getFullYear()} Created by Lance Christian C. Crucis
            </p>
            
            <p className="font-heading italic text-gold-light/80 text-xl">
              "It was a happy smile"
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
