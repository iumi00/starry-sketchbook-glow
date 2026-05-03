import { Link } from "@tanstack/react-router";
import { Starfield } from "@/components/Starfield";
import { Penguin } from "@/components/Penguin";
import { PolarHUD } from "@/components/PolarHUD";

const ENTRIES = [
  { to: "/carve",   label: "刻录",   hint: "写下此刻" },
  { to: "/glimmer", label: "拾光",   hint: "看别人的" },
  { to: "/echo",    label: "回声",   hint: "消息中心" },
  { to: "/trail",   label: "星轨",   hint: "我的档案" },
  { to: "/keeper",  label: "守夜人", hint: "AI 陪伴" },
] as const;

/**
 * 主场景：
 * - 上半部分：星空 + 入口列表（纵向）
 * - 下半部分：地球弧线（南极冰原边缘），企鹅站在弧线上仰望
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

      {/* 入口列表 — 顶部 HUD 与地平线之间居中（约 28%~30%） */}
      <nav className="absolute left-0 right-0 top-[30%] flex flex-col items-center gap-5 z-20">
        {ENTRIES.map((e, i) => (
          <Link
            key={e.to}
            to={e.to}
            className="group select-none flex flex-col items-center"
            style={{
              animation: `fade-up 0.7s ease-out ${0.15 + i * 0.1}s both`,
            }}
          >
            <span className="text-base tracking-[0.35em] text-foreground/90 font-cn group-hover:text-aurora transition-colors">
              【{e.label}】
            </span>
            <span className="mt-0.5 text-[10px] tracking-[0.25em] text-muted-foreground/70 opacity-0 group-hover:opacity-100 transition-opacity font-hand">
              {e.hint}
            </span>
          </Link>
        ))}
      </nav>

      {/* 地平线 + 企鹅 — 放在下方 */}
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-[38%]">
        {/* 企鹅：站在弧线顶点上 */}
        {/* 企鹅固定站在弧顶上 */}
        <div
          className="absolute left-1/2 -translate-x-1/2 z-10"
          style={{ bottom: "calc(32% + 46px)" }}
        >
          <Penguin size={42} />
        </div>

        {/* 地球弧线 */}
        <svg
          viewBox="0 0 1000 400"
          preserveAspectRatio="none"
          className="absolute inset-x-0 bottom-0 w-[180%] left-1/2 -translate-x-1/2 h-full"
        >
          <path
            d="M -50 380 Q 500 60 1050 380 L 1050 400 L -50 400 Z"
            fill="oklch(0.06 0.005 250)"
            stroke="rgba(255,255,255,0.55)"
            strokeWidth="1.2"
          />
          <path
            d="M -50 388 Q 500 72 1050 388"
            fill="none"
            stroke="rgba(255,255,255,0.18)"
            strokeWidth="0.8"
            strokeDasharray="2 4"
          />
          {Array.from({ length: 14 }).map((_, i) => {
            const t = (i + 1) / 15;
            const x = 1100 * t - 50;
            const y = 380 - 4 * (1 - t) * t * 320;
            return (
              <circle key={i} cx={x} cy={y - 1} r="0.8" fill="white" opacity={0.55} />
            );
          })}
        </svg>
      </div>

      {/* 底部一句话（强制单行） */}
      <div className="absolute bottom-3 left-1/2 -translate-x-1/2 z-30 text-[10px] tracking-[0.3em] text-muted-foreground/70 font-cn whitespace-nowrap">
        极夜漫长 · 你不是一个人在等
      </div>
    </div>
  );
}
