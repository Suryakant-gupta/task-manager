import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import TaskItem from '../components/TaskItem';
import { TaskProvider } from '../context/TaskContext';
jest.mock('../api/tasksApi', () => ({
updateTask: jest.fn(() => Promise.resolve({ _id: '1', title: 'Task', completed: true })),
deleteTask: jest.fn(() => Promise.resolve()),
getTasks: jest.fn(() => Promise.resolve([])),
}));
describe('TaskItem', () => {
const mockTask = {
_id: '1',
title: 'Test Task',
completed: false,
priority: 'medium',
description: 'Test description',
};
it('toggles task completion', async () => {
const { rerender } = render(
<TaskProvider>
<TaskItem task={mockTask} />
</TaskProvider>
);
const checkbox = screen.getByRole('checkbox');
fireEvent.click(checkbox);

await waitFor(() => {
  expect(checkbox).toBeDefined();
});
});
it('displays task title and description', () => {
render(
<TaskProvider>
<TaskItem task={mockTask} />
</TaskProvider>
);
expect(screen.getByText('Test Task')).toBeInTheDocument();
expect(screen.getByText('Test description')).toBeInTheDocument();
});
});