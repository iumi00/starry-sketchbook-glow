import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { Link } from "@tanstack/react-router";
import { Starfield } from "@/components/Starfield";
import { PolarHUD } from "@/components/PolarHUD";

export const Route = createFileRoute("/echo")({
  head: () => ({ meta: [{ title: "回声 · 同频未署名" }] }),
  component: Echo,
});

const REPLIES: any[] = [];

// AI自动回复模板
const AI_REPLIES = [
  {
    from: "🧣 星空过客 · 【晚风学姐】",
    text: "抱抱你呀。大学这段时间确实很容易像在迷雾里走路一样，觉得什么都抓不住。但我看到你为了不挂科通宵复习，你已经很棒、很努力了！允许自己偶尔当个没有灵魂的 NPC 休息一下吧，学姐的怀抱随时为你敞开 ✨",
  },
  {
    from: "🧭 星空过客 · 【坐标系里的猫】",
    text: "其实从概率学上来说，人生 80% 的烦恼在五年后看都不值一提。你现在觉得很卷、很累，是因为视距太近了。把自己想象成南极冰原上的一只企鹅，那些所谓的'意义'都是人类定义的，你只需要顺着自己的心意去游泳就好了 ✨",
  },
  {
    from: "🎸 星空过客 · 【脱轨的流星】",
    text: "去他的绩点和考核！你今天能好好喘口气就已经很牛了！这帮人天天卷，咱不跟他们玩。实在学不进去就干脆别学了，今晚早点睡，明天去吃顿最贵的，天塌下来有流星顶着！✨",
  },
  {
    from: "☕ 星空过客 · 【凌晨三点的打工人】",
    text: "看到你的话，想起了我大三找实习那个疯狂掉头发的秋天。现在的我在写字楼里喝着苦咖啡，回头看，其实那时的每一次碰壁都是在排除错误选项。深呼吸，不用焦虑，一切都会在未来的某一天完美闭环 ✨",
  },
  {
    from: "✒️ 星空过客 · 【深海拾光者】",
    text: "你的情绪像是一片落在南极冰面上的雪花，很轻，但我接住了。不用急着走出来，难过也是一种很珍贵的体验。我把你这颗灰暗的星星擦亮了，挂在最高的地方，今晚，它只为你闪烁 ✨",
  },
  {
    from: "🦉 星空过客 · 【不睡觉的猫头鹰】",
    text: "又在深夜emo啦？知道你今天很累了，但抱怨完之后，明天还是得爬起来去图书馆占座哦。现在的挣扎都是为了以后能自由地飞。擦干眼泪，我陪你再熬过这个极夜 ✨",
  },
  {
    from: "✈️ 星空过客 · 【跨时空熬夜党】",
    text: "哈哈，刚好我这边是白天，接到你的电波啦。其实不仅是你，我在国外每天赶 Due 的时候也觉得像个无情的机器。别把自己逼太紧了，南极的极夜很长，但我这边的太阳已经升起来了，分你一点阳光 ☀️",
  },
];

