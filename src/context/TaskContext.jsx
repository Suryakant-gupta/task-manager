"use client"

import React, { createContext, useCallback, useMemo, useState, useEffect } from "react"

export const TaskContext = createContext()

export function TaskProvider({ children }) {
  const [tasks, setTasks] = useState([])
  const [deletedTasks, setDeletedTasks] = useState([])
  const [isLoaded, setIsLoaded] = useState(false)

  // Load from localStorage on mount
  useEffect(() => {
    if (typeof window !== "undefined") {
      const savedTasks = localStorage.getItem("tasks")
      const savedDeletedTasks = localStorage.getItem("deletedTasks")

      if (savedTasks) {
        try {
          setTasks(JSON.parse(savedTasks))
        } catch (err) {
          console.error("Failed to load tasks:", err)
        }
      }

      if (savedDeletedTasks) {
        try {
          setDeletedTasks(JSON.parse(savedDeletedTasks))
        } catch (err) {
          console.error("Failed to load deleted tasks:", err)
        }
      }

      setIsLoaded(true)
    }
  }, [])

  // Save to localStorage whenever tasks change
  useEffect(() => {
    if (typeof window !== "undefined" && isLoaded) {
      localStorage.setItem("tasks", JSON.stringify(tasks))
    }
  }, [tasks, isLoaded])

  // Save to localStorage whenever deletedTasks change
  useEffect(() => {
    if (typeof window !== "undefined" && isLoaded) {
      localStorage.setItem("deletedTasks", JSON.stringify(deletedTasks))
    }
  }, [deletedTasks, isLoaded])

  const addTask = useCallback(
    (title, description = "", priority = "medium", dueDate = "", category = "general") => {
      const newTask = {
        id: Math.random().toString(36).substr(2, 9),
        title,
        description,
        priority,
        dueDate,
        category,
        completed: false,
        createdAt: new Date().toISOString(),
        order: tasks.length,
        tags: [],
      }
      setTasks([...tasks, newTask])
      return newTask
    },
    [tasks],
  )

  const deleteTask = useCallback(
    (id) => {
      const taskToDelete = tasks.find((t) => t.id === id)
      setTasks(tasks.filter((t) => t.id !== id))
      if (taskToDelete) {
        setDeletedTasks([...deletedTasks, { ...taskToDelete, deletedAt: new Date().toISOString() }])
      }
    },
    [tasks, deletedTasks],
  )

  const undoDelete = useCallback(() => {
    if (deletedTasks.length === 0) return null
    const lastDeleted = deletedTasks[deletedTasks.length - 1]
    const restored = { ...lastDeleted }
    delete restored.deletedAt
    setTasks([...tasks, restored])
    setDeletedTasks(deletedTasks.slice(0, -1))
    return restored
  }, [tasks, deletedTasks])

  const toggleTask = useCallback(
    (id) => {
      setTasks(tasks.map((t) => (t.id === id ? { ...t, completed: !t.completed } : t)))
    },
    [tasks],
  )

  const editTask = useCallback(
    (id, updates) => {
      setTasks(tasks.map((t) => (t.id === id ? { ...t, ...updates } : t)))
    },
    [tasks],
  )

  const reorderTasks = useCallback((newTasks) => {
    setTasks(
      newTasks.map((task, index) => ({
        ...task,
        order: index,
      })),
    )
  }, [])

  const exportTasks = useCallback(() => {
    const dataStr = JSON.stringify(tasks, null, 2)
    const dataBlob = new Blob([dataStr], { type: "application/json" })
    const url = URL.createObjectURL(dataBlob)
    const link = document.createElement("a")
    link.href = url
    link.download = `tasks-${new Date().toISOString()}.json`
    link.click()
  }, [tasks])

  const importTasks = useCallback((file) => {
    const reader = new FileReader()
    reader.onload = (e) => {
      try {
        const imported = JSON.parse(e.target.result)
        if (Array.isArray(imported)) {
          setTasks(imported)
          return true
        }
      } catch (err) {
        console.error("Import failed", err)
      }
      return false
    }
    reader.readAsText(file)
  }, [])

  const value = useMemo(
    () => ({
      tasks,
      addTask,
      deleteTask,
      undoDelete,
      toggleTask,
      editTask,
      reorderTasks,
      exportTasks,
      importTasks,
      deletedTasks,
    }),
    [
      tasks,
      addTask,
      deleteTask,
      undoDelete,
      toggleTask,
      editTask,
      reorderTasks,
      exportTasks,
      importTasks,
      deletedTasks,
    ],
  )

  return <TaskContext.Provider value={value}>{children}</TaskContext.Provider>
}

export function useTaskContext() {
  const context = React.useContext(TaskContext)
  if (!context) {
    throw new Error("useTaskContext must be used within TaskProvider")
  }
  return context
}
