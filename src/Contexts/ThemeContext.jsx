import { createContext, useState, useEffect, useCallback, useMemo, useRef } from "react";

const THEME_KEY = "theme";
const MODES = ["light", "dark", "system"];

function getInitialMode() {
  if (typeof window === "undefined") return "system";

  const stored = window.localStorage.getItem(THEME_KEY);
  if (stored && MODES.includes(stored)) return stored;

  return "system";
}

function getSystemTheme() {
  if (typeof window === "undefined") return "light";
  return window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
}

function applyTheme(mode, systemTheme) {
  const resolved = mode === "system" ? systemTheme : mode;
  const isDark = resolved === "dark";
  const root = document.documentElement;

  root.classList.toggle("dark", isDark);
  root.style.colorScheme = isDark ? "dark" : "light";
  window.localStorage.setItem(THEME_KEY, mode);
}

const ThemeContext = createContext(null);

function ThemeProvider({ children }) {
  const [mode, setMode] = useState(getInitialMode);
  const [systemTheme, setSystemTheme] = useState(getSystemTheme);
  const mediaQueryRef = useRef(null);

  const resolvedTheme = mode === "system" ? systemTheme : mode;
  const isDark = resolvedTheme === "dark";
  const isLight = resolvedTheme === "light";
  const isSystem = mode === "system";

  useEffect(() => {
    applyTheme(mode, systemTheme);
  }, [mode, systemTheme]);

  useEffect(() => {
    const mq = window.matchMedia("(prefers-color-scheme: dark)");
    mediaQueryRef.current = mq;

    const handler = (e) => {
      setSystemTheme(e.matches ? "dark" : "light");
    };

    mq.addEventListener("change", handler);
    return () => mq.removeEventListener("change", handler);
  }, []);

  const setTheme = useCallback((newMode) => {
    if (MODES.includes(newMode)) {
      setMode(newMode);
    }
  }, []);

  const toggleTheme = useCallback(() => {
    setMode((prev) => {
      if (prev === "system") {
        return resolvedTheme === "dark" ? "light" : "dark";
      }
      return prev === "dark" ? "light" : "dark";
    });
  }, [resolvedTheme]);

  const value = useMemo(
    () => ({
      theme: mode,
      resolvedTheme,
      setTheme,
      toggleTheme,
      isDark,
      isLight,
      isSystem,
    }),
    [mode, resolvedTheme, setTheme, toggleTheme, isDark, isLight, isSystem],
  );

  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>;
}

export { ThemeProvider, ThemeContext };
