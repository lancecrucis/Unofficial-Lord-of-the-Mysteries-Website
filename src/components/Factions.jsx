const factions = [
  {
    name: "Church of Storms",
    type: "Divine Order",
    desc: "Worshippers of the Lord of Storms, ruling coastal waters through fear and thunder.",
    icon: "⚡",
  },
  {
    name: "Church of Steam & Machinery",
    type: "Divine Order",
    desc: "Devotees of progress and invention, blending faith with the rise of industry.",
    icon: "⚙",
  },
  {
    name: "Tarot Club",
    type: "Secret Society",
    desc: "A shadow council of powerful Beyonders, each cloaked in a card's identity.",
    icon: "🂠",
  },
  {
    name: "Nighthawks",
    type: "Secret Society",
    desc: "Information brokers and freelance operatives navigating the underworld's grey zones.",
    icon: "🦅",
  },
];

function Factions() {
  return (
    <section id="factions" className="relative bg-void-light py-32 px-6">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-20">
          <p className="font-heading italic text-gold-dim tracking-[0.3em] text-sm uppercase mb-4">
            Powers That Move in Shadow
          </p>
          <h2 className="font-display text-parchment text-3xl md:text-5xl tracking-wide">
            Tarot Reading
          </h2>
        </div>

        <div className="flex flex-col divide-y divide-gold-dim/20 border-t border-b border-gold-dim/20">
          {factions.map((f, i) => (
            <div
              key={f.name}
              className="group flex flex-col sm:flex-row sm:items-center gap-4 sm:gap-8 py-8 hover:bg-void-card/50 transition-colors duration-300 px-4"
            >
              {/* Index number */}
              <span className="font-display text-gold-dim/40 text-2xl w-12 shrink-0">
                {String(i + 1).padStart(2, "0")}
              </span>

              {/* Icon */}
              <span className="text-3xl shrink-0 w-12 text-center">{f.icon}</span>

              {/* Name + type */}
              <div className="sm:w-64 shrink-0">
                <h3 className="font-display text-gold text-xl">{f.name}</h3>
                <p className="font-heading text-crimson-glow text-xs tracking-[0.2em] uppercase mt-1">
                  {f.type}
                </p>
              </div>

              {/* Description */}
              <p className="font-heading text-parchment/60 text-sm leading-relaxed sm:pl-8 sm:border-l sm:border-gold-dim/20">
                {f.desc}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default Factions;