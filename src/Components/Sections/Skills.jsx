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

const COLUMNS = [
  {
    skills: [
      { name: "HTML5", value: 95, icon: SiHtml5, brandColor: "text-orange-500" },
      { name: "CSS3", value: 92, icon: SiCss, brandColor: "text-blue-500" },
      { name: "JavaScript", value: 90, icon: SiJavascript, brandColor: "text-yellow-400" },
      { name: "React.js", value: 90, icon: SiReact, brandColor: "text-sky-400" },
    ],
  },
  {
    skills: [
      { name: "Tailwind CSS", value: 95, icon: SiTailwindcss, brandColor: "text-cyan-400" },
      { name: "Bootstrap", value: 90, icon: SiBootstrap, brandColor: "text-purple-500" },
      { name: "Node.js", value: 75, icon: SiNodedotjs, brandColor: "text-green-500" },
      { name: "Express.js", value: 70, icon: SiExpress, brandColor: "text-neutral-500" },
    ],
  },
  {
    skills: [
      { name: "Git", value: 85, icon: SiGit, brandColor: "text-red-500" },
      { name: "GitHub", value: 90, icon: SiGithub, brandColor: "text-foreground" },
      { name: "Figma", value: 80, icon: FigmaIcon, brandColor: "" },
      { name: "AI-Powered Development", value: 95, icon: FiRadio, brandColor: "text-accent" },
    ],
  },
];

const SKILLS = COLUMNS.flatMap((col) => col.skills);

const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.08 } },
};

const fadeUp = {
  hidden: { opacity: 0, y: 28 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.58, ease: [0.22, 1, 0.36, 1] } },
};

const mobileFadeUp = {
  hidden: { opacity: 0, y: 20, scale: 0.92 },
  visible: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.48, ease: [0.22, 1, 0.36, 1] } },
};

function SkillsBackground() {
  return (
    <div aria-hidden="true" className="pointer-events-none absolute inset-0 -z-10 overflow-hidden" />
  );
}

function ProgressBar({ value, index, isInView }) {
  return (
    <div className="h-1.5 w-full overflow-hidden rounded-full bg-border/50">
      <motion.div
        initial={{ width: 0 }}
        animate={{ width: isInView ? `${value}%` : 0 }}
        transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1], delay: 0.15 + index * 0.06 }}
        className="h-full rounded-full bg-accent shadow-[0_0_6px_var(--portfolio-accent-glow)]"
      />
    </div>
  );
}

function MobileSkillCard({ skill }) {
  const Icon = skill.icon;

  return (
    <motion.div
      variants={mobileFadeUp}
      whileTap={{ scale: 0.88 }}
      tabIndex={0}
      role="listitem"
      aria-label={skill.name}
      className="flex flex-col items-center gap-2 rounded-2xl p-3 outline-none transition-colors duration-300 focus-visible:bg-(--portfolio-accent-soft) focus-visible:ring-2 focus-visible:ring-accent"
    >
      <div className="grid h-11 w-11 place-items-center rounded-xl bg-(--portfolio-accent-soft) text-base">
        <Icon aria-hidden="true" className={skill.brandColor} />
      </div>
      <span className="text-center text-[11px] font-extrabold leading-tight text-foreground">
        {skill.name}
      </span>
    </motion.div>
  );
}

function SkillItem({ skill, index, isInView }) {
  const Icon = skill.icon;

  return (
    <motion.div
      variants={fadeUp}
      whileHover={{ x: 4 }}
      transition={{ type: "spring", stiffness: 320, damping: 22 }}
      tabIndex={0}
      role="listitem"
      aria-label={`${skill.name}, ${skill.value} percent proficiency`}
      className="group flex items-center gap-3 rounded-2xl p-2.5 outline-none transition-colors duration-300 hover:bg-(--portfolio-accent-soft) focus-visible:bg-(--portfolio-accent-soft) focus-visible:ring-2 focus-visible:ring-accent"
    >
      <div className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-(--portfolio-accent-soft) text-lg transition-transform duration-300 group-hover:scale-110 group-focus:scale-110">
        <Icon aria-hidden="true" className={skill.brandColor} />
      </div>

      <div className="min-w-0 flex-1">
        <div className="mb-1.5 flex items-baseline justify-between gap-2">
          <span className="truncate text-xl font-extrabold text-foreground transition-colors duration-300 group-hover:text-accent group-focus:text-accent">
            {skill.name}
          </span>
          <span className="shrink-0 text-base font-extrabold text-muted transition-colors duration-300 group-hover:text-accent group-focus:text-accent">
            {skill.value}%
          </span>
        </div>
        <ProgressBar value={skill.value} index={index} isInView={isInView} />
      </div>
    </motion.div>
  );
}

function Skills() {
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, amount: 0.15 });

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
          className="mt-12 grid grid-cols-3 gap-4 md:hidden"
        >
          {SKILLS.map((skill) => (
            <MobileSkillCard key={skill.name} skill={skill} />
          ))}
        </motion.div>

        <motion.div
          variants={containerVariants}
          className="mt-14 hidden gap-x-6 gap-y-0 md:grid sm:grid-cols-2 lg:grid-cols-3">
          {COLUMNS.map((column, colIndex) => {
            const baseIndex = colIndex * 4;
            return (
              <motion.div key={colIndex} variants={fadeUp} className="min-w-0">
                <div role="list" className="flex flex-col gap-1.5">
                  {column.skills.map((skill, i) => (
                    <SkillItem
                      key={skill.name}
                      skill={skill}
                      index={baseIndex + i}
                      isInView={isInView}
                    />
                  ))}
                </div>
              </motion.div>
            );
          })}
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
