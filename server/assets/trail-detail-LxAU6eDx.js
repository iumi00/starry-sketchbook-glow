import { U as jsxRuntimeExports } from "./worker-entry-DQRps7mk.js";
import { S as Starfield, P as PolarHUD } from "./PolarHUD-Buk1gcFF.js";
import { u as useNavigate, R as Route, L as Link } from "./router-vqVZ2fwF.js";
import { g as getDynamicStarMemories } from "./starMemories-Btz2dp-v.js";
import "node:events";
import "node:async_hooks";
import "node:stream/web";
import "node:stream";
function TrailDetail() {
  useNavigate();
  const search = Route.useSearch();
  const memoryId = parseInt(search.id || "1");
  const starMemories = getDynamicStarMemories();
  const memory = starMemories.find((m) => m.id === memoryId);
  const getDynamicComments = () => {
    if (typeof window === "undefined" || typeof localStorage === "undefined") {
      return [];
    }
    const trailComments = localStorage.getItem("trailComments");
    console.log("星轨详情页面 - trailComments原始数据:", trailComments);
    if (trailComments) {
      try {
        const commentsData = JSON.parse(trailComments);
        console.log("星轨详情页面 - 解析后的commentsData:", commentsData);
        console.log("星轨详情页面 - 当前memoryId:", memoryId);
        const comments = commentsData[memoryId] || [];
        console.log("星轨详情页面 - 获取到的留言:", comments);
        return comments;
      } catch (error) {
        console.error("解析星轨留言数据失败:", error);
        return [];
      }
    }
    return [];
  };
  const dynamicComments = getDynamicComments();
  console.log("星轨详情页面 - 最终dynamicComments:", dynamicComments);
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(Starfield, { count: 70 }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(PolarHUD, {}),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute top-[60px] left-4 z-30", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/trail", className: "text-lg leading-none text-foreground/80 hover:text-foreground transition-colors", "aria-label": "返回星轨", children: "←" }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("header", { className: "absolute top-[100px] left-0 right-0 text-center px-5 z-20", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "text-2xl tracking-[0.4em] text-foreground/95 font-display", children: "【星轨】" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-3 text-[11px] tracking-[0.3em] text-muted-foreground font-cn", children: "你的星轨，每颗星都是一段记忆" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-8 flex justify-center", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative w-3 h-3", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute inset-0 bg-white rounded-full" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute inset-0 bg-white rounded-full blur-sm opacity-80" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute inset-0 bg-white rounded-full blur-md opacity-60 scale-150" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute inset-0 bg-white rounded-full blur-lg opacity-40 scale-200" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute inset-0 bg-white rounded-full blur-xl opacity-30 scale-250" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute inset-0 bg-white rounded-full animate-pulse opacity-20" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute inset-0 bg-white rounded-full", style: {
          animation: "gentle-breathe 8s ease-in-out infinite"
        } })
      ] }) })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("main", { className: "relative z-10 pt-56 pb-20 min-h-screen", children: memory ? /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "w-full max-w-screen-2xl mx-auto px-8", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mb-6 text-center", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-white/60 text-xs tracking-[0.2em] font-cn whitespace-nowrap flex items-center justify-center gap-4", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: memory.date }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-white/80", children: [
            "❤",
            memory.likes === 0 ? (() => {
              const isSpecialMessage = dynamicComments.some((comment) => comment.text.includes("期末成绩出了") || comment.text.includes("复习了整整一个月"));
              if (isSpecialMessage) {
                return 32;
              } else if (dynamicComments.length > 0) {
                return Math.floor(Math.random() * 11);
              } else {
                return 0;
              }
            })() : memory.id === 19 ? 58 : memory.id === 14 ? 37 : memory.id === 13 ? 45 : memory.id === 12 ? 51 : memory.id === 11 ? 39 : memory.id === 10 ? 46 : memory.id === 9 ? 44 : memory.id === 15 ? 48 : memory.id === 8 ? 43 : memory.id === 7 ? 52 : memory.id === 6 ? 38 : memory.id === 5 ? 47 : memory.id === 16 ? 49 : memory.id === 4 ? 41 : memory.id === 17 ? 50 : memory.id === 3 ? 36 : memory.id === 2 ? 53 : memory.id === 18 ? 40 : memory.id === 1 ? 54 : 42
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-white/80", children: [
            "💬",
            memory.likes === 0 ? dynamicComments.length : memory.id === 19 || memory.id === 14 ? 5 : memory.id === 13 ? 3 : memory.id === 12 ? 5 : memory.id === 11 ? 4 : memory.id === 10 ? 3 : memory.id === 9 ? 3 : memory.id === 15 ? 5 : memory.id === 8 ? 4 : memory.id === 7 ? 6 : memory.id === 6 ? 2 : memory.id === 5 ? 4 : memory.id === 16 ? 6 : memory.id === 4 ? 3 : memory.id === 17 ? 5 : memory.id === 3 ? 3 : memory.id === 2 ? 4 : memory.id === 18 ? 3 : memory.id === 1 ? 3 : 7
          ] })
        ] })
      ] }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "w-full bg-white/5 backdrop-blur-md border border-white/10 rounded-lg p-6 shadow-lg shadow-black-20", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-white/80 font-cn leading-relaxed text-base whitespace-pre-wrap mb-6 max-h-96 overflow-y-auto pr-4 scrollbar-thin scrollbar-thumb-white/20 scrollbar-track-transparent", children: memory.content }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex justify-center gap-2 pt-4 border-t border-white/10", children: memory.likes === 0 && memory.tags ? (
          // 用户记录：显示发送时携带的标签
          memory.tags.length > 0 ? memory.tags.map((tag, index) => /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "px-3 py-1 bg-white/10 backdrop-blur-sm border border-white/20 rounded-full text-white/60 text-xs font-cn", children: tag.startsWith("#") ? tag : `#${tag}` }, index)) : /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "px-3 py-1 bg-white/10 backdrop-blur-sm border border-white/20 rounded-full text-white/60 text-xs font-cn", children: "#未分类" })
        ) : memory.id === 19 ? /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "px-3 py-1 bg-white/10 backdrop-blur-sm border border-white/20 rounded-full text-white/60 text-xs font-cn", children: "#自我和解" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "px-3 py-1 bg-white/10 backdrop-blur-sm border border-white/20 rounded-full text-white/60 text-xs font-cn", children: "#理智化" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "px-3 py-1 bg-white/10 backdrop-blur-sm border border-white/20 rounded-full text-white/60 text-xs font-cn", children: "#强大感" })
        ] }) : memory.id === 14 ? /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "px-3 py-1 bg-white/10 backdrop-blur-sm border border-white/20 rounded-full text-white/60 text-xs font-cn", children: "#小确幸" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "px-3 py-1 bg-white/10 backdrop-blur-sm border border-white/20 rounded-full text-white/60 text-xs font-cn", children: "#碎碎平安" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "px-3 py-1 bg-white/10 backdrop-blur-sm border border-white/20 rounded-full text-white/60 text-xs font-cn", children: "#温暖祝愿" })
        ] }) : memory.id === 13 ? /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "px-3 py-1 bg-white/10 backdrop-blur-sm border border-white/20 rounded-full text-white/60 text-xs font-cn", children: "#分手" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "px-3 py-1 bg-white/10 backdrop-blur-sm border border-white/20 rounded-full text-white/60 text-xs font-cn", children: "#释然" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "px-3 py-1 bg-white/10 backdrop-blur-sm border border-white/20 rounded-full text-white/60 text-xs font-cn", children: "#年轻搞钱" })
        ] }) : memory.id === 12 ? /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "px-3 py-1 bg-white/10 backdrop-blur-sm border border-white/20 rounded-full text-white/60 text-xs font-cn", children: "#怀旧" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "px-3 py-1 bg-white/10 backdrop-blur-sm border border-white/20 rounded-full text-white/60 text-xs font-cn", children: "#脆弱渴望" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "px-3 py-1 bg-white/10 backdrop-blur-sm border border-white/20 rounded-full text-white/60 text-xs font-cn", children: "#自我拥抱" })
        ] }) : memory.id === 11 ? /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "px-3 py-1 bg-white/10 backdrop-blur-sm border border-white/20 rounded-full text-white/60 text-xs font-cn", children: "#疲惫" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "px-3 py-1 bg-white/10 backdrop-blur-sm border border-white/20 rounded-full text-white/60 text-xs font-cn", children: "#摸鱼式休息" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "px-3 py-1 bg-white/10 backdrop-blur-sm border border-white/20 rounded-full text-white/60 text-xs font-cn", children: "#日常" })
        ] }) : memory.id === 10 ? /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "px-3 py-1 bg-white/10 backdrop-blur-sm border border-white/20 rounded-full text-white/60 text-xs font-cn", children: "#自然治愈" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "px-3 py-1 bg-white/10 backdrop-blur-sm border border-white/20 rounded-full text-white/60 text-xs font-cn", children: "#阳光" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "px-3 py-1 bg-white/10 backdrop-blur-sm border border-white/20 rounded-full text-white/60 text-xs font-cn", children: "#自我调侃" })
        ] }) : memory.id === 9 ? /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "px-3 py-1 bg-white/10 backdrop-blur-sm border border-white/20 rounded-full text-white/60 text-xs font-cn", children: "#目标感" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "px-3 py-1 bg-white/10 backdrop-blur-sm border border-white/20 rounded-full text-white/60 text-xs font-cn", children: "#信念" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "px-3 py-1 bg-white/10 backdrop-blur-sm border border-white/20 rounded-full text-white/60 text-xs font-cn", children: "#积极" })
        ] }) : memory.id === 15 ? /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "px-3 py-1 bg-white/10 backdrop-blur-sm border border-white/20 rounded-full text-white/60 text-xs font-cn", children: "#大一回顾" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "px-3 py-1 bg-white/10 backdrop-blur-sm border border-white/20 rounded-full text-white/60 text-xs font-cn", children: "#自嘲式成长" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "px-3 py-1 bg-white/10 backdrop-blur-sm border border-white/20 rounded-full text-white/60 text-xs font-cn", children: "#假努力" })
        ] }) : memory.id === 8 ? /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "px-3 py-1 bg-white/10 backdrop-blur-sm border border-white/20 rounded-full text-white/60 text-xs font-cn", children: "#野心" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "px-3 py-1 bg-white/10 backdrop-blur-sm border border-white/20 rounded-full text-white/60 text-xs font-cn", children: "#向往" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "px-3 py-1 bg-white/10 backdrop-blur-sm border border-white/20 rounded-full text-white/60 text-xs font-cn", children: "#前进" })
        ] }) : memory.id === 7 ? /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "px-3 py-1 bg-white/10 backdrop-blur-sm border border-white/20 rounded-full text-white/60 text-xs font-cn", children: "#旅行" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "px-3 py-1 bg-white/10 backdrop-blur-sm border border-white/20 rounded-full text-white/60 text-xs font-cn", children: "#勇气" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "px-3 py-1 bg-white/10 backdrop-blur-sm border border-white/20 rounded-full text-white/60 text-xs font-cn", children: "#累并快乐" })
        ] }) : memory.id === 6 ? /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "px-3 py-1 bg-white/10 backdrop-blur-sm border border-white/20 rounded-full text-white/60 text-xs font-cn", children: "#厌学" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "px-3 py-1 bg-white/10 backdrop-blur-sm border border-white/20 rounded-full text-white/60 text-xs font-cn", children: "#期末崩溃" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "px-3 py-1 bg-white/10 backdrop-blur-sm border border-white/20 rounded-full text-white/60 text-xs font-cn", children: "#想放假" })
        ] }) : memory.id === 5 ? /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "px-3 py-1 bg-white/10 backdrop-blur-sm border border-white/20 rounded-full text-white/60 text-xs font-cn", children: "#孤独感" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "px-3 py-1 bg-white/10 backdrop-blur-sm border border-white/20 rounded-full text-white/60 text-xs font-cn", children: "#怀念过去" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "px-3 py-1 bg-white/10 backdrop-blur-sm border border-white/20 rounded-full text-white/60 text-xs font-cn", children: "#勇敢向前" })
        ] }) : memory.id === 16 ? /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "px-3 py-1 bg-white/10 backdrop-blur-sm border border-white/20 rounded-full text-white/60 text-xs font-cn", children: "#平静下的暗涌" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "px-3 py-1 bg-white/10 backdrop-blur-sm border border-white/20 rounded-full text-white/60 text-xs font-cn", children: "#记录" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "px-3 py-1 bg-white/10 backdrop-blur-sm border border-white/20 rounded-full text-white/60 text-xs font-cn", children: "#痛苦对峙" })
        ] }) : memory.id === 4 ? /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "px-3 py-1 bg-white/10 backdrop-blur-sm border border-white/20 rounded-full text-white/60 text-xs font-cn", children: "#特殊儿童" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "px-3 py-1 bg-white/10 backdrop-blur-sm border border-white/20 rounded-full text-white/60 text-xs font-cn", children: "#同理心" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "px-3 py-1 bg-white/10 backdrop-blur-sm border border-white/20 rounded-full text-white/60 text-xs font-cn", children: "#生命感悟" })
        ] }) : memory.id === 17 ? /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "px-3 py-1 bg-white/10 backdrop-blur-sm border border-white/20 rounded-full text-white/60 text-xs font-cn", children: "#成熟" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "px-3 py-1 bg-white/10 backdrop-blur-sm border border-white/20 rounded-full text-white/60 text-xs font-cn", children: "#释然" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "px-3 py-1 bg-white/10 backdrop-blur-sm border border-white/20 rounded-full text-white/60 text-xs font-cn", children: "#自嘲" })
        ] }) : memory.id === 3 ? /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "px-3 py-1 bg-white/10 backdrop-blur-sm border border-white/20 rounded-full text-white/60 text-xs font-cn", children: "#迷茫" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "px-3 py-1 bg-white/10 backdrop-blur-sm border border-white/20 rounded-full text-white/60 text-xs font-cn", children: "#感恩" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "px-3 py-1 bg-white/10 backdrop-blur-sm border border-white/20 rounded-full text-white/60 text-xs font-cn", children: "#温暖" })
        ] }) : memory.id === 2 ? /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "px-3 py-1 bg-white/10 backdrop-blur-sm border border-white/20 rounded-full text-white/60 text-xs font-cn", children: "#军训" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "px-3 py-1 bg-white/10 backdrop-blur-sm border border-white/20 rounded-full text-white/60 text-xs font-cn", children: "#时间感知" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "px-3 py-1 bg-white/10 backdrop-blur-sm border border-white/20 rounded-full text-white/60 text-xs font-cn", children: "#初入大学" })
        ] }) : memory.id === 18 ? /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "px-3 py-1 bg-white/10 backdrop-blur-sm border border-white/20 rounded-full text-white/60 text-xs font-cn", children: "#日常疲惫" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "px-3 py-1 bg-white/10 backdrop-blur-sm border border-white/20 rounded-full text-white/60 text-xs font-cn", children: "#抱怨" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "px-3 py-1 bg-white/10 backdrop-blur-sm border border-white/20 rounded-full text-white/60 text-xs font-cn", children: "#忍耐" })
        ] }) : memory.id === 1 ? /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "px-3 py-1 bg-white/10 backdrop-blur-sm border border-white/20 rounded-full text-white/60 text-xs font-cn", children: "#自省" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "px-3 py-1 bg-white/10 backdrop-blur-sm border border-white/20 rounded-full text-white/60 text-xs font-cn", children: "#谦逊" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "px-3 py-1 bg-white/10 backdrop-blur-sm border border-white/20 rounded-full text-white/60 text-xs font-cn", children: "#敲打自己" })
        ] }) : /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "px-3 py-1 bg-white/10 backdrop-blur-sm border border-white/20 rounded-full text-white/60 text-xs font-cn", children: "#自我觉醒" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "px-3 py-1 bg-white/10 backdrop-blur-sm border border-white/20 rounded-full text-white/60 text-xs font-cn", children: "#矛盾与接纳" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "px-3 py-1 bg-white/10 backdrop-blur-sm border border-white/20 rounded-full text-white/60 text-xs font-cn", children: "#生命力" })
        ] }) })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-8 flex items-center gap-4", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex-1 h-px bg-gradient-to-r from-transparent via-white/20 to-transparent" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-white/40 text-xs font-cn tracking-wider", children: "留言" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex-1 h-px bg-gradient-to-r from-transparent via-white/20 to-transparent" })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-8 space-y-6", children: memory.likes === 0 && dynamicComments.length > 0 ? (
        // 用户记录：显示动态留言
        /* @__PURE__ */ jsxRuntimeExports.jsx(jsxRuntimeExports.Fragment, { children: dynamicComments.map((comment, index) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "w-full bg-white/5 backdrop-blur-md border border-white/10 rounded-lg p-6 shadow-lg shadow-black-20", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex justify-between items-start mb-4", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-white/60 text-xs font-cn", children: comment.from }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-white/60 text-xs font-cn", children: new Date(comment.time).toLocaleString("zh-CN", {
              month: "2-digit",
              day: "2-digit",
              hour: "2-digit",
              minute: "2-digit"
            }) })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-white/80 font-cn leading-relaxed text-base whitespace-pre-wrap", children: comment.text })
        ] }, index)) })
      ) : memory.id === 20 ? /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "w-full bg-white/5 backdrop-blur-md border border-white/10 rounded-lg p-6 shadow-lg shadow-black-20", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex justify-between items-start mb-4", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-white/60 text-xs font-cn", children: "碎星#287" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-white/60 text-xs font-cn", children: "2026.04.17 14:23" })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-white/80 font-cn leading-relaxed text-base whitespace-pre-wrap", children: '这段话看得我眼睛亮亮的！好喜欢这种"自己就是好运气"的状态，希望我也能早点找到这样的自己。' })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "w-full bg-white/5 backdrop-blur-md border border-white/10 rounded-lg p-6 shadow-lg shadow-black-20", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex justify-between items-start mb-4", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-white/60 text-xs font-cn", children: "碎星#156" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-white/60 text-xs font-cn", children: "2026.04.17 16:45" })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-white/80 font-cn leading-relaxed text-base whitespace-pre-wrap", children: "同为理工女，太懂了。一边画电路图一边偷偷读诗的感觉。你很清醒，也很有力量，继续走就好。" })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "w-full bg-white/5 backdrop-blur-md border border-white/10 rounded-lg p-6 shadow-lg shadow-black-20", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex justify-between items-start mb-4", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-white/60 text-xs font-cn", children: "碎星#423" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-white/60 text-xs font-cn", children: "2026.04.17 18:12" })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-white/80 font-cn leading-relaxed text-base whitespace-pre-wrap", children: '"从小给自己贴理工女标签"戳中了我。现在我也慢慢承认自己其实喜欢写东西。谢谢你说出来，让我不那么孤单。' })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "w-full bg-white/5 backdrop-blur-md border border-white/10 rounded-lg p-6 shadow-lg shadow-black-20", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex justify-between items-start mb-4", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-white/60 text-xs font-cn", children: "碎星#789" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-white/60 text-xs font-cn", children: "2026.04.17 20:33" })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-white/80 font-cn leading-relaxed text-base whitespace-pre-wrap", children: "你的思考本身就很有文学性呀。不是只有会写动人文字的人才配爱文学，感受它、靠近它，你已经在了。" })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "w-full bg-white/5 backdrop-blur-md border border-white/10 rounded-lg p-6 shadow-lg shadow-black-20", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex justify-between items-start mb-4", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-white/60 text-xs font-cn", children: "碎星#512" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-white/60 text-xs font-cn", children: "2026.04.17 21:48" })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-white/80 font-cn leading-relaxed text-base whitespace-pre-wrap", children: '工作以后才明白，像你这样敢想敢做、自己定义自己的人太少了。保持那份"少女骑士病"，职场需要你这样的光。' })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "w-full bg-white/5 backdrop-blur-md border border-white/10 rounded-lg p-6 shadow-lg shadow-black-20", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex justify-between items-start mb-4", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-white/60 text-xs font-cn", children: "碎星#934" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-white/60 text-xs font-cn", children: "2026.04.17 23:07" })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-white/80 font-cn leading-relaxed text-base whitespace-pre-wrap", children: '凌晨三点在图书馆看到这段话，突然不焦虑了。你描述的那种"苏醒感"我也有过，跨过半个地球才发现，最重要是找到自己。加油。' })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "w-full bg-white/5 backdrop-blur-md border border-white/10 rounded-lg p-6 shadow-lg shadow-black-20", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex justify-between items-start mb-4", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-white/60 text-xs font-cn", children: "碎星#678" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-white/60 text-xs font-cn", children: "2026.04.17 22:19" })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-white/80 font-cn leading-relaxed text-base whitespace-pre-wrap", children: '"除了实力一切都是浮云"——记下了。你那种肆意的生命力隔着屏幕都感染到我。一起往前冲吧。' })
        ] })
      ] }) : memory.id === 19 ? /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "w-full bg-white/5 backdrop-blur-md border border-white/10 rounded-lg p-6 shadow-lg shadow-black-20", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex justify-between items-start mb-4", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-white/60 text-xs font-cn", children: "碎星#512" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-white/60 text-xs font-cn", children: "2026.03.18 21:35" })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-white/80 font-cn leading-relaxed text-base whitespace-pre-wrap", children: "好羡慕这种状态。我现在还在讨厌自己的阶段，希望有一天也能像你一样，包容自己所有的好坏。" })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "w-full bg-white/5 backdrop-blur-md border border-white/10 rounded-lg p-6 shadow-lg shadow-black-20", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex justify-between items-start mb-4", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-white/60 text-xs font-cn", children: "碎星#234" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-white/60 text-xs font-cn", children: "2026.03.18 21:50" })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-white/80 font-cn leading-relaxed text-base whitespace-pre-wrap", children: '你描述的"理智得可怕"让我想到加缪。理智不是冷血，是你已经开始自己定义温度了。' })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "w-full bg-white/5 backdrop-blur-md border border-white/10 rounded-lg p-6 shadow-lg shadow-black-20", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex justify-between items-start mb-4", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-white/60 text-xs font-cn", children: "碎星#789" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-white/60 text-xs font-cn", children: "2026.03.18 22:15" })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-white/80 font-cn leading-relaxed text-base whitespace-pre-wrap", children: '你这种"理智得可怕"我太懂了。不是冷血，是你终于站到了情绪之上。为你高兴。' })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "w-full bg-white/5 backdrop-blur-md border border-white/10 rounded-lg p-6 shadow-lg shadow-black-20", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex justify-between items-start mb-4", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-white/60 text-xs font-cn", children: "碎星#156" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-white/60 text-xs font-cn", children: "2026.03.18 22:45" })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-white/80 font-cn leading-relaxed text-base whitespace-pre-wrap", children: '看到"我喜欢我自己，无论什么样子"眼眶一热。我现在还做不到，但开始想试试了。' })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "w-full bg-white/5 backdrop-blur-md border border-white/10 rounded-lg p-6 shadow-lg shadow-black-20", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex justify-between items-start mb-4", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-white/60 text-xs font-cn", children: "碎星#423" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-white/60 text-xs font-cn", children: "2026.03.18 23:20" })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-white/80 font-cn leading-relaxed text-base whitespace-pre-wrap", children: "工作后见多了人讨厌自己，你这种清醒的自爱，是稀缺品。保持住。" })
        ] })
      ] }) : memory.id === 14 ? /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "w-full bg-white/5 backdrop-blur-md border border-white/10 rounded-lg p-6 shadow-lg shadow-black-20", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex justify-between items-start mb-4", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-white/60 text-xs font-cn", children: "碎星#234" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-white/60 text-xs font-cn", children: "2026.01.11 01:15" })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-white/80 font-cn leading-relaxed text-base whitespace-pre-wrap", children: "碎碎平安，心态满分。希望你每天都有星星和小蛋糕。" })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "w-full bg-white/5 backdrop-blur-md border border-white/10 rounded-lg p-6 shadow-lg shadow-black-20", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex justify-between items-start mb-4", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-white/60 text-xs font-cn", children: "碎星#567" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-white/60 text-xs font-cn", children: "2026.01.11 01:30" })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-white/80 font-cn leading-relaxed text-base whitespace-pre-wrap", children: '你最后那句"希望朋友们不要内耗"好暖。你也一样，别内耗。' })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "w-full bg-white/5 backdrop-blur-md border border-white/10 rounded-lg p-6 shadow-lg shadow-black-20", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex justify-between items-start mb-4", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-white/60 text-xs font-cn", children: "碎星#891" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-white/60 text-xs font-cn", children: "2026.01.11 01:45" })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-white/80 font-cn leading-relaxed text-base whitespace-pre-wrap", children: "这里很少星星。你的文字像星星一样亮到我。呀米呀米～" })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "w-full bg-white/5 backdrop-blur-md border border-white/10 rounded-lg p-6 shadow-lg shadow-black-20", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex justify-between items-start mb-4", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-white/60 text-xs font-cn", children: "碎星#345" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-white/60 text-xs font-cn", children: "2026.01.11 02:00" })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-white/80 font-cn leading-relaxed text-base whitespace-pre-wrap", children: '看到"碎碎平安"突然被治愈了。谢谢你的碎碎平安。' })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "w-full bg-white/5 backdrop-blur-md border border-white/10 rounded-lg p-6 shadow-lg shadow-black-20", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex justify-between items-start mb-4", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-white/60 text-xs font-cn", children: "碎星#678" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-white/60 text-xs font-cn", children: "2026.01.11 02:20" })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-white/80 font-cn leading-relaxed text-base whitespace-pre-wrap", children: "广州能看到那么多星星？你运气好好。也祝你朋友都不内耗，包括你。" })
        ] })
      ] }) : memory.id === 13 ? /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "w-full bg-white/5 backdrop-blur-md border border-white/10 rounded-lg p-6 shadow-lg shadow-black-20", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex justify-between items-start mb-4", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-white/60 text-xs font-cn", children: "碎星#456" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-white/60 text-xs font-cn", children: "2025.12.22 08:30" })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-white/80 font-cn leading-relaxed text-base whitespace-pre-wrap", children: "姐妹太酷了！对，恋爱没了可以再谈，钱不赚就真的没了。向前看。" })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "w-full bg-white/5 backdrop-blur-md border border-white/10 rounded-lg p-6 shadow-lg shadow-black-20", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex justify-between items-start mb-4", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-white/60 text-xs font-cn", children: "碎星#789" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-white/60 text-xs font-cn", children: "2025.12.22 09:00" })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-white/80 font-cn leading-relaxed text-base whitespace-pre-wrap", children: "刚分手时看到你这句话，笑了。19岁确实该搞钱，共勉。" })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "w-full bg-white/5 backdrop-blur-md border border-white/10 rounded-lg p-6 shadow-lg shadow-black-20", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex justify-between items-start mb-4", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-white/60 text-xs font-cn", children: "碎星#234" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-white/60 text-xs font-cn", children: "2025.12.22 09:30" })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-white/80 font-cn leading-relaxed text-base whitespace-pre-wrap", children: '"还有很多钱等着我去赚"——这句话放在经济学里叫理性预期。你很有天赋。' })
        ] })
      ] }) : memory.id === 12 ? /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "w-full bg-white/5 backdrop-blur-md border border-white/10 rounded-lg p-6 shadow-lg shadow-black-20", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex justify-between items-start mb-4", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-white/60 text-xs font-cn", children: "碎星#567" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-white/60 text-xs font-cn", children: "2025.11.11 02:45" })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-white/80 font-cn leading-relaxed text-base whitespace-pre-wrap", children: "那些脆弱说出来就不重了。万山已过，你也很棒。" })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "w-full bg-white/5 backdrop-blur-md border border-white/10 rounded-lg p-6 shadow-lg shadow-black-20", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex justify-between items-start mb-4", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-white/60 text-xs font-cn", children: "碎星#891" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-white/60 text-xs font-cn", children: "2025.11.11 03:00" })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-white/80 font-cn leading-relaxed text-base whitespace-pre-wrap", children: "轻舟过万山，你也是自己的舟。" })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "w-full bg-white/5 backdrop-blur-md border border-white/10 rounded-lg p-6 shadow-lg shadow-black-20", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex justify-between items-start mb-4", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-white/60 text-xs font-cn", children: "碎星#345" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-white/60 text-xs font-cn", children: "2025.11.11 03:15" })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-white/80 font-cn leading-relaxed text-base whitespace-pre-wrap", children: "和妈妈走夜路的画面我也经常想起。" })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "w-full bg-white/5 backdrop-blur-md border border-white/10 rounded-lg p-6 shadow-lg shadow-black-20", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex justify-between items-start mb-4", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-white/60 text-xs font-cn", children: "碎星#234" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-white/60 text-xs font-cn", children: "2025.11.11 03:30" })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-white/80 font-cn leading-relaxed text-base whitespace-pre-wrap", children: '凌晨看到"轻舟过万山"哭了。我们都要做自己最好的朋友。' })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "w-full bg-white/5 backdrop-blur-md border border-white/10 rounded-lg p-6 shadow-lg shadow-black-20", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex justify-between items-start mb-4", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-white/60 text-xs font-cn", children: "碎星#678" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-white/60 text-xs font-cn", children: "2025.11.11 04:00" })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-white/80 font-cn leading-relaxed text-base whitespace-pre-wrap", children: "从黑黑的小道到万重山，你走过的路都成了你的哲学。共勉。" })
        ] })
      ] }) : memory.id === 11 ? /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "w-full bg-white/5 backdrop-blur-md border border-white/10 rounded-lg p-6 shadow-lg shadow-black-20", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex justify-between items-start mb-4", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-white/60 text-xs font-cn", children: "碎星#234" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-white/60 text-xs font-cn", children: "2025.11.09 00:30" })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-white/80 font-cn leading-relaxed text-base whitespace-pre-wrap", children: "只睡三小时太真实了。回家冲浪回血，没毛病。" })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "w-full bg-white/5 backdrop-blur-md border border-white/10 rounded-lg p-6 shadow-lg shadow-black-20", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex justify-between items-start mb-4", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-white/60 text-xs font-cn", children: "碎星#567" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-white/60 text-xs font-cn", children: "2025.11.09 01:00" })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-white/80 font-cn leading-relaxed text-base whitespace-pre-wrap", children: "我数学竞赛直接没考。你还能坚持去，已经比我强。" })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "w-full bg-white/5 backdrop-blur-md border border-white/10 rounded-lg p-6 shadow-lg shadow-black-20", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex justify-between items-start mb-4", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-white/60 text-xs font-cn", children: "碎星#891" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-white/60 text-xs font-cn", children: "2025.11.09 01:30" })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-white/80 font-cn leading-relaxed text-base whitespace-pre-wrap", children: '你这种"不想学就回家逛"的松弛感，我羡慕了。' })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "w-full bg-white/5 backdrop-blur-md border border-white/10 rounded-lg p-6 shadow-lg shadow-black-20", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex justify-between items-start mb-4", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-white/60 text-xs font-cn", children: "碎星#345" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-white/60 text-xs font-cn", children: "2025.11.09 02:00" })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-white/80 font-cn leading-relaxed text-base whitespace-pre-wrap", children: "函调资料我也刚交完。祝你顺利，也祝你冲浪愉快。" })
        ] })
      ] }) : memory.id === 10 ? /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "w-full bg-white/5 backdrop-blur-md border border-white/10 rounded-lg p-6 shadow-lg shadow-black-20", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex justify-between items-start mb-4", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-white/60 text-xs font-cn", children: "碎星#456" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-white/60 text-xs font-cn", children: "2025.11.06 04:00" })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-white/80 font-cn leading-relaxed text-base whitespace-pre-wrap", children: '小猫确实能治。你从"阴暗老鼠人"到看见阳光就起床，小猫会为你骄傲。' })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "w-full bg-white/5 backdrop-blur-md border border-white/10 rounded-lg p-6 shadow-lg shadow-black-20", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex justify-between items-start mb-4", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-white/60 text-xs font-cn", children: "碎星#789" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-white/60 text-xs font-cn", children: "2025.11.06 04:30" })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-white/80 font-cn leading-relaxed text-base whitespace-pre-wrap", children: '花和树是最沉默的治疗师。你描述的那个清晨，我也经历过，像是世界在说"醒醒，还活着"。' })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "w-full bg-white/5 backdrop-blur-md border border-white/10 rounded-lg p-6 shadow-lg shadow-black-20", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex justify-between items-start mb-4", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-white/60 text-xs font-cn", children: "碎星#234" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-white/60 text-xs font-cn", children: "2025.11.06 05:00" })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-white/80 font-cn leading-relaxed text-base whitespace-pre-wrap", children: "我好久没见过早上的太阳了……明天试着拉开窗帘。" })
        ] })
      ] }) : memory.id === 9 ? /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "w-full bg-white/5 backdrop-blur-md border border-white/10 rounded-lg p-6 shadow-lg shadow-black-20", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex justify-between items-start mb-4", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-white/60 text-xs font-cn", children: "碎星#567" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-white/60 text-xs font-cn", children: "2025.10.19 01:30" })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-white/80 font-cn leading-relaxed text-base whitespace-pre-wrap", children: "这种信念感太珍贵了。保持住，它会在最难的时候拽你一把。" })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "w-full bg-white/5 backdrop-blur-md border border-white/10 rounded-lg p-6 shadow-lg shadow-black-20", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex justify-between items-start mb-4", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-white/60 text-xs font-cn", children: "碎星#891" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-white/60 text-xs font-cn", children: "2025.10.19 02:00" })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-white/80 font-cn leading-relaxed text-base whitespace-pre-wrap", children: "我也是靠这句话撑过的。加油，对的人在路上。" })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "w-full bg-white/5 backdrop-blur-md border border-white/10 rounded-lg p-6 shadow-lg shadow-black-20", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex justify-between items-start mb-4", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-white/60 text-xs font-cn", children: "碎星#234" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-white/60 text-xs font-cn", children: "2025.10.19 02:30" })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-white/80 font-cn leading-relaxed text-base whitespace-pre-wrap", children: "我还在找目标，看到你已经找到，好羡慕。也恭喜你！" })
        ] })
      ] }) : memory.id === 15 ? /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "w-full bg-white/5 backdrop-blur-md border border-white/10 rounded-lg p-6 shadow-lg shadow-black-20", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex justify-between items-start mb-4", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-white/60 text-xs font-cn", children: "碎星#789" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-white/60 text-xs font-cn", children: "2025.09.19 01:20" })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-white/80 font-cn leading-relaxed text-base whitespace-pre-wrap", children: "看了你的清单，除了奖学金我全中。谢谢你让我知道不是一个人。" })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "w-full bg-white/5 backdrop-blur-md border border-white/10 rounded-lg p-6 shadow-lg shadow-black-20", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex justify-between items-start mb-4", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-white/60 text-xs font-cn", children: "碎星#234" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-white/60 text-xs font-cn", children: "2025.09.19 01:40" })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-white/80 font-cn leading-relaxed text-base whitespace-pre-wrap", children: "大一就能这么诚实地复盘，你已经比很多人清醒了。我大二还在自我欺骗。" })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "w-full bg-white/5 backdrop-blur-md border border-white/10 rounded-lg p-6 shadow-lg shadow-black-20", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex justify-between items-start mb-4", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-white/60 text-xs font-cn", children: "碎星#567" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-white/60 text-xs font-cn", children: "2025.09.19 02:00" })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-white/80 font-cn leading-relaxed text-base whitespace-pre-wrap", children: '我的大一也是"一事无成收获了一堆"。但现在回头看，那些"没用"的尝试，后来都变成了故事。' })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "w-full bg-white/5 backdrop-blur-md border border-white/10 rounded-lg p-6 shadow-lg shadow-black-20", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex justify-between items-start mb-4", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-white/60 text-xs font-cn", children: "碎星#891" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-white/60 text-xs font-cn", children: "2025.09.19 02:20" })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-white/80 font-cn leading-relaxed text-base whitespace-pre-wrap", children: '看到"假努力的一年"我哭了，这不就是现在的我吗？谢谢你把它说出来。' })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "w-full bg-white/5 backdrop-blur-md border border-white/10 rounded-lg p-6 shadow-lg shadow-black-20", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex justify-between items-start mb-4", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-white/60 text-xs font-cn", children: "碎星#345" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-white/60 text-xs font-cn", children: "2025.09.19 02:40" })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-white/80 font-cn leading-relaxed text-base whitespace-pre-wrap", children: "大一能这样复盘，你已经赢过很多人了。我到大三才醒。" })
        ] })
      ] }) : memory.id === 8 ? /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "w-full bg-white/5 backdrop-blur-md border border-white/10 rounded-lg p-6 shadow-lg shadow-black-20", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex justify-between items-start mb-4", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-white/60 text-xs font-cn", children: "碎星#234" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-white/60 text-xs font-cn", children: "2025.09.18 23:00" })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-white/80 font-cn leading-relaxed text-base whitespace-pre-wrap", children: "刚从国外回来，见完更大的世界，回来更卷了。但你这句话让我觉得值得。" })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "w-full bg-white/5 backdrop-blur-md border border-white/10 rounded-lg p-6 shadow-lg shadow-black-20", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex justify-between items-start mb-4", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-white/60 text-xs font-cn", children: "碎星#567" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-white/60 text-xs font-cn", children: "2025.09.18 23:15" })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-white/80 font-cn leading-relaxed text-base whitespace-pre-wrap", children: "从小城市来，第一次看到地铁图都惊了。一起走远吧。" })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "w-full bg-white/5 backdrop-blur-md border border-white/10 rounded-lg p-6 shadow-lg shadow-black-20", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex justify-between items-start mb-4", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-white/60 text-xs font-cn", children: "碎星#891" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-white/60 text-xs font-cn", children: "2025.09.18 23:30" })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-white/80 font-cn leading-relaxed text-base whitespace-pre-wrap", children: "刚从荷兰回来，见完大风车和郁金香，回来更想出去了。一起走远。" })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "w-full bg-white/5 backdrop-blur-md border border-white/10 rounded-lg p-6 shadow-lg shadow-black-20", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex justify-between items-start mb-4", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-white/60 text-xs font-cn", children: "碎星#345" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-white/60 text-xs font-cn", children: "2025.09.18 23:45" })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-white/80 font-cn leading-relaxed text-base whitespace-pre-wrap", children: "第一次去上海回来，我也是这句话。野心是被风景喂大的。" })
        ] })
      ] }) : memory.id === 7 ? /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "w-full bg-white/5 backdrop-blur-md border border-white/10 rounded-lg p-6 shadow-lg shadow-black-20", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex justify-between items-start mb-4", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-white/60 text-xs font-cn", children: "碎星#456" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-white/60 text-xs font-cn", children: "2025.08.27 07:00" })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-white/80 font-cn leading-relaxed text-base whitespace-pre-wrap", children: "东山岛的贝壳我也捡过！一时兴起的旅行最难忘。" })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "w-full bg-white/5 backdrop-blur-md border border-white/10 rounded-lg p-6 shadow-lg shadow-black-20", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex justify-between items-start mb-4", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-white/60 text-xs font-cn", children: "碎星#789" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-white/60 text-xs font-cn", children: "2025.08.27 07:15" })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-white/80 font-cn leading-relaxed text-base whitespace-pre-wrap", children: "带妹妹去的姐姐好酷。我也想这样，但不敢。你给我勇气了。" })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "w-full bg-white/5 backdrop-blur-md border border-white/10 rounded-lg p-6 shadow-lg shadow-black-20", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex justify-between items-start mb-4", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-white/60 text-xs font-cn", children: "碎星#234" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-white/60 text-xs font-cn", children: "2025.08.27 07:30" })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-white/80 font-cn leading-relaxed text-base whitespace-pre-wrap", children: "一个人带妹妹出省，你胆大心细。捡贝壳一下午，听着就治愈。" })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "w-full bg-white/5 backdrop-blur-md border border-white/10 rounded-lg p-6 shadow-lg shadow-black-20", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex justify-between items-start mb-4", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-white/60 text-xs font-cn", children: "碎星#567" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-white/60 text-xs font-cn", children: "2025.08.27 08:00" })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-white/80 font-cn leading-relaxed text-base whitespace-pre-wrap", children: "你爸妈放心让你带妹妹出去，说明你靠谱。" })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "w-full bg-white/5 backdrop-blur-md border border-white/10 rounded-lg p-6 shadow-lg shadow-black-20", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex justify-between items-start mb-4", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-white/60 text-xs font-cn", children: "碎星#891" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-white/60 text-xs font-cn", children: "2025.08.27 08:15" })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-white/80 font-cn leading-relaxed text-base whitespace-pre-wrap", children: "一时兴起就出发，还带上了妹妹。你是我羡慕的那种人。" })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "w-full bg-white/5 backdrop-blur-md border border-white/10 rounded-lg p-6 shadow-lg shadow-black-20", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex justify-between items-start mb-4", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-white/60 text-xs font-cn", children: "碎星#345" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-white/60 text-xs font-cn", children: "2025.08.27 08:30" })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-white/80 font-cn leading-relaxed text-base whitespace-pre-wrap", children: "我连一个人点外卖都犹豫，你居然敢独自出省。向你学习。" })
        ] })
      ] }) : memory.id === 6 ? /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "w-full bg-white/5 backdrop-blur-md border border-white/10 rounded-lg p-6 shadow-lg shadow-black-20", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex justify-between items-start mb-4", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-white/60 text-xs font-cn", children: "碎星#567" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-white/60 text-xs font-cn", children: "2025.06.19 20:50" })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-white/80 font-cn leading-relaxed text-base whitespace-pre-wrap", children: "现在6月，我懂你。还有两周，撑住。" })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "w-full bg-white/5 backdrop-blur-md border border-white/10 rounded-lg p-6 shadow-lg shadow-black-20", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex justify-between items-start mb-4", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-white/60 text-xs font-cn", children: "碎星#891" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-white/60 text-xs font-cn", children: "2025.06.19 21:00" })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-white/80 font-cn leading-relaxed text-base whitespace-pre-wrap", children: "刚上大一就觉得难了，看到你也这么说，我不慌了。" })
        ] })
      ] }) : memory.id === 5 ? /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "w-full bg-white/5 backdrop-blur-md border border-white/10 rounded-lg p-6 shadow-lg shadow-black-20", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex justify-between items-start mb-4", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-white/60 text-xs font-cn", children: "碎星#789" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-white/60 text-xs font-cn", children: "2025.06.16 18:00" })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-white/80 font-cn leading-relaxed text-base whitespace-pre-wrap", children: "去年夏天写的东西和你的很像。现在和好朋友在不同城市，但我们真的在高处见了。会实现的。" })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "w-full bg-white/5 backdrop-blur-md border border-white/10 rounded-lg p-6 shadow-lg shadow-black-20", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex justify-between items-start mb-4", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-white/60 text-xs font-cn", children: "碎星#234" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-white/60 text-xs font-cn", children: "2025.06.16 18:15" })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-white/80 font-cn leading-relaxed text-base whitespace-pre-wrap", children: '正在经历从"我们"到"我"，心里很慌。谢谢你告诉我，一个人也走得很好，而且会高处见。' })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "w-full bg-white/5 backdrop-blur-md border border-white/10 rounded-lg p-6 shadow-lg shadow-black-20", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex justify-between items-start mb-4", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-white/60 text-xs font-cn", children: "碎星#567" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-white/60 text-xs font-cn", children: "2025.06.16 18:30" })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-white/80 font-cn leading-relaxed text-base whitespace-pre-wrap", children: "这里的蝉鸣和国内不一样，但孤独感是一样的。耳机盖不过，但你的文字盖过了一些。" })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "w-full bg-white/5 backdrop-blur-md border border-white/10 rounded-lg p-6 shadow-lg shadow-black-20", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex justify-between items-start mb-4", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-white/60 text-xs font-cn", children: "碎星#345" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-white/60 text-xs font-cn", children: "2025.06.16 19:00" })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-white/80 font-cn leading-relaxed text-base whitespace-pre-wrap", children: "我和她不在一个大学，但每次听到蝉鸣就会想起她。高处见，一定。" })
        ] })
      ] }) : memory.id === 16 ? /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "w-full bg-white/5 backdrop-blur-md border border-white/10 rounded-lg p-6 shadow-lg shadow-black-20", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex justify-between items-start mb-4", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-white/60 text-xs font-cn", children: "碎星#891" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-white/60 text-xs font-cn", children: "2025.05.22 00:10" })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-white/80 font-cn leading-relaxed text-base whitespace-pre-wrap", children: "我也用文字和照片对抗遗忘。你说得对，待人如初太难了，但至少我们对自己还算坦诚。" })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "w-full bg-white/5 backdrop-blur-md border border-white/10 rounded-lg p-6 shadow-lg shadow-black-20", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex justify-between items-start mb-4", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-white/60 text-xs font-cn", children: "碎星#234" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-white/60 text-xs font-cn", children: "2025.05.22 00:20" })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-white/80 font-cn leading-relaxed text-base whitespace-pre-wrap", children: "那些琐碎的记录，以后回头看都是珍珠。" })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "w-full bg-white/5 backdrop-blur-md border border-white/10 rounded-lg p-6 shadow-lg shadow-black-20", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex justify-between items-start mb-4", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-white/60 text-xs font-cn", children: "碎星#567" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-white/60 text-xs font-cn", children: "2025.05.22 00:30" })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-white/80 font-cn leading-relaxed text-base whitespace-pre-wrap", children: "广州的天气真的磨人。你说待人如初难，我觉得待自己如初更难。你已经很了不起了。" })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "w-full bg-white/5 backdrop-blur-md border border-white/10 rounded-lg p-6 shadow-lg shadow-black-20", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex justify-between items-start mb-4", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-white/60 text-xs font-cn", children: "碎星#345" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-white/60 text-xs font-cn", children: "2025.05.22 00:40" })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-white/80 font-cn leading-relaxed text-base whitespace-pre-wrap", children: "我也在异国适应天气和孤独。频繁记录不是对峙痛苦，是给自己建灯塔。" })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "w-full bg-white/5 backdrop-blur-md border border-white/10 rounded-lg p-6 shadow-lg shadow-black-20", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex justify-between items-start mb-4", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-white/60 text-xs font-cn", children: "碎星#789" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-white/60 text-xs font-cn", children: "2025.05.22 00:50" })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-white/80 font-cn leading-relaxed text-base whitespace-pre-wrap", children: "待人如初，对前任尤其难。但你说得对，不勉强自己了。" })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "w-full bg-white/5 backdrop-blur-md border border-white/10 rounded-lg p-6 shadow-lg shadow-black-20", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex justify-between items-start mb-4", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-white/60 text-xs font-cn", children: "碎星#123" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-white/60 text-xs font-cn", children: "2025.05.22 01:00" })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-white/80 font-cn leading-relaxed text-base whitespace-pre-wrap", children: '这句话写得真好——"像留了个烙印"。有些事过去了但痕迹在，接受它就好。' })
        ] })
      ] }) : memory.id === 4 ? /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "w-full bg-white/5 backdrop-blur-md border border-white/10 rounded-lg p-6 shadow-lg shadow-black-20", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex justify-between items-start mb-4", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-white/60 text-xs font-cn", children: "碎星#123" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-white/60 text-xs font-cn", children: "2025.04.16 10:30" })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-white/80 font-cn leading-relaxed text-base whitespace-pre-wrap", children: "看哭了。你描述的小男孩，和我实习时遇到的一个孩子很像。你写得那么细腻，你一定有很好的观察力和共情力。谢谢你去做志愿者。" })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "w-full bg-white/5 backdrop-blur-md border border-white/10 rounded-lg p-6 shadow-lg shadow-black-20", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex justify-between items-start mb-4", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-white/60 text-xs font-cn", children: "碎星#456" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-white/60 text-xs font-cn", children: "2025.04.16 10:45" })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-white/80 font-cn leading-relaxed text-base whitespace-pre-wrap", children: '看完不敢再抱怨生活了。那个要绿色笔的小男孩，会记得你的。我也会记得你说的"人与人的联结"。' })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "w-full bg-white/5 backdrop-blur-md border border-white/10 rounded-lg p-6 shadow-lg shadow-black-20", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex justify-between items-start mb-4", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-white/60 text-xs font-cn", children: "碎星#789" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-white/60 text-xs font-cn", children: "2025.04.16 11:00" })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-white/80 font-cn leading-relaxed text-base whitespace-pre-wrap", children: "第一次去我也很忐忑。但你写得真好——他的手是热热的，人与人的联结。你会一直记得他，他也会记得你。" })
        ] })
      ] }) : memory.id === 17 ? /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "w-full bg-white/5 backdrop-blur-md border border-white/10 rounded-lg p-6 shadow-lg shadow-black-20", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex justify-between items-start mb-4", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-white/60 text-xs font-cn", children: "碎星#456" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-white/60 text-xs font-cn", children: "2024.11.18 02:10" })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-white/80 font-cn leading-relaxed text-base whitespace-pre-wrap", children: '工作后更懂这句话。以前怕显得笨，现在敢直接说"这个我不会，能教我吗"。' })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "w-full bg-white/5 backdrop-blur-md border border-white/10 rounded-lg p-6 shadow-lg shadow-black-20", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex justify-between items-start mb-4", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-white/60 text-xs font-cn", children: "碎星#789" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-white/60 text-xs font-cn", children: "2024.11.18 02:20" })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-white/80 font-cn leading-relaxed text-base whitespace-pre-wrap", children: "承认自己不轻松，才是真正的轻松。" })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "w-full bg-white/5 backdrop-blur-md border border-white/10 rounded-lg p-6 shadow-lg shadow-black-20", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex justify-between items-start mb-4", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-white/60 text-xs font-cn", children: "碎星#234" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-white/60 text-xs font-cn", children: "2024.11.18 02:30" })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-white/80 font-cn leading-relaxed text-base whitespace-pre-wrap", children: '以前考好了说"没复习"，现在考好了说"熬了三个通宵"。承认努力不丢人。' })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "w-full bg-white/5 backdrop-blur-md border border-white/10 rounded-lg p-6 shadow-lg shadow-black-20", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex justify-between items-start mb-4", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-white/60 text-xs font-cn", children: "碎星#567" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-white/60 text-xs font-cn", children: "2024.11.18 02:40" })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-white/80 font-cn leading-relaxed text-base whitespace-pre-wrap", children: "我还在假装轻松的阶段。看到你这句话，突然觉得好累，不想装了。" })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "w-full bg-white/5 backdrop-blur-md border border-white/10 rounded-lg p-6 shadow-lg shadow-black-20", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex justify-between items-start mb-4", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-white/60 text-xs font-cn", children: "碎星#345" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-white/60 text-xs font-cn", children: "2024.11.18 02:50" })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-white/80 font-cn leading-relaxed text-base whitespace-pre-wrap", children: "上班后第一天就暴露了啥都不会。不装了，轻松是别人的，踏实是自己的。" })
        ] })
      ] }) : memory.id === 3 ? /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "w-full bg-white/5 backdrop-blur-md border border-white/10 rounded-lg p-6 shadow-lg shadow-black-20", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex justify-between items-start mb-4", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-white/60 text-xs font-cn", children: "碎星#567" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-white/60 text-xs font-cn", children: "2024.11.07 19:30" })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-white/80 font-cn leading-relaxed text-base whitespace-pre-wrap", children: "一模一样。迷茫的时候遇到好人，就像雾里看到灯。一起加油。" })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "w-full bg-white/5 backdrop-blur-md border border-white/10 rounded-lg p-6 shadow-lg shadow-black-20", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex justify-between items-start mb-4", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-white/60 text-xs font-cn", children: "碎星#891" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-white/60 text-xs font-cn", children: "2024.11.07 19:40" })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-white/80 font-cn leading-relaxed text-base whitespace-pre-wrap", children: '在异国迷茫时，便利店店员的一句"欢迎光临"都能温暖我。你遇到的好人们，是缘分。' })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "w-full bg-white/5 backdrop-blur-md border border-white/10 rounded-lg p-6 shadow-lg shadow-black-20", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex justify-between items-start mb-4", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-white/60 text-xs font-cn", children: "碎星#234" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-white/60 text-xs font-cn", children: "2024.11.07 20:00" })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-white/80 font-cn leading-relaxed text-base whitespace-pre-wrap", children: "迷茫是常态，好人不是。所以感恩，然后继续走。" })
        ] })
      ] }) : memory.id === 2 ? /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "w-full bg-white/5 backdrop-blur-md border border-white/10 rounded-lg p-6 shadow-lg shadow-black-20", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex justify-between items-start mb-4", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-white/60 text-xs font-cn", children: "碎星#789" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-white/60 text-xs font-cn", children: "2024.09.20 02:30" })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-white/80 font-cn leading-relaxed text-base whitespace-pre-wrap", children: "站军姿时的胡思乱想，看来不是我一个人。你写得像散文。" })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "w-full bg-white/5 backdrop-blur-md border border-white/10 rounded-lg p-6 shadow-lg shadow-black-20", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex justify-between items-start mb-4", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-white/60 text-xs font-cn", children: "碎星#123" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-white/60 text-xs font-cn", children: "2024.09.20 02:40" })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-white/80 font-cn leading-relaxed text-base whitespace-pre-wrap", children: "那十五分钟我也在数蝉鸣。后来发现，大学三年，最安静的反而是那十五分钟。" })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "w-full bg-white/5 backdrop-blur-md border border-white/10 rounded-lg p-6 shadow-lg shadow-black-20", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex justify-between items-start mb-4", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-white/60 text-xs font-cn", children: "碎星#456" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-white/60 text-xs font-cn", children: "2024.09.20 03:00" })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-white/80 font-cn leading-relaxed text-base whitespace-pre-wrap", children: "看到你写站军姿时的思绪，想起我带新训的日子。那十五分钟，确实漫长又安静。" })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "w-full bg-white/5 backdrop-blur-md border border-white/10 rounded-lg p-6 shadow-lg shadow-black-20", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex justify-between items-start mb-4", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-white/60 text-xs font-cn", children: "碎星#891" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-white/60 text-xs font-cn", children: "2024.09.20 03:10" })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-white/80 font-cn leading-relaxed text-base whitespace-pre-wrap", children: '我们当时站军姿我数了132只蚂蚁。你的"来日方长"让我突然怀念那个夜晚。' })
        ] })
      ] }) : memory.id === 18 ? /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "w-full bg-white/5 backdrop-blur-md border border-white/10 rounded-lg p-6 shadow-lg shadow-black-20", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex justify-between items-start mb-4", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-white/60 text-xs font-cn", children: "碎星#123" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-white/60 text-xs font-cn", children: "2024.09.12 12:50" })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-white/80 font-cn leading-relaxed text-base whitespace-pre-wrap", children: "五楼+砖头课本+大太阳，我每天也在诅咒这段路。抱一下。" })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "w-full bg-white/5 backdrop-blur-md border border-white/10 rounded-lg p-6 shadow-lg shadow-black-20", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex justify-between items-start mb-4", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-white/60 text-xs font-cn", children: "碎星#456" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-white/60 text-xs font-cn", children: "2024.09.12 13:00" })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-white/80 font-cn leading-relaxed text-base whitespace-pre-wrap", children: "我每天训练完还要爬六楼，腿都不是自己的了。你至少还有空调？算了，一起骂吧。" })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "w-full bg-white/5 backdrop-blur-md border border-white/10 rounded-lg p-6 shadow-lg shadow-black-20", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex justify-between items-start mb-4", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-white/60 text-xs font-cn", children: "碎星#789" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-white/60 text-xs font-cn", children: "2024.09.12 13:10" })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-white/80 font-cn leading-relaxed text-base whitespace-pre-wrap", children: '五楼？我们六楼没电梯，懂你。那句"受够了"我每天都说，说完继续爬。' })
        ] })
      ] }) : memory.id === 1 ? /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "w-full bg-white/5 backdrop-blur-md border border-white/10 rounded-lg p-6 shadow-lg shadow-black-20", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex justify-between items-start mb-4", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-white/60 text-xs font-cn", children: "碎星#456" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-white/60 text-xs font-cn", children: "2024.09.08 13:50" })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-white/80 font-cn leading-relaxed text-base whitespace-pre-wrap", children: "挂过科的人告诉你，底线确实不能破。你这种自我敲打的态度，会走很远。" })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "w-full bg-white/5 backdrop-blur-md border border-white/10 rounded-lg p-6 shadow-lg shadow-black-20", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex justify-between items-start mb-4", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-white/60 text-xs font-cn", children: "碎星#789" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-white/60 text-xs font-cn", children: "2024.09.08 14:00" })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-white/80 font-cn leading-relaxed text-base whitespace-pre-wrap", children: "能及时收住自信敲醒自己，是稀缺的能力。谦逊+努力=无敌。" })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "w-full bg-white/5 backdrop-blur-md border border-white/10 rounded-lg p-6 shadow-lg shadow-black-20", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex justify-between items-start mb-4", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-white/60 text-xs font-cn", children: "碎星#123" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-white/60 text-xs font-cn", children: "2024.09.08 14:10" })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-white/80 font-cn leading-relaxed text-base whitespace-pre-wrap", children: '我每次考好就飘，然后下次就砸。你的"骄兵必败"我记本子上了。' })
        ] })
      ] }) : /* @__PURE__ */ jsxRuntimeExports.jsx(jsxRuntimeExports.Fragment, { children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "w-full bg-white/5 backdrop-blur-md border border-white/10 rounded-lg p-6 shadow-lg shadow-black-20", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex justify-between items-start mb-4", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-white/60 text-xs font-cn", children: "碎星#123" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-white/60 text-xs font-cn", children: "2024.09.08 14:23" })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-white/80 font-cn leading-relaxed text-base whitespace-pre-wrap", children: "这段话让我想起了很多，谢谢分享。" })
      ] }) }) })
    ] }) : /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-center text-white/60", children: /* @__PURE__ */ jsxRuntimeExports.jsx("p", { children: "记忆不存在" }) }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("style", { children: `
        @keyframes gentle-breathe {
          0%, 100% {
            transform: scale(1);
            opacity: 0.6;
          }
          50% {
            transform: scale(1.1);
            opacity: 0.8;
          }
        }
        
        /* 自定义滚动条样式 */
        .scrollbar-thin {
          scrollbar-width: thin;
        }
        
        .scrollbar-thin::-webkit-scrollbar {
          width: 6px;
        }
        
        .scrollbar-thin::-webkit-scrollbar-track {
          background: transparent;
        }
        
        .scrollbar-thin::-webkit-scrollbar-thumb {
          background-color: rgba(255, 255, 255, 0.2);
          border-radius: 3px;
        }
        
        .scrollbar-thin::-webkit-scrollbar-thumb:hover {
          background-color: rgba(255, 255, 255, 0.3);
        }
        
        .scrollbar-thumb-white/20::-webkit-scrollbar-thumb {
          background-color: rgba(255, 255, 255, 0.2);
        }
        
        .scrollbar-thumb-white/20::-webkit-scrollbar-thumb:hover {
          background-color: rgba(255, 255, 255, 0.3);
        }
        
        .scrollbar-track-transparent::-webkit-scrollbar-track {
          background: transparent;
        }
      ` })
  ] });
}
export {
  TrailDetail as component
};
