/**
 * QQ 企鹅风格 · 简笔线条版（背影）
 * - 头几乎与身体同宽，圆润大头
 * - 身体椭圆，肩颈顺滑过渡
 * - 白围巾（两条线 + 白填充）
 * - 双脚为小三角，贴底边
 */
type Props = {
  size?: number;
  className?: string;
};

export function Penguin({ size = 40, className = "" }: Props) {
  const stroke = "rgba(255,255,255,0.92)";
  return (
    <svg
      width={size}
      height={size * 1.15}
      viewBox="0 0 80 92"
      className={className}
      fill="none"
      stroke={stroke}
      strokeWidth={1.4}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden
    >
      {/* 整体轮廓：大头 + 顺滑肩颈 + 椭圆身体（背影） */}
      <path
        d="M 40 4
           C 22 4, 14 16, 14 28
           C 14 34, 16 38, 18 41
           C 14 46, 12 54, 12 64
           C 12 78, 22 86, 40 86
           C 58 86, 68 78, 68 64
           C 68 54, 66 46, 62 41
           C 64 38, 66 34, 66 28
           C 66 16, 58 4, 40 4 Z"
      />

      {/* 围巾：两条线 + 白色填充（在颈部位置） */}
      <path
        d="M 18 40 Q 40 47, 62 40 L 62 46 Q 40 53, 18 46 Z"
        fill="rgba(255,255,255,0.95)"
        stroke={stroke}
        strokeWidth={1.2}
      />

      {/* 翅膀 */}
      <path d="M 14 56 C 9 64, 11 76, 20 82" />
      <path d="M 66 56 C 71 64, 69 76, 60 82" />

      {/* 双脚 — 小三角，紧贴底边 y=91 */}
      <path d="M 30 84 L 26 91 L 38 91 Z" />
      <path d="M 50 84 L 54 91 L 42 91 Z" />
    </svg>
  );
}
