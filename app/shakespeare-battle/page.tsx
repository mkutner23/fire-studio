"use client";

import { useState } from "react";

const TEXT = `O, that this too too solid flesh would melt,
Thaw and resolve itself into a dew!`;

export default function ShakespeareBattle() {
  const [step, setStep] = useState(1);
  const [score, setScore] = useState<number | null>(null);

  function finishBattle() {
    setScore(82);
    setStep(4);
  }

  return (
    <main
      style={{
        minHeight: "100vh",
        background: "#080808",
        color: "white",
        padding: "32px 20px",
        fontFamily: "Arial, sans-serif",
      }}
    >
      <div style={{ maxWidth: 700, margin: "0 auto" }}>
        <p style={{ color: "#a3ff12", fontWeight: 900 }}>
          ⚔️ FUNIVERSITY
        </p>

        <h1 style={{ fontSize: 52, marginBottom: 0 }}>
          SHAKESPEARE BATTLE
        </h1>

        <h2>LEVEL 1: RESPECT THE VERSE</h2>

        <p style={{ opacity: 0.7 }}>
          Read it. Understand it. Perform it. Earn XP.
        </p>

        <hr style={{ margin: "30px 0", opacity: 0.2 }} />

        {step === 1 && (
          <>
            <h3>QUEST 1 — READ</h3>

            <blockquote
              style={{
                fontFamily: "Georgia, serif",
                fontSize: 30,
                lineHeight: 1.5,
                borderLeft: "4px solid #a3ff12",
                paddingLeft: 20,
              }}
            >
              {TEXT}
            </blockquote>

            <button style={button} onClick={() => setStep(2)}>
              I READ IT →
            </button>
          </>
        )}

        {step === 2 && (
          <>
            <h3>QUEST 2 — UNDERSTAND</h3>

            <p style={{ fontSize: 22, lineHeight: 1.5 }}>
              Hamlet wishes his body could simply melt away.
              Don't play “sad Shakespeare.” Think the thought.
            </p>

            <button style={button} onClick={() => setStep(3)}>
              ENTER THE ARENA ⚔️
            </button>
          </>
        )}

        {step === 3 && (
          <>
            <h3>QUEST 3 — PERFORM</h3>

            <p
              style={{
                fontFamily: "Georgia, serif",
                fontSize: 28,
                lineHeight: 1.5,
              }}
            >
              {TEXT}
            </p>

            <div
              style={{
                fontSize: 70,
                textAlign: "center",
                margin: 30,
              }}
            >
              🎙️
            </div>

            <button style={button} onClick={finishBattle}>
              FINISH PERFORMANCE
            </button>
          </>
        )}

        {step === 4 && (
          <>
            <h3 style={{ color: "#a3ff12" }}>
              BATTLE COMPLETE
            </h3>

            <div style={{ fontSize: 90, fontWeight: 900 }}>
              {score}
            </div>

            <h2>+{score} XP</h2>

            <p style={{ fontSize: 20 }}>
              🎭 Dramaturg Note: Good. Now stop trying to
              sound Shakespearean. Hamlet is thinking,
              not reciting.
            </p>

            <button
              style={button}
              onClick={() => {
                setScore(null);
                setStep(1);
              }}
            >
              PLAY AGAIN
            </button>
          </>
        )}
      </div>
    </main>
  );
}

const button = {
  width: "100%",
  padding: "18px",
  marginTop: "25px",
  background: "#a3ff12",
  color: "black",
  border: "none",
  borderRadius: "12px",
  fontSize: "18px",
  fontWeight: 900,
  cursor: "pointer",
};
