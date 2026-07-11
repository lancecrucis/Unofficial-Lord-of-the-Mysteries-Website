import { useEffect } from "react";
import Lenis from "lenis";

function useLenis() {
  useEffect(() => {
    // Skip Lenis entirely on mobile/touch devices
    const isMobile = window.innerWidth < 640 || /Mobi|Android/i.test(navigator.userAgent);
    if (isMobile) return;

    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
    });

    function raf(time) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }
    requestAnimationFrame(raf);

    return () => lenis.destroy();
  }, []);
}

export default useLenis;