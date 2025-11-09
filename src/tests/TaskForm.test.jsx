import { describe, it, expect, beforeEach, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { TaskProvider } from '../context/TaskContext';
import TaskForm from '../components/TaskForm';

describe('TaskForm', () => {
  beforeEach(() => {
    localStorage.clear();
  });

  it('should render form with input and button', () => {
    const showToast = vi.fn();
    render(
      <TaskProvider>
        <TaskForm showToast={showToast} />
      </TaskProvider>
    );

    const input = screen.getByPlaceholderText('What needs to be done?');
    expect(input).toBeDefined();
  });

  it('should show error on empty submit', async () => {
    const showToast = vi.fn();
    render(
      <TaskProvider>
        <TaskForm showToast={showToast} />
      </TaskProvider>
    );

    const button = screen.getByText(/Add Task/);
    fireEvent.click(button);

    const errorMsg = screen.queryByText('Task title cannot be empty');
    expect(errorMsg).toBeDefined();
  });

  it('should add task on valid submit', async () => {
    const showToast = vi.fn();
    render(
      <TaskProvider>
        <TaskForm showToast={showToast} />
      </TaskProvider>
    );

    const input = screen.getByPlaceholderText('What needs to be done?');
    const button = screen.getByText(/Add Task/);

    fireEvent.change(input, { target: { value: 'New task' } });
    fireEvent.click(button);

    expect(input.value).toBe('');
  });
});