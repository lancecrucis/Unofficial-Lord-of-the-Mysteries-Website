import { useEffect } from "react";
import Lenis from "lenis";

function useLenis() {
  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      smoothWheel: true,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),

      prevent: (node) => {
        return (
          node.closest("[data-bp-webchat]") ||
          node.closest(".bpWebchat") ||
          node.closest("iframe")
        );
      },
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