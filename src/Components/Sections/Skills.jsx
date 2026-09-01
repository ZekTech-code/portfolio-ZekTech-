import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import {
  SiHtml5,
  SiCss,
  SiJavascript,
  SiReact,
  SiTailwindcss,
  SiBootstrap,
  SiNodedotjs,
  SiExpress,
  SiGit,
  SiGithub,
} from "react-icons/si";
import { FiRadio } from "react-icons/fi";
import FigmaIcon from "../UI/FigmaIcon";

const SKILLS = [
  { name: "HTML5", icon: SiHtml5, brandColor: "text-orange-500" },
  { name: "CSS3", icon: SiCss, brandColor: "text-blue-500" },
  { name: "JavaScript", icon: SiJavascript, brandColor: "text-yellow-400" },
  { name: "React.js", icon: SiReact, brandColor: "text-sky-400" },
  { name: "Tailwind CSS", icon: SiTailwindcss, brandColor: "text-cyan-400" },
  { name: "Bootstrap", icon: SiBootstrap, brandColor: "text-purple-500" },
  { name: "Node.js", icon: SiNodedotjs, brandColor: "text-green-500" },
  { name: "Express.js", icon: SiExpress, brandColor: "text-neutral-500" },
  { name: "Git", icon: SiGit, brandColor: "text-red-500" },
  { name: "GitHub", icon: SiGithub, brandColor: "text-foreground" },
  { name: "Figma", icon: FigmaIcon, brandColor: "" },
  { name: "AI-Powered Development", icon: FiRadio, brandColor: "text-accent" },
];

const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.08 } },
};

const fadeUp = {
  hidden: { opacity: 0, y: 28 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.58, ease: [0.22, 1, 0.36, 1] } },
};

function SkillsBackground() {
  return (
    <div aria-hidden="true" className="pointer-events-none absolute inset-0 -z-10 overflow-hidden" />
  );
}

function CircularSkill({ skill, index, total, isInView }) {
  const Icon = skill.icon;
  const angle = (index / total) * 360 - 90;
  const rad = (angle * Math.PI) / 180;
  const left = 50 + 42 * Math.cos(rad);
  const top = 50 + 42 * Math.sin(rad);

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.6 }}
      animate={{ opacity: isInView ? 1 : 0, scale: isInView ? 1 : 0.6 }}
      transition={{
        duration: 0.5,
        delay: 0.12 + index * 0.06,
        ease: [0.22, 1, 0.36, 1],
      }}
      style={{ left: `${left}%`, top: `${top}%` }}
      whileHover={{ scale: 1.12 }}
      whileTap={{ scale: 0.92 }}
      tabIndex={0}
      role="listitem"
      aria-label={skill.name}
      className="absolute z-10 -translate-x-1/2 -translate-y-1/2 outline-none"
    >
      <div className="flex h-12 w-12 flex-col items-center justify-center gap-0.5 rounded-2xl bg-(--portfolio-accent-soft) shadow-[0_4px_16px_var(--portfolio-shadow-soft)] transition-colors duration-300 focus-visible:ring-2 focus-visible:ring-accent sm:h-16 sm:w-16">
        <Icon aria-hidden="true" className={`text-xl sm:text-2xl ${skill.brandColor}`} />
        <span className="max-w-full px-1 text-center text-[7px] font-extrabold leading-none text-foreground sm:text-[8px]">
          {skill.name}
        </span>
      </div>
    </motion.div>
  );
}

function Skills() {
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, amount: 0.15 });
  const total = SKILLS.length;

  return (
    <section
      id="skills"
      ref={sectionRef}
      aria-labelledby="skills-heading"
      className="relative isolate overflow-hidden bg-background px-6 pb-24 pt-8 text-foreground lg:px-8">
      <SkillsBackground />

      <motion.div
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
        className="mx-auto max-w-6xl">
        <motion.div variants={fadeUp} className="mx-auto max-w-3xl text-center">
          <h2
            id="skills-heading"
            className="mt-5 text-4xl font-extrabold leading-none tracking-tight sm:text-6xl lg:text-7xl">
            <span className="text-accent">Skills</span>
          </h2>
          <p className="mt-6 text-base leading-8 text-muted sm:text-lg">
            The technologies behind modern, responsive, and scalable web solutions.
          </p>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.15 }}
          role="list"
          className="relative mx-auto mt-12 aspect-square w-full max-w-80 sm:max-w-md lg:max-w-lg"
        >
          {SKILLS.map((skill, i) => (
            <CircularSkill
              key={skill.name}
              skill={skill}
              index={i}
              total={total}
              isInView={isInView}
            />
          ))}
        </motion.div>

        {/* <motion.div
          variants={fadeUp}
          animate={{ y: [0, -5, 0] }}
          transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
          className="mx-auto mt-16 max-w-3xl rounded-2xl border border-border bg-(--portfolio-glass-surface) px-6 py-5 text-center text-sm font-semibold leading-relaxed text-secondary shadow-[0_8px_30px_var(--portfolio-shadow-soft)] backdrop-blur-xl sm:text-base">
          <span aria-hidden="true" className="mr-2">
            ✨
          </span>
          Always learning new technologies and building better digital
          experiences every day.
        </motion.div> */}
      </motion.div>
    </section>
  );
}

export default Skills;
