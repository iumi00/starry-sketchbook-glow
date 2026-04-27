import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
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
  const [showIntro, setShowIntro] = useState(true);
  return (
    <>
      {showIntro && <IntroAnimation onDone={() => setShowIntro(false)} />}
      <MainScene />
    </>
  );
}
