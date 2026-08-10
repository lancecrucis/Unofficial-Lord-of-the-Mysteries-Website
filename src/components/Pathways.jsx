import { useState } from "react";
import Reveal from "./Reveal";
import PathwaysCarousel from "./PathwaysCarousel";

const pathways = [
  { name: "Fool", symbol: ".", desc: "Masters of disguise and misdirection, wielding countless faces.", color: "from-crimson/40" },
  { name: "Door", symbol: ".", desc: "Keepers of thresholds between worlds, seers of what lies beyond.", color: "from-fog/40" },
  { name: "Sailor", symbol: ".", desc: "Wanderers of tides and storms, bound to the endless sea.", color: "from-gold-dim/40" },
  { name: "Visionary", symbol: ".", desc: "Seers of fate's threads, glimpsing futures yet unwritten.", color: "from-crimson/40" },
  { name: "Warrior", symbol: ".", desc: "Bearers of martial fury, strength that shatters mountains.", color: "from-gold-dim/40" },
  { name: "Demoness", symbol: ".", desc: "Weavers of temptation and ruin, beauty laced with venom.", color: "from-fog/40" },
];

function PathwayCard({ pathway }) {
  const [flipped, setFlipped] = useState(false);

  return (
    <div
      className="group [perspective:1000px] cursor-pointer h-80"
      onClick={() => setFlipped((f) => !f)}
    >
      <div
        className={`relative w-full h-full transition-transform duration-700 [transform-style:preserve-3d] ${
          flipped ? "[transform:rotateY(180deg)]" : ""
        }`}
      >
        {/* Front face */}
        <div className="absolute inset-0 [backface-visibility:hidden] bg-void-card border border-gold-dim/40 rounded-sm flex flex-col items-center justify-center p-6 group-hover:border-gold transition-colors duration-300">
          <div className={`absolute inset-0 bg-gradient-to-t ${pathway.color} to-transparent opacity-30`} />
          <span className="relative text-5xl mb-6">{pathway.symbol}</span>
          <h3 className="relative font-display text-gold text-xl tracking-wide">
            The {pathway.name}
          </h3>
          <div className="relative w-10 h-px bg-gold-dim mt-4" />
          <p className="relative font-heading text-parchment/40 text-xs mt-4 tracking-[0.2em] uppercase">
            Tap to reveal
          </p>
        </div>

        {/* Back face */}
        <div className="absolute inset-0 [backface-visibility:hidden] [transform:rotateY(180deg)] bg-void-card border border-gold rounded-sm flex flex-col items-center justify-center p-6">
          <span className="font-display text-gold text-lg mb-4">The {pathway.name}</span>
          <p className="font-heading text-parchment/70 text-sm text-center leading-relaxed">
            {pathway.desc}
          </p>
        </div>
      </div>
    </div>
  );
}

function Pathways() {
  return (
    <Reveal>
    <section id="pathways" className="relative bg-midnight py-26 px-6 overflow-hidden">
      {/* Top fade from World section */}
      <div className="absolute top-0 left-0 right-0 h-22 bg-gradient-to-b from-void to-transparent pointer-events-none z-10" />
      
      {/* Background image - centered mat */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat pointer-events-none opacity-80"
        style={{ backgroundImage: "url('/pathwaysbg.png')" }}
      />
      {/* Red maroon overlay for the mat effect */}
      <div className="absolute inset-0 bg-crimson/20 pointer-events-none" />
      
      {/* Loenlang image - top right */}
      <div 
        className="absolute top-10 right-0
    sm:top-5
    sm:w-[28vw] sm:h-[15vw]
    lg:right-10 lg:w-[28vw] lg:h-[15vw]
    bg-contain bg-center bg-no-repeat
    opacity-50 lg:opacity-70
        "
        style={{ backgroundImage: "url('/loenlang.png')" }}
      />
      
      
      <div className="relative max-w-6xl mx-auto">
        <div className="text-center mb-20">
          <p className="font-heading italic text-gold tracking-[0.3em] text-base uppercase mb-4">
            Choose Your Fate
          </p>
          <h2 className="font-display text-parchment text-3xl md:text-5xl tracking-wide mb-50">
            The Pathways
          </h2>
        </div>

         <PathwaysCarousel />
      </div>
      
      {/* Bottom fade to I Was Here section */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-b from-transparent to-void pointer-events-none z-20" />
      
    </section>
    </Reveal>
  );
}

export default Pathways;
