import { useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Reveal from "./Reveal";
import useIsMobile from "../hooks/useIsMobile";

const pathways = [
  { name: "Error", image: "/images/pathways/6lovers.jpg", desc: "Thieves of fate and fortune, bending probability and stealing moments from time's relentless march." },
  { name: "Demoness", image: "/images/pathways/3empress.jpg", desc: "Weavers of temptation and ruin, beauty laced with venom." },
  { name: "Red Priest", image: "/images/pathways/7chariot.jpg", desc: "Heralds of war and conquest, wreathed in flame, stirring rage and fervor wherever they tread." },
  { name: "Strength", image: "/images/pathways/8strength.jpg", desc: "Bearers of primal force, commanding the beast within to unleash unstoppable power." },
  { name: "Fool", image: "/images/pathways/0fool.jpg", desc: "A pathway of masks and misdirection, where deception becomes a shield against a world too vast to face honestly." },
  { name: "Priestess", image: "/images/pathways/2priestess.jpg", desc: "Keepers of hidden knowledge, peering through the veil to reveal truths veiled from mortal eyes." },
  { name: "Door", image: "/images/pathways/1magician.jpg", desc: "Wardens of space itself, stepping between distant places as easily as crossing a threshold." },
  { name: "Tyrant", image: "/images/pathways/5sailor.jpg", desc: "Born of storm-tossed seas, commanding lightning and tide until the ocean itself answers to their will." },
  { name: "Visionary", image: "/images/pathways/11justice.jpg", desc: "Wanderers of the mind's hidden corridors, reading thoughts and walking dreams to uncover truths kept from waking eyes." },
];

const SLOTS = [
  { x: -560, y: 0,    rotate: -45 },
  { x: -420, y: -100,  rotate: -32 },
  { x: -280, y: -170,  rotate: -20 },
  { x: -140, y: -215,  rotate: -10 },
  { x: 0,   y: -230,  rotate: 0 },   // Center Peak
  { x: 140, y: -215,  rotate: 10 },
  { x: 280, y: -170,  rotate: 20 },
  { x: 420, y: -100,  rotate: 32 },
  { x: 560, y: 0,    rotate: 45 }
];

const CENTER_SLOT = 4;

function PathwaysCarousel() {
  const [activeIndex, setActiveIndex] = useState(4);
  const [expanded, setExpanded] = useState(false);
  const total = pathways.length;
  const wheelLock = useRef(false);
  const isMobile = useIsMobile();

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

  function handleCardClick(i, isActive) {
    if (isActive) {
      setExpanded(true);
    } else {
      goTo(i);
    }
  }

  const activePathway = pathways[activeIndex];

  return (
    <Reveal>
    <div className={`${isMobile ? 'h-[380px]' : 'h-[420px]'} relative flex items-center justify-center select-none`}>
      <motion.div
        className="relative w-full h-full flex items-center justify-center cursor-grab active:cursor-grabbing"
        drag="x"
        dragConstraints={{ left: 0, right: 0 }}
        dragElastic={0.15}
        onDragEnd={handleDragEnd}
        onWheel={!isMobile ? handleWheel : undefined}
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
              className={`absolute ${isMobile ? 'w-28 h-40' : 'w-40 h-56 sm:w-48 sm:h-64'}`}
              style={{ zIndex: 10 - Math.abs(offset) }}
              animate={{
                x: slot.x,
                y: slot.y,
                rotate: slot.rotate,
                scale: isActive ? 1.08 : 0.95,
                opacity: 1,
              }}
              transition={
                isMobile
                  ? { duration: 0.3, ease: "easeOut" }
                  : { type: "spring", stiffness: 200, damping: 25 }
              }
              whileHover={!isMobile && isActive ? { scale: 1.12 } : {}}
              onClick={() => handleCardClick(i, isActive)}
            >
              <div
                className={`w-full h-full border overflow-hidden relative bg-void-card transition-all duration-500 cursor-pointer ${
                  isActive 
                    ? isMobile
                      ? "border-gold shadow-[0_0_25px_rgba(184,149,47,0.3)]"
                      : "border-gold shadow-[0_0_40px_rgba(184,149,47,0.35),0_0_80px_rgba(184,149,47,0.15)]"
                    : "border-gold-dim/30 hover:border-gold-dim/60"
                }`}
              >
                <img
                  src={p.image}
                  alt={p.name}
                  className="absolute inset-0 w-full h-full object-cover"
                  draggable={false}
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-void via-void/30 to-transparent" />
                <div className="absolute inset-0 bg-gradient-to-b from-void/20 via-transparent to-transparent" />
                
                <h3 className={`absolute bottom-2 left-0 right-0 text-center font-heading text-gold tracking-wide drop-shadow-[0_2px_8px_rgba(0,0,0,0.8)] ${isMobile ? 'text-xs' : 'text-base'}`}>
                  The {p.name}
                </h3>
              </div>
            </motion.div>
          );
        })}
      </motion.div>

      {/* Navigation Buttons */}
      <button
        onClick={() => goTo(activeIndex - 1)}
        className={`absolute left-2 sm:left-0 top-1/2 -translate-y-1/2 flex items-center justify-center text-gold hover:text-gold bg-void/50 rounded-full border border-gold/30 hover:border-gold/50 z-30 transition-all duration-300 ${isMobile ? 'w-8 h-8 text-xl' : 'w-10 h-10 sm:w-12 sm:h-12 text-2xl sm:text-3xl'}`}
        aria-label="Previous pathway"
      >
        ‹
      </button>
      <button
        onClick={() => goTo(activeIndex + 1)}
        className={`absolute right-2 sm:right-0 top-1/2 -translate-y-1/2 flex items-center justify-center text-gold hover:text-gold bg-void/50 rounded-full border border-gold/30 hover:border-gold/50 z-30 transition-all duration-300 ${isMobile ? 'w-8 h-8 text-xl' : 'w-10 h-10 sm:w-12 sm:h-12 text-2xl sm:text-3xl'}`}
        aria-label="Next pathway"
      >
        ›
      </button>

      {/* Description below cards */}
      <div className={`${isMobile ? 'mt-12' : '-bottom-4'} absolute left-0 right-0 text-center px-6`}>
        <AnimatePresence mode="wait">
          <motion.div
            key={activePathway.name}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.3 }}
            className="flex flex-col items-center gap-2"
          >
            <h3 className={`font-display text-gold tracking-wide drop-shadow-[0_2px_8px_rgba(184,149,47,0.3)] ${isMobile ? 'text-sm' : 'text-lg'}`}>
              The {activePathway.name}
            </h3>
            <p className={`font-heading text-parchment/70 max-w-md mx-auto ${isMobile ? 'text-xs' : 'text-base'}`}>
              {activePathway.desc}
            </p>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Expanded Card Modal */}
      <AnimatePresence>
        {expanded && (
          <motion.div
            className={`fixed inset-0 z-50 flex items-center justify-center bg-void/90 px-4 sm:px-6 ${isMobile ? '' : 'backdrop-blur-sm'}`}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            onClick={() => setExpanded(false)}
          >
            <motion.div
              className={`relative w-full max-w-[280px] sm:max-w-sm md:max-w-md bg-void-card border border-gold overflow-hidden rounded-md shadow-[0_0_60px_rgba(184,149,47,0.2)] ${isMobile ? 'h-[400px]' : 'h-[480px] md:h-[720px]'}`}
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
