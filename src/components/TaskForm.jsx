"use client"

import React, { useState, useCallback } from "react"
import { useTaskContext } from "../context/TaskContext"

const TaskForm = React.memo(({ showToast }) => {
  const { addTask } = useTaskContext()
  const [showAdvanced, setShowAdvanced] = useState(false)
  const [input, setInput] = useState("")
  const [description, setDescription] = useState("")
  const [priority, setPriority] = useState("medium")
  const [dueDate, setDueDate] = useState("")
  const [category, setCategory] = useState("general")
  const [error, setError] = useState("")

  const handleSubmit = useCallback(
    (e) => {
      e.preventDefault()
      const trimmed = input.trim()

      if (!trimmed) {
        setError("Task title cannot be empty")
        return
      }

      addTask(trimmed, description, priority, dueDate, category)
      setInput("")
      setDescription("")
      setPriority("medium")
      setDueDate("")
      setCategory("general")
      setError("")
      setShowAdvanced(false)
      showToast("✓ Task added successfully")
    },
    [input, description, priority, dueDate, category, addTask, showToast],
  )

  const handleChange = useCallback(
    (e) => {
      setInput(e.target.value)
      if (error) setError("")
    },
    [error],
  )

  return (
    <form
      onSubmit={handleSubmit}
      className="mb-4 sm:mb-6 bg-white dark:bg-slate-800 rounded-xl shadow-sm p-3 sm:p-5 transition-all duration-300 border border-gray-200 dark:border-slate-700"
    >
      <div className="flex flex-col gap-2.5 sm:gap-3">
        <div className="flex flex-col sm:flex-row gap-2">
          <input
            type="text"
            value={input}
            onChange={handleChange}
            placeholder="What needs to be done?"
            className={`flex-1 px-3 py-2 sm:py-2.5 border-2 rounded-lg bg-white dark:bg-slate-700 text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-500 form-input text-sm sm:text-base focus:border-blue-500 transition-colors ${
              error ? "border-red-500" : "border-gray-300 dark:border-slate-600"
            }`}
            onKeyDown={(e) => {
              if (e.key === "Enter" && !e.shiftKey) {
                handleSubmit(e)
              }
            }}
          />
          <button
            type="button"
            onClick={() => setShowAdvanced(!showAdvanced)}
            className="px-3 py-2 sm:py-2.5 bg-gray-200 dark:bg-slate-700 hover:bg-gray-300 dark:hover:bg-slate-600 text-gray-800 dark:text-gray-200 font-semibold rounded-lg transition-colors duration-200 text-sm sm:text-base flex-shrink-0"
            title="Toggle advanced options"
          >
            ⚙️
          </button>
        </div>

        {error && <span className="text-red-500 text-xs sm:text-sm animate-pulse">{error}</span>}

        {showAdvanced && (
          <div className="space-y-2.5 sm:space-y-3 pt-2.5 sm:pt-3 border-t border-gray-200 dark:border-slate-700 animate-fadeInTheme">
            <div>
              <label className="block text-xs sm:text-sm font-semibold mb-1.5 sm:mb-2 text-gray-700 dark:text-gray-300">
                Description
              </label>
              <textarea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Add task details..."
                className="w-full px-3 py-2 bg-white dark:bg-slate-700 border border-gray-300 dark:border-slate-600 rounded-lg text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-500 form-input resize-none text-sm"
                rows="2"
              />
            </div>

            <div className="grid grid-cols-2 gap-2 sm:gap-3">
              <div>
                <label className="block text-xs sm:text-sm font-semibold mb-1.5 sm:mb-2 text-gray-700 dark:text-gray-300">
                  Priority
                </label>
                <select
                  value={priority}
                  onChange={(e) => setPriority(e.target.value)}
                  className="w-full px-3 py-2 bg-white dark:bg-slate-700 border border-gray-300 dark:border-slate-600 rounded-lg text-gray-900 dark:text-white form-input text-sm"
                >
                  <option value="low">🟢 Low</option>
                  <option value="medium">🟡 Medium</option>
                  <option value="high">🔴 High</option>
                </select>
              </div>

              <div>
                <label className="block text-xs sm:text-sm font-semibold mb-1.5 sm:mb-2 text-gray-700 dark:text-gray-300">
                  Category
                </label>
                <select
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                  className="w-full px-3 py-2 bg-white dark:bg-slate-700 border border-gray-300 dark:border-slate-600 rounded-lg text-gray-900 dark:text-white form-input text-sm"
                >
                  <option value="general">📋 General</option>
                  <option value="work">💼 Work</option>
                  <option value="personal">👤 Personal</option>
                  <option value="shopping">🛒 Shopping</option>
                  <option value="health">🏥 Health</option>
                </select>
              </div>
            </div>

            <div>
              <label className="block text-xs sm:text-sm font-semibold mb-1.5 sm:mb-2 text-gray-700 dark:text-gray-300">
                Due Date
              </label>
              <input
                type="date"
                value={dueDate}
                onChange={(e) => setDueDate(e.target.value)}
                className="w-full px-3 py-2 bg-white dark:bg-slate-700 border border-gray-300 dark:border-slate-600 rounded-lg text-gray-900 dark:text-white form-input text-sm"
              />
            </div>
          </div>
        )}
      </div>

      <button
        type="submit"
        className="mt-3 sm:mt-4 w-full bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 dark:from-blue-600 dark:to-blue-700 dark:hover:from-blue-700 dark:hover:to-blue-800 text-white font-bold py-2 sm:py-2.5 rounded-lg transition-all duration-200 shadow-md hover:shadow-lg active:scale-95 text-sm sm:text-base"
      >
        + Add Task
      </button>
    </form>
  )
})

TaskForm.displayName = "TaskForm"
export default TaskForm
