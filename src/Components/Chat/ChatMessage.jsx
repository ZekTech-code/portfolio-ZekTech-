import { useState, memo } from "react";
import { motion } from "framer-motion";
import { FiCheck, FiCopy, FiUser } from "react-icons/fi";
import TalkingBotIcon from "./TalkingBotIcon";

function parseMarkdown(text) {
  if (!text) return "";
  let html = text;
  html = html.replace(/```(\w+)?\n([\s\S]*?)```/g, '<pre class="rounded-lg bg-black/10 dark:bg-white/5 p-3 my-2 text-xs overflow-x-auto"><code>$2</code></pre>');
  html = html.replace(/`([^`]+)`/g, '<code class="rounded bg-black/10 dark:bg-white/5 px-1.5 py-0.5 text-xs">$1</code>');
  html = html.replace(/\*\*(.+?)\*\*/g, "<strong>$1</strong>");
  html = html.replace(/\*(.+?)\*/g, "<em>$1</em>");
  html = html.replace(/\[(.+?)\]\((.+?)\)/g, '<a href="$2" target="_blank" rel="noopener noreferrer" class="text-accent underline underline-offset-2 hover:text-accent-hover transition-colors">$1</a>');
  html = html.replace(/^[-*] (.+)$/gm, '<li class="ml-4 list-disc text-sm">$1</li>');
  html = html.replace(/^(\d+)\. (.+)$/gm, '<li class="ml-4 list-decimal text-sm">$2</li>');
  html = html.replace(/\n{2,}/g, "</p><p class='text-sm leading-relaxed mt-2'>");
  html = html.replace(/\n/g, "<br/>");
  html = `<p class="text-sm leading-relaxed">${html}</p>`;
  return html;
}

function TypingIndicator() {
  return (
    <div className="flex items-center gap-1 px-1 py-2">
      {[0, 1, 2].map((i) => (
        <motion.span
          key={i}
          className="h-2 w-2 rounded-full bg-accent"
          animate={{ y: [0, -6, 0], opacity: [0.4, 1, 0.4] }}
          transition={{ duration: 0.8, repeat: Infinity, delay: i * 0.15, ease: "easeInOut" }}
        />
      ))}
    </div>
  );
}

const ChatMessage = memo(function ChatMessage({ message }) {
  const [copied, setCopied] = useState(false);
  const isUser = message.role === "user";

  const handleCopy = async () => {
    await navigator.clipboard.writeText(message.content);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 12, scale: 0.97 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
      className={`group flex gap-2.5 ${isUser ? "flex-row-reverse" : "flex-row"}`}
    >
      <div
        className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-full ${
          isUser
            ? "bg-accent/10 text-accent"
            : ""
        }`}
      >
        {isUser ? (
          <FiUser className="text-sm" />
        ) : (
          <TalkingBotIcon size={32} />
        )}
      </div>

      <div className={`flex max-w-[80%] flex-col ${isUser ? "items-end" : "items-start"}`}>
        <div
          className={`relative rounded-2xl px-4 py-2.5 ${
            isUser
              ? "bg-accent text-white dark:text-black rounded-br-md"
              : "bg-surface border border-border/60 text-foreground rounded-bl-md"
          }`}
        >
          {message.isStreaming && !message.content ? (
            <TypingIndicator />
          ) : message.isStreaming ? (
            <div>
              <span
                className="max-w-none wrap-break-word"
                dangerouslySetInnerHTML={{ __html: parseMarkdown(message.content) }}
              />
              <span className="ml-0.5 inline-block h-4 w-0.5 animate-pulse bg-accent align-middle" />
            </div>
          ) : (
            <span
              className="max-w-none wrap-break-word"
              dangerouslySetInnerHTML={{ __html: parseMarkdown(message.content) }}
            />
          )}
        </div>

        {!isUser && !message.isStreaming && message.content && (
          <button
            onClick={handleCopy}
            className="mt-1 flex items-center gap-1 rounded p-0.5 text-[10px] text-muted opacity-0 transition-opacity hover:bg-surface hover:text-accent group-hover:opacity-100"
            aria-label="Copy response"
          >
            {copied ? <FiCheck className="text-[10px] text-accent-hover" /> : <FiCopy className="text-[10px]" />}
            {copied ? "Copied" : "Copy"}
          </button>
        )}
      </div>
    </motion.div>
  );
});

export default ChatMessage;
