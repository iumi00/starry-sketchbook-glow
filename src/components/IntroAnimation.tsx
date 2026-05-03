import { useEffect, useState, useRef, useCallback } from "react";

/**
 * 入场动画 — 移植自参考 splash-animation
 * 1) 标题整体浮现
 * 2) 第一句逐字 → 长停顿 → 第二句逐字
 * 3) 星点逐颗亮起
 * 4) 一笔一笔顺序连接星点
 * 5) 全部收缩到中心 → 化为四芒星 sparkle → 淡出
 */

interface Star {
  id: number;
  x: number;
  y: number;
  visible: boolean;
  scale: number;
}

interface LineSegment {
  fromX: number;
  fromY: number;
  toX: number;
  toY: number;
}

const SLOGAN_PART1 = "有些同频，";
const SLOGAN_PART2 = "不需要名字";
const FULL_SLOGAN = SLOGAN_PART1 + SLOGAN_PART2;

const PATTERNS: { x: number; y: number }[][] = [
  // 弧线
  [
    { x: 25, y: 42 }, { x: 35, y: 38 }, { x: 45, y: 40 },
    { x: 52, y: 45 }, { x: 60, y: 52 }, { x: 68, y: 50 }, { x: 75, y: 44 },
  ],
  // Orion 带
  [
    { x: 28, y: 46 }, { x: 40, y: 44 }, { x: 50, y: 48 },
    { x: 60, y: 44 }, { x: 72, y: 46 },
  ],
  // 仙后座 W
  [
    { x: 25, y: 50 }, { x: 38, y: 42 }, { x: 50, y: 50 },
    { x: 62, y: 42 }, { x: 75, y: 50 },
  ],
  // 柔和拱
  [
    { x: 25, y: 54 }, { x: 38, y: 45 }, { x: 50, y: 42 },
    { x: 62, y: 45 }, { x: 75, y: 54 },
  ],
  // 上升斜线
  [
    { x: 28, y: 55 }, { x: 40, y: 50 }, { x: 50, y: 47 },
    { x: 60, y: 44 }, { x: 72, y: 40 },
  ],
  // Z 形
  [
    { x: 25, y: 45 }, { x: 38, y: 52 }, { x: 50, y: 42 },
    { x: 62, y: 52 }, { x: 75, y: 45 },
  ],
];

type Phase =
  | "title"
  | "slogan"
  | "stars"
  | "connecting"
  | "pause"
  | "collapsing"
  | "converge"
  | "done";

