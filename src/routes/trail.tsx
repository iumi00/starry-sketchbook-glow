import { createFileRoute } from "@tanstack/react-router";
import { PageShell } from "@/components/PageShell";

export const Route = createFileRoute("/trail")({
  head: () => ({ meta: [{ title: "星轨 · 同频未署名" }] }),
  component: Trail,
});

const TAPES = [
  { no: "01", title: "请不要彻底沉默吗", date: "10·24", color: "from-stone-700 to-stone-900" },
  { no: "02", title: "大事", date: "10·26", color: "from-zinc-700 to-zinc-900" },
  { no: "03", title: "凌晨三点的回声", date: "10·29", color: "from-neutral-700 to-neutral-900" },
  { no: "04", title: "同频 / 7", date: "11·02", color: "from-stone-600 to-stone-800" },
  { no: "05", title: "同频 / 8", date: "11·05", color: "from-zinc-600 to-zinc-800" },
  { no: "06", title: "同频 / 9", date: "11·08", color: "from-neutral-600 to-neutral-800" },
];

function Trail() {
  return (
    <PageShell title="星轨" subtitle="你抛出的所有星星 · 一盒一盒收好">
      <div className="mx-auto max-w-md">
        {/* 木架 */}
        <div className="relative">
          <div className="flex items-end gap-1.5 px-1 overflow-x-auto pb-3 hide-scrollbar">
            {TAPES.map((t, i) => (
              <button
                key={i}
                className={`group relative shrink-0 w-12 h-44 bg-gradient-to-b ${t.color} pencil-border flex flex-col items-center justify-between py-3 hover:translate-y-[-4px] transition-transform`}
                style={{
                  borderRadius: "3px 3px 2px 2px",
                  boxShadow: "inset 0 0 12px rgba(0,0,0,0.6), 0 4px 10px rgba(0,0,0,0.5)",
                }}
              >
                <span className="text-[9px] tracking-widest text-white/80 font-display border border-white/30 px-1">
                  {t.no}
                </span>
                <span
                  className="text-[10px] text-white/90 font-cn leading-tight px-1 text-center"
                  style={{ writingMode: "vertical-rl" }}
                >
                  {t.title}
                </span>
                <span className="text-[8px] text-white/50">{t.date}</span>
              </button>
            ))}
          </div>
          {/* 木架平面 */}
          <div className="h-2 bg-gradient-to-b from-stone-800 to-stone-950 rounded-sm shadow-md" />
        </div>

        <p className="mt-12 text-center text-[11px] tracking-[0.3em] text-muted-foreground font-hand">
          每一盒都是一个深夜的自己
        </p>
      </div>
    </PageShell>
  );
}
