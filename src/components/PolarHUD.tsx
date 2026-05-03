import { useEffect, useState } from "react";

const WEATHERS = [
  { label: "极夜·极光", temp: "-38℃" },
  { label: "极夜·暴雪", temp: "-42℃" },
  { label: "极夜·晴·星河", temp: "-47℃" },
];

export function PolarHUD() {
  const [w, setW] = useState(0);
  const [code, setCode] = useState<number | null>(null);

  // 客户端再生成 daily code，避免 SSR/CSR hydration mismatch
  useEffect(() => {
    const stored = Number(sessionStorage.getItem("dailyCode") ?? 0);
    if (stored) {
      setCode(stored);
    } else {
      const n = Math.floor(Math.random() * 900) + 100;
      sessionStorage.setItem("dailyCode", String(n));
      setCode(n);
    }
  }, []);

  useEffect(() => {
    const id = setInterval(() => setW((v) => (v + 1) % WEATHERS.length), 7000);
    return () => clearInterval(id);
  }, []);
  const cur = WEATHERS[w];

  return (
    <>
      {/* 左上：南极天气 */}
      <div className="absolute top-4 left-4 z-30 text-[11px] tracking-widest text-muted-foreground font-cn select-none">
        <div className="flex items-center gap-1.5">
          <span className="opacity-70">📍</span>
          <span>南极点</span>
          <span className="opacity-30">|</span>
          <span key={cur.label} className="animate-fade-in">{cur.label}</span>
          <span className="text-foreground/80">{cur.temp}</span>
        </div>
      </div>

      {/* 右上：今日代号 */}
      <div className="absolute top-4 right-4 z-30 flex items-center gap-2 select-none">
        <div className="text-right">
          <div className="text-[10px] tracking-[0.25em] text-muted-foreground">今日代号</div>
          <div className="text-xs tracking-[0.2em] text-foreground/90 font-display min-w-[5em]">
            {code !== null ? `碎星 #${String(code).padStart(3, "0")}` : "碎星 #···"}
          </div>
        </div>
        <div className="w-8 h-8 rounded-full border border-border flex items-center justify-center bg-card/40 backdrop-blur-sm">
          <span className="text-xs">✦</span>
        </div>
      </div>
    </>
  );
}
