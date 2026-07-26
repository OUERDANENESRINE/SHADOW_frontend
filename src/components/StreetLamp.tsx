interface StreetLampProps {
  className?: string;
}

/**
 * Lampadaire vintage stylisé.
 * Le verre du lampadaire et son halo utilisent une classe CSS
 * "lamp-flicker" (définie dans globals.css) pour un léger scintillement,
 * comme une vraie lampe à gaz/sodium qui vacille.
 */
export default function StreetLamp({ className = "" }: StreetLampProps) {
  return (
    <svg
      viewBox="0 0 200 520"
      className={className}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      <defs>
        <radialGradient id="glassGlow" cx="50%" cy="45%" r="60%">
          <stop offset="0%" stopColor="#FFE7B0" stopOpacity="1" />
          <stop offset="45%" stopColor="#F4A73C" stopOpacity="0.95" />
          <stop offset="100%" stopColor="#F4A73C" stopOpacity="0" />
        </radialGradient>
        <linearGradient id="ironGradient" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stopColor="#3a3d44" />
          <stop offset="45%" stopColor="#1c1e22" />
          <stop offset="100%" stopColor="#0c0d0f" />
        </linearGradient>
      </defs>

      {/* Halo large diffus autour du luminaire */}
      <circle
        className="lamp-flicker"
        cx="100"
        cy="120"
        r="95"
        fill="url(#glassGlow)"
        opacity="0.55"
      />

      {/* Socle */}
      <rect x="60" y="480" width="80" height="14" rx="3" fill="url(#ironGradient)" />
      <rect x="72" y="468" width="56" height="16" rx="2" fill="url(#ironGradient)" />

      {/* Mât */}
      <rect x="95" y="200" width="10" height="270" fill="url(#ironGradient)" />

      {/* Anneaux décoratifs du mât */}
      <rect x="88" y="230" width="24" height="6" rx="2" fill="#2a2d33" />
      <rect x="88" y="330" width="24" height="6" rx="2" fill="#2a2d33" />
      <rect x="88" y="420" width="24" height="6" rx="2" fill="#2a2d33" />

      {/* Bras courbé */}
      <path
        d="M100 200 C 100 170, 100 150, 100 140"
        stroke="url(#ironGradient)"
        strokeWidth="9"
        strokeLinecap="round"
      />
      <path
        d="M60 205 C 60 175, 85 150, 100 148"
        stroke="url(#ironGradient)"
        strokeWidth="6"
        strokeLinecap="round"
        fill="none"
      />

      {/* Chapeau du lampadaire */}
      <path d="M55 105 L145 105 L128 85 L72 85 Z" fill="url(#ironGradient)" />
      <rect x="90" y="72" width="20" height="14" rx="2" fill="url(#ironGradient)" />
      <circle cx="100" cy="70" r="5" fill="#2a2d33" />

      {/* Verre / vitre lumineuse */}
      <path
        className="lamp-flicker"
        d="M65 105 L135 105 L124 165 L76 165 Z"
        fill="url(#glassGlow)"
        stroke="#F4A73C"
        strokeOpacity="0.4"
        strokeWidth="1.5"
      />

      {/* Croisillons du verre, style vintage */}
      <line x1="100" y1="105" x2="100" y2="165" stroke="#1c1e22" strokeWidth="2" />
      <line x1="70" y1="135" x2="130" y2="135" stroke="#1c1e22" strokeWidth="2" />

      {/* Support bas du luminaire */}
      <rect x="85" y="163" width="30" height="8" rx="2" fill="url(#ironGradient)" />
    </svg>
  );
}
