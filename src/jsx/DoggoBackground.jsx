import React from "react";

/**
 * DoggoBackground (no Tailwind required)
 * Uses inline z-index/positioning so layers stack correctly everywhere.
 */
export default function DoggoBackground({ children }) {
  const paws = Array.from({ length: 14 });
  const bones = Array.from({ length: 8 });

  return (
    <div
      style={{ position: "relative", minHeight: "100vh", overflow: "hidden" }}
    >
      {/* Sky gradient (deepest background) */}
      <div
        style={{
          position: "fixed",
          inset: 0,
          zIndex: -2,
          background: "linear-gradient(#BEE3F8, #D6F0FF, #FDFDFD)",
        }}
      />

      {/* Clouds (behind content) */}
      <div
        style={{
          position: "fixed",
          inset: 0,
          zIndex: -1,
          pointerEvents: "none",
          opacity: 0.35, // make them subtle
        }}
      >
        <Cloud
          style={{
            top: "10%",
            animationDuration: "60s",
            transform: "scale(0.8)",
          }}
        />
        <Cloud
          style={{
            top: "25%",
            animationDuration: "85s",
            animationDelay: "-20s",
            transform: "scale(0.7)",
          }}
        />
        <Cloud
          style={{
            top: "40%",
            animationDuration: "70s",
            animationDelay: "-10s",
            transform: "scale(0.8)",
          }}
        />
        <Cloud
          style={{
            top: "55%",
            animationDuration: "95s",
            animationDelay: "-40s",
            transform: "scale(0.9)",
          }}
        />
      </div>

      {/* Paw rain (also behind content) */}
      <div
        style={{
          position: "fixed",
          inset: 0,
          zIndex: -1,
          pointerEvents: "none",
        }}
      >
        {paws.map((_, i) => (
          <Paw key={i} index={i} />
        ))}
      </div>

      {/* Bones drifting (behind content) */}
      <div
        style={{
          position: "fixed",
          inset: 0,
          zIndex: -1,
          pointerEvents: "none",
        }}
      >
        {bones.map((_, i) => (
          <Bone key={i} index={i} />
        ))}
      </div>

      {/* Hills & dog (bottom layer, still behind content) */}
      <div
        style={{
          position: "fixed",
          left: 0,
          right: 0,
          bottom: 0,
          zIndex: 0,
          pointerEvents: "none",
        }}
      >
        <Hills />
        <TrottingDog />
      </div>

      {/* Foreground content */}
      <div style={{ position: "relative", zIndex: 1 }}>{children}</div>

      {/* Keyframes */}
      <style>{`
        @keyframes cloud-drift {
          0% { transform: translateX(-20%) var(--cloud-scale, scale(1)); }
          100% { transform: translateX(120%) var(--cloud-scale, scale(1)); }
        }
        @keyframes paw-fall {
          0% { transform: translateY(-10vh) rotate(0deg); opacity: 0; }
          10% { opacity: 0.7; }
          100% { transform: translateY(110vh) rotate(90deg); opacity: 0; }
        }
        @keyframes bone-drift {
          0% { transform: translateX(-10vw) translateY(var(--y,0)) rotate(0deg); opacity: 0; }
          10% { opacity: 0.85; }
          100% { transform: translateX(110vw) translateY(var(--y,0)) rotate(360deg); opacity: 0; }
        }
        @keyframes doggo-run {
          0% { transform: translateX(-25%) }
          100% { transform: translateX(120%) }
        }
        @keyframes dog-bob {
          0%, 100% { transform: translateY(0) }
          50% { transform: translateY(-3px) }
        }
        @media (prefers-reduced-motion: reduce) {
          * { animation: none !important; transition: none !important; }
        }
      `}</style>
    </div>
  );
}

function Cloud({ style }) {
  return (
    <svg
      aria-hidden
      viewBox="0 0 200 60"
      fill="none"
      style={{
        position: "absolute",
        left: "-25%",
        height: 64, // smaller cloud
        width: "auto",
        opacity: 0.6,
        animation: "cloud-drift linear infinite",
        ...style,
      }}
    >
      <g filter="url(#blur)">
        <path
          d="M50 40c0-11 9-20 20-20 4 0 8 1 11 3C86 10 98 2 112 2c16 0 30 11 33 26 3-1 6-2 10-2 14 0 25 11 25 25H25c-8 0-15-7-15-15s7-16 16-16c3 0 7 1 9 3 2-13 13-24 28-24 13 0 24 8 28 20 2-1 5-2 7-2 10 0 18 8 18 18H50z"
          fill="#FFFFFF"
        />
      </g>
      <defs>
        <filter id="blur">
          <feGaussianBlur stdDeviation="3" />
        </filter>
      </defs>
    </svg>
  );
}

