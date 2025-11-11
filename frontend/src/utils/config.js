const parseJSON = (value, fallback) => {
  try {
    const parsed = JSON.parse(value);
    return parsed && typeof parsed === 'object' ? parsed : fallback;
  } catch {
    return fallback;
  }
};

const LOG_LEVELS = ['silent', 'error', 'warn', 'info', 'debug'];

// PUBLIC_INTERFACE
export function getFeatureFlags() {
  /** Returns parsed feature flags from REACT_APP_FEATURE_FLAGS env variable. */
  const raw = process.env.REACT_APP_FEATURE_FLAGS || '{}';
  const flags = parseJSON(raw, {});
  return {
    hashRouting: Boolean(flags.hashRouting),
    experiments: Boolean(flags.experiments),
    ...flags,
  };
}

// PUBLIC_INTERFACE
export function getLogLevel() {
  /** Returns log level string based on REACT_APP_LOG_LEVEL env variable. */
  const level = (process.env.REACT_APP_LOG_LEVEL || 'info').toLowerCase();
  return LOG_LEVELS.includes(level) ? level : 'info';
}

// PUBLIC_INTERFACE
export function logger(scope = 'app') {
  /** Minimal logger honoring REACT_APP_LOG_LEVEL. */
  const level = getLogLevel();
  const allow = (lvl) => LOG_LEVELS.indexOf(lvl) <= LOG_LEVELS.indexOf(level);
  const prefix = `[${scope}]`;
  return {
    error: (...args) => allow('error') && console.error(prefix, ...args),
    warn: (...args) => allow('warn') && console.warn(prefix, ...args),
    info: (...args) => allow('info') && console.info(prefix, ...args),
    debug: (...args) => allow('debug') && console.debug(prefix, ...args),
    level,
  };
}
