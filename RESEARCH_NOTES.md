# Research Notes (Condensed) — Science of Reading, Learning, and EdTech UX

These notes are **implementation-oriented**: they exist to keep feature and design decisions grounded in what tends to work in classrooms.

Note: This is written from widely accepted findings and practitioner consensus (structured literacy, cognitive science, accessibility). It’s not a substitute for district-adopted curricula or formal evaluations.

## Science of Reading (SoR) — What the Tool Should Support
**Core pillars** (especially for foundational readers, dyslexia risk, and intervention):
- **Phonological/phonemic awareness**: hearing/manipulating sounds (blending, segmenting).
- **Phonics / decoding**: mapping graphemes ↔ phonemes; teaching patterns explicitly and cumulatively.
- **Orthographic mapping**: repeated accurate decoding + meaning leads to automatic word recognition.
- **Morphology** (upper elementary+): prefixes/suffixes/roots support multisyllabic decoding and meaning.
- **Fluency**: accuracy → automaticity → prosody; fluency supports comprehension by reducing cognitive load.
- **Vocabulary & language comprehension**: background knowledge, word meanings, syntax, discourse structure.
- **Comprehension**: monitoring, inference, main idea, text structure, evidence.

**Structured literacy traits** (OG/Wilson/UFLI-compatible moves):
- Explicit, systematic scope & sequence.
- Cumulative review and mixed practice (not “random word soup”).
- Immediate feedback and error correction routines.
- Multi-sensory supports (visual cues, optional audio, articulation tips), without visual clutter.

## Science of Learning — What the UX Should Encourage
High-impact learning mechanics:
- **Retrieval practice**: frequent, low-stakes recall (short rounds, quick checks).
- **Spacing**: revisit patterns across days/weeks; “daily path” is a big win.
- **Interleaving**: mix similar patterns once basics are secure (reduces brittle learning).
- **Feedback timing**: immediate feedback for decoding; slightly delayed feedback can help for some higher-order tasks.
- **Cognitive load management**:
  - Reduce extraneous UI (no constant motion, minimal decorative noise).
  - Clear hierarchy and consistent placement.
  - Small steps: warm-up → practice → apply.
- **Motivation**:
  - Competence: visible progress, achievable rounds.
  - Autonomy: choice of activities/prompts with teacher guardrails.
  - Relatedness: whole-class modes, discussion prompts, collaborative wins.

## EdTech UX (Teacher Reality)
Teachers adopt tools that:
- Work in < 30 seconds from “open tab” to “start activity.”
- Don’t require accounts to be usable (or have painless “guest mode”).
- Are projector-robust: high contrast, large text, stable layout, minimal scrolling.
- Offer “teacher-only complexity” behind a single door (Teacher Settings).
- Provide exportable artifacts (CSV/JSON) for MTSS notes without turning into a gradebook.

## Accessibility / Projector Constraints
Projectors wash out:
- Avoid low-contrast light grays on white.
- Use bold weights and clear color semantics (green/yellow/gray) with **non-color cues** when possible.
- Ensure hit targets are big (touch screens, students at the board).
Motion:
- Default to calm; respect reduced-motion preferences; avoid animated backgrounds.

## Content Design Principles (K–12)
- Keep passages and prompts **short and focused** for intervention blocks.
- Offer **grade-banded sets** with themes:
  - STEM (plants, weather, simple experiments)
  - SEL (friendship, feelings, problem-solving)
  - Humanities (community helpers, history snapshots)
- Use consistent question types:
  - Detail (explicit)
  - Inference (implicit)
  - Vocabulary-in-context
  - Text structure (later)

## What “World-Class” Looks Like for Admins
Administrators tend to be impressed by:
- Clear, explicit alignment to structured literacy and MTSS tiers.
- Teacher workflow: exportable summaries, predictable routines, minimal setup.
- Inclusive supports: ELL scaffolds, SPED accommodations, speech cues.
- Evidence of iterative UX thinking: projector-first, local-first privacy, and consistent navigation.

## Practical “Local-First” Strategy (No Backend)
To keep GitHub Pages lightweight:
- Store settings and teacher resources in `localStorage` / `IndexedDB`.
- Provide **Export/Import** for:
  - Settings
  - Teacher resource lists (links)
  - Student groups (optional, local only)
- If accounts are added later: prefer “optional sync,” not required auth.

