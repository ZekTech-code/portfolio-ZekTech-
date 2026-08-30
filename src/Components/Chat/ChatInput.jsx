import { useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FiSend, FiSquare } from "react-icons/fi";

function ChatInput({ onSend, isStreaming, onStop, disabled }) {
  const textareaRef = useRef(null);

  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = "auto";
      textareaRef.current.style.height = `${Math.min(textareaRef.current.scrollHeight, 100)}px`;
    }
  }, []);

  const handleSubmit = (e) => {
    e?.preventDefault();
    const val = textareaRef.current?.value?.trim();
    if (!val || disabled) return;
    onSend(val);
    textareaRef.current.value = "";
    textareaRef.current.style.height = "auto";
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSubmit();
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex items-end gap-2 p-3 border-t border-border/40">
      <textarea
        ref={textareaRef}
        onKeyDown={handleKeyDown}
        placeholder="Ask about skills, projects, services..."
        disabled={disabled || isStreaming}
        rows={1}
        className="min-w-0 flex-1 resize-none overflow-hidden rounded-xl border border-border/60 bg-surface/50 px-3 py-2.5 text-sm text-foreground placeholder:text-muted/60 backdrop-blur-xl transition-all duration-200 focus:outline-none focus:border-accent/60 focus:shadow-[0_0_0_3px_var(--portfolio-accent-soft)] disabled:opacity-50 disabled:cursor-not-allowed sm:px-4"
        aria-label="Type your message"
      />

      <AnimatePresence mode="wait">
        {isStreaming ? (
          <motion.button
            key="stop"
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.8, opacity: 0 }}
            type="button"
            onClick={onStop}
            className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-red-500/10 text-red-500 transition-colors hover:bg-red-500/20"
            aria-label="Stop generating"
          >
            <FiSquare className="text-sm" />
          </motion.button>
        ) : (
          <motion.button
            key="send"
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.8, opacity: 0 }}
            type="submit"
            disabled={disabled}
            className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-accent text-white dark:text-black transition-all duration-200 hover:shadow-[0_4px_12px_var(--portfolio-accent-glow)] cursor-pointer disabled:opacity-30 disabled:cursor-not-allowed"
            aria-label="Send message"
          >
            <FiSend className="text-sm" />
          </motion.button>
        )}
      </AnimatePresence>
    </form>
  );
}

export default ChatInput;
