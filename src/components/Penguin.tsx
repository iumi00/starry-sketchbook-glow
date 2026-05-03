/**
 * QQ 企鹅风格 · 简笔线条版（背影）
 * - 大圆头 + 顺滑肩颈 + 椭圆身体
 * - 白围巾（两条线 + 白填充）
 * - 翅膀：身体两侧的水滴形闭合轮廓（可见）
 * - 脚：两个水平椭圆脚掌，贴在底边
 */
type Props = {
  size?: number;
  className?: string;
};

export function Penguin({ size = 38, className = "" }: Props) {
  const stroke = "rgba(255,255,255,0.92)";
  return (
    <svg
      width={size}
      height={size * 1.18}
      viewBox="0 0 80 94"
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
           C 12 76, 22 84, 40 84
           C 58 84, 68 76, 68 64
           C 68 54, 66 46, 62 41
           C 64 38, 66 34, 66 28
           C 66 16, 58 4, 40 4 Z"
      />

      {/* 围巾：两条线 + 白色填充 */}
      <path
        d="M 18 40 Q 40 47, 62 40 L 62 46 Q 40 53, 18 46 Z"
        fill="rgba(255,255,255,0.95)"
        stroke={stroke}
        strokeWidth={1.2}
      />

      {/* 左翅膀：水滴形闭合轮廓 */}
      <path
        d="M 16 50
           C 8 58, 8 74, 18 80
           C 22 78, 22 64, 20 52 Z"
      />
      {/* 右翅膀：水滴形闭合轮廓 */}
      <path
        d="M 64 50
           C 72 58, 72 74, 62 80
           C 58 78, 58 64, 60 52 Z"
      />

      {/* 双脚：两个水平小椭圆脚掌，贴底边 y=92 */}
      <ellipse cx="32" cy="89" rx="7" ry="3" />
      <ellipse cx="48" cy="89" rx="7" ry="3" />
    </svg>
  );
}
