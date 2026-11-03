---
id: IDEA-002
type: idea
kind: capability
owner: product-lead
status: building
gist: A fresh, dynamic, modern, clean Living Legacy brand that feels alive and welcomes all ages.
created: 2026-11-02
---

# A modern, living brand for Living Legacy

## Current shape
- **What:** Rethink Living Legacy’s colors and typography from a fresh starting point. Founder wants a fresh, dynamic, modern, clean feeling, alive and for all ages, with modern fonts. Existing colors and fonts are not constraints for exploration.
- **Who it's for:** People across ages capturing and revisiting unfolding stories with dear ones; see [venture intent](IDEA-001-living-legacy.md). No audience research is claimed.
- **Smallest version that proves it:** Proposed next step: compare new palette and modern sans-serif directions on the same representative screen, using desktop/mobile prototypes and screenshots. Founder reaction establishes aesthetic preference; it does not establish usability or cross-age accessibility.
- **What you're assuming:** A contemporary visual language can communicate warmth and connection while feeling energetic and approachable. This remains a design hypothesis.
- **Current decision:** The first four concepts were rejected. Story Room was initially promising but is no longer the preferred direction after viewing the concepts. Superseded by the November 2 provisional Cobalt + Citron selection below. No new font selected.

## Exploration notes
The rejected round included Sunday Morning, Life in Motion, Story Room, and Open Sky. The founder described the results as dated. The assistant interpreted paper textures, floral decoration, muted colors and serif typography as contributors; those specific causes are an interpretation, not separate founder requirements.

Assistant proposals for a new round, **not approved choices**:
- Electric blue + melon: white, vivid blue, soft orange and ink.
- Tangerine + aqua: off-white, bright orange, clear aqua and charcoal.
- Cobalt + citron: cool white, cobalt, yellow-green and graphite.
- Modern sans-serif candidates: Manrope or Space Grotesk; no font selected or tested.

[BRAND](../BRAND.md) and the [style guide](../design/STYLE_GUIDE.md) still describe the existing implementation. This exploration authorizes reconsidering that look; it does not imply that production tokens, fonts, application flows or assets have changed.

## Capture log
- 2026-11-02 — Founder: “lets step back lets ideate on a new palette for living legacy forget the exisiting colors and fonts”. Requested options, questions about sentiment, prototypes and screenshots.
- 2026-11-02 — Founder: “all 4 sound good story room seems most promising create sdcreen shots”. This was an initial preference before seeing the generated concepts.
- 2026-11-02 — Founder: “didnt like any of these . lets step back and re think lviing legacy brand colors . i want it to be fresh dynamic modern clean feeling alive and for all ages. I also need the font to be modern this looks dated”. This supersedes the initial Story Room preference.
- 2026-11-02 — Founder: “use boss to capture this as an idea for documentation”. Capture only; no build started.

## Open questions
- Should color appear mainly as bright accents on clean, calm surfaces, or be expressive throughout? Asked in conversation; not yet answered.
- Which palette and modern font direction best expresses the founder’s intended feeling?
- How will the selected direction perform for readability, contrast, focus visibility and mobile layouts across ages? Unverified until prototyped and checked.

## Prototype round 02 — November 2, 2026
- Branch: `feat/idea-002-modern-brand`; worktree: `.worktrees/idea-002-modern-brand`, based on fetched `origin/main` (`23d9270`).
- Self-contained sketch: `prototype/idea-002/index.html`. Three palettes share a representative capture screen, with accent/full-color and mobile layout switches. Synthetic content only; no persistence.
- Blue + Melon is the assistant recommendation for the next reaction, not founder approval. Tangerine + Aqua and Cobalt + Citron remain alternatives.
- Uses system sans-serif to isolate palette preference. Manrope/Space Grotesk comparison remains a later step; no external font is loaded or claimed tested.
- Existing production tokens and application files are unchanged. This record was the only unpublished dependency carried from the original checkout; its relative references resolve there but are not yet available on this branch.
- Next: founder compares palettes and coverage; then test typography in the preferred direction before specifying production changes.

## Approved color slice — November 2, 2026
Founder: “cobalt and citrine for now, update app exisitng with therses colors”. Provisional choice: prototype Cobalt + Citron. One-release color slice stays in IDEA-002.

Acceptance: existing web and mobile capture screens consume the new semantic palette; white/light neutral surfaces, cobalt actions/links, citron highlights; readable text and action pairs (4.5:1), visible keyboard focus; generated assets match tokens; workspace typechecks pass. No font, logo, capture behavior, auth, data or storage change. No money/destructive/authorization paths changed. Merge to main requires founder approval. Rendered browser/native and authenticated journeys must be reported separately from static checks.

Implementation: semantic web color migration carried as a reviewed dependency from the original checkout. Shared token generator now emits mobile color constants as well as web CSS. Legacy primitive names (e.g. `gold`) retained for compatibility, now resolve to cobalt. Original logo pixels and fonts unchanged.

Validation: workspace typechecks, generated web/mobile token consistency, diff whitespace and eight text/action contrast pairs passed (minimum 6.12:1 among checked pairs). Production compilation and static page generation passed with network access for existing fonts; full final build result recorded in handoff. Browser/native visual, keyboard and authenticated persistence are unverified.

Review: [PR #2](https://github.com/ashmishah24/living-legacy/pull/2), implementation `b0b002e`; full web build passed. Vercel previews pending at first inspection. Next: visual review and founder merge approval.
