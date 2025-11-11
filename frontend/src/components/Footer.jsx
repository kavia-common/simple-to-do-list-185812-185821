import React from 'react';

// PUBLIC_INTERFACE
export default function Footer() {
  /** Application footer with small print. */
  return (
    <footer className="container" role="contentinfo" aria-label="Footer">
      <div className="footer card" style={{ padding: 16, textAlign: 'center' }}>
        <small style={{ color: 'var(--color-muted)' }}>
          Built with Ocean Professional theme • Keyboard: Enter to add, Double click to edit, Esc to cancel
        </small>
      </div>
    </footer>
  );
}
