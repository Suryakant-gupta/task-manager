"use client"

import React, { useCallback } from "react"

const Filter = React.memo(({ filter, setFilter }) => {
  const filters = ["All", "Completed", "Pending"]

  const handleFilterChange = useCallback(
    (newFilter) => {
      setFilter(newFilter)
    },
    [setFilter],
  )

  return (
    <div className="mb-6 flex gap-2 sm:gap-3 rounded-xl bg-gray-100 dark:bg-gray-800 p-1.5 sm:p-2 shadow-md border border-gray-200 dark:border-gray-700">
      {filters.map((f) => (
        <button
          key={f}
          onClick={() => handleFilterChange(f)}
          className={`flex-1 py-3 sm:py-3.5 px-3 sm:px-5 rounded-lg font-bold text-sm sm:text-base transition-all duration-200 ${
            filter === f
              ? "bg-gradient-to-r from-blue-500 to-blue-600 text-white shadow-lg hover:shadow-xl active:scale-95"
              : "bg-white dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-600 active:scale-95"
          }`}
          aria-current={filter === f ? "page" : undefined}
        >
          {f}
        </button>
      ))}
    </div>
  )
})

Filter.displayName = "Filter"
export default Filter
