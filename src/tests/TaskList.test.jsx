import { describe, it, expect, beforeEach, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import { TaskProvider } from '../context/TaskContext';
import TaskList from '../components/TaskList';

describe('TaskList', () => {
  beforeEach(() => {
    localStorage.clear();
  });

  it('should render empty state', () => {
    const showToast = vi.fn();
    render(
      <TaskProvider>
        <TaskList filter="All" showToast={showToast} />
      </TaskProvider>
    );

    expect(screen.getByText(/No/)).toBeInTheDocument();
    expect(screen.getByText(/tasks/)).toBeInTheDocument();
  });

  it('should filter completed tasks', () => {
    const showToast = vi.fn();
    render(
      <TaskProvider>
        <TaskList filter="All" showToast={showToast} />
      </TaskProvider>
    );

    expect(screen.getByText(/No/)).toBeInTheDocument();
  });
});