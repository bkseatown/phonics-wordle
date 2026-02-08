# Literacy Platform Handoff

Last updated: 2026-02-08

## Project + repo
- Project root: `/Users/robertwilliamknaus/Desktop/New project/literacy-platform`
- Git remote: `origin https://github.com/bkseatown/Cornerstone-MTSS.git`
- Branch: `main`
- Current local state: dirty working tree with substantial uncommitted changes
- HEAD vs remote: `HEAD == origin/main` at `3c1e18ba` (no new commits pushed yet)

## User direction (must preserve in future sessions)
- Stabilization only first, in this order:
  1. Word Quest no-scroll fit (desktop non-fullscreen + iPad)
  2. Audio/translation reliability (no wrong-language playback, no fake translation fallback)
  3. Simplified top navigation + role-first guided home
  4. Kid-safe reveal definitions/sentences/jokes
- Do not add net-new features until visual/UX checks pass.
- Preserve existing page set and Word Quest core look/feel.
- Keep teacher local recording studio concept (do not remove).

## Stabilization progress snapshot
### 1) Word Quest fit and layout
- `word-quest.html`, `style.css`, `app.js` adjusted to reduce header chrome and keep board + keyboard visible without forced scroll on typical desktop/iPad viewports.
- Scroll fallback class behavior exists (`wq-scroll-fallback`) and should only trigger on truly constrained heights.

### 2) Audio + translation reliability
- `app.js` now prioritizes packed TTS clips, then safely falls back.
- Translation rendering no longer fabricates text when translation is missing; it shows `"Translation coming soon for this word."`.
- Translation audio selection is language-matched only (prevents English voice speaking translated text in the wrong language).
- Translation hear-buttons now stay enabled when packed clips exist, even if a matching system voice is missing.
- Definition playback now uses `def` clip type instead of incorrectly routing to `sentence`.
- `translations.js` reads from multilingual `WORDS_DATA`.

### 3) Navigation + guided home
- `platform.js`, `home.js`, `index.html`, and activity pages updated toward grouped nav and clearer pathways.
- Legacy top-level Teacher/Classroom nav competition was removed from activity top bars; tools are accessed through grouped nav/actions.

### 4) Kid-safe reveal content
- `app.js` includes young/EAL sanitization pipeline:
  - unsafe-term blocklists
  - short/simplified fallback definitions/sentences
  - language-aware punctuation/length trimming
- `young-overrides.js` contains manual overrides for specific high-priority words.

## TTS/translation asset status (important)
### Word-level multilingual audio (default pack)
- Manifest: `audio/tts/tts-manifest.json`
- Entries present: `6000`
  - `en`: 500 word + 500 def + 500 sentence
  - `es`: 500 word + 500 def + 500 sentence
  - `zh`: 500 word + 500 def + 500 sentence
  - `tl`: 500 word + 500 def + 500 sentence
- File existence check: `missing = 0` for all manifest entries.

### Downloaded Azure voice packs (named packs)
- Registry: `audio/tts/packs/pack-registry.json`
- Packs present: `ava-multi`, `emma-en`, `guy-en-us`, `sonia-en-gb`, `ryan-en-gb`
- Each pack currently has:
  - physical files: `500 word + 500 def + 500 sentence + 150 passage` under `audio/tts/packs/<pack>/en/...`
  - manifest entries: `1650` total (`500 word + 500 def + 500 sentence + 150 passage`)
  - fields include `word`, `def`, `sentence`, `passage`

### Translation text coverage
- `words.js` currently has `500` words with populated `en/es/zh/tl` definition+sentence fields (`500/500` for each language).
- Hindi is not fully populated in `words.js`; UI may show “coming soon” for missing items.

## Decodable passages status
- Passage expansion source exists: `decodables-expansion.js` (70 titled entries).
- Existing fluency passage set in `fluency.js`: 11 passages.
- Azure passage audio export includes a combined 150 passage set and is present in pack manifests/files:
  - `audio/tts/packs/<pack>/tts-manifest.json` entries: `150` each.

## Files currently modified/untracked (local only, not yet live)
- Modified: `app.js`, `platform.js`, `style.css`, `home.js`, `index.html`, `word-quest.html`, `translations.js`, `words.js`, `young-overrides.js`, and several page HTML files (`cloze.html`, `comprehension.html`, `fluency.html`, `madlibs.html`, `writing.html`, `plan-it.html`, `number-sense.html`, `operations.html`).
- Also modified by test runs: `playwright-report/index.html`, `test-results/.last-run.json`.
- Untracked new files include: `assessments.html`, `assessments.js`, `favicon.ico`, `favicon.svg`, plus visual test artifact folders.

## Deploy/live reality
- If not committed and pushed, updates are not on GitHub Pages.
- Current repo indicates no new commit beyond `3c1e18ba` is on `origin/main`, so the latest local stabilization edits are not yet live.

## Required pre-push cleanup checklist
1. Decide what belongs in commit vs local artifacts:
   - normally exclude `playwright-report/` and `test-results/`.
2. Review and intentionally include/exclude new files:
   - `assessments.html`, `assessments.js`, `favicon.ico`, `favicon.svg`.
3. Confirm no accidental outside-repo artifacts are staged.

## Suggested ship commands
```bash
cd "/Users/robertwilliamknaus/Desktop/New project/literacy-platform"
git add app.js platform.js style.css home.js index.html word-quest.html translations.js words.js young-overrides.js cloze.html comprehension.html fluency.html madlibs.html writing.html plan-it.html number-sense.html operations.html
git add assessments.html assessments.js favicon.ico favicon.svg
git commit -m "Stabilize Word Quest layout, translation/audio reliability, nav clarity, and kid-safe reveal content"
git push origin main
```

## High-priority follow-up tasks (next session)
1. Re-run viewport fit checks on Word Quest (desktop 1280x780 and iPad sizes) after final CSS consolidation.
2. Run targeted visual suite for Home + Word Quest and accept/update snapshots only after UX sign-off.
3. Final content sweep for young/EAL tone on any remaining edgy definitions/sentences that slip through sanitizer.

## Notes for future Codex sessions
- Start by reading this file, then run `git status -sb` and `git diff --stat`.
- Assume user wants autonomous execution; avoid repeated confirmation prompts unless blocked by permissions or destructive actions.
- If Playwright fails in sandbox, rerun with elevated permissions instead of pausing progress.
