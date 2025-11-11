import { render, screen, fireEvent } from '@testing-library/react';
import App from './App';

function addTask(title) {
  const input = screen.getByLabelText(/task title/i);
  fireEvent.change(input, { target: { value: title } });
  fireEvent.submit(input.closest('form'));
}

test('add, toggle, and delete a task', () => {
  render(<App />);

  // Add task
  addTask('Write tests');
  expect(screen.getByText('Write tests')).toBeInTheDocument();

  // Toggle complete
  const checkbox = screen.getByLabelText(/mark "Write tests" as completed/i);
  fireEvent.click(checkbox);
  expect(screen.getByText('Write tests')).toHaveClass('done');

  // Delete
  const deleteBtn = screen.getByLabelText(/delete task/i);
  fireEvent.click(deleteBtn);
  expect(screen.queryByText('Write tests')).not.toBeInTheDocument();
});
