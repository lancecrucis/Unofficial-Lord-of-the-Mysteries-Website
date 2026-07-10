import Reveal from "./Reveal";
import SmokeTrail from "./SmokeTrail";
import fogImg from "../assets/fogImg.png"
import useIsMobile from "../hooks/useIsMobile";

function World() {
   const isMobile = useIsMobile();

  return (
    <section
      id="world"
      className="scroll-mt-24 relative bg-void py-32 px-6 overflow-hidden"
    >
     {!isMobile && <SmokeTrail />}

      {/* Decorative fog gradient blobs in background */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-fog/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-crimson/10 rounded-full blur-3xl pointer-events-none" />
<Reveal>
      <div className="relative max-w-4xl mx-auto text-center">
        {/* Section label */}
        <p className="font-heading italic text-gold-dim tracking-[0.3em] text-base uppercase mb-4">
          A World Wrapped in Fog.
        </p>

        <h2 className="font-display text-parchment text-3xl md:text-5xl mb-10 tracking-wide">
          Where Steam Meets Sorcery
        </h2>

        {/* Ornate divider */}
        <div className="flex items-center justify-center gap-4 mb-12">
          <div className="w-18 h-px bg-gold-dim" />
          <span className="text-gold text-lg">✧</span>
          <div className="w-18 h-px bg-gold-dim" />
        </div>

        {/*
        <img 
        src={fogImg}
        className="w-full h-84 object-cover " // Rounded corners
        />
        */}
        
        <p className="font-heading text-parchment/80 text-lg md:text-xl leading-relaxed mb-6">
          In an era of roaring steam engines and rising empires, an ancient, forbidden tide stirs beneath the surface of world. Gods slumber, Beyonders walk unseen among the crowds, and the boundary between science and the sorcery has never been thinner.
        </p>

        <p className="font-heading text-parchment/60 text-base md:text-lg leading-relaxed italic">
          To awaken is to grasp power beyond mortal comprehension and to risk losing yourself to madness, mutation, or the hunger of entities older than time itself.
        </p>

        {/* Stat-like teaser row */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 mt-20">
          {[
            { label: "Volume", value: "8" },
            { label: "Chapters", value: "1432" },
            { label: "Status", value: "Completed" },
          ].map((stat) => (
            <div key={stat.label} className="border border-gold-dim/30 py-6 px-4 hover:border-gold-dim transition-colors duration-300">
              <p className="font-display text-gold text-2xl mb-2">{stat.value}</p>
              <p className="font-heading text-parchment/60 text-xs tracking-[0.2em] uppercase">
                {stat.label}
              </p>
            </div>
          ))}
        </div>
      </div>
      </Reveal>
    </section>
  );
}

export default World;