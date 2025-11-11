import React, { createContext, useContext, useEffect, useMemo, useState } from 'react';
import { loadFromStorage, saveToStorage } from '../utils/storage';
import { logger } from '../utils/config';

const THEME_KEY = 'todo_theme';
const log = logger('theme');

const ThemeContext = createContext({ theme: 'light', setTheme: () => {} });

// PUBLIC_INTERFACE
export function useTheme() {
  /** Hook to access the current theme and setTheme function. */
  return useContext(ThemeContext);
}

// PUBLIC_INTERFACE
export function ThemeProvider({ children }) {
  /** Provides theme with persistence and applies document[data-theme]. */
  const [theme, setTheme] = useState(() => loadFromStorage(THEME_KEY, 'light'));

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
    saveToStorage(THEME_KEY, theme);
    log.debug('Applied theme', theme);
  }, [theme]);

  const value = useMemo(() => ({ theme, setTheme }), [theme]);

  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>;
}
