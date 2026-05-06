import { createFileRoute, useNavigate, useRouter } from "@tanstack/react-router";
import { useState, useEffect } from "react";
import { PageShell } from "@/components/PageShell";
import { Send } from "lucide-react";
import { Link } from "@tanstack/react-router";

export const Route = createFileRoute("/shiguang")({
  head: () => ({ meta: [{ title: "拾光 · 同频未署名" }] }),
  component: Shiguang,
  validateSearch: (search: Record<string, unknown>) => ({
    stage: search.stage as string || "seeking",
    starNumber: search.starNumber as string || undefined,
    message: search.message as string || undefined,
    liked: search.liked as string || undefined,
  }),
});

// 模拟留言数据 - 内容和标签绑定
const MESSAGE_DATA = [
  {
    content: "最近宿舍有个舍友要换宿，来了个新的我不太喜欢，太吵了，说话语气我也不喜欢",
    tags: ["人际困扰"]
  },
  {
    content: "焦虑未来",
    tags: ["未来焦虑", "迷茫", "压力"]
  },
  {
    content: "很困 怎么祛湿",
    tags: ["身体不适", "疲惫", "养生困扰"]
  },
  {
    content: "不是班委、但是实习班委优先选实习单位怎么办",
    tags: ["就业焦虑", "不公平感", "竞争压力"]
  },
  {
    content: "感觉每天过得像NPC一样，过的基本上是固定的生活，一直被上课、学习、作业（尤其是小组作业，很讨厌）、社团活动和比赛围绕着，总觉得事情很多但又好像没什么实际意义，总觉得空虚，也看不到未来的方向，没什么期待，虽然也知道事情很多，可以提升自己的东西也可以去学，但是感觉失去了发自内心的动力去做事情，只是像一个空洞的、没有灵魂的机器一样过着每一天",
    tags: ["空虚", "机械感", "迷茫"]
  },
  {
    content: "这个世界真的很神奇，我不清楚什么时候想要尽全力学好一门课程已经变得这么功利了，周围很多人告诉我反正你不想争取保研名额，你打算大三自己准备考研，那这门课目前就没有必要学得那么好，投入那么多的时间与精力，到底是我颠了，还是这个世界颠了。我觉得努力学好一门课程，掌握原理和知识才是我未来去打比赛、去实习…的人生规划的底气啊？我真的搞不清楚",
    tags: ["功利主义", "困惑", "坚持自我"]
  },
  {
    content: "内耗的男生真的不配有爱吗",
    tags: ["自我怀疑", "内耗", "缺爱感"]
  },
  {
    content: "emmm，好好生活吧，一个人也挺好的",
    tags: ["自我安慰", "孤独", "接受现状"]
  },
  {
    content: "朋友之间是不是也会有平淡期啊，感觉明明之前玩得挺好的，最近突然大家之间变得好冷淡",
    tags: ["友情", "失落", "平淡期"]
  },
  {
    content: "是这样的我能不能一直喝到好喝的咖啡一直吃好吃的面包一直看演唱会呢…",
    tags: ["小确幸", "渴望", "治愈向"]
  },
  {
    content: "感觉自己就是很容易提前焦虑 但是又不敢付诸行动因为会害怕失败 好不容易开始了adhd又会阻碍我keepgoing",
    tags: ["焦虑", "拖延", "ADHD困境"]
  },
  {
    content: "期末周真的好容易崩溃对我来说 一直 不断的 否定自己 感觉自己学什么都不行",
    tags: ["自我否定", "崩溃", "期末压力"]
  },
  {
    content: "其实还会是一想到就流眼泪的程度 明明六月底才过完八十大寿 七月中的时候说吃不下东西去医院医生说可能是肿瘤 从知道病情到去世 不超过十天 世事无常 告别仪式的那一天我记得很清楚 在把棺材盖盖子并推进火化炉之前 殡仪馆的人说了一句话 眼泪瞬间就下来了 他说'再看最后一眼 这辈子最后一次了' 我从小到大其实送走了很多人 我作为直系亲属出席葬礼有三次了 但过去的三次都没有这一次印象来的深刻 也可能是我之前从未见过把人推进火炉的这一幕 也可能是我没有小时候的记忆了",
    tags: ["生死", "离别", "悲伤"]
  },
  {
    content: "但我确实是这样的 有时候是花 有时候是阴影下的叶子 有时候是泥里的根茎 我也以为每个人都是这样的",
    tags: ["自我接纳", "哲思", "平凡感"]
  },
  {
    content: "我好喜欢窗外的树，当阳光明媚，微风拂过树梢，恒星的光在树冠上绽开，落在每一片革质叶，树梢轻轻摇曳，浮光悄悄变换，像海上明月升起时月光破碎在粼粼水波之上，光影却也如此般破碎且完整。不同的是，此时此刻，万物清晰可见，明亮的绿色带着数不清的高光侵入你的视网膜，强势的告诉你它现在充满了生机和活力。无比的心安。",
    tags: ["治愈", "自然安抚", "心安"]
  },
  {
    content: "大三下真的好累啊，一瞬间所有的问题都向你涌了过来，父母老师都在让你早做打算，你只能硬着头皮去做出选择，但有时又会犹豫和焦虑，反复纠结和内耗",
    tags: ["大三压力", "选择焦虑", "内耗"]
  },
  {
    content: "上大学其实没什么用，因为我不想考研也不想考公，因为我对专业课这些东西一点兴趣都没有，考公那些一大堆要背的政治我也是背不过的（从小到大政治都烂的感人，且记忆力也不好），我从小就喜欢画画，很后悔当初没有走艺术这条路，也没想到文化课越来越差（我唯一成绩不错的只有语文）。如果我这一生不能做我喜欢的事，我觉得没什么意义，做不喜欢的事让我感到痛苦，我只想做我喜欢的事，画点画子，出一本漫画，开一家小店……我周围的同学都已经决定了要考研考公，我在她们中仿佛一个异类。可是我只是想开开心心的做我想做的事……",
    tags: ["自我认同", "梦想与现实", "格格不入"]
  },
  {
    content: "人生的课题永远只有自己能解决，没有人会一直陪我，我开始讨厌自己，为什么人缘那么差，朋友那么少，十年的好朋友也刻意疏远我，一切朝着未知方向走去，是我自己不够好吗，真的很讨厌这种悬而未决的状态，努力想让别人喜欢自己，，，每天不停地工作，就这样劳动到死去，什么时候才能让我停下来，我想停下来，这个世界时间不能静止吗",
    tags: ["孤独", "自我怀疑", "悬而未决"]
  },
  {
    content: "怎么办周围的人都在考研。只有我不想，我想做点喜欢的事。我知道我不爱考研。考公也不是发自内心。我只是想找个工作。有自己的时间。我不喜欢被束缚。只想自由一点。开心一点[哭惹R]。我在我宿舍已经很难融入了。我感觉我病了。对什么事情都没有兴趣。之前我会喜欢运动喜欢打球。喜欢跳舞。现在觉得这些都好累好麻烦我也不知道是怎么了。我想好好睡一次懒觉，但室友起的都很早，只有我一个人睡觉我就很难受。也不敢睡太久。觉得自己好废",
    tags: ["从众压力", "自由渴望", "抑郁倾向"]
  },
  {
    content: "大四，考研失败，找了一个月工作了，面试寥寥无几，今天好不容易有一个进二面的，也搞砸了。面试官让我先出去，说后续让人事部和我聊聊，她们要和其他人详谈的时候，脑子里什么都没了，甚至忘了把椅子推回原位。很难过，但是还是得扯着笑脸告诉当初初面的hr，没事的没事的，只有我才知道，很有事。想大哭一场，但是还得在外面等着，等室友，等所谓的人事部，最后，灰溜溜的走了，并没有人事部。",
    tags: ["考研失败", "求职挫败", "强颜欢笑"]
  },
  {
    content: "今天没有入选入党积极分子，我一直以来自诩自己是能力很强的人，自己是能够做一切事情的神，不允许失败，也不能松懈，我好像总是把我自己弄得很紧绷，一刻也不能放松，我像永远提在箭上的弦，好累啊，真的好累",
    tags: ["完美主义", "紧绷", "失落"]
  },
  {
    content: "呜呜呜我真的什么都做不好，没有任何的特长或者优点，学习也没有学好，情绪起伏像过山车一样，开心的情绪永远不会停留很久，留下的就只有麻木和崩溃，我真的好讨厌我自己，但是我又无能为力，真的什么都做不好了",
    tags: ["自我否定", "情绪过山车", "无力感"]
  },
  {
    content: "干奶茶店好累，我想跑路了，但我太胆小，什么都不敢说",
    tags: ["工作压力", "逃避", "怯懦"]
  },
  {
    content: "最近经常会焦虑到吃不下饭睡不着觉。。。临近毕业季发现自己好像一事无成，很难找到理想薪资的工作，更是无比心碎。但是确实放过自己就会收获幸福！比较是偷走幸福的小偷，我们能走到现在这里已经很厉害啦！",
    tags: ["毕业焦虑", "自我和解", "比较"]
  },
  {
    content: "感觉身边大家都非常积极向上，心态特别好，就在这种轻松愉快的过程中完成学习，而我每天都陷在没用的焦虑了，焦虑的连课都听不进去，生活都没法进行，导致学业和生活都一塌糊涂，真的害怕考不上研或者没工作。我的心态好像就决定我只能学成这样了",
    tags: ["焦虑", "羡慕他人", "自我破坏"]
  },
  {
    content: "有的时候总觉得自己好像一事无成，但其实回头望去，好多曾经以为永远挺不过的困难，最后也平淡地度过变成了过去，我们都往前走了很远的路。所以接下来任何事都会如此，相信自己其实很有处理一些问题的能力，幸福的睡一觉，迎接新的一天",
    tags: ["回顾", "成长", "自我鼓励"]
  },
  {
    content: "家里出了大事，同时有一科成绩出来了，平时分非常低挂科了，问了老师，他有一项平时分忘记给我录了......我让他看看能不能改一下更新，被驳回了，理由是他会被骂[微笑R]我本来是要拿奖学金的，这下我保研也保不了，留学也完蛋了……现在躺在床上我觉得我的人生完蛋了",
    tags: ["家庭变故", "成绩失误", "人生崩溃"]
  },
  {
    content: "今天生日，闺蜜家人都忘记了，有点失落叭",
    tags: ["生日", "失落", "被遗忘"]
  },
  {
    content: "大二这年，我总觉得自己站在某个临界点上。十八岁时，我以为二十一岁会像电影里演的那样——突然变得成熟、笃定，人生像展开的地图一样清晰。可事实上，我依然在早八的课上打瞌睡，在小组作业里手忙脚乱，在深夜翻来覆去地想着未来到底该往哪走。曾经以为大学会是一场盛大的冒险，我会在这里找到志同道合的朋友、闪闪发光的梦想，甚至一场刻骨铭心的爱情。可现实是，大多数日子平淡得像一杯放凉的白开水。社团活动没有想象中热血沸腾，喜欢的专业学得磕磕绊绊，和绝大多数的人都只是一个擦肩而过的背影。那些曾在高考后幻想过的'奇迹'，似乎并没有如期而至。有时候走在回寝室的路上，耳机里随机播放到高中时最爱的歌，会突然愣住——原来最炽热的夏天早已过去了。那时候，我们以为熬过这场考试就能拥抱整个世界，可真正抵达后才发现，世界太大，而我们只是其中一粒微尘。可偶尔，在某个不经意的瞬间，我又会忽然被什么击中。比如图书馆窗边那棵银杏树，从初秋的翠绿到深冬的金黄，我竟在匆忙中见证了它的一整个季节；比如凌晨三点和好朋友挤在一张小床上，分一包薯片，聊着不着边际的梦想。或许人生就是这样吧。我们总在追逐远方的光，却在某天回头时发现，真正照亮自己的，竟是那些被我们当作'寻常'的瞬间。现在的我依然会为未来焦虑，但也开始学着珍惜这种'未完成'的状态——毕竟二十一岁的迷茫、笨拙，甚至失落，都是再也无法复刻的年轻。如果有一天我真的走到了想要的远方，大概也会怀念此刻——这个在教室后排打盹、为期末考焦头烂额、却依然相信'明天会更好'的自己。",
    tags: ["临界点", "平淡", "珍惜当下"]
  }
];


