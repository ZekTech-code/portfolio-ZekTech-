import { useState, useRef, useEffect } from "react";
import { motion } from "framer-motion";
import { FiMail, FiPhone, FiMessageSquare } from "react-icons/fi";
import { FaLinkedin, FaGithub, FaWhatsapp } from "react-icons/fa6";
import AIChat from "../Chat/AIChat";
import TalkingBotIcon from "../Chat/TalkingBotIcon";
import ContactForm from "../Chat/ContactForm";

const CONTACT_INFO = [
  { icon: FiMail, label: "Email", href: `mailto:${import.meta.env.VITE_CONTACT_EMAIL}` },
  { icon: FiPhone, label: "Phone", href: `tel:${import.meta.env.VITE_CONTACT_PHONE}` },
  { icon: FaWhatsapp, label: "WhatsApp", href: import.meta.env.VITE_CONTACT_WHATSAPP_URL },
  { icon: FaLinkedin, label: "LinkedIn", href: import.meta.env.VITE_LINKEDIN_URL },
  { icon: FaGithub, label: "GitHub", href: import.meta.env.VITE_GITHUB_URL },
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
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] } },
};

function ContactBackground() {
  return (
    <div aria-hidden="true" className="pointer-events-none absolute inset-0 -z-10 overflow-hidden" />
  );
}

function ContactIcon({ item }) {
  const Icon = item.icon;
  const isExternal = !item.href.startsWith("mailto:") && !item.href.startsWith("tel:");
  return (
    <motion.a
      href={item.href}
      target={isExternal ? "_blank" : undefined}
      rel={isExternal ? "noopener noreferrer" : undefined}
      whileHover={{ scale: 1.12, rotate: -5, y: -2 }}
      whileTap={{ scale: 0.95 }}
      transition={{ type: "spring", stiffness: 400, damping: 17 }}
      className="group relative grid h-11 w-11 place-items-center rounded-full border border-border/60 bg-surface/50 backdrop-blur-xl transition-colors duration-300 hover:border-accent/40 hover:bg-accent/5 hover:text-accent hover:shadow-[0_0_20px_var(--portfolio-accent-glow)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-background text-muted"
      aria-label={item.label}
    >
      <Icon className="text-sm" aria-hidden="true" />
      <span className="pointer-events-none absolute -top-10 left-1/2 -translate-x-1/2 translate-y-1.5 whitespace-nowrap rounded-lg border border-border/60 bg-foreground px-2.5 py-1.5 text-xs font-semibold text-background opacity-0 shadow-lg transition-all duration-200 group-hover:translate-y-0 group-hover:opacity-100 group-focus-visible:translate-y-0 group-focus-visible:opacity-100">
        {item.label}
        <span className="absolute left-1/2 top-full -translate-x-1/2 -translate-y-1.5 h-2 w-2 rotate-45 border-b border-r border-border/60 bg-foreground" />
      </span>
    </motion.a>
  );
}

