"use client"

import React from "react"
import ThemeToggle from "./ThemeToggle"

const Header = React.memo(({ theme, toggleTheme }) => {
  return (
    <header className="sticky top-0 z-50 bg-white dark:bg-slate-800 border-b border-gray-200 dark:border-slate-700 shadow-sm transition-colors duration-300">
      <div className="max-w-4xl mx-auto px-3 sm:px-4 py-2.5 sm:py-3 flex items-center justify-between gap-2 sm:gap-3">
        <div className="flex items-center gap-1.5 sm:gap-3 min-w-0">
          <span className="text-lg sm:text-2xl flex-shrink-0">✓</span>
          <h1 className="text-base sm:text-2xl font-bold text-gray-900 dark:text-white truncate">Task Manager</h1>
        </div>
        <ThemeToggle theme={theme} onToggle={toggleTheme} />
      </div>
    </header>
  )
})

Header.displayName = "Header"
export default Header
