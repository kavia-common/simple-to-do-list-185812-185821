import React, { useEffect, useRef, useState } from 'react';

// PUBLIC_INTERFACE
export default function TodoItem({ todo, onToggle, onDelete, onEdit }) {
  /** A single todo row with checkbox, title, edit, and delete. */
  const [isEditing, setIsEditing] = useState(false);
  const [draft, setDraft] = useState(todo.title);
  const inputRef = useRef(null);

  useEffect(() => {
    if (isEditing) {
      inputRef.current?.focus();
      inputRef.current?.select();
    }
  }, [isEditing]);

  const save = () => {
    setIsEditing(false);
    if (draft.trim() !== todo.title) {
      onEdit?.(todo.id, draft);
    }
  };
  const cancel = () => {
    setIsEditing(false);
    setDraft(todo.title);
  };
  const onKeyDown = (e) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      save();
    } else if (e.key === 'Escape') {
      e.preventDefault();
      cancel();
    }
  };

  return (
    <li className="todo-item" role="listitem">
      <label className="check">
        <input
          type="checkbox"
          checked={todo.completed}
          onChange={() => onToggle?.(todo.id)}
          aria-label={`Mark "${todo.title}" as ${todo.completed ? 'active' : 'completed'}`}
        />
        <span aria-hidden />
      </label>

      {isEditing ? (
        <input
          ref={inputRef}
          className="input"
          value={draft}
          onChange={(e) => setDraft(e.target.value)}
          onKeyDown={onKeyDown}
          onBlur={save}
          aria-label="Edit task title"
          style={{ flex: 1, minWidth: 0 }}
        />
      ) : (
        <span
          className={`title ${todo.completed ? 'done' : ''}`}
          onDoubleClick={() => setIsEditing(true)}
        >
          {todo.title}
        </span>
      )}

      <div className="actions">
        <button
          className="btn ghost"
          onClick={() => setIsEditing((v) => !v)}
          aria-label={isEditing ? 'Save task' : 'Edit task'}
        >
          {isEditing ? 'Save' : 'Edit'}
        </button>
        <button
          className="btn danger"
          onClick={() => onDelete?.(todo.id)}
          aria-label="Delete task"
        >
          Delete
        </button>
      </div>

      <style>{`
        .todo-item {
          display: grid;
          grid-template-columns: 36px 1fr auto;
          align-items: center;
          gap: 12px;
          padding: 12px 16px;
          border-bottom: 1px solid rgba(0,0,0,0.06);
        }
        .todo-item:last-child { border-bottom: none; }
        .title {
          display: block;
          word-break: break-word;
        }
        .title.done {
          color: var(--color-muted);
          text-decoration: line-through;
        }
        .actions {
          display: inline-flex;
          gap: 8px;
        }
        .check {
          display: inline-flex; align-items: center; justify-content: center;
        }
        .check input {
          appearance: none;
          width: 18px; height: 18px;
          border: 2px solid rgba(0,0,0,0.25);
          border-radius: 6px;
          display: grid;
          place-content: center;
          cursor: pointer;
          position: relative;
          transition: all 150ms ease;
          background: transparent;
        }
        [data-theme="dark"] .check input { border-color: rgba(255,255,255,0.35); }
        .check input:checked {
          border-color: var(--color-primary);
          background: var(--color-primary);
          box-shadow: var(--focus-ring);
        }
        .check input:checked + span::after {
          content: '✓';
          color: #fff; font-size: 12px; font-weight: 700;
        }
      `}</style>
    </li>
  );
}
