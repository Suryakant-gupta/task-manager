"use client"

import React, { useState, useCallback } from "react"
import { useTaskContext } from "../context/TaskContext"

const TaskItem = React.memo(({ task, showToast }) => {
  const { toggleTask, deleteTask, editTask } = useTaskContext()
  const [isEditing, setIsEditing] = useState(false)
  const [editText, setEditText] = useState(task.title)
  const [expandDescription, setExpandDescription] = useState(false)

  const getPriorityColor = (priority) => {
    switch (priority) {
      case "high":
        return "border-l-4 border-red-500 bg-red-50 dark:bg-red-900/10"
      case "medium":
        return "border-l-4 border-yellow-500 bg-yellow-50 dark:bg-yellow-900/10"
      case "low":
        return "border-l-4 border-green-500 bg-green-50 dark:bg-green-900/10"
      default:
        return "border-l-4 border-blue-500 bg-blue-50 dark:bg-blue-900/10"
    }
  }

  const getCategoryIcon = (category) => {
    const icons = {
      work: "💼",
      personal: "👤",
      shopping: "🛒",
      health: "🏥",
      general: "📋",
    }
    return icons[category] || "📋"
  }

  const handleToggle = useCallback(() => {
    toggleTask(task.id)
    showToast(task.completed ? "⏳ Task marked as pending" : "✓ Task completed")
  }, [task.id, task.completed, toggleTask, showToast])

  const handleDelete = useCallback(() => {
    deleteTask(task.id)
    showToast("🗑️ Task deleted")
  }, [task.id, deleteTask, showToast])

  const handleEditSubmit = useCallback(() => {
    const trimmed = editText.trim()
    if (trimmed && trimmed !== task.title) {
      editTask(task.id, { title: trimmed })
      showToast("✏️ Task updated")
    }
    setIsEditing(false)
  }, [editText, task.id, task.title, editTask, showToast])

  const handleEditCancel = useCallback(() => {
    setEditText(task.title)
    setIsEditing(false)
  }, [task.title])

  const formatDueDate = (date) => {
    if (!date) return null
    const d = new Date(date)
    return d.toLocaleDateString("en-US", { month: "short", day: "numeric" })
  }

  return (
    <div
      className={`task-item fade-enter bg-white dark:bg-gray-800 rounded-xl p-4 sm:p-5 hover:shadow-xl dark:hover:shadow-2xl transition-all duration-200 border border-gray-100 dark:border-gray-700 ${getPriorityColor(task.priority)}`}
    >
      <div className="flex items-start gap-3 sm:gap-4">
        {/* Checkbox */}
        <input
          type="checkbox"
          checked={task.completed}
          onChange={handleToggle}
          className="mt-1 w-6 h-6 sm:w-6 sm:h-6 accent-blue-500 cursor-pointer flex-shrink-0"
          aria-label={`Mark "${task.title}" as ${task.completed ? "incomplete" : "complete"}`}
        />

        {/* Content */}
        <div className="flex-1 min-w-0">
          {isEditing ? (
            <div className="flex gap-2 flex-col">
              <input
                type="text"
                value={editText}
                onChange={(e) => setEditText(e.target.value)}
                className="flex-1 px-4 py-3 bg-white dark:bg-gray-700 border-2 border-blue-500 rounded-lg text-gray-900 dark:text-white focus:outline-none text-base sm:text-lg font-medium"
                onKeyDown={(e) => {
                  if (e.key === "Enter") handleEditSubmit()
                  if (e.key === "Escape") handleEditCancel()
                }}
                autoFocus
              />
              <div className="flex gap-2">
                <button
                  onClick={handleEditSubmit}
                  className="px-4 py-2.5 bg-green-500 hover:bg-green-600 text-white rounded-lg text-sm sm:text-base font-bold transition-all active:scale-95"
                >
                  ✓ Save
                </button>
                <button
                  onClick={handleEditCancel}
                  className="px-4 py-2.5 bg-gray-400 hover:bg-gray-500 dark:bg-gray-600 dark:hover:bg-gray-700 text-white rounded-lg text-sm sm:text-base font-bold transition-all active:scale-95"
                >
                  ✕ Cancel
                </button>
              </div>
            </div>
          ) : (
            <>
              <p
                className={`text-base sm:text-lg cursor-pointer hover:opacity-70 transition-opacity font-bold break-words ${
                  task.completed ? "line-through text-gray-400 dark:text-gray-500" : "text-gray-900 dark:text-white"
                }`}
                onClick={() => setIsEditing(true)}
              >
                {task.title}
              </p>

              {/* Description Toggle */}
              {task.description && (
                <button
                  onClick={() => setExpandDescription(!expandDescription)}
                  className="text-sm text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 mt-2 transition-colors font-medium"
                >
                  {expandDescription ? "▼" : "▶"} Details
                </button>
              )}

              {/* Description Content */}
              {expandDescription && task.description && (
                <p className="text-sm text-gray-700 dark:text-gray-300 mt-3 bg-gray-50 dark:bg-gray-700 p-3 rounded-lg border border-gray-200 dark:border-gray-600">
                  {task.description}
                </p>
              )}

              {/* Tags */}
              <div className="flex flex-wrap gap-2 sm:gap-3 mt-3 sm:mt-4">
                {task.category && (
                  <span className="text-xs sm:text-sm bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-300 px-3 py-1.5 rounded-full font-bold whitespace-nowrap">
                    {getCategoryIcon(task.category)} {task.category}
                  </span>
                )}
                {task.priority && (
                  <span
                    className={`text-xs sm:text-sm px-3 py-1.5 rounded-full font-bold whitespace-nowrap ${
                      task.priority === "high"
                        ? "bg-red-100 dark:bg-red-900 text-red-700 dark:text-red-300"
                        : task.priority === "medium"
                          ? "bg-yellow-100 dark:bg-yellow-900 text-yellow-700 dark:text-yellow-300"
                          : "bg-green-100 dark:bg-green-900 text-green-700 dark:text-green-300"
                    }`}
                  >
                    {task.priority === "high" ? "🔴" : task.priority === "medium" ? "🟡" : "🟢"} {task.priority}
                  </span>
                )}
                {task.dueDate && (
                  <span className="text-xs sm:text-sm bg-purple-100 dark:bg-purple-900 text-purple-700 dark:text-purple-300 px-3 py-1.5 rounded-full font-bold whitespace-nowrap">
                    📅 {formatDueDate(task.dueDate)}
                  </span>
                )}
              </div>
            </>
          )}
        </div>

        {/* Delete Button */}
        <button
          onClick={handleDelete}
          className="text-red-500 hover:text-red-700 dark:hover:text-red-400 text-xl sm:text-2xl font-bold transition-all hover:scale-110 active:scale-95 flex-shrink-0 p-1"
          aria-label={`Delete "${task.title}"`}
          title="Delete task"
        >
          ✕
        </button>
      </div>
    </div>
  )
})

TaskItem.displayName = "TaskItem"
export default TaskItem
