import { useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Reveal from "./Reveal";
import useIsMobile from "../hooks/useIsMobile";

const pathways = [
  { name: "Fool", image: "/images/pathways/0fool.jpg", desc: "A pathway of masks and misdirection, where deception becomes a shield against a world too vast to face honestly." },
  { name: "Door", image: "/images/pathways/1magician.jpg", desc: "Wardens of space itself, stepping between distant places as easily as crossing a threshold." },
  { name: "Tyrant", image: "/images/pathways/5sailor.jpg", desc: "Born of storm-tossed seas, commanding lightning and tide until the ocean itself answers to their will." },
  { name: "Visionary", image: "/images/pathways/11justice.jpg", desc: "Wanderers of the mind's hidden corridors, reading thoughts and walking dreams to uncover truths kept from waking eyes." },
  { name: "Error", image: "/images/pathways/6lovers.jpg", desc: "Thieves of fate and fortune, bending probability and stealing moments from time's relentless march." },
  { name: "Demoness", image: "/images/pathways/3empress.jpg", desc: "Weavers of temptation and ruin, beauty laced with venom." },
  { name: "Red Priest", image: "/images/pathways/7chariot.jpg", desc: "Heralds of war and conquest, wreathed in flame, stirring rage and fervor wherever they tread." },
];

const SLOTS = [
  { x: -480, y: 0,    rotate: -45 }, // Far Left: comfortable angle, no extreme -90° flip
  { x: -360, y: -110, rotate: -30 }, 
  { x: -180, y: -190, rotate: -15 }, 
  { x: 0,    y: -230, rotate: 0   }, // Perfect Center Peak (Low profile height)
  { x: 180,  y: -190, rotate: 15  }, 
  { x: 360,  y: -110, rotate: 30  }, 
  { x: 480,  y: 0,    rotate: 45  }  // Far Right: mirroring the left side
];
const CENTER_SLOT = 3;

function PathwaysCarousel() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [expanded, setExpanded] = useState(false); // NEW: is the modal open
  const total = pathways.length;
  const wheelLock = useRef(false);

  function goTo(index) {
    setActiveIndex(((index % total) + total) % total);
  }

  function getOffset(index) {
    let diff = index - activeIndex;
    if (diff > total / 2) diff -= total;
    if (diff < -total / 2) diff += total;
    return diff;
  }

  function handleDragEnd(event, info) {
    const threshold = 60;
    if (info.offset.x < -threshold) goTo(activeIndex + 1);
    else if (info.offset.x > threshold) goTo(activeIndex - 1);
  }

  function handleWheel(e) {
    e.preventDefault();
    if (wheelLock.current) return;
    if (Math.abs(e.deltaY) < 15) return;

    wheelLock.current = true;
    if (e.deltaY > 0) goTo(activeIndex + 1);
    else goTo(activeIndex - 1);

    setTimeout(() => { wheelLock.current = false; }, 350);
  }

  // NEW: card click handler — active card opens modal, side cards navigate
  function handleCardClick(i, isActive) {
    if (isActive) {
      setExpanded(true);
    } else {
      goTo(i);
    }
  }

  const activePathway = pathways[activeIndex];

  const isMobile = useIsMobile();

  return (
    <Reveal>
    <div className="relative h-[420px] flex items-center justify-center select-none">
      <motion.div
        className="relative w-full h-full flex items-center justify-center cursor-grab active:cursor-grabbing"
        drag="x"
        dragConstraints={{ left: 0, right: 0 }}
        dragElastic={0.15}
        onDragEnd={handleDragEnd}
        onWheel={handleWheel}
      >
        {pathways.map((p, i) => {
          const offset = getOffset(i);
          const slotIndex = CENTER_SLOT + offset;
          if (slotIndex < 0 || slotIndex >= SLOTS.length) return null;

          const slot = SLOTS[slotIndex];
          const isActive = offset === 0;

          return (
            <motion.div
              key={p.name}
              className="absolute w-40 h-56 sm:w-48 sm:h-64"
              style={{ zIndex: 10 - Math.abs(offset) }}
              animate={{
                x: slot.x,
                y: slot.y,
                rotate: slot.rotate,
                scale: isActive ? 1.05 : 0.95,
                opacity: 1,
              }}
              transition={
              isMobile
                ? { duration: 0.3, ease: "easeOut" }
                : { type: "spring", stiffness: 260, damping: 26 }
              }
              whileHover={!isMobile && isActive ? { scale: 1.1 } : {}}
              onClick={() => handleCardClick(i, isActive)}
            >
              <div
                className={`w-full h-75 border overflow-hidden relative bg-void-card transition-colors duration-300 cursor-pointer ${
                  isActive ? "border-gold shadow-[0_0_25px_rgba(184,149,47,0.25)]" : "border-gold-dim/30"
                }`}
              >
                <img
                  src={p.image}
                  alt={p.name}
                  className="absolute inset-0 w-full h-full object-cover"
                  draggable={false}
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-void via-void/20 to-transparent" />
                <h3 className="absolute bottom-3 left-0 right-0 text-center font-display text-gold text-base tracking-wide">
                  The {p.name}
                </h3>
              </div>
            </motion.div>
          );
        })}
      </motion.div>

      <button
        onClick={() => goTo(activeIndex - 1)}
        className="absolute left-2 sm:left-[-10px] top-1/2 -translate-y-[-90px] text-gold-dim hover:text-gold text-6xl z-20 transition-colors duration-300"
        aria-label="Previous pathway"
      >
        ‹
      </button>
      <button
        onClick={() => goTo(activeIndex + 1)}
        className="absolute right-2 sm:right-[-10px] top-1/2 -translate-y-[-90px] text-gold-dim hover:text-gold text-6xl z-20 transition-colors duration-300"
        aria-label="Next pathway"
      >
        ›
      </button>

      <div className="absolute -bottom-4 left-0 right-0 text-center px-6">
        <AnimatePresence mode="wait">
          <motion.p
            key={activePathway.name}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.3 }}
            className="font-heading text-parchment/70 text-xl max-w-md mx-auto"
          >
            {activePathway.desc}
          </motion.p>
        </AnimatePresence>
      </div>

      {/* NEW: Zoom modal */}
