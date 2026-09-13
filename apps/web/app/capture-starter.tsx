"use client";

import { useState } from "react";
import type { CaptureKind } from "@living-legacy/core";

const choices: Array<{ kind: CaptureKind; title: string; description: string }> = [
  { kind: "voice", title: "Voice", description: "Record a memory in your own words." },
  { kind: "writing", title: "Writing", description: "Save a note, letter, or remembered detail." },
  { kind: "photo", title: "Photo", description: "Select a photo deliberately, with no background access." },
  { kind: "video", title: "Video", description: "Record or choose a clip when you decide." },
  { kind: "file", title: "File", description: "Preserve a document or other original record." },
];

export function CaptureStarter() {
  const [selected, setSelected] = useState<CaptureKind | null>(null);
  const choice = choices.find((item) => item.kind === selected);

  return (
    <section className="capture" aria-labelledby="capture-heading">
      <div><p className="eyebrow">Begin a source</p><h2 id="capture-heading">What would you like to preserve?</h2></div>
      <div className="choice-grid">
        {choices.map((item) => <button className={selected === item.kind ? "choice selected" : "choice"} key={item.kind} onClick={() => setSelected(item.kind)} type="button" aria-pressed={selected === item.kind}><strong>{item.title}</strong><span>{item.description}</span></button>)}
      </div>
      {choice ? <div className="next-step" role="status"><strong>{choice.title} selected.</strong> The production flow will save the original first, then offer optional processing. <button onClick={() => setSelected(null)} type="button">Choose another</button></div> : null}
    </section>
  );
}

