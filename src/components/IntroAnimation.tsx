import { useEffect, useMemo, useState } from "react";
import { Starfield } from "./Starfield";

/**
 * 入场动画（参考 p1）
 * 节奏放慢 / 治愈
 * 1) "Sync · Unsigned" 缓缓浮现
 * 2) "有些同频，" 逐字出现，逗号后停顿 1s 再出 "不需要名字"
 * 3) 中下方依次亮起 7 颗星点（圆润、白、有光晕）
 * 4) 一笔白线缓缓连接 7 颗星（预设的柔和美感曲线，每次随机选一条）
 * 5) 标题 + slogan + 星座 一起淡出收缩到中心，化为手绘曲边菱形 → 展开淡出
 */

const TITLE = "Sync · Unsigned";
const SLOGAN_A = "有些同频，";
const SLOGAN_B = "不需要名字";

type Phase =
  | "title"        // 标题缓缓出现
  | "sloganA"      // 第一句逐字
  | "sloganPause"  // 逗号后停顿
  | "sloganB"      // 第二句逐字
  | "stars"        // 星点逐颗亮起
  | "drawing"      // 一笔连线
  | "hold"         // 停留欣赏
  | "collapse"     // 全部收缩到中心
  | "diamond"      // 菱形显形
  | "burst"        // 菱形展开
  | "done";

// 预设的几条"美感"星座曲线（在 viewBox 100x100 的中下方 1/3 区域）
// 每条 7 个点，连成弧线 / 波浪 / S 线
const PRESET_CONSTELLATIONS: { x: number; y: number }[][] = [
  // 柔和弧线
  [
    { x: 25, y: 62 }, { x: 33, y: 56 }, { x: 42, y: 54 },
    { x: 50, y: 56 }, { x: 58, y: 60 }, { x: 67, y: 66 }, { x: 75, y: 70 },
  ],
  // 波浪
  [
    { x: 22, y: 60 }, { x: 31, y: 54 }, { x: 40, y: 62 },
    { x: 50, y: 56 }, { x: 60, y: 64 }, { x: 69, y: 58 }, { x: 78, y: 66 },
  ],
  // S 线
  [
    { x: 24, y: 70 }, { x: 32, y: 64 }, { x: 40, y: 58 },
    { x: 50, y: 60 }, { x: 60, y: 64 }, { x: 68, y: 58 }, { x: 76, y: 52 },
  ],
  // 下倾抛物
  [
    { x: 22, y: 54 }, { x: 32, y: 58 }, { x: 42, y: 64 },
    { x: 52, y: 68 }, { x: 62, y: 66 }, { x: 70, y: 60 }, { x: 78, y: 56 },
  ],
];

