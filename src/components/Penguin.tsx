/**
 * QQ 企鹅风格 · 简笔画线条版（背影）
 * - 头部明显（圆头）、身体梨形、肩膀略窄
 * - 不要过胖；保留白围巾
 * - 双脚贴底边
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
      height={size * 1.05}
      viewBox="0 0 90 94"
      className={className}
      fill="none"
      stroke={stroke}
      strokeWidth={1.4}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden
    >
      {/* 头部（圆形） */}
      <path d="M 45 6
               C 33 6, 27 14, 27 22
               C 27 30, 33 36, 45 36
               C 57 36, 63 30, 63 22
               C 63 14, 57 6, 45 6 Z" />

      {/* 身体（梨形：肩窄、肚子圆，但不过胖） */}
      <path d="M 30 32
               C 26 40, 23 50, 23 60
               C 23 78, 33 87, 45 87
               C 57 87, 67 78, 67 60
               C 67 50, 64 40, 60 32" />

      {/* 围巾：两条线 + 白色填充（紧贴头下） */}
      <path
        d="M 28 34 Q 45 40, 62 34 L 62 40 Q 45 46, 28 40 Z"
        fill="rgba(255,255,255,0.95)"
        stroke={stroke}
        strokeWidth={1.2}
      />

      {/* 翅膀（贴在身体两侧） */}
      <path d="M 25 50 C 18 58, 19 70, 28 78" />
      <path d="M 65 50 C 72 58, 71 70, 62 78" />

      {/* 脚 — 贴底边 y=92~93 */}
      <path d="M 36 86 Q 30 93, 42 93 Q 45 93, 45 87" />
      <path d="M 54 86 Q 60 93, 48 93 Q 45 93, 45 87" />
    </svg>
  );
}
