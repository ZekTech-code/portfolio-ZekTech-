import { motion } from "framer-motion";
import TalkingBotIcon from "../Chat/TalkingBotIcon";

function FloatingBot() {
  const handleClick = () => {
    const contact = document.getElementById("contact");
    const toggleEvent = () => window.dispatchEvent(new Event("toggle-ai-chat"));
    if (contact) {
      contact.scrollIntoView({ behavior: "smooth" });
      setTimeout(toggleEvent, 600);
    } else {
      toggleEvent();
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.6, y: 16 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      transition={{ type: "spring", stiffness: 360, damping: 26, mass: 0.8, delay: 0.5 }}
      className="relative"
    >
      <div className="group relative">
        <TalkingBotIcon onClick={handleClick} size={48} />

        {/* Mobile: always visible - smaller */}
        <span className="pointer-events-none absolute -top-9 left-1/2 -translate-x-1/2 whitespace-nowrap rounded-lg border border-border/60 bg-foreground px-2 py-1 text-[10px] font-semibold text-background shadow-lg sm:hidden">
          Hello
          <span className="absolute left-1/2 top-full -translate-x-1/2 -translate-y-1 h-2 w-2 rotate-45 border-b border-r border-border/60 bg-foreground" />
        </span>

        {/* Desktop: always visible */}
        <span className="pointer-events-none absolute -top-10 left-1/2 -translate-x-1/2 -translate-y-1.5 whitespace-nowrap rounded-lg border border-border/60 bg-foreground px-2.5 py-1.5 text-xs font-semibold text-background shadow-lg hidden sm:block">
          Hello
          <span className="absolute left-1/2 top-full -translate-x-1/2 -translate-y-1 h-2 w-2 rotate-45 border-b border-r border-border/60 bg-foreground" />
        </span>
      </div>
    </motion.div>
  );
}

export default FloatingBot;
