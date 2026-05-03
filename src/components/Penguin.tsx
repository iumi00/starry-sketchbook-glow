/**
 * QQ 企鹅风格 · 简笔画线条版（无填充发光）
 * 只描线条，背影
 */
type Props = {
  size?: number;
  glow?: boolean; // 仅给一个非常微弱的描边光，默认关
  className?: string;
};

export function Penguin({ size = 36, glow = false, className = "" }: Props) {
  const stroke = "rgba(255,255,255,0.85)";
  return (
    <svg
      width={size}
      height={size * 1.25}
      viewBox="0 0 80 100"
      className={className}
      style={{
        filter: glow
          ? "drop-shadow(0 0 1.5px rgba(255,255,255,0.6))"
          : undefined,
      }}
      fill="none"
      stroke={stroke}
      strokeWidth={1.4}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden
    >
      {/* 身体轮廓（葫芦形：头略小、肚子圆） */}
      <path d="M 40 10
               C 26 10, 20 22, 20 34
               C 20 40, 16 46, 16 56
               C 16 78, 26 92, 40 92
               C 54 92, 64 78, 64 56
               C 64 46, 60 40, 60 34
               C 60 22, 54 10, 40 10 Z" />

      {/* 头与身体的分界 */}
      <path d="M 22 36 Q 40 42, 58 36" />

      {/* 左翅膀 */}
      <path d="M 18 46 C 12 54, 12 68, 20 76" />
      {/* 右翅膀 */}
      <path d="M 62 46 C 68 54, 68 68, 60 76" />

      {/* 脚 — 紧贴底边 y=98 */}
      <path d="M 28 92 Q 24 99, 34 99 Q 38 99, 38 95" />
      <path d="M 52 92 Q 56 99, 46 99 Q 42 99, 42 95" />
    </svg>
  );
}