// 计算时间差
const getTimeDifference = (publishTime: Date): string => {
  const now = new Date();
  const diff = now.getTime() - publishTime.getTime();
  const minutes = Math.floor(diff / (1000 * 60));
  const hours = Math.floor(diff / (1000 * 60 * 60));
  const days = Math.floor(diff / (1000 * 60 * 60 * 24));
  
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

// 获取动态回声数据
const getDynamicEchoes = () => {
  // 从localStorage获取用户发布的记录
  const userEchoes = localStorage.getItem('userEchoes');
  let dynamicEchoes = [];
  
  if (userEchoes) {
    try {
      dynamicEchoes = JSON.parse(userEchoes);
    } catch (error) {
      console.error('解析用户回声失败:', error);
      dynamicEchoes = [];
    }
  }
  
  // 合并静态数据和用户数据，用户数据在前（倒序）
  return [...dynamicEchoes, ...REPLIES];
};

// 添加AI回复到回声
const addAIReplyToEcho = (userContent: string) => {
  // 随机选择一个AI回复
  const randomReply = AI_REPLIES[Math.floor(Math.random() * AI_REPLIES.length)];
  
  const newEcho = {
    from: randomReply.from,
    when: "刚刚",
    your: userContent,
    text: randomReply.text,
    publishTime: new Date().getTime() // 记录发布时间
  };
  
  // 获取现有用户回声
  const userEchoes = localStorage.getItem('userEchoes');
  let echoList = [];
  
  if (userEchoes) {
    try {
      echoList = JSON.parse(userEchoes);
    } catch (error) {
      console.error('解析用户回声失败:', error);
      echoList = [];
    }
  }
  
  // 添加新回声到开头
  echoList.unshift(newEcho);
  
  // 保存到localStorage
  localStorage.setItem('userEchoes', JSON.stringify(echoList));
  
  return newEcho;
};

function Echo() {
  const [aurora, setAurora] = useState<number | null>(null);
  const [auroraText, setAuroraText] = useState("");
  const [waveSentCards, setWaveSentCards] = useState<Set<number>>(new Set());
  const [auroraSentCards, setAuroraSentCards] = useState<Set<number>>(new Set());
  const [reportModal, setReportModal] = useState<number | null>(null);
  const [reportReason, setReportReason] = useState("");
  const [removedCards, setRemovedCards] = useState<Set<number>>(new Set());
  const [showThanksModal, setShowThanksModal] = useState(false);
  const [thanksText, setThanksText] = useState("");
  
  // 获取动态回声数据
  const dynamicEchoes = getDynamicEchoes();

  return (
    <div className="relative flex flex-col min-h-screen w-full overflow-hidden bg-background grain">
      <Starfield count={70} />
      <PolarHUD />

      {/* 顶部返回箭头 */}
      <div className="absolute top-[60px] left-4 z-30">
        <Link
          to="/"
          className="text-lg leading-none text-foreground/80 hover:text-foreground transition-colors"
          aria-label="返回主场景"
        >
          ←
        </Link>
      </div>

      {/* 标题 */}
      <header className="relative z-10 mt-24 text-center px-5">
        <h1 className="text-2xl tracking-[0.4em] text-foreground/95 font-display">
          【回声】
        </h1>
        <p className="mt-3 text-[11px] tracking-[0.3em] text-muted-foreground font-cn">
          消息中心
        </p>
      </header>

      {/* 内容 */}
      <main className="relative z-10 flex-grow px-5 pb-20 pt-8">
        <div className="mx-auto max-w-md space-y-5">
          {dynamicEchoes.map((r, i) => {
            if (removedCards.has(i)) return null;
            
            // 计算时间差（如果有publishTime字段）
            const timeDisplay = r.publishTime ? getTimeDifference(new Date(r.publishTime)) : r.when;
            
            return (
            <article
              key={i}
              className="pencil-border bg-card/40 backdrop-blur-sm p-5 animate-fade-up"
              style={{ animationDelay: `${i * 0.1}s` }}
            >
              <div className="flex items-center justify-between text-[10px] tracking-[0.25em] text-white">
                <span>{r.from}</span>
                <span>{timeDisplay}</span>
              </div>
              <div className="mt-3 pl-3 border-l border-border/60 text-[11px] text-muted-foreground font-cn leading-relaxed">
                你说：{r.your.length > 25 ? r.your.substring(0, 25) + '...' : r.your}
              </div>
              <p className="mt-4 text-[15px] leading-[1.9] text-foreground/95 font-cn">
                {r.text}
              </p>
              <div className="mt-5 pt-3 border-t border-border/50 flex items-center justify-between text-[11px] tracking-[0.25em]">
                <button
                  onClick={() => {
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
                      }, 100); // 打字机速度
                    }
                  }}
                  className={`transition-opacity ${auroraSentCards.has(i) ? 'text-aurora/50 cursor-not-allowed' : 'text-aurora hover:opacity-80'}`}
                  disabled={auroraSentCards.has(i)}
                >
                  {auroraSentCards.has(i) ? '✦' : '✦ 送一道极光'}
                </button>
                <button
                  onClick={() => {
                    const newWaveSentCards = new Set(waveSentCards);
                    newWaveSentCards.add(i);
                    setWaveSentCards(newWaveSentCards);
                  }}
                  className="text-white hover:text-white/80 transition-colors flex items-center space-x-2"
                >
                  {waveSentCards.has(i) ? (
                    <svg width="16" height="12" viewBox="0 0 16 12" fill="none" className="opacity-80">
                      <path 
                        d="M1 6 L3 6 L4 2 L6 10 L8 4 L10 8 L12 3 L13 6 L15 6" 
                        stroke="#ec4899" 
                        strokeWidth="1" 
                        fill="none"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  ) : (
                    <>
                      <span>发去一道感谢电波</span>
                      <svg width="16" height="12" viewBox="0 0 16 12" fill="none" className="opacity-80">
                        <path 
                          d="M1 6 L3 6 L4 2 L6 10 L8 4 L10 8 L12 3 L13 6 L15 6" 
                          stroke="currentColor" 
                          strokeWidth="1" 
                          fill="none"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    </>
                  )}
                </button>
                <button 
                  onClick={() => setReportModal(i)}
                  className="text-muted-foreground hover:text-foreground transition-colors"
                >
                  标记不适
                </button>
              </div>
            </article>
          );
          })}
        </div>
      </main>

      {/* 极光特效 */}
      {aurora !== null && (
        <div
          className="fixed inset-0 z-50 pointer-events-none animate-fade-in"
          onAnimationEnd={() => setTimeout(() => setAurora(null), 1800)}
        >
          <div
            className="absolute inset-0"
            style={{
              background:
                "radial-gradient(ellipse at 50% 0%, oklch(0.78 0.16 165 / 0.45), transparent 60%), radial-gradient(ellipse at 30% 20%, oklch(0.82 0.12 80 / 0.25), transparent 50%)",
              animation: "fade-in 0.6s ease-out",
            }}
          />
          {/* 中间弹窗 */}
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="bg-background/90 backdrop-blur-md border border-white/20 rounded-lg p-6 max-w-sm mx-4">
              <p className="text-white font-cn text-lg text-center tracking-[0.3em]">
                {auroraText}
              </p>
            </div>
          </div>
        </div>
      )}
      {/* 标记不适弹窗 */}
      {reportModal !== null && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm">
          <div className="bg-background/90 backdrop-blur-md border border-white/20 rounded-lg p-6 max-w-sm mx-4 w-full">
            <h3 className="text-white/90 font-cn text-lg mb-4">标记不适</h3>
            <p className="text-white/70 font-cn text-sm mb-4">
              是否标记该留言为不适内容？
            </p>
            <div className="mb-4">
              <textarea
                value={reportReason}
                onChange={(e) => setReportReason(e.target.value)}
                placeholder="请填写标记理由（可选）"
                className="w-full min-h-[80px] p-3 border border-white/10 bg-white/5 backdrop-blur-md rounded-lg text-white placeholder:text-white/50 resize-none focus:outline-none focus:border-white/20 transition-colors text-sm"
              />
            </div>
            <div className="flex justify-end space-x-3">
              <button
                onClick={() => {
                  setReportModal(null);
                  setReportReason("");
                }}
                className="px-4 py-2 text-white/60 hover:text-white transition-colors text-sm"
              >
                取消
              </button>
              <button
                onClick={() => {
                  if (reportModal !== null) {
                    const newRemovedCards = new Set(removedCards);
                    newRemovedCards.add(reportModal);
                    setRemovedCards(newRemovedCards);
                    setReportModal(null);
                    setReportReason("");
                    
                    // 延迟显示感谢弹窗
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
                          // 3秒后自动关闭感谢弹窗
                          setTimeout(() => {
                            setShowThanksModal(false);
                            setThanksText("");
                          }, 3000);
                        }
                      }, 80); // 打字机速度
                    }, 300); // 300ms延迟
                  }
                }}
                className="px-4 py-2 bg-red-500/20 text-red-400 hover:bg-red-500/30 transition-colors rounded-lg text-sm"
              >
                确认
              </button>
            </div>
          </div>
        </div>
      )}

      {/* 感谢弹窗 */}
      {showThanksModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm">
          <div className="bg-background/90 backdrop-blur-md border border-white/20 rounded-lg p-6 max-w-md mx-4">
            <div className="text-white font-cn text-lg text-center leading-relaxed tracking-[0.1em] whitespace-pre-line">
              {thanksText}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
