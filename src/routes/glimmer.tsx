import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { PageShell } from "@/components/PageShell";

export const Route = createFileRoute("/glimmer")({
  head: () => ({ meta: [{ title: "拾光 · 同频未署名" }] }),
  component: Glimmer,
});

const STARS = [
  { text: "考研一战上岸群里全是经验贴 我连英语单词书都没翻完", tag: "某 985 · 大三" },
  { text: "今天面试又挂了 出来的时候天已经黑了 不想回宿舍", tag: "某双非 · 大四" },
  { text: "其实我不是不想说 是没有合适的人能说", tag: "某综合大学 · 研一" },
  { text: "朋友圈点赞越来越少 我也越来越不敢发", tag: "某 211 · 大二" },
  { text: "今晚突然很想我妈 但又不知道从哪句话开始打字", tag: "某师范 · 大一" },
  { text: "保研结果出了 我们寝室四个人三个上岸 我假装很开心", tag: "某 985 · 大四" },
  { text: "实习被领导当众骂哭 在地铁里假装看手机", tag: "某财经 · 研二" },
  { text: "已经连续三天没和任何人说话了 包括外卖小哥", tag: "某理工 · 大三" },
  { text: "凌晨两点的图书馆灯还亮着 但我已经一个字都看不进去", tag: "某 211 · 大三" },
  { text: "我妈说我是她的骄傲 可是我现在连早八都起不来", tag: "某综合大学 · 大二" },
];

function Glimmer() {
  const [idx, setIdx] = useState(0);
  const [replying, setReplying] = useState(false);

  const next = () => {
    setReplying(false);
    setIdx((v) => (v + 1) % STARS.length);
  };
  const cur = STARS[idx];

  return (
    <PageShell title="拾光" subtitle="在星空中随机摘取一颗 · 你只能写一次回信">
      <div className="mx-auto max-w-md">
        {/* 星星卡片 */}
        <div
          key={idx}
          className="pencil-border bg-card/40 backdrop-blur-sm p-6 animate-fade-up"
        >
          <div className="flex items-start gap-3">
            <span className="mt-1.5 w-2 h-2 bg-white rounded-[1px] animate-twinkle-slow shrink-0" />
            <p className="text-[15px] leading-[1.9] text-foreground/95 font-cn">
              {cur.text}
            </p>
          </div>
          <div className="mt-5 pt-4 border-t border-border/60 flex items-center justify-between text-[10px] tracking-[0.25em] text-muted-foreground">
            <span>{cur.tag}</span>
            <span className="font-hand text-xs">— 来自南极某处</span>
          </div>
        </div>

        {/* 操作 */}
        {!replying ? (
          <div className="mt-8 flex items-center justify-between text-xs tracking-[0.3em]">
            <button
              onClick={next}
              className="text-muted-foreground hover:text-foreground transition-colors"
            >
              ← 再摘一颗
            </button>
            <button
              onClick={() => setReplying(true)}
              className="text-foreground/90 hover:text-aurora transition-colors"
            >
              写回信 →
            </button>
          </div>
        ) : (
          <ReplyBox onClose={next} />
        )}
      </div>
    </PageShell>
  );
}

function ReplyBox({ onClose }: { onClose: () => void }) {
  const [v, setV] = useState("");
  const [sent, setSent] = useState(false);

  if (sent) {
    return (
      <div className="mt-8 text-center animate-fade-in">
        <div className="mx-auto w-2 h-2 bg-white rounded-[1px] animate-glow-pulse" />
        <p className="mt-4 text-[11px] tracking-[0.3em] text-muted-foreground font-cn">
          回信已悄悄送达
        </p>
      </div>
    );
  }

  return (
    <div className="mt-6 pencil-border bg-card/30 p-4 animate-fade-up">
      <textarea
        autoFocus
        rows={4}
        value={v}
        onChange={(e) => setV(e.target.value)}
        placeholder="只说一句·只说给ta…"
        className="w-full bg-transparent text-sm text-foreground/95 placeholder:text-muted-foreground/60 font-cn outline-none resize-none"
      />
      <div className="mt-3 flex items-center justify-between text-[11px] tracking-[0.25em]">
        <button onClick={onClose} className="text-muted-foreground">取消</button>
        <button
          disabled={!v.trim()}
          onClick={() => {
            setSent(true);
            setTimeout(onClose, 1600);
          }}
          className="text-foreground/90 hover:text-aurora disabled:opacity-30 transition-colors"
        >
          发送 →
        </button>
      </div>
    </div>
  );
}
