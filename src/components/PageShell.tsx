import { Link } from "@tanstack/react-router";
import type { ReactNode } from "react";
import { Starfield } from "@/components/Starfield";

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
    <div className="relative min-h-screen w-full overflow-hidden bg-background grain">
      <Starfield count={70} />

      {/* 顶部返回 */}
      <header className="relative z-10 flex items-center justify-between px-5 pt-5">
        <Link
          to="/"
          className="text-lg leading-none text-foreground/80 hover:text-foreground transition-colors"
          aria-label="返回主场景"
        >
          ←
        </Link>
        <div className="text-[10px] tracking-[0.35em] text-muted-foreground font-cn">
          南极回声
        </div>
        <div className="w-4" />
      </header>

      {/* 标题 */}
      <div className="relative z-10 mt-10 text-center">
        <h1 className="text-2xl tracking-[0.4em] text-foreground/95 font-display">
          【{title}】
        </h1>
        {subtitle && (
          <p className="mt-3 text-[11px] tracking-[0.3em] text-muted-foreground font-cn">
            {subtitle}
          </p>
        )}
      </div>

      {/* 内容 */}
      <main className="relative z-10 px-5 pb-20 pt-8">{children}</main>
    </div>
  );
}
