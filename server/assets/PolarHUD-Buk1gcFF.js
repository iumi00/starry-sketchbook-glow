import { r as reactExports, U as jsxRuntimeExports } from "./worker-entry-DQRps7mk.js";
function Starfield({ count = 80, className = "" }) {
  const [mounted, setMounted] = reactExports.useState(false);
  reactExports.useEffect(() => setMounted(true), []);
  const stars = reactExports.useMemo(() => {
    if (!mounted) return [];
    return Array.from({ length: count }, (_, i) => {
      const isSquare = Math.random() > 0.55;
      const size = Math.random() * 2 + 1;
      return {
        i,
        isSquare,
        size,
        top: Math.random() * 100,
        left: Math.random() * 100,
        delay: Math.random() * 6,
        duration: 2.5 + Math.random() * 4,
        opacity: 0.3 + Math.random() * 0.7
      };
    });
  }, [count, mounted]);
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    "div",
    {
      className: `pointer-events-none absolute inset-0 overflow-hidden ${className}`,
      "aria-hidden": true,
      children: stars.map((s) => /* @__PURE__ */ jsxRuntimeExports.jsx(
        "span",
        {
          style: {
            position: "absolute",
            top: `${s.top}%`,
            left: `${s.left}%`,
            width: `${s.size}px`,
            height: `${s.size}px`,
            background: "var(--color-star)",
            borderRadius: s.isSquare ? "0px" : "50%",
            opacity: s.opacity,
            animation: `twinkle ${s.duration}s ease-in-out ${s.delay}s infinite`,
            boxShadow: s.size > 2 ? "0 0 4px rgba(255,255,255,0.6)" : void 0
          }
        },
        s.i
      ))
    }
  );
}
const WEATHERS = [
  { label: "极夜·极光", temp: "-38℃" },
  { label: "极夜·暴雪", temp: "-42℃" },
  { label: "极夜·晴·星河", temp: "-47℃" }
];
function PolarHUD() {
  const [w, setW] = reactExports.useState(0);
  const [code, setCode] = reactExports.useState(null);
  reactExports.useEffect(() => {
    const stored = Number(sessionStorage.getItem("dailyCode") ?? 0);
    if (stored) {
      setCode(stored);
    } else {
      const n = Math.floor(Math.random() * 900) + 100;
      sessionStorage.setItem("dailyCode", String(n));
      setCode(n);
    }
  }, []);
  reactExports.useEffect(() => {
    const id = setInterval(() => setW((v) => (v + 1) % WEATHERS.length), 7e3);
    return () => clearInterval(id);
  }, []);
  const cur = WEATHERS[w];
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute top-4 left-4 z-30 text-[11px] tracking-widest text-muted-foreground font-cn select-none", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-1.5", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "opacity-70", children: "📍" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "南极点" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "opacity-30", children: "|" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "animate-fade-in", children: cur.label }, cur.label),
      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-foreground/80", children: cur.temp })
    ] }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "absolute top-4 right-4 z-30 flex items-center gap-2 select-none", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-right", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-[10px] tracking-[0.25em] text-muted-foreground", children: "今日代号" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-xs tracking-[0.2em] text-foreground/90 font-display min-w-[5em]", children: code !== null ? `碎星 #${String(code).padStart(3, "0")}` : "碎星 #···" })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-8 h-8 rounded-full border border-border flex items-center justify-center bg-card/40 backdrop-blur-sm", children: /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs", children: "✦" }) })
    ] })
  ] });
}
export {
  PolarHUD as P,
  Starfield as S
};
