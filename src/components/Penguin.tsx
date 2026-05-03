/**
 * QQ 企鹅风格背影剪影（白色描边版）
 * - 圆头 + 椭圆身体，两侧短翅膀，下方两只小脚
 * - 背影：不画五官
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
      height={size * 1.25}
      viewBox="0 0 80 100"
      className={className}
      style={{
        filter: glow
          ? "drop-shadow(0 0 14px rgba(255,255,255,0.65)) drop-shadow(0 0 3px rgba(255,255,255,0.9))"
          : "drop-shadow(0 0 4px rgba(255,255,255,0.25))",
      }}
      aria-hidden
    >
      {/* 脚 — 贴地 */}
      <ellipse cx="30" cy="96" rx="9" ry="3.2" fill="white" opacity="0.95" />
      <ellipse cx="50" cy="96" rx="9" ry="3.2" fill="white" opacity="0.95" />

      {/* 身体 — QQ 企鹅经典水滴/葫芦形 */}
      <path
        d="M 40 14
           C 22 14, 14 30, 14 50
           C 14 68, 22 92, 40 92
           C 58 92, 66 68, 66 50
           C 66 30, 58 14, 40 14 Z"
        fill="white"
        opacity="0.97"
      />

      {/* 头部分界（背影：头略小于身体，用一条浅弧线提示） */}
      <path
        d="M 20 38 Q 40 30, 60 38"
        stroke="rgba(0,0,0,0.18)"
        strokeWidth="0.8"
        fill="none"
      />

      {/* 头顶高光（铅笔感） */}
      <path
        d="M 28 22 Q 40 16, 52 22"
        stroke="rgba(0,0,0,0.18)"
        strokeWidth="0.6"
        fill="none"
      />

      {/* 左翅膀 */}
      <path
        d="M 16 44
           C 8 50, 8 66, 16 74
           C 18 70, 18 56, 18 50 Z"
        fill="white"
        opacity="0.95"
        stroke="rgba(0,0,0,0.18)"
        strokeWidth="0.5"
      />
      {/* 右翅膀 */}
      <path
        d="M 64 44
           C 72 50, 72 66, 64 74
           C 62 70, 62 56, 62 50 Z"
        fill="white"
        opacity="0.95"
        stroke="rgba(0,0,0,0.18)"
        strokeWidth="0.5"
      />

      {/* 身体两侧轮廓阴影 */}
      <path
        d="M 18 50 C 18 66, 22 86, 32 90"
        stroke="rgba(0,0,0,0.12)"
        strokeWidth="0.5"
        fill="none"
      />
      <path
        d="M 62 50 C 62 66, 58 86, 48 90"
        stroke="rgba(0,0,0,0.12)"
        strokeWidth="0.5"
        fill="none"
      />
    </svg>
  );
}
