import { U as jsxRuntimeExports } from "./worker-entry-DQRps7mk.js";
import { L as Link } from "./router-vqVZ2fwF.js";
import { S as Starfield, P as PolarHUD } from "./PolarHUD-Buk1gcFF.js";
import { P as Penguin } from "./Penguin-C4bzaTTI.js";
function PageShell({
  title,
  subtitle,
  children
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative flex flex-col min-h-screen w-full overflow-hidden bg-background grain", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(Starfield, { count: 70 }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(PolarHUD, {}),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute top-[60px] left-4 z-30", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
      Link,
      {
        to: "/",
        className: "text-lg leading-none text-foreground/80 hover:text-foreground transition-colors",
        "aria-label": "返回主场景",
        children: "←"
      }
    ) }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("header", { className: "relative z-10 mt-24 text-center px-5", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("h1", { className: "text-2xl tracking-[0.4em] text-foreground/95 font-display", children: [
        "【",
        title,
        "】"
      ] }),
      subtitle && /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-3 text-[11px] tracking-[0.3em] text-muted-foreground font-cn", children: subtitle })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("main", { className: "relative z-10 flex-grow px-5 pb-20 pt-8", children }),
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
export {
  PageShell as P
};
