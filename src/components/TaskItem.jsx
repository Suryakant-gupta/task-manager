"use client"

import { useState, useCallback } from "react"

function TaskItem({ task, onToggle, onDelete, onEdit, showToast }) {
  const [isEditing, setIsEditing] = useState(false)
  const [editText, setEditText] = useState(task.title)
  const [expandDescription, setExpandDescription] = useState(false)

  const handleToggle = useCallback(() => {
    onToggle(task.id)
    showToast(task.completed ? "Task marked as pending" : "Task completed")
  }, [task.id, task.completed, onToggle, showToast])

  const handleDelete = useCallback(() => {
    onDelete(task.id)
    showToast("Task deleted")
  }, [task.id, onDelete, showToast])

  const handleEditSubmit = useCallback(() => {
    const trimmed = editText.trim()
    if (trimmed && trimmed !== task.title) {
      onEdit(task.id, { title: trimmed })
      showToast("Task updated")
    }
    setIsEditing(false)
  }, [editText, task.id, task.title, onEdit, showToast])

  const handleEditCancel = useCallback(() => {
    setEditText(task.title)
    setIsEditing(false)
  }, [task.title])

  const formatDueDate = (date) => {
    if (!date) return null
    const d = new Date(date)
    return d.toLocaleDateString("en-US", { month: "short", day: "numeric" })
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

  const priorityConfig = {
    high: { label: "High", emoji: "🔴" },
    medium: { label: "Medium", emoji: "🟡" },
    low: { label: "Low", emoji: "🟢" },
  }

  return (
    <div className={`task-item task-item-${task.priority} ${task.completed ? "task-completed" : ""}`}>
      <div className="task-main">
        <input
          type="checkbox"
          checked={task.completed}
          onChange={handleToggle}
          className="task-checkbox"
          aria-label={`Mark "${task.title}" as ${task.completed ? "incomplete" : "complete"}`}
        />

        <div className="task-content">
          {isEditing ? (
            <div className="task-edit-form">
              <input
                type="text"
                value={editText}
                onChange={(e) => setEditText(e.target.value)}
                className="task-edit-input"
                onKeyDown={(e) => {
                  if (e.key === "Enter") handleEditSubmit()
                  if (e.key === "Escape") handleEditCancel()
                }}
                autoFocus
              />
              <div className="task-edit-buttons">
                <button onClick={handleEditSubmit} className="btn-save">
                  Save
                </button>
                <button onClick={handleEditCancel} className="btn-cancel">
                  Cancel
                </button>
              </div>
            </div>
          ) : (
            <>
              <p className="task-title" onClick={() => setIsEditing(true)} title="Click to edit">
                {task.title}
              </p>

              {task.description && (
                <>
                  <button className="task-details-toggle" onClick={() => setExpandDescription(!expandDescription)}>
                    {expandDescription ? "▼" : "▶"} Details
                  </button>
                  {expandDescription && <p className="task-description">{task.description}</p>}
                </>
              )}

              <div className="task-tags">
                {task.category && (
                  <span className="tag tag-category">
                    {getCategoryIcon(task.category)} {task.category}
                  </span>
                )}
                {task.priority && (
                  <span className={`tag tag-priority tag-priority-${task.priority}`}>
                    {priorityConfig[task.priority].emoji} {priorityConfig[task.priority].label}
                  </span>
                )}
                {task.dueDate && <span className="tag tag-date">📅 {formatDueDate(task.dueDate)}</span>}
              </div>
            </>
          )}
        </div>

        <button
          onClick={handleDelete}
          className="task-delete"
          aria-label={`Delete "${task.title}"`}
          title="Delete task"
        >
          ✕
        </button>
      </div>
    </div>
  )
}

export default TaskItem
