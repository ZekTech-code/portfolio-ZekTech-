import { motion } from "framer-motion";
import { FiExternalLink } from "react-icons/fi";
import { FaGithub } from "react-icons/fa6";

const PROJECTS = [
  {
    title: "Restaurant Website",
    description:
      "A modern, responsive restaurant site showcasing the menu and brand.",
    image: "/images/Restaurant-food.png",
    technologies: ["React.js", "Node.js", "Tailwind CSS", "MongoDB"],
    liveUrl: "https://aurum-ember.vercel.app",
    githubUrl: "https://github.com/ZekTech-code/Aurum-Ember.git",
  },
  {
    title: "Currency Converter",
    description:
      "A fast, simple currency conversion tool with a clean UI for quick and accurate value conversions.",
    image: "/images/Currency-converter.png",
    technologies: ["React", "JavaScript", "Firebase", "Tailwind CSS"],
    liveUrl: "https://convertxapp.web.app",
    githubUrl: "https://github.com/ZekTech-code/ConvertX.git",
  },
  {
    title: "Expenes Tracker",
    description:
      "A personal finance app to record, organize, and monitor daily expenses with a clear spending overview.",
    image: "/images/Expenes-tracker.png",
    technologies: ["React", "JavaScript", "Firebase", "Tailwind CSS"],
    liveUrl: "https://xpns-tracker-eta.vercel.app/",
    githubUrl: "https://github.com/ZekTech-code/XPNS-tracker.git",
  },
  {
    title: "Note App",
    description:
      "A simple, accessible note-taking app for creating, editing, and organizing personal notes.",
    image: "/images/Note-flow.png",
    technologies: ["React", "JavaScript", "Supabase", "Tailwind CSS"],
    liveUrl: "https://noteflow-jade.vercel.app/",
    githubUrl: "https://github.com/ZekTech-code/Noteflow.git",
  },
  {
    title: "Tier Digital",
    description:
      "A professional corporate site presenting an advertising company's services and brand.",
    image: "/images/Tier.png",
    technologies: ["React", "JavaScript", "Python", "Tailwind CSS"],
    liveUrl: "https://tier-digital.vercel.app/",
    githubUrl: "https://github.com/ZekTech-code/Tier-Digital.git",
  },
  {
    title: "Qoutify",
    description:
      "A random quote generator with an elegant interface for discovering inspirational quotes instantly.",
    image: "/images/Qoute.png",
    technologies: ["HTML", "CSS", "JavaScript", "API"],
    liveUrl: "https://quotify-green.vercel.app/",
    githubUrl: "https://github.com/ZekTech-code/Quotify.git",
  },
  {
    title: "Password Generator",
    description:
      "A tool for creating strong, customizable passwords with controls for length and character types.",
    image: "/images/PasswordApp.png",
    technologies: ["HTML", "CSS", "JavaScript"],
    liveUrl: "https://password-generator-omega-sepia.vercel.app/",
    githubUrl: "https://github.com/ZekTech-code/Password-Generator.git",
  },
  {
    title: "Quiz App",
    description:
      "An interactive quiz game with instant feedback and a responsive, easy-to-use interface.",
    image: "/images/QuizApp.png",
    technologies: ["HTML", "CSS", "JavaScript"],
    liveUrl: "https://quiz-app-sandy-sigma.vercel.app/",
    githubUrl: "https://github.com/ZekTech-code/Quiz-App.git",
  },
  {
    title: "Calculator",
    description:
      "A responsive calculator offering a clean layout for fast, everyday mathematical calculations.",
    image: "/images/Calculator.png",
    technologies: ["HTML", "CSS", "JavaScript"],
    liveUrl: "https://calculator-murex-gamma-42.vercel.app",
    githubUrl: "https://github.com/ZekTech-code/Calculator.git",
  },
  {
    title: "Music App",
    description:
      "A modern music player for discovering and listening to music with intuitive, responsive navigation.",
    image: "/images/MusicApp.png",
    technologies: ["HTML", "CSS", "JavaScript"],
    liveUrl: "https://zekvibes.vercel.app",
    githubUrl: "https://github.com/ZekTech-code/Zekvibes.git",
  },
];

const PLACEHOLDER_BG = [
  "from-accent/20 via-accent/10 to-transparent",
  "from-accent/15 via-accent/8 to-transparent",
  "from-accent/25 via-accent/12 to-transparent",
  "from-accent/18 via-accent/9 to-transparent",
];

const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.06 } },
};

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.45, ease: [0.22, 1, 0.36, 1] } },
};

const badgeVariants = {
  hidden: { opacity: 0, scale: 0.85 },
  visible: (i) => ({
    opacity: 1,
    scale: 1,
    transition: { delay: 0.25 + i * 0.04, duration: 0.25, ease: [0.22, 1, 0.36, 1] },
  }),
};

function ProjectsBackground() {
  return (
    <div aria-hidden="true" className="pointer-events-none absolute inset-0 -z-10 overflow-hidden">
      <motion.div
        className="absolute -left-44 top-24 h-80 w-80 rounded-full bg-accent/8 blur-3xl"
        animate={{ x: [0, 24, 0], opacity: [0.2, 0.5, 0.2] }}
        transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="absolute -right-36 bottom-32 h-96 w-96 rounded-full bg-accent-hover/6 blur-3xl"
        animate={{ x: [0, -20, 0], y: [0, 18, 0], opacity: [0.15, 0.4, 0.15] }}
        transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="absolute left-1/3 top-1/4 h-64 w-64 rounded-full bg-accent/4 blur-[100px]"
        animate={{ scale: [1, 1.1, 1], opacity: [0.08, 0.2, 0.08] }}
        transition={{ duration: 14, repeat: Infinity, ease: "easeInOut" }}
      />
    </div>
  );
}

