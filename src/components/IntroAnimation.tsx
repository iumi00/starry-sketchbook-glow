import { useEffect, useMemo, useState } from "react";
import { Starfield } from "./Starfield";

/**
 * 入场动画
 * 1) 打字机出现 Sync · Unsigned + slogan
 * 2) 随机光点闪烁，一笔连线成星座
 * 3) 星座收缩到中心，化为手绘曲边菱形（星核）
 * 4) 星核展开淡出 → 进入主页
 */
const TITLE = "Sync · Unsigned";
const SLOGAN = "有些共鸣，不需要名字";

type Phase = "typing" | "stars" | "drawing" | "collapse" | "diamond" | "done";

export function IntroAnimation({ onDone }: { onDone: () => void }) {
  const [phase, setPhase] = useState<Phase>("typing");
  const [typed, setTyped] = useState("");
  const [sloganVisible, setSloganVisible] = useState(false);

  // 7 个随机光点（用于连线成星座）
  const points = useMemo(() => {
    const pts: { x: number; y: number }[] = [];
    // 围绕中心带状分布（屏幕中下方）
    for (let i = 0; i < 7; i++) {
      const x = 18 + Math.random() * 64; // 18-82%
      const y = 55 + Math.random() * 22; // 55-77%
      pts.push({ x, y });
    }
    // 按 x 排序，让连线更像一笔画的星座
    pts.sort((a, b) => a.x - b.x);
    return pts;
  }, []);

  // 阶段 1：打字机
  useEffect(() => {
    if (phase !== "typing") return;
    let i = 0;
    const id = setInterval(() => {
      i++;
      setTyped(TITLE.slice(0, i));
      if (i >= TITLE.length) {
        clearInterval(id);
        setTimeout(() => setSloganVisible(true), 250);
        setTimeout(() => setPhase("stars"), 1100);
      }
    }, 110);
    return () => clearInterval(id);
  }, [phase]);

  // 阶段 2 → 3 → 4 → 5 时序
  useEffect(() => {
    if (phase === "stars") {
      const t = setTimeout(() => setPhase("drawing"), 900);
      return () => clearTimeout(t);
    }
    if (phase === "drawing") {
      const t = setTimeout(() => setPhase("collapse"), 1500);
      return () => clearTimeout(t);
    }
    if (phase === "collapse") {
      const t = setTimeout(() => setPhase("diamond"), 900);
      return () => clearTimeout(t);
    }
    if (phase === "diamond") {
      const t = setTimeout(() => setPhase("done"), 900);
      return () => clearTimeout(t);
    }
    if (phase === "done") {
      const t = setTimeout(onDone, 500);
      return () => clearTimeout(t);
    }
  }, [phase, onDone]);

  // SVG 路径（一笔连线）
  const pathD = useMemo(() => {
    return points
      .map((p, i) => `${i === 0 ? "M" : "L"} ${p.x} ${p.y}`)
      .join(" ");
  }, [points]);

  // 收缩中：所有点向中心 (50,50) 插值
  const collapseT = phase === "collapse" || phase === "diamond" || phase === "done" ? 1 : 0;

  return (
    <div
      className={`fixed inset-0 z-[100] bg-background grain transition-opacity duration-500 ${
        phase === "done" ? "opacity-0" : "opacity-100"
      }`}
    >
      <Starfield count={60} />

      {/* 标题 + Slogan */}
      <div
        className={`absolute left-1/2 top-[28%] -translate-x-1/2 -translate-y-1/2 text-center transition-opacity duration-700 ${
          phase === "collapse" || phase === "diamond" || phase === "done"
            ? "opacity-0"
            : "opacity-100"
        }`}
      >
        <h1
          className="font-display text-2xl sm:text-3xl tracking-[0.45em] text-foreground/90"
          style={{ fontWeight: 300 }}
        >
          {typed}
          <span
            className="inline-block w-[1px] h-[1.1em] align-middle ml-1 bg-foreground/80"
            style={{ animation: "type-cursor 0.9s steps(1) infinite" }}
          />
        </h1>
        <p
          className={`mt-5 text-xs tracking-[0.3em] text-muted-foreground font-cn transition-opacity duration-700 ${
            sloganVisible ? "opacity-100" : "opacity-0"
          }`}
        >
          {SLOGAN}
        </p>
      </div>

      {/* 星座 SVG */}
      <svg
        viewBox="0 0 100 100"
        preserveAspectRatio="none"
        className="absolute inset-0 w-full h-full"
      >
        {/* 连线（一笔画） */}
        {(phase === "drawing" || phase === "collapse") && (
          <path
            d={pathD}
            fill="none"
            stroke="white"
            strokeWidth="0.18"
            strokeLinecap="round"
            strokeLinejoin="round"
            style={{
              opacity: phase === "collapse" ? 0 : 0.85,
              strokeDasharray: 200,
              strokeDashoffset: 200,
              animation: phase === "drawing" ? "draw-line 1.2s ease-out forwards" : undefined,
              transition: "opacity 0.6s ease",
              filter: "drop-shadow(0 0 1.2px rgba(255,255,255,0.8))",
            }}
          />
        )}

        {/* 光点 */}
        {phase !== "diamond" &&
          phase !== "done" &&
          points.map((p, idx) => {
            // 收缩到中心
            const cx = p.x + (50 - p.x) * collapseT;
            const cy = p.y + (50 - p.y) * collapseT;
            const r = phase === "collapse" ? 0.4 : 0.7;
            return (
              <circle
                key={idx}
                cx={cx}
                cy={cy}
                r={r}
                fill="white"
                style={{
                  opacity: phase === "stars" || phase === "drawing" || phase === "collapse" ? 1 : 0,
                  transition: "cx 0.85s cubic-bezier(.6,.1,.3,1), cy 0.85s cubic-bezier(.6,.1,.3,1), r 0.6s ease, opacity 0.4s",
                  animation:
                    phase === "stars"
                      ? `twinkle ${1.2 + (idx % 4) * 0.3}s ease-in-out ${idx * 0.08}s infinite`
                      : undefined,
                  filter: "drop-shadow(0 0 1px rgba(255,255,255,0.9))",
                }}
              />
            );
          })}
      </svg>

      {/* 中心手绘曲边菱形（星核） */}
      <div
        className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none"
        style={{
          opacity: phase === "diamond" ? 1 : 0,
          transform: `translate(-50%, -50%) scale(${
            phase === "diamond" ? 1 : phase === "done" ? 6 : 0.3
          })`,
          transition: "opacity 0.5s ease, transform 0.9s cubic-bezier(.6,.1,.3,1)",
        }}
      >
        <svg width="80" height="80" viewBox="0 0 100 100">
          <path
            d="M 50 4 C 62 28, 72 38, 96 50 C 72 62, 62 72, 50 96 C 38 72, 28 62, 4 50 C 28 38, 38 28, 50 4 Z"
            fill="white"
            opacity="0.95"
            style={{ filter: "drop-shadow(0 0 14px rgba(255,255,255,0.9))" }}
          />
        </svg>
      </div>
    </div>
  );
}
