create table if not exists archives (
  id text primary key,
  owner_user_id text not null,
  name text not null,
  created_at timestamptz not null default now()
);
create table if not exists archive_members (
  archive_id text not null references archives(id) on delete cascade,
  user_id text not null,
  role text not null check (role in ('owner', 'contributor', 'viewer')),
  primary key (archive_id, user_id)
);
create table if not exists memories (
  id text primary key,
  archive_id text not null references archives(id) on delete cascade,
  kind text not null check (kind in ('writing', 'voice', 'photo', 'video', 'file')),
  source_text text,
  source_name text,
  source_media_url text,
  content_type text,
  byte_size bigint,
  status text not null check (status in ('source_preserved', 'transcript_pending', 'refined', 'selected_for_narrative')),
  created_at timestamptz not null default now()
);
create index if not exists memories_archive_created_idx on memories (archive_id, created_at desc);
create table if not exists audit_events (
  id text primary key,
  archive_id text not null references archives(id) on delete cascade,
  actor_user_id text not null,
  event_type text not null,
  memory_id text references memories(id) on delete set null,
  created_at timestamptz not null default now()
);
