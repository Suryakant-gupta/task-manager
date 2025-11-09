"use client"

import React, { useCallback } from "react"
import { useTaskContext } from "../context/TaskContext"

const Footer = React.memo(() => {
  const { tasks, exportTasks } = useTaskContext()
  const completed = tasks.filter((t) => t.completed).length
  const pending = tasks.filter((t) => !t.completed).length

  const handleImport = useCallback((e) => {
    const file = e.target.files?.[0]
    if (file) {
      const reader = new FileReader()
      reader.onload = (event) => {
        try {
          const imported = JSON.parse(event.target.result)
          if (Array.isArray(imported)) {
            localStorage.setItem("tasks", JSON.stringify(imported))
            window.location.reload()
          }
        } catch (err) {
          console.error("Import failed", err)
        }
      }
      reader.readAsText(file)
    }
  }, [])

  return (
    <footer className="bg-white dark:bg-gray-800 border-t border-gray-200 dark:border-gray-700 transition-colors duration-300 mt-10 sm:mt-12">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-10">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-6 sm:gap-8">
          {/* Stats */}
          <div className="flex flex-wrap gap-8 text-sm">
            <div className="flex items-center gap-3">
              <span className="font-bold text-blue-600 dark:text-blue-400 text-2xl">{completed}</span>
              <span className="text-gray-600 dark:text-gray-400 font-semibold">Completed</span>
            </div>
            <div className="flex items-center gap-3">
              <span className="font-bold text-orange-600 dark:text-orange-400 text-2xl">{pending}</span>
              <span className="text-gray-600 dark:text-gray-400 font-semibold">Pending</span>
            </div>
            <div className="flex items-center gap-3">
              <span className="font-bold text-green-600 dark:text-green-400 text-2xl">{tasks.length}</span>
              <span className="text-gray-600 dark:text-gray-400 font-semibold">Total</span>
            </div>
          </div>

          {/* Buttons */}
          <div className="flex gap-3 flex-wrap">
            <button
              onClick={exportTasks}
              className="px-5 py-3 sm:py-3.5 bg-blue-500 hover:bg-blue-600 text-white text-base sm:text-lg font-bold rounded-xl transition-all duration-200 shadow-lg hover:shadow-xl active:scale-95 flex-1 sm:flex-none"
            >
              📥 Export
            </button>
            <label className="px-5 py-3 sm:py-3.5 bg-green-500 hover:bg-green-600 text-white text-base sm:text-lg font-bold rounded-xl transition-all duration-200 shadow-lg hover:shadow-xl active:scale-95 cursor-pointer flex-1 sm:flex-none inline-flex items-center justify-center">
              📤 Import
              <input type="file" accept=".json" onChange={handleImport} className="hidden" />
            </label>
          </div>
        </div>

        {/* Copyright */}
        <div className="mt-8 pt-8 border-t border-gray-200 dark:border-gray-700 text-center text-xs sm:text-sm text-gray-500 dark:text-gray-400 font-medium">
          © 2025 Advanced Task Manager • Made with React
        </div>
      </div>
    </footer>
  )
})

Footer.displayName = "Footer"
export default Footer
