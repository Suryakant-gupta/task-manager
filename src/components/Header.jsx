"use client"

import React from "react"
import ThemeToggle from "./ThemeToggle"

const Header = React.memo(({ theme, toggleTheme }) => {
  return (
    <header className="sticky top-0 z-50 w-full bg-gradient-to-r from-white to-blue-50 dark:from-gray-900 dark:to-gray-800 border-b border-gray-200 dark:border-gray-700 shadow-md transition-all duration-300">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-5 flex items-center justify-between gap-4">
        <div className="flex items-center gap-2 sm:gap-4 min-w-0">
          <span className="text-3xl sm:text-4xl flex-shrink-0">✓</span>
          <h1 className="text-lg sm:text-2xl lg:text-3xl font-bold text-gray-900 dark:text-white font-sans tracking-tight">
            Task Manager
          </h1>
        </div>
        <ThemeToggle theme={theme} onToggle={toggleTheme} />
      </div>
    </header>
  )
})

Header.displayName = "Header"
export default Header
