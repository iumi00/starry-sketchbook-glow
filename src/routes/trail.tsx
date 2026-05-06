import { createFileRoute } from "@tanstack/react-router";
import { Starfield } from "@/components/Starfield";
import { PolarHUD } from "@/components/PolarHUD";
import { Link } from "@tanstack/react-router";
import { useState } from "react";
import { getDynamicStarMemories } from "@/data/starMemories";

export const Route = createFileRoute("/trail")({
  head: () => ({ meta: [{ title: "星轨 · 同频未署名" }] }),
  component: Trail,
});

function Trail() {
  // 获取动态星轨数据
  const starMemories = getDynamicStarMemories();
  
  // 获取动态留言数量（气泡数）
  const getDynamicCommentCount = (memoryId: number) => {
    if (typeof window === 'undefined' || typeof localStorage === 'undefined') {
      return 0;
    }
    
    const trailComments = localStorage.getItem('trailComments');
    if (trailComments) {
      try {
        const commentsData = JSON.parse(trailComments);
        const comments = commentsData[memoryId] || [];
        
        // 检查是否为特殊留言（期末成绩相关）
        const isSpecialMessage = comments.some((comment: any) => 
          comment.text.includes("期末成绩出了") || 
          comment.text.includes("复习了整整一个月")
        );
        
        if (isSpecialMessage) {
          return 18; // 特殊内容固定18个气泡
        } else if (comments.length > 0) {
          return 1; // 其他新记录固定1个气泡
        } else {
          return 0; // 没有留言
        }
      } catch (error) {
        console.error('解析星轨留言数据失败:', error);
        return 0;
      }
    }
    return 0;
  };

  // 获取爱心数
  const getDynamicLikeCount = (memoryId: number) => {
    if (typeof window === 'undefined' || typeof localStorage === 'undefined') {
      return 0;
    }
    
    const trailComments = localStorage.getItem('trailComments');
    if (trailComments) {
      try {
        const commentsData = JSON.parse(trailComments);
        const comments = commentsData[memoryId] || [];
        
        // 检查是否为特殊留言（期末成绩相关）
        const isSpecialMessage = comments.some((comment: any) => 
          comment.text.includes("期末成绩出了") || 
          comment.text.includes("复习了整整一个月")
        );
        
        if (isSpecialMessage) {
          return 32; // 特殊内容固定32个爱心
        } else if (comments.length > 0) {
          return Math.floor(Math.random() * 11); // 其他内容0-10随机
        } else {
          return 0; // 没有留言
        }
      } catch (error) {
        console.error('解析星轨留言数据失败:', error);
        return 0;
      }
    }
    return 0;
  };
  
  return (
    <div className="relative flex flex-col min-h-screen w-full bg-background grain overflow-y-auto">
      <Starfield count={70} />
      <PolarHUD />

      {/* 顶部返回箭头 */}
      <div className="absolute top-[60px] left-4 z-30">
        <Link
          to="/"
          className="text-lg leading-none text-foreground/80 hover:text-foreground transition-colors"
          aria-label="返回主场景"
        >
          ←
        </Link>
      </div>

      {/* 标题 */}
      <header className="relative z-10 mt-24 text-center px-5">
        <h1 className="text-2xl tracking-[0.4em] text-foreground/95 font-display">
          【星轨】
        </h1>
        <p className="mt-3 text-[11px] tracking-[0.3em] text-muted-foreground font-cn">
          你的星轨，每颗星都是一段记忆
        </p>
      </header>

      {/* 星轨时间轴 */}
      <div className="relative flex-1 mt-4 px-20">
        {/* 星轨主轴和星星节点 */}
        <div className="absolute left-20 top-2 bottom-0 w-px">
          <div className="h-full w-full bg-gradient-to-b from-white/50 via-white/20 to-transparent relative">
            {/* 发光效果 */}
            <div className="absolute inset-0 w-px bg-white/30 blur-sm"></div>
            <div className="absolute inset-0 w-px bg-white/20 blur-md"></div>
            
            {/* 星星节点 - 直接在线上 */}
            {starMemories.map((memory: any, index: number) => {
              // 计算前面所有卡片的高度总和
              let accumulatedHeight = 0;
              for (let i = 0; i < index; i++) {
                // 所有卡片都限制为两行，固定高度100px
                accumulatedHeight += 100 + 40; // 固定卡片高度100px + 40px间距
              }
              return (
              <div key={memory.id} className="absolute left-1/2 -translate-x-1/2" 
                   style={{ top: `${accumulatedHeight + 32}px` }}>
                {/* 星星核心 */}
                <div className="relative w-3 h-3">
                  <div className="absolute inset-0 bg-white rounded-full"></div>
                  {/* 星星发光效果 */}
                  <div className="absolute inset-0 bg-white rounded-full blur-sm opacity-80"></div>
                  <div className="absolute inset-0 bg-white rounded-full blur-md opacity-60 scale-150"></div>
                  <div className="absolute inset-0 bg-white rounded-full blur-lg opacity-40 scale-200"></div>
                  {/* 星星脉冲动画 */}
                  <div className="absolute inset-0 bg-white rounded-full animate-ping opacity-20"></div>
                </div>
                {/* 日期 - 紧贴星星 */}
                <div className="absolute left-4 top-1/2 -translate-y-1/2 text-white/60 text-xs tracking-[0.2em] font-cn whitespace-nowrap flex items-center space-x-4">
                  {memory.date}
                  <div className="flex items-center space-x-2 ml-4">
                    <span className="text-white/80">
                      ❤{memory.likes === 0 ? getDynamicLikeCount(memory.id) : 
                        memory.id === 19 ? 58 : memory.id === 14 ? 37 : memory.id === 13 ? 45 : memory.id === 12 ? 51 : memory.id === 11 ? 39 : memory.id === 10 ?46 : memory.id === 9 ? 44 : memory.id === 15 ? 48 : memory.id === 8 ? 43 : memory.id === 7 ? 52 : memory.id === 6 ? 38 : memory.id === 5 ? 47 : memory.id === 16 ? 49 : memory.id === 4 ? 41 : memory.id === 17 ? 50 : memory.id === 3 ? 36 : memory.id === 2 ? 53 : memory.id === 18 ? 40 : memory.id === 1 ? 54 : 42}
                    </span>
                    <span className="text-white/80">
                      💬{memory.likes === 0 ? getDynamicCommentCount(memory.id) : 
                        (memory.id === 19 || memory.id === 14 ? 5 : memory.id === 13 ? 3 : memory.id === 12 ? 5 : memory.id === 11 ? 4 : memory.id === 10 ? 3 : memory.id === 9 ? 3 : memory.id === 15 ? 5 : memory.id === 8 ? 4 : memory.id === 7 ? 6 : memory.id === 6 ? 2 : memory.id === 5 ? 4 : memory.id === 16 ? 6 : memory.id === 4 ? 3 : memory.id === 17 ? 5 : memory.id === 3 ? 3 : memory.id === 2 ? 4 : memory.id === 18 ? 3 : memory.id === 1 ? 3 : 7)}
                    </span>
                  </div>
                </div>
                {/* 卡片内容 - 在日期下面，左侧对齐日期 */}
                <div className="absolute left-4 top-8 w-80">
                  <Link
                    to="/trail-detail"
                    search={{ id: memory.id.toString() }}
                    className="block bg-white/5 backdrop-blur-md border border-white/10 rounded-lg p-4 shadow-lg shadow-black/20 cursor-pointer hover:bg-white/10 transition-colors"
                  >
                    <p className="text-white/80 font-cn leading-relaxed text-sm">
                      {memory.content.length > 37 ? memory.content.substring(0, 37) + '...' : memory.content}
                    </p>
                  </Link>
                </div>
              </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
