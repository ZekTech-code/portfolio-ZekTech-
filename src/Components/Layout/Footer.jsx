/**
 * Footer
 *
 * Site footer containing quick links to each section, social media links,
 * and a button that smoothly scrolls the page back to the top.
 */

import { useCallback } from "react";
import { animate } from "framer-motion";
import SocialLinks from "../UI/SocialLinks";

const QUICK_LINKS = [
  { label: "Home", href: "#home" },
  { label: "About", href: "#about" },
  { label: "Skills", href: "#skills" },
  { label: "Projects", href: "#projects" },
  { label: "Process", href: "#process" },
  { label: "Services", href: "#services" },
  { label: "Contact", href: "#contact" },
];

const scrollToTop = () => {
  animate(window.scrollY, 0, {
    duration: Math.min(Math.max(window.scrollY / 1600, 0.45), 1.2),
    ease: [0.22, 1, 0.36, 1],
    onUpdate: (latest) => window.scrollTo(0, latest),
  });
};

function FooterNav({ href, label }) {
  const handleClick = useCallback(
    (e) => {
      e.preventDefault();
      const id = href.slice(1);
      const target = document.getElementById(id);
      if (!target) return;
      const targetTop = target.getBoundingClientRect().top + window.scrollY - 88;
      animate(window.scrollY, Math.max(targetTop, 0), {
        duration: Math.min(Math.max(Math.abs(window.scrollY - Math.max(targetTop, 0)) / 1600, 0.45), 0.95),
        ease: [0.22, 1, 0.36, 1],
        onUpdate: (latest) => window.scrollTo(0, latest),
      });
    },
    [href],
  );

  return (
    <a
      href={href}
      onClick={handleClick}
      className="text-sm text-muted transition-colors duration-300 hover:text-accent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-background rounded-lg px-2 py-1"
    >
      {label}
    </a>
  );
}

function Footer() {
  return (
    <footer
      role="contentinfo"
      className="relative border-t border-border/60 bg-background px-6 pb-8 pt-16 text-foreground lg:px-8"
    >
      <div className="mx-auto max-w-7xl">
        <div className="grid gap-10 lg:grid-cols-3">
          <div>
            <a
              href="#home"
              onClick={(e) => {
                e.preventDefault();
                scrollToTop();
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
            <p className="mt-4 text-sm leading-relaxed text-muted">
              Website developer passionate about building modern, responsive, and accessible web
              experiences. Always open to new opportunities and collaborations.
            </p>
          </div>

          <div className="lg:pl-8">
            <h3 className="text-xs font-bold uppercase tracking-[0.15em] text-muted">
              Quick Links
            </h3>
            <nav aria-label="Footer navigation" className="mt-5 flex flex-col gap-2.5">
              {QUICK_LINKS.map((link) => (
                <FooterNav key={link.href} href={link.href} label={link.label} />
              ))}
            </nav>
          </div>

          <div>
            <h3 className="text-xs font-bold uppercase tracking-[0.15em] text-muted">Connect</h3>
            <p className="mt-3 text-sm leading-relaxed text-muted">
              Feel free to reach out for collaborations, opportunities, or just a friendly chat.
            </p>
            <div className="mt-5">
              <SocialLinks size="sm" />
            </div>
          </div>
        </div>

        <div className="mt-12 border-t border-border/50 pt-6">
          <p className="text-center text-xs text-muted">
            &copy; {new Date().getFullYear()} Inibehe Ezekiel John. Built with care.
          </p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
