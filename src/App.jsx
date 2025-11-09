"use client"

import { useCallback, useState, useEffect } from "react"
import { TaskProvider } from "./context/TaskContext"
import Header from "./components/Header"
import Footer from "./components/Footer"
import TaskForm from "./components/TaskForm"
import TaskList from "./components/TaskList"
import Filter from "./components/Filter"
import Toast from "./components/Toast"

function AppContent() {
  const [filter, setFilter] = useState("All")
  const [toast, setToast] = useState(null)
  const [theme, setTheme] = useState("light")

  useEffect(() => {
    const savedTheme = localStorage.getItem("app-theme") || "light"
    setTheme(savedTheme)
    applyTheme(savedTheme)
  }, [])

  const applyTheme = (newTheme) => {
    const html = document.documentElement
    const body = document.body

    if (newTheme === "dark") {
      html.classList.add("dark")
      html.style.backgroundColor = "#111827"
      html.style.color = "white"
      body.style.backgroundColor = "#111827"
      body.style.color = "white"
    } else {
      html.classList.remove("dark")
      html.style.backgroundColor = "white"
      html.style.color = "#111827"
      body.style.backgroundColor = "white"
      body.style.color = "#111827"
    }
    localStorage.setItem("app-theme", newTheme)
  }

  const toggleTheme = useCallback(() => {
    setTheme((prev) => {
      const newTheme = prev === "light" ? "dark" : "light"
      applyTheme(newTheme)
      return newTheme
    })
  }, [])

  const showToast = useCallback((message, action = null) => {
    setToast({ message, action, id: Date.now() })
    setTimeout(() => setToast(null), 3000)
  }, [])

  return (
    <div
      className="min-h-screen flex flex-col"
      style={{
        backgroundColor: theme === "dark" ? "#111827" : "white",
        color: theme === "dark" ? "white" : "#111827",
        transition: "background-color 0.3s ease, color 0.3s ease",
      }}
    >
      <Header theme={theme} toggleTheme={toggleTheme} />

      <main className="flex-1 max-w-4xl mx-auto w-full px-4 sm:px-6 py-6 sm:py-8">
        <TaskForm showToast={showToast} />
        <Filter filter={filter} setFilter={setFilter} />
        <TaskList filter={filter} showToast={showToast} />
      </main>

      <Footer />

      {toast && <Toast message={toast.message} action={toast.action} onDismiss={() => setToast(null)} />}
    </div>
  )
}

export default function App() {
  return (
    <TaskProvider>
      <AppContent />
    </TaskProvider>
  )
}
