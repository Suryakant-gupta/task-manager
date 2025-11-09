"use client"

import React, { useMemo, useCallback } from "react"
import { DragDropContext, Droppable, Draggable } from "@hello-pangea/dnd"
import { useTaskContext } from "../context/TaskContext"
import TaskItem from "./TaskItem"

const TaskList = React.memo(({ filter, showToast }) => {
  const { tasks, reorderTasks } = useTaskContext()

  const filteredTasks = useMemo(() => {
    let result = tasks
    if (filter === "Completed") result = tasks.filter((t) => t.completed)
    if (filter === "Pending") result = tasks.filter((t) => !t.completed)
    return result
  }, [tasks, filter])

  const handleDragEnd = useCallback(
    (result) => {
      const { source, destination } = result

      if (!destination) return
      if (source.index === destination.index && source.droppableId === destination.droppableId) return

      const newTasks = Array.from(tasks)
      const [removed] = newTasks.splice(source.index, 1)
      newTasks.splice(destination.index, 0, removed)

      reorderTasks(newTasks)
      showToast("📍 Task reordered")
    },
    [tasks, reorderTasks, showToast],
  )

  return (
    <DragDropContext onDragEnd={handleDragEnd}>
      <Droppable droppableId="tasks-list">
        {(provided, snapshot) => (
          <div
            ref={provided.innerRef}
            {...provided.droppableProps}
            className={`space-y-3 sm:space-y-4 ${snapshot.isDraggingOver ? "drag-over p-4 sm:p-6" : ""} rounded-xl transition-all duration-200`}
          >
            {filteredTasks.length === 0 ? (
              <div className="text-center py-16 sm:py-20 text-gray-500 dark:text-gray-400 bg-gray-50 dark:bg-gray-800 rounded-2xl border-2 border-dashed border-gray-300 dark:border-gray-700">
                <div className="text-6xl sm:text-7xl mb-4">📝</div>
                <p className="font-bold text-lg sm:text-xl">No {filter !== "All" ? filter.toLowerCase() : ""} tasks</p>
                <p className="text-sm text-gray-400 dark:text-gray-500 mt-2">Get started by adding a new task</p>
              </div>
            ) : (
              filteredTasks.map((task, index) => (
                <Draggable key={task.id} draggableId={task.id} index={index}>
                  {(provided, snapshot) => (
                    <div
                      ref={provided.innerRef}
                      {...provided.draggableProps}
                      {...provided.dragHandleProps}
                      className={`task-enter ${snapshot.isDragging ? "task-item-dragging" : ""}`}
                    >
                      <TaskItem task={task} showToast={showToast} />
                    </div>
                  )}
                </Draggable>
              ))
            )}
            {provided.placeholder}
          </div>
        )}
      </Droppable>
    </DragDropContext>
  )
})

TaskList.displayName = "TaskList"
export default TaskList
