function Hero() {
  return (
    <section className="relative w-full h-screen overflow-hidden bg-void">
      {/* Spline 3D scene */}
      <spline-viewer
        url="https://prod.spline.design/BSDrRBYEFPmzQ5qL/scene.splinecode"
        className="absolute inset-0 w-full h-full"
      />

      {/* Vignette overlay so text stays readable over the 3D scene */}
      <div className="absolute inset-0 pointer-events-none bg-gradient-to-b from-void/70 via-transparent to-void" />
      <div className="absolute inset-0 pointer-events-none bg-gradient-to-r from-void/40 via-transparent to-void/40" />

      {/* Hero content */}
      <div className="relative z-10 flex flex-col items-center justify-center h-full text-center px-6 pointer-events-none">
        <p className="font-heading italic text-gold-light/80 tracking-[0.3em] text-sm md:text-base mb-4 uppercase">
          Beyond the Fog
        </p>

        <h1 className="font-display text-gold text-4xl md:text-6xl lg:text-7xl tracking-wide drop-shadow-[0_0_25px_rgba(184,149,47,0.3)]">
          Lord of the Mysteries
        </h1>

        <p className="font-heading text-parchment/70 text-lg md:text-xl mt-6 max-w-xl italic">
          "In the name of the Lord, let us pray for the fog to disperse..."
        </p>

        {/* Scroll cue */}
        <div className="absolute bottom-10 flex flex-col items-center gap-2 animate-bounce">
          <span className="text-gold-dim text-lg tracking-[0.2em] uppercase font-heading">Descend</span>
          <div className="w-px h-10 bg-gradient-to-b from-gold-dim to-transparent" />
        </div>
      </div>
    </section>
  );
}

export default Hero;