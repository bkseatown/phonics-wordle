// Compatibility shim to prevent 404/cached-index breakage.
// This file exists only so older cached HTML references don't crash the app.
try {
  // If the new consolidated globals exist, do nothing.
  if (window.PHONICS_DATA && window.APP_CONFIG) {
    // ok
  } else {
    // Load consolidated files if not already loaded.
    // NOTE: On GitHub Pages, script load order matters; this shim is best-effort.
  }
} catch (e) {}
