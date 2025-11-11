import React, { useRef, useState } from 'react';

// PUBLIC_INTERFACE
export default function TodoInput({ onAdd }) {
  /** Input field and Add button. Calls onAdd(title) when submitted. */
  const [value, setValue] = useState('');
  const [announce, setAnnounce] = useState('');
  const inputRef = useRef(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    const title = value.trim();
    if (!title) return;
    onAdd?.(title);
    setAnnounce(`Added task: ${title}`);
    setValue('');
    inputRef.current?.focus();
  };

  const onKeyDown = (e) => {
    if (e.key === 'Escape') {
      setValue('');
      setAnnounce('Cleared input');
    }
  };

  return (
    <section className="container" role="region" aria-labelledby="add-task-heading">
      <h2 id="add-task-heading" className="hidden">Add a new task</h2>
      <form className="card" onSubmit={handleSubmit} style={{ padding: 16 }}>
        <label htmlFor="todo-input" className="hidden">Task title</label>
        <div style={{ display: 'flex', gap: 12 }}>
          <input
            id="todo-input"
            ref={inputRef}
            className="input"
            type="text"
            placeholder="What needs to be done?"
            value={value}
            onChange={(e) => setValue(e.target.value)}
            onKeyDown={onKeyDown}
            aria-label="Task title"
            autoComplete="off"
          />
          <button className="btn" type="submit" aria-label="Add task">
            Add
          </button>
        </div>
        <div className="hidden" aria-live="polite">{announce}</div>
      </form>
    </section>
  );
}
