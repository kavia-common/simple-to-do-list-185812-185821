import { useCallback, useEffect, useMemo, useState } from 'react';
import { loadFromStorage, saveToStorage } from '../utils/storage';
import { logger } from '../utils/config';

const STORAGE_KEY = 'todo_items_v1';
const log = logger('todos');

const now = () => new Date().toISOString();

const createTodo = (title) => ({
  id: crypto.randomUUID ? crypto.randomUUID() : `${Date.now()}-${Math.random().toString(36).slice(2)}`,
  title: title.trim(),
  completed: false,
  createdAt: now(),
  updatedAt: now(),
});

// PUBLIC_INTERFACE
export function useTodos() {
  /**
   * Provides todos array, filtered view, and CRUD operations:
   * - addTodo(title)
   * - toggleTodo(id)
   * - deleteTodo(id)
   * - editTodo(id, newTitle)
   * - clearCompleted()
   * - setFilter('all'|'active'|'completed')
   */
  const [todos, setTodos] = useState(() => loadFromStorage(STORAGE_KEY, []));
  const [filter, setFilter] = useState('all');

  useEffect(() => {
    saveToStorage(STORAGE_KEY, todos);
    log.debug('Persisted todos', todos);
  }, [todos]);

  const addTodo = useCallback((title) => {
    const t = title.trim();
    if (!t) return;
    setTodos((prev) => [createTodo(t), ...prev]);
  }, []);

  const toggleTodo = useCallback((id) => {
    setTodos((prev) =>
      prev.map((t) =>
        t.id === id ? { ...t, completed: !t.completed, updatedAt: now() } : t
      )
    );
  }, []);

  const deleteTodo = useCallback((id) => {
    setTodos((prev) => prev.filter((t) => t.id !== id));
  }, []);

  const editTodo = useCallback((id, newTitle) => {
    const nt = (newTitle || '').trim();
    if (!nt) {
      // If title emptied, delete the todo
      setTodos((prev) => prev.filter((t) => t.id !== id));
      return;
    }
    setTodos((prev) =>
      prev.map((t) => (t.id === id ? { ...t, title: nt, updatedAt: now() } : t))
    );
  }, []);

  const clearCompleted = useCallback(() => {
    setTodos((prev) => prev.filter((t) => !t.completed));
  }, []);

  const filtered = useMemo(() => {
    switch (filter) {
      case 'active':
        return todos.filter((t) => !t.completed);
      case 'completed':
        return todos.filter((t) => t.completed);
      default:
        return todos;
    }
  }, [todos, filter]);

  const stats = useMemo(() => {
    const total = todos.length;
    const completed = todos.filter((t) => t.completed).length;
    const active = total - completed;
    return { total, completed, active };
  }, [todos]);

  return {
    todos,
    filtered,
    filter,
    setFilter,
    addTodo,
    toggleTodo,
    deleteTodo,
    editTodo,
    clearCompleted,
    stats,
  };
}
