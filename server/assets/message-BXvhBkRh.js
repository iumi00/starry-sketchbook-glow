import { r as reactExports, U as jsxRuntimeExports } from "./worker-entry-DQRps7mk.js";
import { S as Starfield, P as PolarHUD } from "./PolarHUD-Buk1gcFF.js";
import { b as Route, L as Link } from "./router-vqVZ2fwF.js";
import "node:events";
import "node:async_hooks";
import "node:stream/web";
import "node:stream";
const mergeClasses = (...classes) => classes.filter((className, index, array) => {
  return Boolean(className) && className.trim() !== "" && array.indexOf(className) === index;
}).join(" ").trim();
const toKebabCase = (string) => string.replace(/([a-z0-9])([A-Z])/g, "$1-$2").toLowerCase();
const toCamelCase = (string) => string.replace(
  /^([A-Z])|[\s-_]+(\w)/g,
  (match, p1, p2) => p2 ? p2.toUpperCase() : p1.toLowerCase()
);
const toPascalCase = (string) => {
  const camelCase = toCamelCase(string);
  return camelCase.charAt(0).toUpperCase() + camelCase.slice(1);
};
var defaultAttributes = {
  xmlns: "http://www.w3.org/2000/svg",
  width: 24,
  height: 24,
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 2,
  strokeLinecap: "round",
  strokeLinejoin: "round"
};
const hasA11yProp = (props) => {
  for (const prop in props) {
    if (prop.startsWith("aria-") || prop === "role" || prop === "title") {
      return true;
    }
  }
  return false;
};
const Icon = reactExports.forwardRef(
  ({
    color = "currentColor",
    size = 24,
    strokeWidth = 2,
    absoluteStrokeWidth,
    className = "",
    children,
    iconNode,
    ...rest
  }, ref) => reactExports.createElement(
    "svg",
    {
      ref,
      ...defaultAttributes,
      width: size,
      height: size,
      stroke: color,
      strokeWidth: absoluteStrokeWidth ? Number(strokeWidth) * 24 / Number(size) : strokeWidth,
      className: mergeClasses("lucide", className),
      ...!children && !hasA11yProp(rest) && { "aria-hidden": "true" },
      ...rest
    },
    [
      ...iconNode.map(([tag, attrs]) => reactExports.createElement(tag, attrs)),
      ...Array.isArray(children) ? children : [children]
    ]
  )
);
const createLucideIcon = (iconName, iconNode) => {
  const Component = reactExports.forwardRef(
    ({ className, ...props }, ref) => reactExports.createElement(Icon, {
      ref,
      iconNode,
      className: mergeClasses(
        `lucide-${toKebabCase(toPascalCase(iconName))}`,
        `lucide-${iconName}`,
        className
      ),
      ...props
    })
  );
  Component.displayName = toPascalCase(iconName);
  return Component;
};
const __iconNode = [
  [
    "path",
    {
      d: "M14.536 21.686a.5.5 0 0 0 .937-.024l6.5-19a.496.496 0 0 0-.635-.635l-19 6.5a.5.5 0 0 0-.024.937l7.93 3.18a2 2 0 0 1 1.112 1.11z",
      key: "1ffxy3"
    }
  ],
  ["path", { d: "m21.854 2.147-10.94 10.939", key: "12cjpa" }]
];
const Send = createLucideIcon("send", __iconNode);
function Message() {
  const {
    star,
    content,
    tags,
    from,
    liked
  } = Route.useSearch();
  const [text, setText] = reactExports.useState("");
  const [showSuccess, setShowSuccess] = reactExports.useState(false);
  const [successText, setSuccessText] = reactExports.useState("");
  const [showCrisisModal, setShowCrisisModal] = reactExports.useState(false);
  const [showToast, setShowToast] = reactExports.useState(false);
  const [toastMessage, setToastMessage] = reactExports.useState("");
  const [crisisTitle, setCrisisTitle] = reactExports.useState("");
  const [showCrisisContent, setShowCrisisContent] = reactExports.useState(false);
  const navigate = Route.useNavigate();
  const checkSafety = (content2) => {
    const crisisWords = ["死", "不想活了", "绝望", "抑郁"];
    const hasCrisis = crisisWords.some((word) => content2.includes(word));
    if (hasCrisis) {
      return {
        safe: false,
        type: "crisis"
      };
    }
    const profanityWords = ["傻逼", "他妈的", "贱人"];
    const hasProfanity = profanityWords.some((word) => content2.includes(word));
    if (hasProfanity) {
      return {
        safe: false,
        type: "profanity"
      };
    }
    const adWords = ["加微", "代写", "兼职"];
    const hasAd = adWords.some((word) => content2.includes(word));
    if (hasAd) {
      return {
        safe: false,
        type: "ad"
      };
    }
    return {
      safe: true,
      type: null
    };
  };
  const handleSend = () => {
    if (!text.trim()) return;
    const safetyCheck = checkSafety(text.trim());
    if (!safetyCheck.safe) {
      switch (safetyCheck.type) {
        case "crisis":
          setCrisisTitle("");
          setShowCrisisContent(false);
          setShowCrisisModal(true);
          setTimeout(() => {
            const typeWriter = (text2, setter, delay) => {
              let index = 0;
              const timer = setInterval(() => {
                if (index < text2.length) {
                  setter(text2.substring(0, index + 1));
                  index++;
                } else {
                  clearInterval(timer);
                }
              }, delay);
              return timer;
            };
            typeWriter("🌅 曙光女神路过", setCrisisTitle, 100);
          }, 100);
          setTimeout(() => {
            setShowCrisisContent(true);
          }, 2e3);
          return;
        case "profanity":
          setToastMessage("🛡️ 星空巡护员提醒您：\n南极的星空需要纯净，请换个温柔一点的词语抛出吧 ✨");
          setShowToast(true);
          setTimeout(() => setShowToast(false), 3e3);
          return;
        case "ad":
          setToastMessage("🚑 极光信使检测到：\n电波中含有未知杂音，发送失败。");
          setShowToast(true);
          setTimeout(() => setShowToast(false), 3e3);
          return;
      }
    }
    setTimeout(() => {
      setShowSuccess(true);
      setSuccessText("");
      const fullMessage = "谢谢你的留言\n极夜进度已加快......";
      let index = 0;
      const timer = setInterval(() => {
        if (index < fullMessage.length) {
          setSuccessText(fullMessage.substring(0, index + 1));
          index++;
        } else {
          clearInterval(timer);
          setTimeout(() => {
            if (from === "similar") {
              navigate({
                to: "/similar"
              });
            } else {
              navigate({
                to: "/shiguang",
                search: {
                  stage: "blooming",
                  starNumber: star.replace("碎星#", ""),
                  message: content,
                  liked
                }
              });
            }
          }, 3e3);
        }
      }, 150);
    }, 500);
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative flex flex-col min-h-screen w-full overflow-hidden bg-background grain", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(Starfield, { count: 70 }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(PolarHUD, {}),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute top-[60px] left-4 z-30", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: from === "similar" ? "/similar" : "/shiguang", search: from === "similar" ? void 0 : {
      stage: "blooming",
      starNumber: star.replace("碎星#", ""),
      message: content,
      liked
    }, className: "text-lg leading-none text-foreground/80 hover:text-foreground transition-colors", "aria-label": "返回上一页", children: "←" }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("main", { className: "relative z-10 flex-grow px-5 pb-20 pt-24 flex items-center", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mx-auto max-w-md w-full", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mb-8 p-4 border border-white/10 bg-white/5 backdrop-blur-md rounded-lg", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-white/90 font-cn text-sm", children: [
          star,
          "："
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-white font-cn text-base mt-2 leading-relaxed", children: content }),
        tags && tags.trim() && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex flex-wrap gap-2 mt-3", children: tags.split(" ").filter((tag) => tag.trim()).map((tag, index) => /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "bg-white/10 text-white/80 rounded-full px-3 py-1 text-xs border border-white/30", children: tag }, index)) })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("textarea", { value: text, onChange: (e) => {
          if (e.target.value.length <= 1e3) {
            setText(e.target.value);
          }
        }, placeholder: "写下你的留言...", className: "w-full min-h-[300px] p-4 border border-white/10 bg-white/5 backdrop-blur-md rounded-lg text-white placeholder:text-white/50 resize-none focus:outline-none focus:border-white/20 transition-colors" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative mt-4 flex items-center justify-end", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "absolute left-0 text-[10px] tracking-widest text-muted-foreground", children: [
            text.length,
            "/1000 · Unsigned"
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("button", { onClick: handleSend, disabled: !text.trim(), className: "p-2 text-white/80 hover:text-white transition-colors disabled:text-white/30 disabled:cursor-not-allowed", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Send, { className: "w-5 h-5" }) })
        ] })
      ] })
    ] }) }),
    showSuccess && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "bg-background/90 backdrop-blur-md border border-white/20 rounded-lg p-8 max-w-sm mx-4", children: /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-white/90 font-cn text-lg whitespace-pre-line text-center", children: successText }) }) }),
    showCrisisModal && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-background/95 backdrop-blur-lg border border-white/20 max-w-md mx-auto shadow-2xl shadow-black/30 rounded-xl", style: {
      animation: "gentle-appear 0.8s ease-out"
    }, children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "pb-6", children: /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "text-white text-lg text-center min-h-[2rem]", children: crisisTitle || /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-white/20", children: "极夜漫长，但你不是一个人" }) }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-center space-y-6", children: showCrisisContent && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: {
        animation: "gentle-appear 1.2s ease-out"
      }, children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-white/80 text-sm leading-relaxed", children: "检测到你的情绪正处于极夜的深渊，请不要害怕。请相信，这世上总有人在爱你。如果撑不住了，请握住我的手，随时拨打心理援助热线：400-161-9995（24小时援助热线）。守卫者一直都在。" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-3 mt-6", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("button", { onClick: () => setShowCrisisModal(false), className: "bg-red-500/20 hover:bg-red-500/30 text-red-300 border border-red-500/30 w-full py-2 px-4 rounded-lg", children: "呼叫援助📞" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("button", { onClick: () => {
            setShowCrisisModal(false);
            navigate({
              to: "/keeper"
            });
          }, className: "bg-blue-500/20 hover:bg-blue-500/30 text-blue-300 border border-blue-500/30 w-full py-2 px-4 rounded-lg", children: "去找守夜人聊聊🧠" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("button", { onClick: () => setShowCrisisModal(false), className: "bg-white/10 hover:bg-white/20 text-white border border-white/20 w-full py-2 px-4 rounded-lg", children: "我没事，返回修改←" })
        ] })
      ] }) })
    ] }) }),
    showToast && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-50 animate-fade-in", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "bg-background/95 backdrop-blur-lg border border-white/20 rounded-lg px-8 py-4 shadow-lg shadow-black/30 min-w-[300px] max-w-[400px]", children: /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-white/90 text-base whitespace-pre-line", children: toastMessage }) }) })
  ] });
}
if (typeof document !== "undefined") {
  const style = document.createElement("style");
  style.textContent = `
    @keyframes gentle-appear {
      0% {
        opacity: 0;
        transform: scale(0.95);
      }
      50% {
        opacity: 0.6;
        transform: scale(0.98);
      }
      100% {
        opacity: 1;
        transform: scale(1);
      }
    }
  `;
  document.head.appendChild(style);
}
export {
  Message as component
};
