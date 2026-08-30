import { motion } from "framer-motion";
import { FiMail } from "react-icons/fi";
import { FaGithub, FaLinkedin, FaXTwitter, FaInstagram, FaWhatsapp } from "react-icons/fa6";

const PLATFORMS = {
  github: { icon: FaGithub, label: "GitHub", defaultHref: import.meta.env.VITE_GITHUB_URL },
  linkedin: { icon: FaLinkedin, label: "LinkedIn", defaultHref: import.meta.env.VITE_LINKEDIN_URL },
  x: { icon: FaXTwitter, label: "X (Twitter)", defaultHref: import.meta.env.VITE_X_URL },
  instagram: { icon: FaInstagram, label: "Instagram", defaultHref: import.meta.env.VITE_INSTAGRAM_URL },
  email: { icon: FiMail, label: "Email", defaultHref: `mailto:${import.meta.env.VITE_CONTACT_EMAIL}` },
  whatsapp: { icon: FaWhatsapp, label: "WhatsApp", defaultHref: import.meta.env.VITE_CONTACT_WHATSAPP_URL },
};

const sizeStyles = {
  sm: { container: "h-9 w-9", icon: "text-xs" },
  md: { container: "h-11 w-11", icon: "text-sm" },
  lg: { container: "h-12 w-12 md:h-14 md:w-14", icon: "text-base" },
};

const directionStyles = {
  horizontal: "flex-row",
  vertical: "flex-col",
};

function SocialLinks({
  direction = "horizontal",
  size = "md",
  links: customLinks = {},
  platforms: enabledPlatforms,
  className = "",
}) {
  const platformKeys = enabledPlatforms || Object.keys(PLATFORMS);

  return (
    <div
      role="list"
      aria-label="Social links"
      className={`inline-flex flex-wrap items-center justify-center gap-3 ${directionStyles[direction]} ${className}`}
    >
      {platformKeys.map((key) => {
        const platform = PLATFORMS[key];
        if (!platform) return null;

        const Icon = platform.icon;
        const href = customLinks[key] || platform.defaultHref;

        return (
          <motion.a
            key={key}
            role="listitem"
            href={href}
            target="_blank"
            rel="noopener noreferrer"
            whileHover={{ scale: 1.12, rotate: -5, y: -2 }}
            whileTap={{ scale: 0.95 }}
            transition={{ type: "spring", stiffness: 400, damping: 17 }}
            className={`${sizeStyles[size].container} grid place-items-center rounded-full border border-border/60 bg-surface/50 backdrop-blur-xl transition-colors duration-300 hover:border-accent/40 hover:bg-accent/5 hover:text-accent hover:shadow-[0_0_20px_var(--portfolio-accent-glow)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-background text-muted`}
            aria-label={platform.label}
          >
            <Icon className={sizeStyles[size].icon} aria-hidden="true" />
          </motion.a>
        );
      })}
    </div>
  );
}

export default SocialLinks;
