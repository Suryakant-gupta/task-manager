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
        return "border-l-red-500 bg-red-50 dark:bg-red-950/20"
      case "medium":
        return "border-l-amber-500 bg-amber-50 dark:bg-amber-950/20"
      case "low":
        return "border-l-green-500 bg-green-50 dark:bg-green-950/20"
      default:
        return "border-l-blue-500 bg-blue-50 dark:bg-blue-950/20"
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
      className={`task-item fade-enter bg-white dark:bg-slate-800 rounded-lg p-2.5 sm:p-4 hover:shadow-md dark:hover:shadow-lg transition-all duration-200 border-l-4 ${getPriorityColor(task.priority)} border border-gray-200 dark:border-slate-700`}
    >
      <div className="flex items-start gap-2 sm:gap-3">
        <input
          type="checkbox"
          checked={task.completed}
          onChange={handleToggle}
          className="mt-0.5 w-5 h-5 accent-blue-500 cursor-pointer flex-shrink-0"
          aria-label={`Mark "${task.title}" as ${task.completed ? "incomplete" : "complete"}`}
        />
        <div className="flex-1 min-w-0">
          {isEditing ? (
            <div className="flex gap-1.5 sm:gap-2 flex-col">
              <input
                type="text"
                value={editText}
                onChange={(e) => setEditText(e.target.value)}
                className="flex-1 px-2.5 sm:px-3 py-1.5 sm:py-2 bg-white dark:bg-slate-700 border-2 border-blue-500 rounded text-gray-900 dark:text-white focus:outline-none text-sm sm:text-base"
                onKeyDown={(e) => {
                  if (e.key === "Enter") handleEditSubmit()
                  if (e.key === "Escape") handleEditCancel()
                }}
                autoFocus
              />
              <div className="flex gap-1.5 sm:gap-2">
                <button
                  onClick={handleEditSubmit}
                  className="px-2.5 sm:px-3 py-1.5 sm:py-2 bg-green-500 hover:bg-green-600 text-white rounded text-xs sm:text-sm font-semibold transition-colors"
                >
                  ✓ Save
                </button>
                <button
                  onClick={handleEditCancel}
                  className="px-2.5 sm:px-3 py-1.5 sm:py-2 bg-gray-400 hover:bg-gray-500 dark:bg-slate-600 dark:hover:bg-slate-700 text-white rounded text-xs sm:text-sm font-semibold transition-colors"
                >
                  ✕ Cancel
                </button>
              </div>
            </div>
          ) : (
            <>
              <p
                className={`text-sm sm:text-base cursor-pointer hover:opacity-70 transition-opacity font-semibold break-words ${
                  task.completed ? "line-through text-gray-400 dark:text-gray-500" : "text-gray-900 dark:text-white"
                }`}
                onClick={() => setIsEditing(true)}
              >
                {task.title}
              </p>
              {task.description && (
                <button
                  onClick={() => setExpandDescription(!expandDescription)}
                  className="text-xs text-gray-600 dark:text-gray-400 hover:text-blue-500 dark:hover:text-blue-400 mt-1 transition-colors"
                >
                  {expandDescription ? "▼" : "▶"} Details
                </button>
              )}
              {expandDescription && task.description && (
                <p className="text-xs text-gray-600 dark:text-gray-400 mt-1.5 bg-gray-50 dark:bg-slate-900 p-1.5 sm:p-2 rounded">
                  {task.description}
                </p>
              )}
              <div className="flex flex-wrap gap-1.5 mt-2">
                {task.category && (
                  <span className="text-xs bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 px-2 py-0.5 rounded">
                    {getCategoryIcon(task.category)} {task.category}
                  </span>
                )}
                {task.priority && (
                  <span
                    className={`text-xs px-2 py-0.5 rounded font-semibold ${
                      task.priority === "high"
                        ? "bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-300"
                        : task.priority === "medium"
                          ? "bg-amber-100 dark:bg-amber-900/30 text-amber-700 dark:text-amber-300"
                          : "bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-300"
                    }`}
                  >
                    {task.priority === "high" ? "🔴" : task.priority === "medium" ? "🟡" : "🟢"} {task.priority}
                  </span>
                )}
                {task.dueDate && (
                  <span className="text-xs bg-purple-100 dark:bg-purple-900/30 text-purple-700 dark:text-purple-300 px-2 py-0.5 rounded">
                    📅 {formatDueDate(task.dueDate)}
                  </span>
                )}
              </div>
            </>
          )}
        </div>
        <button
          onClick={handleDelete}
          className="text-red-500 hover:text-red-700 dark:hover:text-red-400 text-lg font-bold transition-colors hover:scale-110 flex-shrink-0 p-0.5 sm:p-1"
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
