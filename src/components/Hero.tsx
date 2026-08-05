import React from "react";

const STARS = [
  { top: "8%", left: "12%", size: 2, delay: "0s", duration: "4s" },
  { top: "15%", left: "28%", size: 1.5, delay: "1.2s", duration: "5s" },
  { top: "6%", left: "45%", size: 2, delay: "0.6s", duration: "3.5s" },
  { top: "20%", left: "62%", size: 1.5, delay: "2s", duration: "4.5s" },
  { top: "10%", left: "78%", size: 2, delay: "0.3s", duration: "4s" },
  { top: "24%", left: "8%", size: 1.5, delay: "1.8s", duration: "5.5s" },
  { top: "4%", left: "58%", size: 1.5, delay: "1s", duration: "4s" },
  { top: "18%", left: "88%", size: 2, delay: "2.4s", duration: "3.8s" },
  { top: "12%", left: "35%", size: 1.5, delay: "0.8s", duration: "4.8s" },
  { top: "26%", left: "92%", size: 1.5, delay: "1.5s", duration: "4.2s" },
];

export default function Hero() {
  return (
    <section className="relative flex min-h-[100svh] w-full flex-col items-center justify-center overflow-hidden bg-void">
      <style>{`
        @keyframes twinkle {
          0%, 100% { opacity: 0.15; }
          50% { opacity: 0.9; }
        }

        @keyframes reveal-up {
          from {
            opacity: 0;
            transform: translateY(14px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @media (prefers-reduced-motion: reduce) {
          .anim-twinkle,
          .anim-reveal {
            animation: none !important;
          }
        }
      `}</style>

      {/* Fond du ciel */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#050609] via-[#0a0b10] to-[#0f1015]" />

      {/* Etoiles */}
      <div className="absolute inset-0">
        {STARS.map((star, i) => (
          <span
            key={i}
            className="anim-twinkle absolute rounded-full bg-white"
            style={{
              top: star.top,
              left: star.left,
              width: star.size,
              height: star.size,
              animation: `twinkle ${star.duration} ease-in-out ${star.delay} infinite`,
            }}
          />
        ))}
      </div>

      {/* Léger dégradé pour mettre en valeur le texte */}
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(circle at center, transparent 20%, rgba(0,0,0,0.35) 100%)",
        }}
      />

      {/* Grain léger (optionnel) */}
      <svg
        className="pointer-events-none absolute inset-0 h-full w-full opacity-[0.03] mix-blend-overlay"
        aria-hidden="true"
      >
        <filter id="grain">
          <feTurbulence
            type="fractalNoise"
            baseFrequency="0.85"
            numOctaves="2"
            stitchTiles="stitch"
          />
        </filter>
        <rect width="100%" height="100%" filter="url(#grain)" />
      </svg>

      {/* Contenu */}
      <div
        className="anim-reveal relative z-10 flex flex-col items-center px-6 text-center"
        style={{ animation: "reveal-up 1s ease-out" }}
      >
        <div className="mb-5 flex items-center gap-3 text-[0.65rem] uppercase tracking-[0.45em] text-lamp-soft/85">
          <span className="h-px w-8 bg-lamp-soft/40" />
          <span className="font-mono">Clothes from the dark</span>
          <span className="h-px w-8 bg-lamp-soft/40" />
        </div>

       <h1 className="font-biloved text-[clamp(4rem,15vw,10rem)] text-glow">
  Shadow
</h1>

        

        <a
          href="#collection"
          className="group mt-9 inline-flex items-center gap-2 text-sm tracking-[0.15em] text-lamp-soft"
        >
          <span className="relative">
            VOIR LA COLLECTION
            <span className="absolute -bottom-1 left-0 h-px w-full origin-left scale-x-0 bg-lamp-soft transition-transform duration-300 group-hover:scale-x-100" />
          </span>

          <span
            aria-hidden="true"
            className="transition-transform duration-300 group-hover:translate-y-0.5"
          >
            ↓
          </span>
        </a>
      </div>
    </section>
  );
}