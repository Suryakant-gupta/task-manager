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
      className="mb-6 bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-5 sm:p-7 transition-all duration-300 border border-gray-100 dark:border-gray-700"
    >
      <div className="flex flex-col gap-3 sm:gap-4">
        {/* Input Row */}
        <div className="flex gap-2 sm:gap-3">
          <input
            type="text"
            value={input}
            onChange={handleChange}
            placeholder="What needs to be done?"
            className={`flex-1 px-4 sm:px-5 py-3.5 sm:py-4 text-base rounded-xl bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-500 border-2 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-0 dark:focus:ring-offset-0 ${
              error ? "border-red-500" : "border-gray-300 dark:border-gray-600 focus:border-blue-500"
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
            className="px-4 sm:px-5 py-3.5 sm:py-4 bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 text-gray-700 dark:text-gray-300 font-bold rounded-xl transition-all duration-200 text-lg hover:scale-105 active:scale-95 flex-shrink-0 shadow-sm"
            title="Toggle advanced options"
            aria-label="Toggle advanced options"
          >
            ⚙️
          </button>
        </div>

        {error && (
          <span className="text-red-500 text-sm font-semibold bg-red-50 dark:bg-red-900/20 px-3 py-2 rounded-lg animate-pulse">
            {error}
          </span>
        )}

        {/* Advanced Options */}
        {showAdvanced && (
          <div className="space-y-4 sm:space-y-5 pt-5 sm:pt-6 border-t-2 border-gray-200 dark:border-gray-700 animate-fadeInTheme">
            <div>
              <label className="block text-sm font-bold mb-2.5 text-gray-700 dark:text-gray-300">Description</label>
              <textarea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Add task details..."
                className="w-full px-4 sm:px-5 py-3 bg-white dark:bg-gray-700 border-2 border-gray-300 dark:border-gray-600 rounded-xl text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-500 resize-none focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-0 dark:focus:ring-offset-0 text-base"
                rows="3"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-5">
              <div>
                <label className="block text-sm font-bold mb-2.5 text-gray-700 dark:text-gray-300">Priority</label>
                <select
                  value={priority}
                  onChange={(e) => setPriority(e.target.value)}
                  className="w-full px-4 sm:px-5 py-3 bg-white dark:bg-gray-700 border-2 border-gray-300 dark:border-gray-600 rounded-xl text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-0 dark:focus:ring-offset-0 text-base font-medium"
                >
                  <option value="low">🟢 Low</option>
                  <option value="medium">🟡 Medium</option>
                  <option value="high">🔴 High</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-bold mb-2.5 text-gray-700 dark:text-gray-300">Category</label>
                <select
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                  className="w-full px-4 sm:px-5 py-3 bg-white dark:bg-gray-700 border-2 border-gray-300 dark:border-gray-600 rounded-xl text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-0 dark:focus:ring-offset-0 text-base font-medium"
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
              <label className="block text-sm font-bold mb-2.5 text-gray-700 dark:text-gray-300">Due Date</label>
              <input
                type="date"
                value={dueDate}
                onChange={(e) => setDueDate(e.target.value)}
                className="w-full px-4 sm:px-5 py-3 bg-white dark:bg-gray-700 border-2 border-gray-300 dark:border-gray-600 rounded-xl text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-0 dark:focus:ring-offset-0 text-base"
              />
            </div>
          </div>
        )}
      </div>

      <button
        type="submit"
        className="mt-5 sm:mt-6 w-full bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 dark:from-blue-600 dark:to-blue-700 dark:hover:from-blue-700 dark:hover:to-blue-800 text-white font-bold py-3.5 sm:py-4 rounded-xl transition-all duration-200 shadow-lg hover:shadow-xl active:scale-95 text-base sm:text-lg"
      >
        ➕ Add Task
      </button>
    </form>
  )
})

TaskForm.displayName = "TaskForm"
export default TaskForm
