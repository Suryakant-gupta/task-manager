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
            className={`space-y-1.5 sm:space-y-3 ${snapshot.isDraggingOver ? "drag-over p-2 sm:p-4" : ""} rounded-lg transition-all duration-200`}
          >
            {filteredTasks.length === 0 ? (
              <div className="text-center py-6 sm:py-12 text-gray-500 dark:text-gray-400 bg-gray-50 dark:bg-slate-900 rounded-lg border-2 border-dashed border-gray-300 dark:border-slate-700 px-3 sm:px-4">
                <div className="text-2xl sm:text-4xl mb-1.5 sm:mb-2">📝</div>
                <p className="font-semibold text-xs sm:text-base">
                  No {filter !== "All" ? filter.toLowerCase() : ""} tasks
                </p>
                <p className="text-xs mt-0.5 sm:mt-1 text-gray-500 dark:text-gray-400">
                  Get started by adding a new task
                </p>
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
