/** @format */
import { useEffect, useRef, useState } from "react";
import { animate, motion, useInView } from "framer-motion";
import {
  FiArrowDownCircle,
  FiArrowRight,
  FiDownload,
} from "react-icons/fi";
import SocialLinks from "../UI/SocialLinks";
import {
  SiCss,
  SiGit,
  SiGithub,
  SiHtml5,
  SiJavascript,
  SiNodedotjs,
  SiExpress,
  SiReact,
  SiTailwindcss,
} from "react-icons/si";
import FigmaIcon from "../UI/FigmaIcon";
const profileImage = "/images/2026050510580804.jpg";

const ROLES = [
  "Website Developer",
  "Frontend Developer",
  "Backend Developer",
  "AI Developer",
];

const TECH_BADGES = [
  {
    label: "HTML5",
    icon: SiHtml5,
    className:
      "text-orange-500 left-[3%] top-[2%] sm:left-1 sm:top-14",
    delay: 0,
  },
  {
    label: "CSS3",
    icon: SiCss,
    className:
      "text-blue-500 right-[3%] top-[10%] sm:right-3 sm:top-20",
    delay: 0.2,
  },
  {
    label: "JavaScript",
    icon: SiJavascript,
    className:
      "text-yellow-400 left-[0%] top-[42%] sm:left-8 sm:top-auto sm:bottom-24",
    delay: 0.35,
  },
  {
    label: "React",
    icon: SiReact,
    className:
      "text-sky-400 right-[0%] top-[42%] sm:right-10 sm:top-auto sm:bottom-28",
    delay: 0.5,
  },
  {
    label: "Tailwind CSS",
    icon: SiTailwindcss,
    className:
      "text-cyan-400 left-[2%] bottom-[14%] sm:-left-2 sm:bottom-auto sm:top-1/2",
    delay: 0.65,
  },
  {
    label: "Git",
    icon: SiGit,
    className:
      "text-red-500 right-[2%] bottom-[14%] sm:right-2 sm:bottom-auto sm:top-1/2",
    delay: 0.8,
  },
  {
    label: "GitHub",
    icon: SiGithub,
    className:
      "text-foreground left-[18%] bottom-[0%] sm:left-24 sm:bottom-[-0.25rem]",
    delay: 0.95,
  },
  {
    label: "Figma",
    icon: FigmaIcon,
    className:
      "right-[18%] bottom-[0%] sm:right-24 sm:bottom-[-0.75rem]",
    delay: 1.1,
  },
  {
    label: "Node.js",
    icon: SiNodedotjs,
    className:
      "text-green-500 left-[18%] top-[-4%] sm:left-20 sm:top-[-1.5rem]",
    delay: 1.25,
  },
  {
    label: "Express.js",
    icon: SiExpress,
    className:
      "text-neutral-300 dark:text-neutral-400 right-[18%] top-[-4%] sm:right-20 sm:top-[-1.5rem]",
    delay: 1.4,
  },
];

const particles = Array.from({ length: 18 }, (_, index) => ({
  id: index,
  left: `${6 + ((index * 19) % 88)}%`,
  top: `${8 + ((index * 29) % 82)}%`,
  delay: index * 0.14,
  duration: 4 + (index % 5),
}));

const containerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0 },
};

