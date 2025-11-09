"use client"

import React, { useCallback } from "react"

const ThemeToggle = React.memo(({ theme, onToggle }) => {
  const handleToggle = useCallback(() => {
    onToggle()
  }, [onToggle])

  return (
    <button
      onClick={handleToggle}
      className={`p-2.5 rounded-lg transition-all duration-300 shadow-md hover:shadow-lg active:scale-95 flex items-center justify-center ${
        theme === "light"
          ? "bg-blue-100 text-blue-600 hover:bg-blue-200"
          : "bg-gray-800 text-yellow-400 hover:bg-gray-700"
      }`}
      aria-label={`Switch to ${theme === "light" ? "dark" : "light"} mode`}
      title={`Current: ${theme} mode`}
    >
      <span className="text-lg">{theme === "light" ? "🌙" : "☀️"}</span>
    </button>
  )
})

ThemeToggle.displayName = "ThemeToggle"
export default ThemeToggle