function ProjectImage({ project, placeholderBg }) {
  if (project.image) {
    return (
      <div className="p-3 pb-0">
        <div className="relative flex h-36 w-full items-center justify-center overflow-hidden rounded-xl bg-linear-to-br from-surface/80 to-background/40 transition-colors duration-300">
          <img
            src={project.image}
            alt={project.title}
            width="640"
            height="360"
            loading="lazy"
            decoding="async"
            className="max-h-full max-w-full rounded-lg object-contain transition-transform duration-500 group-hover:scale-105"
          />
        </div>
      </div>
    );
  }

  return (
    <div className="p-3 pb-0">
      <div className={`flex h-36 items-center justify-center rounded-xl border border-border/50 bg-linear-to-br ${placeholderBg}`}>
        <span className="text-[10px] font-bold uppercase tracking-widest text-muted sm:text-xs">
          {project.title}
        </span>
      </div>
    </div>
  );
}

function ProjectCard({ project, index }) {
  const placeholderBg = PLACEHOLDER_BG[index % PLACEHOLDER_BG.length];

  return (
    <motion.article
      variants={fadeUp}
      transition={{ type: "spring", stiffness: 300, damping: 25 }}
      className="group flex h-full flex-col overflow-hidden rounded-2xl border border-border/60 bg-surface/50 shadow-(--portfolio-shadow-soft) backdrop-blur-xl transition-all duration-300 hover:-translate-y-1.5 hover:border-accent/30 hover:shadow-[0_12px_40px_var(--portfolio-accent-glow)]"
    >
      <div className="relative isolate overflow-hidden">
        <ProjectImage project={project} placeholderBg={placeholderBg} />
        <div className="pointer-events-none absolute inset-0 bg-linear-to-t from-background/20 via-transparent to-transparent opacity-0 transition-opacity duration-400 group-hover:opacity-100" />
      </div>

      <div className="flex flex-1 flex-col p-4">
        <h3 className="truncate text-[15px] font-extrabold tracking-tight text-foreground">
          {project.title}
        </h3>
        <p className="mt-1.5 text-xs leading-relaxed text-secondary">
          {project.description}
        </p>

        <div className="mt-3 flex flex-wrap gap-1.5">
          {project.technologies.map((tech, i) => (
            <motion.span
              key={tech}
              custom={i}
              variants={badgeVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="rounded-full border border-accent/15 bg-accent/8 px-2.5 py-1 text-[10px] font-bold leading-none text-accent"
            >
              {tech}
            </motion.span>
          ))}
        </div>

        <div className="mt-auto grid grid-cols-2 gap-2 border-t border-border/50 pt-3">
          {project.githubUrl ? (
            <a
              href={project.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`View source code of ${project.title}`}
              className="inline-flex items-center justify-center gap-1.5 rounded-lg border border-border/80 px-2.5 py-2 text-[11px] font-bold text-foreground transition-all duration-300 hover:-translate-y-0.5 hover:border-accent/40 hover:bg-accent/5 hover:text-accent hover:shadow-[0_4px_12px_var(--portfolio-accent-glow)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-background"
            >
              <FaGithub className="text-xs transition-transform duration-300 group-hover:rotate-6" aria-hidden="true" />
              Code
            </a>
          ) : (
            <span className="inline-flex cursor-not-allowed items-center justify-center gap-1.5 rounded-lg border border-border/50 px-2.5 py-2 text-[11px] font-bold text-muted/80">
              <FaGithub className="text-xs" aria-hidden="true" />
              Code
            </span>
          )}

          {project.liveUrl ? (
            <a
              href={project.liveUrl}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`View live demo of ${project.title}`}
              className="inline-flex items-center justify-center gap-1.5 rounded-lg bg-accent px-2.5 py-2 text-[11px] font-bold text-white dark:text-black transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[0_4px_12px_var(--portfolio-accent-glow)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-background"
            >
              <FiExternalLink className="text-xs transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" aria-hidden="true" />
              Demo
            </a>
          ) : (
            <span className="inline-flex cursor-not-allowed items-center justify-center gap-1.5 rounded-lg bg-accent/5 px-2.5 py-2 text-[11px] font-bold text-muted/80">
              <FiExternalLink className="text-xs" aria-hidden="true" />
              Demo
            </span>
          )}
        </div>
      </div>
    </motion.article>
  );
}

function Projects() {
  return (
    <section
      id="projects"
      aria-labelledby="projects-heading"
      className="relative isolate overflow-hidden bg-background px-6 pb-24 pt-8 text-foreground lg:px-8">
      <ProjectsBackground />

      <motion.div
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.06 }}
        className="mx-auto w-full max-w-360 lg:max-w-432">    
        <motion.div variants={fadeUp} className="mx-auto max-w-2xl text-center">
          <h2
            id="projects-heading"
            className="mt-5 text-4xl font-extrabold leading-none tracking-tight sm:text-6xl lg:text-7xl">
            <span className="text-accent">Projects</span>
          </h2>
          <p className="mt-6 text-base leading-8 text-muted sm:text-lg">
            A selection of projects that showcase my skills in building modern,
            responsive, accessible, and high-performance web applications.
          </p>
        </motion.div>

        <motion.div
          variants={containerVariants}
          className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-5">
          {PROJECTS.map((project, index) => (
            <div key={project.title} className="mx-auto h-full w-full max-w-85 sm:max-w-none">
              <ProjectCard project={project} index={index} />
            </div>
          ))}
        </motion.div>
      </motion.div>
    </section>
  );
}

export default Projects;
