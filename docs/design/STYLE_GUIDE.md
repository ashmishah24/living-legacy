# Style guide — Living Legacy

This records inherited design and intended interaction rules. It does not certify accessibility or complete feature behavior.

## Design principles

- Source clarity over polished ambiguity: label original and derived material separately, even when the screen needs more explanation.
- Deliberate capture over invisible convenience: request device access after a clear action; no automatic recording.
- Honest progress over apparent success: “Saved” requires verified durability. A local preview stays labelled local.
- Familiarity over cosmetic churn: retain existing forest green, gold, cream and type pairing while token migration proceeds.

## States

| State | Rule |
|---|---|
| Default | Clear action and readable source/derivative label |
| Hover/focus | Visible focus; hover alone never reveals essential information |
| Active/selected | Explain selection through text/semantics as well as color |
| Disabled | State why unavailable; prevent duplicate submission where appropriate |
| Empty | Explain the next deliberate capture action without claiming saved content |
| Loading/error/success | Preserve recoverable edits; announce meaningful status; distinguish upload from verification |

## Terminology

| Use | Avoid | Reason |
|---|---|---|
| Original / source | AI output described as original | Preserve provenance |
| Local preview | Saved for temporary browser media | Preview is not persistence |
| Review | Review label on an immediate save | Action must match behavior; current UI gap remains |
| Private draft | Published for a generated draft | Drafting grants no sharing permission |

## Accessibility and layout

Retain responsive web layout and native controls. Check keyboard/focus, screen-reader labels, zoom/reflow, touch targets, contrast, permission denial, cancellation and unsupported formats on actual target devices. Text over gradients needs rendered inspection; color tokens alone do not prove it. Do not autoplay or rely on color alone. No new accessibility pass is claimed this session.

## Do / Don't

Do label local preview at the preview. Don't call it preserved before storage verification.
Do reuse existing capture/account patterns. Don't create a second styled button family for one page.

See [screen requirements](../specs/screens-and-accessibility.md) for intended flows and [glossary](../product/glossary.md) for domain language.

## Evidence and scope

Updated November 2, 2026 using BOSS `/design-tokens-init` against the active Next.js and Expo source. Visual choices below are **observed**, not founder-approved redesign decisions. The [complete source inventory](STYLE_INVENTORY.md) captures authored web declarations and mobile styles, including values that have not yet migrated to tokens. Product intent comes from [IDEA-001](../ideas/IDEA-001-living-legacy.md) and its canvas; no customer design research is claimed.

## The signature

**Observed:** deep forest surfaces with a top-lit green gradient, cream reading text, a gold gradient primary action, and Fraunces display headings. The capture panel has a larger radius and shadow than inset controls. Preserve these existing relationships when extending a screen; a neighboring family-history product could share these conventions, so distinctiveness has not been validated with users.

## Type roles

| Role | Face | Use | Treatment observed on web |
|---|---|---|---|
| Display | Fraunces, serif fallback | h1, h2, choice titles, brand name, recorder/file headings | Weight 500; heading tracking −.03em |
| Body / UI | Nunito Sans, sans-serif fallback | Prose, form fields, navigation and buttons | Inherited default size; emphasis 800 |
| Eyebrow | Body family | Section introductions | .76rem, 800, uppercase, .18em tracking |
| Mono | None authored | No current role | Do not introduce one without a use case |

Web h1 scales from 3rem to 5.25rem with 7vw and .97 line height; h2 scales from 1.8rem to 2.65rem with 3vw and 1.05 line height. Introductory prose is 1.15rem / 1.7. Choice helper text is .88rem / 1.45. Mobile uses platform `serif` display and native body text, with a 43/46 title and 17/25 introduction; it does not load the web families. Font scaling and real-device rendering remain unverified.

## Spacing, radius and elevation

**Observed:** web has no uniform mathematical spacing scale. Common gaps are .8rem and 1rem; sections often use 1.25rem or 1.5rem; the capture panel starts 3.5rem below the header. Preserve existing values during capture rather than regularizing them silently.

- Controls use .75rem corners, inset panels and choices 1rem, capture panel 1.5rem. Archive cards use 16px, which equals 1rem only at a 16px root size.
- The capture panel alone uses a large `0 18px 45px` black shadow at alpha 136/255. Choice hover/focus/selected shares a 3px gold halo at alpha 42/255.
- Web primary actions have a 2.75rem minimum height; choice tiles have a 125px minimum height. These source values do not certify touch-target compliance at every zoom or font setting.
- Mobile uses a 24-unit page inset and 58-unit top padding, 16-unit page gap, 22-unit main-card radius, 14-unit choice radius and 12-unit editor/action radius. Safe-area handling is not implemented by this screen.

## Layout

