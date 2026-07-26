import StreetLamp from "./StreetLamp";

export default function Hero() {
  return (
    <section className="relative flex min-h-[100svh] w-full flex-col items-center justify-end overflow-hidden bg-void">
      {/* Ciel nocturne */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#05060a] via-[#0a0c12] to-[#111319]" />

      {/* Silhouette de toits au loin */}
      <svg
        className="absolute bottom-[26svh] left-0 w-full opacity-70"
        viewBox="0 0 1440 200"
        preserveAspectRatio="none"
        aria-hidden="true"
      >
        <path
          d="M0 200 L0 140 L60 140 L60 100 L120 100 L120 150 L200 150 L200 90 L260 90 L260 130 L340 130 L340 60 L400 60 L400 120 L480 120 L480 150 L560 150 L560 80 L640 80 L640 140 L720 140 L720 110 L800 110 L800 150 L880 150 L880 70 L950 70 L950 130 L1030 130 L1030 100 L1110 100 L1110 150 L1190 150 L1190 90 L1260 90 L1260 140 L1340 140 L1340 110 L1440 110 L1440 200 Z"
          fill="#0d0f14"
        />
      </svg>

      {/* Cône de lumière projeté par le lampadaire */}
      <div
        className="lamp-flicker pointer-events-none absolute bottom-[24svh] left-1/2 h-[46svh] w-[80vw] max-w-[900px] -translate-x-1/2"
        style={{
          background:
            "radial-gradient(ellipse 60% 100% at 50% 0%, rgba(244,167,60,0.28) 0%, rgba(244,167,60,0.12) 35%, rgba(244,167,60,0) 70%)",
        }}
      />

      {/* Sol pavé */}
      <div
        className="absolute bottom-0 left-0 h-[26svh] w-full"
        style={{
          background:
            "linear-gradient(to bottom, #0f1116 0%, #08090c 100%)",
        }}
      />
      <div
        className="pointer-events-none absolute bottom-0 left-0 h-[26svh] w-full opacity-40"
        style={{
          backgroundImage:
            "repeating-linear-gradient(90deg, rgba(255,255,255,0.03) 0px, rgba(255,255,255,0.03) 1px, transparent 1px, transparent 42px), repeating-linear-gradient(0deg, rgba(255,255,255,0.03) 0px, rgba(255,255,255,0.03) 1px, transparent 1px, transparent 42px)",
        }}
      />

      {/* Contenu : marque dans le halo */}
      <div className="relative z-10 mb-[8svh] flex flex-col items-center px-6 text-center">
        <span className="mb-3 text-xs tracking-[0.5em] text-lamp-soft/80 uppercase">
          Clothes from 
        </span>
        <h1 className="font-display text-[clamp(3.5rem,14vw,9rem)] leading-[0.85] tracking-wide text-glow">
          SHADOW
        </h1>
        
        <a
          href="#collection"
          className="mt-8 inline-flex items-center gap-2 rounded-full border border-lamp/40 px-6 py-3 text-sm tracking-wide text-lamp-soft transition hover:border-lamp hover:bg-lamp/10"
        >
          SHOW THE COLLECTION
          <span aria-hidden="true">↓</span>
        </a>
      </div>

      {/* Le lampadaire lui-même, posé au sol */}
      <div className="relative z-10 h-[50svh] w-[140px] sm:w-[170px]">
        <StreetLamp className="h-full w-full" />
      </div>
    </section>
  );
}
