import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { PageShell } from "@/components/PageShell";

export const Route = createFileRoute("/carve")({
  head: () => ({ meta: [{ title: "刻录 · 同频未署名" }] }),
  component: Carve,
});

type Stage = "writing" | "sending" | "sent";

function Carve() {
  const [text, setText] = useState("");
  const [stage, setStage] = useState<Stage>("writing");
  const navigate = useNavigate();

  const handleSend = () => {
    if (!text.trim()) return;
    setStage("sending");
    // 文字化作星星抛向夜空
    setTimeout(() => setStage("sent"), 1800);
    setTimeout(() => navigate({ to: "/" }), 3600);
  };

  return (
    <PageShell title="刻录" subtitle="此刻你想说什么 · 没有人知道这是你">
      <div className="mx-auto max-w-md">
        {stage === "writing" && (
          <div className="pencil-border bg-card/40 backdrop-blur-sm p-5 animate-fade-up">
            <textarea
              value={text}
              onChange={(e) => setText(e.target.value)}
              autoFocus
              rows={9}
              placeholder="把它抛向夜空…"
              className="w-full bg-transparent text-[15px] leading-relaxed text-foreground/95 placeholder:text-muted-foreground/60 font-cn outline-none resize-none"
            />
            <div className="mt-4 flex items-center justify-between">
              <span className="text-[10px] tracking-widest text-muted-foreground">
                {text.length} 字 · 永远匿名
              </span>
              <button
                onClick={handleSend}
                disabled={!text.trim()}
                className="text-xs tracking-[0.3em] text-foreground/90 hover:text-aurora disabled:opacity-30 transition-colors"
              >
                抛向星空 →
              </button>
            </div>
          </div>
        )}

        {stage === "sending" && (
          <div className="text-center py-20 animate-fade-in">
            <div
              className="mx-auto w-2 h-2 bg-white rounded-[1px]"
              style={{ animation: "shooting-star 1.6s ease-out forwards" }}
            />
            <p className="mt-8 text-xs tracking-[0.3em] text-muted-foreground font-cn">
              文字正在化作一颗星…
            </p>
          </div>
        )}

        {stage === "sent" && (
          <div className="text-center py-20 animate-fade-up">
            <div className="mx-auto w-3 h-3 bg-white rounded-[1px] animate-glow-pulse" />
            <p className="mt-8 text-xs tracking-[0.3em] text-foreground/80 font-cn">
              已抛入南极夜空
            </p>
            <p className="mt-2 text-[10px] tracking-[0.25em] text-muted-foreground font-hand">
              也许某个时刻，会有人接住它
            </p>
          </div>
        )}
      </div>
    </PageShell>
  );
}
