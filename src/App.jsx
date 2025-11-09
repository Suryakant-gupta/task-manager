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
      html.style.backgroundColor = "#0f172a"
      html.style.color = "#f1f5f9"
      body.style.backgroundColor = "#0f172a"
      body.style.color = "#f1f5f9"
    } else {
      html.classList.remove("dark")
      html.style.backgroundColor = "#f8fafc"
      html.style.color = "#0f172a"
      body.style.backgroundColor = "#f8fafc"
      body.style.color = "#0f172a"
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
      className="min-h-screen flex flex-col bg-gray-50 dark:bg-slate-950"
      style={{
        backgroundColor: theme === "dark" ? "#0f172a" : "#f8fafc",
        color: theme === "dark" ? "#f1f5f9" : "#0f172a",
        transition: "background-color 0.3s ease, color 0.3s ease",
      }}
    >
      <Header theme={theme} toggleTheme={toggleTheme} />

      <main className="flex-1 max-w-4xl mx-auto w-full px-4 py-5 sm:py-6">
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
    