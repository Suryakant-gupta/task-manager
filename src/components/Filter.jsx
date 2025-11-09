"use client"

function Filter({ filter, setFilter }) {
  const filters = ["All", "Completed", "Pending"]

  return (
    <div className="filter-container">
      <div className="filter-group">
        {filters.map((f) => (
          <button
            key={f}
            className={`filter-btn ${filter === f ? "filter-btn-active" : ""}`}
            onClick={() => setFilter(f)}
            aria-current={filter === f ? "page" : undefined}
          >
            {f}
          </button>
        ))}
      </div>
    </div>
  )
}

export default Filter