function Contact() {
  const [showChat, setShowChat] = useState(false);
  const chatSectionRef = useRef(null);

  useEffect(() => {
    const handler = () => {
      setShowChat(true);
      setTimeout(() => {
        chatSectionRef.current?.scrollIntoView({
          behavior: "smooth",
          block: "start",
        });
      }, 50);
    };
    window.addEventListener("open-ai-chat", handler);
    return () => window.removeEventListener("open-ai-chat", handler);
  }, []);

  return (
    <section
      id="contact"
      aria-labelledby="contact-heading"
      className="relative isolate overflow-hidden bg-background px-6 pb-24 pt-8 text-foreground lg:px-8"
    >
      <ContactBackground />

      <div className="mx-auto max-w-275">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
          className="mx-auto max-w-3xl text-center"
        >
          <motion.span
            variants={fadeUp}
            className="mb-4 inline-flex items-center gap-2 rounded-full border border-accent/25 bg-(--portfolio-accent-soft) px-4 py-1.5 text-xs font-bold uppercase tracking-[0.2em] text-accent backdrop-blur-xl"
          >
            <span className="h-1.5 w-1.5 rounded-full bg-accent" aria-hidden="true" />
            CONTACT
          </motion.span>

          <motion.h2
            variants={fadeUp}
            id="contact-heading"
            className="mt-5 text-4xl font-extrabold leading-none tracking-tight sm:text-6xl lg:text-7xl"
          >
            Let&apos;s Work <span className="text-accent">Together</span>
          </motion.h2>

          <motion.p variants={fadeUp} className="mt-6 text-base leading-8 text-muted sm:text-lg">
            Whether you have a project in mind, need a modern website, or simply want to discuss an
            idea, I&apos;d love to hear from you. Let&apos;s create something exceptional together.
          </motion.p>
        </motion.div>

        <div className="mt-14">
          <motion.div
            variants={cardVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            className="mx-auto max-w-6xl rounded-3xl border border-border/60 bg-surface/50 p-5 shadow-[0_8px_30px_var(--portfolio-shadow-soft)] backdrop-blur-xl sm:p-8 lg:p-12"
            role="region"
            aria-label="Contact AI assistant, form, and channels"
          >
            {showChat ? (
              <div className="grid gap-6 lg:grid-cols-2 lg:gap-10">
                <div ref={chatSectionRef} className="h-120">
                  <AIChat onClose={() => setShowChat(false)} />
                </div>

                <div className="h-120">
                  <ContactForm />
                </div>
              </div>
            ) : (
              <div ref={chatSectionRef} className="lg:grid lg:grid-cols-2 lg:gap-10">
                <motion.button
                  type="button"
                  onClick={() => setShowChat(true)}
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                  className="group relative flex h-full min-h-80 w-full cursor-pointer flex-col overflow-hidden rounded-2xl border border-border/60 bg-surface/50 p-8 text-foreground backdrop-blur-xl transition-colors duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-background sm:p-10"
                  aria-label="Open AI chat"
                >
                  <div
                    aria-hidden="true"
                    className="pointer-events-none absolute inset-0"
                  />

                  <svg
                    aria-hidden="true"
                    className="pointer-events-none absolute inset-x-0 top-0 h-full w-full text-accent"
                    viewBox="0 0 400 260"
                    preserveAspectRatio="none"
                    style={{ opacity: 0.14 }}
                  >
                    <path
                      d="M0 180 C 80 150, 150 210, 240 170 S 340 90, 400 120 L 400 260 L 0 260 Z"
                      fill="currentColor"
                    />
                    <path
                      d="M0 200 C 100 170, 190 230, 280 190 S 360 130, 400 160 L 400 260 L 0 260 Z"
                      fill="currentColor"
                      opacity="0.5"
                    />
                  </svg>

                  <div
                    aria-hidden="true"
                    className="pointer-events-none absolute right-6 top-6 h-16 w-16 rounded-full border border-accent/20"
                    style={{ boxShadow: "inset 0 0 0 10px color-mix(in srgb, var(--portfolio-accent) 6%, transparent)" }}
                  />
                  <div
                    aria-hidden="true"
                    className="pointer-events-none absolute left-8 bottom-10 h-40 w-40 rounded-full border border-dashed border-accent/15"
                  />

                  <div className="relative z-10 flex h-full flex-col items-center justify-center gap-5">
                    <div className="grid h-40 w-40 shrink-0 place-items-center">
                      <div className="absolute h-28 w-28 rounded-full border border-accent/20" aria-hidden="true" />
                      <div className="absolute h-36 w-36 rounded-full border border-accent/15" aria-hidden="true" />
                      <div className="absolute h-20 w-20 rounded-full border border-accent/20" aria-hidden="true" />

                      <div className="relative z-10">
                        <TalkingBotIcon size={56} />
                      </div>
                    </div>

                    <div className="flex flex-col items-center gap-1">
                      <span className="flex items-center gap-1.5 text-lg font-extrabold">
                        Hello
                        <span className="h-2 w-2 rounded-full bg-accent-hover animate-pulse" aria-hidden="true" />
                      </span>
                      <span className="inline-flex items-center gap-1.5 text-xs font-semibold text-accent">
                        <FiMessageSquare className="text-sm" aria-hidden="true" />
                        Chat
                      </span>
                    </div>
                  </div>
                </motion.button>

                <div className="mt-6 h-120 lg:mt-0">
                  <ContactForm />
                </div>
              </div>
            )}

            <div
              className="mt-6 flex flex-wrap items-center justify-center gap-3 border-t border-border/40 pt-6"
              role="group"
              aria-label="Contact channels"
            >
              {CONTACT_INFO.map((item) => (
                <ContactIcon key={item.label} item={item} />
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

export default Contact;