export function IntroAnimation({ onDone }: { onDone: () => void }) {
  const [stars, setStars] = useState<Star[]>([]);
  const [drawnPath, setDrawnPath] = useState<LineSegment[]>([]);
  const [currentSegmentProgress, setCurrentSegmentProgress] = useState(0);
  const [currentSegmentIndex, setCurrentSegmentIndex] = useState(-1);
  const [phase, setPhase] = useState<Phase>("title");
  const [collapseProgress, setCollapseProgress] = useState(0);
  const [titleVisible, setTitleVisible] = useState(false);
  const [visibleSloganCount, setVisibleSloganCount] = useState(0);
  const [showPart2, setShowPart2] = useState(false);
  const [visiblePart2Count, setVisiblePart2Count] = useState(0);
  const [convergeFade, setConvergeFade] = useState(1);
  const initRef = useRef(false);

  const starDiameter = 9;
  const lineWidth = 2.2;

  // 初始化（仅客户端，避免 SSR hydration mismatch）
  useEffect(() => {
    if (initRef.current) return;
    initRef.current = true;
    const pattern = PATTERNS[Math.floor(Math.random() * PATTERNS.length)];
    setStars(
      pattern.map((p, i) => ({ id: i, x: p.x, y: p.y, visible: false, scale: 1 }))
    );
  }, []);

  // 标题
  useEffect(() => {
    if (phase !== "title") return;
    const t1 = setTimeout(() => setTitleVisible(true), 400);
    const t2 = setTimeout(() => setPhase("slogan"), 2400);
    return () => { clearTimeout(t1); clearTimeout(t2); };
  }, [phase]);

  // Slogan
  useEffect(() => {
    if (phase !== "slogan") return;
    let charIndex = 0;
    let timeoutId: ReturnType<typeof setTimeout>;
    let part2Index = 0;

    const showPart2Chars = () => {
      if (part2Index < SLOGAN_PART2.length) {
        setVisiblePart2Count(part2Index + 1);
        part2Index++;
        timeoutId = setTimeout(showPart2Chars, 140);
      } else {
        timeoutId = setTimeout(() => setPhase("stars"), 1600);
      }
    };

    const showPart1Char = () => {
      if (charIndex < SLOGAN_PART1.length) {
        setVisibleSloganCount(charIndex + 1);
        charIndex++;
        timeoutId = setTimeout(showPart1Char, charIndex === SLOGAN_PART1.length ? 180 : 140);
      } else {
        timeoutId = setTimeout(() => {
          setShowPart2(true);
          showPart2Chars();
        }, 1500);
      }
    };

    timeoutId = setTimeout(showPart1Char, 600);
    return () => clearTimeout(timeoutId);
  }, [phase]);

  // 星点亮起
  useEffect(() => {
    if (phase !== "stars" || stars.length === 0) return;
    let i = 0;
    const id = setInterval(() => {
      if (i < stars.length) {
        const idx = i;
        setStars((prev) => prev.map((s, j) => (j === idx ? { ...s, visible: true } : s)));
        i++;
      } else {
        clearInterval(id);
        setTimeout(() => {
          setCurrentSegmentIndex(0);
          setPhase("connecting");
        }, 700);
      }
    }, 420);
    return () => clearInterval(id);
  }, [phase, stars.length]);

  // 一笔一笔连接
  useEffect(() => {
    if (phase !== "connecting" || stars.length === 0) return;
    if (currentSegmentIndex < 0) return;
    if (currentSegmentIndex >= stars.length - 1) {
      const t = setTimeout(() => setPhase("pause"), 500);
      return () => clearTimeout(t);
    }
    const fromStar = stars[currentSegmentIndex];
    const toStar = stars[currentSegmentIndex + 1];
    if (!fromStar || !toStar) return;

    const duration = 420;
    const startTime = Date.now();
    let raf = 0;
    const animate = () => {
      const elapsed = Date.now() - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 2);
      setCurrentSegmentProgress(eased);
      if (progress < 1) {
        raf = requestAnimationFrame(animate);
      } else {
        setDrawnPath((prev) => [
          ...prev,
          { fromX: fromStar.x, fromY: fromStar.y, toX: toStar.x, toY: toStar.y },
        ]);
        setCurrentSegmentProgress(0);
        setCurrentSegmentIndex((p) => p + 1);
      }
    };
    raf = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(raf);
  }, [phase, currentSegmentIndex, stars]);

  // 停顿
  useEffect(() => {
    if (phase !== "pause") return;
    const t = setTimeout(() => setPhase("collapsing"), 1500);
    return () => clearTimeout(t);
  }, [phase]);

  // 收缩
  useEffect(() => {
    if (phase !== "collapsing") return;
    const duration = 1300;
    const startTime = Date.now();
    let raf = 0;
    const animate = () => {
      const elapsed = Date.now() - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const eased = progress < 0.5 ? 2 * progress * progress : 1 - Math.pow(-2 * progress + 2, 2) / 2;
      setCollapseProgress(eased);
      setStars((prev) => prev.map((s) => ({ ...s, scale: 1 - eased * 0.9 })));
      if (progress < 1) raf = requestAnimationFrame(animate);
      else setPhase("converge");
    };
    raf = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(raf);
  }, [phase]);

  // 收敛 + 淡出
  useEffect(() => {
    if (phase !== "converge") return;
    const fadeT = setTimeout(() => {
      const duration = 700;
      const startTime = Date.now();
      let raf = 0;
      const animate = () => {
        const elapsed = Date.now() - startTime;
        const progress = Math.min(elapsed / duration, 1);
        setConvergeFade(1 - progress);
        if (progress < 1) raf = requestAnimationFrame(animate);
        else setPhase("done");
      };
      raf = requestAnimationFrame(animate);
    }, 500);
    return () => clearTimeout(fadeT);
  }, [phase]);

  useEffect(() => {
    if (phase !== "done") return;
    const t = setTimeout(onDone, 100);
    return () => clearTimeout(t);
  }, [phase, onDone]);

  const getCollapsedPosition = useCallback(
    (x: number, y: number) => ({
      x: x + (50 - x) * collapseProgress,
      y: y + (50 - y) * collapseProgress,
    }),
    [collapseProgress]
  );

  const elementsOpacity =
    phase === "collapsing" || phase === "converge"
      ? Math.max(0, 1 - collapseProgress * 1.5)
      : 1;

  const titleCollapseY = collapseProgress * 28;
  const titleScale = 1 - collapseProgress * 0.95;
  const sloganCollapseY = collapseProgress * 22;
  const sloganScale = 1 - collapseProgress * 0.95;

  const showSparkle = (phase === "collapsing" && collapseProgress > 0.6) || phase === "converge";
  const sparkleOpacity =
    phase === "converge"
      ? 1
      : collapseProgress > 0.6
      ? Math.min(1, (collapseProgress - 0.6) / 0.3)
      : 0;
  const finalSparkleOpacity = phase === "converge" ? sparkleOpacity * convergeFade : sparkleOpacity;

  // 当前正在画的段
  let currentDrawing: LineSegment | null = null;
  if (
    phase === "connecting" &&
    currentSegmentIndex >= 0 &&
    currentSegmentIndex < stars.length - 1
  ) {
    const fromStar = stars[currentSegmentIndex];
    const toStar = stars[currentSegmentIndex + 1];
    if (fromStar && toStar) {
      const fromPos = getCollapsedPosition(fromStar.x, fromStar.y);
      const toPos = getCollapsedPosition(toStar.x, toStar.y);
      currentDrawing = {
        fromX: fromPos.x,
        fromY: fromPos.y,
        toX: fromPos.x + (toPos.x - fromPos.x) * currentSegmentProgress,
        toY: fromPos.y + (toPos.y - fromPos.y) * currentSegmentProgress,
      };
    }
  }

  return (
    <div
      className="absolute inset-0 z-[100] bg-black flex flex-col items-center justify-center overflow-hidden"
      style={{ opacity: phase === "converge" ? convergeFade : 1 }}
    >
      {/* 标题 + Slogan */}
      <div
        className="absolute top-[22%] left-0 right-0 flex flex-col items-center"
        style={{
          opacity: elementsOpacity,
          transform: `translateY(${titleCollapseY}vh) scale(${titleScale})`,
        }}
      >
        <h1
          className="text-white text-2xl tracking-[0.3em] font-extralight mb-6 font-display"
          style={{
            opacity: titleVisible ? 1 : 0,
            transform: titleVisible ? "translateY(0)" : "translateY(16px)",
            transition: "opacity 1.2s ease-out, transform 1.2s ease-out",
          }}
        >
          Sync · Unsigned
        </h1>

        <p
          className="text-white/60 text-sm tracking-[0.15em] font-light h-6 font-cn"
          style={{
            transform: `translateY(${sloganCollapseY}vh) scale(${sloganScale})`,
          }}
        >
          {FULL_SLOGAN.split("").map((char, i) => {
            const isPart1 = i < SLOGAN_PART1.length;
            const isVisible = isPart1
              ? i < visibleSloganCount
              : showPart2 && i - SLOGAN_PART1.length < visiblePart2Count;
            return (
              <span
                key={i}
                className="inline-block"
                style={{
                  opacity: isVisible ? 1 : 0,
                  transform: isVisible ? "translateY(0)" : "translateY(8px)",
                  transition: "opacity 0.35s ease-out, transform 0.35s ease-out",
                }}
              >
                {char}
              </span>
            );
          })}
        </p>
      </div>

      {/* 星座线 */}
      <svg
        className="absolute inset-0 w-full h-full pointer-events-none"
        style={{ opacity: elementsOpacity }}
      >
        {drawnPath.map((seg, i) => {
          const from = getCollapsedPosition(seg.fromX, seg.fromY);
          const to = getCollapsedPosition(seg.toX, seg.toY);
          return (
            <line
              key={i}
              x1={`${from.x}%`}
              y1={`${from.y}%`}
              x2={`${to.x}%`}
              y2={`${to.y}%`}
              stroke="white"
              strokeWidth={lineWidth}
              strokeLinecap="round"
            />
          );
        })}
        {currentDrawing && (
          <line
            x1={`${currentDrawing.fromX}%`}
            y1={`${currentDrawing.fromY}%`}
            x2={`${currentDrawing.toX}%`}
            y2={`${currentDrawing.toY}%`}
            stroke="white"
            strokeWidth={lineWidth}
            strokeLinecap="round"
          />
        )}
      </svg>

      {/* 星点 */}
      <div style={{ opacity: elementsOpacity }}>
        {stars.map((star) => {
          const pos = getCollapsedPosition(star.x, star.y);
          return (
            <div
              key={star.id}
              className="absolute"
              style={{
                left: `${pos.x}%`,
                top: `${pos.y}%`,
                transform: `translate(-50%, -50%) scale(${star.visible ? star.scale : 0})`,
                opacity: star.visible ? 1 : 0,
                transition: star.visible
                  ? "transform 0.5s ease-out, opacity 0.5s ease-out"
                  : "none",
              }}
            >
              <div
                className="absolute rounded-full bg-white/25 blur-md"
                style={{
                  width: `${starDiameter * 3}px`,
                  height: `${starDiameter * 3}px`,
                  left: `${-starDiameter}px`,
                  top: `${-starDiameter}px`,
                }}
              />
              <div
                className="rounded-full bg-white"
                style={{
                  width: `${starDiameter}px`,
                  height: `${starDiameter}px`,
                  boxShadow:
                    "0 0 8px rgba(255,255,255,0.9), 0 0 16px rgba(255,255,255,0.5)",
                }}
              />
            </div>
          );
        })}
      </div>

      {/* 中心四芒星 sparkle */}
      {showSparkle && (
        <div
          className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2"
          style={{ opacity: finalSparkleOpacity }}
        >
          <svg
            width="44"
            height="44"
            viewBox="0 0 40 40"
            className="drop-shadow-[0_0_15px_rgba(255,255,255,0.85)]"
          >
            <path
              d="M20 0 C20 10 22 18 20 20 C18 18 10 20 0 20 C10 20 18 22 20 20 C22 22 20 30 20 40 C20 30 18 22 20 20 C22 18 30 20 40 20 C30 20 22 18 20 20 C18 18 20 10 20 0 Z"
              fill="white"
            />
          </svg>
        </div>
      )}
    </div>
  );
}
