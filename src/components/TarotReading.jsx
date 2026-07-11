import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import pathwayCards from "../data/pathwayCards";
import Reveal from "./Reveal";
import useIsMobile from "../hooks/useIsMobile";

const SPREAD_LABELS = ["Past", "Present", "Future"];

function shuffleDeck(deck) {
  return [...deck]
    .map((card) => ({ ...card, shuffleKey: Math.random() }))
    .sort((a, b) => a.shuffleKey - b.shuffleKey);
}

function TarotReading() {
  const isMobile = useIsMobile();
  const [deck, setDeck] = useState(() =>
    pathwayCards.map((c, i) => ({ ...c, id: i }))
  );
  const [selected, setSelected] = useState([]); // array of { ...card, isReversed }
  const [revealedCount, setRevealedCount] = useState(0);

  const isComplete = selected.length === 3;

  function handleShuffle() {
    if (selected.length > 0) return; // don't let shuffle mess with an in-progress pick
    setDeck((prev) => shuffleDeck(prev));
  }

  function handlePick(card) {
    if (isComplete) return;
    if (selected.some((s) => s.id === card.id)) return; // already picked

    const picked = { ...card, isReversed: Math.random() < 0.3 };
    setSelected((prev) => {
      const updated = [...prev, picked];
      if (updated.length === 3) {
        // stagger the reveal flips after a short pause
        setTimeout(() => setRevealedCount(1), 900);
        setTimeout(() => setRevealedCount(2), 1500);
        setTimeout(() => setRevealedCount(3), 2200);
      }
      return updated;
    });
  }

  function handleReset() {
    setSelected([]);
    setRevealedCount(0);
    setDeck((prev) => shuffleDeck(prev));
  }

  return (
    <section id="factions" className="relative bg-void-light py-23 px-6 scroll-mt-18">
        
      <div className="max-w-6xl mx-auto text-center">
        <Reveal>
        <p className="font-heading italic text-gold tracking-[0.3em] text-base uppercase mb-4">
          Do you believe in fate?
        </p>
        <h2 className="font-display text-parchment text-3xl md:text-6xl tracking-wide mb-6">
          Draw Your Fate
        </h2>
        <p className="font-heading text-parchment/80 text-2xl max-w-md mx-auto mb-4">
          {isComplete
            ? "Tap each card below to reveal what the fog conceals."
            : `Choose ${3 - selected.length} card${3 - selected.length !== 1 ? "s" : ""} — Past, Present, Future.`}
        </p>

        {!isComplete && (
          <button
            onClick={handleShuffle}
            className="font-heading text-base tracking-[0.2em] uppercase text-gold-dim border border-gold-dim/80 px-6 py-3 hover:text-gold hover:border-gold transition-all duration-300 mt-2"
          >
            Shuffle
          </button>
        )}
        </Reveal>

{/* Face-down deck for picking */}
{!isComplete && (
  isMobile ? (
    /* MOBILE: horizontal scroll row */
    <div className="mb-36 mt-20">
      <div className="flex gap-3 overflow-x-auto pb-4 px-4 snap-x snap-mandatory scrollbar-hide">
        {deck.map((card) => {
          const pickedIndex = selected.findIndex((s) => s.id === card.id);
          const isPicked = pickedIndex !== -1;

          return (
            <motion.div
              key={card.id}
              layout
              onClick={() => handlePick(card)}
              className={`relative shrink-0 w-20 h-28 snap-center cursor-pointer transition-all duration-300 ${
                isPicked ? "opacity-30 scale-95 pointer-events-none" : ""
              }`}
            >
              <div className="w-full h-full bg-void-card border border-gold-dim/60 rounded-md shadow-lg flex items-center justify-center">
                <div className="w-3/4 h-3/4 border border-gold-dim/40 rounded-sm flex items-center justify-center">
                  <span className="font-display text-gold-dim text-lg">✦</span>
                </div>
              </div>
              {isPicked && (
                <div className="absolute -top-2 -right-2 w-5 h-5 rounded-full bg-gold text-void text-[10px] font-heading flex items-center justify-center z-10">
                  {pickedIndex + 1}
                </div>
              )}
            </motion.div>
          );
        })}
      </div>
    </div>
  ) : (
    /* DESKTOP: fanned arc layout */
    <Reveal>
      <div className="relative h-[340px] sm:h-[360px] flex items-top justify-center mt-20 mb-20">
        {deck.map((card, i) => {
          const total = deck.length;
          const pickedIndex = selected.findIndex((s) => s.id === card.id);
          const isPicked = pickedIndex !== -1;

          const angleRange = 60;
          const t = total > 1 ? i / (total - 1) : 0.5;
          const angle = -angleRange + t * (angleRange * 2);
          const rad = (angle * Math.PI) / 190;

          const radius = 600;
          const x = radius * Math.sin(rad);
          const y = radius * (Math.cos(rad) - 1) * -1;

          return (
            <motion.div
              key={card.id}
              layout
              transition={{ type: "spring", stiffness: 260, damping: 28 }}
              style={{ zIndex: isPicked ? 100 : i }}
              animate={{
                x,
                y: isPicked ? y - 70 : y,
                rotate: isPicked ? 0 : angle,
                scale: isPicked ? 1.15 : 1,
              }}
              initial={false}
              className="absolute"
            >
              <motion.div
                onClick={() => handlePick(card)}
                whileHover={!isPicked ? { y: -20, scale: 1.08 } : {}}
                className={`relative w-24 h-36 sm:w-28 sm:h-40 cursor-pointer transition-opacity duration-300 ${
                  isPicked ? "opacity-100 pointer-events-none" : ""
                }`}
              >
                <div className="w-full h-full bg-void-card border border-gold-dim/60 rounded-md shadow-lg flex items-center justify-center">
                  <div className="w-3/4 h-3/4 border border-gold-dim/40 rounded-sm flex items-center justify-center">
                    <span className="font-display text-gold-dim text-lg sm:text-xl">✦</span>
                  </div>
                </div>
                {isPicked && (
                  <div className="absolute -top-2 -right-2 w-6 h-6 rounded-full bg-gold text-void text-xs font-heading flex items-center justify-center z-10">
                    {pickedIndex + 1}
                  </div>
                )}
              </motion.div>
            </motion.div>
          );
        })}
      </div>
    </Reveal>
  )
)}

        {/* Revealed spread */}
        {isComplete && (
          <div>
            <div className="flex flex-col sm:flex-row items-center sm:items-start justify-center gap-10 sm:gap-8 ">
              {selected.map((card, i) => (
                <RevealedCard
                  key={card.id}
                  card={card}
                  label={SPREAD_LABELS[i]}
                  isFlipped={revealedCount > i}
                />
              ))}
            </div>

            <button
              onClick={handleReset}
              className="mt-16 font-heading text-base tracking-[0.2em] uppercase text-gold border border-gold-dim/90 px-6 py-3 hover:text-gold hover:border-gold transition-all duration-300"
            >
              Draw Again
            </button>
          </div>
        )}
      </div>
    </section>
  );
}

