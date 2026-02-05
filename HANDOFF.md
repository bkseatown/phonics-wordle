<!--
This file is intentionally short and meant to be shared in a new Codex thread
so the project context survives switching devices.
-->

# Decode the Word — Project Handoff

## Current state
- Working folder: `literacy-platform/`
- Tech: static HTML/CSS/vanilla JS (no build step)
- Pages added: `index.html` (Home hub) + one HTML per activity
- Activities: Word Quest, Story Fill (Cloze), Read & Think (Comprehension), Speed Sprint (Fluency), Silly Stories (Mad Libs), Write & Build (Writing), Plan‑It

## Recent fixes
- Header navigation now wraps instead of horizontal scrolling (prevents “giant pill” overlap on narrow windows).
- Word Quest game modes are now session-based: HUD/teams/timer/hearts only run when `gameMode.active` is true.
  - `loadSettings()` resets `gameMode.active` to `false` on page load.
  - Team/timer/challenge behavior is gated behind `gameMode.active`.
- Other activities (Cloze / Comprehension / Fluency) now respect `decode_settings.gameMode.active` before showing any HUD.
- Teacher modal usability improvements:
  - Scroll/clipping fixed (modal content can scroll).
  - Force-light overrides prevent washed-out text when OS/browser is in dark mode.
  - Custom word row layout improved (more room for the input + buttons).
- Contrast tweaks applied in `style.css` for absent tiles/keys (projector-friendly).
- Word Quest status colors fixed: submitted tiles/keys now keep readable contrast (base Word Quest tile/key styles no longer override `.correct/.present/.absent` backgrounds).
- Custom word masking no longer triggers Chrome password-manager prompts:
  - Uses a CSS masking class when supported; falls back to password type otherwise.
- Word Quest connected sentences: every English sentence now contains the exact target word (fixed 25 mismatches in `words.js`).
- Reveal modal cleanup:
  - Translate is now a click-to-open section (collapsed by default).
  - Teacher recording tools are hidden by default; enable via Teacher → “Show teacher recording tools on the reveal screen”.
- Home now includes a Placement (Quick Screener) + Progress preview (`index.html` + `home.js`).
  - Placement saves to `decode_placement_v1` and generates Word Quest links like `word-quest.html?focus=cvc&len=3`.
  - Placement grade band now uses `K-2`, `3-5`, `6-8`, `9-12` and syncs UI look + learner profile.
  - Word Quest reads `focus` / `len` URL params on load.
  - Progress preview reads Word Quest stats from `decode_progress_data` and recent activity from `decode_activity_log_v1`.
- `platform.js` now exposes `window.DECODE_PLATFORM.logActivity()` and activities write lightweight local-only events for the Home activity log.
- Activities now default grade filters based on the saved learner profile (Comprehension / Fluency / Writing).
- Plan-It refresh:
  - Multiple age-appropriate scenarios (K-2 → 9-12), fixed tasks auto-fill, and an Auto-plan option.
  - Click a task, then click a highlighted timeline slot to place it.
  - Optional reflection prompt when a plan is conflict-free.
  - Teacher tools: add a mini-lesson video link per scenario.
- Teacher mini-lesson links (non-Word Quest pages): platform injects a collapsed “Teacher tools” section that can store a video link per activity (opens in a new tab; no downloading).

## Next steps (recommended)
1. Verify in-browser: Placement → Word Quest sets focus/length correctly; Home progress updates after a few rounds.
2. Add export-friendly MTSS notes/report view (local-only first; later sync).
3. Expand placement into a fuller pathway map (comprehension + writing recommendations).

## How to run locally
From the `literacy-platform/` folder:
```sh
python3 -m http.server 8000
```
Then open `http://localhost:8000/`.

Note: microphone recording typically requires `http://localhost` (not `file://`).
