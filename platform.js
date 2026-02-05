// Shared platform boot (runs on every page).
// Purpose: keep UI look + accessibility settings consistent across activities.
(function () {
  const SETTINGS_KEY = 'decode_settings';
  const UI_LOOK_CLASSES = ['look-k2', 'look-35', 'look-612'];
  const ACTIVITY_LOG_KEY = 'decode_activity_log_v1';

  function safeParse(json) {
    try {
      return JSON.parse(json);
    } catch {
      return null;
    }
  }

  function normalizeLook(value) {
    const raw = String(value || '35');
    if (raw === 'k2') return 'k2';
    if (raw === '612') return '612';
    return '35';
  }

  const stored = safeParse(localStorage.getItem(SETTINGS_KEY) || '');
  const look = normalizeLook(stored && stored.uiLook);

  const body = document.body;
  if (!body) return;

  body.classList.add('force-light');
  document.documentElement.style.colorScheme = 'light';

  // Accessibility toggles (safe on pages that don't use them).
  body.classList.toggle('calm-mode', !!(stored && stored.calmMode));
  body.classList.toggle('large-text', !!(stored && stored.largeText));
  body.classList.toggle('hide-ipa', stored ? stored.showIPA === false : false);
  body.classList.toggle('hide-examples', stored ? stored.showExamples === false : false);
  body.classList.toggle('hide-mouth-cues', stored ? stored.showMouthCues === false : false);

  UI_LOOK_CLASSES.forEach((cls) => body.classList.remove(cls));
  body.classList.add(look === 'k2' ? 'look-k2' : look === '612' ? 'look-612' : 'look-35');

  // Lightweight local-only event log (used by Home progress preview).
  const platform = (window.DECODE_PLATFORM = window.DECODE_PLATFORM || {});

  function readJson(key, fallback) {
    const parsed = safeParse(localStorage.getItem(key) || '');
    return parsed === null || parsed === undefined ? fallback : parsed;
  }

  function writeJson(key, value) {
    localStorage.setItem(key, JSON.stringify(value));
  }

  function appendLocalArray(key, item, limit = 120) {
    const existing = readJson(key, []);
    const arr = Array.isArray(existing) ? existing : [];
    arr.unshift(item);
    if (arr.length > limit) arr.length = limit;
    writeJson(key, arr);
    return arr;
  }

  platform.readJson = platform.readJson || readJson;
  platform.writeJson = platform.writeJson || writeJson;
  platform.appendLocalArray = platform.appendLocalArray || appendLocalArray;

  platform.logActivity = platform.logActivity || function logActivity(entry) {
    try {
      const record = {
        ts: Date.now(),
        ...entry
      };
      appendLocalArray(ACTIVITY_LOG_KEY, record, 140);
      return record;
    } catch {
      return null;
    }
  };
})();
