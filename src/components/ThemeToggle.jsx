"use client"

import React, { useCallback } from "react"

const ThemeToggle = React.memo(({ theme, onToggle }) => {
  const handleToggle = useCallback(() => {
    onToggle()
  }, [onToggle])

  return (
    <button
      onClick={handleToggle}
      className={`p-2 sm:p-2.5 rounded-lg transition-all duration-300 shadow-sm hover:shadow-md active:scale-95 flex-shrink-0 ${
        theme === "light"
          ? "bg-amber-100 dark:bg-slate-700 text-amber-600 hover:bg-amber-200"
          : "bg-slate-700 text-blue-300 hover:bg-slate-600"
      }`}
      aria-label={`Switch to ${theme === "light" ? "dark" : "light"} mode`}
      title={`Current: ${theme} mode`}
    >
      <span className="text-lg sm:text-xl">{theme === "light" ? "🌙" : "☀️"}</span>
    </button>
  )
})

ThemeToggle.displayName = "ThemeToggle"
export default ThemeToggle
