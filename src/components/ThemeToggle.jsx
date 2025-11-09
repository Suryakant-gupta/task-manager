"use client"

function ThemeToggle({ theme, onToggle }) {
  return (
    <button
      className="theme-toggle"
      onClick={onToggle}
      aria-label={`Switch to ${theme === "light" ? "dark" : "light"} mode`}
      title={`Current: ${theme} mode`}
    >
      <span className="theme-icon">{theme === "light" ? "🌙" : "☀️"}</span>
    </button>
  )
}

export default ThemeToggle
