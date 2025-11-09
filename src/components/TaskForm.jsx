"use client"

import { useState, useCallback } from "react"

function TaskForm({ onAddTask, showToast }) {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    priority: "medium",
    category: "general",
    dueDate: "",
  })
  const [error, setError] = useState("")

  const handleChange = useCallback(
    (e) => {
      const { name, value } = e.target
      setFormData((prev) => ({
        ...prev,
        [name]: value,
      }))
      if (error) setError("")
    },
    [error],
  )

  const handleSubmit = useCallback(
    (e) => {
      e.preventDefault()

      if (!formData.title.trim()) {
        setError("Task title cannot be empty")
        return
      }

      onAddTask(formData)
      setFormData({
        title: "",
        description: "",
        priority: "medium",
        category: "general",
        dueDate: "",
      })
      setError("")
      showToast("Task added successfully")
    },
    [formData, onAddTask, showToast],
  )

  return (
    <form className="task-form" onSubmit={handleSubmit}>
      <div className="form-section form-main">
        <input
          type="text"
          name="title"
          value={formData.title}
          onChange={handleChange}
          placeholder="What needs to be done?"
          className={`form-input form-input-title ${error ? "form-input-error" : ""}`}
          onKeyDown={(e) => {
            if (e.key === "Enter" && !e.shiftKey) {
              handleSubmit(e)
            }
          }}
        />
        {error && <span className="form-error">{error}</span>}
      </div>

      <div className="form-section form-details">
        <div className="form-group">
          <label className="form-label">Description</label>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            placeholder="Add task details..."
            className="form-textarea"
            rows="2"
          />
        </div>

        <div className="form-row">
          <div className="form-group">
            <label className="form-label">Priority</label>
            <select name="priority" value={formData.priority} onChange={handleChange} className="form-select">
              <option value="low">Low Priority</option>
              <option value="medium">Medium Priority</option>
              <option value="high">High Priority</option>
            </select>
          </div>

          <div className="form-group">
            <label className="form-label">Category</label>
            <select name="category" value={formData.category} onChange={handleChange} className="form-select">
              <option value="general">General</option>
              <option value="work">Work</option>
              <option value="personal">Personal</option>
              <option value="shopping">Shopping</option>
              <option value="health">Health</option>
            </select>
          </div>
        </div>

        <div className="form-group">
          <label className="form-label">Due Date</label>
          <input type="date" name="dueDate" value={formData.dueDate} onChange={handleChange} className="form-input" />
        </div>
      </div>

      <button type="submit" className="form-submit">
        + Add Task
      </button>
    </form>
  )
}

export default TaskForm
