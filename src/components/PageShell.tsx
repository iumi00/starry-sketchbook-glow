import { Link } from "@tanstack/react-router";
import type { ReactNode } from "react";
import { Starfield } from "@/components/Starfield";
import { PolarHUD } from "@/components/PolarHUD";
import { Penguin } from "@/components/Penguin";

/**
 * 子页面通用外壳：纯黑极夜 + 顶部返回 + 标题
 */
export function PageShell({
  title,
  subtitle,
  children,
}: {
  title: string;
  subtitle?: string;
  children: ReactNode;
}) {
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
          【{title}】
        </h1>
        {subtitle && (
          <p className="mt-3 text-[11px] tracking-[0.3em] text-muted-foreground font-cn">
            {subtitle}
          </p>
        )}
      </header>

      {/* 内容 */}
      <main className="relative z-10 flex-grow px-5 pb-20 pt-8">{children}</main>

      {/* 地平线 + 企鹅 — 放在下方 */}
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-[38%]">
        {/* 企鹅：站在弧线顶点上 */}
        <div
          className="absolute left-1/2 -translate-x-1/2 z-10"
          style={{ bottom: "calc(45% - 0.954px)" }}
        >
          <Penguin size={38} />
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
