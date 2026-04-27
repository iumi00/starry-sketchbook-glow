import { Link } from "@tanstack/react-router";
import { Starfield } from "@/components/Starfield";
import { Penguin } from "@/components/Penguin";
import { PolarHUD } from "@/components/PolarHUD";

const ENTRIES = [
  { to: "/carve",     label: "刻录",   hint: "写下此刻",    angle: -110 },
  { to: "/glimmer",   label: "拾光",   hint: "看别人的",    angle: -55 },
  { to: "/echo",      label: "回声",   hint: "消息中心",    angle: 55 },
  { to: "/trail",     label: "星轨",   hint: "我的档案",    angle: 110 },
  { to: "/keeper",    label: "守夜人", hint: "AI 陪伴",     angle: 180 },
] as const;

/**
 * 主场景：企鹅站在南极冰原弧线上，仰望星空
 * 5 个手绘文字入口悬浮在企鹅周围（无底部 tab）
 */
export function MainScene() {
  return (
    <div className="relative min-h-screen w-full overflow-hidden bg-background grain">
      <Starfield count={120} />
      <PolarHUD />

      {/* 偶发流星 */}
      <span
        aria-hidden
        className="pointer-events-none absolute top-[10%] left-[-10%] w-24 h-[1px] bg-gradient-to-r from-transparent via-white to-transparent"
        style={{ animation: "shooting-star 9s linear infinite", animationDelay: "3s" }}
      />

      {/* 主舞台 */}
      <div className="relative h-screen w-full flex items-center justify-center">
        {/* 企鹅 + 入口环 */}
        <div className="relative" style={{ width: 320, height: 320 }}>
          {/* 入口（围绕企鹅悬浮） */}
          {ENTRIES.map((e, i) => {
            const rad = (e.angle * Math.PI) / 180;
            const radius = 150;
            const x = Math.cos(rad) * radius;
            const y = Math.sin(rad) * radius;
            return (
              <Link
                key={e.to}
                to={e.to}
                className="group absolute -translate-x-1/2 -translate-y-1/2 select-none"
                style={{
                  left: `calc(50% + ${x}px)`,
                  top: `calc(50% + ${y}px)`,
                  animation: `fade-up 0.7s ease-out ${0.2 + i * 0.12}s both, drift ${
                    5 + (i % 3)
                  }s ease-in-out ${i * 0.4}s infinite`,
                }}
              >
                <div className="flex flex-col items-center text-center">
                  <span className="text-base sm:text-lg tracking-[0.3em] text-foreground/90 font-cn group-hover:text-aurora transition-colors">
                    【{e.label}】
                  </span>
                  <span className="mt-1 text-[10px] tracking-[0.2em] text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity font-hand">
                    {e.hint}
                  </span>
                  {/* 入口下方的小光点（手绘风） */}
                  <span className="mt-1.5 w-1 h-1 bg-foreground/70 rounded-[1px] animate-twinkle-slow" />
                </div>
              </Link>
            );
          })}

          {/* 企鹅本体 */}
          <div
            className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2"
            style={{ animation: "drift 6s ease-in-out infinite" }}
          >
            <Penguin size={72} glow />
          </div>
        </div>

        {/* 地球弧线（南极冰原边缘） */}
        <svg
          viewBox="0 0 1000 400"
          preserveAspectRatio="none"
          className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[180%] h-[55%] pointer-events-none"
        >
          {/* 主弧线 */}
          <path
            d="M -50 380 Q 500 50 1050 380 Z"
            fill="oklch(0.06 0.005 250)"
            stroke="rgba(255,255,255,0.55)"
            strokeWidth="1.2"
          />
          {/* 第二条手绘抖动副线（铅笔感） */}
          <path
            d="M -50 388 Q 500 62 1050 388"
            fill="none"
            stroke="rgba(255,255,255,0.18)"
            strokeWidth="0.8"
            strokeDasharray="2 4"
          />
          {/* 弧线上散落的小冰晶 */}
          {Array.from({ length: 14 }).map((_, i) => {
            const t = (i + 1) / 15;
            const x = 1100 * t - 50;
            // 二次贝塞尔近似 y
            const y = 380 - 4 * (1 - t) * t * 330;
            return (
              <circle
                key={i}
                cx={x}
                cy={y - 1}
                r="0.8"
                fill="white"
                opacity={0.55}
              />
            );
          })}
        </svg>

        {/* 底部一句话（手写体） */}
        <div className="absolute bottom-6 left-1/2 -translate-x-1/2 text-[11px] tracking-[0.35em] text-muted-foreground/70 font-cn">
          极夜漫长 · 你不是一个人在等
        </div>
      </div>
    </div>
  );
}
