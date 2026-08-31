import { motion } from "framer-motion";
const aboutImage = "/images/2026050511005531.jpg";

const containerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const imageVariants = {
  hidden: { opacity: 0, x: -42, scale: 0.94 },
  visible: {
    opacity: 1,
    x: 0,
    scale: 1,
    transition: { duration: 0.75, ease: [0.22, 1, 0.36, 1] },
  },
};

const contentVariants = {
  hidden: { opacity: 0, x: 42 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.75, ease: [0.22, 1, 0.36, 1] },
  },
};

const fadeUp = {
  hidden: { opacity: 0, y: 28 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.58, ease: [0.22, 1, 0.36, 1] },
  },
};

function About() {
  return (
    <section
      id="about"
      aria-labelledby="about-heading"
      className="relative isolate overflow-hidden bg-background px-6 pb-24 pt-8 text-foreground lg:px-8"
    >
      <AboutBackground />

      <motion.div
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.18 }}
        className="mx-auto grid max-w-7xl items-center gap-8 sm:gap-12 lg:grid-cols-[0.82fr_1.18fr] lg:gap-20"
      >
        <motion.div
          variants={imageVariants}
          className="relative order-2 mx-auto aspect-square w-full max-w-xs sm:max-w-sm lg:order-1 lg:mx-0 lg:max-w-sm"
        >
          <motion.div
            aria-hidden="true"
            className="absolute inset-4 rounded-full border border-border/40"
            animate={{ rotate: 360 }}
            transition={{ duration: 28, repeat: Infinity, ease: "linear" }}
          />
          <div
            className="relative h-full w-full overflow-hidden rounded-full border border-border/70 bg-surface p-2 shadow-2xl"
          >
            <img
              src={aboutImage}
              alt="Portrait of Inibehe Ezekiel John"
              width="400"
              height="400"
              loading="lazy"
              decoding="async"
              className="h-full w-full rounded-full object-cover object-[center_50%]"
            />
          </div>
        </motion.div>

        <motion.div variants={contentVariants} className="relative z-10 order-1 lg:order-2">
          <motion.h2
            id="about-heading"
            variants={fadeUp}
            className="mt-5 text-4xl font-extrabold leading-none tracking-tight sm:text-6xl lg:text-7xl"
          >
            About <span className="text-accent">Me</span>
          </motion.h2>
          <motion.p
            variants={fadeUp}
            className="mt-5 max-w-3xl text-lg font-bold leading-snug text-foreground sm:text-2xl lg:text-3xl"
          >
            Passionate About Building Exceptional Web Experiences
          </motion.p>
          <motion.div
            variants={fadeUp}
            className="mt-6 space-y-5 text-base leading-8 text-muted sm:text-lg"
          >
            <p>
              I am a Website Developer focused on creating modern, responsive,
              accessible, and user-friendly web applications that feel clear,
              fast, and purposeful.
            </p>
            <p>
              I enjoy solving problems, learning new technologies, and turning
              ideas into engaging digital experiences that help people and
              brands show up with confidence online.
            </p>
            <p>
              My approach blends clean code, thoughtful design, and a strong
              attention to detail so every interface feels polished and easy to
              use.
            </p>
          </motion.div>
        </motion.div>
      </motion.div>
    </section>
  );
}

function AboutBackground() {
  return (
    <div aria-hidden="true" className="pointer-events-none absolute inset-0 -z-10" />
  );
}

export default About;
