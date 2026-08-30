import { useRef, useEffect } from "react";
import { motion } from "framer-motion";
import { FiX, FiTrash2 } from "react-icons/fi";
import useChat from "../../Hooks/useChat";
import ChatInput from "./ChatInput";
import ChatMessage from "./ChatMessage";
import TalkingBotIcon from "./TalkingBotIcon";

function AIChatPanel({ onClose }) {
  const {
    messages,
    isStreaming,
    error,
    sendMessage,
    clearChat,
    stopStreaming,
    suggestedQuestions,
  } = useChat();
  const messagesContainerRef = useRef(null);

  useEffect(() => {
    const container = messagesContainerRef.current;
    if (container) {
      container.scrollTop = container.scrollHeight;
    }
  }, [messages]);

  const showSuggestions = messages.length <= 1;

  return (
    <div className="relative flex h-full max-h-120 flex-col overflow-hidden rounded-2xl border border-border/60 bg-surface/50 backdrop-blur-xl">
      <div className="flex items-center justify-between border-b border-border/40 px-4 py-3 sm:px-5 sm:py-3.5">
        <div className="flex items-center gap-2.5">
          <TalkingBotIcon size={32} />
          <div>
            <h3 className="text-sm font-extrabold text-foreground">ZekAi</h3>
            <p className="text-[10px] font-medium text-muted flex items-center gap-1.5"><span className="h-1.5 w-1.5 rounded-full bg-accent-hover" /> Online</p>
          </div>
        </div>
        <div className="flex items-center gap-1">
          <button
            onClick={clearChat}
            className="grid h-8 w-8 place-items-center rounded-lg text-muted transition-colors hover:bg-accent/10 hover:text-accent cursor-pointer"
            aria-label="Clear chat"
          >
            <FiTrash2 className="text-sm" />
          </button>
          {onClose && (
            <button
              onClick={onClose}
              className="grid h-8 w-8 place-items-center rounded-lg text-muted transition-colors hover:bg-accent/10 hover:text-accent cursor-pointer"
              aria-label="Close chat"
            >
              <FiX className="text-sm" />
            </button>
          )}
        </div>
      </div>

      <div ref={messagesContainerRef} className="flex-1 overflow-y-auto px-4 py-4 space-y-4 scrollbar-none">
        {messages.map((msg) => (
          <ChatMessage key={msg.id} message={msg} />
        ))}

        {showSuggestions && !isStreaming && (
          <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="flex flex-wrap gap-1.5 pt-2"
          >
            {suggestedQuestions.map((q) => (
              <button
                key={q}
                onClick={() => sendMessage(q)}
                className="rounded-full border border-border/60 bg-background/50 px-3 py-1.5 text-[11px] font-medium text-secondary transition-all hover:border-accent/40 hover:bg-accent/5 hover:text-accent cursor-pointer"
              >
                {q}
              </button>
            ))}
          </motion.div>
        )}

        {error && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="rounded-lg border border-amber-400/30 bg-amber-400/5 px-3 py-2 text-xs text-amber-600 dark:text-amber-400"
          >
            {error}
          </motion.div>
        )}
      </div>

      <ChatInput
        onSend={sendMessage}
        isStreaming={isStreaming}
        onStop={stopStreaming}
        disabled={false}
      />
    </div>
  );
}

function AIChat({ onClose }) {
  return <AIChatPanel onClose={onClose} />;
}

export default AIChat;
