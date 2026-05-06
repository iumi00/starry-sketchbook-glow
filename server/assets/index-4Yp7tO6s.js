import { r as reactExports, U as jsxRuntimeExports } from "./worker-entry-DQRps7mk.js";
import { L as Link } from "./router-vqVZ2fwF.js";
import { S as Starfield, P as PolarHUD } from "./PolarHUD-Buk1gcFF.js";
import { P as Penguin } from "./Penguin-C4bzaTTI.js";
import "node:events";
import "node:async_hooks";
import "node:stream/web";
import "node:stream";
const SLOGAN_PART1 = "有些同频，";
const SLOGAN_PART2 = "不需要名字";
const FULL_SLOGAN = SLOGAN_PART1 + SLOGAN_PART2;
const PATTERNS = [
  // 弧线
  [
    { x: 25, y: 42 },
    { x: 35, y: 38 },
    { x: 45, y: 40 },
    { x: 52, y: 45 },
    { x: 60, y: 52 },
    { x: 68, y: 50 },
    { x: 75, y: 44 }
  ],
  // Orion 带
  [
    { x: 28, y: 46 },
    { x: 40, y: 44 },
    { x: 50, y: 48 },
    { x: 60, y: 44 },
    { x: 72, y: 46 }
  ],
  // 仙后座 W
  [
    { x: 25, y: 50 },
    { x: 38, y: 42 },
    { x: 50, y: 50 },
    { x: 62, y: 42 },
    { x: 75, y: 50 }
  ],
  // 柔和拱
  [
    { x: 25, y: 54 },
    { x: 38, y: 45 },
    { x: 50, y: 42 },
    { x: 62, y: 45 },
    { x: 75, y: 54 }
  ],
  // 上升斜线
  [
    { x: 28, y: 55 },
    { x: 40, y: 50 },
    { x: 50, y: 47 },
    { x: 60, y: 44 },
    { x: 72, y: 40 }
  ],
  // Z 形
  [
    { x: 25, y: 45 },
    { x: 38, y: 52 },
    { x: 50, y: 42 },
    { x: 62, y: 52 },
    { x: 75, y: 45 }
  ]
];
function IntroAnimation({ onDone }) {
  const [stars, setStars] = reactExports.useState([]);
  const [drawnPath, setDrawnPath] = reactExports.useState([]);
  const [currentSegmentProgress, setCurrentSegmentProgress] = reactExports.useState(0);
  const [currentSegmentIndex, setCurrentSegmentIndex] = reactExports.useState(-1);
  const [phase, setPhase] = reactExports.useState("title");
  const [collapseProgress, setCollapseProgress] = reactExports.useState(0);
  const [titleVisible, setTitleVisible] = reactExports.useState(false);
  const [visibleSloganCount, setVisibleSloganCount] = reactExports.useState(0);
  const [showPart2, setShowPart2] = reactExports.useState(false);
  const [visiblePart2Count, setVisiblePart2Count] = reactExports.useState(0);
  const [convergeFade, setConvergeFade] = reactExports.useState(1);
  const initRef = reactExports.useRef(false);
  const starDiameter = 9;
  const lineWidth = 2.2;
  reactExports.useEffect(() => {
    if (initRef.current) return;
    initRef.current = true;
    const pattern = PATTERNS[Math.floor(Math.random() * PATTERNS.length)];
    setStars(
      pattern.map((p, i) => ({ id: i, x: p.x, y: p.y, visible: false, scale: 1 }))
    );
  }, []);
  reactExports.useEffect(() => {
    if (phase !== "title") return;
    const t1 = setTimeout(() => setTitleVisible(true), 400);
    const t2 = setTimeout(() => setPhase("slogan"), 2400);
    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
    };
  }, [phase]);
  reactExports.useEffect(() => {
    if (phase !== "slogan") return;
    let charIndex = 0;
    let timeoutId;
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
  reactExports.useEffect(() => {
    if (phase !== "stars" || stars.length === 0) return;
    let i = 0;
    const id = setInterval(() => {
      if (i < stars.length) {
        const idx = i;
        setStars((prev) => prev.map((s, j) => j === idx ? { ...s, visible: true } : s));
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
  reactExports.useEffect(() => {
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
          { fromX: fromStar.x, fromY: fromStar.y, toX: toStar.x, toY: toStar.y }
        ]);
        setCurrentSegmentProgress(0);
        setCurrentSegmentIndex((p) => p + 1);
      }
    };
    raf = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(raf);
  }, [phase, currentSegmentIndex, stars]);
  reactExports.useEffect(() => {
    if (phase !== "pause") return;
    const t = setTimeout(() => setPhase("collapsing"), 1500);
    return () => clearTimeout(t);
  }, [phase]);
  reactExports.useEffect(() => {
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
  reactExports.useEffect(() => {
    if (phase !== "converge") return;
    let notified = false;
    const fadeT = setTimeout(() => {
      const duration = 900;
      const startTime = Date.now();
      let raf = 0;
      const animate = () => {
        const elapsed = Date.now() - startTime;
        const progress = Math.min(elapsed / duration, 1);
        setConvergeFade(1 - progress);
        if (!notified && progress > 0.55) {
          notified = true;
          onDone();
        }
        if (progress < 1) raf = requestAnimationFrame(animate);
        else setPhase("done");
      };
      raf = requestAnimationFrame(animate);
      return () => cancelAnimationFrame(raf);
    }, 400);
    return () => clearTimeout(fadeT);
  }, [phase, onDone]);
  const getCollapsedPosition = reactExports.useCallback(
    (x, y) => ({
      x: x + (50 - x) * collapseProgress,
      y: y + (50 - y) * collapseProgress
    }),
    [collapseProgress]
  );
  const elementsOpacity = phase === "collapsing" || phase === "converge" ? Math.max(0, 1 - collapseProgress * 1.5) : 1;
  const titleCollapseY = collapseProgress * 28;
  const titleScale = 1 - collapseProgress * 0.95;
  const sloganCollapseY = collapseProgress * 22;
  const sloganScale = 1 - collapseProgress * 0.95;
  const showSparkle = phase === "collapsing" && collapseProgress > 0.6 || phase === "converge";
  const sparkleOpacity = phase === "converge" ? 1 : collapseProgress > 0.6 ? Math.min(1, (collapseProgress - 0.6) / 0.3) : 0;
  const finalSparkleOpacity = phase === "converge" ? sparkleOpacity * convergeFade : sparkleOpacity;
  let currentDrawing = null;
  if (phase === "connecting" && currentSegmentIndex >= 0 && currentSegmentIndex < stars.length - 1) {
    const fromStar = stars[currentSegmentIndex];
    const toStar = stars[currentSegmentIndex + 1];
    if (fromStar && toStar) {
      const fromPos = getCollapsedPosition(fromStar.x, fromStar.y);
      const toPos = getCollapsedPosition(toStar.x, toStar.y);
      currentDrawing = {
        fromX: fromPos.x,
        fromY: fromPos.y,
        toX: fromPos.x + (toPos.x - fromPos.x) * currentSegmentProgress,
        toY: fromPos.y + (toPos.y - fromPos.y) * currentSegmentProgress
      };
    }
  }
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    "div",
    {
      className: "absolute inset-0 z-[100] bg-black flex flex-col items-center justify-center overflow-hidden",
      style: { opacity: phase === "converge" ? convergeFade : 1 },
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "div",
          {
            className: "absolute top-[22%] left-0 right-0 flex flex-col items-center",
            style: {
              opacity: elementsOpacity,
              transform: `translateY(${titleCollapseY}vh) scale(${titleScale})`
            },
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                "h1",
                {
                  className: "text-white text-2xl tracking-[0.3em] font-extralight mb-6 font-display",
                  style: {
                    opacity: titleVisible ? 1 : 0,
                    transform: titleVisible ? "translateY(0)" : "translateY(16px)",
                    transition: "opacity 1.2s ease-out, transform 1.2s ease-out"
                  },
                  children: "Sync · Unsigned"
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                "p",
                {
                  className: "text-white/60 text-sm tracking-[0.15em] font-light h-6 font-cn",
                  style: {
                    transform: `translateY(${sloganCollapseY}vh) scale(${sloganScale})`
                  },
                  children: FULL_SLOGAN.split("").map((char, i) => {
                    const isPart1 = i < SLOGAN_PART1.length;
                    const isVisible = isPart1 ? i < visibleSloganCount : showPart2 && i - SLOGAN_PART1.length < visiblePart2Count;
                    return /* @__PURE__ */ jsxRuntimeExports.jsx(
                      "span",
                      {
                        className: "inline-block",
                        style: {
                          opacity: isVisible ? 1 : 0,
                          transform: isVisible ? "translateY(0)" : "translateY(8px)",
                          transition: "opacity 0.35s ease-out, transform 0.35s ease-out"
                        },
                        children: char
                      },
                      i
                    );
                  })
                }
              )
            ]
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "svg",
          {
            className: "absolute inset-0 w-full h-full pointer-events-none",
            style: { opacity: elementsOpacity },
            children: [
              drawnPath.map((seg, i) => {
                const from = getCollapsedPosition(seg.fromX, seg.fromY);
                const to = getCollapsedPosition(seg.toX, seg.toY);
                return /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "line",
                  {
                    x1: `${from.x}%`,
                    y1: `${from.y}%`,
                    x2: `${to.x}%`,
                    y2: `${to.y}%`,
                    stroke: "white",
                    strokeWidth: lineWidth,
                    strokeLinecap: "round"
                  },
                  i
                );
              }),
              currentDrawing && /* @__PURE__ */ jsxRuntimeExports.jsx(
                "line",
                {
                  x1: `${currentDrawing.fromX}%`,
                  y1: `${currentDrawing.fromY}%`,
                  x2: `${currentDrawing.toX}%`,
                  y2: `${currentDrawing.toY}%`,
                  stroke: "white",
                  strokeWidth: lineWidth,
                  strokeLinecap: "round"
                }
              )
            ]
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { style: { opacity: elementsOpacity }, children: stars.map((star) => {
          const pos = getCollapsedPosition(star.x, star.y);
          return /* @__PURE__ */ jsxRuntimeExports.jsxs(
            "div",
            {
              className: "absolute",
              style: {
                left: `${pos.x}%`,
                top: `${pos.y}%`,
                transform: `translate(-50%, -50%) scale(${star.visible ? star.scale : 0})`,
                opacity: star.visible ? 1 : 0,
                transition: star.visible ? "transform 0.5s ease-out, opacity 0.5s ease-out" : "none"
              },
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "div",
                  {
                    className: "absolute rounded-full bg-white/25 blur-md",
                    style: {
                      width: `${starDiameter * 3}px`,
                      height: `${starDiameter * 3}px`,
                      left: `${-starDiameter}px`,
                      top: `${-starDiameter}px`
                    }
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "div",
                  {
                    className: "rounded-full bg-white",
                    style: {
                      width: `${starDiameter}px`,
                      height: `${starDiameter}px`,
                      boxShadow: "0 0 8px rgba(255,255,255,0.9), 0 0 16px rgba(255,255,255,0.5)"
                    }
                  }
                )
              ]
            },
            star.id
          );
        }) }),
        showSparkle && /* @__PURE__ */ jsxRuntimeExports.jsx(
          "div",
          {
            className: "absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2",
            style: { opacity: finalSparkleOpacity },
            children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
              "svg",
              {
                width: "48",
                height: "48",
                viewBox: "0 0 40 40",
                className: "drop-shadow-[0_0_18px_rgba(255,255,255,0.9)]",
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    "path",
                    {
                      d: "M 20 0 Q 22 18 20 20 Q 18 18 20 0 Z\r\n                 M 40 20 Q 22 22 20 20 Q 22 18 40 20 Z\r\n                 M 20 40 Q 18 22 20 20 Q 22 22 20 40 Z\r\n                 M 0 20 Q 18 18 20 20 Q 18 22 0 20 Z",
                      fill: "white"
                    }
                  ),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("circle", { cx: "20", cy: "20", r: "1.6", fill: "white" })
                ]
              }
            )
          }
        )
      ]
    }
  );
}
const ENTRIES = [
  { to: "/carve", label: "刻录", hint: "写下此刻" },
  { to: "/shiguang", label: "拾光", hint: "看别人的" },
  { to: "/echo", label: "回声", hint: "消息中心" },
  { to: "/trail", label: "星轨", hint: "我的档案" },
  { to: "/keeper", label: "守夜人", hint: "AI 陪伴" }
];
function MainScene() {
  const [hasNewEcho, setHasNewEcho] = reactExports.useState(false);
  reactExports.useEffect(() => {
    const checkNewEcho = () => {
      const userEchoes = localStorage.getItem("userEchoes");
      const lastViewedEcho = localStorage.getItem("lastViewedEcho");
      if (userEchoes) {
        try {
          const echoList = JSON.parse(userEchoes);
          const hasUnviewed = echoList.length > 0 && (!lastViewedEcho || echoList[0].publishTime > parseInt(lastViewedEcho));
          setHasNewEcho(hasUnviewed);
        } catch (error) {
          console.error("解析用户回声失败:", error);
          setHasNewEcho(false);
        }
      } else {
        setHasNewEcho(false);
      }
    };
    checkNewEcho();
    const interval = setInterval(checkNewEcho, 5e3);
    return () => clearInterval(interval);
  }, []);
  const handleEchoClick = () => {
    const userEchoes = localStorage.getItem("userEchoes");
    if (userEchoes) {
      try {
        const echoList = JSON.parse(userEchoes);
        if (echoList.length > 0) {
          localStorage.setItem("lastViewedEcho", echoList[0].publishTime.toString());
        }
      } catch (error) {
        console.error("解析用户回声失败:", error);
      }
    }
    setHasNewEcho(false);
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative min-h-screen w-full overflow-hidden bg-background grain", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(Starfield, { count: 120 }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(PolarHUD, {}),
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      "span",
      {
        "aria-hidden": true,
        className: "pointer-events-none absolute top-[10%] left-[-10%] w-24 h-[1px] bg-gradient-to-r from-transparent via-white to-transparent",
        style: { animation: "shooting-star 9s linear infinite", animationDelay: "3s" }
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsx("nav", { className: "absolute left-0 right-0 top-[30%] flex flex-col items-center gap-5 z-20", children: ENTRIES.map((e, i) => {
      const isEcho = e.to === "/echo";
      return /* @__PURE__ */ jsxRuntimeExports.jsxs(
        Link,
        {
          to: e.to,
          onClick: isEcho ? handleEchoClick : void 0,
          className: "group select-none flex flex-col items-center relative",
          style: {
            animation: `fade-up 0.7s ease-out ${0.15 + i * 0.1}s both`
          },
          children: [
            isEcho && hasNewEcho && /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "absolute -top-1 -right-2 w-2 h-2 bg-green-500 rounded-full animate-pulse" }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-base tracking-[0.35em] text-foreground/90 font-cn group-hover:text-aurora transition-colors", children: [
              "【",
              e.label,
              "】"
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "mt-0.5 text-[10px] tracking-[0.25em] text-muted-foreground/70 opacity-0 group-hover:opacity-100 transition-opacity font-hand", children: e.hint })
          ]
        },
        e.to
      );
    }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "pointer-events-none absolute inset-x-0 bottom-0 h-[38%]", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        "div",
        {
          className: "absolute left-1/2 -translate-x-1/2 z-10",
          style: { bottom: "calc(45% - 0.954px)" },
          children: /* @__PURE__ */ jsxRuntimeExports.jsx(Penguin, { size: 38 })
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(
        "svg",
        {
          viewBox: "0 0 1000 400",
          preserveAspectRatio: "none",
          className: "absolute inset-x-0 bottom-0 w-[180%] left-1/2 -translate-x-1/2 h-full",
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "path",
              {
                d: "M -50 380 Q 500 60 1050 380 L 1050 400 L -50 400 Z",
                fill: "oklch(0.06 0.005 250)",
                stroke: "rgba(255,255,255,0.55)",
                strokeWidth: "1.2"
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "path",
              {
                d: "M -50 388 Q 500 72 1050 388",
                fill: "none",
                stroke: "rgba(255,255,255,0.18)",
                strokeWidth: "0.8",
                strokeDasharray: "2 4"
              }
            ),
            Array.from({ length: 14 }).map((_, i) => {
              const t = (i + 1) / 15;
              const x = 1100 * t - 50;
              const y = 380 - 4 * (1 - t) * t * 320;
              return /* @__PURE__ */ jsxRuntimeExports.jsx("circle", { cx: x, cy: y - 1, r: "0.8", fill: "white", opacity: 0.55 }, i);
            })
          ]
        }
      )
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute bottom-3 left-1/2 -translate-x-1/2 z-30 text-[10px] tracking-[0.3em] text-muted-foreground/70 font-cn whitespace-nowrap", children: "极夜漫长 · 你不是一个人在等" })
  ] });
}
function Index() {
  const [mounted, setMounted] = reactExports.useState(false);
  const [showIntro, setShowIntro] = reactExports.useState(!sessionStorage.getItem("hasPlayedIntro"));
  reactExports.useEffect(() => {
    setMounted(true);
  }, []);
  return /* @__PURE__ */ jsxRuntimeExports.jsx(jsxRuntimeExports.Fragment, { children: mounted && showIntro ? /* @__PURE__ */ jsxRuntimeExports.jsx(IntroAnimation, { onDone: () => {
    setShowIntro(false);
    sessionStorage.setItem("hasPlayedIntro", "true");
  } }) : /* @__PURE__ */ jsxRuntimeExports.jsx(MainScene, {}) });
}
export {
  Index as component
};
