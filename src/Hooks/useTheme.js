import { useContext, useDebugValue } from "react";
import { ThemeContext } from "../Contexts/ThemeContext";

function useTheme() {
  const context = useContext(ThemeContext);

  if (!context) {
    throw new Error(
      "useTheme must be used within a <ThemeProvider>. " +
      "Wrap your component tree with <ThemeProvider> in main.jsx.",
    );
  }

  useDebugValue(context.theme === "system"
    ? `system (${context.resolvedTheme})`
    : context.theme,
  );

  return context;
}

export default useTheme;
