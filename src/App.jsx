// app.jsx - UNIFIED IMPLEMENTATION
"use client"

import { useState, useEffect, useCallback, useRef } from "react"
import Header from "./components/Header"
import TaskForm from "./components/TaskForm"
import Filter from "./components/Filter"
import TaskList from "./components/TaskList"
import "./index.css"

function App() {
  const [tasks, setTasks] = useState([])
  const [filter, setFilter] = useState("All")
  const [theme, setTheme] = useState("light")
  const [isHydrated, setIsHydrated] = useState(false)

  // Initialize from localStorage on mount only
  useEffect(() => {
    try {
      const savedTheme = localStorage.getItem("todo-theme") || "light"
      const savedTasks = localStorage.getItem("todo-tasks")

      setTheme(savedTheme)
      applyTheme(savedTheme)

      if (savedTasks) {
        setTasks(JSON.parse(savedTasks))
      }
    } catch (error) {
      console.error("Failed to load from localStorage:", error)
    }

    setIsHydrated(true)
  }, [])

  // Persist tasks to localStorage whenever they change (only after initial load)
  useEffect(() => {
    if (isHydrated) {
      try {
        localStorage.setItem("todo-tasks", JSON.stringify(tasks))
      } catch (error) {
        console.error("Failed to save tasks to localStorage:", error)
      }
    }
  }, [tasks, isHydrated])

  const applyTheme = (newTheme) => {
    document.documentElement.setAttribute("data-theme", newTheme)
    localStorage.setItem("todo-theme", newTheme)
  }

  const toggleTheme = useCallback(() => {
    setTheme((prev) => {
      const newTheme = prev === "light" ? "dark" : "light"
      applyTheme(newTheme)
      return newTheme
    })
  }, [])

  const addTask = useCallback((taskData) => {
    const newTask = {
      id: Date.now().toString(),
      title: taskData.title,
      description: taskData.description,
      priority: taskData.priority,
      category: taskData.category,
      dueDate: taskData.dueDate,
      completed: false,
      createdAt: new Date().toISOString(),
    }
    setTasks((prev) => [newTask, ...prev])
  }, [])

  const deleteTask = useCallback((id) => {
    setTasks((prev) => prev.filter((task) => task.id !== id))
  }, [])

  const toggleTask = useCallback((id) => {
    setTasks((prev) =>
      prev.map((task) =>
        task.id === id ? { ...task, completed: !task.completed } : task
      )
    )
  }, [])

  const editTask = useCallback((id, updates) => {
    setTasks((prev) =>
      prev.map((task) =>
        task.id === id ? { ...task, ...updates } : task
      )
    )
  }, [])

  const showToast = (message) => {
    const toast = document.createElement("div")
    toast.className = "toast"
    toast.textContent = message
    document.body.appendChild(toast)

    setTimeout(() => {
      toast.classList.add("toast-hide")
      setTimeout(() => toast.remove(), 300)
    }, 2500)
  }

  const filteredTasks = tasks.filter((task) => {
    if (filter === "Completed") return task.completed
    if (filter === "Pending") return !task.completed
    return true
  })

  // Don't render until data is loaded from localStorage
  if (!isHydrated) {
    return <div className="app">Loading...</div>
  }

  return (
    <div className="app" data-theme={theme}>
      <div className="app-container">
        <Header theme={theme} toggleTheme={toggleTheme} />

        <main className="main-content">
          <TaskForm onAddTask={addTask} showToast={showToast} />
          <Filter filter={filter} setFilter={setFilter} />
          <TaskList
            tasks={filteredTasks}
            onDeleteTask={deleteTask}
            onToggleTask={toggleTask}
            onEditTask={editTask}
            onReorderTasks={setTasks}
            showToast={showToast}
          />
        </main>
      </div>
    </div>
  )
}

export default App