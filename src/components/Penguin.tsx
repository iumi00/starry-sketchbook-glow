/**
 * QQ 企鹅风格 · 简笔画线条版（矮胖、白围巾）
 * 背影；只描线条，无整体发光
 */
type Props = {
  size?: number;
  className?: string;
};

export function Penguin({ size = 26, className = "" }: Props) {
  const stroke = "rgba(255,255,255,0.9)";
  return (
    <svg
      width={size}
      height={size * 1.05}
      viewBox="0 0 80 84"
      className={className}
      fill="none"
      stroke={stroke}
      strokeWidth={1.4}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden
    >
      {/* 身体（矮胖葫芦：头小、肚子圆） */}
      <path d="M 40 6
               C 28 6, 23 14, 23 24
               C 23 28, 18 32, 18 44
               C 18 64, 28 76, 40 76
               C 52 76, 62 64, 62 44
               C 62 32, 57 28, 57 24
               C 57 14, 52 6, 40 6 Z" />

      {/* 围巾：两条线 + 白色填充 */}
      <path
        d="M 23 28 Q 40 34, 57 28 L 57 33 Q 40 39, 23 33 Z"
        fill="rgba(255,255,255,0.95)"
        stroke={stroke}
        strokeWidth={1.2}
      />

      {/* 翅膀 */}
      <path d="M 20 40 C 14 48, 14 60, 22 66" />
      <path d="M 60 40 C 66 48, 66 60, 58 66" />

      {/* 脚 — 紧贴底边 y=83 */}
      <path d="M 30 76 Q 26 83, 36 83 Q 39 83, 39 79" />
      <path d="M 50 76 Q 54 83, 44 83 Q 41 83, 41 79" />
    </svg>
  );
}
