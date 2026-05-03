/**
 * QQ 企鹅风格 · 简笔画线条版（更矮胖、白围巾）
 * 背影；只描线条，无整体发光
 */
type Props = {
  size?: number;
  className?: string;
};

export function Penguin({ size = 40, className = "" }: Props) {
  const stroke = "rgba(255,255,255,0.9)";
  return (
    <svg
      width={size}
      height={size * 0.95}
      viewBox="0 0 90 86"
      className={className}
      fill="none"
      stroke={stroke}
      strokeWidth={1.4}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden
    >
      {/* 身体（矮胖葫芦：头小、肚子很圆） */}
      <path d="M 45 8
               C 32 8, 27 16, 27 25
               C 27 29, 18 34, 18 50
               C 18 70, 30 80, 45 80
               C 60 80, 72 70, 72 50
               C 72 34, 63 29, 63 25
               C 63 16, 58 8, 45 8 Z" />

      {/* 围巾：两条线 + 白色填充 */}
      <path
        d="M 27 30 Q 45 36, 63 30 L 63 36 Q 45 42, 27 36 Z"
        fill="rgba(255,255,255,0.95)"
        stroke={stroke}
        strokeWidth={1.2}
      />

      {/* 翅膀 */}
      <path d="M 22 46 C 14 54, 14 66, 24 72" />
      <path d="M 68 46 C 76 54, 76 66, 66 72" />

      {/* 脚 — 紧贴底边 y=85 */}
      <path d="M 35 80 Q 30 85, 41 85 Q 44 85, 44 81" />
      <path d="M 55 80 Q 60 85, 49 85 Q 46 85, 46 81" />
    </svg>
  );
}
