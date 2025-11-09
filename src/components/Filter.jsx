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
    <div className="mb-4 sm:mb-6 flex gap-1.5 sm:gap-2 rounded-lg bg-gray-100 dark:bg-slate-800 p-1 sm:p-1.5">
      {filters.map((f) => (
        <button
          key={f}
          onClick={() => handleFilterChange(f)}
          className={`flex-1 py-2 sm:py-2.5 px-2.5 sm:px-3 rounded-md font-semibold text-xs sm:text-base transition-colors duration-200 ${
            filter === f
              ? "bg-blue-500 text-white shadow-md"
              : "bg-transparent text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-slate-700"
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
