import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { PageShell } from "@/components/PageShell";

export const Route = createFileRoute("/echo")({
  head: () => ({ meta: [{ title: "回声 · 同频未署名" }] }),
  component: Echo,
});

const REPLIES = [
  {
    from: "陌生人 #471",
    when: "23 分钟前",
    your: "今天又一个人吃饭 突然不想回宿舍",
    text: "我也是。后来我学会了带本书去食堂角落坐 不为读 只为有事可做。",
  },
  {
    from: "守夜人",
    when: "1 小时前",
    your: "失败的次数比头发还多",
    text: "你不是失败的次数多 是尝试的次数多。这两件事不一样。",
  },
  {
    from: "陌生人 #208",
    when: "昨日",
    your: "保研失败 不知道怎么和家里说",
    text: "我两年前也是。后来发现 父母比我们想象的更能接住我们。",
  },
];

function Echo() {
  const [aurora, setAurora] = useState<number | null>(null);

  return (
    <PageShell title="回声" subtitle="只能说谢谢 · 或送一道极光">
      <div className="mx-auto max-w-md space-y-5">
        {REPLIES.map((r, i) => (
          <article
            key={i}
            className="pencil-border bg-card/40 backdrop-blur-sm p-5 animate-fade-up"
            style={{ animationDelay: `${i * 0.1}s` }}
          >
            <div className="flex items-center justify-between text-[10px] tracking-[0.25em] text-muted-foreground">
              <span>{r.from}</span>
              <span>{r.when}</span>
            </div>
            <div className="mt-3 pl-3 border-l border-border/60 text-[11px] text-muted-foreground font-cn leading-relaxed">
              你说：{r.your}
            </div>
            <p className="mt-4 text-[15px] leading-[1.9] text-foreground/95 font-cn">
              {r.text}
            </p>
            <div className="mt-5 pt-3 border-t border-border/50 flex items-center justify-between text-[11px] tracking-[0.25em]">
              <button
                onClick={() => setAurora(i)}
                className="text-aurora hover:opacity-80 transition-opacity"
              >
                ✦ 送一道极光
              </button>
              <button className="text-muted-foreground hover:text-foreground transition-colors">
                标记不适
              </button>
            </div>
          </article>
        ))}
      </div>

      {/* 极光特效 */}
      {aurora !== null && (
        <div
          className="fixed inset-0 z-50 pointer-events-none animate-fade-in"
          onAnimationEnd={() => setTimeout(() => setAurora(null), 1800)}
        >
          <div
            className="absolute inset-0"
            style={{
              background:
                "radial-gradient(ellipse at 50% 0%, oklch(0.78 0.16 165 / 0.45), transparent 60%), radial-gradient(ellipse at 30% 20%, oklch(0.82 0.12 80 / 0.25), transparent 50%)",
              animation: "fade-in 0.6s ease-out",
            }}
          />
          <div className="absolute inset-x-0 top-24 text-center text-xs tracking-[0.4em] text-aurora font-cn">
            一道极光已送达对方夜空
          </div>
        </div>
      )}
    </PageShell>
  );
}
