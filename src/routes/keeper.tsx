import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useRef, useState } from "react";
import { PageShell } from "@/components/PageShell";
import { Penguin } from "@/components/Penguin";

export const Route = createFileRoute("/keeper")({
  head: () => ({ meta: [{ title: "守夜人 · 同频未署名" }] }),
  component: Keeper,
});

type Msg = { role: "ai" | "me"; text: string };

const OPENING = "外面的风雪很大，进来坐坐吧。这里是南极的某个角落，我是这里的守夜人。看你带着一身的疲惫，这里没有别人，你想说什么都可以。";

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
    
    // 特殊回复逻辑
    if (my === "我好难过") {
      // 三条回复，每条间隔0.5秒
      const replies = [
        "难过是你心里的雪，也在下。",
        "但你还能走进来，说明你还没有被冻住。",
        "坐吧，等雪停，炉火还旺，夜还长，你可以跟我说说。"
      ];
      
      // 等待1秒后开始第一条回复
      setTimeout(() => {
        sendReplyWithTypewriter(replies[0], () => {
          // 第一条回复完成后，等待0.5秒发送第二条
          setTimeout(() => {
            sendReplyWithTypewriter(replies[1], () => {
              // 第二条回复完成后，等待0.5秒发送第三条
              setTimeout(() => {
                sendReplyWithTypewriter(replies[2], () => {
                  setStreaming(false);
                });
              }, 500);
            });
          }, 500);
        });
      }, 1000);
    } else {
      const reply = FAKE_REPLIES[Math.floor(Math.random() * FAKE_REPLIES.length)];
      
      // 等待1秒后开始回复
      setTimeout(() => {
        sendReplyWithTypewriter(reply, () => {
          setStreaming(false);
        });
      }, 1000);
    }
  };

  // 打字机式回复函数
  const sendReplyWithTypewriter = (text: string, onComplete: () => void) => {
    setStreaming(true);
    setMsgs((m) => [...m, { role: "ai", text: "" }]);
    let i = 0;
    const id = setInterval(() => {
      i++;
      setMsgs((m) => {
          const next = [...m];
          next[next.length - 1] = { role: "ai", text: text.slice(0, i) };
          return next;
        });
        if (i >= text.length) {
          clearInterval(id);
          onComplete();
        }
    }, 200); // 更慢的打字机效果
  };

  return (
    <PageShell title="守夜人" subtitle="无论天多黑，时间多晚，守夜人一直陪你等天亮">
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
