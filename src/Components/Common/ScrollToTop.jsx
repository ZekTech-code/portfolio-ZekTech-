import { useCallback, useEffect, useRef, useState } from "react";
import { AnimatePresence, animate, motion } from "framer-motion";
import { FiArrowUp } from "react-icons/fi";

const SCROLL_THRESHOLD = 0.85;

function ScrollToTop() {
  const [show, setShow] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);
  const isScrolling = useRef(false);

  useEffect(() => {
    if (!window.location.hash) {
      window.scrollTo(0, 0);
    }
    history.scrollRestoration = "manual";
    let ticking = false;
    const handleScroll = () => {
      if (ticking) return;
      window.requestAnimationFrame(() => {
        const scrollTop = window.scrollY;
        const docHeight = document.documentElement.scrollHeight - window.innerHeight;
        setShow(docHeight > 0 && scrollTop / docHeight >= SCROLL_THRESHOLD);
        if (scrollTop === 0) isScrolling.current = false;
        ticking = false;
      });
      ticking = true;
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToTop = useCallback(() => {
    if (isScrolling.current) return;
    isScrolling.current = true;
    setIsAnimating(true);
    animate(window.scrollY, 0, {
      duration: Math.min(Math.max(window.scrollY / 1600, 0.45), 1.2),
      ease: [0.22, 1, 0.36, 1],
      onUpdate: (latest) => window.scrollTo(0, latest),
      onComplete: () => { isScrolling.current = false; setIsAnimating(false); },
    });
  }, []);

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          initial={{ opacity: 0, scale: 0.6, y: 16 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.6, y: 16 }}
          transition={{ type: "spring", stiffness: 360, damping: 26, mass: 0.8 }}
          className="flex items-center justify-center"
        >
            <motion.button
              whileHover={{ scale: 1.08, y: -2 }}
              whileTap={{ scale: 0.95 }}
              transition={{ type: "spring", stiffness: 420, damping: 22 }}
              onClick={scrollToTop}
              aria-label="Scroll to top"
              disabled={isAnimating}
              className="group relative z-10 grid h-11 w-11 place-items-center rounded-full border border-border bg-(--portfolio-glass-surface) text-accent shadow-(--portfolio-shadow-soft) backdrop-blur-xl outline-none transition-shadow duration-300 hover:shadow-[0_0_24px_var(--portfolio-accent-glow)] focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-background cursor-pointer disabled:cursor-not-allowed sm:h-14 sm:w-14"
            >
              <FiArrowUp className="text-base transition-transform duration-300 group-hover:-translate-y-0.5 md:text-lg" />
            </motion.button>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

export default ScrollToTop;
