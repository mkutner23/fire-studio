import { NextRequest, NextResponse } from "next/server";
import OpenAI from "openai";
import pdf from "pdf-parse";
import { z } from "zod";
import { FIRE_SYSTEM, COVERAGE_SCHEMA } from "@/lib/prompts";
import type { FireCoverage } from "@/lib/types";
import { getSupabaseAdmin } from "@/lib/supabase/server";

export const runtime = "nodejs";

const MAX_BYTES = 12 * 1024 * 1024;
const MAX_TEXT_CHARS = 110000;

const coverageSchema = z.object({
  title: z.string(),
  recommendation: z.enum(["GREENLIGHT", "DEVELOP", "PASS"]),
  fireScore: z.number().min(0).max(100),
  soulScore: z.number().min(0).max(100),
  logline: z.string(),
  executiveTake: z.string(),
  louder: z.string(),
  faster: z.string(),
  funnier: z.string(),
  deeper: z.string(),
  trailerMoment: z.string(),
  movieStarMoment: z.string(),
  producerBet: z.string(),
  brutalNote: z.string(),
  strengths: z.array(z.string()).max(8),
  risks: z.array(z.string()).max(8)
});

function safeJson(text: string) {
  const cleaned = text.trim().replace(/^```json\s*/i, "").replace(/```$/i, "");
  return JSON.parse(cleaned);
}

export async function POST(request: NextRequest) {
  try {
    if (!process.env.OPENAI_API_KEY) {
      return NextResponse.json(
        { error: "OPENAI_API_KEY is not configured." },
        { status: 500 }
      );
    }

    const form = await request.formData();
    const file = form.get("screenplay");

    if (!(file instanceof File)) {
      return NextResponse.json({ error: "Upload a PDF screenplay." }, { status: 400 });
    }

    if (file.type !== "application/pdf") {
      return NextResponse.json({ error: "Only PDF is supported in Vol. 1." }, { status: 400 });
    }

    if (file.size > MAX_BYTES) {
      return NextResponse.json({ error: "PDF must be 12 MB or smaller." }, { status: 400 });
    }

    const bytes = Buffer.from(await file.arrayBuffer());
    const parsed = await pdf(bytes);
    const text = parsed.text.trim();

    if (text.length < 1000) {
      return NextResponse.json(
        { error: "This PDF appears image-based or contains too little extractable text." },
        { status: 400 }
      );
    }

    const screenplay = text.slice(0, MAX_TEXT_CHARS);

    const client = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });
    const model = process.env.OPENAI_MODEL || "gpt-5";

    const response = await client.responses.create({
      model,
      store: false,
      instructions: FIRE_SYSTEM,
      input: `
Analyze this screenplay and return JSON matching this exact schema:

${COVERAGE_SCHEMA}

SCREENPLAY:
${screenplay}
`,
      max_output_tokens: 3000
    });

    const parsedJson = safeJson(response.output_text);
    const coverage = coverageSchema.parse(parsedJson) as FireCoverage;

    const supabase = getSupabaseAdmin();
    if (supabase) {
      await supabase.from("analyses").insert({
        filename: file.name,
        title: coverage.title,
        recommendation: coverage.recommendation,
        fire_score: coverage.fireScore,
        soul_score: coverage.soulScore,
        report: coverage
      });
    }

    return NextResponse.json({ coverage });
  } catch (error) {
    const message = error instanceof Error ? error.message : "Unexpected analysis failure.";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
