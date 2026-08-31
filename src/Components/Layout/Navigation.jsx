/**
 * Navigation
 *
 * Defines the site's primary navigation menu. Renders both a desktop
 * navigation bar and a mobile menu, with animated underline indicators that
 * highlight the currently active section.
 */

import { motion } from "framer-motion";

const NAV_ITEMS = [
  { label: "Home", href: "#home" },
  { label: "About", href: "#about" },
  { label: "Skills", href: "#skills" },
  { label: "Projects", href: "#projects" },
  { label: "Process", href: "#process" },
  { label: "Services", href: "#services" },
  { label: "Contact", href: "#contact" },
];

const desktopLinkBase =
  "relative overflow-hidden rounded-xl px-4 py-2 text-sm font-semibold outline-none transition-all duration-300 before:absolute before:inset-x-3 before:bottom-1.5 before:h-px before:origin-left before:scale-x-0 before:bg-accent before:transition-transform before:duration-300 after:absolute after:bottom-1 after:left-1/2 after:h-1 after:w-1 after:-translate-x-1/2 after:rounded-full after:bg-accent-hover after:opacity-0 after:transition-opacity after:duration-300 hover:-translate-y-0.5 hover:before:scale-x-100 hover:after:opacity-100 focus-visible:ring-2 focus-visible:ring-accent";

const mobileLinkBase =
  "relative overflow-hidden rounded-2xl px-4 py-3 text-base font-semibold outline-none transition-all duration-300 before:absolute before:inset-y-3 before:left-2 before:w-1 before:scale-y-0 before:rounded-full before:bg-accent before:transition-transform before:duration-300 after:absolute after:inset-y-3 after:right-2 after:w-1 after:scale-y-0 after:rounded-full after:bg-accent-hover after:transition-transform after:duration-300 hover:translate-x-1 hover:before:scale-y-100 hover:after:scale-y-100 focus-visible:ring-2 focus-visible:ring-accent";

function getSectionId(href) {
  return href.startsWith("#") ? href.slice(1) : href;
}

function NavigationLink({ item, activeSection, onNavigate, variant = "desktop" }) {
  const sectionId = getSectionId(item.href);
  const isActive = activeSection === sectionId;
  const isDesktop = variant === "desktop";

  const activeClassName = isDesktop
    ? "text-accent before:scale-x-100 after:opacity-100"
    : "bg-accent/10 text-accent before:scale-y-100 after:scale-y-100";

  const idleClassName = isDesktop
    ? "text-muted hover:bg-accent/10 hover:text-foreground"
    : "text-muted hover:bg-accent/10 hover:text-foreground";

  return (
    <a
      href={item.href}
      aria-current={isActive ? "page" : undefined}
      onClick={(event) => {
        event.preventDefault();
        onNavigate(item.href);
      }}
      className={`${isDesktop ? desktopLinkBase : mobileLinkBase} ${
        isActive ? activeClassName : idleClassName
      }`}
    >
      {isActive && isDesktop && (
        <motion.span
          layoutId="active-nav"
          className="absolute inset-0 rounded-xl bg-accent/10"
          transition={{ type: "spring", stiffness: 420, damping: 34 }}
        />
      )}
      <span className="relative z-10">{item.label}</span>
    </a>
  );
}

export function DesktopNavigation({ activeSection, onNavigate }) {
  return (
    <div className="hidden items-center rounded-2xl border border-border bg-background p-1 lg:flex">
      {NAV_ITEMS.map((item) => (
        <NavigationLink
          key={item.href}
          item={item}
          activeSection={activeSection}
          onNavigate={onNavigate}
        />
      ))}
    </div>
  );
}

export function MobileNavigation({ activeSection, onNavigate }) {
  return (
    <>
      {NAV_ITEMS.map((item) => (
        <NavigationLink
          key={item.href}
          item={item}
          activeSection={activeSection}
          onNavigate={onNavigate}
          variant="mobile"
        />
      ))}
    </>
  );
}

export default DesktopNavigation;
