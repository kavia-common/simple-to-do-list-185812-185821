import React from 'react';
import './App.css';
import TopBar from './components/TopBar';
import TodoInput from './components/TodoInput';
import TodoList from './components/TodoList';
import Footer from './components/Footer';
import { ThemeProvider } from './context/ThemeContext';
import { useTodos } from './hooks/useTodos';
import { getFeatureFlags, logger } from './utils/config';

const flags = getFeatureFlags();
const log = logger('App');

function MainApp() {
  const {
    filtered,
    filter,
    setFilter,
    addTodo,
    toggleTodo,
    deleteTodo,
    editTodo,
    clearCompleted,
    stats,
  } = useTodos();

  React.useEffect(() => {
    log.info('Feature flags', flags);
    if (flags.hashRouting && !window.location.hash) {
      window.location.hash = '#/';
    }
  }, []);

  return (
    <div className="app-shell app-hero">
      <TopBar stats={stats} />
      <main className="app-main" role="main">
        <TodoInput onAdd={addTodo} />
        <TodoList
          items={filtered}
          filter={filter}
          setFilter={setFilter}
          onToggle={toggleTodo}
          onDelete={deleteTodo}
          onEdit={editTodo}
          onClearCompleted={clearCompleted}
        />
      </main>
      <Footer />
    </div>
  );
}

// PUBLIC_INTERFACE
export default function App() {
  /** Root application wrapped with ThemeProvider. */
  return (
    <ThemeProvider>
      <MainApp />
    </ThemeProvider>
  );
}
