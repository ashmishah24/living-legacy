/**
 * Source-first rules shared by web, iOS, and Android.
 * A derivative is always a separate record and can never overwrite a source.
 */
export type CaptureKind = "voice" | "writing" | "photo" | "video" | "file";
export type TimingPrecision = "exact" | "month" | "year" | "approximate" | "unknown";
export type ReviewStatus = "draft" | "pending_owner_review" | "approved" | "rejected";
export type TranscriptStatus = "not_applicable" | "pending" | "processing" | "ready" | "failed";

export interface SourceMemory {
  id: string;
  archiveId: string;
  authorId: string;
  subjectProfileIds: string[];
  kind: CaptureKind;
  originalText?: string;
  attachmentIds: string[];
  capturedAt: string;
  occurredAt?: string;
  timingPrecision: TimingPrecision;
  placeContext?: string;
  reviewStatus: ReviewStatus;
  createdAt: string;
}

export interface Attachment {
  id: string;
  memoryId: string;
  objectKey: string;
  mimeType: string;
  byteSize: number;
  originalFilename?: string;
  checksum: string;
  createdAt: string;
}

export interface Transcript {
  id: string;
  memoryId: string;
  attachmentId: string;
  status: TranscriptStatus;
  text?: string;
  failureReason?: string;
  createdAt: string;
}

export interface Refinement {
  id: string;
  sourceMemoryId: string;
  sourceTranscriptId?: string;
  label: "ai_refinement" | "editorial_note";
  body: string;
  createdBy: "owner" | "system";
  createdAt: string;
}

export interface NarrativeManifest {
  id: string;
  archiveId: string;
  selectedMemoryIds: string[];
  selectedRepresentationIds: string[];
  createdBy: string;
  createdAt: string;
}

export function canEnterNarrative(memory: SourceMemory): boolean {
  return memory.reviewStatus === "approved";
}

export function validateSourceMemory(memory: SourceMemory): string[] {
  const errors: string[] = [];
  if (!memory.authorId) errors.push("A source memory must retain an author.");
  if (!memory.capturedAt) errors.push("A source memory must retain its capture time.");
  if (!memory.originalText && memory.attachmentIds.length === 0) {
    errors.push("A source memory needs original text or at least one preserved attachment.");
  }
  return errors;
}

