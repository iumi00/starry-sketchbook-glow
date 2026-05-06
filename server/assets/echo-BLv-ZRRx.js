import { r as reactExports, U as jsxRuntimeExports } from "./worker-entry-DQRps7mk.js";
import { L as Link } from "./router-vqVZ2fwF.js";
import { S as Starfield, P as PolarHUD } from "./PolarHUD-Buk1gcFF.js";
import "node:events";
import "node:async_hooks";
import "node:stream/web";
import "node:stream";
const REPLIES = [];
const getTimeDifference = (publishTime) => {
  const now = /* @__PURE__ */ new Date();
  const diff = now.getTime() - publishTime.getTime();
  const minutes = Math.floor(diff / (1e3 * 60));
  const hours = Math.floor(diff / (1e3 * 60 * 60));
  const days = Math.floor(diff / (1e3 * 60 * 60 * 24));
  if (minutes < 1) {
    return "刚刚";
  } else if (minutes < 60) {
    return `${minutes} 分钟前`;
  } else if (hours < 24) {
    return `${hours} 小时前`;
  } else {
    return `${days} 日前`;
  }
};
const getDynamicEchoes = () => {
  const userEchoes = localStorage.getItem("userEchoes");
  let dynamicEchoes = [];
  if (userEchoes) {
    try {
      dynamicEchoes = JSON.parse(userEchoes);
    } catch (error) {
      console.error("解析用户回声失败:", error);
      dynamicEchoes = [];
    }
  }
  return [...dynamicEchoes, ...REPLIES];
};
function Echo() {
  const [aurora, setAurora] = reactExports.useState(null);
  const [auroraText, setAuroraText] = reactExports.useState("");
  const [waveSentCards, setWaveSentCards] = reactExports.useState(/* @__PURE__ */ new Set());
  const [auroraSentCards, setAuroraSentCards] = reactExports.useState(/* @__PURE__ */ new Set());
  const [reportModal, setReportModal] = reactExports.useState(null);
  const [reportReason, setReportReason] = reactExports.useState("");
  const [removedCards, setRemovedCards] = reactExports.useState(/* @__PURE__ */ new Set());
  const [showThanksModal, setShowThanksModal] = reactExports.useState(false);
  const [thanksText, setThanksText] = reactExports.useState("");
  const dynamicEchoes = getDynamicEchoes();
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative flex flex-col min-h-screen w-full overflow-hidden bg-background grain", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(Starfield, { count: 70 }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(PolarHUD, {}),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute top-[60px] left-4 z-30", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/", className: "text-lg leading-none text-foreground/80 hover:text-foreground transition-colors", "aria-label": "返回主场景", children: "←" }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("header", { className: "relative z-10 mt-24 text-center px-5", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "text-2xl tracking-[0.4em] text-foreground/95 font-display", children: "【回声】" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-3 text-[11px] tracking-[0.3em] text-muted-foreground font-cn", children: "消息中心" })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("main", { className: "relative z-10 flex-grow px-5 pb-20 pt-8", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mx-auto max-w-md space-y-5", children: dynamicEchoes.map((r, i) => {
      if (removedCards.has(i)) return null;
      const timeDisplay = r.publishTime ? getTimeDifference(new Date(r.publishTime)) : r.when;
      return /* @__PURE__ */ jsxRuntimeExports.jsxs("article", { className: "pencil-border bg-card/40 backdrop-blur-sm p-5 animate-fade-up", style: {
        animationDelay: `${i * 0.1}s`
      }, children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between text-[10px] tracking-[0.25em] text-white", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: r.from }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: timeDisplay })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-3 pl-3 border-l border-border/60 text-[11px] text-muted-foreground font-cn leading-relaxed", children: [
          "你说：",
          r.your.length > 25 ? r.your.substring(0, 25) + "..." : r.your
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-4 text-[15px] leading-[1.9] text-foreground/95 font-cn", children: r.text }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-5 pt-3 border-t border-border/50 flex items-center justify-between text-[11px] tracking-[0.25em]", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("button", { onClick: () => {
            if (!auroraSentCards.has(i)) {
              const newAuroraSentCards = new Set(auroraSentCards);
              newAuroraSentCards.add(i);
              setAuroraSentCards(newAuroraSentCards);
              setAurora(i);
              setAuroraText("");
              const fullMessage = "一道极光已送达对方夜空";
              let index = 0;
              const timer = setInterval(() => {
                if (index < fullMessage.length) {
                  setAuroraText(fullMessage.substring(0, index + 1));
                  index++;
                } else {
                  clearInterval(timer);
                }
              }, 100);
            }
          }, className: `transition-opacity ${auroraSentCards.has(i) ? "text-aurora/50 cursor-not-allowed" : "text-aurora hover:opacity-80"}`, disabled: auroraSentCards.has(i), children: auroraSentCards.has(i) ? "✦" : "✦ 送一道极光" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("button", { onClick: () => {
            const newWaveSentCards = new Set(waveSentCards);
            newWaveSentCards.add(i);
            setWaveSentCards(newWaveSentCards);
          }, className: "text-white hover:text-white/80 transition-colors flex items-center space-x-2", children: waveSentCards.has(i) ? /* @__PURE__ */ jsxRuntimeExports.jsx("svg", { width: "16", height: "12", viewBox: "0 0 16 12", fill: "none", className: "opacity-80", children: /* @__PURE__ */ jsxRuntimeExports.jsx("path", { d: "M1 6 L3 6 L4 2 L6 10 L8 4 L10 8 L12 3 L13 6 L15 6", stroke: "#ec4899", strokeWidth: "1", fill: "none", strokeLinecap: "round", strokeLinejoin: "round" }) }) : /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "发去一道感谢电波" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("svg", { width: "16", height: "12", viewBox: "0 0 16 12", fill: "none", className: "opacity-80", children: /* @__PURE__ */ jsxRuntimeExports.jsx("path", { d: "M1 6 L3 6 L4 2 L6 10 L8 4 L10 8 L12 3 L13 6 L15 6", stroke: "currentColor", strokeWidth: "1", fill: "none", strokeLinecap: "round", strokeLinejoin: "round" }) })
          ] }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("button", { onClick: () => setReportModal(i), className: "text-muted-foreground hover:text-foreground transition-colors", children: "标记不适" })
        ] })
      ] }, i);
    }) }) }),
    aurora !== null && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "fixed inset-0 z-50 pointer-events-none animate-fade-in", onAnimationEnd: () => setTimeout(() => setAurora(null), 1800), children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute inset-0", style: {
        background: "radial-gradient(ellipse at 50% 0%, oklch(0.78 0.16 165 / 0.45), transparent 60%), radial-gradient(ellipse at 30% 20%, oklch(0.82 0.12 80 / 0.25), transparent 50%)",
        animation: "fade-in 0.6s ease-out"
      } }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute inset-0 flex items-center justify-center", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "bg-background/90 backdrop-blur-md border border-white/20 rounded-lg p-6 max-w-sm mx-4", children: /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-white font-cn text-lg text-center tracking-[0.3em]", children: auroraText }) }) })
    ] }),
    reportModal !== null && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-background/90 backdrop-blur-md border border-white/20 rounded-lg p-6 max-w-sm mx-4 w-full", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "text-white/90 font-cn text-lg mb-4", children: "标记不适" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-white/70 font-cn text-sm mb-4", children: "是否标记该留言为不适内容？" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mb-4", children: /* @__PURE__ */ jsxRuntimeExports.jsx("textarea", { value: reportReason, onChange: (e) => setReportReason(e.target.value), placeholder: "请填写标记理由（可选）", className: "w-full min-h-[80px] p-3 border border-white/10 bg-white/5 backdrop-blur-md rounded-lg text-white placeholder:text-white/50 resize-none focus:outline-none focus:border-white/20 transition-colors text-sm" }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex justify-end space-x-3", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("button", { onClick: () => {
          setReportModal(null);
          setReportReason("");
        }, className: "px-4 py-2 text-white/60 hover:text-white transition-colors text-sm", children: "取消" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("button", { onClick: () => {
          if (reportModal !== null) {
            const newRemovedCards = new Set(removedCards);
            newRemovedCards.add(reportModal);
            setRemovedCards(newRemovedCards);
            setReportModal(null);
            setReportReason("");
            setTimeout(() => {
              setShowThanksModal(true);
              setThanksText("");
              const fullMessage = "谢谢你的标记，\n夜空安全员已介入该碎星运行轨迹，\n极夜星空由我们共同守护。";
              let index = 0;
              const timer = setInterval(() => {
                if (index < fullMessage.length) {
                  setThanksText(fullMessage.substring(0, index + 1));
                  index++;
                } else {
                  clearInterval(timer);
                  setTimeout(() => {
                    setShowThanksModal(false);
                    setThanksText("");
                  }, 3e3);
                }
              }, 80);
            }, 300);
          }
        }, className: "px-4 py-2 bg-red-500/20 text-red-400 hover:bg-red-500/30 transition-colors rounded-lg text-sm", children: "确认" })
      ] })
    ] }) }),
    showThanksModal && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "bg-background/90 backdrop-blur-md border border-white/20 rounded-lg p-6 max-w-md mx-4", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-white font-cn text-lg text-center leading-relaxed tracking-[0.1em] whitespace-pre-line", children: thanksText }) }) })
  ] });
}
export {
  Echo as component
};
