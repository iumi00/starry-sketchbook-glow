import { useMemo } from "react";

/**
 * 闪烁的方块/圆点星空背景
 * 一闪一闪的手绘风方块/圆点星星
 */
type Props = {
  count?: number;
  className?: string;
};

export function Starfield({ count = 80, className = "" }: Props) {
  const stars = useMemo(() => {
    return Array.from({ length: count }, (_, i) => {
      const isSquare = Math.random() > 0.55;
      const size = Math.random() * 2 + 1; // 1-3px
      return {
        i,
        isSquare,
        size,
        top: Math.random() * 100,
        left: Math.random() * 100,
        delay: Math.random() * 6,
        duration: 2.5 + Math.random() * 4,
        opacity: 0.3 + Math.random() * 0.7,
      };
    });
  }, [count]);

  return (
    <div
      className={`pointer-events-none absolute inset-0 overflow-hidden ${className}`}
      aria-hidden
    >
      {stars.map((s) => (
        <span
          key={s.i}
          style={{
            position: "absolute",
            top: `${s.top}%`,
            left: `${s.left}%`,
            width: `${s.size}px`,
            height: `${s.size}px`,
            background: "var(--color-star)",
            borderRadius: s.isSquare ? "0px" : "50%",
            opacity: s.opacity,
            animation: `twinkle ${s.duration}s ease-in-out ${s.delay}s infinite`,
            boxShadow: s.size > 2 ? "0 0 4px rgba(255,255,255,0.6)" : undefined,
          }}
        />
      ))}
    </div>
  );
}
