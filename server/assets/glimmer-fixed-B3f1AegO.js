import { r as reactExports, U as jsxRuntimeExports } from "./worker-entry-DQRps7mk.js";
import { S as Starfield, P as PolarHUD } from "./PolarHUD-Buk1gcFF.js";
import { L as Link } from "./router-vqVZ2fwF.js";
import { A as AnimatePresence, m as motion } from "./proxy-zzckLQPu.js";
import "node:events";
import "node:async_hooks";
import "node:stream/web";
import "node:stream";
const MESSAGES = ["今天在图书馆看到一个很像你的人，我的心跳停了一拍。", "深夜的便利店，我们同时伸手拿了同一罐咖啡。", "你说得对，有些共鸣确实不需要名字。", "那天的晚霞很温柔，像你一样。", "我一直在等一颗星星落下来，直到遇见了你。"];
function Glimmer() {
  const [stage, setStage] = reactExports.useState("seeking");
  const [message] = reactExports.useState(() => MESSAGES[Math.floor(Math.random() * MESSAGES.length)]);
  const [showCard, setShowCard] = reactExports.useState(false);
  reactExports.useEffect(() => {
    if (stage === "seeking") {
      const timer1 = setTimeout(() => {
        setStage("touching");
      }, 1500);
      const timer2 = setTimeout(() => {
        setStage("blooming");
      }, 2500);
      const timer3 = setTimeout(() => {
        setShowCard(true);
      }, 2500);
      return () => {
        clearTimeout(timer1);
        clearTimeout(timer2);
        clearTimeout(timer3);
      };
    }
  }, [stage]);
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative flex flex-col min-h-screen w-full overflow-hidden bg-background grain", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(Starfield, { count: 120 }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(PolarHUD, {}),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute top-[60px] left-4 z-30", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/", className: "text-lg leading-none text-foreground/80 hover:text-foreground transition-colors", "aria-label": "返回主场景", children: "←" }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(AnimatePresence, { children: stage === "seeking" && /* @__PURE__ */ jsxRuntimeExports.jsxs(motion.div, { initial: {
      opacity: 0
    }, animate: {
      opacity: 1
    }, exit: {
      opacity: 0
    }, transition: {
      duration: 0.8,
      ease: "easeOut"
    }, className: "absolute top-20 left-1/2 -translate-x-1/2 z-20", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(motion.div, { initial: {
        y: -100,
        scale: 0.5,
        opacity: 0
      }, animate: {
        y: 0,
        scale: 1,
        opacity: 1
      }, transition: {
        duration: 1.5,
        ease: [0.4, 0, 0.2, 1],
        delay: 0.2
      }, className: "relative", children: /* @__PURE__ */ jsxRuntimeExports.jsx(motion.div, { className: "w-3 h-3 bg-white rounded-full", animate: {
        boxShadow: ["0 0 20px rgba(255,255,255,0.8)", "0 0 40px rgba(255,255,255,0.6)", "0 0 60px rgba(255,255,255,0.4)", "0 0 80px rgba(255,255,255,0.2)"]
      }, transition: {
        duration: 2,
        repeat: Infinity,
        ease: "easeInOut"
      } }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(motion.div, { initial: {
        opacity: 0,
        y: -20
      }, animate: {
        opacity: 1,
        y: 20
      }, transition: {
        delay: 0.8,
        duration: 0.6
      }, className: "text-center", children: /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm tracking-wider text-white/60 font-cn", children: "『正在为你捕获一颗遥远的星...』" }) })
    ] }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(AnimatePresence, { children: stage === "touching" && /* @__PURE__ */ jsxRuntimeExports.jsxs(motion.div, { initial: {
      opacity: 0
    }, animate: {
      opacity: 1
    }, exit: {
      opacity: 0
    }, transition: {
      duration: 0.6,
      ease: "easeOut"
    }, className: "absolute inset-0 flex items-center justify-center z-20", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(motion.div, { className: "w-4 h-4 bg-white rounded-full", animate: {
        scale: [1, 1.2, 1],
        boxShadow: ["0 0 0px rgba(255,255,255,0.8)", "0 0 30px rgba(255,255,255,0.6)", "0 0 60px rgba(255,255,255,0.3)", "0 0 90px rgba(255,255,255,0.1)"]
      }, transition: {
        duration: 1.5,
        repeat: 2,
        ease: "easeInOut"
      } }),
      [...Array(3)].map((_, i) => /* @__PURE__ */ jsxRuntimeExports.jsx(motion.div, { className: "absolute border border-white/20 rounded-full", initial: {
        scale: 0,
        opacity: 0.8
      }, animate: {
        scale: [0, 2, 3],
        opacity: [0.8, 0.4, 0]
      }, transition: {
        duration: 1.5,
        delay: i * 0.2,
        ease: "easeOut"
      }, style: {
        width: `${80 + i * 40}px`,
        height: `${80 + i * 40}px`
      } }, i)),
      /* @__PURE__ */ jsxRuntimeExports.jsx(motion.p, { initial: {
        opacity: 0
      }, animate: {
        opacity: 1
      }, transition: {
        delay: 0.3,
        duration: 0.4
      }, className: "absolute top-1/3 left-1/2 -translate-x-1/2 text-center", children: /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-lg tracking-wider text-white/80 font-cn", children: "『捕获成功。』" }) })
    ] }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(AnimatePresence, { children: stage === "blooming" && /* @__PURE__ */ jsxRuntimeExports.jsxs(motion.div, { layoutId: "star-card", initial: {
      scale: 0,
      borderRadius: "50%",
      opacity: 0
    }, animate: {
      scale: 1,
      borderRadius: "12px",
      opacity: 1
    }, transition: {
      duration: 1.2,
      ease: [0.4, 0, 0.2, 1]
    }, className: "absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-80 max-w-[90vw] bg-white/5 backdrop-blur-md border border-white/10 rounded-xl p-6 z-20", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(AnimatePresence, { children: showCard && /* @__PURE__ */ jsxRuntimeExports.jsx(motion.p, { initial: {
        opacity: 0
      }, animate: {
        opacity: 1
      }, transition: {
        delay: 0.3,
        duration: 0.8
      }, className: "text-[15px] leading-relaxed text-white font-cn", children: message }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(AnimatePresence, { children: showCard && /* @__PURE__ */ jsxRuntimeExports.jsxs(motion.div, { initial: {
        opacity: 0,
        y: 20
      }, animate: {
        opacity: 1,
        y: 0
      }, transition: {
        delay: 0.6,
        duration: 0.5
      }, className: "flex justify-center gap-4 mt-6", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs(motion.button, { whileHover: {
          scale: 1.05
        }, whileTap: {
          scale: 0.95
        }, className: "flex items-center gap-2 px-4 py-2 bg-white/10 hover:bg-white/20 border border-white/20 rounded-full text-white/80 text-sm transition-colors", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "共鸣" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "✨" })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(motion.button, { whileHover: {
          scale: 1.05
        }, whileTap: {
          scale: 0.95
        }, className: "flex items-center gap-2 px-4 py-2 bg-white/10 hover:bg-white/20 border border-white/20 rounded-full text-white/80 text-sm transition-colors", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "回信" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "✉️" })
        ] })
      ] }) })
    ] }) })
  ] });
}
export {
  Glimmer as component
};
