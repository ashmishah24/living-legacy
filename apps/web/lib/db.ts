import { neon } from "@neondatabase/serverless";

type Archive = { id: string; name: string };
export type Memory = { id: string; kind: string; source_text: string | null; source_name: string | null; created_at: string };

function databaseUrl() {
  const value = process.env.DATABASE_URL;
  if (!value) throw new Error("The archive database is not configured.");
  return value;
}

function sql() { return neon(databaseUrl()); }

export async function ensureOwnerArchive(userId: string): Promise<Archive> {
  const client = sql();
  const existing = await client`select id, name from archives where owner_user_id = ${userId} order by created_at asc limit 1` as Archive[];
  if (existing[0]) return existing[0];
  const archive = { id: crypto.randomUUID(), name: "My Living Legacy" };
  await client`insert into archives (id, owner_user_id, name) values (${archive.id}, ${userId}, ${archive.name})`;
  await client`insert into archive_members (archive_id, user_id, role) values (${archive.id}, ${userId}, 'owner')`;
  return archive;
}

export async function createWritingMemory(userId: string, text: string) {
  const archive = await ensureOwnerArchive(userId);
  const memory = { id: crypto.randomUUID(), createdAt: new Date().toISOString() };
  await sql()`insert into memories (id, archive_id, kind, source_text, status, created_at) values (${memory.id}, ${archive.id}, 'writing', ${text}, 'source_preserved', ${memory.createdAt})`;
  await sql()`insert into audit_events (id, archive_id, actor_user_id, event_type, memory_id, created_at) values (${crypto.randomUUID()}, ${archive.id}, ${userId}, 'source_preserved', ${memory.id}, ${memory.createdAt})`;
  return memory;
}

export async function listMemories(userId: string): Promise<{ archive: Archive; memories: Memory[] }> {
  const archive = await ensureOwnerArchive(userId);
  const memories = await sql()`select id, kind, source_text, source_name, created_at from memories where archive_id = ${archive.id} order by created_at desc` as Memory[];
  return { archive, memories };
}
