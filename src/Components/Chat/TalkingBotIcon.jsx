import { motion } from "framer-motion";

function TalkingBotIcon({ onClick, size = 80, className = "" }) {
  const Tag = onClick ? motion.button : "span";

  return (
    <Tag
      onClick={onClick}
      {...(onClick && { whileHover: { scale: 1.1 }, whileTap: { scale: 0.95 } })}
      className={`group relative inline-flex cursor-pointer focus:outline-none ${className}`}
      aria-label={onClick ? "Chat with AI assistant" : undefined}
    >
      <svg
        width={size}
        height={size}
        viewBox="0 0 100 100"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="drop-shadow-[0_0_12px_var(--portfolio-accent-glow)] transition-all duration-300"
      >
        {/* Outer glow ring */}
        <circle
          cx="50"
          cy="50"
          r="46"
          stroke="var(--portfolio-accent)"
          strokeWidth="1.5"
          fill="none"
          opacity="0.3"
          className="origin-center animate-[spin_8s_linear_infinite]"
        />

        {/* Head / face */}
        <rect
          x="22"
          y="18"
          width="56"
          height="50"
          rx="16"
          fill="var(--portfolio-accent)"
        />

        {/* Antenna */}
        <line
          x1="50"
          y1="18"
          x2="50"
          y2="8"
          stroke="var(--portfolio-accent)"
          strokeWidth="2.5"
          strokeLinecap="round"
        />
        <circle cx="50" cy="6" r="3.5" fill="var(--portfolio-accent-hover)">
          <animate
            attributeName="opacity"
            values="1;0.4;1"
            dur="2s"
            repeatCount="indefinite"
          />
        </circle>

        {/* Left eye */}
        <ellipse cx="38" cy="38" rx="5.5" ry="6" fill="white" />
        <ellipse cx="38" cy="38" rx="3" ry="3.5" fill="#1e293b">
          <animate
            attributeName="cx"
            values="38;37;38;39;38"
            dur="3s"
            repeatCount="indefinite"
          />
        </ellipse>
        <circle cx="36.5" cy="36.5" r="1" fill="white" opacity="0.9" />

        {/* Right eye */}
        <ellipse cx="62" cy="38" rx="5.5" ry="6" fill="white" />
        <ellipse cx="62" cy="38" rx="3" ry="3.5" fill="#1e293b">
          <animate
            attributeName="cx"
            values="62;61;62;63;62"
            dur="3s"
            repeatCount="indefinite"
          />
        </ellipse>
        <circle cx="60.5" cy="36.5" r="1" fill="white" opacity="0.9" />

        {/* Blink overlay */}
        <rect x="30" y="34" width="16" height="8" rx="4" fill="var(--portfolio-accent)" opacity="0">
          <animate
            attributeName="opacity"
            values="0;0;0;0;0;0;0;0;0;0;1;0;0"
            dur="4s"
            repeatCount="indefinite"
          />
        </rect>
        <rect x="54" y="34" width="16" height="8" rx="4" fill="var(--portfolio-accent)" opacity="0">
          <animate
            attributeName="opacity"
            values="0;0;0;0;0;0;0;0;0;0;1;0;0"
            dur="4s"
            repeatCount="indefinite"
          />
        </rect>

        {/* Mouth - opening and closing */}
        <path
          d="M 37 56 Q 43 58 50 58 Q 57 58 63 56"
          fill="none"
          stroke="white"
          strokeWidth="2.5"
          strokeLinecap="round"
        >
          <animate
            attributeName="d"
            values="M 37 56 Q 43 58 50 58 Q 57 58 63 56;M 37 56 Q 43 66 50 66 Q 57 66 63 56;M 37 56 Q 43 58 50 58 Q 57 58 63 56"
            dur="1.2s"
            repeatCount="indefinite"
          />
          <animate
            attributeName="opacity"
            values="0.6;1;0.6"
            dur="1.2s"
            repeatCount="indefinite"
          />
        </path>

        {/* Mouth fill - shows inside when open */}
        <path
          d="M 39 56 Q 45 57 50 57 Q 55 57 61 56 Z"
          fill="white"
          opacity="0"
        >
          <animate
            attributeName="d"
            values="M 39 56 Q 45 57 50 57 Q 55 57 61 56 Z;M 39 56 Q 45 65 50 65 Q 55 65 61 56 Z;M 39 56 Q 45 57 50 57 Q 55 57 61 56 Z"
            dur="1.2s"
            repeatCount="indefinite"
          />
          <animate
            attributeName="opacity"
            values="0;0.4;0"
            dur="1.2s"
            repeatCount="indefinite"
          />
        </path>

        {/* Cheek highlights */}
        <circle cx="29" cy="48" r="3" fill="white" opacity="0.15" />
        <circle cx="71" cy="48" r="3" fill="white" opacity="0.15" />

        {/* Ears / side panels */}
        <rect
          x="14"
          y="30"
          width="8"
          height="16"
          rx="4"
          fill="var(--portfolio-accent-hover)"
        />
        <rect
          x="78"
          y="30"
          width="8"
          height="16"
          rx="4"
          fill="var(--portfolio-accent-hover)"
        />

        {/* Neck */}
        <rect x="40" y="68" width="20" height="8" rx="3" fill="var(--portfolio-accent-hover)" />

        {/* Body hint */}
        <path
          d="M 32 76 Q 50 82 68 76 L 72 90 Q 50 96 28 90 Z"
          fill="var(--portfolio-accent)"
        />

        {/* Body details */}
        <circle cx="50" cy="83" r="2.5" fill="white" opacity="0.4">
          <animate
            attributeName="opacity"
            values="0.2;0.6;0.2"
            dur="2.5s"
            repeatCount="indefinite"
          />
        </circle>
        <line x1="42" y1="80" x2="42" y2="88" stroke="white" strokeWidth="0.8" opacity="0.15" />
        <line x1="58" y1="80" x2="58" y2="88" stroke="white" strokeWidth="0.8" opacity="0.15" />
      </svg>

      {onClick && (
        <span className="absolute inset-0 rounded-full border-2 border-accent/0 transition-all duration-300 group-hover:animate-[ping_1.5s_cubic-bezier(0,0,0.2,1)_infinite] group-hover:border-accent/20" />
      )}
    </Tag>
  );
}

export default TalkingBotIcon;
