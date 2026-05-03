import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { IntroAnimation } from "@/components/IntroAnimation";
import { MainScene } from "@/components/MainScene";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "同频未署名 · Sync Unsigned" },
      { name: "description", content: "有些共鸣，不需要名字。一片随身携带的极夜星空。" },
    ],
  }),
  component: Index,
});

function Index() {
  // 仅在客户端挂载后再渲染 Intro，避免 SSR/CSR 结构不一致导致的黑屏
  const [mounted, setMounted] = useState(false);
  const [showIntro, setShowIntro] = useState(true);

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <>
      <MainScene />
      {mounted && showIntro && (
        <IntroAnimation onDone={() => setShowIntro(false)} />
      )}
    </>
  );
}
