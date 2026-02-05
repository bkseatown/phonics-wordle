# Decode the Word — Platform Brief (Bright Lab + Storybook Accents)

This file is a “single source of truth” snapshot for design + pedagogy decisions, so the project stays coherent across devices/threads.

## What This Platform Is
Decode the Word is a **classroom-ready, local-first literacy platform**: a set of short, structured activities that reduce teacher prep, support intervention, and stay visually clean on a projector.

Core stance:
- **Science of Reading / Structured Literacy** aligned (explicit → cumulative → practice → application).
- **Science of Learning** aligned (retrieval, feedback, spacing, low cognitive load UI).
- **Specialist-friendly** (SPED, SLP, ELL, interventionists) while still feeling fun for kids.
- **Local-first & privacy-respecting**: no accounts required; export/import for portability.

## Audience
- Students: ages ~5+ through secondary (supports both foundational + language/writing practice).
- Teachers: whole-class projection, small group, independent stations.
- Specialists: MTSS/RTI, IEP/504 goals, speech/language supports, EAL scaffolds.
- Admin: “does this actually reduce burden and increase targeted practice?”

## Design Direction
Theme: **Bright Lab** (clean white base, crisp borders, bright accent chips) with **storybook accents** (soft gradients, friendly header font, gentle sparkles).

Non-negotiables for school use:
- Projector-friendly contrast (light mode by default).
- Minimal motion; no moving backgrounds.
- Large, clear targets; stable layouts; predictable navigation.
- “Fun” is optional and teacher-controlled.

## Instructional Model (No Wandering)
Default daily routine (10–15 minutes):
1. **Warm-Up (as needed)**: Sound Lab quick reminders (phoneme/grapheme + tip + example).
2. **Practice**: Word Quest (decoding + immediate feedback).
3. **Apply**: Story Fill (context + syntax) and/or Read & Think (comprehension).
4. **Fluency**: Speed Sprint (timed read + quick scoring).
5. **Writing**: Write & Build (plan → draft → check).
6. **Executive Function**: Plan-It Challenge (planning/constraints/routines).

## Current Activities (What’s Live)
- **Word Quest** (`word-quest.html`): decoding game + teacher tools + audio.
- **Sound Lab** (Tools → Sound Lab): sound tiles + tip + example + articulation card.
- **Story Fill** (`cloze.html`): cloze/story context application.
- **Read & Think** (`comprehension.html`): band-based passages + inference/detail questions.
- **Speed Sprint** (`fluency.html`): ORF-style timed practice + clickable tracking.
- **Silly Stories** (`madlibs.html`): parts-of-speech writing play.
- **Write & Build** (`writing.html`): Step Up–style paragraph builder.
- **Plan-It Challenge** (`plan-it.html`): calm planning game (constraints + overlap checks).

## Teacher Workflow (Local-First)
Goals:
- “One device, one projector, it just works.”
- Teacher customization without accounts.

What’s implemented:
- **Teacher Settings**: audio preferences, assessment tools, game mode toggles.
- **Export/Import settings** (Transfer Settings): move preferences between machines.
- **Recording Studio**: record word/sentence audio on the device.
- **Mic cleanup**: recording stops streams reliably on stop/close.
- **Classroom Dock**: floating slides + timer with **pop-out** + full screen.

## Alignment Notes (Non-Proprietary)
This platform does **not** copy program content (Wilson/Fundations/Just Words/UFLI/OG/Step Up), but it supports the shared instructional moves:
- Explicit teaching of patterns (phoneme-grapheme links, syllable/morphology later).
- Cumulative, mixed practice (interleaving).
- Application in connected text (decodable-ish passages + sentence contexts).
- Fluency (accuracy first, then rate + prosody).
- Writing structures (planning frames, sentence combining, revision checks).

## Guardrails (So It Stays “World-Class”)
1. Keep navigation consistent and labels kid-friendly.
2. Never require zoom to use core activities (fit-to-screen + responsive).
3. Don’t add features that create “teacher setup debt” without clear payoff.
4. Prefer exports/imports over accounts until absolutely necessary.
5. Each activity must have:
   - Clear target skill
   - Fast start (no long setup)
   - Simple feedback loop
   - Optional “teacher view” for scoring/notes

## Near-Term Roadmap (Next 2–4 Sprints)
- Fluency: longer passages that don’t run out + grade-banded banks + prosody supports.
- Comprehension: expand banks by grade band + theme sets (STEM/SEL).
- Writing: add sentence-combining + revision mini-lessons (short, repeatable).
- Teacher time-savers: rubric checklists, printable/exportable summaries (CSV/PDF-lite).
- Optional: “Resource Library” (local saved links + export/import) for videos/anchors.

