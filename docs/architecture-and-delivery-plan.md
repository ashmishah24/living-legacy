# Living Legacy — implementation plan

## Product decision

Living Legacy is a private, source-preserving family archive. The system must retain original voice, photo, video, writing, and file contributions as independently addressable evidence. Context, transcriptions, AI refinements, relationships, and biography drafts are separate records with traceable lineage. No contribution may enter a narrative or external output without owner approval.

The prior Vercel package is not a source repository: it is a static Vite export whose API, storage, and authentication rewrites point to Manus. It must not be deployed or extended.

## Single-repository architecture

```
living-legacy/
├── apps/web       Next.js web experience; deployed to Vercel
├── apps/mobile    Expo / React Native app; produces iOS and Android builds
├── packages/core  domain rules and types shared by all clients
├── packages/ui    shared design tokens and portable components (next build step)
├── packages/api   authenticated API client and validators (next build step)
└── docs           product, data, and delivery decisions
```

Use TypeScript and pnpm workspaces. Expo gives one mobile codebase for iOS and Android while allowing native microphone, camera, photo-library, and file-picker integrations. Next.js provides the responsive browser experience and Vercel deployment. The applications share domain rules, validation, API contracts, and design tokens; native controls remain platform-specific.

## Production spine

1. **Identity and tenancy:** passwordless/social identity provider plus archive membership roles. The account owner is the only role with membership, source-inclusion, narrative-selection, and output authority.
2. **Database:** PostgreSQL with archive IDs on every tenant-owned record and database-enforced row-level access. Start with a Vercel-integrated Postgres provider after the Vercel project is linked; keep schema and migrations provider-neutral.
3. **Media:** private object storage through short-lived, server-issued upload URLs. Store checksum, MIME type, byte count, origin, and immutable object key. Browser and mobile clients never receive a storage write secret.
4. **Async work:** a durable queue for transcription and thumbnails. Persist media before requesting transcription; a failure leaves playable/downloadable original media and a recoverable failure state.
5. **Audit controls:** append-only events for capture, approval, rejection, invite use, source selection, and export/output requests. No automatic publishing or paid external rendering in Release 1.

## Release 1 — Use Case 1: owner-led story stitching

The source-first flow is the initial production scope:

1. Owner deliberately selects voice, writing, photo, video, or file.
2. Client creates a capture session and uploads original data directly to private storage.
3. Server verifies the upload, writes `Memory` and `Attachment` records atomically, and returns an immutable source receipt.
4. For audio, a worker creates a separately stored transcript. It reports `pending`, `processing`, `ready`, or `failed`; the audio never disappears.
5. Owner may request a labelled refinement. The refinement records its exact source memory/transcript and is never written back into the original.
6. Owner reviews approved sources, establishes their order, and saves an immutable narrative manifest and an editable unpublished draft.

### First vertical-slice acceptance criteria

- A web, iOS, or Android user can create a written memory and see it immediately in their archive.
- A user can capture or choose an audio file, see upload progress, and play the original after reload.
- A queued transcript always has a visible honest state and does not block playback.
- A refinement is visibly labelled and links back to its original; editing it cannot modify the original source.
- Only owner-approved memories may be added to a narrative manifest.
- The same archive and source data appear on web and mobile after sign-in.
- Keyboard, screen-reader labels, small-screen layout, offline retry, and cancellation paths are tested.

## Later use cases

**Use Case 2 — invited collaboration.** One-time expiring contribution link; contributor sees only their submission surface; explicit consent and attribution; contribution stays pending and ineligible until the owner decides.

**Use Case 3 — video biography.** A feature-flagged, server-only provider adapter. It can receive only an immutable, owner-approved manifest that passes consent, rights, model/region, and budget gates. Store request metadata and quarantine all results until review. It is not part of Release 1.

## Delivery sequence

| Milestone | Outcome | Release gate |
| --- | --- | --- |
| Foundation | Clean GitHub repository, monorepo, Vercel project, domain plan, environment template | No Manus URL, rewrite, credential, or code remains |
| Capture vertical slice | Auth, archive, writing and audio capture, private upload, playback | Original persists even if transcription fails |
| Story stitching | Review queue, labelled refinement, source selection, draft manifest | No unapproved source is selectable |
| Hardening | Audit events, deletion/export policy, backup/recovery, monitoring, accessibility/mobile acceptance | Privacy and recovery reviewed |
| Use Case 2 | Expiring restricted invitations and owner review | No archive browsing by invitee |
| Use Case 3 | Feature-flagged output adapter and quarantine workflow | Rights, consent, cost, and output approval enforced |

## Domain connection plan

1. Create and link the new Vercel web project from `apps/web` only after the repository exists.
2. Add `yourlivinglegacy.org` and `www.yourlivinglegacy.org` in Vercel; choose the canonical host and redirect the other host.
3. In Namecheap, use the exact DNS records Vercel presents. Do not change the existing records until the new production deployment passes verification.
4. Configure iOS Universal Links and Android App Links after the canonical host serves a verified association file. These are app-release settings, not a reason to expose private archive data publicly.

## Decisions needed before external setup

- GitHub owner/organization and whether the new repository is private (recommended).
- The sign-in method: email magic link, Google/Apple, or both.
- Data residency and privacy requirements, which decide whether Vercel-integrated storage is acceptable for Release 1 or GCP storage must be used from day one.
- Apple Developer and Google Play Console account access for native store distribution. Web can ship first without them.