| Slot | Observed implementation |
|---|---|
| Frame | Centered shell: `min(100% - 2rem, 1080px)`; header and archive reading width capped at 760px |
| Hierarchy | Brand/account navigation → large introduction → capture panel → three source principles |
| Grid | Capture choices auto-fit columns at least 175px; principles use three equal columns |
| Responsive | At 680px and below, principles stack, shell padding reduces and brand text hides |
| Inset content | Capture top/review use flex with 1rem gap and space-between; no authored narrow-screen wrap rule |
| Auth | Full-height centered provider widget on the forest radial background |

Mobile is a ScrollView with vertically stacked choice rows. Treat narrow review-row overflow, long labels, localization, keyboard insets, zoom and safe areas as review work. No device or browser layout pass is claimed.

## Logo

Use the existing PNG paths recorded in [BRAND](../BRAND.md); retain proportions and accessible product naming. Web renders the mark at 54px square; mobile at 56 logical units. Both give it a circular gold border. Web hides the adjacent name below its breakpoint. These are observed sizes, not approved minimum sizes. Clear space, print reproduction, alternate backgrounds/colorways, licensing and vector artwork remain unresolved. Do not invent a replacement mark during component work.

## Icons and motion

No project-owned icon set is established. Mobile uses text `‹` and `›`; media controls are browser/native UI and account controls come from Clerk. No authored transitions or decorative animation were found. New motion should honor reduced-motion preferences. The live muted video is an intentional recording preview and is distinct from decorative autoplay.

## Five states — observed and gaps

| Pattern | Default | Hover / focus | Active / selected | Disabled | Empty |
|---|---|---|---|---|---|
| Source choice | Inset green tile, highlighted title | Gold border and halo | `.selected` style exists but is not applied by CaptureStarter; click changes view | No authored state | Initial format chooser |
| Primary action | Gold gradient, dark ink | Browser default; no custom rule | No custom web rule | .5 opacity, not-allowed cursor; capture disables until ready or while saving | Review summary requests original source |
| Text action | Gold emphasized text | Browser default | No custom rule | No authored rule | Not applicable |
| Stop recording | Terracotta action, white text | Browser default | Recording label changes | No authored rule | Not applicable |
| Input / textarea | Inset green, cream text, rounded border | Browser default | Browser editing state | No authored rule | Writing placeholder / file prompt |
| Archive | Source cards | Links retain browser defaults | No card selection | Not applicable | “No sources yet. Start with your own words or a deliberate recording.” |

Mobile primary action supplies .8 pressed opacity and .45 disabled opacity. The web saving label is “Preserving…”. Notices use `role="alert"`; mobile uses a polite live region. Error, warning and informational web notices currently share one visual treatment. A shared selected/focus style does not distinguish those states by itself. Requirement for new controls: name and review default, hover/focus, active/selected, disabled and empty behavior explicitly; preserve native keyboard focus until an accessible replacement is verified.

## Voice and tone

Proposed voice remains warm, calm, respectful and precise. Prefer plain over clever (less novelty), honest over reassuring (more explicit limits), and invitational over urgent (less conversion pressure). No mortality pressure or guilt.

| Context | Observed string / gap | Guidance |
|---|---|---|
| Default | “What would you like to preserve?” | Invite one deliberate choice |
| Loading | “Preserving…” | Name the current operation |
| Permission error | “Camera or microphone permission was not granted. Check browser permissions or choose an existing file.” | Explain the next available action |
| Preview | “Recording ready for review.” | Readiness must not imply durable storage |
| Empty | “No sources yet. Start with your own words or a deliberate recording.” | Offer a concrete next step |
| Success | Writing navigates to archive; no separate confirmed-success message | Do not invent a shipped success notification |
| Destructive confirm | No deletion flow built | Future confirmation must name the consequence |

Existing “Review before preserving” currently invokes writing save, so a distinct review step remains a product gap. Existing original-preservation/privacy language expresses direction; media persistence and full safeguards remain unverified or unbuilt. Future AI-generated copy must follow the same voice and explicitly identify derivatives.

## Accessibility floor

For new UI: visible keyboard focus, programmatic labels, meaningful status announcements, no meaning conveyed by color alone, readable reflow and scalable text. Review token contrast pairs against the project's accessibility targets (body 4.5:1, large text 3:1) and verify gradient endpoints and rendered controls. No contrast or screen-reader certification is implied by this capture. Check disabled explanations, file cancellation, denied permissions and unsupported capture on target browsers/devices.

## Exceptions

| Date | Where | What | Why |
|---|---|---|---|
| 2026-11-02 | Existing web layout and mobile styles | Literal spacing/type/layout values remain | This task captures current design; a broader migration needs visual comparison |
| 2026-11-02 | Web viewport metadata | Light theme color differs from the forest page | Retained as an observed mismatch, pending design review |

## IDEA-002 color update — November 2, 2026
The inherited forest/gold observations above are historical. Current provisional palette is Cobalt + Citron: cool white surfaces, graphite text, cobalt controls/links and citron eyebrow highlights. Web CSS consumes semantic tokens; mobile consumes generated `app/colors.ts` from the same source. Existing typography, logo and component behavior remain. All interactive web elements have an explicit cobalt focus outline. Static contrast checks do not replace rendered/device testing.
