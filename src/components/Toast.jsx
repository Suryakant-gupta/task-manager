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
    <div className="toast fixed bottom-3 right-3 left-3 sm:left-auto sm:max-w-xs bg-gray-900 dark:bg-gray-800 text-white px-3 py-2.5 sm:px-4 sm:py-3 rounded-lg shadow-lg flex items-center gap-2 sm:gap-3 z-50">
      <span className="text-xs sm:text-sm flex-1 min-w-0">{message}</span>
      {action && (
        <button onClick={handleAction} className="ml-1 sm:ml-2 font-semibold hover:underline text-xs flex-shrink-0">
          {action.action}
        </button>
      )}
    </div>
  )
})

Toast.displayName = "Toast"
export default Toast
