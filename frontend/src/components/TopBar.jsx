import React from 'react';
import { useTheme } from '../context/ThemeContext';

// PUBLIC_INTERFACE
export default function TopBar({ stats = { total: 0, active: 0, completed: 0 } }) {
  /** App top bar with title, counts and theme toggle. */
  const { theme, setTheme } = useTheme();
  const nextTheme = theme === 'light' ? 'dark' : 'light';
  const onToggle = () => setTheme(nextTheme);

  return (
    <header className="topbar" role="banner" aria-label="Application Top Bar">
      <div className="container">
        <div className="topbar-content">
          <div className="title-wrap">
            <h1 className="title">Ocean Tasks</h1>
            <span className="badge" aria-label={`Total ${stats.total} tasks`}>
              <span aria-hidden>🗒️</span> {stats.total}
            </span>
          </div>
          <div className="topbar-actions">
            <span className="counts" aria-live="polite">
              <span className="active">Active: {stats.active}</span>
              <span className="completed">Completed: {stats.completed}</span>
            </span>
            <button
              className="btn secondary"
              onClick={onToggle}
              aria-label={`Switch to ${nextTheme} theme`}
            >
              {theme === 'light' ? '🌙 Dark' : '☀️ Light'}
            </button>
          </div>
        </div>
      </div>
      <style>{`
        .topbar {
          position: sticky;
          top: 0;
          z-index: 10;
          backdrop-filter: saturate(180%) blur(8px);
          background: linear-gradient(180deg, rgba(255,255,255,0.85), rgba(255,255,255,0.6));
          border-bottom: 1px solid rgba(0,0,0,0.06);
        }
        [data-theme="dark"] .topbar {
          background: linear-gradient(180deg, rgba(17,24,39,0.85), rgba(17,24,39,0.65));
        }
        .topbar-content {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 14px 0;
        }
        .title-wrap {
          display: flex;
          align-items: center;
          gap: 12px;
        }
        .title {
          margin: 0;
          font-size: 20px;
          letter-spacing: 0.2px;
        }
        .counts {
          display: inline-flex;
          gap: 12px;
          margin-right: 12px;
          color: var(--color-muted);
          font-size: 14px;
        }
        .counts .active { color: var(--color-primary); }
        .counts .completed { color: var(--color-secondary); }
        .topbar-actions {
          display: flex; align-items: center;
        }
      `}</style>
    </header>
  );
}
