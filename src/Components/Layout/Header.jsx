/**
 * Header
 *
 * Sticky site navigation bar. Tracks the active section while scrolling,
 * collapses/stylises on scroll, and provides a theme toggle (light/dark) and
 * a responsive mobile menu with smooth animated transitions.
 */

import { useEffect, useMemo, useState } from "react";
import { AnimatePresence, animate, motion } from "framer-motion";
import { FiArrowRight, FiMenu, FiMoon, FiSun, FiX } from "react-icons/fi";
import useTheme from "../../Hooks/useTheme";
import { DesktopNavigation, MobileNavigation } from "./Navigation";

const SECTION_IDS = ["home", "about", "skills", "projects", "process", "services", "contact"];
const HEADER_OFFSET = 88;

function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState("home");
  const { isDark, toggleTheme } = useTheme();

  const headerClassName = useMemo(
    () =>
      isScrolled
        ? "border-border premium-header backdrop-blur-xl"
        : "border-transparent bg-background/55 backdrop-blur-md",
    [isScrolled],
  );

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      const offset = HEADER_OFFSET + 16;

      let current = "home";
      for (const sectionId of SECTION_IDS) {
        const section = document.getElementById(sectionId);
        if (!section) continue;
        const top = section.getBoundingClientRect().top + scrollY;
        if (top <= scrollY + offset) {
          current = sectionId;
        }
      }

      setActiveSection((prev) => (prev === current ? prev : current));
      setIsScrolled(scrollY > 12);
    };

    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = isMenuOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [isMenuOpen]);

  const closeMenu = () => setIsMenuOpen(false);

  const handleNavClick = (href) => {
    const sectionId = href.startsWith("#") ? href.slice(1) : href;
    const target = document.getElementById(sectionId);

    setActiveSection(sectionId);
    closeMenu();

    if (!target) return;

    const targetTop =
      target.getBoundingClientRect().top + window.scrollY - HEADER_OFFSET;

    window.history.replaceState(null, "", `#${sectionId}`);

    const nextScrollY = Math.max(targetTop, 0);
    const distance = Math.abs(window.scrollY - nextScrollY);
    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;

    if (prefersReducedMotion) {
      window.scrollTo(0, nextScrollY);
      return;
    }

    animate(window.scrollY, nextScrollY, {
      duration: Math.min(Math.max(distance / 1600, 0.45), 0.95),
      ease: [0.22, 1, 0.36, 1],
      onUpdate: (latest) => window.scrollTo(0, latest),
    });
  };

  return (
    <motion.header
      initial={{ y: -120 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
      className={`fixed inset-x-0 top-0 z-50 border-b transition-all duration-300 ${headerClassName}`}
    >
      <nav
        aria-label="Primary navigation"
        className="mx-auto flex h-20 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8"
      >
        <a
          href="#home"
          aria-label="ZekTech home"
          onClick={(event) => {
            event.preventDefault();
            handleNavClick("#home");
          }}
          className="group flex items-center gap-3 rounded-xl outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-4 focus-visible:ring-offset-background shrink-0"
        >
          <span className="premium-logo-mark flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl text-sm font-bold tracking-tight text-white transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:rotate-3 dark:text-black">
            ZT
          </span>
          <span className="flex items-center text-sm font-bold tracking-tight text-foreground transition-colors duration-300 group-hover:text-accent">
            Zek<span className="text-accent">Tech</span>
          </span>
        </a>

        <DesktopNavigation
          activeSection={activeSection}
          onNavigate={handleNavClick}
        />

        <div className="flex items-center gap-2">
          <button
            type="button"
            aria-label={isDark ? "Switch to light mode" : "Switch to dark mode"}
            onClick={toggleTheme}
            className="premium-interactive grid h-11 w-11 cursor-pointer place-items-center rounded-xl border border-border bg-surface text-foreground shadow-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-4 focus-visible:ring-offset-background"
          >
            {isDark ? <FiSun aria-hidden="true" /> : <FiMoon aria-hidden="true" />}
          </button>

          <motion.a
            href="#contact"
            onClick={(event) => {
              event.preventDefault();
              handleNavClick("#contact");
            }}
            whileHover={{ scale: 1.03, y: -1 }}
            whileTap={{ scale: 0.98 }}
            className="premium-primary-action hidden rounded-xl px-5 py-3 text-sm font-bold text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-4 focus-visible:ring-offset-background dark:text-black sm:inline-flex"
          >
            Hire Me
          </motion.a>

          <button
            type="button"
            aria-label={isMenuOpen ? "Close menu" : "Open menu"}
            aria-controls="mobile-menu"
            aria-expanded={isMenuOpen}
            onClick={() => setIsMenuOpen((open) => !open)}
            className="premium-interactive grid h-11 w-11 place-items-center rounded-xl border border-border bg-surface text-foreground shadow-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-4 focus-visible:ring-offset-background lg:hidden"
          >
            {isMenuOpen ? <FiX aria-hidden="true" /> : <FiMenu aria-hidden="true" />}
          </button>
        </div>
      </nav>

      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            id="mobile-menu"
            initial={{ opacity: 0, y: -12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.22, ease: "easeOut" }}
            className="premium-glass border-t border-border px-4 pb-5 pt-3 backdrop-blur-xl lg:hidden"
          >
            <div className="mx-auto grid max-w-7xl gap-2">
              <MobileNavigation
                activeSection={activeSection}
                onNavigate={handleNavClick}
              />

              <a
                href="#contact"
                onClick={(event) => {
                  event.preventDefault();
                  handleNavClick("#contact");
                }}
                className="premium-primary-action mt-2 inline-flex items-center justify-center gap-2 rounded-xl px-5 py-3 text-sm font-bold text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent dark:text-black"
              >
                Hire Me <FiArrowRight aria-hidden="true" />
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
}

export default Header;
