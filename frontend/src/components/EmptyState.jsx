import React from 'react';

// PUBLIC_INTERFACE
export default function EmptyState({ title = 'Nothing here', subtitle = 'Start by adding a task.' }) {
  /** Decorative empty state for lists. */
  return (
    <div className="empty-state" role="status" aria-live="polite">
      <div className="card" style={{ padding: 24, textAlign: 'center' }}>
        <div style={{ fontSize: 36, marginBottom: 8 }} aria-hidden>🌀</div>
        <div style={{ fontWeight: 600 }}>{title}</div>
        <div style={{ color: 'var(--color-muted)' }}>{subtitle}</div>
      </div>
    </div>
  );
}
