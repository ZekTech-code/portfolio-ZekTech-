import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import {
  FiGlobe,
  FiUser,
  FiTrendingUp,
  FiGrid,
  FiBarChart2,
  FiRefreshCw,
  FiArrowRight,
} from "react-icons/fi";

const SERVICES = [
  {
    title: "Business Website Development",
    description:
      "Build modern, responsive, and professional websites that strengthen your brand, showcase your services, and help attract more customers.",
    icon: FiGlobe,
    image: "/images/Business website.png",
  },
  {
    title: "Portfolio Website Development",
    description:
      "Create elegant portfolio websites that showcase your work, skills, achievements, and personal brand with a professional online presence.",
    icon: FiUser,
    image: "/images/Portfolio_website.png",
  },
  {
    title: "Landing Page Development",
    description:
      "Develop high-converting landing pages for products, services, events, marketing campaigns, and lead generation.",
    icon: FiTrendingUp,
    image: "/images/Landing-page-website.png",
  },
  {
    title: "Custom Web Application Development",
    description:
      "Build interactive web applications tailored to your business needs, including management systems, productivity tools, booking platforms, and other custom solutions.",
    icon: FiGrid,
    image: "/images/Dashboard-website.png",
  },
  {
    title: "Dashboard & Admin Panel Development",
    description:
      "Design and develop responsive dashboards with analytics, charts, tables, user management, and intuitive interfaces for efficient business operations.",
    icon: FiBarChart2,
    image: "/images/Admin dashboard.png",
  },
  {
    title: "Website Maintenance & Performance Optimization",
    description:
      "Maintain, optimize, and improve existing websites by fixing bugs, increasing performance, enhancing responsiveness, improving accessibility, and implementing new features.",
    icon: FiRefreshCw,
    image: "/images/webcare.png",
  },
];

const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.08 } },
};

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] } },
};

const cardVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] } },
};

function ServicesBackground() {
  return (
    <div aria-hidden="true" className="pointer-events-none absolute inset-0 -z-10 overflow-hidden">
      <motion.div
        className="absolute -left-32 top-1/4 h-72 w-72 rounded-full bg-accent/6 blur-3xl"
        animate={{ x: [0, 20, 0], opacity: [0.15, 0.35, 0.15] }}
        transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="absolute -right-28 bottom-1/4 h-80 w-80 rounded-full bg-accent-hover/5 blur-3xl"
        animate={{ x: [0, -18, 0], opacity: [0.1, 0.3, 0.1] }}
        transition={{ duration: 11, repeat: Infinity, ease: "easeInOut" }}
      />
    </div>
  );
}

function ServiceCard({ service }) {
  const Icon = service.icon;
  const [isHovered, setIsHovered] = useState(false);
  const [isDesktop, setIsDesktop] = useState(() => window.matchMedia("(min-width: 1024px)").matches);

  useEffect(() => {
    const mq = window.matchMedia("(min-width: 1024px)");
    const handler = (e) => setIsDesktop(e.matches);
    mq.addEventListener("change", handler);
    return () => mq.removeEventListener("change", handler);
  }, []);

  const hover = isDesktop && isHovered;

  return (
    <motion.article
      variants={cardVariants}
      animate={hover ? { y: -8, scale: 1.02 } : { y: 0, scale: 1 }}
      transition={{ type: "spring", stiffness: 300, damping: 22 }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="group relative flex flex-col overflow-hidden rounded-2xl border border-border/60 bg-surface/50 p-6 shadow-[0_8px_30px_var(--portfolio-shadow-soft)] backdrop-blur-xl focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-background lg:p-8"
      tabIndex={0}
      onFocus={() => setIsHovered(true)}
      onBlur={() => setIsHovered(false)}
      role="article"
      aria-label={service.title}
    >
      <div className="relative mb-4 h-40 w-full overflow-hidden rounded-xl lg:hidden">
        <img
          src={service.image}
          alt={`${service.title} preview`}
          loading="lazy"
          className="h-full w-full object-cover"
        />
      </div>

      <div className={`relative z-10 mb-5 hidden h-12 w-12 place-items-center rounded-xl bg-(--portfolio-accent-soft) text-xl text-accent transition-all duration-300 lg:grid ${hover ? "scale-110 -rotate-3 opacity-0" : ""}`}>
        <Icon aria-hidden="true" />
      </div>

      <div className={`relative z-10 flex-1 transition-opacity duration-300 ${hover ? "opacity-0" : ""}`}>
        <h3 className={`text-lg font-extrabold text-foreground transition-colors duration-300 ${hover ? "text-accent" : ""}`}>
          {service.title}
        </h3>

        <p className="mt-3 text-sm leading-relaxed text-muted">
          {service.description}
        </p>

        <div className="mt-5 flex items-center justify-end">
          <span className={`inline-flex items-center gap-1 text-xs font-bold text-accent transition-all duration-300 ${hover ? "translate-x-0 opacity-100" : "-translate-x-2 opacity-0"}`}>
            <FiArrowRight className="text-xs" aria-hidden="true" />
          </span>
        </div>
      </div>

      <motion.div
        initial={false}
        animate={hover ? { y: 0, opacity: 1 } : { y: "100%", opacity: 0 }}
        transition={{ duration: 0.6, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
        className="absolute inset-0 z-20 hidden flex-col items-center justify-center rounded-2xl bg-surface lg:flex"
      >
        <div className="h-full w-full overflow-hidden rounded-xl p-6 lg:p-8">
          <img
            src={service.image}
            alt={`${service.title} preview`}
            loading="lazy"
            className="h-full w-full rounded-lg object-contain"
          />
        </div>
      </motion.div>
    </motion.article>
  );
}

function Services() {
  return (
    <section
      id="services"
      aria-labelledby="services-heading"
      className="relative isolate overflow-hidden bg-background px-6 pb-24 pt-8 text-foreground lg:px-8"
    >
      <ServicesBackground />

      <motion.div
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.1 }}
        className="mx-auto max-w-6xl"
      >
        <motion.div variants={fadeUp} className="mx-auto max-w-3xl text-center">
          <motion.h2
            variants={fadeUp}
            id="services-heading"
            className="mt-5 text-4xl font-extrabold leading-none tracking-tight sm:text-6xl lg:text-7xl"
          >
            <span className="text-accent">Services</span>
          </motion.h2>

          <motion.p variants={fadeUp} className="mt-6 text-base leading-8 text-muted sm:text-lg">
            I deliver modern web development solutions that help businesses, startups, and personal
            brands build fast, responsive, scalable, and user-focused digital experiences.
          </motion.p>
        </motion.div>

        <motion.div
          variants={containerVariants}
          className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-3"
        >
          {SERVICES.map((service) => (
            <ServiceCard key={service.title} service={service} />
          ))}
        </motion.div>
      </motion.div>
    </section>
  );
}

export default Services;
