import { auth } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";
import { createWritingMemory } from "../../../lib/db";

export async function POST(request: Request) {
  const { userId } = await auth();
  if (!userId) return NextResponse.json({ error: "Sign in is required." }, { status: 401 });
  const body = await request.json().catch(() => null) as { kind?: string; text?: string } | null;
  const text = body?.text?.trim();
  if (body?.kind !== "writing" || !text) return NextResponse.json({ error: "A writing source is required." }, { status: 400 });
  if (text.length > 100_000) return NextResponse.json({ error: "This source is too long to preserve at once." }, { status: 413 });
  try { return NextResponse.json(await createWritingMemory(userId, text), { status: 201 }); }
  catch { return NextResponse.json({ error: "The archive could not be reached. Please try again." }, { status: 503 }); }
}
