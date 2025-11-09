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
    <footer className="bg-white dark:bg-slate-800 border-t border-gray-200 dark:border-slate-700 transition-colors duration-300 mt-6 sm:mt-8">
      <div className="max-w-4xl mx-auto px-3 sm:px-4 py-3 sm:py-6">
        <div className="grid grid-cols-3 gap-1.5 sm:gap-4 mb-3 sm:mb-5">
          <div className="flex flex-col items-center text-center">
            <span className="font-bold text-base sm:text-xl text-blue-600 dark:text-blue-400">{completed}</span>
            <span className="text-xs text-gray-600 dark:text-gray-400">Completed</span>
          </div>
          <div className="flex flex-col items-center text-center">
            <span className="font-bold text-base sm:text-xl text-amber-600 dark:text-amber-400">{pending}</span>
            <span className="text-xs text-gray-600 dark:text-gray-400">Pending</span>
          </div>
          <div className="flex flex-col items-center text-center">
            <span className="font-bold text-base sm:text-xl text-green-600 dark:text-green-400">{tasks.length}</span>
            <span className="text-xs text-gray-600 dark:text-gray-400">Total</span>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row gap-1.5 sm:gap-3">
          <button
            onClick={exportTasks}
            className="flex-1 px-2.5 sm:px-4 py-2 sm:py-3 bg-blue-500 hover:bg-blue-600 text-white text-xs sm:text-sm font-semibold rounded-lg transition-colors duration-200"
          >
            📥 Export
          </button>
          <label className="flex-1 px-2.5 sm:px-4 py-2 sm:py-3 bg-green-500 hover:bg-green-600 text-white text-xs sm:text-sm font-semibold rounded-lg transition-colors duration-200 cursor-pointer text-center">
            📤 Import
            <input type="file" accept=".json" onChange={handleImport} className="hidden" />
          </label>
        </div>

        <div className="mt-3 sm:mt-4 text-center text-xs text-gray-500 dark:text-gray-400">
          © 2025 Advanced Task Manager • Made with React
        </div>
      </div>
    </footer>
  )
})

Footer.displayName = "Footer"
export default Footer