<AnimatePresence>
  {expanded && (
    <motion.div
      className="fixed inset-0 z-50 flex items-center justify-center bg-void/90 backdrop-blur-sm px-4 sm:px-6" // Slightly reduced padding for tight screens
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.25 }}
      onClick={() => setExpanded(false)}
    >
      <motion.div
        /* FIXED CLASSES BELOW:
          - Changed w-180 h-180 to a fluid layout aspect ratio using aspect-[3/4] (or aspect-[2/3] depending on your card style)
          - Set a default base width for mobile (w-full max-w-[280px]) 
          - Scaled up the width smoothly for tablet/desktop (sm:max-w-sm md:max-w-md)
        */
        className="relative h-[480px] md:h-[720px] w-full max-w-[280px] sm:max-w-sm md:max-w-md bg-void-card border border-gold overflow-hidden rounded-md shadow-2xl"
        initial={{ scale: 0.7, opacity: 0, rotate: -4 }}
        animate={{ scale: 1, opacity: 1, rotate: 0 }}
        exit={{ scale: 0.7, opacity: 0, rotate: 4 }}
        transition={{ type: "spring", stiffness: 260, damping: 24 }}
        onClick={(e) => e.stopPropagation()} 
      >
        <img
          src={activePathway.image}
          alt={activePathway.name}
          className="w-full h-full object-cover"
        />

        <button
          onClick={() => setExpanded(false)}
          className="absolute top-3 right-3 text-gold hover:text-gold-light text-sm bg-void/70 w-8 h-8 rounded-full flex items-center justify-center transition-colors duration-300 border border-gold/60"
          aria-label="Close"
        >
          ✕
        </button>
      </motion.div>
    </motion.div>
  )}
      </AnimatePresence>
    </div>
    </Reveal>
  );
}

export default PathwaysCarousel;