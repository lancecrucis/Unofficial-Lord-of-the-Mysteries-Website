import useIsMobile from "../hooks/useIsMobile";

function Hero() {
  const isMobile = useIsMobile();

  return (
    <section className="relative w-full h-screen overflow-hidden bg-void">
      {/* Background: Spline 3D on desktop, static image on mobile */}
      {isMobile ? (
        <img
          src="/mobileverhero.webp"
          alt="Lord of the Mysteries"
          className="absolute inset-0 w-full h-full object-cover"
          loading="eager"
        />
      ) : (
        <spline-viewer
          url="https://prod.spline.design/BSDrRBYEFPmzQ5qL/scene.splinecode"
          className="absolute inset-0 w-full h-full"
        />
      )}

      {/* Vignette overlay so text stays readable over the background */}
      <div className="absolute inset-0 pointer-events-none bg-gradient-to-b from-void/80 via-void/20 to-void/90" />
      <div className="absolute inset-0 pointer-events-none bg-gradient-to-r from-void/50 via-transparent to-void/50" />
      
      {/* Bottom fade to World section */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-b from-transparent to-void pointer-events-none z-20" />

      {/* Hero content */}
      <div className="relative z-10 flex flex-col items-center justify-center h-full text-center px-6 pointer-events-none">
        <p className="font-heading italic text-gold-light/60 tracking-[0.3em] text-sm md:text-base mb-4 uppercase font-semibold">
          Beyond the Fog
        </p>

        <h1 className="font-california text-gold/80 font-thin text-4xl md:text-[5.5rem] lg:text-8xl tracking-wider drop-shadow-[0_0_25px_rgba(184,149,47,0.3)] relative overflow-hidden">
          <span className="relative z-10">Lord of the Mysteries</span>
          <span className="absolute inset-0 bg-gradient-to-r from-transparent via-gold-light/60 to-transparent animate-shine" />
        </h1>

        <p className="font-heading text-parchment/70 text-lg md:text-xl mt-6 max-w-xl italic">
          "In the name of the Lord, let us pray for the fog to disperse."
        </p>
      </div>
    </section>
  );
}

export default Hero;
