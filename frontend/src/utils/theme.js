import { useCallback, useEffect, useState } from "react";

const STORAGE_KEY = "theme";

const getStoredTheme = () => {
  try {
    const t = localStorage.getItem(STORAGE_KEY);
    return t === "dark" || t === "light" ? t : null;
  } catch {
    return null;
  }
};

const getSystemTheme = () =>
  typeof window !== "undefined" &&
  window.matchMedia &&
  window.matchMedia("(prefers-color-scheme: dark)").matches
    ? "dark"
    : "light";

export const getTheme = () => getStoredTheme() || getSystemTheme();

export const applyTheme = (theme) => {
  document.documentElement.classList.toggle("dark", theme === "dark");
};

export const setTheme = (theme) => {
  try {
    localStorage.setItem(STORAGE_KEY, theme);
  } catch {
    /* storage can be blocked; theme still applies for this session */
  }
  applyTheme(theme);
  window.dispatchEvent(new Event("themechange"));
};

export const useTheme = () => {
  const [theme, setThemeState] = useState(getTheme);

  useEffect(() => {
    const sync = () => setThemeState(getTheme());
    window.addEventListener("themechange", sync);
    window.addEventListener("storage", sync);
    return () => {
      window.removeEventListener("themechange", sync);
      window.removeEventListener("storage", sync);
    };
  }, []);

  const toggle = useCallback(() => {
    setTheme(getTheme() === "dark" ? "light" : "dark");
  }, []);

  return { theme, isDark: theme === "dark", toggle };
};
