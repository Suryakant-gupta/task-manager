import React, { createContext, useCallback, useMemo } from 'react';
import { v4 as uuidv4 } from 'uuid';
import useLocalStorage from '../hooks/useLocalStorage';

export const TaskContext = createContext();

export function TaskProvider({ children }) {
  const [tasks, setTasks] = useLocalStorage('tasks', []);
  const [deletedTasks, setDeletedTasks] = useLocalStorage('deletedTasks', []);

  const addTask = useCallback((title, description = '', priority = 'medium', dueDate = '', category = 'general') => {
    const newTask = {
      id: uuidv4(),
      title,
      description,
      priority,
      dueDate,
      category,
      completed: false,
      createdAt: new Date().toISOString(),
      order: tasks.length,
      tags: [],
    };
    setTasks([...tasks, newTask]);
    return newTask;
  }, [tasks, setTasks]);

  const deleteTask = useCallback((id) => {
    const taskToDelete = tasks.find(t => t.id === id);
    setTasks(tasks.filter(t => t.id !== id));
    if (taskToDelete) {
      setDeletedTasks([...deletedTasks, { ...taskToDelete, deletedAt: new Date().toISOString() }]);
    }
  }, [tasks, deletedTasks, setTasks, setDeletedTasks]);

  const undoDelete = useCallback(() => {
    if (deletedTasks.length === 0) return null;
    const lastDeleted = deletedTasks[deletedTasks.length - 1];
    const restored = { ...lastDeleted };
    delete restored.deletedAt;
    setTasks([...tasks, restored]);
    setDeletedTasks(deletedTasks.slice(0, -1));
    return restored;
  }, [tasks, deletedTasks, setTasks, setDeletedTasks]);

  const toggleTask = useCallback((id) => {
    setTasks(tasks.map(t =>
      t.id === id ? { ...t, completed: !t.completed } : t
    ));
  }, [tasks, setTasks]);

  const editTask = useCallback((id, updates) => {
    setTasks(tasks.map(t =>
      t.id === id ? { ...t, ...updates } : t
    ));
  }, [tasks, setTasks]);

  const reorderTasks = useCallback((newTasks) => {
    setTasks(newTasks.map((task, index) => ({
      ...task,
      order: index,
    })));
  }, [setTasks]);

  const exportTasks = useCallback(() => {
    const dataStr = JSON.stringify(tasks, null, 2);
    const dataBlob = new Blob([dataStr], { type: 'application/json' });
    const url = URL.createObjectURL(dataBlob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `tasks-${new Date().toISOString()}.json`;
    link.click();
  }, [tasks]);

  const importTasks = useCallback((file) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      try {
        const imported = JSON.parse(e.target.result);
        if (Array.isArray(imported)) {
          setTasks(imported);
          return true;
        }
      } catch (err) {
        console.error('Import failed', err);
      }
      return false;
    };
    reader.readAsText(file);
  }, [setTasks]);

  const value = useMemo(() => ({
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
  }), [tasks, addTask, deleteTask, undoDelete, toggleTask, editTask, reorderTasks, exportTasks, importTasks, deletedTasks]);

  return (
    <TaskContext.Provider value={value}>
      {children}
    </TaskContext.Provider>
  );
}

export function useTaskContext() {
  const context = React.useContext(TaskContext);
  if (!context) {
    throw new Error('useTaskContext must be used within TaskProvider');
  }
  return context;
}