function Hero() {
  const [roleIndex, setRoleIndex] = useState(0);
  const [typedText, setTypedText] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);

  const currentRole = ROLES[roleIndex];
  const displayedRole = typedText;

  useEffect(() => {
    const delay =
      !isDeleting && typedText.length === currentRole.length ? 1200
      : isDeleting ? 42
      : 82;

    const timeout = window.setTimeout(() => {
      if (!isDeleting && typedText.length < currentRole.length) {
        setTypedText(currentRole.slice(0, typedText.length + 1));
        return;
      }

      if (!isDeleting && typedText.length === currentRole.length) {
        setIsDeleting(true);
        return;
      }

      if (isDeleting && typedText.length > 0) {
        setTypedText(currentRole.slice(0, typedText.length - 1));
        return;
      }

      setIsDeleting(false);
      setRoleIndex((index) => (index + 1) % ROLES.length);
    }, delay);

    return () => window.clearTimeout(timeout);
  }, [currentRole, isDeleting, typedText]);

  return (
    <section
      id="home"
      aria-labelledby="hero-heading"
      className="relative isolate min-h-screen overflow-hidden bg-background px-5 pb-20 pt-32 text-foreground sm:px-6 lg:px-8 lg:pt-36">
      <HeroBackground />

      <div className="mx-auto grid max-w-7xl items-center gap-10 sm:gap-14 lg:min-h-[calc(100vh-9rem)] lg:grid-cols-[1.03fr_0.97fr]">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="relative z-10 max-w-3xl">
          <motion.div
            variants={fadeUp}
            className="mb-6 inline-flex items-center gap-2 rounded-full border border-border bg-surface/75 px-5 py-3 text-lg font-semibold text-secondary shadow-sm shadow-foreground/5 backdrop-blur-xl sm:text-xl">
            <span>Hello, I'm</span>
          </motion.div>

          <motion.h1
            id="hero-heading"
            variants={fadeUp}
            className="max-w-4xl text-[1.75rem] font-extrabold leading-[1.05] tracking-tight sm:text-5xl lg:text-6xl">
            <span className="block text-foreground">Inibehe Ezekiel John</span>
            <span className="block bg-linear-to-r from-accent via-accent-hover to-accent bg-clip-text text-transparent">
              ZekTech
            </span>
          </motion.h1>

          <motion.p
            variants={fadeUp}
            className="mt-6 min-h-12 text-xl font-bold tracking-tight text-secondary sm:text-3xl">
            <span aria-label={displayedRole} className="inline-flex flex-wrap">
              {Array.from(displayedRole).map((character, index) => (
                <span
                  key={`${displayedRole}-${index}`}
                  aria-hidden="true"
                  className="typing-letter inline-block"
                  style={{
                    "--letter-index": index,
                    animationDelay: `${index * -0.1}s`,
                  }}>
                  {character === " " ? "\u00A0" : character}
                </span>
              ))}
            </span>
            <span
              aria-hidden="true"
              className="ml-1 inline-block h-8 w-0.5 translate-y-1 bg-accent-hover"
            />
          </motion.p>

          <motion.p
            variants={fadeUp}
            className="mt-6 max-w-2xl text-lg leading-8 text-muted">
            I build modern, responsive, accessible, and high-performance
            websites and web applications that help businesses and personal
            brands create exceptional digital experiences.
          </motion.p>

          <motion.div
            variants={fadeUp}
            className="mt-9 grid w-full grid-cols-2 gap-3 sm:flex sm:flex-wrap sm:items-center sm:gap-6">
            <HeroStat value={10} suffix="+" label="Projects Built" />
            <HeroStat value={6} suffix="+" label="Services Offered" />
            <HeroStat value={2} suffix="+" label="Years Learning" />
            <HeroStat value={100} suffix="%" label="Commitment" />
          </motion.div>

          <motion.div
            variants={fadeUp}
            className="mt-8 flex w-full flex-col items-center gap-3 sm:w-auto sm:flex-row sm:items-center">
            <HeroButton href="#contact" icon={FiArrowRight} variant="primary">
              Hire Me
            </HeroButton>
            <HeroButton
              href="/ZekTech.pdf"
              icon={FiDownload}
              variant="secondary"
              download="ZekTech.pdf">
              Download CV
            </HeroButton>
            <HeroButton
              href="#projects"
              icon={FiArrowDownCircle}
              variant="ghost">
              View Projects
            </HeroButton>
          </motion.div>

          <motion.div variants={fadeUp} className="mt-8 flex w-full justify-center lg:justify-start">
            <SocialLinks size="md" className="flex-nowrap justify-center" />
          </motion.div>

        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.94, y: 28 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.75, ease: "easeOut" }}
          className="relative z-10 mx-auto aspect-square w-full max-w-65 sm:max-w-sm lg:max-w-lg">
          <div className="absolute inset-7 rounded-full bg-accent/20 blur-3xl" />
          <div className="absolute inset-0 rounded-full border border-border/70" />
          <div className="absolute inset-12 rounded-full border border-accent/20" />

          <motion.div
            whileHover={{
              scale: [1, 1.045, 1.015, 1.035, 1],
            }}
            whileTap={{ scale: 0.98 }}
            transition={{ duration: 0.6, ease: "easeInOut" }}
            className="absolute inset-16 overflow-hidden rounded-full bg-linear-to-br from-accent via-accent-hover to-accent p-1 shadow-2xl shadow-accent/20">
            <div className="h-full w-full overflow-hidden rounded-full border border-white/30 bg-surface">
              <img
                src={profileImage}
                alt="Portrait illustration of Inibehe Ezekiel John"
                loading="lazy"
                decoding="async"
                className="h-full w-full object-cover object-[center_68%]"
              />
            </div>
          </motion.div>

          {TECH_BADGES.map((tech) => (
            <TechBadge key={tech.label} {...tech} />
          ))}
        </motion.div>
      </div>
    </section>
  );
}

