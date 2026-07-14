import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { db } from "../firebase";
import { containsBannedWord } from "../utils/filterText";
import {
  collection,
  addDoc,
  query,
  orderBy,
  limit,
  getDocs,
  serverTimestamp,
} from "firebase/firestore";
import AmbientFog from "./AmbientFog";
import SmokeTrail from "./SmokeTrail";
import Reveal from "./Reveal";
import useIsMobile from "../hooks/useIsMobile";


const CYCLE_INTERVAL = 4000; // How often a name swaps out

function IWasHere() {
  const isMobile = useIsMobile();
  
const MAX_VISIBLE = isMobile ? 5 : 25; ;
  const [nameInput, setNameInput] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [allNames, setAllNames] = useState([]);
  const [submitError, setSubmitError] = useState(null);
  // This array will hold the unique floating name objects
  const [floatingNames, setFloatingNames] = useState([]);
  const slotIdRef = useRef(0);

// 1. Fetch names from Firestore (one-time fetch, not a live listener)
  useEffect(() => {
    async function fetchNames() {
      try {
        const q = query(collection(db, "visitors"), orderBy("timestamp", "desc"), limit(50));
        const snapshot = await getDocs(q);
        const uniqueNames = Array.from(
          new Set(snapshot.docs.map((doc) => doc.data().name).filter(Boolean))
        );
        setAllNames(uniqueNames);
      } catch (err) {
        console.error("Failed to fetch names:", err);
      }
    }
    fetchNames();
  }, []);

  // Helper to generate a new floating name object with random positions
  function createFloatingInstance(name) {
    slotIdRef.current += 1;
    let x = Math.random() * 80 + 5;
    let y = Math.random() * 75 + 10;

    // Keep away from the center form input area
    while (x > 25 && x < 75 && y > 30 && y < 70) {
      x = Math.random() * 80 + 5;
      y = Math.random() * 75 + 10;
    }

    return {
      id: `${name}-${slotIdRef.current}`, // secure unique key for Framer Motion
      name: name,
      x,
      y,
    };
  }

  // 2. Handle Initial Spawn and Continuous Rotation
  useEffect(() => {
    if (allNames.length === 0) return;

    // Fill up the screen initially up to MAX_VISIBLE with completely unique names
    setFloatingNames((prev) => {
      // If we already have names floating, keep them to prevent aggressive re-renders
      if (prev.length > 0) return prev; 
      
      const initialBatch = allNames.slice(0, Math.min(MAX_VISIBLE, allNames.length));
      return initialBatch.map(name => createFloatingInstance(name));
    });

    // Periodically swap out ONE name at random for a fresh one not currently visible
    const interval = setInterval(() => {
      setFloatingNames((prevFloating) => {
        if (allNames.length <= prevFloating.length) return prevFloating; // Nowhere to swap if total names match screen count

        // Find names in the global pool that are NOT currently floating on screen
        const currentFloatingTexts = prevFloating.map((f) => f.name);
        const availablePool = allNames.filter((n) => !currentFloatingTexts.includes(n));

        if (availablePool.length === 0) return prevFloating;

        // Pick one random name from screen to phase out, and one fresh name to phase in
        const indexToReplace = Math.floor(Math.random() * prevFloating.length);
        const randomFreshName = availablePool[Math.floor(Math.random() * availablePool.length)];

        const updated = [...prevFloating];
        // Replacing the whole object (with a new id) lets Framer Motion know to animate the Exit & Entry
        updated[indexToReplace] = createFloatingInstance(randomFreshName); 
        
        return updated;
      });
    }, CYCLE_INTERVAL);

    return () => clearInterval(interval);
  }, [allNames]);

  // 3. Handle Input Submission
  async function handleSubmit(e) {
  e.preventDefault();
  const trimmed = nameInput.trim();
  if (!trimmed || trimmed.length > 15) return;

  if (containsBannedWord(trimmed)) {
    setSubmitError("That name isn't allowed here. Try another.");
    return;
  }
  setSubmitError(null);

  setSubmitting(true);
  try {
    await addDoc(collection(db, "visitors"), {
      name: trimmed,
      timestamp: serverTimestamp(),
    });

    setFloatingNames((prev) => {
      const isAlreadyFloating = prev.some((f) => f.name.toLowerCase() === trimmed.toLowerCase());
      if (isAlreadyFloating) return prev;

      const newInstance = createFloatingInstance(trimmed);

      if (prev.length >= MAX_VISIBLE) {
        const updated = [...prev];
        const targetIndex = Math.floor(Math.random() * updated.length);
        updated[targetIndex] = newInstance;
        return updated;
      } else {
        return [...prev, newInstance];
      }
    });

    setNameInput("");
  } catch (err) {
    console.error("Failed to submit name:", err);
  } finally {
    setSubmitting(false);
  }
}

  return (
    <section
      id="characters"
      className={`relative py-32 px-6 overflow-hidden scroll-mt-20 min-h-[850px] flex items-center justify-center ${
        isMobile ? "bg-fog/20" : "bg-void"
      }`}
    >
      {!isMobile && <SmokeTrail />}
      {!isMobile && <AmbientFog />}

      {/* Floating names field */}
      <div className="absolute inset-0 z-10">
        <AnimatePresence>
          {floatingNames.map((slot) => (
            <motion.div
              key={slot.id} // Changing this ID triggers the clean layout animations
              className="absolute font-heading italic text-gold/80 pointer-events-none whitespace-nowrap text-xl sm:text-2xl drop-shadow-[0_2px_8px_rgba(255,255,255,0.1)]"
              style={{
                left: `${slot.x}%`,
                top: `${slot.y}%`,
              }}
              initial={{ opacity: 0, scale: 0.6 }}
              animate={{
                opacity: [0, 0.85, 0.7, 0.85],
                x: [-15, 15, -10, 10],
                y: [-20, 20, -10, 15],
                rotate: [-5, 5, -3, 4],
                scale: [0.95, 1.05, 0.98],
              }}
              exit={{ opacity: 0, scale: 0.5, y: -20, transition: { duration: 1.5 } }}
              transition={{
                duration: 20 + Math.random() * 10, // Organic slow floating movement
                repeat: Infinity,
                repeatType: "reverse",
                ease: "easeInOut",
              }}
            >
              {slot.name}
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
          <Reveal>
      {/* Centered input box */}
      <div className="relative z-20 text-center max-w-md mx-auto">
        <p className="font-heading italic text-gold tracking-[0.3em] text-sm uppercase mb-4">
          Leave Your Mark in the Fog
        </p>
        <h2 className="font-display text-parchment text-3xl md:text-5xl tracking-wide mb-10">
          I Was Here
        </h2>

        <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <input
            type="text"
            value={nameInput}
            onChange={(e) => setNameInput(e.target.value)}
            placeholder="Your name..."
            maxLength={15}
            className="w-full bg-void/80 backdrop-blur-sm border border-gold-dim/40 focus:border-gold outline-none text-parchment font-heading px-4 py-3 text-sm tracking-wide placeholder:text-parchment/50 transition-colors duration-300"
          />
          <button
            type="submit"
            disabled={submitting || !nameInput.trim()}
            className="shrink-0 font-heading text-xs tracking-[0.2em] uppercase text-gold border border-gold-dim px-6 py-3 bg-void/80 backdrop-blur-sm hover:bg-gold-dim/60 hover:border-gold transition-all duration-300 disabled:opacity-40 disabled:cursor-not-allowed"
          >
            {submitting ? "..." : "Enter"}
          </button>
        </form>
          {submitError && (
  <p className="mt-3 font-heading text-crimson-glow text-lg">
    {submitError}
  </p>
)}

        {allNames.length === 0 && (
          <p className="mt-8 font-heading text-parchment/30 italic text-sm">
            Be the first to leave your mark...
          </p>
        )}
      </div>
      </Reveal>
    </section>
  );
}

export default IWasHere;