function RevealedCard({ card, label, isFlipped }) {
  const [meaningOpen, setMeaningOpen] = useState(false);

  return (
    <Reveal>
    <div className="flex flex-col items-center">
      <p className="font-heading text-gold/90 text-xl tracking-[0.3em] uppercase mb-4 mt-2">
        {label}
      </p>

      <div
        className="group [perspective:1200px] cursor-pointer w-44 h-64 sm:w-52 sm:h-80"
        onClick={() => isFlipped && setMeaningOpen((m) => !m)}
      >
        <div
          className={`relative w-full h-full transition-transform duration-700 [transform-style:preserve-3d] ${
            isFlipped ? "[transform:rotateY(180deg)]" : ""
          }`}
        >
          {/* Card back */}
          <div className="absolute inset-0 [backface-visibility:hidden] bg-void-card border-2 border-gold-dim rounded-sm flex items-center justify-center">
            <div className="w-3/4 h-3/4 border border-gold-dim/50 rounded-sm flex items-center justify-center">
              <span className="font-display text-gold-dim text-3xl">✦</span>
            </div>
          </div>

          {/* Card front */}
          <div className="absolute inset-0 [backface-visibility:hidden] [transform:rotateY(180deg)] bg-void-card border-2 border-gold  overflow-hidden">
            <img
              src={card.image}
              alt={card.name}
              className="absolute inset-0 w-full h-full object-cover"
              style={{ transform: card.isReversed ? "rotate(180deg)" : "none" }}
              draggable={false}
              loading="lazy"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-void via-void/10 to-transparent" />
            <h3 className="absolute bottom-3 left-0 right-0 text-center font-display text-gold text-sm sm:text-base tracking-wide">
              The {card.name}
            </h3>
          </div>
        </div>
      </div>

      <AnimatePresence>
        {isFlipped && meaningOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.35 }}
            className="mt-5 max-w-[220px] text-center overflow-hidden"
          >
            <p className="font-heading text-gold-dim text-base tracking-[0.2em] uppercase mb-2">
              {card.isReversed ? "Reversed" : "Upright"}
            </p>
            <p className="font-heading text-parchment/70 text-base leading-relaxed">
              {card.isReversed ? card.reversed : card.upright}
            </p>
          </motion.div>
        )}
      </AnimatePresence>

      {isFlipped && !meaningOpen && (
        <p className="mt-4 font-heading text-parchment/50 text-base ">Tap for meaning</p>
      )}
    </div>
    </Reveal>
  );
}

export default TarotReading;