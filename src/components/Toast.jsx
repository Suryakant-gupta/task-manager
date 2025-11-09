"use client"

import React, { useEffect, useCallback } from "react"

const Toast = React.memo(({ message, action, onDismiss }) => {
  useEffect(() => {
    const timer = setTimeout(onDismiss, 3000)
    return () => clearTimeout(timer)
  }, [onDismiss])

  const handleAction = useCallback(() => {
    if (action && action.onClick) {
      action.onClick()
    }
    onDismiss()
  }, [action, onDismiss])

  return (
    <div className="toast fixed bottom-4 right-4 left-4 sm:left-auto sm:max-w-sm bg-gray-800 dark:bg-gray-700 text-white px-4 py-3 rounded-lg shadow-lg flex items-center gap-3 z-40">
      <span className="flex-1 text-sm sm:text-base">{message}</span>
      {action && (
        <button onClick={handleAction} className="ml-2 font-semibold hover:underline text-sm whitespace-nowrap">
          {action.action}
        </button>
      )}
    </div>
  )
})

Toast.displayName = "Toast"
export default Toast
