import { useState, useCallback, useRef, useEffect } from "react";

const API_URL = import.meta.env.VITE_API_URL || "";
const SESSION_KEY = "zektech-chat-session";
const MESSAGES_KEY = "zektech-chat-messages";

function generateSessionId() {
  return `zs_${Date.now()}_${Math.random().toString(36).slice(2, 9)}`;
}

function getSessionId() {
  let id = sessionStorage.getItem(SESSION_KEY);
  if (!id) {
    id = generateSessionId();
    sessionStorage.setItem(SESSION_KEY, id);
  }
  return id;
}

function loadMessages() {
  try {
    const stored = sessionStorage.getItem(MESSAGES_KEY);
    if (stored) {
      const parsed = JSON.parse(stored);
      if (Array.isArray(parsed) && parsed.length > 0) {
        if (parsed[0]?.role === "assistant") {
          parsed[0] = GREETING_MESSAGE;
        }
        return parsed;
      }
    }
  } catch {
    // Malformed or unreadable stored data; fall back to the default greeting.
  }
  return [GREETING_MESSAGE];
}

function saveMessages(msgs) {
  try {
    const toSave = msgs.filter((m) => !m.isStreaming);
    sessionStorage.setItem(MESSAGES_KEY, JSON.stringify(toSave));
  } catch {
    // Storage may be unavailable (e.g. private browsing); persistence is best effort.
  }
}

const GREETING_MESSAGE = {
  id: "greeting",
  role: "assistant",
  content: "Hi there! I'm Zek Ai. What would you like to know about my skills, projects, or services?",
  timestamp: Date.now(),
};

const SUGGESTED_QUESTIONS = [
  "What skills do you have?",
  "Tell me about your projects",
  "What services do you offer?",
  "How can I contact you?",
  "Are you available for freelance?",
];

const useChat = () => {
  const [messages, setMessages] = useState(loadMessages);
  const [isStreaming, setIsStreaming] = useState(false);
  const [error, setError] = useState(null);
  const [hasUnread, setHasUnread] = useState(false);
  const abortRef = useRef(null);

  useEffect(() => {
    fetch(`${API_URL}/api/health`).catch(() => {
      /* Backend health check is informational only; failures are ignored. */
    });
  }, []);

  useEffect(() => {
    if (!isStreaming && messages.length > 0) saveMessages(messages);
  }, [messages, isStreaming]);

  const markAsRead = useCallback(() => {
    setHasUnread(false);
  }, []);

  const sendMessage = useCallback(async (content) => {
    if (!content.trim() || isStreaming) return;
    setError(null);
    setHasUnread(false);

    const userMessage = {
      id: `user_${Date.now()}`,
      role: "user",
      content: content.trim(),
      timestamp: Date.now(),
    };

    const assistantMessage = {
      id: `assistant_${Date.now()}`,
      role: "assistant",
      content: "",
      timestamp: Date.now(),
      isStreaming: true,
    };

    setMessages((prev) => [...prev, userMessage, assistantMessage]);
    setIsStreaming(true);

    const fetchChat = async (retryCount = 0) => {
      const controller = new AbortController();
      abortRef.current = controller;

      const response = await fetch(`${API_URL}/api/chat`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          message: content.trim(),
          sessionId: getSessionId(),
        }),
        signal: controller.signal,
      });

      if (response.status === 502 && retryCount === 0) {
        await new Promise((r) => setTimeout(r, 2000));
        return fetchChat(1);
      }

      return response;
    };

    try {
      const response = await fetchChat();

      if (response.status === 502) {
        throw new Error("Backend server is not running. Start it with: cd server && npm run dev");
      }

      if (response.status === 429) {
        throw new Error("rate_limited");
      }

      if (!response.ok) {
        let errorMsg = "Something went wrong. Please try again.";
        try {
          const errData = await response.json();
          if (errData.error) errorMsg = errData.error;
        } catch {
          // keep default
        }
        throw new Error(errorMsg);
      }

      const reader = response.body.getReader();
      const decoder = new TextDecoder();
      let fullContent = "";

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;

        const chunk = decoder.decode(value, { stream: true });
        const lines = chunk.split("\n");

        for (const line of lines) {
          if (line.startsWith("data: ")) {
            try {
              const data = JSON.parse(line.slice(6));
              if (data.done) break;
              if (data.content) {
                fullContent += data.content;
                setMessages((prev) =>
                  prev.map((msg) =>
                    msg.id === assistantMessage.id
                      ? { ...msg, content: fullContent }
                      : msg
                  )
                );
              }
            } catch {
              // skip malformed chunks
            }
          }
        }
      }

      setMessages((prev) =>
        prev.map((msg) =>
          msg.id === assistantMessage.id
            ? { ...msg, content: fullContent || "I couldn't generate a response. Please try again.", isStreaming: false }
            : msg
        )
      );
      setHasUnread(true);
    } catch (err) {
      if (err.name === "AbortError") return;

      let errorMsg = "Something went wrong. Please try again.";
      if (err.message.includes("Server is not running")) {
        errorMsg = "Backend server is not running. Please start it with: cd server && npm run dev";
      } else if (err.message.includes("rate_limited") || err.message.includes("busy") || err.message.includes("Too many")) {
        errorMsg = "I'm getting too many requests right now. Please try again in a few seconds.";
      } else if (err.message.includes("Failed to fetch") || err.name === "TypeError") {
        errorMsg = "Cannot connect to server. Make sure the backend is running on port 3001.";
      }

      setError(errorMsg);
      setMessages((prev) =>
        prev.map((msg) =>
          msg.id === assistantMessage.id
            ? { ...msg, content: errorMsg, isStreaming: false, isError: true }
            : msg
        )
      );
    } finally {
      setIsStreaming(false);
      abortRef.current = null;
    }
  }, [isStreaming]);

  const clearChat = useCallback(() => {
    setMessages([GREETING_MESSAGE]);
    setError(null);
    setHasUnread(false);
    sessionStorage.removeItem(MESSAGES_KEY);
  }, []);

  const stopStreaming = useCallback(() => {
    if (abortRef.current) {
      abortRef.current.abort();
      setIsStreaming(false);
    }
  }, []);

  return {
    messages,
    isStreaming,
    error,
    hasUnread,
    sendMessage,
    clearChat,
    stopStreaming,
    markAsRead,
    suggestedQuestions: SUGGESTED_QUESTIONS,
  };
};

export default useChat;
