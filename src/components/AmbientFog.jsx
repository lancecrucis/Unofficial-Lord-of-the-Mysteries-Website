import { useRef, useEffect } from "react";

function AmbientFog() {
  const canvasRef = useRef(null);
  const particles = useRef([]);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    let animationId;

    function resize() {
      canvas.width = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
    }
    resize();
    window.addEventListener("resize", resize);

    function spawnParticle() {
      // Flip a coin: true = spawn at top drifting down, false = spawn at bottom drifting up
      const isTop = Math.random() > 0.5;
      
      let spawnY, velocityY;
      
      if (isTop) {
        spawnY = -100 - Math.random() * 100; // Above top edge
        velocityY = Math.random() * 0.04 + 0.1; // Sinks down (+)
      } else {
        spawnY = canvas.height + 100 + Math.random() * 100; // Below bottom edge
        velocityY = -(Math.random() * 0.04 + 0.6); // Drifts up (-)
      }

      particles.current.push({
        x: Math.random() * canvas.width,
        y: spawnY,
        vx: (Math.random() - 0.5) * 0.08, // Gentle sway
        vy: velocityY,
        radius: Math.random() * 220 + 160, // Volumetric cloud banks
        life: 0,
        maxLife: Math.random() * 0.35 + 0.45,
        decay: Math.random() * 0.0007 + 0.0004,
        growing: true,
      });
    }

    // Seed initial fog on load: Half at the top, half at the bottom
    for (let i = 0; i < 16; i++) {
      const isTopZone = i % 2 === 0;
      let initialY, velocityY;

      if (isTopZone) {
        initialY = Math.random() * (canvas.height * 0.3); // Top 30%
        velocityY = Math.random() * 0.04 + 0.01;
      } else {
        initialY = canvas.height - Math.random() * (canvas.height * 0.3); // Bottom 30%
        velocityY = -(Math.random() * 0.04 + 0.01);
      }

      particles.current.push({
        x: Math.random() * canvas.width,
        y: initialY,
        vx: (Math.random() - 0.5) * 0.06,
        vy: velocityY,
        radius: Math.random() * 220 + 160,
        life: Math.random() * 0.4 + 0.2,
        maxLife: Math.random() * 0.35 + 0.45,
        decay: Math.random() * 0.0007 + 0.0004,
        growing: true,
      });
    }

    let spawnTimer = 0;

    function animate() {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      spawnTimer++;
      if (spawnTimer > 5 && particles.current.length < 140) {
        spawnParticle();
        spawnTimer = 0;
      }

      particles.current.forEach((p) => {
        p.x += p.vx;
        p.y += p.vy;
        p.radius += 0.02; // Grow over time

        if (p.growing) {
          p.life += p.decay * 2.5;
          if (p.life >= p.maxLife) p.growing = false;
        } else {
          p.life -= p.decay;
        }

        if (p.life > 0) {
          const gradient = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, p.radius);
          // Muted slate gray color profile matching your theme
          gradient.addColorStop(0, `rgba(61, 69, 72, ${p.life * 0.18})`);
          gradient.addColorStop(1, "rgba(61, 69, 72, 0)");
          
          ctx.fillStyle = gradient;
          ctx.beginPath();
          ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
          ctx.fill();
        }
      });

      particles.current = particles.current.filter((p) => p.life > 0);
      animationId = requestAnimationFrame(animate);
    }
    animate();

    return () => {
      window.removeEventListener("resize", resize);
      cancelAnimationFrame(animationId);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full pointer-events-none"
    />
  );
}

export default AmbientFog;