export function IntroAnimation({ onDone }: { onDone: () => void }) {
  const [phase, setPhase] = useState<Phase>("title");
  const [typedA, setTypedA] = useState("");
  const [typedB, setTypedB] = useState("");
  const [titleVisible, setTitleVisible] = useState(false);
  const [litCount, setLitCount] = useState(0); // 已点亮的星数

  const points = useMemo(
    () =>
      PRESET_CONSTELLATIONS[
        Math.floor(Math.random() * PRESET_CONSTELLATIONS.length)
      ],
    []
  );

  // 阶段 0：标题缓缓浮现
  useEffect(() => {
    if (phase !== "title") return;
    const t1 = setTimeout(() => setTitleVisible(true), 100);
    const t2 = setTimeout(() => setPhase("sloganA"), 1800);
    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
    };
  }, [phase]);

  // 阶段 1：第一句逐字
  useEffect(() => {
    if (phase !== "sloganA") return;
    let i = 0;
    const id = setInterval(() => {
      i++;
      setTypedA(SLOGAN_A.slice(0, i));
      if (i >= SLOGAN_A.length) {
        clearInterval(id);
        setTimeout(() => setPhase("sloganPause"), 200);
      }
    }, 200);
    return () => clearInterval(id);
  }, [phase]);

  // 阶段 1.5：逗号后停顿
  useEffect(() => {
    if (phase !== "sloganPause") return;
    const t = setTimeout(() => setPhase("sloganB"), 1000);
    return () => clearTimeout(t);
  }, [phase]);

  // 阶段 2：第二句逐字
  useEffect(() => {
    if (phase !== "sloganB") return;
    let i = 0;
    const id = setInterval(() => {
      i++;
      setTypedB(SLOGAN_B.slice(0, i));
      if (i >= SLOGAN_B.length) {
        clearInterval(id);
        setTimeout(() => setPhase("stars"), 800);
      }
    }, 200);
    return () => clearInterval(id);
  }, [phase]);

  // 阶段 3：星点逐颗亮起
  useEffect(() => {
    if (phase !== "stars") return;
    let i = 0;
    const id = setInterval(() => {
      i++;
      setLitCount(i);
      if (i >= points.length) {
        clearInterval(id);
        setTimeout(() => setPhase("drawing"), 500);
      }
    }, 220);
    return () => clearInterval(id);
  }, [phase, points.length]);

  // 后续阶段
  useEffect(() => {
    if (phase === "drawing") {
      const t = setTimeout(() => setPhase("hold"), 1800);
      return () => clearTimeout(t);
    }
    if (phase === "hold") {
      const t = setTimeout(() => setPhase("collapse"), 1200);
      return () => clearTimeout(t);
    }
    if (phase === "collapse") {
      const t = setTimeout(() => setPhase("diamond"), 900);
      return () => clearTimeout(t);
    }
    if (phase === "diamond") {
      const t = setTimeout(() => setPhase("burst"), 700);
      return () => clearTimeout(t);
    }
    if (phase === "burst") {
      const t = setTimeout(() => setPhase("done"), 700);
      return () => clearTimeout(t);
    }
    if (phase === "done") {
      const t = setTimeout(onDone, 500);
      return () => clearTimeout(t);
    }
  }, [phase, onDone]);

  // 一笔画路径（用平滑曲线连接）
  const pathD = useMemo(() => {
    if (points.length === 0) return "";
    let d = `M ${points[0].x} ${points[0].y}`;
    for (let i = 1; i < points.length; i++) {
      d += ` L ${points[i].x} ${points[i].y}`;
    }
    return d;
  }, [points]);

  const collapsing = phase === "collapse" || phase === "diamond" || phase === "burst" || phase === "done";
  const fadingOut = collapsing;

  return (
    <div
      className={`absolute inset-0 z-[100] bg-background grain transition-opacity duration-500 ${
        phase === "done" ? "opacity-0" : "opacity-100"
      }`}
    >
      <Starfield count={50} />

      {/* 标题 + Slogan：放在页面 1/3 区域 */}
      <div
        className={`absolute left-1/2 top-[30%] -translate-x-1/2 -translate-y-1/2 text-center w-full px-6 transition-all duration-700 ${
          fadingOut ? "opacity-0 -translate-y-[60%]" : "opacity-100"
        }`}
      >
        <h1
          className={`font-display text-2xl sm:text-3xl tracking-[0.45em] text-foreground/95 transition-all duration-[1400ms] ease-out ${
            titleVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-2"
          }`}
          style={{ fontWeight: 300 }}
        >
          {TITLE}
        </h1>

        <div className="mt-6 text-[11px] sm:text-xs tracking-[0.3em] text-muted-foreground font-cn min-h-[1.2em]">
          <span>{typedA}</span>
          <span>{typedB}</span>
        </div>
      </div>

      {/* 星座 SVG（中下方） */}
      <svg
        viewBox="0 0 100 100"
        preserveAspectRatio="none"
        className={`absolute inset-0 w-full h-full transition-opacity duration-700 ${
          fadingOut ? "opacity-0" : "opacity-100"
        }`}
      >
        {/* 一笔白线 */}
        <path
          d={pathD}
          fill="none"
          stroke="white"
          strokeWidth="0.35"
          strokeLinecap="round"
          strokeLinejoin="round"
          style={{
            opacity: phase === "drawing" || phase === "hold" ? 0.9 : 0,
            strokeDasharray: 200,
            strokeDashoffset: phase === "drawing" || phase === "hold" ? 0 : 200,
            transition:
              phase === "drawing"
                ? "stroke-dashoffset 1.6s ease-out, opacity 0.4s ease"
                : "opacity 0.6s ease",
            filter: "drop-shadow(0 0 1.5px rgba(255,255,255,0.7))",
          }}
        />

        {/* 光点 */}
        {points.map((p, idx) => {
          const lit = idx < litCount || phase === "drawing" || phase === "hold";
          return (
            <g key={idx}>
              {/* 外圈光晕 */}
              <circle
                cx={p.x}
                cy={p.y}
                r="1.4"
                fill="white"
                style={{
                  opacity: lit ? 0.25 : 0,
                  transition: "opacity 0.6s ease",
                  filter: "blur(0.6px)",
                }}
              />
              {/* 实心点 */}
              <circle
                cx={p.x}
                cy={p.y}
                r="0.75"
                fill="white"
                style={{
                  opacity: lit ? 1 : 0,
                  transition: "opacity 0.5s ease",
                  filter: "drop-shadow(0 0 1.5px rgba(255,255,255,0.95))",
                }}
              />
            </g>
          );
        })}
      </svg>

      {/* 中心手绘曲边菱形 */}
      <div
        className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none"
        style={{
          opacity: phase === "diamond" || phase === "burst" ? 1 : 0,
          transform: `translate(-50%, -50%) scale(${
            phase === "diamond" ? 1 : phase === "burst" ? 7 : 0.2
          })`,
          transition: "opacity 0.4s ease, transform 0.7s cubic-bezier(.6,.1,.3,1)",
        }}
      >
        <svg width="70" height="70" viewBox="0 0 100 100">
          <path
            d="M 50 4 C 62 28, 72 38, 96 50 C 72 62, 62 72, 50 96 C 38 72, 28 62, 4 50 C 28 38, 38 28, 50 4 Z"
            fill="white"
            opacity="0.95"
            style={{ filter: "drop-shadow(0 0 16px rgba(255,255,255,0.9))" }}
          />
        </svg>
      </div>
    </div>
  );
}
