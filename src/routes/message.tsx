import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { Starfield } from "@/components/Starfield";
import { PolarHUD } from "@/components/PolarHUD";
import { Link } from "@tanstack/react-router";
import { Send } from "lucide-react";

export const Route = createFileRoute("/message")({
  head: () => ({ meta: [{ title: "留言 · 同频未署名" }] }),
  component: Message,
  validateSearch: (search: Record<string, unknown>) => ({
    star: search.star as string || "碎星#100",
    content: search.content as string || "这是一条示例消息内容",
    tags: search.tags as string || "",
    from: search.from as string || "shiguang",
    liked: search.liked as string || undefined,
  }),
});

function Message() {
  const { star, content, tags, from, liked } = Route.useSearch();
  const [text, setText] = useState("");
  const [showSuccess, setShowSuccess] = useState(false);
  const [successText, setSuccessText] = useState("");
  const [showCrisisModal, setShowCrisisModal] = useState(false);
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState("");
  const [crisisTitle, setCrisisTitle] = useState("");
  const [showCrisisContent, setShowCrisisContent] = useState(false);
  const navigate = Route.useNavigate();

  // 安全检查函数
  const checkSafety = (content: string): { safe: boolean; type: 'crisis' | 'profanity' | 'ad' | null } => {
    // 危机词汇检测
    const crisisWords = ['死', '不想活了', '绝望', '抑郁'];
    const hasCrisis = crisisWords.some(word => content.includes(word));
    
    if (hasCrisis) {
      return { safe: false, type: 'crisis' };
    }
    
    // 脏话词汇检测
    const profanityWords = ['傻逼', '他妈的', '贱人'];
    const hasProfanity = profanityWords.some(word => content.includes(word));
    
    if (hasProfanity) {
      return { safe: false, type: 'profanity' };
    }
    
    // 广告词汇检测
    const adWords = ['加微', '代写', '兼职'];
    const hasAd = adWords.some(word => content.includes(word));
    
    if (hasAd) {
      return { safe: false, type: 'ad' };
    }
    
    return { safe: true, type: null };
  };

  const handleSend = () => {
    if (!text.trim()) return;
    
    // 安全检查
    const safetyCheck = checkSafety(text.trim());
    
    if (!safetyCheck.safe) {
      switch (safetyCheck.type) {
        case 'crisis':
          setCrisisTitle("");
          setShowCrisisContent(false);
          setShowCrisisModal(true);
          // 开始打字机效果
          setTimeout(() => {
            const typeWriter = (text: string, setter: (value: string) => void, delay: number) => {
              let index = 0;
              const timer = setInterval(() => {
                if (index < text.length) {
                  setter(text.substring(0, index + 1));
                  index++;
                } else {
                  clearInterval(timer);
                }
              }, delay);
              return timer;
            };
            typeWriter("🌅 曙光女神路过", setCrisisTitle, 100);
          }, 100);
          // 标题显示完毕后显示内容
          setTimeout(() => {
            setShowCrisisContent(true);
          }, 2000);
          return;
        case 'profanity':
          setToastMessage('🛡️ 星空巡护员提醒您：\n南极的星空需要纯净，请换个温柔一点的词语抛出吧 ✨');
          setShowToast(true);
          setTimeout(() => setShowToast(false), 3000);
          return;
        case 'ad':
          setToastMessage('🚑 极光信使检测到：\n电波中含有未知杂音，发送失败。');
          setShowToast(true);
          setTimeout(() => setShowToast(false), 3000);
          return;
      }
    }
    
    // Add delay before showing success dialog
    setTimeout(() => {
      setShowSuccess(true);
      setSuccessText("");
      
      // Typewriter effect for success message (slower speed)
      const fullMessage = "谢谢你的留言\n极夜进度已加快......";
      let index = 0;
      const timer = setInterval(() => {
        if (index < fullMessage.length) {
          setSuccessText(fullMessage.substring(0, index + 1));
          index++;
        } else {
          clearInterval(timer);
          // Auto redirect after 3 seconds
          setTimeout(() => {
            if (from === "similar") {
              navigate({ to: "/similar" });
            } else {
              navigate({ 
                to: "/shiguang",
                search: { 
                  stage: "blooming",
                  starNumber: star.replace("碎星#", ""),
                  message: content,
                  liked: liked
                }
              });
            }
          }, 3000);
        }
      }, 150); // Slower typewriter effect (150ms per character)
    }, 500); // 500ms delay before showing dialog
  };

  return (
    <div className="relative flex flex-col min-h-screen w-full overflow-hidden bg-background grain">
      <Starfield count={70} />
      <PolarHUD />

      {/* 顶部返回箭头 */}
      <div className="absolute top-[60px] left-4 z-30">
        <Link
          to={from === "similar" ? "/similar" : "/shiguang"}
          search={from === "similar" ? undefined : { 
            stage: "blooming",
            starNumber: star.replace("碎星#", ""),
            message: content,
            liked: liked
          }}
          className="text-lg leading-none text-foreground/80 hover:text-foreground transition-colors"
          aria-label="返回上一页"
        >
          ←
        </Link>
      </div>

      {/* 内容 */}
      <main className="relative z-10 flex-grow px-5 pb-20 pt-24 flex items-center">
        <div className="mx-auto max-w-md w-full">
          {/* 显示星星编号和内容 */}
          <div className="mb-8 p-4 border border-white/10 bg-white/5 backdrop-blur-md rounded-lg">
            <p className="text-white/90 font-cn text-sm">
              {star}：
            </p>
            <p className="text-white font-cn text-base mt-2 leading-relaxed">
              {content}
            </p>
            {tags && tags.trim() && (
              <div className="flex flex-wrap gap-2 mt-3">
                {tags.split(' ').filter(tag => tag.trim()).map((tag, index) => (
                  <span
                    key={index}
                    className="bg-white/10 text-white/80 rounded-full px-3 py-1 text-xs border border-white/30"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            )}
          </div>

          {/* 输入框 */}
          <div className="relative">
            <textarea
              value={text}
              onChange={(e) => {
                if (e.target.value.length <= 1000) {
                  setText(e.target.value);
                }
              }}
              placeholder="写下你的留言..."
              className="w-full min-h-[300px] p-4 border border-white/10 bg-white/5 backdrop-blur-md rounded-lg text-white placeholder:text-white/50 resize-none focus:outline-none focus:border-white/20 transition-colors"
            />
            
            {/* 发送按钮 */}
            <div className="relative mt-4 flex items-center justify-end">
              <span className="absolute left-0 text-[10px] tracking-widest text-muted-foreground">
                {text.length}/1000 · Unsigned
              </span>
              <button
                onClick={handleSend}
                disabled={!text.trim()}
                className="p-2 text-white/80 hover:text-white transition-colors disabled:text-white/30 disabled:cursor-not-allowed"
              >
                <Send className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>
      </main>

      {/* 成功弹窗 */}
      {showSuccess && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm">
          <div className="bg-background/90 backdrop-blur-md border border-white/20 rounded-lg p-8 max-w-sm mx-4">
            <p className="text-white/90 font-cn text-lg whitespace-pre-line text-center">
              {successText}
            </p>
          </div>
        </div>
      )}
      
      {/* 危机Modal */}
      {showCrisisModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm">
          <div className="bg-background/95 backdrop-blur-lg border border-white/20 max-w-md mx-auto shadow-2xl shadow-black/30 rounded-xl" style={{ animation: 'gentle-appear 0.8s ease-out' }}>
            <div className="pb-6">
              <h2 className="text-white text-lg text-center min-h-[2rem]">
                {crisisTitle || <span className="text-white/20">极夜漫长，但你不是一个人</span>}
              </h2>
            </div>
            
            <div className="text-center space-y-6">
              {showCrisisContent && (
                <div style={{ animation: 'gentle-appear 1.2s ease-out' }}>
                  <p className="text-white/80 text-sm leading-relaxed">
                    检测到你的情绪正处于极夜的深渊，请不要害怕。请相信，这世上总有人在爱你。如果撑不住了，请握住我的手，随时拨打心理援助热线：400-161-9995（24小时援助热线）。守卫者一直都在。
                  </p>
                  
                  <div className="space-y-3 mt-6">
                    <button
                      onClick={() => setShowCrisisModal(false)}
                      className="bg-red-500/20 hover:bg-red-500/30 text-red-300 border border-red-500/30 w-full py-2 px-4 rounded-lg"
                    >
                      呼叫援助📞
                    </button>
                    
                    <button
                      onClick={() => {
                        setShowCrisisModal(false);
                        navigate({ to: "/keeper" });
                      }}
                      className="bg-blue-500/20 hover:bg-blue-500/30 text-blue-300 border border-blue-500/30 w-full py-2 px-4 rounded-lg"
                    >
                      去找守夜人聊聊🧠
                    </button>
                    
                    <button
                      onClick={() => setShowCrisisModal(false)}
                      className="bg-white/10 hover:bg-white/20 text-white border border-white/20 w-full py-2 px-4 rounded-lg"
                    >
                      我没事，返回修改←
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
      
      {/* Toast提示 */}
      {showToast && (
        <div className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-50 animate-fade-in">
          <div className="bg-background/95 backdrop-blur-lg border border-white/20 rounded-lg px-8 py-4 shadow-lg shadow-black/30 min-w-[300px] max-w-[400px]">
            <p className="text-white/90 text-base whitespace-pre-line">{toastMessage}</p>
          </div>
        </div>
      )}
    </div>
  );
}

// 添加全局样式
if (typeof document !== 'undefined') {
  const style = document.createElement('style');
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
