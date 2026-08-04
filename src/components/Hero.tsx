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

const EMBERS = [
  { left: "42%", delay: "0s", duration: "7s", drift: "-18px" },
  { left: "48%", delay: "1.4s", duration: "8.5s", drift: "14px" },
  { left: "53%", delay: "3s", duration: "6.5s", drift: "-10px" },
  { left: "46%", delay: "4.5s", duration: "9s", drift: "20px" },
  { left: "58%", delay: "2.1s", duration: "7.5s", drift: "-16px" },
  { left: "39%", delay: "5.5s", duration: "8s", drift: "12px" },
  { left: "51%", delay: "0.8s", duration: "6.8s", drift: "-8px" },
];

export default function Hero() {
  return (
    <section className="relative flex min-h-[100svh] w-full flex-col items-center justify-center overflow-hidden bg-void">
      <style>{`
        @keyframes twinkle {
          0%, 100% { opacity: 0.15; }
          50% { opacity: 0.9; }
        }
        @keyframes drift-slow {
          0% { transform: translateX(-4%); }
          50% { transform: translateX(3%); }
          100% { transform: translateX(-4%); }
        }
        @keyframes rise-ember {
          0% { transform: translate(0, 0) scale(0.6); opacity: 0; }
          12% { opacity: 0.9; }
          85% { opacity: 0.4; }
          100% { transform: translate(var(--drift), -42svh) scale(1); opacity: 0; }
        }
        @keyframes glow-breathe {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.82; }
        }
        @keyframes reveal-up {
          from { opacity: 0; transform: translateY(14px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @media (prefers-reduced-motion: reduce) {
          .anim-twinkle, .anim-drift, .anim-ember, .anim-breathe, .anim-reveal {
            animation: none !important;
          }
        }
      `}</style>

      {/* Ciel */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#050609] via-[#0a0b10] to-[#0f1015]" />

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

      {/* Silhouette d immeubles */}
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

      {/* Vignette */}
      <div
        className="pointer-events-none absolute inset-0 z-[1]"
        style={{
          background:
            "radial-gradient(ellipse 70% 60% at 50% 62%, transparent 40%, rgba(0,0,0,0.6) 100%)",
        }}
      />

      {/* Lueur nocturne ambiante */}
      <div
        className="anim-breathe pointer-events-none absolute bottom-[24svh] left-1/2 h-[46svh] w-[80vw] max-w-[900px] -translate-x-1/2"
        style={{
          background:
            "radial-gradient(ellipse 60% 100% at 50% 0%, rgba(245,174,76,0.26) 0%, rgba(245,174,76,0.1) 35%, rgba(245,174,76,0) 70%)",
          animation: "glow-breathe 5s ease-in-out infinite",
        }}
      />

      {/* Braises */}
      <div className="pointer-events-none absolute bottom-[24svh] left-0 h-[46svh] w-full">
        {EMBERS.map((ember, i) => (
          <span
            key={i}
            className="anim-ember absolute bottom-0 h-[3px] w-[3px] rounded-full bg-lamp-soft shadow-[0_0_4px_1px_rgba(245,174,76,0.8)]"
            style={
              {
                left: ember.left,
                "--drift": ember.drift,
                animation: `rise-ember ${ember.duration} ease-out ${ember.delay} infinite`,
              } as React.CSSProperties
            }
          />
        ))}
      </div>

      {/* Brume basse */}
      <div
        className="anim-drift pointer-events-none absolute bottom-[22svh] left-0 h-[10svh] w-[120%]"
        style={{
          background: "linear-gradient(to top, rgba(255,255,255,0.05) 0%, transparent 100%)",
          animation: "drift-slow 14s ease-in-out infinite",
        }}
      />

      {/* Sol */}
      <div
        className="absolute bottom-0 left-0 h-[26svh] w-full"
        style={{ background: "linear-gradient(to bottom, #0c0d11 0%, #07080a 100%)" }}
      />

      {/* Paves irreguliers plutot qu une grille technique */}
      <svg
        className="pointer-events-none absolute bottom-0 left-0 h-[26svh] w-full opacity-[0.14]"
        preserveAspectRatio="none"
        aria-hidden="true"
      >
        <defs>
          <pattern id="cobbles" width="46" height="26" patternUnits="userSpaceOnUse">
            <rect x="1" y="1" width="20" height="10" rx="2.5" fill="none" stroke="#EDEAE2" strokeWidth="0.6" />
            <rect x="24" y="1" width="20" height="10" rx="2.5" fill="none" stroke="#EDEAE2" strokeWidth="0.6" />
            <rect x="12" y="14" width="20" height="10" rx="2.5" fill="none" stroke="#EDEAE2" strokeWidth="0.6" />
            <rect x="-11" y="14" width="20" height="10" rx="2.5" fill="none" stroke="#EDEAE2" strokeWidth="0.6" />
            <rect x="35" y="14" width="20" height="10" rx="2.5" fill="none" stroke="#EDEAE2" strokeWidth="0.6" />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#cobbles)" />
      </svg>

      {/* Grain filmique */}
      <svg
        className="pointer-events-none absolute inset-0 h-full w-full opacity-[0.05] mix-blend-overlay"
        aria-hidden="true"
      >
        <filter id="grain">
          <feTurbulence type="fractalNoise" baseFrequency="0.85" numOctaves="2" stitchTiles="stitch" />
        </filter>
        <rect width="100%" height="100%" filter="url(#grain)" />
      </svg>

      {/* Contenu */}
      <div
        className="anim-reveal relative z-10 mb-[10svh] flex flex-col items-center px-6 text-center"
        style={{ animation: "reveal-up 1s ease-out" }}
      >
        <div className="mb-5 flex items-center gap-3 text-[0.65rem] uppercase tracking-[0.45em] text-lamp-soft/85">
          <span className="h-px w-8 bg-lamp-soft/40" />
          <span className="font-mono">Clothes from the dark</span>
          <span className="h-px w-8 bg-lamp-soft/40" />
        </div>

        <h1 className="font-display text-[clamp(3.5rem,14vw,9rem)] leading-[0.85] tracking-wide text-glow">
          SHADOW
        </h1>

        <p className="mt-4 max-w-sm text-sm leading-relaxed text-bone/60">
          Une collection taillee pour la rue, pensee pour la nuit.
        </p>

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
            {"\u2193"}
          </span>
        </a>
      </div>
    </section>
  );
}