# Component index

Inspect the existing implementation before creating a new component. Match its job, not its appearance. Entries describe current code; no shared UI package is claimed.

| Component / pattern | Path | Job | Status |
|---|---|---|---|
| CaptureStarter | apps/web/app/capture-starter.tsx | Format selection, writing, local media capture/preview | existing; durability/review gaps remain |
| AccountNavigation | apps/web/app/account-navigation.tsx | Account and brand navigation | existing |
| Archive page/cards | apps/web/app/archive/page.tsx | Owner archive listing | existing; authenticated DB flow unverified |
| Sign-in/sign-up routes | apps/web/app/sign-in and sign-up | Clerk authentication surfaces | integrated; browser auth unverified |
| Button/card/field CSS patterns | apps/web/app/styles.css | Shared web visual treatment | existing styles, not standalone components |
| Mobile home | apps/mobile/app/index.tsx | Branded capture starter | starter; functional capture/auth unbuilt |

Before extracting a shared component, demonstrate reuse. System UI must not import product features; product features must not reach into unrelated feature internals. No forced folder rebuild is needed for the current small app.

## Reuse and styling contracts — November 2, 2026

| Existing pattern | Reuse entry | Visual / behavior contract |
|---|---|---|
| CaptureStarter | `import { CaptureStarter } from "./capture-starter"` (home route) | Owns format state, textarea, readiness, recorder/picker and review summary; keep source flow together |
| AccountNavigation | `import { AccountNavigation } from "./account-navigation"` | Existing logo and signed-in/out navigation; Clerk owns UserButton |
| Picker / Recorder | Private functions in capture-starter.tsx | Reuse within CaptureStarter; not exported general components |
| Primary / stop / text actions | `.primary-button`, `.danger-button`, `.text-button` | Same shared class treatments for buttons/links; stop color means stop recording, not a generic error |
| Capture / inset / notice | `.capture`, `.recorder`, `.file-picker`, `.review`, `.notice` | Main panel → inset controls → semantic notice; errors/info currently share notice styling |
| Choice tiles | `.choice-grid`, `.choice` | Native buttons; click opens the chosen format rather than maintaining a selected tile |
| Archive cards | `.memory-list`, `.memory-card` | Reading-width list with original text and timestamp; no edit/delete/share control built |
| Clerk widgets | SignIn / SignUp from @clerk/nextjs | Provider-owned internals; no local shared authentication form |

See [style guide](STYLE_GUIDE.md) for state gaps and [inventory](STYLE_INVENTORY.md) for exact current declarations. This is an authored index, not an automatically enforced component registry. Reuse first, extend second, create last. Add a row with each new component; do not create separate action components just to vary appearance.

## IDEA-002 color update — November 2, 2026
The inherited forest/gold observations above are historical. Current provisional palette is Cobalt + Citron: cool white surfaces, graphite text, cobalt controls/links and citron eyebrow highlights. Web CSS consumes semantic tokens; mobile consumes generated `app/colors.ts` from the same source. Existing typography, logo and component behavior remain. All interactive web elements have an explicit cobalt focus outline. Static contrast checks do not replace rendered/device testing.
