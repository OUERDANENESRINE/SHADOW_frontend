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
  { top: "32%", left: "18%", size: 1.5, delay: "2.6s", duration: "5.2s" },
  { top: "38%", left: "70%", size: 1.5, delay: "0.4s", duration: "4.6s" },
  { top: "45%", left: "40%", size: 1.5, delay: "1.6s", duration: "5s" },
  { top: "50%", left: "85%", size: 1.5, delay: "3.2s", duration: "4.3s" },
];

export default function NightSky() {
  return (
    <div className="pointer-events-none fixed inset-0 -z-10">
      <style>{`
        @keyframes twinkle {
          0%, 100% { opacity: 0.15; }
          50% { opacity: 0.9; }
        }
        @media (prefers-reduced-motion: reduce) {
          .anim-twinkle { animation: none !important; }
        }
      `}</style>

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

      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse 70% 60% at 50% 40%, transparent 40%, rgba(0,0,0,0.5) 100%)",
        }}
      />
    </div>
  );
}