"use client";

import { FormEvent, useState } from "react";
import type { FireCoverage } from "@/lib/types";

export default function Home() {
  const [file, setFile] = useState<File | null>(null);
  const [coverage, setCoverage] = useState<FireCoverage | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function submit(event: FormEvent) {
    event.preventDefault();
    if (!file) return;

    setLoading(true);
    setError("");
    setCoverage(null);

    try {
      const form = new FormData();
      form.append("screenplay", file);

      const response = await fetch("/api/analyze", {
        method: "POST",
        body: form
      });

      const data = await response.json();
      if (!response.ok) throw new Error(data.error || "Analysis failed.");

      setCoverage(data.coverage);
    } catch (caught) {
      setError(caught instanceof Error ? caught.message : "Unknown error.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="shell">
      <header className="hero">
        <div className="logo">🔥</div>
        <div>
          <p className="eyebrow">SOULWARE PRESENTS</p>
          <h1>Fire Studio</h1>
          <p className="sub">The AI Producer. Louder. Faster. Funnier.</p>
        </div>
      </header>

      <section className="panel intro">
        <p className="eyebrow">VOL. 1</p>
        <h2>Upload a screenplay. Get the producer filmmakers dream about.</h2>
        <p>
          Fire reads the script, makes a real decision, and gives the one note
          most likely to elevate the movie.
        </p>

        <form onSubmit={submit}>
          <label className="drop">
            <input
              type="file"
              accept="application/pdf"
              onChange={(event) => setFile(event.target.files?.[0] ?? null)}
            />
            <span>{file ? file.name : "Choose screenplay PDF"}</span>
            <small>PDF only · 12 MB max · text-based PDFs work best</small>
          </label>

          <button disabled={!file || loading}>
            {loading ? "Fire is reading…" : "SEND IT TO FIRE"}
          </button>
        </form>

        {error && <p className="error">{error}</p>}
      </section>

      {coverage && (
        <section className="panel report">
          <div className="reportTop">
            <div>
              <p className="eyebrow">EXECUTIVE COVERAGE</p>
              <h2>{coverage.title}</h2>
            </div>
            <div className={`stamp ${coverage.recommendation.toLowerCase()}`}>
              {coverage.recommendation}
            </div>
          </div>

          <div className="scores">
            <div><small>Fire Score</small><strong>{coverage.fireScore}</strong></div>
            <div><small>Soul Score</small><strong>{coverage.soulScore}</strong></div>
          </div>

          <Block title="Logline" text={coverage.logline} />
          <Block title="Fire's Take" text={coverage.executiveTake} />

          <div className="four">
            <Mini title="Louder" text={coverage.louder} />
            <Mini title="Faster" text={coverage.faster} />
            <Mini title="Funnier" text={coverage.funnier} />
            <Mini title="Deeper" text={coverage.deeper} />
          </div>

          <Block title="Trailer Moment" text={coverage.trailerMoment} />
          <Block title="Movie Star Moment" text={coverage.movieStarMoment} />
          <Block title="Producer's Bet" text={coverage.producerBet} />

          <div className="brutal">
            <span>ONE BRUTAL NOTE</span>
            <p>{coverage.brutalNote}</p>
          </div>

          <div className="columns">
            <List title="Strengths" items={coverage.strengths} />
            <List title="Risks" items={coverage.risks} />
          </div>
        </section>
      )}

      <footer>
        Fire Studio is development support, not a guarantee of commercial or artistic success.
        Do not upload material you do not have permission to analyze.
      </footer>
    </main>
  );
}

function Block({ title, text }: { title: string; text: string }) {
  return <div className="block"><h3>{title}</h3><p>{text}</p></div>;
}

function Mini({ title, text }: { title: string; text: string }) {
  return <div className="mini"><strong>{title}</strong><p>{text}</p></div>;
}

function List({ title, items }: { title: string; items: string[] }) {
  return <div className="list"><h3>{title}</h3><ul>{items.map((item) => <li key={item}>{item}</li>)}</ul></div>;
}