function Shiguang() {
  const { stage: initialStage, starNumber: initialStarNumber, message: initialMessage, liked: initialLiked } = Route.useSearch();
  
  const [stage, setStage] = useState<"seeking" | "touching" | "blooming">(initialStage as any || "seeking");
  const [selectedData, setSelectedData] = useState(() => {
    if (initialMessage) {
      const foundIndex = MESSAGE_DATA.findIndex(item => item.content === initialMessage);
      return foundIndex >= 0 ? MESSAGE_DATA[foundIndex] : MESSAGE_DATA[0];
    }
    return MESSAGE_DATA[Math.floor(Math.random() * MESSAGE_DATA.length)];
  });
  
  const [message, setMessage] = useState(() => selectedData.content);
  const [showMessage, setShowMessage] = useState(initialStage === "blooming");
  const [typewriterText, setTypewriterText] = useState("");
  const [showStar, setShowStar] = useState(initialStage === "blooming");
  const [showArrow, setShowArrow] = useState(initialStage === "blooming");
  const [isLiked, setIsLiked] = useState(() => {
    // 从路由参数读取同频状态，确保正确转换
    if (initialLiked === "true") return true;
    if (initialLiked === "false") return false;
    return false; // 默认状态
  });
  const [successText, setSuccessText] = useState(""); // 成功文字状态
  
  // 生成随机碎星编号和时间
  const [starNumber, setStarNumber] = useState(() => initialStarNumber ? parseInt(initialStarNumber) : Math.floor(Math.random() * 1000));
  const [minutesAgo, setMinutesAgo] = useState(() => Math.floor(Math.random() * 60) + 1); // 1-60分钟前
  const [tags, setTags] = useState(() => selectedData.tags);

  // 获取路由函数
  const router = useRouter();
  
  // 按钮点击处理函数
  const handleLikeToggle = () => {
    const newLikedState = !isLiked;
    setIsLiked(newLikedState);
    
    // 更新路由参数以持久化同频状态
    router.navigate({
      to: "/shiguang",
      search: {
        stage: stage,
        starNumber: starNumber.toString(),
        message: message,
        liked: newLikedState.toString()
      }
    });
  };

  const handleReCatch = () => {
    // 重新生成新的卡片数据
    const newData = MESSAGE_DATA[Math.floor(Math.random() * MESSAGE_DATA.length)];
    const newStarNumber = Math.floor(Math.random() * 1000);
    const newMinutesAgo = Math.floor(Math.random() * 60) + 1;
    
    setSelectedData(newData);
    setMessage(newData.content);
    // 更新标签状态
    setTags(newData.tags);
    
    // 重置所有状态回到seeking阶段（但不清空typewriterText，让动画正常播放）
    setStage("seeking");
    setShowMessage(false);
    setShowStar(false);
    setShowArrow(false);
    setIsLiked(false); // 重置爱心状态
    setSuccessText("");
    
    // 重新生成碎星序号和时间
    setStarNumber(newStarNumber);
    setMinutesAgo(newMinutesAgo);
    
    // 更新URL参数，移除liked状态让新卡片重新开始
    router.navigate({
      to: "/shiguang",
      search: {
        stage: "seeking",
        starNumber: newStarNumber.toString(),
        message: newData.content,
        liked: "false" // 重置liked状态
      }
    });
  };

  
    
  // 动画控制状态
  const [showHeaderInfo, setShowHeaderInfo] = useState(initialStage === "blooming");
  const [visibleTags, setVisibleTags] = useState<number[]>(initialStage === "blooming" ? [0, 1, 2] : []);
  const [displayMessage, setDisplayMessage] = useState(initialStage === "blooming" ? message : "");

  useEffect(() => {
    if (stage === "seeking" && initialStage !== "blooming") {
      // 阶段1: 寻星 (0-5秒)
      const timer1 = setTimeout(() => {
        setStage("touching");
      }, 5000);
      return () => clearTimeout(timer1);
    }
  }, [stage, initialStage]);

  // 打字机效果
  useEffect(() => {
    if (stage === "seeking") {
      // 重置打字机文本
      setTypewriterText("");
      const text = "正在为你捕获一颗遥远的星...";
      let index = 0;
      const timer = setInterval(() => {
        if (index < text.length) {
          setTypewriterText(text.substring(0, index + 1));
          index++;
        } else {
          clearInterval(timer);
        }
      }, 250);
      return () => clearInterval(timer);
    }
  }, [stage]);

  // 捕获成功文字打字机效果
  useEffect(() => {
    if (stage === "touching") {
      setSuccessText("");
      setShowStar(false);
      setShowArrow(false);
      
      const text = "捕获成功。";
      let index = 0;
      const timer = setInterval(() => {
        if (index < text.length) {
          setSuccessText(text.substring(0, index + 1));
          index++;
        } else {
          clearInterval(timer);
          // 文字显示完毕后显示星星
          setTimeout(() => {
            setShowStar(true);
            // 脉冲动画完成后显示箭头
            setTimeout(() => {
              setShowArrow(true);
            }, 2000); // 2秒脉冲动画
          }, 500);
        }
      }, 200); // 成功文字稍快一些
      return () => clearInterval(timer);
    }
  }, [stage]);

  return (
    <PageShell title="拾光" subtitle="看看来自其他碎星的记录">
      {/* 阶段1: 寻星 - 流星雨 */}
      {stage === "seeking" && (
        <div className="absolute inset-0 z-20 transition-opacity duration-1000 ease-in-out">
          {/* 多条流星 */}
          {[...Array(3)].map((_, i) => (
            <span
              key={i}
              aria-hidden
              className="pointer-events-none absolute w-24 h-[1px] bg-gradient-to-r from-transparent via-white to-transparent"
              style={{
                top: "0",
                left: "0",
                animation: "meteor-short 3s linear",
                animationDelay: `${i * 1.5}s`,
              }}
            />
          ))}
          
          {/* 打字机文字 */}
          <div className="absolute top-1/3 left-1/2 -translate-x-1/2 text-center">
            <p className="text-lg tracking-[0.3em] text-white/80 font-cn">
              {typewriterText}
              <span className="animate-pulse">|</span>
            </p>
          </div>
        </div>
      )}

      {/* 阶段2: 触碰 - 脉冲和涟漪效果 */}
      {stage === "touching" && (
        <div className="absolute inset-0 z-20 transition-opacity duration-1000 ease-in-out">
          {/* 提示文字 - 打字机效果 */}
          <div className="absolute top-1/5 left-1/2 -translate-x-1/2 text-center">
            <p className="text-lg tracking-[0.3em] text-white/80 font-cn">
              {successText}
              <span className="animate-pulse">|</span>
            </p>
          </div>

          {/* 呼吸脉冲的星星 */}
          {showStar && (
            <div
              className="absolute w-4 h-4 bg-white rounded-full cursor-pointer hover:scale-110 transition-transform"
              style={{
                left: "50%",
                top: "calc(20% + 140px)",
                transform: "translateX(-50%)",
                boxShadow: "0 0 30px rgba(255,255,255,0.8)",
                animation: "pulse 2s ease-in-out",
              }}
              onClick={() => {
                setStage("blooming");
                // Step 1: 显示碎星和时间 (1s后)
                setTimeout(() => setShowHeaderInfo(true), 1000);
                // Step 2: 逐个显示标签 (每个标签间隔1s)
                setTimeout(() => {
                  tags.forEach((_, index) => {
                    setTimeout(() => {
                      setVisibleTags(prev => [...prev, index]);
                    }, index * 1000);
                  });
                }, 2000);
                // Step 3: 打字机显示消息内容 (所有标签显示完后)
                setTimeout(() => {
                  setDisplayMessage(message);
                }, 2000 + (tags.length * 1000));
              }}
            />
          )}
          
          {/* 涟漪效果 */}
          {showStar && (
            <div
              className="absolute border border-white/20 rounded-full pointer-events-none"
              style={{
                left: "50%",
                top: "calc(20% + 140px)",
                width: "100px",
                height: "100px",
                transform: "translate(-50%, -50%)",
                animation: "ripple 2s ease-out forwards",
              }}
            />
          )}

          {/* 浮动箭头 - 指向星星 */}
          {showArrow && (
            <div
              className="absolute left-1/2 -translate-x-1/2 text-white text-2xl"
              style={{
                top: "calc(20% + 100px)",
                animation: "float 2s ease-in-out infinite",
              }}
            >
              ↓
            </div>
          )}
        </div>
      )}

      {/* 阶段3: 绽放 - 星星展开成卡片 */}
      {stage === "blooming" && (
        <div className="absolute inset-0 z-20 transition-opacity duration-1000 ease-in-out">
          <div
            className="absolute w-80 max-w-[90vw] bg-white/5 backdrop-blur-md border border-white/10 rounded-xl p-6"
            style={{
              left: "50%",
              top: "calc(20% + 70px)",
              transform: "translate(-50%, -50%)",
              animation: "expand 1s cubic-bezier(0.4, 0, 0.2, 1) forwards",
              maxHeight: "400px", // 设置最大高度
              minHeight: "auto",   // 最小高度自适应
            }}
          >
            {/* 左上角碎星编号 */}
            <div 
              className="absolute top-4 left-4 text-white/60 font-cn text-sm"
              style={{
                opacity: showHeaderInfo ? 1 : 0,
                transition: "opacity 1s ease-in",
              }}
            >
              碎星#{starNumber}
            </div>
            
            {/* 右上角时间 */}
            <div 
              className="absolute top-4 right-4 text-white/60 font-cn text-sm"
              style={{
                opacity: showHeaderInfo ? 1 : 0,
                transition: "opacity 1s ease-in",
              }}
            >
              {minutesAgo}分钟前
            </div>
            
            {/* 留言内容 - 可滚动 */}
            <div 
              className="mt-8 overflow-y-auto"
              style={{
                maxHeight: "300px", // 内容区域最大高度
                scrollbarWidth: "thin",
                scrollbarColor: "rgba(255, 255, 255, 0.3) rgba(255, 255, 255, 0.1)",
              }}
            >
              {displayMessage && (
                <p
                  className="text-[15px] leading-relaxed text-white font-cn"
                  style={{
                    animation: "fadeIn 1s ease-in forwards",
                  }}
                >
                  {message}
                </p>
              )}
            </div>
            
            {/* 标签部分 - 不在滑动区域内 */}
            {tags.length > 0 && (
              <div className="flex flex-wrap gap-2 mt-4">
                {tags.map((tag, index) => (
                  <span
                    key={index}
                    className="bg-white/10 text-white/80 rounded-full px-3 py-1 text-xs border border-white/30"
                    style={{
                      opacity: visibleTags.includes(index) ? 1 : 0,
                      transition: "opacity 0.5s ease-in",
                    }}
                  >
                    #{tag}
                  </span>
                ))}
              </div>
            )}
            
            </div>
          
          {/* 操作按钮 - 卡片外部 */}
          {displayMessage && (
            <div className="absolute left-1/2 -translate-x-1/2 flex flex-col items-center gap-4" style={{ top: "calc(20% + 70px + 230px)" }}>
              <button 
                onClick={handleLikeToggle}
                className="text-white hover:text-white/80 transition-colors duration-200 text-base font-cn"
              >
                同频{isLiked ? "❤️" : "🤍"}
              </button>
              <Link
                to="/message"
                search={{
                  star: `碎星#${starNumber}`,
                  content: message,
                  tags: tags.join(","),
                  from: "shiguang",
                  liked: isLiked.toString()
                }}
                className="text-white hover:text-white/80 transition-colors duration-200 text-base font-cn"
              >
                留言→
              </Link>
              <button 
                onClick={handleReCatch}
                className="text-white hover:text-white/80 transition-colors duration-200 text-base font-cn"
              >
                ←再摘一颗
              </button>
            </div>
          )}
        </div>
      )}

          </PageShell>
  );
}
