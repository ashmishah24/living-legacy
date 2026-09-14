import { CaptureStarter } from "./capture-starter";
import { AccountNavigation } from "./account-navigation";
import Image from "next/image";

export default function HomePage() {
  return (
    <main className="shell">
      <AccountNavigation />
      <header className="header">
        <Image alt="Living Legacy — Your story lives on" className="hero-logo" height={280} priority src="/brand/living-legacy-logo.png" width={280} />
        <p className="eyebrow">Your story lives on</p>
        <h1>Keep the original moment close.</h1>
        <p className="lede">A private, enduring place to capture memories in the form they were first shared.</p>
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
