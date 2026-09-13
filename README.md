# Living Legacy

Private, source-preserving family memories built from a single TypeScript monorepo for web, iOS, and Android.

The build begins with owner-led story stitching: capture a source, retain it intact, optionally derive a transcript or labelled refinement, and let the owner select approved sources for a private unpublished narrative draft.

See [the implementation plan](docs/architecture-and-delivery-plan.md) for architecture, release sequence, safeguards, and domain connection steps.

For counsel and a prior-art search, see the [candidate patent-positioning one-pager](docs/patent-positioning-one-pager.md). It is not legal advice and does not predict patent grant.

## Current status

The repository foundation is intentionally independent of the prior hosted application. The web project is connected to Vercel, Clerk, and Neon. Clerk protects the archive and source-writing API; Neon schema is tracked at `apps/web/db/schema.sql`. Apply that schema before the first production archive run. Private media upload needs a Blob-compatible object store before voice, photo, video, and files can be preserved server-side.
