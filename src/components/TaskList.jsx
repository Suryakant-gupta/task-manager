"use client"

import { useState, useCallback } from "react"
import TaskItem from "./TaskItem"

function TaskList({ tasks, onDeleteTask, onToggleTask, onEditTask, onReorderTasks, showToast }) {
  const [draggedTask, setDraggedTask] = useState(null)
  const [dragOverIndex, setDragOverIndex] = useState(null)

  const handleDragStart = useCallback((index) => {
    setDraggedTask(index)
  }, [])

  const handleDragOver = useCallback((e, index) => {
    e.preventDefault()
    setDragOverIndex(index)
  }, [])

  const handleDragLeave = useCallback(() => {
    setDragOverIndex(null)
  }, [])

  const handleDragEnd = useCallback(() => {
    if (draggedTask !== null && dragOverIndex !== null && draggedTask !== dragOverIndex) {
      const newTasks = Array.from(tasks)
      const [removed] = newTasks.splice(draggedTask, 1)
      newTasks.splice(dragOverIndex, 0, removed)
      onReorderTasks(newTasks)
      showToast("Task reordered")
    }
    setDraggedTask(null)
    setDragOverIndex(null)
  }, [draggedTask, dragOverIndex, tasks, onReorderTasks, showToast])

  if (tasks.length === 0) {
    return (
      <div className="tasks-empty">
        <div className="empty-icon">📝</div>
        <h3 className="empty-title">No tasks yet</h3>
        <p className="empty-subtitle">Get started by adding a new task above</p>
      </div>
    )
  }

  return (
    <div className="task-list">
      {tasks.map((task, index) => (
        <div
          key={task.id}
          draggable
          onDragStart={() => handleDragStart(index)}
          onDragOver={(e) => handleDragOver(e, index)}
          onDragLeave={handleDragLeave}
          onDragEnd={handleDragEnd}
          className={`task-item-wrapper ${dragOverIndex === index ? "dragging-over" : ""} ${draggedTask === index ? "dragging" : ""}`}
        >
          <TaskItem
            task={task}
            onToggle={onToggleTask}
            onDelete={onDeleteTask}
            onEdit={onEditTask}
            showToast={showToast}
          />
        </div>
      ))}
    </div>
  )
}

export default TaskList