function Paw({ index }) {
  const left = `${(index * 7 + (index % 3) * 5) % 100}%`;
  const duration = 9 + (index % 5) * 2;
  const delay = -(index * 0.7);
  const scale = 0.6 + (index % 4) * 0.2;
  return (
    <svg
      aria-hidden
      viewBox="0 0 64 64"
      fill="currentColor"
      style={{
        position: "absolute",
        top: "-10vh",
        left,
        height: 24,
        width: 24,
        color: "rgba(0,0,0,0.2)",
        animation: `paw-fall ${duration}s linear ${delay}s infinite`,
        transform: `scale(${scale})`,
      }}
    >
      <circle cx="16" cy="20" r="8" />
      <circle cx="32" cy="16" r="8" />
      <circle cx="48" cy="20" r="8" />
      <path d="M22 36c0-6 6-10 10-10s10 4 10 10-8 14-10 14-10-8-10-14z" />
    </svg>
  );
}

function Bone({ index }) {
  const top = `${10 + ((index * 12) % 70)}%`;
  const duration = 30 + (index % 5) * 6;
  const delay = -(index * 3);
  const y = `${(index % 2 === 0 ? 1 : -1) * (5 + (index % 5) * 3)}px`;
  return (
    <svg
      aria-hidden
      viewBox="0 0 64 64"
      fill="#9CA3AF"
      style={{
        position: "absolute",
        left: "-10vw",
        top,
        height: 20,
        width: 20,
        opacity: 0.3,
        animation: `bone-drift ${duration}s linear ${delay}s infinite`,
        "--y": y,
      }}
    >
      <path d="M10 26a6 6 0 119-5l8 8 10-10a6 6 0 119 8 6 6 0 11-8 9L30 34l-8 8a6 6 0 11-9-8 6 6 0 11-3-8z" />
    </svg>
  );
}

function Hills() {}

function TrottingDog() {
  return (
    <div style={{ position: "relative", height: "10vh" }}>
      <svg
        aria-hidden
        viewBox="0 0 200 100"
        fill="none"
        style={{
          position: "absolute",
          bottom: 16,
          left: "-25%",
          height: 64,
          width: "auto",
          animation: "doggo-run 22s linear infinite",
        }}
      >
        <g style={{ animation: "dog-bob 0.8s ease-in-out infinite" }}>
          <path
            d="M40 60 C60 40, 120 40, 140 60 C150 70, 150 80, 130 82 L60 82 C45 80, 35 70, 40 60Z"
            fill="#2D2D2D"
          />
          <path
            d="M130 58 c10-6 18-8 24-6 8 3 10 10 8 16 -2 6-8 10-14 10 h-20 v-14 c0-3 1-5 2-6z"
            fill="#2D2D2D"
          />
          <path
            d="M150 54 c2-6 10-10 14-6 3 3 1 9-2 12 l-12 8z"
            fill="#1f1f1f"
          />
          <circle cx="152" cy="68" r="2" fill="#FFFFFF" />
          <circle cx="152" cy="68" r="1" fill="#000000" />
          <g
            style={{
              transformOrigin: "40px 60px",
              animation: "wag 0.25s ease-in-out infinite alternate",
            }}
          >
            <path
              d="M40 60 c-10 -8 -20 -10 -24 -4 -4 6 4 12 10 14 8 3 12 2 14 -2z"
              fill="#2D2D2D"
            />
          </g>
          <g style={{ animation: "legs 0.6s linear infinite" }}>
            <rect x="70" y="78" width="5" height="14" fill="#1f1f1f" rx="2" />
            <rect x="95" y="78" width="5" height="14" fill="#1f1f1f" rx="2" />
            <rect x="55" y="78" width="5" height="14" fill="#383838" rx="2" />
            <rect x="110" y="78" width="5" height="14" fill="#383838" rx="2" />
          </g>
        </g>
        <style>{`
          @keyframes wag { from { transform: rotate(-10deg); } to { transform: rotate(18deg); } }
          @keyframes legs { 0%, 100% { transform: translateX(0); } 50% { transform: translateX(1px); } }
        `}</style>
      </svg>
    </div>
  );
}
