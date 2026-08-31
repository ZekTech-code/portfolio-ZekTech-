/**
 * Layout
 *
 * Root layout wrapper for the entire application. Renders a subtle ambient
 * background layer and applies consistent base styling, theming transitions,
 * and overflow control to the page as a whole.
 */

import { motion } from "framer-motion";

function LayoutBackground() {
  return (
    <div aria-hidden="true" className="pointer-events-none fixed inset-0 -z-10 overflow-hidden" />
  );
}

function Layout({ children }) {
  return (
    <div className="relative min-h-screen overflow-x-hidden bg-background text-foreground transition-colors duration-300">
      <LayoutBackground />

      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-100 focus:rounded-xl focus:bg-accent focus:px-4 focus:py-2 focus:text-sm focus:font-bold focus:text-white focus:shadow-lg focus:outline-none"
      >
        Skip to main content
      </a>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
      >
        {children}
      </motion.div>
    </div>
  );
}

export default Layout;
