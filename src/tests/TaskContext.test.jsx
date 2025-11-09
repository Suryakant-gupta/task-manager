import { describe, it, expect, beforeEach } from 'vitest';
import { renderHook, act } from '@testing-library/react';
import { TaskProvider, useTaskContext } from '../context/TaskContext';

describe('TaskContext', () => {
  beforeEach(() => {
    localStorage.clear();
  });

  it('should add a task', () => {
    const wrapper = ({ children }) => <TaskProvider>{children}</TaskProvider>;
    const { result } = renderHook(() => useTaskContext(), { wrapper });

    act(() => {
      result.current.addTask('Test task');
    });

    expect(result.current.tasks).toHaveLength(1);
    expect(result.current.tasks[0].title).toBe('Test task');
  });

  it('should delete a task', () => {
    const wrapper = ({ children }) => <TaskProvider>{children}</TaskProvider>;
    const { result } = renderHook(() => useTaskContext(), { wrapper });

    let taskId;
    act(() => {
      const task = result.current.addTask('Test task');
      taskId = task.id;
    });

    act(() => {
      result.current.deleteTask(taskId);
    });

    expect(result.current.tasks).toHaveLength(0);
  });

  it('should undo delete', () => {
    const wrapper = ({ children }) => <TaskProvider>{children}</TaskProvider>;
    const { result } = renderHook(() => useTaskContext(), { wrapper });

    let taskId;
    act(() => {
      const task = result.current.addTask('Test task');
      taskId = task.id;
    });

    act(() => {
      result.current.deleteTask(taskId);
    });

    expect(result.current.tasks).toHaveLength(0);

    act(() => {
      result.current.undoDelete();
    });

    expect(result.current.tasks).toHaveLength(1);
    expect(result.current.tasks[0].title).toBe('Test task');
  });

  it('should toggle task completion', () => {
    const wrapper = ({ children }) => <TaskProvider>{children}</TaskProvider>;
    const { result } = renderHook(() => useTaskContext(), { wrapper });

    let taskId;
    act(() => {
      const task = result.current.addTask('Test task');
      taskId = task.id;
    });

    act(() => {
      result.current.toggleTask(taskId);
    });

    expect(result.current.tasks[0].completed).toBe(true);
  });

  it('should reorder tasks', () => {
    const wrapper = ({ children }) => <TaskProvider>{children}</TaskProvider>;
    const { result } = renderHook(() => useTaskContext(), { wrapper });

    act(() => {
      result.current.addTask('Task 1');
      result.current.addTask('Task 2');
      result.current.addTask('Task 3');
    });

    const reordered = [result.current.tasks[2], result.current.tasks[0], result.current.tasks[1]];

    act(() => {
      result.current.reorderTasks(reordered);
    });

    expect(result.current.tasks[0].title).toBe('Task 3');
    expect(result.current.tasks[1].title).toBe('Task 1');
    expect(result.current.tasks[2].title).toBe('Task 2');
  });
});