function HeroStat({ value, suffix, label }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.5 });
  const [display, setDisplay] = useState(0);

  useEffect(() => {
    if (!isInView) return;
    const start = performance.now();
    const duration = 1100;
    let raf;

    const tick = (now) => {
      const progress = Math.min((now - start) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setDisplay(Math.round(eased * value));
      if (progress < 1) {
        raf = requestAnimationFrame(tick);
      }
    };

    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [isInView, value]);

  return (
    <div
      ref={ref}
      className="flex min-w-28 flex-1 items-start gap-2 border-l-2 border-accent/40 pl-3 sm:flex-initial">
      <span className="text-2xl font-extrabold leading-none tracking-tight text-accent sm:text-3xl">
        {display}
        {suffix}
      </span>
      <span className="pt-0.5 text-[11px] font-bold uppercase leading-tight tracking-wide text-muted sm:text-xs">
        {label}
      </span>
    </div>
  );
}

function HeroButton({
  children,
  href,
  icon: Icon,
  variant = "primary",
  download,
}) {
  const handleClick = (e) => {
    if (download || !href.startsWith("#")) return;
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
  };

  const className =
    variant === "primary" ?
      "bg-accent text-white shadow-accent/20 hover:bg-accent-hover dark:text-black"
    : variant === "secondary" ?
      "border border-accent text-accent hover:bg-accent hover:text-white dark:hover:text-black"
    : "border border-border bg-surface/70 text-foreground hover:border-accent hover:text-accent";

  return (
    <motion.a
      href={href}
      download={download}
      onClick={handleClick}
      whileHover={{ scale: 1.035, y: -2 }}
      whileTap={{ scale: 0.98 }}
          className={`inline-flex w-full max-w-70 sm:max-w-none sm:w-auto items-center justify-center gap-2 rounded-xl px-5 py-3.5 text-sm font-bold shadow-lg outline-none transition-colors duration-300 focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-4 focus-visible:ring-offset-background sm:px-6 sm:py-4 ${className}`}>
      {children}
      <Icon aria-hidden="true" className="text-lg" />
    </motion.a>
  );
}

function TechBadge({ label, icon: Icon, className, delay }) {
  const isSmallScreen =
    typeof window !== "undefined" && window.innerWidth < 640;

  return (
    <motion.div
      animate={{
        y: [0, isSmallScreen ? -6 : -16, 0],
        rotate: [0, isSmallScreen ? 0.5 : 2, 0],
      }}
      transition={{
        duration: isSmallScreen ? 4.5 : 3.8,
        repeat: Infinity,
        ease: "easeInOut",
        delay,
      }}
      className={`group absolute z-20 grid h-11 w-11 sm:h-14 sm:w-14 md:h-16 md:w-16 cursor-default place-items-center rounded-xl sm:rounded-2xl border border-border bg-surface/85 text-2xl sm:text-3xl shadow-xl shadow-foreground/10 backdrop-blur-xl transition-colors duration-300 hover:z-50 hover:border-accent hover:bg-surface hover:shadow-2xl hover:shadow-accent/20 focus-visible:z-50 ${className}`}
      aria-label={label}
      tabIndex={0}>
      <motion.span
        whileHover={{ scale: 1.22, rotate: -8, y: -5 }}
        whileTap={{ scale: 0.94 }}
        transition={{ type: "spring", stiffness: 420, damping: 16 }}
        className="grid h-full w-full place-items-center transition-transform duration-300 group-hover:drop-shadow-lg">
        <Icon aria-hidden="true" />
      </motion.span>
      <span className="pointer-events-none absolute -top-12 left-1/2 z-30 -translate-x-1/2 translate-y-2 whitespace-nowrap rounded-lg border border-border bg-foreground px-3 py-1.5 text-xs font-bold text-background opacity-0 shadow-xl shadow-foreground/15 transition-all duration-200 group-hover:translate-y-0 group-hover:opacity-100 group-focus-visible:translate-y-0 group-focus-visible:opacity-100">
        {label}
        <span className="absolute left-1/2 top-full h-2 w-2 -translate-x-1/2 -translate-y-1 rotate-45 border-b border-r border-border bg-foreground" />
      </span>
    </motion.div>
  );
}

function HeroBackground() {
  return (
    <div
      aria-hidden="true"
      className="pointer-events-none absolute inset-0 -z-10">
      <motion.div
        className="absolute -left-48 top-24 h-96 w-96 rounded-full bg-accent/12 blur-3xl"
        animate={{ x: [0, 28, 0], y: [0, -18, 0], scale: [1, 1.08, 1] }}
        transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="absolute -right-40 top-44 h-112 w-md rounded-full bg-accent-hover/12 blur-3xl"
        animate={{ x: [0, -24, 0], y: [0, 22, 0], scale: [1, 1.06, 1] }}
        transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="absolute bottom-8 left-1/2 h-80 w-80 -translate-x-1/2 rounded-full bg-accent/10 blur-3xl"
        animate={{ opacity: [0.45, 0.8, 0.45] }}
        transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="absolute left-[10%] top-[28%] h-24 w-24 rounded-full bg-accent-hover/8 blur-2xl"
        animate={{ y: [0, -20, 0], opacity: [0.35, 0.7, 0.35] }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="absolute bottom-[18%] right-[12%] h-32 w-32 rounded-full bg-accent/8 blur-2xl"
        animate={{ y: [0, 18, 0], opacity: [0.3, 0.65, 0.3] }}
        transition={{ duration: 9, repeat: Infinity, ease: "easeInOut" }}
      />

      {particles.map((particle) => (
        <motion.span
          key={particle.id}
          className="absolute h-1.5 w-1.5 rounded-full bg-accent/35"
          style={{ left: particle.left, top: particle.top }}
          animate={{ y: [0, -18, 0], opacity: [0.25, 0.85, 0.25] }}
          transition={{
            duration: particle.duration,
            repeat: Infinity,
            ease: "easeInOut",
            delay: particle.delay,
          }}
        />
      ))}
    </div>
  );
}

export default Hero;
