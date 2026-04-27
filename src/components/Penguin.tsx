/**
 * 极简白色企鹅背影剪影
 * 不画五官，站在地球弧线（南极冰原边缘）上仰望星空
 */
type Props = {
  size?: number;
  glow?: boolean;
  className?: string;
};

export function Penguin({ size = 64, glow = false, className = "" }: Props) {
  return (
    <svg
      width={size}
      height={size * 1.35}
      viewBox="0 0 64 86"
      className={className}
      style={{
        filter: glow
          ? "drop-shadow(0 0 16px rgba(255,255,255,0.7)) drop-shadow(0 0 4px rgba(255,255,255,0.9))"
          : "drop-shadow(0 0 4px rgba(255,255,255,0.25))",
      }}
      aria-hidden
    >
      {/* 身体（背影：椭圆 + 尖头） */}
      <path
        d="M 32 6
           C 22 6, 16 16, 16 28
           C 16 38, 14 50, 16 60
           C 17 70, 22 78, 32 78
           C 42 78, 47 70, 48 60
           C 50 50, 48 38, 48 28
           C 48 16, 42 6, 32 6 Z"
        fill="white"
        opacity="0.96"
      />
      {/* 一点点头顶高光（铅笔绘出的暗部） */}
      <path
        d="M 22 18 Q 32 10, 42 18"
        stroke="rgba(0,0,0,0.15)"
        strokeWidth="0.6"
        fill="none"
      />
      {/* 翅膀轮廓（手绘细线） */}
      <path
        d="M 18 32 C 14 42, 14 56, 18 64"
        stroke="rgba(0,0,0,0.2)"
        strokeWidth="0.6"
        fill="none"
      />
      <path
        d="M 46 32 C 50 42, 50 56, 46 64"
        stroke="rgba(0,0,0,0.2)"
        strokeWidth="0.6"
        fill="none"
      />
      {/* 脚 */}
      <ellipse cx="26" cy="80" rx="5" ry="2" fill="white" opacity="0.85" />
      <ellipse cx="38" cy="80" rx="5" ry="2" fill="white" opacity="0.85" />
    </svg>
  );
}
