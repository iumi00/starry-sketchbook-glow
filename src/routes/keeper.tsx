import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useRef, useState } from "react";
import { PageShell } from "@/components/PageShell";
import { Penguin } from "@/components/Penguin";

export const Route = createFileRoute("/keeper")({
  head: () => ({ meta: [{ title: "守夜人 · 同频未署名" }] }),
  component: Keeper,
});

type Msg = { role: "ai" | "me"; text: string };

const OPENING = "我在。这里是南极的某个角落，没有别人。你想说什么都可以。";

// Demo：模拟流式回复（无后端时的兜底）
const FAKE_REPLIES = [
  "嗯…我听到了。你不用解释，我在。",
  "极夜是漫长的。但你愿意说出来，已经是穿过它的开始。",
  "你不用一下子想明白。今晚先这样，就够了。",
  "我也常常这样。我们就在这里一起待一会儿。",
];

function Keeper() {
  const [msgs, setMsgs] = useState<Msg[]>([{ role: "ai", text: OPENING }]);
  const [v, setV] = useState("");
  const [streaming, setStreaming] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: 99999, behavior: "smooth" });
  }, [msgs, streaming]);

  const send = () => {
    if (!v.trim() || streaming) return;
    const my = v.trim();
    setMsgs((m) => [...m, { role: "me", text: my }]);
    setV("");
    // 模拟打字机流式
    const reply = FAKE_REPLIES[Math.floor(Math.random() * FAKE_REPLIES.length)];
    setStreaming(true);
    setMsgs((m) => [...m, { role: "ai", text: "" }]);
    let i = 0;
    const id = setInterval(() => {
      i++;
      setMsgs((m) => {
        const next = [...m];
        next[next.length - 1] = { role: "ai", text: reply.slice(0, i) };
        return next;
      });
      if (i >= reply.length) {
        clearInterval(id);
        setStreaming(false);
      }
    }, 55);
  };

  return (
    <PageShell title="守夜人" subtitle="温柔的同龄人 · 只是陪着 · 不说教">
      <div className="mx-auto max-w-md flex flex-col h-[calc(100vh-220px)]">
        <div ref={scrollRef} className="flex-1 overflow-y-auto pr-1 space-y-4">
          {msgs.map((m, i) => (
            <div
              key={i}
              className={`flex gap-2 animate-fade-up ${
                m.role === "me" ? "flex-row-reverse" : ""
              }`}
            >
              {m.role === "ai" && (
                <div className="shrink-0 mt-1">
                  <Penguin size={28} />
                </div>
              )}
              <div
                className={`max-w-[78%] px-4 py-2.5 text-[14px] leading-[1.85] font-cn ${
                  m.role === "me"
                    ? "bg-foreground/90 text-background rounded-[14px_12px_14px_4px]"
                    : "bg-card/60 text-foreground/95 pencil-border"
                }`}
                style={
                  m.role === "me"
                    ? undefined
                    : { borderRadius: "4px 14px 14px 12px" }
                }
              >
                {m.text}
                {m.role === "ai" && i === msgs.length - 1 && streaming && (
                  <span
                    className="inline-block w-[1px] h-[1em] align-middle ml-1 bg-foreground/80"
                    style={{ animation: "type-cursor 0.9s steps(1) infinite" }}
                  />
                )}
              </div>
            </div>
          ))}
        </div>

        {/* 输入 */}
        <div className="mt-4 pencil-border bg-card/40 p-3 flex items-end gap-2">
          <textarea
            value={v}
            onChange={(e) => setV(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter" && !e.shiftKey) {
                e.preventDefault();
                send();
              }
            }}
            rows={1}
            placeholder="今晚怎么了…"
            className="flex-1 bg-transparent text-[14px] text-foreground/95 placeholder:text-muted-foreground/60 font-cn outline-none resize-none max-h-32"
          />
          <button
            onClick={send}
            disabled={!v.trim() || streaming}
            className="text-xs tracking-[0.3em] text-foreground/90 hover:text-aurora disabled:opacity-30 transition-colors shrink-0 pb-0.5"
          >
            发送
          </button>
        </div>
      </div>
    </PageShell>
  );
}
