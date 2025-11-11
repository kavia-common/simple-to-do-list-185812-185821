import React from 'react';
import TodoItem from './TodoItem';

// PUBLIC_INTERFACE
export default function TodoList({
  items = [],
  filter = 'all',
  setFilter,
  onToggle,
  onDelete,
  onEdit,
  onClearCompleted,
}) {
  /** Renders list of TodoItem with filters and clear completed. */
  return (
    <section className="container" role="main" aria-label="To-do list">
      <div className="card" role="region" aria-labelledby="list-heading">
        <div style={{ padding: 16, borderBottom: '1px solid rgba(0,0,0,0.06)' }}>
          <h2 id="list-heading" style={{ margin: 0, fontSize: 16 }}>Your tasks</h2>
        </div>

        <ul role="list" aria-label="Tasks" style={{ margin: 0, padding: 0, listStyle: 'none' }}>
          {items.length === 0 ? (
            <li>
              <div style={{ padding: 24, textAlign: 'center', color: 'var(--color-muted)' }}>
                No tasks yet. Add your first task above.
              </div>
            </li>
          ) : (
            items.map((t) => (
              <TodoItem
                key={t.id}
                todo={t}
                onToggle={onToggle}
                onDelete={onDelete}
                onEdit={onEdit}
              />
            ))
          )}
        </ul>

        <div
          style={{
            padding: 12,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            borderTop: '1px solid rgba(0,0,0,0.06)',
          }}
        >
          <div role="tablist" aria-label="Filters" style={{ display: 'inline-flex', gap: 6 }}>
            <button
              className={`btn ${filter === 'all' ? '' : 'secondary'}`}
              onClick={() => setFilter('all')}
              role="tab"
              aria-selected={filter === 'all'}
            >
              All
            </button>
            <button
              className={`btn ${filter === 'active' ? '' : 'secondary'}`}
              onClick={() => setFilter('active')}
              role="tab"
              aria-selected={filter === 'active'}
            >
              Active
            </button>
            <button
              className={`btn ${filter === 'completed' ? '' : 'secondary'}`}
              onClick={() => setFilter('completed')}
              role="tab"
              aria-selected={filter === 'completed'}
            >
              Completed
            </button>
          </div>

          <button className="btn ghost" onClick={onClearCompleted} aria-label="Clear completed tasks">
            Clear completed
          </button>
        </div>
      </div>
    </section>
  );
}
