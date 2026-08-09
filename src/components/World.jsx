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
     {/* Top fade from Hero section */}
     <div className="absolute top-0 left-0 right-0 h-32 bg-gradient-to-b from-void to-transparent pointer-events-none z-10" />
     
     {!isMobile && <SmokeTrail />}

      {/* Decorative fog gradient blobs in background */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-fog/20 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-fog/15 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-fog/10 rounded-full blur-3xl pointer-events-none" />
<Reveal>
      <div className="relative max-w-4xl mx-auto text-center">
        {/* Section label */}
        <p className="font-heading  text-gold-light font-medium tracking-[0.3em] text-base uppercase mb-4">
          A World Wrapped in Fog.
        </p>

        <h2 className="font-display text-parchment text-3xl md:text-5xl mb-10 tracking-widest">
          Where Steam Meets Sorcery
        </h2>

        {/* Image with fog swallowing effect */}
        <div className="relative w-full h-84 md:h-96 mb-12 overflow-hidden">
          <img
            src={fogImg}
            className="w-full h-full object-cover"
            alt="World of Lord of the Mysteries"
          />
          {/* Fog blending overlays - top, bottom, left, right */}
          <div className="absolute inset-0 bg-gradient-to-b from-void via-transparent to-void pointer-events-none" />
          <div className="absolute inset-0 bg-gradient-to-r from-void via-transparent to-void pointer-events-none" />
          <div className="absolute inset-0 bg-gradient-to-t from-void/80 via-transparent to-void/80 pointer-events-none" />
          {/* Radial fog overlay for "swallowed" effect */}
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_30%,rgba(10,10,13,0.7)_70%,rgba(10,10,13,1)_100%)] pointer-events-none" />
        </div>

        <p className="font-heading text-parchment/80 text-lg md:text-xl leading-relaxed mb-6">
          In an era of roaring steam engines and rising empires, an ancient, forbidden tide stirs beneath the surface of world. Gods slumber, Beyonders walk unseen among the crowds, and the boundary between science and the sorcery has never been thinner.
        </p>

        <p className="font-heading text-parchment/60 text-base md:text-lg leading-relaxed italic mb-12">
          To awaken is to grasp power beyond mortal comprehension and to risk losing yourself to madness, mutation, or the hunger of entities older than time itself.
        </p>

        {/* Stat-like teaser row */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-8">
          {[
            { label: "Volume", value: "8" },
            { label: "Chapters", value: "1432" },
            { label: "Status", value: "Completed" },
          ].map((stat) => (
            <div key={stat.label} className="border border-gold-dim/30 py-6 px-4 hover:border-gold-dim transition-colors duration-300">
              <p className="font-display text-gold-light text-2xl mb-2">{stat.value}</p>
              <p className="font-heading text-parchment/70 font-medium text-xs tracking-[0.2em] uppercase">
                {stat.label}
              </p>
            </div>
          ))}
        </div>
      </div>
      </Reveal>
      
      {/* Bottom fade to I Was Here section */}
      <div className="absolute bottom-0 left-0 right-0 h-23 bg-gradient-to-b from-transparent to-void pointer-events-none z-20" />
    </section>
  );
}

export default World;
