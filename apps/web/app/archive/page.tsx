import { auth } from "@clerk/nextjs/server";
import Link from "next/link";
import { redirect } from "next/navigation";
import { listMemories } from "../../lib/db";

export default async function ArchivePage() {
  const { userId } = await auth();
  if (!userId) redirect("/sign-in?redirect_url=/archive");
  const { archive, memories } = await listMemories(userId);
  return <main className="shell"><header className="header"><p className="eyebrow">Owner workspace</p><h1>{archive.name}</h1><p className="lede">Original sources remain distinct from any later transcript, refinement, or narrative selection.</p><Link className="primary-button" href="/">Preserve another source</Link></header><section className="memory-list" aria-label="Preserved sources"><h2>Preserved sources</h2>{memories.length === 0 ? <p>No sources yet. Start with your own words or a deliberate recording.</p> : memories.map((memory) => <article className="memory-card" key={memory.id}><p className="eyebrow">{memory.kind} · Source preserved</p>{memory.source_text ? <p>{memory.source_text}</p> : <p>{memory.source_name ?? "Original media"}</p>}<time dateTime={memory.created_at}>{new Date(memory.created_at).toLocaleString()}</time></article>)}</section></main>;
}
