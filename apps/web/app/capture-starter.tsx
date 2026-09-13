"use client";

import { ChangeEvent, useEffect, useRef, useState } from "react";
import { useAuth } from "@clerk/nextjs";
import type { CaptureKind } from "@living-legacy/core";

const choices: { kind: CaptureKind; title: string; description: string }[] = [
  { kind: "voice", title: "Voice", description: "Record a memory in your own words." },
  { kind: "writing", title: "Writing", description: "Write a note, letter, or remembered detail." },
  { kind: "photo", title: "Photo", description: "Take or choose a photo deliberately." },
  { kind: "video", title: "Video", description: "Record or choose a video when you decide." },
  { kind: "file", title: "File", description: "Preserve a document or other original record." },
];

export function CaptureStarter() {
  const { isSignedIn } = useAuth();
  const [kind, setKind] = useState<CaptureKind | null>(null);
  const [text, setText] = useState("");
  const [asset, setAsset] = useState<{ file: File; url: string } | null>(null);
  const [recording, setRecording] = useState(false);
  const [notice, setNotice] = useState("");
  const [saving, setSaving] = useState(false);
  const recorder = useRef<MediaRecorder | null>(null);
  const stream = useRef<MediaStream | null>(null);
  const liveVideo = useRef<HTMLVideoElement | null>(null);
  useEffect(() => () => { stream.current?.getTracks().forEach((t) => t.stop()); if (asset) URL.revokeObjectURL(asset.url); }, [asset]);
  const selectFile = (event: ChangeEvent<HTMLInputElement>) => { const file = event.target.files?.[0]; if (file) setAsset({ file, url: URL.createObjectURL(file) }); };
  const start = async () => {
    if (kind !== "voice" && kind !== "video") return;
    try {
      const media = await navigator.mediaDevices.getUserMedia({ audio: true, video: kind === "video" }); stream.current = media;
      if (kind === "video" && liveVideo.current) { liveVideo.current.srcObject = media; await liveVideo.current.play(); }
      const chunks: BlobPart[] = []; const next = new MediaRecorder(media);
      next.ondataavailable = (e) => e.data.size && chunks.push(e.data);
      next.onstop = () => { const blob = new Blob(chunks, { type: next.mimeType || `${kind}/webm` }); const file = new File([blob], `${kind}-${Date.now()}.webm`, { type: blob.type }); setAsset({ file, url: URL.createObjectURL(file) }); media.getTracks().forEach((t) => t.stop()); };
      recorder.current = next; next.start(); setRecording(true);
    } catch { setNotice("Camera or microphone permission was not granted. Check browser permissions or choose an existing file."); }
  };
  const stop = () => { recorder.current?.stop(); setRecording(false); };
  const preserve = async () => {
    if (!isSignedIn) { window.location.assign("/sign-in?redirect_url=/"); return; }
    if (kind !== "writing") { setNotice("Private media storage is being connected. Your recording remains only on this device until private upload is ready."); return; }
    setSaving(true); setNotice("");
    try {
      const response = await fetch("/api/memories", { method: "POST", headers: { "content-type": "application/json" }, body: JSON.stringify({ kind, text }) });
      if (!response.ok) throw new Error("Unable to preserve this source.");
      window.location.assign("/archive");
    } catch (error) { setNotice(error instanceof Error ? error.message : "Unable to preserve this source."); }
    finally { setSaving(false); }
  };
  const ready = kind === "writing" ? text.trim().length > 0 : Boolean(asset);
  if (!kind) return <section className="capture" aria-labelledby="capture-heading"><p className="eyebrow">Begin a source</p><h2 id="capture-heading">What would you like to preserve?</h2><p className="capture-intro">Nothing is saved until you review this source and choose to preserve it.</p><div className="choice-grid">{choices.map((choice) => <button className="choice" key={choice.kind} onClick={() => setKind(choice.kind)} type="button"><strong>{choice.title}</strong><span>{choice.description}</span></button>)}</div></section>;
  return <section className="capture" aria-labelledby="capture-heading"><div className="capture-top"><div><p className="eyebrow">New {kind} source</p><h2 id="capture-heading">Keep the original first.</h2></div><button className="text-button" onClick={() => { setKind(null); setAsset(null); setText(""); }} type="button">Cancel</button></div>
    {kind === "writing" && <label className="field"><span>Your original words</span><textarea onChange={(e) => setText(e.target.value)} placeholder="Write exactly what you want to preserve." rows={10} value={text} /></label>}
    {kind === "voice" && <Recorder asset={asset} label="Voice recording" recording={recording} start={start} stop={stop} onFile={selectFile} />}
    {kind === "video" && <Recorder asset={asset} label="Video recording" recording={recording} start={start} stop={stop} onFile={selectFile} videoRef={liveVideo} />}
    {kind === "photo" && <Picker accept="image/*" asset={asset} label="Take or choose a photo" onFile={selectFile} />}
    {kind === "file" && <Picker asset={asset} label="Choose a file" onFile={selectFile} />}
    {asset && kind === "photo" && <img alt="Selected source preview" className="preview" src={asset.url} />}{asset && kind === "file" && <p>Selected: {asset.file.name}</p>}
    {notice && <p className="notice" role="alert">{notice}</p>}<div className="review"><div><strong>{ready ? "Source ready to review" : "Complete the original source"}</strong><p>Secure save requires authentication and private storage. This source stays on this device until then.</p></div><button className="primary-button" disabled={!ready || saving} onClick={preserve} type="button">{saving ? "Preserving…" : "Review before preserving"}</button></div></section>;
}
function Picker({ accept, asset, label, onFile }: { accept?: string; asset: { file: File; url: string } | null; label: string; onFile: (e: ChangeEvent<HTMLInputElement>) => void }) { return <label className="file-picker"><strong>{label}</strong><span>No device library is accessed until you select a file.</span><input accept={accept} onChange={onFile} type="file" />{asset && accept?.startsWith("image") ? <img alt="Selected source preview" className="preview" src={asset.url} /> : null}</label>; }
function Recorder({ asset, label, recording, start, stop, onFile, videoRef }: { asset: { file: File; url: string } | null; label: string; recording: boolean; start: () => void; stop: () => void; onFile: (e: ChangeEvent<HTMLInputElement>) => void; videoRef?: React.RefObject<HTMLVideoElement | null> }) { const video = Boolean(videoRef); return <div className="recorder"><strong>{label}</strong><p>{recording ? "Recording now. Stop when you are ready." : asset ? "Recording ready for review." : "Start a deliberate recording or choose a file."}</p>{recording && video ? <video autoPlay className="preview" muted playsInline ref={videoRef} /> : null}<button className={recording ? "danger-button" : "primary-button"} onClick={recording ? stop : start} type="button">{recording ? "Stop and review" : `Start ${video ? "video" : "recording"}`}</button><label>Or choose a file<input accept={video ? "video/*" : "audio/*"} onChange={onFile} type="file" /></label>{asset && (video ? <video className="preview" controls src={asset.url} /> : <audio controls src={asset.url} />)}</div>; }
