const characters = [
  {
    name: "Klein Moretti",
    alias: "Zhou Mingrui",
    title: "The Fool · Sequence 3",
    desc: "A soul from another world bound to a fortune-teller's body, walking the razor's edge between sanity and power.",
    tag: "Protagonist",
  },
  {
    name: "Alger Wilson",
    alias: "Gehrman Sparrow",
    title: "The Sailor · Beyonder",
    desc: "A shadow slipping through the underworld's cracks, his true face known to few and trusted by fewer.",
    tag: "Ally",
  },
  {
    name: "Justice",
    alias: "Adam",
    title: "Angel of the White Church",
    desc: "A relic-forged existence walking among mortals, purpose obscured behind divine directive.",
    tag: "Faction",
  },
  {
    name: "Miss Justice",
    alias: "Audrey Hall",
    title: "Detective · Church of Steam & Machinery",
    desc: "Sharp-eyed and sharper-minded, unraveling mysteries the official record dares not touch.",
    tag: "Ally",
  },
];

function CharacterCard({ char }) {
  return (
    <div className="group relative bg-void-card border border-gold-dim/30 hover:border-gold/60 transition-all duration-500 p-6 overflow-hidden">
      {/* Stamp-like corner tag */}
      <div className="absolute top-0 right-0 bg-crimson/80 text-parchment text-[10px] font-heading tracking-[0.15em] uppercase px-3 py-1">
        {char.tag}
      </div>

      {/* Faux "case file" number */}
      <p className="font-heading text-gold-dim/60 text-xs tracking-[0.2em] mb-4">
        FILE NO. {char.name.length.toString().padStart(3, "0")}
      </p>

      <h3 className="font-display text-gold text-2xl mb-1">{char.name}</h3>
      <p className="font-heading italic text-parchment/50 text-sm mb-4">
        also known as {char.alias}
      </p>

      <div className="w-10 h-px bg-gold-dim mb-4" />

      <p className="font-heading text-gold-dim text-xs tracking-[0.15em] uppercase mb-3">
        {char.title}
      </p>

      <p className="font-heading text-parchment/70 text-sm leading-relaxed">
        {char.desc}
      </p>

      {/* Hover reveal accent line */}
      <div className="absolute bottom-0 left-0 w-0 h-1 bg-gold group-hover:w-full transition-all duration-500" />
    </div>
  );
}

function Characters() {
  return (
    <section id="characters" className="relative bg-void py-32 px-6">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-20">
          <p className="font-heading italic text-gold-dim tracking-[0.3em] text-sm uppercase mb-4">
            Faces Behind the Fog
          </p>
          <h2 className="font-display text-parchment text-3xl md:text-5xl tracking-wide">
            Dramatis Personae
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          {characters.map((char) => (
            <CharacterCard key={char.name} char={char} />
          ))}
        </div>
      </div>
    </section>
  );
}

export default Characters;