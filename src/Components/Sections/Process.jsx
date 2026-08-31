/**
 * Process Section
 *
 * Outlines the developer's collaboration workflow (Discover, Design, Develop,
 * Deploy). A clear, structured process helps potential clients understand how
 * a project moves from idea to launch and signals a professional, organized
 * approach. Steps are presented with numbered icons on a responsive grid.
 */

import { motion } from "framer-motion";
import { FiSearch, FiPenTool, FiCode, FiCheckCircle } from "react-icons/fi";

const STEPS = [
  {
    step: "01",
    icon: FiSearch,
    title: "Discover",
    description:
      "We align on your goals, requirements, and audience to define project scope, architecture, and a clear direction.",
  },
  {
    step: "02",
    icon: FiPenTool,
    title: "Design",
    description:
      "I craft a clean, user-friendly interface and structure that reflects your brand and delivers a great experience.",
  },
  {
    step: "03",
    icon: FiCode,
    title: "Develop",
    description:
      "I bring the design to life, building a fast, modern, and responsive product with clean architecture and dependable APIs.",
  },
  {
    step: "04",
    icon: FiCheckCircle,
    title: "Deploy",
    description:
      "Your project goes live. I test, polish, and ensure everything is performant, secure, and ready for your audience.",
  },
];

const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1 } },
};

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] } },
};

function ProcessBackground() {
  return (
    <div aria-hidden="true" className="pointer-events-none absolute inset-0 -z-10 overflow-hidden" />
  );
}

function Process() {
  return (
    <section
      id="process"
      aria-labelledby="process-heading"
      className="relative isolate overflow-hidden bg-background px-6 pb-24 pt-8 text-foreground lg:px-8"
    >
      <ProcessBackground />

      <motion.div
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.1 }}
        className="mx-auto max-w-6xl"
      >
        <motion.div variants={fadeUp} className="mx-auto max-w-2xl text-center">
          <h2
            id="process-heading"
            className="mt-5 text-4xl font-extrabold leading-none tracking-tight sm:text-6xl lg:text-7xl"
          >
            How I <span className="text-accent">Work</span>
          </h2>
          <p className="mt-6 text-base leading-8 text-muted sm:text-lg">
            A clear, structured process that takes your project from idea to a
            polished, live result with clear communication at every step.
          </p>
        </motion.div>

        <motion.div
          variants={containerVariants}
          className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-4"
        >
          {STEPS.map((step) => {
            const Icon = step.icon;
            return (
              <motion.div
                key={step.step}
                variants={fadeUp}
                whileHover={{ y: -6 }}
                transition={{ type: "spring", stiffness: 300, damping: 22 }}
                className="relative flex flex-col gap-4 rounded-2xl border border-border/60 bg-surface/40 p-6 backdrop-blur-xl"
              >
                <span className="absolute right-5 top-4 text-4xl font-extrabold text-accent/10">
                  {step.step}
                </span>

                <div className="grid h-12 w-12 place-items-center rounded-xl bg-(--portfolio-accent-soft) text-xl text-accent">
                  <Icon aria-hidden="true" />
                </div>

                <h3 className="text-lg font-extrabold text-foreground">{step.title}</h3>
                <p className="text-sm leading-relaxed text-muted">{step.description}</p>
              </motion.div>
            );
          })}
        </motion.div>
      </motion.div>
    </section>
  );
}

export default Process;
