
import React from "react";

const ThemeToggle = ({ theme, toggleTheme }) => {
  const isDark = theme === "dark";

  return (
    <button
      onClick={toggleTheme}
      className="flex items-center gap-2 px-3 py-1 rounded border border-gray-300 dark:border-gray-700 text-sm hover:bg-gray-100 dark:hover:bg-gray-800"
    >
      <span>{isDark ? "Dark" : "Light"} Mode</span>
      <span className="text-lg">{isDark ? "🌙" : "☀️"}</span>
    </button>
  );
};

export default ThemeToggle;
