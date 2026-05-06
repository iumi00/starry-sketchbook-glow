import { createFileRoute } from "@tanstack/react-router";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Starfield } from "@/components/Starfield";
import { PolarHUD } from "@/components/PolarHUD";
import { Link } from "@tanstack/react-router";

export const Route = createFileRoute("/glimmer-new")({
  head: () => ({ meta: [{ title: "拾光 · 同频未署名" }] }),
  component: Glimmer,
});

// 模拟留言数据
const MESSAGES = [
  "今天在图书馆看到一个很像你的人，我的心跳停了一拍。",
  "深夜的便利店，我们同时伸手拿了同一罐咖啡。",
  "你说得对，有些共鸣确实不需要名字。",
  "那天的晚霞很温柔，像你一样。",
  "我一直在等一颗星星落下来，直到遇见了你。",
];

function Glimmer() {
  const [stage, setStage] = useState<"seeking" | "touching" | "blooming">("seeking");
  const [message] = useState(() => MESSAGES[Math.floor(Math.random() * MESSAGES.length)]);
  const [showCard, setShowCard] = useState(false);

  useEffect(() => {
    if (stage === "seeking") {
      // 阶段1: 寻星 (0-1.5秒)
      const timer1 = setTimeout(() => {
        setStage("touching");
      }, 1500);

      // 阶段2: 触碰 (1.5-2.5秒)
      const timer2 = setTimeout(() => {
        setStage("blooming");
      }, 2500);

      // 阶段3: 绽放 (2.5秒后)
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

  return (
    <div className="relative flex flex-col min-h-screen w-full overflow-hidden bg-background grain">
      <Starfield count={120} />
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

      {/* 阶段1: 寻星 - 星星下落 */}
      <AnimatePresence>
        {stage === "seeking" && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="absolute top-20 left-1/2 -translate-x-1/2 z-20"
          >
            <motion.div
              initial={{ 
                y: -100,
                scale: 0.5,
                opacity: 0
              }}
              animate={{ 
                y: 0,
                scale: 1,
                opacity: 1
              }}
              transition={{ 
                duration: 1.5,
                ease: [0.4, 0, 0.2, 1],
                delay: 0.2
              }}
              className="relative"
            >
              {/* 发光的星星 */}
              <motion.div
                className="w-3 h-3 bg-white rounded-full"
                animate={{
                  boxShadow: [
                    "0 0 20px rgba(255,255,255,0.8)",
                    "0 0 40px rgba(255,255,255,0.6)",
                    "0 0 60px rgba(255,255,255,0.4)",
                    "0 0 80px rgba(255,255,255,0.2)",
                  ]
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
              />
            </motion.div>

            {/* 提示文字 */}
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 20 }}
              transition={{ delay: 0.8, duration: 0.6 }}
              className="text-center"
            >
              <p className="text-sm tracking-wider text-white/60 font-cn">
                『正在为你捕获一颗遥远的星...』
              </p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* 阶段2: 触碰 - 涟漪效果 */}
      <AnimatePresence>
        {stage === "touching" && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="absolute inset-0 flex items-center justify-center z-20"
          >
            <motion.div
              className="w-4 h-4 bg-white rounded-full"
              animate={{
                scale: [1, 1.2, 1],
                boxShadow: [
                  "0 0 0px rgba(255,255,255,0.8)",
                  "0 0 30px rgba(255,255,255,0.6)",
                  "0 0 60px rgba(255,255,255,0.3)",
                  "0 0 90px rgba(255,255,255,0.1)",
                ]
              }}
              transition={{
                duration: 1.5,
                repeat: 2,
                ease: "easeInOut"
              }}
            />

            {/* 涟漪效果 */}
            {[...Array(3)].map((_, i) => (
              <motion.div
                key={i}
                className="absolute border border-white/20 rounded-full"
                initial={{ scale: 0, opacity: 0.8 }}
                animate={{ 
                  scale: [0, 2, 3],
                  opacity: [0.8, 0.4, 0]
                }}
                transition={{
                  duration: 1.5,
                  delay: i * 0.2,
                  ease: "easeOut"
                }}
                style={{
                  width: `${80 + i * 40}px`,
                  height: `${80 + i * 40}px`,
                }}
              />
            ))}

            {/* 提示文字 */}
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3, duration: 0.4 }}
              className="absolute top-1/3 left-1/2 -translate-x-1/2 text-center"
            >
              <span className="text-lg tracking-wider text-white/80 font-cn">
                『捕获成功。』
              </span>
            </motion.p>
          </motion.div>
        )}
      </AnimatePresence>

      {/* 阶段3: 绽放 - 卡片展开 */}
      <AnimatePresence>
        {stage === "blooming" && (
          <motion.div
            layoutId="star-card"
            initial={{ 
              scale: 0,
              borderRadius: "50%",
              opacity: 0
            }}
            animate={{ 
              scale: 1,
              borderRadius: "12px",
              opacity: 1
            }}
            transition={{ 
              duration: 1.2,
              ease: [0.4, 0, 0.2, 1]
            }}
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-80 max-w-[90vw] bg-white/5 backdrop-blur-md border border-white/10 rounded-xl p-6 z-20"
          >
            {/* 留言内容 */}
            <AnimatePresence>
              {showCard && (
                <motion.p
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.3, duration: 0.8 }}
                  className="text-[15px] leading-relaxed text-white font-cn"
                >
                  {message}
                </motion.p>
              )}
            </AnimatePresence>

            {/* 底部按钮 */}
            <AnimatePresence>
              {showCard && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.6, duration: 0.5 }}
                  className="flex justify-center gap-4 mt-6"
                >
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="flex items-center gap-2 px-4 py-2 bg-white/10 hover:bg-white/20 border border-white/20 rounded-full text-white/80 text-sm transition-colors"
                  >
                    <span>共鸣</span>
                    <span>✨</span>
                  </motion.button>
                  
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="flex items-center gap-2 px-4 py-2 bg-white/10 hover:bg-white/20 border border-white/20 rounded-full text-white/80 text-sm transition-colors"
                  >
                    <span>回信</span>
                    <span>✉️</span>
                  </motion.button>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
