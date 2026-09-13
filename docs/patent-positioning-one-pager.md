# Living Legacy — candidate patent position (one page)

**Purpose.** This is an invention-positioning brief for counsel and a prior-art search, not a legal opinion or a prediction that a patent will issue. Patentability depends on claims, prior art, disclosure, and examination. For software, the application must describe a concrete technical implementation and the claims must be supported by the specification; novelty and non-obviousness remain separate requirements. See the USPTO’s [application guidance](https://www.uspto.gov/patents/basics/apply), [written-description guidance](https://www.uspto.gov/web/offices/pac/mpep/s2161.html), and [subject-matter eligibility guidance](https://www.uspto.gov/web/offices/pac/mpep/s2106.html).

## Candidate invention

**A source-preserving, manifest-gated system for turning asynchronous multimodal autobiographical contributions into reviewable narrative outputs without permitting derivatives, inferred context, or external transformations to replace or bypass the original source.**

The candidate differentiator is **not** “AI writes family stories,” “a family tree,” “voice transcription,” or “cloud storage.” Each is likely known on its own. The potentially protectable technical combination is a data-and-workflow architecture that:

1. accepts a deliberately chosen voice, photo, video, writing, or file input through a capture state machine;
2. durably persists and acknowledges the original source object plus integrity/provenance metadata *before* any transcription, AI refinement, association, or output request;
3. stores every transcript, refinement, contextual assertion, and narrative representation as a separately addressable, source-linked child record rather than overwriting the source;
4. applies source-scoped eligibility rules spanning authorship, consent, owner review, rights, and revocation;
5. creates an immutable, versioned manifest of only the eligible selected representations; and
6. allows a downstream narrative or provider adapter to consume only that manifest, records the request/output lineage, and quarantines the result pending owner review.

## Technical problem and technical result

Existing consumer memory apps tend to organize media, transcribe it, or generate text, but a later derivative can obscure the original, a contributor’s rights can be lost across processing steps, and external model calls can receive a broader or altered data set than a user approved. Living Legacy uses durable source acknowledgements, independently addressable lineage edges, eligibility evaluation, and immutable manifests to make an asynchronous multi-device archive recoverable and auditable across processing failures, revisions, and consent changes.

The resulting technical effects are: (a) original media remains accessible after failed or changed downstream processing; (b) every derivative can be traced to precise source versions; (c) a revocation or rejection can be evaluated against known manifests and output records; and (d) an adapter is mechanically limited to an owner-approved subset rather than a general archive. This framing is stronger than claiming a business rule or “use AI to summarize,” because it describes a concrete data pipeline and access-control mechanism. The USPTO evaluates a computer-implemented claim as a whole and recognizes practical applications or technology improvements; merely using a generic computer for an abstract idea is not enough. [USPTO MPEP §2106](https://www.uspto.gov/web/offices/pac/mpep/s2106.html)

## Claiming themes for counsel

- **Independent system/method claim:** capture state machine → immutable source persistence/acknowledgement → derivative lineage creation → eligibility evaluation → immutable manifest → constrained transformation request and output quarantine.
- **Dependent claims:** checksum/object key/media receipt; transcript failure state that preserves playback; source-version identifiers; assertion confidence/evidence excerpts; one-time contributor token with pending-review exclusion; manifest invalidation on consent/review change; per-request rights/cost/model/region validation; audit events and exportable lineage graph.
- **Alternative embodiments:** web/mobile capture; private object storage plus relational graph; direct/resumable upload; queue-based transcription; cloud-vendor-neutral adapters. Do not tie the invention to Gemini, Veo, Vercel, or a particular database unless that implementation is itself inventive.

## Evidence to preserve now

Keep dated design diagrams, state transitions, schema/migration history, architecture notes, source code, test logs, and prototype captures that prove: source-first persistence; non-destructive derivative lineage; eligibility filtering; immutable manifest generation; and provider-boundary quarantine. Identify each inventor and their contribution before any filing. Avoid making a public technical disclosure until patent counsel has set a filing strategy.

## Patentability assessment and next step

**Preliminary view:** there is a credible *technical differentiation hypothesis*, especially around the interaction of source durability, provenance graph, eligibility filtering, and manifest-gated transformations. There is not enough evidence yet to say it is novel or non-obvious. Commission a focused prior-art search around “provenance-preserving multimedia archive,” “consent/rights-gated AI transformation,” “immutable source manifest,” and “derivative lineage with revocable eligibility,” then have a registered patent attorney draft claims around the specific state transitions, data structures, and failure/revocation behavior that survive that search.
