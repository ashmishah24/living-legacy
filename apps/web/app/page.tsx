import { CaptureStarter } from "./capture-starter";
import { AccountNavigation } from "./account-navigation";

export default function HomePage() {
  return (
    <main className="shell">
      <AccountNavigation />
      <header className="header">
        <p className="eyebrow">Private family archive</p>
        <h1>Keep the original moment close.</h1>
        <p className="lede">Capture a memory now. Add context and shape the story only when you are ready.</p>
      </header>
      <CaptureStarter />
      <section className="principles" aria-label="Living Legacy principles">
        <article><h2>Source first</h2><p>Original media and words are retained before any transcript or refinement.</p></article>
        <article><h2>Reviewable context</h2><p>People, places, timing, and AI suggestions remain separate from source evidence.</p></article>
        <article><h2>Owner-gated legacy</h2><p>Nothing becomes part of a narrative draft without the archive owner’s decision.</p></article>
      </section>
    </main>
  );
}
