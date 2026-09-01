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

const CROSS_LAYOUT = [
  { x: 1, y: 4 }, { x: 2, y: 4 }, { x: 3, y: 4 }, { x: 4, y: 4 },
  { x: 5, y: 4 }, { x: 6, y: 4 }, { x: 7, y: 4 },
  { x: 4, y: 1 }, { x: 4, y: 2 }, { x: 4, y: 3 },
  { x: 4, y: 5 }, { x: 4, y: 6 },
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
      transition={{ duration: 0.5, delay: 0.12 + index * 0.06, ease: [0.22, 1, 0.36, 1] }}
      style={{ left: `${left}%`, top: `${top}%` }}
      whileHover={{ scale: 1.1 }}
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

function CrossSkill({ skill, index, isInView, position }) {
  const Icon = skill.icon;

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.4 }}
      animate={{ opacity: isInView ? 1 : 0, scale: isInView ? 1 : 0.4 }}
      transition={{ duration: 0.45, delay: 0.1 + index * 0.05, ease: [0.22, 1, 0.36, 1] }}
      style={{ gridColumn: position.x, gridRow: position.y }}
      tabIndex={0}
      role="listitem"
      aria-label={skill.name}
      className="group relative grid place-items-center outline-none"
    >
      <div className="relative grid h-14 w-14 place-items-center rounded-full bg-(--portfolio-accent-soft) shadow-[0_4px_20px_var(--portfolio-shadow-soft)] ring-1 ring-border/40 transition-all duration-300 group-hover:scale-110 group-hover:bg-(--portfolio-accent-soft) group-hover:shadow-[0_8px_30px_var(--portfolio-accent-glow)] group-hover:ring-accent/40 focus-visible:ring-2 focus-visible:ring-accent lg:h-16 lg:w-16">
        <Icon aria-hidden="true" className={`text-2xl lg:text-3xl ${skill.brandColor}`} />
      </div>

      <div className="pointer-events-none absolute bottom-full left-1/2 z-20 mb-3 -translate-x-1/2 translate-y-1 scale-95 whitespace-nowrap opacity-0 transition-all duration-200 ease-out group-hover:translate-y-0 group-hover:scale-100 group-hover:opacity-100 group-focus:translate-y-0 group-focus:scale-100 group-focus:opacity-100">
        <div className="flex items-center gap-2 rounded-xl border border-accent/30 bg-background px-3 py-1.5 shadow-[0_8px_30px_var(--portfolio-shadow-soft)]">
          <span className="h-1.5 w-1.5 rounded-full bg-accent" aria-hidden="true" />
          <span className="text-xs font-extrabold tracking-wide text-foreground">{skill.name}</span>
        </div>
        <div
          className="mx-auto mt-[-1px] h-2 w-2 rotate-45 border-b border-r border-accent/30 bg-background"
          aria-hidden="true"
        />
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
          className="relative mx-auto mt-12 aspect-square w-full max-w-80 sm:max-w-md md:hidden"
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

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.15 }}
          role="list"
          aria-label="Skills overview"
          className="relative mx-auto mt-12 hidden pb-12 md:block"
          style={{ maxWidth: "45rem" }}
        >
          <div className="grid aspect-square w-full grid-cols-7 grid-rows-7 gap-1">
            {SKILLS.map((skill, i) => (
              <CrossSkill
                key={skill.name}
                skill={skill}
                index={i}
                isInView={isInView}
                position={CROSS_LAYOUT[i]}
              />
            ))}
          </div>
        </motion.div>
      </motion.div>
    </section>
  );
}

export default Skills;
