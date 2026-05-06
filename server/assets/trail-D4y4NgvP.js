import { U as jsxRuntimeExports } from "./worker-entry-DQRps7mk.js";
import { S as Starfield, P as PolarHUD } from "./PolarHUD-Buk1gcFF.js";
import { L as Link } from "./router-vqVZ2fwF.js";
import { g as getDynamicStarMemories } from "./starMemories-Btz2dp-v.js";
import "node:events";
import "node:async_hooks";
import "node:stream/web";
import "node:stream";
function Trail() {
  const starMemories = getDynamicStarMemories();
  const getDynamicCommentCount = (memoryId) => {
    if (typeof window === "undefined" || typeof localStorage === "undefined") {
      return 0;
    }
    const trailComments = localStorage.getItem("trailComments");
    if (trailComments) {
      try {
        const commentsData = JSON.parse(trailComments);
        const comments = commentsData[memoryId] || [];
        const isSpecialMessage = comments.some((comment) => comment.text.includes("期末成绩出了") || comment.text.includes("复习了整整一个月"));
        if (isSpecialMessage) {
          return 18;
        } else if (comments.length > 0) {
          return 1;
        } else {
          return 0;
        }
      } catch (error) {
        console.error("解析星轨留言数据失败:", error);
        return 0;
      }
    }
    return 0;
  };
  const getDynamicLikeCount = (memoryId) => {
    if (typeof window === "undefined" || typeof localStorage === "undefined") {
      return 0;
    }
    const trailComments = localStorage.getItem("trailComments");
    if (trailComments) {
      try {
        const commentsData = JSON.parse(trailComments);
        const comments = commentsData[memoryId] || [];
        const isSpecialMessage = comments.some((comment) => comment.text.includes("期末成绩出了") || comment.text.includes("复习了整整一个月"));
        if (isSpecialMessage) {
          return 32;
        } else if (comments.length > 0) {
          return Math.floor(Math.random() * 11);
        } else {
          return 0;
        }
      } catch (error) {
        console.error("解析星轨留言数据失败:", error);
        return 0;
      }
    }
    return 0;
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative flex flex-col min-h-screen w-full bg-background grain overflow-y-auto", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(Starfield, { count: 70 }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(PolarHUD, {}),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute top-[60px] left-4 z-30", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/", className: "text-lg leading-none text-foreground/80 hover:text-foreground transition-colors", "aria-label": "返回主场景", children: "←" }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("header", { className: "relative z-10 mt-24 text-center px-5", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "text-2xl tracking-[0.4em] text-foreground/95 font-display", children: "【星轨】" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-3 text-[11px] tracking-[0.3em] text-muted-foreground font-cn", children: "你的星轨，每颗星都是一段记忆" })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "relative flex-1 mt-4 px-20", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute left-20 top-2 bottom-0 w-px", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "h-full w-full bg-gradient-to-b from-white/50 via-white/20 to-transparent relative", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute inset-0 w-px bg-white/30 blur-sm" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute inset-0 w-px bg-white/20 blur-md" }),
      starMemories.map((memory, index) => {
        let accumulatedHeight = 0;
        for (let i = 0; i < index; i++) {
          accumulatedHeight += 100 + 40;
        }
        return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "absolute left-1/2 -translate-x-1/2", style: {
          top: `${accumulatedHeight + 32}px`
        }, children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative w-3 h-3", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute inset-0 bg-white rounded-full" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute inset-0 bg-white rounded-full blur-sm opacity-80" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute inset-0 bg-white rounded-full blur-md opacity-60 scale-150" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute inset-0 bg-white rounded-full blur-lg opacity-40 scale-200" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute inset-0 bg-white rounded-full animate-ping opacity-20" })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "absolute left-4 top-1/2 -translate-y-1/2 text-white/60 text-xs tracking-[0.2em] font-cn whitespace-nowrap flex items-center space-x-4", children: [
            memory.date,
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center space-x-2 ml-4", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-white/80", children: [
                "❤",
                memory.likes === 0 ? getDynamicLikeCount(memory.id) : memory.id === 19 ? 58 : memory.id === 14 ? 37 : memory.id === 13 ? 45 : memory.id === 12 ? 51 : memory.id === 11 ? 39 : memory.id === 10 ? 46 : memory.id === 9 ? 44 : memory.id === 15 ? 48 : memory.id === 8 ? 43 : memory.id === 7 ? 52 : memory.id === 6 ? 38 : memory.id === 5 ? 47 : memory.id === 16 ? 49 : memory.id === 4 ? 41 : memory.id === 17 ? 50 : memory.id === 3 ? 36 : memory.id === 2 ? 53 : memory.id === 18 ? 40 : memory.id === 1 ? 54 : 42
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-white/80", children: [
                "💬",
                memory.likes === 0 ? getDynamicCommentCount(memory.id) : memory.id === 19 || memory.id === 14 ? 5 : memory.id === 13 ? 3 : memory.id === 12 ? 5 : memory.id === 11 ? 4 : memory.id === 10 ? 3 : memory.id === 9 ? 3 : memory.id === 15 ? 5 : memory.id === 8 ? 4 : memory.id === 7 ? 6 : memory.id === 6 ? 2 : memory.id === 5 ? 4 : memory.id === 16 ? 6 : memory.id === 4 ? 3 : memory.id === 17 ? 5 : memory.id === 3 ? 3 : memory.id === 2 ? 4 : memory.id === 18 ? 3 : memory.id === 1 ? 3 : 7
              ] })
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute left-4 top-8 w-80", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/trail-detail", search: {
            id: memory.id.toString()
          }, className: "block bg-white/5 backdrop-blur-md border border-white/10 rounded-lg p-4 shadow-lg shadow-black/20 cursor-pointer hover:bg-white/10 transition-colors", children: /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-white/80 font-cn leading-relaxed text-sm", children: memory.content.length > 37 ? memory.content.substring(0, 37) + "..." : memory.content }) }) })
        ] }, memory.id);
      })
    ] }) }) })
  ] });
}
export {
  Trail as component
};
