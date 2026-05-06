import { createFileRoute } from "@tanstack/react-router";
import { Starfield } from "@/components/Starfield";
import { PolarHUD } from "@/components/PolarHUD";
import { Link } from "@tanstack/react-router";
import { useNavigate } from "@tanstack/react-router";
import { getDynamicStarMemories } from "@/data/starMemories";

export const Route = createFileRoute("/trail-detail")({
  head: () => ({ meta: [{ title: "星轨详情 · 同频未署名" }] }),
  component: TrailDetail,
  validateSearch: (search: Record<string, unknown>) => ({
    id: typeof search.id === 'string' ? search.id : '1',
  }),
});

function TrailDetail() {
  const navigate = useNavigate();
  const search = Route.useSearch();
  
  // 从路由参数获取记忆ID
  const memoryId = parseInt(search.id || '1');
  const starMemories = getDynamicStarMemories();
  const memory = starMemories.find((m: any) => m.id === memoryId);

  // 获取动态留言数据
  const getDynamicComments = () => {
    // 检查是否在浏览器环境
    if (typeof window === 'undefined' || typeof localStorage === 'undefined') {
      return [];
    }
    
    const trailComments = localStorage.getItem('trailComments');
    console.log("星轨详情页面 - trailComments原始数据:", trailComments);
    if (trailComments) {
      try {
        const commentsData = JSON.parse(trailComments);
        console.log("星轨详情页面 - 解析后的commentsData:", commentsData);
        console.log("星轨详情页面 - 当前memoryId:", memoryId);
        const comments = commentsData[memoryId] || [];
        console.log("星轨详情页面 - 获取到的留言:", comments);
        return comments;
      } catch (error) {
        console.error('解析星轨留言数据失败:', error);
        return [];
      }
    }
    return [];
  };

  const dynamicComments = getDynamicComments();
  console.log("星轨详情页面 - 最终dynamicComments:", dynamicComments);

  return (
    <>
      <Starfield count={70} />
      <PolarHUD />

      {/* 顶部返回箭头 */}
      <div className="absolute top-[60px] left-4 z-30">
        <Link
          to="/trail"
          className="text-lg leading-none text-foreground/80 hover:text-foreground transition-colors"
          aria-label="返回星轨"
        >
          ←
        </Link>
      </div>

      {/* 标题 */}
      <header className="absolute top-[100px] left-0 right-0 text-center px-5 z-20">
        <h1 className="text-2xl tracking-[0.4em] text-foreground/95 font-display">
          【星轨】
        </h1>
        <p className="mt-3 text-[11px] tracking-[0.3em] text-muted-foreground font-cn">
          你的星轨，每颗星都是一段记忆
        </p>
        
        {/* 星星 */}
        <div className="mt-8 flex justify-center">
          <div className="relative w-3 h-3">
            {/* 星星核心 */}
            <div className="absolute inset-0 bg-white rounded-full"></div>
            {/* 发光效果 */}
            <div className="absolute inset-0 bg-white rounded-full blur-sm opacity-80"></div>
            <div className="absolute inset-0 bg-white rounded-full blur-md opacity-60 scale-150"></div>
            <div className="absolute inset-0 bg-white rounded-full blur-lg opacity-40 scale-200"></div>
            {/* 光晕效果 */}
            <div className="absolute inset-0 bg-white rounded-full blur-xl opacity-30 scale-250"></div>
            {/* 很小幅度的呼吸效果 */}
            <div className="absolute inset-0 bg-white rounded-full animate-pulse opacity-20"></div>
            {/* 缓慢缩放动画 */}
            <div className="absolute inset-0 bg-white rounded-full" 
                 style={{ animation: 'gentle-breathe 8s ease-in-out infinite' }}></div>
          </div>
        </div>
      </header>

      {/* 详情内容 */}
      <main className="relative z-10 pt-56 pb-20 min-h-screen">
        {memory ? (
          <div className="w-full max-w-screen-2xl mx-auto px-8">
            {/* 日期和图标 */}
            <div className="mb-6 text-center">
              <div className="text-white/60 text-xs tracking-[0.2em] font-cn whitespace-nowrap flex items-center justify-center gap-4">
                <span>{memory.date}</span>
                <div className="flex items-center gap-2">
                  <span className="text-white/80">
                    ❤{memory.likes === 0 ? (() => {
                      // 检查是否为特殊留言（期末成绩相关）
                      const isSpecialMessage = dynamicComments.some((comment: any) => 
                        comment.text.includes("期末成绩出了") || 
                        comment.text.includes("复习了整整一个月")
                      );
                      
                      if (isSpecialMessage) {
                        return 32; // 特殊内容固定32个爱心
                      } else if (dynamicComments.length > 0) {
                        return Math.floor(Math.random() * 11); // 其他内容0-10随机
                      } else {
                        return 0; // 没有留言
                      }
                    })() : 
                      memory.id === 19 ? 58 : memory.id === 14 ? 37 : memory.id === 13 ? 45 : memory.id === 12 ? 51 : memory.id === 11 ? 39 : memory.id === 10 ? 46 : memory.id === 9 ? 44 : memory.id === 15 ? 48 : memory.id === 8 ? 43 : memory.id === 7 ? 52 : memory.id === 6 ? 38 : memory.id === 5 ? 47 : memory.id === 16 ? 49 : memory.id === 4 ? 41 : memory.id === 17 ? 50 : memory.id === 3 ? 36 : memory.id === 2 ? 53 : memory.id === 18 ? 40 : memory.id === 1 ? 54 : 42}
                  </span>
                  <span className="text-white/80">
                    💬{memory.likes === 0 ? dynamicComments.length : 
                      (memory.id === 19 || memory.id === 14 ? 5 : memory.id === 13 ? 3 : memory.id === 12 ? 5 : memory.id === 11 ? 4 : memory.id === 10 ? 3 : memory.id === 9 ? 3 : memory.id === 15 ? 5 : memory.id === 8 ? 4 : memory.id === 7 ? 6 : memory.id === 6 ? 2 : memory.id === 5 ? 4 : memory.id === 16 ? 6 : memory.id === 4 ? 3 : memory.id === 17 ? 5 : memory.id === 3 ? 3 : memory.id === 2 ? 4 : memory.id === 18 ? 3 : memory.id === 1 ? 3 : 7)}
                  </span>
                </div>
              </div>
            </div>

            {/* 内容卡片 */}
            <div className="w-full bg-white/5 backdrop-blur-md border border-white/10 rounded-lg p-6 shadow-lg shadow-black-20">
              <div className="text-white/80 font-cn leading-relaxed text-base whitespace-pre-wrap mb-6 max-h-96 overflow-y-auto pr-4 scrollbar-thin scrollbar-thumb-white/20 scrollbar-track-transparent">
                {memory.content}
              </div>
              
              {/* 标签 */}
              <div className="flex justify-center gap-2 pt-4 border-t border-white/10">
                {memory.likes === 0 && memory.tags ? (
                  // 用户记录：显示发送时携带的标签
                  memory.tags.length > 0 ? (
                    memory.tags.map((tag: string, index: number) => (
                      <span key={index} className="px-3 py-1 bg-white/10 backdrop-blur-sm border border-white/20 rounded-full text-white/60 text-xs font-cn">
                        {tag.startsWith('#') ? tag : `#${tag}`}
                      </span>
                    ))
                  ) : (
                    <span className="px-3 py-1 bg-white/10 backdrop-blur-sm border border-white/20 rounded-full text-white/60 text-xs font-cn">
                      #未分类
                    </span>
                  )
                ) : memory.id === 19 ? (
                  <>
                    <span className="px-3 py-1 bg-white/10 backdrop-blur-sm border border-white/20 rounded-full text-white/60 text-xs font-cn">
                      #自我和解
                    </span>
                    <span className="px-3 py-1 bg-white/10 backdrop-blur-sm border border-white/20 rounded-full text-white/60 text-xs font-cn">
                      #理智化
                    </span>
                    <span className="px-3 py-1 bg-white/10 backdrop-blur-sm border border-white/20 rounded-full text-white/60 text-xs font-cn">
                      #强大感
                    </span>
                  </>
                ) : memory.id === 14 ? (
                  <>
                    <span className="px-3 py-1 bg-white/10 backdrop-blur-sm border border-white/20 rounded-full text-white/60 text-xs font-cn">
                      #小确幸
                    </span>
                    <span className="px-3 py-1 bg-white/10 backdrop-blur-sm border border-white/20 rounded-full text-white/60 text-xs font-cn">
                      #碎碎平安
                    </span>
                    <span className="px-3 py-1 bg-white/10 backdrop-blur-sm border border-white/20 rounded-full text-white/60 text-xs font-cn">
                      #温暖祝愿
                    </span>
                  </>
                ) : memory.id === 13 ? (
                  <>
                    <span className="px-3 py-1 bg-white/10 backdrop-blur-sm border border-white/20 rounded-full text-white/60 text-xs font-cn">
                      #分手
                    </span>
                    <span className="px-3 py-1 bg-white/10 backdrop-blur-sm border border-white/20 rounded-full text-white/60 text-xs font-cn">
                      #释然
                    </span>
                    <span className="px-3 py-1 bg-white/10 backdrop-blur-sm border border-white/20 rounded-full text-white/60 text-xs font-cn">
                      #年轻搞钱
                    </span>
                  </>
                ) : memory.id === 12 ? (
                  <>
                    <span className="px-3 py-1 bg-white/10 backdrop-blur-sm border border-white/20 rounded-full text-white/60 text-xs font-cn">
                      #怀旧
                    </span>
                    <span className="px-3 py-1 bg-white/10 backdrop-blur-sm border border-white/20 rounded-full text-white/60 text-xs font-cn">
                      #脆弱渴望
                    </span>
                    <span className="px-3 py-1 bg-white/10 backdrop-blur-sm border border-white/20 rounded-full text-white/60 text-xs font-cn">
                      #自我拥抱
                    </span>
                  </>
                ) : memory.id === 11 ? (
                  <>
                    <span className="px-3 py-1 bg-white/10 backdrop-blur-sm border border-white/20 rounded-full text-white/60 text-xs font-cn">
                      #疲惫
                    </span>
                    <span className="px-3 py-1 bg-white/10 backdrop-blur-sm border border-white/20 rounded-full text-white/60 text-xs font-cn">
                      #摸鱼式休息
                    </span>
                    <span className="px-3 py-1 bg-white/10 backdrop-blur-sm border border-white/20 rounded-full text-white/60 text-xs font-cn">
                      #日常
                    </span>
                  </>
                ) : memory.id === 10 ? (
                  <>
                    <span className="px-3 py-1 bg-white/10 backdrop-blur-sm border border-white/20 rounded-full text-white/60 text-xs font-cn">
                      #自然治愈
                    </span>
                    <span className="px-3 py-1 bg-white/10 backdrop-blur-sm border border-white/20 rounded-full text-white/60 text-xs font-cn">
                      #阳光
                    </span>
                    <span className="px-3 py-1 bg-white/10 backdrop-blur-sm border border-white/20 rounded-full text-white/60 text-xs font-cn">
                      #自我调侃
                    </span>
                  </>
                ) : memory.id === 9 ? (
                  <>
                    <span className="px-3 py-1 bg-white/10 backdrop-blur-sm border border-white/20 rounded-full text-white/60 text-xs font-cn">
                      #目标感
                    </span>
                    <span className="px-3 py-1 bg-white/10 backdrop-blur-sm border border-white/20 rounded-full text-white/60 text-xs font-cn">
                      #信念
                    </span>
                    <span className="px-3 py-1 bg-white/10 backdrop-blur-sm border border-white/20 rounded-full text-white/60 text-xs font-cn">
                      #积极
                    </span>
                  </>
                ) : memory.id === 15 ? (
                  <>
                    <span className="px-3 py-1 bg-white/10 backdrop-blur-sm border border-white/20 rounded-full text-white/60 text-xs font-cn">
                      #大一回顾
                    </span>
                    <span className="px-3 py-1 bg-white/10 backdrop-blur-sm border border-white/20 rounded-full text-white/60 text-xs font-cn">
                      #自嘲式成长
                    </span>
                    <span className="px-3 py-1 bg-white/10 backdrop-blur-sm border border-white/20 rounded-full text-white/60 text-xs font-cn">
                      #假努力
                    </span>
                  </>
                ) : memory.id === 8 ? (
                  <>
                    <span className="px-3 py-1 bg-white/10 backdrop-blur-sm border border-white/20 rounded-full text-white/60 text-xs font-cn">
                      #野心
                    </span>
                    <span className="px-3 py-1 bg-white/10 backdrop-blur-sm border border-white/20 rounded-full text-white/60 text-xs font-cn">
                      #向往
                    </span>
                    <span className="px-3 py-1 bg-white/10 backdrop-blur-sm border border-white/20 rounded-full text-white/60 text-xs font-cn">
                      #前进
                    </span>
                  </>
                ) : memory.id === 7 ? (
                  <>
                    <span className="px-3 py-1 bg-white/10 backdrop-blur-sm border border-white/20 rounded-full text-white/60 text-xs font-cn">
                      #旅行
                    </span>
                    <span className="px-3 py-1 bg-white/10 backdrop-blur-sm border border-white/20 rounded-full text-white/60 text-xs font-cn">
                      #勇气
                    </span>
                    <span className="px-3 py-1 bg-white/10 backdrop-blur-sm border border-white/20 rounded-full text-white/60 text-xs font-cn">
                      #累并快乐
                    </span>
                  </>
                ) : memory.id === 6 ? (
                  <>
                    <span className="px-3 py-1 bg-white/10 backdrop-blur-sm border border-white/20 rounded-full text-white/60 text-xs font-cn">
                      #厌学
                    </span>
                    <span className="px-3 py-1 bg-white/10 backdrop-blur-sm border border-white/20 rounded-full text-white/60 text-xs font-cn">
                      #期末崩溃
                    </span>
                    <span className="px-3 py-1 bg-white/10 backdrop-blur-sm border border-white/20 rounded-full text-white/60 text-xs font-cn">
                      #想放假
                    </span>
                  </>
                ) : memory.id === 5 ? (
                  <>
                    <span className="px-3 py-1 bg-white/10 backdrop-blur-sm border border-white/20 rounded-full text-white/60 text-xs font-cn">
                      #孤独感
                    </span>
                    <span className="px-3 py-1 bg-white/10 backdrop-blur-sm border border-white/20 rounded-full text-white/60 text-xs font-cn">
                      #怀念过去
                    </span>
                    <span className="px-3 py-1 bg-white/10 backdrop-blur-sm border border-white/20 rounded-full text-white/60 text-xs font-cn">
                      #勇敢向前
                    </span>
                  </>
                ) : memory.id === 16 ? (
                  <>
                    <span className="px-3 py-1 bg-white/10 backdrop-blur-sm border border-white/20 rounded-full text-white/60 text-xs font-cn">
                      #平静下的暗涌
                    </span>
                    <span className="px-3 py-1 bg-white/10 backdrop-blur-sm border border-white/20 rounded-full text-white/60 text-xs font-cn">
                      #记录
                    </span>
                    <span className="px-3 py-1 bg-white/10 backdrop-blur-sm border border-white/20 rounded-full text-white/60 text-xs font-cn">
                      #痛苦对峙
                    </span>
                  </>
                ) : memory.id === 4 ? (
                  <>
                    <span className="px-3 py-1 bg-white/10 backdrop-blur-sm border border-white/20 rounded-full text-white/60 text-xs font-cn">
                      #特殊儿童
                    </span>
                    <span className="px-3 py-1 bg-white/10 backdrop-blur-sm border border-white/20 rounded-full text-white/60 text-xs font-cn">
                      #同理心
                    </span>
                    <span className="px-3 py-1 bg-white/10 backdrop-blur-sm border border-white/20 rounded-full text-white/60 text-xs font-cn">
                      #生命感悟
                    </span>
                  </>
                ) : memory.id === 17 ? (
                  <>
                    <span className="px-3 py-1 bg-white/10 backdrop-blur-sm border border-white/20 rounded-full text-white/60 text-xs font-cn">
                      #成熟
                    </span>
                    <span className="px-3 py-1 bg-white/10 backdrop-blur-sm border border-white/20 rounded-full text-white/60 text-xs font-cn">
                      #释然
                    </span>
                    <span className="px-3 py-1 bg-white/10 backdrop-blur-sm border border-white/20 rounded-full text-white/60 text-xs font-cn">
                      #自嘲
                    </span>
                  </>
                ) : memory.id === 3 ? (
                  <>
                    <span className="px-3 py-1 bg-white/10 backdrop-blur-sm border border-white/20 rounded-full text-white/60 text-xs font-cn">
                      #迷茫
                    </span>
                    <span className="px-3 py-1 bg-white/10 backdrop-blur-sm border border-white/20 rounded-full text-white/60 text-xs font-cn">
                      #感恩
                    </span>
                    <span className="px-3 py-1 bg-white/10 backdrop-blur-sm border border-white/20 rounded-full text-white/60 text-xs font-cn">
                      #温暖
                    </span>
                  </>
                ) : memory.id === 2 ? (
                  <>
                    <span className="px-3 py-1 bg-white/10 backdrop-blur-sm border border-white/20 rounded-full text-white/60 text-xs font-cn">
                      #军训
                    </span>
                    <span className="px-3 py-1 bg-white/10 backdrop-blur-sm border border-white/20 rounded-full text-white/60 text-xs font-cn">
                      #时间感知
                    </span>
                    <span className="px-3 py-1 bg-white/10 backdrop-blur-sm border border-white/20 rounded-full text-white/60 text-xs font-cn">
                      #初入大学
                    </span>
                  </>
                ) : memory.id === 18 ? (
                  <>
                    <span className="px-3 py-1 bg-white/10 backdrop-blur-sm border border-white/20 rounded-full text-white/60 text-xs font-cn">
                      #日常疲惫
                    </span>
                    <span className="px-3 py-1 bg-white/10 backdrop-blur-sm border border-white/20 rounded-full text-white/60 text-xs font-cn">
                      #抱怨
                    </span>
                    <span className="px-3 py-1 bg-white/10 backdrop-blur-sm border border-white/20 rounded-full text-white/60 text-xs font-cn">
                      #忍耐
                    </span>
                  </>
                ) : memory.id === 1 ? (
                  <>
                    <span className="px-3 py-1 bg-white/10 backdrop-blur-sm border border-white/20 rounded-full text-white/60 text-xs font-cn">
                      #自省
                    </span>
                    <span className="px-3 py-1 bg-white/10 backdrop-blur-sm border border-white/20 rounded-full text-white/60 text-xs font-cn">
                      #谦逊
                    </span>
                    <span className="px-3 py-1 bg-white/10 backdrop-blur-sm border border-white/20 rounded-full text-white/60 text-xs font-cn">
                      #敲打自己
                    </span>
                  </>
                ) : (
                  <>
                    <span className="px-3 py-1 bg-white/10 backdrop-blur-sm border border-white/20 rounded-full text-white/60 text-xs font-cn">
                      #自我觉醒
                    </span>
                    <span className="px-3 py-1 bg-white/10 backdrop-blur-sm border border-white/20 rounded-full text-white/60 text-xs font-cn">
                      #矛盾与接纳
                    </span>
                    <span className="px-3 py-1 bg-white/10 backdrop-blur-sm border border-white/20 rounded-full text-white/60 text-xs font-cn">
                      #生命力
                    </span>
                  </>
                )}
              </div>
            </div>

            {/* 留言分割线 */}
            <div className="mt-8 flex items-center gap-4">
              {/* 左边虚线 */}
              <div className="flex-1 h-px bg-gradient-to-r from-transparent via-white/20 to-transparent"></div>
              {/* 留言文字 */}
              <span className="text-white/40 text-xs font-cn tracking-wider">留言</span>
              {/* 右边虚线 */}
              <div className="flex-1 h-px bg-gradient-to-r from-transparent via-white/20 to-transparent"></div>
            </div>

            {/* 留言卡片列表 */}
            <div className="mt-8 space-y-6">
              {memory.likes === 0 && dynamicComments.length > 0 ? (
                // 用户记录：显示动态留言
                <>
                  {dynamicComments.map((comment: any, index: number) => (
                    <div key={index} className="w-full bg-white/5 backdrop-blur-md border border-white/10 rounded-lg p-6 shadow-lg shadow-black-20">
                      <div className="flex justify-between items-start mb-4">
                        <span className="text-white/60 text-xs font-cn">{comment.from}</span>
                        <span className="text-white/60 text-xs font-cn">{new Date(comment.time).toLocaleString('zh-CN', { month: '2-digit', day: '2-digit', hour: '2-digit', minute: '2-digit' })}</span>
                      </div>
                      <div className="text-white/80 font-cn leading-relaxed text-base whitespace-pre-wrap">
                        {comment.text}
                      </div>
                    </div>
                  ))}
                </>
              ) : memory.id === 20 ? (
                <>
                  {/* 2026.04.17 的留言 */}
                  {/* 留言卡片 1 - 最早 */}
                  <div className="w-full bg-white/5 backdrop-blur-md border border-white/10 rounded-lg p-6 shadow-lg shadow-black-20">
                    <div className="flex justify-between items-start mb-4">
                      <span className="text-white/60 text-xs font-cn">碎星#287</span>
                      <span className="text-white/60 text-xs font-cn">2026.04.17 14:23</span>
                    </div>
                    <div className="text-white/80 font-cn leading-relaxed text-base whitespace-pre-wrap">
                      这段话看得我眼睛亮亮的！好喜欢这种"自己就是好运气"的状态，希望我也能早点找到这样的自己。
                    </div>
                  </div>

                  {/* 留言卡片 2 */}
                  <div className="w-full bg-white/5 backdrop-blur-md border border-white/10 rounded-lg p-6 shadow-lg shadow-black-20">
                    <div className="flex justify-between items-start mb-4">
                      <span className="text-white/60 text-xs font-cn">碎星#156</span>
                      <span className="text-white/60 text-xs font-cn">2026.04.17 16:45</span>
                    </div>
                    <div className="text-white/80 font-cn leading-relaxed text-base whitespace-pre-wrap">
                      同为理工女，太懂了。一边画电路图一边偷偷读诗的感觉。你很清醒，也很有力量，继续走就好。
                    </div>
                  </div>

                  {/* 留言卡片 3 */}
                  <div className="w-full bg-white/5 backdrop-blur-md border border-white/10 rounded-lg p-6 shadow-lg shadow-black-20">
                    <div className="flex justify-between items-start mb-4">
                      <span className="text-white/60 text-xs font-cn">碎星#423</span>
                      <span className="text-white/60 text-xs font-cn">2026.04.17 18:12</span>
                    </div>
                    <div className="text-white/80 font-cn leading-relaxed text-base whitespace-pre-wrap">
                      "从小给自己贴理工女标签"戳中了我。现在我也慢慢承认自己其实喜欢写东西。谢谢你说出来，让我不那么孤单。
                    </div>
                  </div>

                  {/* 留言卡片 4 */}
                  <div className="w-full bg-white/5 backdrop-blur-md border border-white/10 rounded-lg p-6 shadow-lg shadow-black-20">
                    <div className="flex justify-between items-start mb-4">
                      <span className="text-white/60 text-xs font-cn">碎星#789</span>
                      <span className="text-white/60 text-xs font-cn">2026.04.17 20:33</span>
                    </div>
                    <div className="text-white/80 font-cn leading-relaxed text-base whitespace-pre-wrap">
                      你的思考本身就很有文学性呀。不是只有会写动人文字的人才配爱文学，感受它、靠近它，你已经在了。
                    </div>
                  </div>

                  {/* 留言卡片 5 */}
                  <div className="w-full bg-white/5 backdrop-blur-md border border-white/10 rounded-lg p-6 shadow-lg shadow-black-20">
                    <div className="flex justify-between items-start mb-4">
                      <span className="text-white/60 text-xs font-cn">碎星#512</span>
                      <span className="text-white/60 text-xs font-cn">2026.04.17 21:48</span>
                    </div>
                    <div className="text-white/80 font-cn leading-relaxed text-base whitespace-pre-wrap">
                      工作以后才明白，像你这样敢想敢做、自己定义自己的人太少了。保持那份"少女骑士病"，职场需要你这样的光。
                    </div>
                  </div>

                  {/* 留言卡片 6 - 最晚 */}
                  <div className="w-full bg-white/5 backdrop-blur-md border border-white/10 rounded-lg p-6 shadow-lg shadow-black-20">
                    <div className="flex justify-between items-start mb-4">
                      <span className="text-white/60 text-xs font-cn">碎星#934</span>
                      <span className="text-white/60 text-xs font-cn">2026.04.17 23:07</span>
                    </div>
                    <div className="text-white/80 font-cn leading-relaxed text-base whitespace-pre-wrap">
                      凌晨三点在图书馆看到这段话，突然不焦虑了。你描述的那种"苏醒感"我也有过，跨过半个地球才发现，最重要是找到自己。加油。
                    </div>
                  </div>

                  {/* 留言卡片 7 - 额外 */}
                  <div className="w-full bg-white/5 backdrop-blur-md border border-white/10 rounded-lg p-6 shadow-lg shadow-black-20">
                    <div className="flex justify-between items-start mb-4">
                      <span className="text-white/60 text-xs font-cn">碎星#678</span>
                      <span className="text-white/60 text-xs font-cn">2026.04.17 22:19</span>
                    </div>
                    <div className="text-white/80 font-cn leading-relaxed text-base whitespace-pre-wrap">
                      "除了实力一切都是浮云"——记下了。你那种肆意的生命力隔着屏幕都感染到我。一起往前冲吧。
                    </div>
                  </div>
                </>
              ) : memory.id === 19 ? (
                <>
                  {/* 2026.03.18 的留言 */}
                  {/* 留言卡片 1 - 最早 */}
                  <div className="w-full bg-white/5 backdrop-blur-md border border-white/10 rounded-lg p-6 shadow-lg shadow-black-20">
                    <div className="flex justify-between items-start mb-4">
                      <span className="text-white/60 text-xs font-cn">碎星#512</span>
                      <span className="text-white/60 text-xs font-cn">2026.03.18 21:35</span>
                    </div>
                    <div className="text-white/80 font-cn leading-relaxed text-base whitespace-pre-wrap">
                      好羡慕这种状态。我现在还在讨厌自己的阶段，希望有一天也能像你一样，包容自己所有的好坏。
                    </div>
                  </div>

                  {/* 留言卡片 2 */}
                  <div className="w-full bg-white/5 backdrop-blur-md border border-white/10 rounded-lg p-6 shadow-lg shadow-black-20">
                    <div className="flex justify-between items-start mb-4">
                      <span className="text-white/60 text-xs font-cn">碎星#234</span>
                      <span className="text-white/60 text-xs font-cn">2026.03.18 21:50</span>
                    </div>
                    <div className="text-white/80 font-cn leading-relaxed text-base whitespace-pre-wrap">
                      你描述的"理智得可怕"让我想到加缪。理智不是冷血，是你已经开始自己定义温度了。
                    </div>
                  </div>

                  {/* 留言卡片 3 */}
                  <div className="w-full bg-white/5 backdrop-blur-md border border-white/10 rounded-lg p-6 shadow-lg shadow-black-20">
                    <div className="flex justify-between items-start mb-4">
                      <span className="text-white/60 text-xs font-cn">碎星#789</span>
                      <span className="text-white/60 text-xs font-cn">2026.03.18 22:15</span>
                    </div>
                    <div className="text-white/80 font-cn leading-relaxed text-base whitespace-pre-wrap">
                      你这种"理智得可怕"我太懂了。不是冷血，是你终于站到了情绪之上。为你高兴。
                    </div>
                  </div>

                  {/* 留言卡片 4 */}
                  <div className="w-full bg-white/5 backdrop-blur-md border border-white/10 rounded-lg p-6 shadow-lg shadow-black-20">
                    <div className="flex justify-between items-start mb-4">
                      <span className="text-white/60 text-xs font-cn">碎星#156</span>
                      <span className="text-white/60 text-xs font-cn">2026.03.18 22:45</span>
                    </div>
                    <div className="text-white/80 font-cn leading-relaxed text-base whitespace-pre-wrap">
                      看到"我喜欢我自己，无论什么样子"眼眶一热。我现在还做不到，但开始想试试了。
                    </div>
                  </div>

                  {/* 留言卡片 5 - 最晚 */}
                  <div className="w-full bg-white/5 backdrop-blur-md border border-white/10 rounded-lg p-6 shadow-lg shadow-black-20">
                    <div className="flex justify-between items-start mb-4">
                      <span className="text-white/60 text-xs font-cn">碎星#423</span>
                      <span className="text-white/60 text-xs font-cn">2026.03.18 23:20</span>
                    </div>
                    <div className="text-white/80 font-cn leading-relaxed text-base whitespace-pre-wrap">
                      工作后见多了人讨厌自己，你这种清醒的自爱，是稀缺品。保持住。
                    </div>
                  </div>
                </>
              ) : memory.id === 14 ? (
                <>
                  {/* 2026.01.11 的留言 */}
                  {/* 留言卡片 1 - 最早 */}
                  <div className="w-full bg-white/5 backdrop-blur-md border border-white/10 rounded-lg p-6 shadow-lg shadow-black-20">
                    <div className="flex justify-between items-start mb-4">
                      <span className="text-white/60 text-xs font-cn">碎星#234</span>
                      <span className="text-white/60 text-xs font-cn">2026.01.11 01:15</span>
                    </div>
                    <div className="text-white/80 font-cn leading-relaxed text-base whitespace-pre-wrap">
                      碎碎平安，心态满分。希望你每天都有星星和小蛋糕。
                    </div>
                  </div>

                  {/* 留言卡片 2 */}
                  <div className="w-full bg-white/5 backdrop-blur-md border border-white/10 rounded-lg p-6 shadow-lg shadow-black-20">
                    <div className="flex justify-between items-start mb-4">
                      <span className="text-white/60 text-xs font-cn">碎星#567</span>
                      <span className="text-white/60 text-xs font-cn">2026.01.11 01:30</span>
                    </div>
                    <div className="text-white/80 font-cn leading-relaxed text-base whitespace-pre-wrap">
                      你最后那句"希望朋友们不要内耗"好暖。你也一样，别内耗。
                    </div>
                  </div>

                  {/* 留言卡片 3 */}
                  <div className="w-full bg-white/5 backdrop-blur-md border border-white/10 rounded-lg p-6 shadow-lg shadow-black-20">
                    <div className="flex justify-between items-start mb-4">
                      <span className="text-white/60 text-xs font-cn">碎星#891</span>
                      <span className="text-white/60 text-xs font-cn">2026.01.11 01:45</span>
                    </div>
                    <div className="text-white/80 font-cn leading-relaxed text-base whitespace-pre-wrap">
                      这里很少星星。你的文字像星星一样亮到我。呀米呀米～
                    </div>
                  </div>

                  {/* 留言卡片 4 */}
                  <div className="w-full bg-white/5 backdrop-blur-md border border-white/10 rounded-lg p-6 shadow-lg shadow-black-20">
                    <div className="flex justify-between items-start mb-4">
                      <span className="text-white/60 text-xs font-cn">碎星#345</span>
                      <span className="text-white/60 text-xs font-cn">2026.01.11 02:00</span>
                    </div>
                    <div className="text-white/80 font-cn leading-relaxed text-base whitespace-pre-wrap">
                      看到"碎碎平安"突然被治愈了。谢谢你的碎碎平安。
                    </div>
                  </div>

                  {/* 留言卡片 5 - 最晚 */}
                  <div className="w-full bg-white/5 backdrop-blur-md border border-white/10 rounded-lg p-6 shadow-lg shadow-black-20">
                    <div className="flex justify-between items-start mb-4">
                      <span className="text-white/60 text-xs font-cn">碎星#678</span>
                      <span className="text-white/60 text-xs font-cn">2026.01.11 02:20</span>
                    </div>
                    <div className="text-white/80 font-cn leading-relaxed text-base whitespace-pre-wrap">
                      广州能看到那么多星星？你运气好好。也祝你朋友都不内耗，包括你。
                    </div>
                  </div>
                </>
              ) : memory.id === 13 ? (
                <>
                  {/* 2025.12.22 的留言 */}
                  {/* 留言卡片 1 - 最早 */}
                  <div className="w-full bg-white/5 backdrop-blur-md border border-white/10 rounded-lg p-6 shadow-lg shadow-black-20">
                    <div className="flex justify-between items-start mb-4">
                      <span className="text-white/60 text-xs font-cn">碎星#456</span>
                      <span className="text-white/60 text-xs font-cn">2025.12.22 08:30</span>
                    </div>
                    <div className="text-white/80 font-cn leading-relaxed text-base whitespace-pre-wrap">
                      姐妹太酷了！对，恋爱没了可以再谈，钱不赚就真的没了。向前看。
                    </div>
                  </div>

                  {/* 留言卡片 2 */}
                  <div className="w-full bg-white/5 backdrop-blur-md border border-white/10 rounded-lg p-6 shadow-lg shadow-black-20">
                    <div className="flex justify-between items-start mb-4">
                      <span className="text-white/60 text-xs font-cn">碎星#789</span>
                      <span className="text-white/60 text-xs font-cn">2025.12.22 09:00</span>
                    </div>
                    <div className="text-white/80 font-cn leading-relaxed text-base whitespace-pre-wrap">
                      刚分手时看到你这句话，笑了。19岁确实该搞钱，共勉。
                    </div>
                  </div>

                  {/* 留言卡片 3 - 最晚 */}
                  <div className="w-full bg-white/5 backdrop-blur-md border border-white/10 rounded-lg p-6 shadow-lg shadow-black-20">
                    <div className="flex justify-between items-start mb-4">
                      <span className="text-white/60 text-xs font-cn">碎星#234</span>
                      <span className="text-white/60 text-xs font-cn">2025.12.22 09:30</span>
                    </div>
                    <div className="text-white/80 font-cn leading-relaxed text-base whitespace-pre-wrap">
                      "还有很多钱等着我去赚"——这句话放在经济学里叫理性预期。你很有天赋。
                    </div>
                  </div>
                </>
              ) : memory.id === 12 ? (
                <>
                  {/* 2025.11.11 的留言 */}
                  {/* 留言卡片 1 - 最早 */}
                  <div className="w-full bg-white/5 backdrop-blur-md border border-white/10 rounded-lg p-6 shadow-lg shadow-black-20">
                    <div className="flex justify-between items-start mb-4">
                      <span className="text-white/60 text-xs font-cn">碎星#567</span>
                      <span className="text-white/60 text-xs font-cn">2025.11.11 02:45</span>
                    </div>
                    <div className="text-white/80 font-cn leading-relaxed text-base whitespace-pre-wrap">
                      那些脆弱说出来就不重了。万山已过，你也很棒。
                    </div>
                  </div>

                  {/* 留言卡片 2 */}
                  <div className="w-full bg-white/5 backdrop-blur-md border border-white/10 rounded-lg p-6 shadow-lg shadow-black-20">
                    <div className="flex justify-between items-start mb-4">
                      <span className="text-white/60 text-xs font-cn">碎星#891</span>
                      <span className="text-white/60 text-xs font-cn">2025.11.11 03:00</span>
                    </div>
                    <div className="text-white/80 font-cn leading-relaxed text-base whitespace-pre-wrap">
                      轻舟过万山，你也是自己的舟。
                    </div>
                  </div>

                  {/* 留言卡片 3 */}
                  <div className="w-full bg-white/5 backdrop-blur-md border border-white/10 rounded-lg p-6 shadow-lg shadow-black-20">
                    <div className="flex justify-between items-start mb-4">
                      <span className="text-white/60 text-xs font-cn">碎星#345</span>
                      <span className="text-white/60 text-xs font-cn">2025.11.11 03:15</span>
                    </div>
                    <div className="text-white/80 font-cn leading-relaxed text-base whitespace-pre-wrap">
                      和妈妈走夜路的画面我也经常想起。
                    </div>
                  </div>

                  {/* 留言卡片 4 */}
                  <div className="w-full bg-white/5 backdrop-blur-md border border-white/10 rounded-lg p-6 shadow-lg shadow-black-20">
                    <div className="flex justify-between items-start mb-4">
                      <span className="text-white/60 text-xs font-cn">碎星#234</span>
                      <span className="text-white/60 text-xs font-cn">2025.11.11 03:30</span>
                    </div>
                    <div className="text-white/80 font-cn leading-relaxed text-base whitespace-pre-wrap">
                      凌晨看到"轻舟过万山"哭了。我们都要做自己最好的朋友。
                    </div>
                  </div>

                  {/* 留言卡片 5 - 最晚 */}
                  <div className="w-full bg-white/5 backdrop-blur-md border border-white/10 rounded-lg p-6 shadow-lg shadow-black-20">
                    <div className="flex justify-between items-start mb-4">
                      <span className="text-white/60 text-xs font-cn">碎星#678</span>
                      <span className="text-white/60 text-xs font-cn">2025.11.11 04:00</span>
                    </div>
                    <div className="text-white/80 font-cn leading-relaxed text-base whitespace-pre-wrap">
                      从黑黑的小道到万重山，你走过的路都成了你的哲学。共勉。
                    </div>
                  </div>
                </>
              ) : memory.id === 11 ? (
                <>
                  {/* 2025.11.09 的留言 */}
                  {/* 留言卡片 1 - 最早 */}
                  <div className="w-full bg-white/5 backdrop-blur-md border border-white/10 rounded-lg p-6 shadow-lg shadow-black-20">
                    <div className="flex justify-between items-start mb-4">
                      <span className="text-white/60 text-xs font-cn">碎星#234</span>
                      <span className="text-white/60 text-xs font-cn">2025.11.09 00:30</span>
                    </div>
                    <div className="text-white/80 font-cn leading-relaxed text-base whitespace-pre-wrap">
                      只睡三小时太真实了。回家冲浪回血，没毛病。
                    </div>
                  </div>

                  {/* 留言卡片 2 */}
                  <div className="w-full bg-white/5 backdrop-blur-md border border-white/10 rounded-lg p-6 shadow-lg shadow-black-20">
                    <div className="flex justify-between items-start mb-4">
                      <span className="text-white/60 text-xs font-cn">碎星#567</span>
                      <span className="text-white/60 text-xs font-cn">2025.11.09 01:00</span>
                    </div>
                    <div className="text-white/80 font-cn leading-relaxed text-base whitespace-pre-wrap">
                      我数学竞赛直接没考。你还能坚持去，已经比我强。
                    </div>
                  </div>

                  {/* 留言卡片 3 */}
                  <div className="w-full bg-white/5 backdrop-blur-md border border-white/10 rounded-lg p-6 shadow-lg shadow-black-20">
                    <div className="flex justify-between items-start mb-4">
                      <span className="text-white/60 text-xs font-cn">碎星#891</span>
                      <span className="text-white/60 text-xs font-cn">2025.11.09 01:30</span>
                    </div>
                    <div className="text-white/80 font-cn leading-relaxed text-base whitespace-pre-wrap">
                      你这种"不想学就回家逛"的松弛感，我羡慕了。
                    </div>
                  </div>

                  {/* 留言卡片 4 - 最晚 */}
                  <div className="w-full bg-white/5 backdrop-blur-md border border-white/10 rounded-lg p-6 shadow-lg shadow-black-20">
                    <div className="flex justify-between items-start mb-4">
                      <span className="text-white/60 text-xs font-cn">碎星#345</span>
                      <span className="text-white/60 text-xs font-cn">2025.11.09 02:00</span>
                    </div>
                    <div className="text-white/80 font-cn leading-relaxed text-base whitespace-pre-wrap">
                      函调资料我也刚交完。祝你顺利，也祝你冲浪愉快。
                    </div>
                  </div>
                </>
              ) : memory.id === 10 ? (
                <>
                  {/* 2025.11.06 的留言 */}
                  {/* 留言卡片 1 - 最早 */}
                  <div className="w-full bg-white/5 backdrop-blur-md border border-white/10 rounded-lg p-6 shadow-lg shadow-black-20">
                    <div className="flex justify-between items-start mb-4">
                      <span className="text-white/60 text-xs font-cn">碎星#456</span>
                      <span className="text-white/60 text-xs font-cn">2025.11.06 04:00</span>
                    </div>
                    <div className="text-white/80 font-cn leading-relaxed text-base whitespace-pre-wrap">
                      小猫确实能治。你从"阴暗老鼠人"到看见阳光就起床，小猫会为你骄傲。
                    </div>
                  </div>

                  {/* 留言卡片 2 */}
                  <div className="w-full bg-white/5 backdrop-blur-md border border-white/10 rounded-lg p-6 shadow-lg shadow-black-20">
                    <div className="flex justify-between items-start mb-4">
                      <span className="text-white/60 text-xs font-cn">碎星#789</span>
                      <span className="text-white/60 text-xs font-cn">2025.11.06 04:30</span>
                    </div>
                    <div className="text-white/80 font-cn leading-relaxed text-base whitespace-pre-wrap">
                      花和树是最沉默的治疗师。你描述的那个清晨，我也经历过，像是世界在说"醒醒，还活着"。
                    </div>
                  </div>

                  {/* 留言卡片 3 - 最晚 */}
                  <div className="w-full bg-white/5 backdrop-blur-md border border-white/10 rounded-lg p-6 shadow-lg shadow-black-20">
                    <div className="flex justify-between items-start mb-4">
                      <span className="text-white/60 text-xs font-cn">碎星#234</span>
                      <span className="text-white/60 text-xs font-cn">2025.11.06 05:00</span>
                    </div>
                    <div className="text-white/80 font-cn leading-relaxed text-base whitespace-pre-wrap">
                      我好久没见过早上的太阳了……明天试着拉开窗帘。
                    </div>
                  </div>
                </>
              ) : memory.id === 9 ? (
                <>
                  {/* 2025.10.19 的留言 */}
                  {/* 留言卡片 1 - 最早 */}
                  <div className="w-full bg-white/5 backdrop-blur-md border border-white/10 rounded-lg p-6 shadow-lg shadow-black-20">
                    <div className="flex justify-between items-start mb-4">
                      <span className="text-white/60 text-xs font-cn">碎星#567</span>
                      <span className="text-white/60 text-xs font-cn">2025.10.19 01:30</span>
                    </div>
                    <div className="text-white/80 font-cn leading-relaxed text-base whitespace-pre-wrap">
                      这种信念感太珍贵了。保持住，它会在最难的时候拽你一把。
                    </div>
                  </div>

                  {/* 留言卡片 2 */}
                  <div className="w-full bg-white/5 backdrop-blur-md border border-white/10 rounded-lg p-6 shadow-lg shadow-black-20">
                    <div className="flex justify-between items-start mb-4">
                      <span className="text-white/60 text-xs font-cn">碎星#891</span>
                      <span className="text-white/60 text-xs font-cn">2025.10.19 02:00</span>
                    </div>
                    <div className="text-white/80 font-cn leading-relaxed text-base whitespace-pre-wrap">
                      我也是靠这句话撑过的。加油，对的人在路上。
                    </div>
                  </div>

                  {/* 留言卡片 3 - 最晚 */}
                  <div className="w-full bg-white/5 backdrop-blur-md border border-white/10 rounded-lg p-6 shadow-lg shadow-black-20">
                    <div className="flex justify-between items-start mb-4">
                      <span className="text-white/60 text-xs font-cn">碎星#234</span>
                      <span className="text-white/60 text-xs font-cn">2025.10.19 02:30</span>
                    </div>
                    <div className="text-white/80 font-cn leading-relaxed text-base whitespace-pre-wrap">
                      我还在找目标，看到你已经找到，好羡慕。也恭喜你！
                    </div>
                  </div>
                </>
              ) : memory.id === 15 ? (
                <>
                  {/* 2025.09.19 的留言 */}
                  {/* 留言卡片 1 - 最早 */}
                  <div className="w-full bg-white/5 backdrop-blur-md border border-white/10 rounded-lg p-6 shadow-lg shadow-black-20">
                    <div className="flex justify-between items-start mb-4">
                      <span className="text-white/60 text-xs font-cn">碎星#789</span>
                      <span className="text-white/60 text-xs font-cn">2025.09.19 01:20</span>
                    </div>
                    <div className="text-white/80 font-cn leading-relaxed text-base whitespace-pre-wrap">
                      看了你的清单，除了奖学金我全中。谢谢你让我知道不是一个人。
                    </div>
                  </div>

                  {/* 留言卡片 2 */}
                  <div className="w-full bg-white/5 backdrop-blur-md border border-white/10 rounded-lg p-6 shadow-lg shadow-black-20">
                    <div className="flex justify-between items-start mb-4">
                      <span className="text-white/60 text-xs font-cn">碎星#234</span>
                      <span className="text-white/60 text-xs font-cn">2025.09.19 01:40</span>
                    </div>
                    <div className="text-white/80 font-cn leading-relaxed text-base whitespace-pre-wrap">
                      大一就能这么诚实地复盘，你已经比很多人清醒了。我大二还在自我欺骗。
                    </div>
                  </div>

                  {/* 留言卡片 3 */}
                  <div className="w-full bg-white/5 backdrop-blur-md border border-white/10 rounded-lg p-6 shadow-lg shadow-black-20">
                    <div className="flex justify-between items-start mb-4">
                      <span className="text-white/60 text-xs font-cn">碎星#567</span>
                      <span className="text-white/60 text-xs font-cn">2025.09.19 02:00</span>
                    </div>
                    <div className="text-white/80 font-cn leading-relaxed text-base whitespace-pre-wrap">
                      我的大一也是"一事无成收获了一堆"。但现在回头看，那些"没用"的尝试，后来都变成了故事。
                    </div>
                  </div>

                  {/* 留言卡片 4 */}
                  <div className="w-full bg-white/5 backdrop-blur-md border border-white/10 rounded-lg p-6 shadow-lg shadow-black-20">
                    <div className="flex justify-between items-start mb-4">
                      <span className="text-white/60 text-xs font-cn">碎星#891</span>
                      <span className="text-white/60 text-xs font-cn">2025.09.19 02:20</span>
                    </div>
                    <div className="text-white/80 font-cn leading-relaxed text-base whitespace-pre-wrap">
                      看到"假努力的一年"我哭了，这不就是现在的我吗？谢谢你把它说出来。
                    </div>
                  </div>

                  {/* 留言卡片 5 - 最晚 */}
                  <div className="w-full bg-white/5 backdrop-blur-md border border-white/10 rounded-lg p-6 shadow-lg shadow-black-20">
                    <div className="flex justify-between items-start mb-4">
                      <span className="text-white/60 text-xs font-cn">碎星#345</span>
                      <span className="text-white/60 text-xs font-cn">2025.09.19 02:40</span>
                    </div>
                    <div className="text-white/80 font-cn leading-relaxed text-base whitespace-pre-wrap">
                      大一能这样复盘，你已经赢过很多人了。我到大三才醒。
                    </div>
                  </div>
                </>
              ) : memory.id === 8 ? (
                <>
                  {/* 2025.09.18 的留言 */}
                  {/* 留言卡片 1 - 最早 */}
                  <div className="w-full bg-white/5 backdrop-blur-md border border-white/10 rounded-lg p-6 shadow-lg shadow-black-20">
                    <div className="flex justify-between items-start mb-4">
                      <span className="text-white/60 text-xs font-cn">碎星#234</span>
                      <span className="text-white/60 text-xs font-cn">2025.09.18 23:00</span>
                    </div>
                    <div className="text-white/80 font-cn leading-relaxed text-base whitespace-pre-wrap">
                      刚从国外回来，见完更大的世界，回来更卷了。但你这句话让我觉得值得。
                    </div>
                  </div>

                  {/* 留言卡片 2 */}
                  <div className="w-full bg-white/5 backdrop-blur-md border border-white/10 rounded-lg p-6 shadow-lg shadow-black-20">
                    <div className="flex justify-between items-start mb-4">
                      <span className="text-white/60 text-xs font-cn">碎星#567</span>
                      <span className="text-white/60 text-xs font-cn">2025.09.18 23:15</span>
                    </div>
                    <div className="text-white/80 font-cn leading-relaxed text-base whitespace-pre-wrap">
                      从小城市来，第一次看到地铁图都惊了。一起走远吧。
                    </div>
                  </div>

                  {/* 留言卡片 3 */}
                  <div className="w-full bg-white/5 backdrop-blur-md border border-white/10 rounded-lg p-6 shadow-lg shadow-black-20">
                    <div className="flex justify-between items-start mb-4">
                      <span className="text-white/60 text-xs font-cn">碎星#891</span>
                      <span className="text-white/60 text-xs font-cn">2025.09.18 23:30</span>
                    </div>
                    <div className="text-white/80 font-cn leading-relaxed text-base whitespace-pre-wrap">
                      刚从荷兰回来，见完大风车和郁金香，回来更想出去了。一起走远。
                    </div>
                  </div>

                  {/* 留言卡片 4 - 最晚 */}
                  <div className="w-full bg-white/5 backdrop-blur-md border border-white/10 rounded-lg p-6 shadow-lg shadow-black-20">
                    <div className="flex justify-between items-start mb-4">
                      <span className="text-white/60 text-xs font-cn">碎星#345</span>
                      <span className="text-white/60 text-xs font-cn">2025.09.18 23:45</span>
                    </div>
                    <div className="text-white/80 font-cn leading-relaxed text-base whitespace-pre-wrap">
                      第一次去上海回来，我也是这句话。野心是被风景喂大的。
                    </div>
                  </div>
                </>
              ) : memory.id === 7 ? (
                <>
                  {/* 2025.08.27 的留言 */}
                  {/* 留言卡片 1 - 最早 */}
                  <div className="w-full bg-white/5 backdrop-blur-md border border-white/10 rounded-lg p-6 shadow-lg shadow-black-20">
                    <div className="flex justify-between items-start mb-4">
                      <span className="text-white/60 text-xs font-cn">碎星#456</span>
                      <span className="text-white/60 text-xs font-cn">2025.08.27 07:00</span>
                    </div>
                    <div className="text-white/80 font-cn leading-relaxed text-base whitespace-pre-wrap">
                      东山岛的贝壳我也捡过！一时兴起的旅行最难忘。
                    </div>
                  </div>

                  {/* 留言卡片 2 */}
                  <div className="w-full bg-white/5 backdrop-blur-md border border-white/10 rounded-lg p-6 shadow-lg shadow-black-20">
                    <div className="flex justify-between items-start mb-4">
                      <span className="text-white/60 text-xs font-cn">碎星#789</span>
                      <span className="text-white/60 text-xs font-cn">2025.08.27 07:15</span>
                    </div>
                    <div className="text-white/80 font-cn leading-relaxed text-base whitespace-pre-wrap">
                      带妹妹去的姐姐好酷。我也想这样，但不敢。你给我勇气了。
                    </div>
                  </div>

                  {/* 留言卡片 3 */}
                  <div className="w-full bg-white/5 backdrop-blur-md border border-white/10 rounded-lg p-6 shadow-lg shadow-black-20">
                    <div className="flex justify-between items-start mb-4">
                      <span className="text-white/60 text-xs font-cn">碎星#234</span>
                      <span className="text-white/60 text-xs font-cn">2025.08.27 07:30</span>
                    </div>
                    <div className="text-white/80 font-cn leading-relaxed text-base whitespace-pre-wrap">
                      一个人带妹妹出省，你胆大心细。捡贝壳一下午，听着就治愈。
                    </div>
                  </div>

                  {/* 留言卡片 4 */}
                  <div className="w-full bg-white/5 backdrop-blur-md border border-white/10 rounded-lg p-6 shadow-lg shadow-black-20">
                    <div className="flex justify-between items-start mb-4">
                      <span className="text-white/60 text-xs font-cn">碎星#567</span>
                      <span className="text-white/60 text-xs font-cn">2025.08.27 08:00</span>
                    </div>
                    <div className="text-white/80 font-cn leading-relaxed text-base whitespace-pre-wrap">
                      你爸妈放心让你带妹妹出去，说明你靠谱。
                    </div>
                  </div>

                  {/* 留言卡片 5 */}
                  <div className="w-full bg-white/5 backdrop-blur-md border border-white/10 rounded-lg p-6 shadow-lg shadow-black-20">
                    <div className="flex justify-between items-start mb-4">
                      <span className="text-white/60 text-xs font-cn">碎星#891</span>
                      <span className="text-white/60 text-xs font-cn">2025.08.27 08:15</span>
                    </div>
                    <div className="text-white/80 font-cn leading-relaxed text-base whitespace-pre-wrap">
                      一时兴起就出发，还带上了妹妹。你是我羡慕的那种人。
                    </div>
                  </div>

                  {/* 留言卡片 6 - 最晚 */}
                  <div className="w-full bg-white/5 backdrop-blur-md border border-white/10 rounded-lg p-6 shadow-lg shadow-black-20">
                    <div className="flex justify-between items-start mb-4">
                      <span className="text-white/60 text-xs font-cn">碎星#345</span>
                      <span className="text-white/60 text-xs font-cn">2025.08.27 08:30</span>
                    </div>
                    <div className="text-white/80 font-cn leading-relaxed text-base whitespace-pre-wrap">
                      我连一个人点外卖都犹豫，你居然敢独自出省。向你学习。
                    </div>
                  </div>
                </>
              ) : memory.id === 6 ? (
                <>
                  {/* 2025.06.19 的留言 */}
                  {/* 留言卡片 1 - 最早 */}
                  <div className="w-full bg-white/5 backdrop-blur-md border border-white/10 rounded-lg p-6 shadow-lg shadow-black-20">
                    <div className="flex justify-between items-start mb-4">
                      <span className="text-white/60 text-xs font-cn">碎星#567</span>
                      <span className="text-white/60 text-xs font-cn">2025.06.19 20:50</span>
                    </div>
                    <div className="text-white/80 font-cn leading-relaxed text-base whitespace-pre-wrap">
                      现在6月，我懂你。还有两周，撑住。
                    </div>
                  </div>

                  {/* 留言卡片 2 - 最晚 */}
                  <div className="w-full bg-white/5 backdrop-blur-md border border-white/10 rounded-lg p-6 shadow-lg shadow-black-20">
                    <div className="flex justify-between items-start mb-4">
                      <span className="text-white/60 text-xs font-cn">碎星#891</span>
                      <span className="text-white/60 text-xs font-cn">2025.06.19 21:00</span>
                    </div>
                    <div className="text-white/80 font-cn leading-relaxed text-base whitespace-pre-wrap">
                      刚上大一就觉得难了，看到你也这么说，我不慌了。
                    </div>
                  </div>
                </>
              ) : memory.id === 5 ? (
                <>
                  {/* 2025.06.16 的留言 */}
                  {/* 留言卡片 1 - 最早 */}
                  <div className="w-full bg-white/5 backdrop-blur-md border border-white/10 rounded-lg p-6 shadow-lg shadow-black-20">
                    <div className="flex justify-between items-start mb-4">
                      <span className="text-white/60 text-xs font-cn">碎星#789</span>
                      <span className="text-white/60 text-xs font-cn">2025.06.16 18:00</span>
                    </div>
                    <div className="text-white/80 font-cn leading-relaxed text-base whitespace-pre-wrap">
                      去年夏天写的东西和你的很像。现在和好朋友在不同城市，但我们真的在高处见了。会实现的。
                    </div>
                  </div>

                  {/* 留言卡片 2 */}
                  <div className="w-full bg-white/5 backdrop-blur-md border border-white/10 rounded-lg p-6 shadow-lg shadow-black-20">
                    <div className="flex justify-between items-start mb-4">
                      <span className="text-white/60 text-xs font-cn">碎星#234</span>
                      <span className="text-white/60 text-xs font-cn">2025.06.16 18:15</span>
                    </div>
                    <div className="text-white/80 font-cn leading-relaxed text-base whitespace-pre-wrap">
                      正在经历从"我们"到"我"，心里很慌。谢谢你告诉我，一个人也走得很好，而且会高处见。
                    </div>
                  </div>

                  {/* 留言卡片 3 */}
                  <div className="w-full bg-white/5 backdrop-blur-md border border-white/10 rounded-lg p-6 shadow-lg shadow-black-20">
                    <div className="flex justify-between items-start mb-4">
                      <span className="text-white/60 text-xs font-cn">碎星#567</span>
                      <span className="text-white/60 text-xs font-cn">2025.06.16 18:30</span>
                    </div>
                    <div className="text-white/80 font-cn leading-relaxed text-base whitespace-pre-wrap">
                      这里的蝉鸣和国内不一样，但孤独感是一样的。耳机盖不过，但你的文字盖过了一些。
                    </div>
                  </div>

                  {/* 留言卡片 4 - 最晚 */}
                  <div className="w-full bg-white/5 backdrop-blur-md border border-white/10 rounded-lg p-6 shadow-lg shadow-black-20">
                    <div className="flex justify-between items-start mb-4">
                      <span className="text-white/60 text-xs font-cn">碎星#345</span>
                      <span className="text-white/60 text-xs font-cn">2025.06.16 19:00</span>
                    </div>
                    <div className="text-white/80 font-cn leading-relaxed text-base whitespace-pre-wrap">
                      我和她不在一个大学，但每次听到蝉鸣就会想起她。高处见，一定。
                    </div>
                  </div>
                </>
              ) : memory.id === 16 ? (
                <>
                  {/* 2025.05.21 的留言 */}
                  {/* 留言卡片 1 - 最早 */}
                  <div className="w-full bg-white/5 backdrop-blur-md border border-white/10 rounded-lg p-6 shadow-lg shadow-black-20">
                    <div className="flex justify-between items-start mb-4">
                      <span className="text-white/60 text-xs font-cn">碎星#891</span>
                      <span className="text-white/60 text-xs font-cn">2025.05.22 00:10</span>
                    </div>
                    <div className="text-white/80 font-cn leading-relaxed text-base whitespace-pre-wrap">
                      我也用文字和照片对抗遗忘。你说得对，待人如初太难了，但至少我们对自己还算坦诚。
                    </div>
                  </div>

                  {/* 留言卡片 2 */}
                  <div className="w-full bg-white/5 backdrop-blur-md border border-white/10 rounded-lg p-6 shadow-lg shadow-black-20">
                    <div className="flex justify-between items-start mb-4">
                      <span className="text-white/60 text-xs font-cn">碎星#234</span>
                      <span className="text-white/60 text-xs font-cn">2025.05.22 00:20</span>
                    </div>
                    <div className="text-white/80 font-cn leading-relaxed text-base whitespace-pre-wrap">
                      那些琐碎的记录，以后回头看都是珍珠。
                    </div>
                  </div>

                  {/* 留言卡片 3 */}
                  <div className="w-full bg-white/5 backdrop-blur-md border border-white/10 rounded-lg p-6 shadow-lg shadow-black-20">
                    <div className="flex justify-between items-start mb-4">
                      <span className="text-white/60 text-xs font-cn">碎星#567</span>
                      <span className="text-white/60 text-xs font-cn">2025.05.22 00:30</span>
                    </div>
                    <div className="text-white/80 font-cn leading-relaxed text-base whitespace-pre-wrap">
                      广州的天气真的磨人。你说待人如初难，我觉得待自己如初更难。你已经很了不起了。
                    </div>
                  </div>

                  {/* 留言卡片 4 */}
                  <div className="w-full bg-white/5 backdrop-blur-md border border-white/10 rounded-lg p-6 shadow-lg shadow-black-20">
                    <div className="flex justify-between items-start mb-4">
                      <span className="text-white/60 text-xs font-cn">碎星#345</span>
                      <span className="text-white/60 text-xs font-cn">2025.05.22 00:40</span>
                    </div>
                    <div className="text-white/80 font-cn leading-relaxed text-base whitespace-pre-wrap">
                      我也在异国适应天气和孤独。频繁记录不是对峙痛苦，是给自己建灯塔。
                    </div>
                  </div>

                  {/* 留言卡片 5 */}
                  <div className="w-full bg-white/5 backdrop-blur-md border border-white/10 rounded-lg p-6 shadow-lg shadow-black-20">
                    <div className="flex justify-between items-start mb-4">
                      <span className="text-white/60 text-xs font-cn">碎星#789</span>
                      <span className="text-white/60 text-xs font-cn">2025.05.22 00:50</span>
                    </div>
                    <div className="text-white/80 font-cn leading-relaxed text-base whitespace-pre-wrap">
                      待人如初，对前任尤其难。但你说得对，不勉强自己了。
                    </div>
                  </div>

                  {/* 留言卡片 6 - 最晚 */}
                  <div className="w-full bg-white/5 backdrop-blur-md border border-white/10 rounded-lg p-6 shadow-lg shadow-black-20">
                    <div className="flex justify-between items-start mb-4">
                      <span className="text-white/60 text-xs font-cn">碎星#123</span>
                      <span className="text-white/60 text-xs font-cn">2025.05.22 01:00</span>
                    </div>
                    <div className="text-white/80 font-cn leading-relaxed text-base whitespace-pre-wrap">
                      这句话写得真好——"像留了个烙印"。有些事过去了但痕迹在，接受它就好。
                    </div>
                  </div>
                </>
              ) : memory.id === 4 ? (
                <>
                  {/* 2025.04.16 的留言 */}
                  {/* 留言卡片 1 - 最早 */}
                  <div className="w-full bg-white/5 backdrop-blur-md border border-white/10 rounded-lg p-6 shadow-lg shadow-black-20">
                    <div className="flex justify-between items-start mb-4">
                      <span className="text-white/60 text-xs font-cn">碎星#123</span>
                      <span className="text-white/60 text-xs font-cn">2025.04.16 10:30</span>
                    </div>
                    <div className="text-white/80 font-cn leading-relaxed text-base whitespace-pre-wrap">
                      看哭了。你描述的小男孩，和我实习时遇到的一个孩子很像。你写得那么细腻，你一定有很好的观察力和共情力。谢谢你去做志愿者。
                    </div>
                  </div>

                  {/* 留言卡片 2 */}
                  <div className="w-full bg-white/5 backdrop-blur-md border border-white/10 rounded-lg p-6 shadow-lg shadow-black-20">
                    <div className="flex justify-between items-start mb-4">
                      <span className="text-white/60 text-xs font-cn">碎星#456</span>
                      <span className="text-white/60 text-xs font-cn">2025.04.16 10:45</span>
                    </div>
                    <div className="text-white/80 font-cn leading-relaxed text-base whitespace-pre-wrap">
                      看完不敢再抱怨生活了。那个要绿色笔的小男孩，会记得你的。我也会记得你说的"人与人的联结"。
                    </div>
                  </div>

                  {/* 留言卡片 3 - 最晚 */}
                  <div className="w-full bg-white/5 backdrop-blur-md border border-white/10 rounded-lg p-6 shadow-lg shadow-black-20">
                    <div className="flex justify-between items-start mb-4">
                      <span className="text-white/60 text-xs font-cn">碎星#789</span>
                      <span className="text-white/60 text-xs font-cn">2025.04.16 11:00</span>
                    </div>
                    <div className="text-white/80 font-cn leading-relaxed text-base whitespace-pre-wrap">
                      第一次去我也很忐忑。但你写得真好——他的手是热热的，人与人的联结。你会一直记得他，他也会记得你。
                    </div>
                  </div>
                </>
              ) : memory.id === 17 ? (
                <>
                  {/* 2024.11.18 的留言 */}
                  {/* 留言卡片 1 - 最早 */}
                  <div className="w-full bg-white/5 backdrop-blur-md border border-white/10 rounded-lg p-6 shadow-lg shadow-black-20">
                    <div className="flex justify-between items-start mb-4">
                      <span className="text-white/60 text-xs font-cn">碎星#456</span>
                      <span className="text-white/60 text-xs font-cn">2024.11.18 02:10</span>
                    </div>
                    <div className="text-white/80 font-cn leading-relaxed text-base whitespace-pre-wrap">
                      工作后更懂这句话。以前怕显得笨，现在敢直接说"这个我不会，能教我吗"。
                    </div>
                  </div>

                  {/* 留言卡片 2 */}
                  <div className="w-full bg-white/5 backdrop-blur-md border border-white/10 rounded-lg p-6 shadow-lg shadow-black-20">
                    <div className="flex justify-between items-start mb-4">
                      <span className="text-white/60 text-xs font-cn">碎星#789</span>
                      <span className="text-white/60 text-xs font-cn">2024.11.18 02:20</span>
                    </div>
                    <div className="text-white/80 font-cn leading-relaxed text-base whitespace-pre-wrap">
                      承认自己不轻松，才是真正的轻松。
                    </div>
                  </div>

                  {/* 留言卡片 3 */}
                  <div className="w-full bg-white/5 backdrop-blur-md border border-white/10 rounded-lg p-6 shadow-lg shadow-black-20">
                    <div className="flex justify-between items-start mb-4">
                      <span className="text-white/60 text-xs font-cn">碎星#234</span>
                      <span className="text-white/60 text-xs font-cn">2024.11.18 02:30</span>
                    </div>
                    <div className="text-white/80 font-cn leading-relaxed text-base whitespace-pre-wrap">
                      以前考好了说"没复习"，现在考好了说"熬了三个通宵"。承认努力不丢人。
                    </div>
                  </div>

                  {/* 留言卡片 4 */}
                  <div className="w-full bg-white/5 backdrop-blur-md border border-white/10 rounded-lg p-6 shadow-lg shadow-black-20">
                    <div className="flex justify-between items-start mb-4">
                      <span className="text-white/60 text-xs font-cn">碎星#567</span>
                      <span className="text-white/60 text-xs font-cn">2024.11.18 02:40</span>
                    </div>
                    <div className="text-white/80 font-cn leading-relaxed text-base whitespace-pre-wrap">
                      我还在假装轻松的阶段。看到你这句话，突然觉得好累，不想装了。
                    </div>
                  </div>

                  {/* 留言卡片 5 - 最晚 */}
                  <div className="w-full bg-white/5 backdrop-blur-md border border-white/10 rounded-lg p-6 shadow-lg shadow-black-20">
                    <div className="flex justify-between items-start mb-4">
                      <span className="text-white/60 text-xs font-cn">碎星#345</span>
                      <span className="text-white/60 text-xs font-cn">2024.11.18 02:50</span>
                    </div>
                    <div className="text-white/80 font-cn leading-relaxed text-base whitespace-pre-wrap">
                      上班后第一天就暴露了啥都不会。不装了，轻松是别人的，踏实是自己的。
                    </div>
                  </div>
                </>
              ) : memory.id === 3 ? (
                <>
                  {/* 2024.11.07 的留言 */}
                  {/* 留言卡片 1 - 最早 */}
                  <div className="w-full bg-white/5 backdrop-blur-md border border-white/10 rounded-lg p-6 shadow-lg shadow-black-20">
                    <div className="flex justify-between items-start mb-4">
                      <span className="text-white/60 text-xs font-cn">碎星#567</span>
                      <span className="text-white/60 text-xs font-cn">2024.11.07 19:30</span>
                    </div>
                    <div className="text-white/80 font-cn leading-relaxed text-base whitespace-pre-wrap">
                      一模一样。迷茫的时候遇到好人，就像雾里看到灯。一起加油。
                    </div>
                  </div>

                  {/* 留言卡片 2 */}
                  <div className="w-full bg-white/5 backdrop-blur-md border border-white/10 rounded-lg p-6 shadow-lg shadow-black-20">
                    <div className="flex justify-between items-start mb-4">
                      <span className="text-white/60 text-xs font-cn">碎星#891</span>
                      <span className="text-white/60 text-xs font-cn">2024.11.07 19:40</span>
                    </div>
                    <div className="text-white/80 font-cn leading-relaxed text-base whitespace-pre-wrap">
                      在异国迷茫时，便利店店员的一句"欢迎光临"都能温暖我。你遇到的好人们，是缘分。
                    </div>
                  </div>

                  {/* 留言卡片 3 - 最晚 */}
                  <div className="w-full bg-white/5 backdrop-blur-md border border-white/10 rounded-lg p-6 shadow-lg shadow-black-20">
                    <div className="flex justify-between items-start mb-4">
                      <span className="text-white/60 text-xs font-cn">碎星#234</span>
                      <span className="text-white/60 text-xs font-cn">2024.11.07 20:00</span>
                    </div>
                    <div className="text-white/80 font-cn leading-relaxed text-base whitespace-pre-wrap">
                      迷茫是常态，好人不是。所以感恩，然后继续走。
                    </div>
                  </div>
                </>
              ) : memory.id === 2 ? (
                <>
                  {/* 2024.09.20 的留言 */}
                  {/* 留言卡片 1 - 最早 */}
                  <div className="w-full bg-white/5 backdrop-blur-md border border-white/10 rounded-lg p-6 shadow-lg shadow-black-20">
                    <div className="flex justify-between items-start mb-4">
                      <span className="text-white/60 text-xs font-cn">碎星#789</span>
                      <span className="text-white/60 text-xs font-cn">2024.09.20 02:30</span>
                    </div>
                    <div className="text-white/80 font-cn leading-relaxed text-base whitespace-pre-wrap">
                      站军姿时的胡思乱想，看来不是我一个人。你写得像散文。
                    </div>
                  </div>

                  {/* 留言卡片 2 */}
                  <div className="w-full bg-white/5 backdrop-blur-md border border-white/10 rounded-lg p-6 shadow-lg shadow-black-20">
                    <div className="flex justify-between items-start mb-4">
                      <span className="text-white/60 text-xs font-cn">碎星#123</span>
                      <span className="text-white/60 text-xs font-cn">2024.09.20 02:40</span>
                    </div>
                    <div className="text-white/80 font-cn leading-relaxed text-base whitespace-pre-wrap">
                      那十五分钟我也在数蝉鸣。后来发现，大学三年，最安静的反而是那十五分钟。
                    </div>
                  </div>

                  {/* 留言卡片 3 - 最晚 */}
                  <div className="w-full bg-white/5 backdrop-blur-md border border-white/10 rounded-lg p-6 shadow-lg shadow-black-20">
                    <div className="flex justify-between items-start mb-4">
                      <span className="text-white/60 text-xs font-cn">碎星#456</span>
                      <span className="text-white/60 text-xs font-cn">2024.09.20 03:00</span>
                    </div>
                    <div className="text-white/80 font-cn leading-relaxed text-base whitespace-pre-wrap">
                      看到你写站军姿时的思绪，想起我带新训的日子。那十五分钟，确实漫长又安静。
                    </div>
                  </div>

                  {/* 留言卡片 4 */}
                  <div className="w-full bg-white/5 backdrop-blur-md border border-white/10 rounded-lg p-6 shadow-lg shadow-black-20">
                    <div className="flex justify-between items-start mb-4">
                      <span className="text-white/60 text-xs font-cn">碎星#891</span>
                      <span className="text-white/60 text-xs font-cn">2024.09.20 03:10</span>
                    </div>
                    <div className="text-white/80 font-cn leading-relaxed text-base whitespace-pre-wrap">
                      我们当时站军姿我数了132只蚂蚁。你的"来日方长"让我突然怀念那个夜晚。
                    </div>
                  </div>
                </>
              ) : memory.id === 18 ? (
                <>
                  {/* 2024.09.12 的留言 */}
                  {/* 留言卡片 1 - 最早 */}
                  <div className="w-full bg-white/5 backdrop-blur-md border border-white/10 rounded-lg p-6 shadow-lg shadow-black-20">
                    <div className="flex justify-between items-start mb-4">
                      <span className="text-white/60 text-xs font-cn">碎星#123</span>
                      <span className="text-white/60 text-xs font-cn">2024.09.12 12:50</span>
                    </div>
                    <div className="text-white/80 font-cn leading-relaxed text-base whitespace-pre-wrap">
                      五楼+砖头课本+大太阳，我每天也在诅咒这段路。抱一下。
                    </div>
                  </div>

                  {/* 留言卡片 2 */}
                  <div className="w-full bg-white/5 backdrop-blur-md border border-white/10 rounded-lg p-6 shadow-lg shadow-black-20">
                    <div className="flex justify-between items-start mb-4">
                      <span className="text-white/60 text-xs font-cn">碎星#456</span>
                      <span className="text-white/60 text-xs font-cn">2024.09.12 13:00</span>
                    </div>
                    <div className="text-white/80 font-cn leading-relaxed text-base whitespace-pre-wrap">
                      我每天训练完还要爬六楼，腿都不是自己的了。你至少还有空调？算了，一起骂吧。
                    </div>
                  </div>

                  {/* 留言卡片 3 - 最晚 */}
                  <div className="w-full bg-white/5 backdrop-blur-md border border-white/10 rounded-lg p-6 shadow-lg shadow-black-20">
                    <div className="flex justify-between items-start mb-4">
                      <span className="text-white/60 text-xs font-cn">碎星#789</span>
                      <span className="text-white/60 text-xs font-cn">2024.09.12 13:10</span>
                    </div>
                    <div className="text-white/80 font-cn leading-relaxed text-base whitespace-pre-wrap">
                      五楼？我们六楼没电梯，懂你。那句"受够了"我每天都说，说完继续爬。
                    </div>
                  </div>
                </>
              ) : memory.id === 1 ? (
                <>
                  {/* 2024.09.08 的留言 */}
                  {/* 留言卡片 1 - 最早 */}
                  <div className="w-full bg-white/5 backdrop-blur-md border border-white/10 rounded-lg p-6 shadow-lg shadow-black-20">
                    <div className="flex justify-between items-start mb-4">
                      <span className="text-white/60 text-xs font-cn">碎星#456</span>
                      <span className="text-white/60 text-xs font-cn">2024.09.08 13:50</span>
                    </div>
                    <div className="text-white/80 font-cn leading-relaxed text-base whitespace-pre-wrap">
                      挂过科的人告诉你，底线确实不能破。你这种自我敲打的态度，会走很远。
                    </div>
                  </div>

                  {/* 留言卡片 2 */}
                  <div className="w-full bg-white/5 backdrop-blur-md border border-white/10 rounded-lg p-6 shadow-lg shadow-black-20">
                    <div className="flex justify-between items-start mb-4">
                      <span className="text-white/60 text-xs font-cn">碎星#789</span>
                      <span className="text-white/60 text-xs font-cn">2024.09.08 14:00</span>
                    </div>
                    <div className="text-white/80 font-cn leading-relaxed text-base whitespace-pre-wrap">
                      能及时收住自信敲醒自己，是稀缺的能力。谦逊+努力=无敌。
                    </div>
                  </div>

                  {/* 留言卡片 3 - 最晚 */}
                  <div className="w-full bg-white/5 backdrop-blur-md border border-white/10 rounded-lg p-6 shadow-lg shadow-black-20">
                    <div className="flex justify-between items-start mb-4">
                      <span className="text-white/60 text-xs font-cn">碎星#123</span>
                      <span className="text-white/60 text-xs font-cn">2024.09.08 14:10</span>
                    </div>
                    <div className="text-white/80 font-cn leading-relaxed text-base whitespace-pre-wrap">
                      我每次考好就飘，然后下次就砸。你的"骄兵必败"我记本子上了。
                    </div>
                  </div>
                </>
              ) : (
                <>
                  {/* 默认留言 - 其他记录 */}
                  {/* 留言卡片 1 */}
                  <div className="w-full bg-white/5 backdrop-blur-md border border-white/10 rounded-lg p-6 shadow-lg shadow-black-20">
                    <div className="flex justify-between items-start mb-4">
                      <span className="text-white/60 text-xs font-cn">碎星#123</span>
                      <span className="text-white/60 text-xs font-cn">2024.09.08 14:23</span>
                    </div>
                    <div className="text-white/80 font-cn leading-relaxed text-base whitespace-pre-wrap">
                      这段话让我想起了很多，谢谢分享。
                    </div>
                  </div>
                </>
              )}
            </div>
          </div>
        ) : (
          <div className="text-center text-white/60">
            <p>记忆不存在</p>
          </div>
        )}
      </main>
      
      {/* 添加呼吸动画样式 */}
      <style>{`
        @keyframes gentle-breathe {
          0%, 100% {
            transform: scale(1);
            opacity: 0.6;
          }
          50% {
            transform: scale(1.1);
            opacity: 0.8;
          }
        }
        
        /* 自定义滚动条样式 */
        .scrollbar-thin {
          scrollbar-width: thin;
        }
        
        .scrollbar-thin::-webkit-scrollbar {
          width: 6px;
        }
        
        .scrollbar-thin::-webkit-scrollbar-track {
          background: transparent;
        }
        
        .scrollbar-thin::-webkit-scrollbar-thumb {
          background-color: rgba(255, 255, 255, 0.2);
          border-radius: 3px;
        }
        
        .scrollbar-thin::-webkit-scrollbar-thumb:hover {
          background-color: rgba(255, 255, 255, 0.3);
        }
        
        .scrollbar-thumb-white\/20::-webkit-scrollbar-thumb {
          background-color: rgba(255, 255, 255, 0.2);
        }
        
        .scrollbar-thumb-white\/20::-webkit-scrollbar-thumb:hover {
          background-color: rgba(255, 255, 255, 0.3);
        }
        
        .scrollbar-track-transparent::-webkit-scrollbar-track {
          background: transparent;
        }
      `}</style>
    </>
  );
}
