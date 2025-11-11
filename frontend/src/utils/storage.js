const safeParse = (raw, fallback) => {
  try {
    const v = JSON.parse(raw);
    return v ?? fallback;
  } catch {
    return fallback;
  }
};

// PUBLIC_INTERFACE
export function loadFromStorage(key, fallback) {
  /** Load and parse a key from localStorage. */
  if (typeof window === 'undefined') return fallback;
  try {
    const raw = window.localStorage.getItem(key);
    if (raw === null) return fallback;
    return safeParse(raw, fallback);
  } catch {
    return fallback;
  }
}

// PUBLIC_INTERFACE
export function saveToStorage(key, value) {
  /** Save a serializable value to localStorage. */
  if (typeof window === 'undefined') return;
  try {
    window.localStorage.setItem(key, JSON.stringify(value));
  } catch {
    /* ignore quota or serialization errors */
  }
}

// PUBLIC_INTERFACE
export function removeFromStorage(key) {
  /** Remove a key from localStorage. */
  if (typeof window === 'undefined') return;
  try {
    window.localStorage.removeItem(key);
  } catch {
    /* ignore */
  }
}
