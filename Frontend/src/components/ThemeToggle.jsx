import React, { useEffect, useState } from "react";

const THEME_KEY = "ems-theme";

const getInitialTheme = () => {
  if (typeof window === "undefined") {
    return "light";
  }

  const savedTheme = window.localStorage.getItem(THEME_KEY);

  if (savedTheme === "light" || savedTheme === "dark") {
    return savedTheme;
  }

  return window.matchMedia("(prefers-color-scheme: dark)").matches
    ? "dark"
    : "light";
};

const applyTheme = (theme) => {
  document.documentElement.dataset.theme = theme;
  document.documentElement.style.colorScheme = theme;
};

const ThemeToggle = ({ variant = "floating" }) => {
  const [theme, setTheme] = useState(getInitialTheme);

  useEffect(() => {
    applyTheme(theme);
    window.localStorage.setItem(THEME_KEY, theme);
  }, [theme]);

  const nextTheme = theme === "dark" ? "light" : "dark";

  return (
    <button
      type="button"
      className={`theme-toggle ${variant === "inline" ? "theme-toggle-inline" : "theme-toggle-floating"}`}
      aria-label={`Switch to ${nextTheme} mode`}
      aria-pressed={theme === "dark"}
      onClick={() => setTheme(nextTheme)}
    >
      <span
        className={`theme-toggle-symbol ${theme === "light" ? "theme-toggle-symbol-active" : ""}`}
        aria-hidden="true"
      >
        {"\u2600"}
      </span>
      <span className="theme-toggle-divider" aria-hidden="true" />
      <span
        className={`theme-toggle-symbol ${theme === "dark" ? "theme-toggle-symbol-active" : ""}`}
        aria-hidden="true"
      >
        {"\u263E"}
      </span>
    </button>
  );
};

export default ThemeToggle;
