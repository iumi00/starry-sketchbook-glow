import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useState, useEffect } from "react";
import { PageShell } from "@/components/PageShell";
import { Textarea } from "@/components/ui/textarea";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { addUserRecordToTrail } from "@/data/starMemories";
import "@/styles/animations.css";

// 同步留言到星轨详情页面
const syncCommentsToTrail = (starRecordId: number, comments: Array<{from: string, text: string, time: number}>) => {
  try {
    // 获取现有的星轨留言数据
    const trailComments = localStorage.getItem('trailComments');
    let commentsData: { [key: number]: Array<{from: string, text: string, time: number}> } = {};
    
    if (trailComments) {
      try {
        commentsData = JSON.parse(trailComments);
      } catch (error) {
        console.error('解析星轨留言数据失败:', error);
        commentsData = {};
      }
    }
    
    // 添加新留言到对应记录
    if (!commentsData[starRecordId]) {
      commentsData[starRecordId] = [];
    }
    
    commentsData[starRecordId] = [...commentsData[starRecordId], ...comments];
    
    // 保存到localStorage
    localStorage.setItem('trailComments', JSON.stringify(commentsData));
    console.log('成功同步留言到星轨详情页面');
  } catch (error) {
    console.error('同步留言到星轨详情页面失败:', error);
  }
};

// 添加AI回复到回声
const addAIReplyToEcho = (userContent: string) => {
  // 获取最新的用户星轨记录ID
  const getUserStarRecordId = () => {
    const userStarRecords = localStorage.getItem('userStarRecords');
    if (userStarRecords) {
      try {
        const records = JSON.parse(userStarRecords);
        return records.length > 0 ? records[0].id : null;
      } catch (error) {
        console.error('解析用户星轨记录失败:', error);
        return null;
      }
    }
    return null;
  };
  // 特殊留言检测
  const specialContent = "期末成绩出了。复习了整整一个月，每天泡图书馆，笔记记了三本，真题刷了两遍。结果一看分数，比那些只复习了一周的人还低。不是没努力，是真的使不上劲。就像站在一堵透明的墙前面，能看见对面，但怎么都穿不过去。不想发朋友圈，怕我妈打电话来问\"是不是没好好学\"。也不敢跟室友说，她们都考得还行，我一开口就像在找借口。现在一个人坐在食堂角落，饭凉了也不想吃。心里堵着一团东西，吐不出来也咽不下去。就是觉得很委屈。不是委屈分数低，是委屈自己明明那么用力了，却好像一点用都没有。算了，我好累。";
  
  // 检查是否为特殊留言
  console.log("用户输入内容:", userContent);
  console.log("特殊内容:", specialContent);
  console.log("是否匹配:", userContent.trim() === specialContent);
  
  // 使用关键内容匹配方式：检查是否包含关键特征
  const isSpecialContent = userContent.includes("期末成绩出了") && 
                         userContent.includes("复习了整整一个月") &&
                         userContent.includes("比那些只复习了一周的人还低") &&
                         userContent.includes("不是没努力，是真的使不上劲") &&
                         userContent.includes("站在一堵透明的墙前面") &&
                         userContent.includes("不想发朋友圈，怕我妈打电话来问") &&
                         userContent.includes("就是觉得很委屈") &&
                         userContent.includes("算了，我好累");
  
  console.log("关键内容匹配结果:", isSpecialContent);
  
  if (isSpecialContent) {
    console.log("触发特殊回复！");
    // 特殊回复：所有星空过客 + 碎星回复
    const specialReplies = [
      // 所有星空过客的回复
      {
        from: "🧣 星空过客 · 【晚风学姐】",
        text: "抱抱你呀。大学这段时间确实很容易像在迷雾里走路一样，觉得什么都抓不住。但我看到你为了不挂科通宵复习，你已经很棒、很努力了！允许自己偶尔当个没有灵魂的 NPC 休息一下吧，学姐的怀抱随时为你敞开 ✨",
      },
      {
        from: "🧭 星空过客 · 【坐标系里的猫】",
        text: "其实从概率学上来说，人生 80% 的烦恼在五年后看都不值一提。你现在觉得很卷、很累，是因为视距太近了。把自己想象成南极冰原上的一只企鹅，那些所谓的'意义'都是人类定义的，你只需要顺着自己的心意去游泳就好了 ✨",
      },
      {
        from: "🎸 星空过客 · 【脱轨的流星】",
        text: "去他的绩点和考核！你今天能好好喘口气就已经很牛了！这帮人天天卷，咱不跟他们玩。实在学不进去就干脆别学了，今晚早点睡，明天去吃顿最贵的，天塌下来有流星顶着！✨",
      },
      {
        from: "☕ 星空过客 · 【凌晨三点的打工人】",
        text: "看到你的话，想起了我大三找实习那个疯狂掉头发的秋天。现在的我在写字楼里喝着苦咖啡，回头看，其实那时的每一次碰壁都是在排除错误选项。深呼吸，不用焦虑，一切都会在未来的某一天完美闭环 ✨",
      },
      {
        from: "✒️ 星空过客 · 【深海拾光者】",
        text: "你的情绪像是一片落在南极冰面上的雪花，很轻，但我接住了。不用急着走出来，难过也是一种很珍贵的体验。我把你这颗灰暗的星星擦亮了，挂在最高的地方，今晚，它只为你闪烁 ✨",
      },
      {
        from: "🦉 星空过客 · 【不睡觉的猫头鹰】",
        text: "又在深夜emo啦？知道你今天很累了，但抱怨完之后，明天还是得爬起来去图书馆占座哦。现在的挣扎都是为了以后能自由地飞。擦干眼泪，我陪你再熬过这个极夜 ✨",
      },
      {
        from: "✈️ 星空过客 · 【跨时空熬夜党】",
        text: "哈哈，刚好我这边是白天，接到你的电波啦。其实不仅是你，我在国外每天赶 Due 的时候也觉得像个无情的机器。别把自己逼太紧了，南极的极夜很长，但我这边的太阳已经升起来了，分你一点阳光 ☀️",
      },
      // 随机碎星编号的回复
      {
        from: "碎星 #287",
        text: "大二上学期我挂了一门，补考才过。现在回头看，那门课跟人生一点关系都没有。没事的。",
      },
      {
        from: "碎星 #156",
        text: "总有人考得比我好。以前会嫉妒，现在只想说：管他呢，我努力过就行了。你也一样。",
      },
      {
        from: "碎星 #423",
        text: "我复习了整整一个月，考完对答案觉得稳了，出分比预估低了15分。我已力竭，但还能吃两碗饭。",
      },
      {
        from: "碎星 #789",
        text: "成绩这玩意儿，过了就行。你现在最该做的是去超市买盒冰淇淋，坐马路牙子上吃完。",
      },
      {
        from: "碎星 #512",
        text: "考研复习到一半看到你这条。我突然觉得，期末考砸也没什么，反正考研才是大boss。",
      },
      {
        from: "碎星 #123",
        text: "工作以后发现，没人问你期末考了多少分。你那时候的努力，只有你自己知道。够了。",
      },
      {
        from: "碎星 #456",
        text: "看到你发的，想起我上学期也这样。后来我给自己买了一束花，放桌上，心情就好了。试试看。",
      },
      {
        from: "碎星 #234",
        text: "数据不会骗人，但考试会。你这一个月没白学，下次换个方法。",
      },
      {
        from: "碎星 #567",
        text: "我知道那种\"努力了但没用\"的感觉，像一拳打在棉花上。别打自己了，打棉花吧。",
      },
      {
        from: "碎星 #890",
        text: "我训练的时候也有过，练了三个月，成绩一点没涨。后来教练说：有些努力是在打地基。你也是。",
      },
      {
        from: "碎星 #345",
        text: "隔着屏幕抱抱你。虽然我们没见过，但我知道你是个认真的人。认真的人不会一直输。",
      },
    ];
    
    // 获取现有用户回声
    const userEchoes = localStorage.getItem('userEchoes');
    let echoList = [];
    
    if (userEchoes) {
      try {
        echoList = JSON.parse(userEchoes);
      } catch (error) {
        console.error('解析用户回声失败:', error);
        echoList = [];
      }
    }
    
    // 添加所有特殊回复到开头
    specialReplies.forEach(reply => {
      const newEcho = {
        from: reply.from,
        when: "刚刚",
        your: userContent,
        text: reply.text,
        publishTime: new Date().getTime()
      };
      echoList.unshift(newEcho);
    });
    
    // 保存到localStorage
    localStorage.setItem('userEchoes', JSON.stringify(echoList));
    
    // 同步到星轨详情页面
    const starRecordId = getUserStarRecordId();
    console.log("星轨记录ID:", starRecordId);
    if (starRecordId !== null) {
      const commentsToSync = specialReplies.map(reply => ({
        from: reply.from,
        text: reply.text,
        time: new Date().getTime()
      }));
      console.log("要同步的留言:", commentsToSync);
      syncCommentsToTrail(starRecordId, commentsToSync);
    } else {
      console.log("没有找到星轨记录ID，无法同步留言");
    }
    
    return specialReplies[0]; // 返回第一个回复
  }
  
  // 普通AI回复模板
  const AI_REPLIES = [
    {
      from: "🧣 星空过客 · 【晚风学姐】",
      text: "抱抱你呀。大学这段时间确实很容易像在迷雾里走路一样，觉得什么都抓不住。但我看到你为了不挂科通宵复习，你已经很棒、很努力了！允许自己偶尔当个没有灵魂的 NPC 休息一下吧，学姐的怀抱随时为你敞开 ✨",
    },
    {
      from: "🧭 星空过客 · 【坐标系里的猫】",
      text: "其实从概率学上来说，人生 80% 的烦恼在五年后看都不值一提。你现在觉得很卷、很累，是因为视距太近了。把自己想象成南极冰原上的一只企鹅，那些所谓的'意义'都是人类定义的，你只需要顺着自己的心意去游泳就好了 ✨",
    },
    {
      from: "🎸 星空过客 · 【脱轨的流星】",
      text: "去他的绩点和考核！你今天能好好喘口气就已经很牛了！这帮人天天卷，咱不跟他们玩。实在学不进去就干脆别学了，今晚早点睡，明天去吃顿最贵的，天塌下来有流星顶着！✨",
    },
    {
      from: "☕ 星空过客 · 【凌晨三点的打工人】",
      text: "看到你的话，想起了我大三找实习那个疯狂掉头发的秋天。现在的我在写字楼里喝着苦咖啡，回头看，其实那时的每一次碰壁都是在排除错误选项。深呼吸，不用焦虑，一切都会在未来的某一天完美闭环 ✨",
    },
    {
      from: "✒️ 星空过客 · 【深海拾光者】",
      text: "你的情绪像是一片落在南极冰面上的雪花，很轻，但我接住了。不用急着走出来，难过也是一种很珍贵的体验。我把你这颗灰暗的星星擦亮了，挂在最高的地方，今晚，它只为你闪烁 ✨",
    },
    {
      from: "🦉 星空过客 · 【不睡觉的猫头鹰】",
      text: "又在深夜emo啦？知道你今天很累了，但抱怨完之后，明天还是得爬起来去图书馆占座哦。现在的挣扎都是为了以后能自由地飞。擦干眼泪，我陪你再熬过这个极夜 ✨",
    },
    {
      from: "✈️ 星空过客 · 【跨时空熬夜党】",
      text: "哈哈，刚好我这边是白天，接到你的电波啦。其实不仅是你，我在国外每天赶 Due 的时候也觉得像个无情的机器。别把自己逼太紧了，南极的极夜很长，但我这边的太阳已经升起来了，分你一点阳光 ☀️",
    },
  ];
  
  // 随机选择一个AI回复
  const randomReply = AI_REPLIES[Math.floor(Math.random() * AI_REPLIES.length)];
  
  const newEcho = {
    from: randomReply.from,
    when: "刚刚",
    your: userContent,
    text: randomReply.text,
    publishTime: new Date().getTime() // 记录发布时间
  };
  
  // 获取现有用户回声
  const userEchoes = localStorage.getItem('userEchoes');
  let echoList = [];
  
  if (userEchoes) {
    try {
      echoList = JSON.parse(userEchoes);
    } catch (error) {
      console.error('解析用户回声失败:', error);
      echoList = [];
    }
  }
  
  // 添加新回声到开头
  echoList.unshift(newEcho);
  
  // 保存到localStorage
  localStorage.setItem('userEchoes', JSON.stringify(echoList));
  
  // 同步到星轨详情页面
  const starRecordId = getUserStarRecordId();
  console.log("普通回复 - 星轨记录ID:", starRecordId);
  if (starRecordId !== null) {
    const commentToSync = {
      from: randomReply.from,
      text: randomReply.text,
      time: new Date().getTime()
    };
    console.log("普通回复 - 要同步的留言:", commentToSync);
    syncCommentsToTrail(starRecordId, [commentToSync]);
  } else {
    console.log("普通回复 - 没有找到星轨记录ID，无法同步留言");
  }
  
  return newEcho;
};

export const Route = createFileRoute("/carve")({
  head: () => ({ meta: [{ title: "刻录 · 同频未署名" }] }),
  component: Carve,
});

type Stage = "writing" | "paper" | "shrinking" | "meteor" | "message" | "final" | "navigation" | "ai-identifying" | "star-preference";

function Carve() {
  const [text, setText] = useState("");
  const [stage, setStage] = useState<Stage>("writing");
  const [tags, setTags] = useState<string[]>([]);
  const [newTag, setNewTag] = useState("");
  const [showTagDialog, setShowTagDialog] = useState(false);
  const [editingTagIndex, setEditingTagIndex] = useState<number | null>(null);
  const [useAIRecognition, setUseAIRecognition] = useState(false);
  const [showCrisisModal, setShowCrisisModal] = useState(false);
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState("");
  const [crisisTitle, setCrisisTitle] = useState("");
  const [showCrisisContent, setShowCrisisContent] = useState(false);
  const [starPreference, setStarPreference] = useState<string[]>([]);
  const navigate = useNavigate();
  
  // 获取今日代号（与右上角保持一致）
  const [currentCode, setCurrentCode] = useState<string>("碎星 #···");
  const [starCount, setStarCount] = useState<number>(0);
  const [similarCardCount, setSimilarCardCount] = useState<number>(3); // 默认3张卡片
  
  useEffect(() => {
    // 获取今日代号
    const stored = Number(sessionStorage.getItem("dailyCode") ?? 0);
    if (stored) {
      setCurrentCode(`碎星 #${String(stored).padStart(3, "0")}`);
      setStarCount(stored);
    } else {
      const n = Math.floor(Math.random() * 900) + 100;
      sessionStorage.setItem("dailyCode", String(n));
      setCurrentCode(`碎星 #${String(n).padStart(3, "0")}`);
      setStarCount(n);
    }
    
    // 获取相似页面的卡片数量
    const cardCount = Number(sessionStorage.getItem("similarCardCount") ?? 3);
    setSimilarCardCount(cardCount);
  }, []);
  
  // 获取当前时间
  const getCurrentTime = () => {
    const now = new Date();
    const year = now.getFullYear();
    const month = String(now.getMonth() + 1).padStart(2, '0');
    const day = String(now.getDate()).padStart(2, '0');
    const hours = String(now.getHours()).padStart(2, '0');
    const minutes = String(now.getMinutes()).padStart(2, '0');
    return `${year}.${month}.${day} ${hours}:${minutes}`;
  };
  
  // Typewriter effect states
  const [displayText1, setDisplayText1] = useState("");
  const [displayText2, setDisplayText2] = useState("");
  const [displayText3, setDisplayText3] = useState("");
  const [displayText4, setDisplayText4] = useState("");
  const [displayText5, setDisplayText5] = useState("");
  
  // Final message states
  const [displayText6, setDisplayText6] = useState("");
  
  // Typewriter effect function
  const typeWriter = (text: string, setter: (value: string) => void, delay: number) => {
    let index = 0;
    const timer = setInterval(() => {
      if (index < text.length) {
        setter(text.substring(0, index + 1));
        index++;
      } else {
        clearInterval(timer);
      }
    }, delay);
    return timer;
  };

  // 安全检查函数
  const checkSafety = (content: string): { safe: boolean; type: 'crisis' | 'profanity' | 'ad' | null } => {
    // 危机词汇检测
    const crisisWords = ['死', '不想活了', '绝望', '抑郁'];
    const hasCrisis = crisisWords.some(word => content.includes(word));
    
    if (hasCrisis) {
      return { safe: false, type: 'crisis' };
    }
    
    // 脏话词汇检测
    const profanityWords = ['傻逼', '他妈的', '贱人'];
    const hasProfanity = profanityWords.some(word => content.includes(word));
    
    if (hasProfanity) {
      return { safe: false, type: 'profanity' };
    }
    
    // 广告词汇检测
    const adWords = ['加微', '代写', '兼职'];
    const hasAd = adWords.some(word => content.includes(word));
    
    if (hasAd) {
      return { safe: false, type: 'ad' };
    }
    
    return { safe: true, type: null };
  };

  const handleSend = () => {
    if (!text.trim()) return;
    
    // 安全检查
    const safetyCheck = checkSafety(text.trim());
    
    if (!safetyCheck.safe) {
      switch (safetyCheck.type) {
        case 'crisis':
          setCrisisTitle("");
          setShowCrisisContent(false);
          setShowCrisisModal(true);
          // 开始打字机效果
          setTimeout(() => {
            typeWriter("🌅 曙光女神路过", setCrisisTitle, 100);
          }, 100);
          // 标题显示完毕后显示内容
          setTimeout(() => {
            setShowCrisisContent(true);
          }, 2000);
          return;
        case 'profanity':
          setToastMessage('🛡️ 星空巡护员提醒您：\n南极的星空需要纯净，请换个温柔一点的词语抛出吧 ✨');
          setShowToast(true);
          setTimeout(() => setShowToast(false), 3000);
          return;
        case 'ad':
          setToastMessage('🚑 极光信使检测到：\n电波中含有未知杂音，发送失败。');
          setShowToast(true);
          setTimeout(() => setShowToast(false), 3000);
          return;
      }
    }
    
    // 立即匹配相似留言并确定星星数量
    const userInput = text.trim();
    let similarCount = 0; // 默认数量（如果没有匹配到相似留言则为0）
    
    // 检测是否包含迷茫相关的关键词
    const confusionKeywords = ['迷茫', '不知道', '以后', '干嘛', '方向', '未来', '焦虑', '选择', '路', '怎么办'];
    const hasConfusionKeywords = confusionKeywords.some(keyword => userInput.includes(keyword));
    
    // 检测是否包含分手失落相关的关键词
    const breakupKeywords = ['分手', '失恋', '分开', '结束', '空空的', '空虚', '失落', '难过', '心痛', '舍不得'];
    const hasBreakupKeywords = breakupKeywords.some(keyword => userInput.includes(keyword));
    
    // 检测是否包含人际困扰烦躁相关的关键词
    const interpersonalKeywords = ['室友', '吵', '烦', '烦躁', '困扰', '环境', '不适', '噪音', '影响', '安静'];
    const hasInterpersonalKeywords = interpersonalKeywords.some(keyword => userInput.includes(keyword));
    
    // 检测是否包含期末压力崩溃相关的关键词
    const examStressKeywords = ['期末', '期末周', '崩溃', '压力', '考试', '复习', '挂科', '焦虑', '自我否定', '撑不住', '学不动'];
    const hasExamStressKeywords = examStressKeywords.some(keyword => userInput.includes(keyword));
    
    // 检测是否包含治愈积极情绪相关的关键词
    const positiveKeywords = ['天气很好', '心情不错', '开心', '高兴', '快乐', '治愈', '美好', '阳光', '温暖', '幸福', '愉快', '舒服'];
    const hasPositiveKeywords = positiveKeywords.some(keyword => userInput.includes(keyword));
    
    // 检测是否包含自我否定低自尊相关的关键词
    const selfNegationKeywords = ['什么都做不好', '自我否定', '无力感', '低自尊', '没用', '废物', '失败', '做不好', '不行', '做不到', '很差', '糟糕'];
    const hasSelfNegationKeywords = selfNegationKeywords.some(keyword => userInput.includes(keyword));
    
    // 检测是否包含孤独自洽相关的关键词
    const solitudeKeywords = ['一个人', '也挺好', '孤独', '自洽', '平静接受', '独处', '安静', '自在', '享受', '一个人也挺好的'];
    const hasSolitudeKeywords = solitudeKeywords.some(keyword => userInput.includes(keyword));
    
    // 检测是否包含友情疏离感相关的关键词
    const friendshipKeywords = ['朋友', '疏远', '友情', '疏离感', '困惑', '远离', '冷淡', '不联系', '陌生', '距离', '变了', '好像'];
    const hasFriendshipKeywords = friendshipKeywords.some(keyword => userInput.includes(keyword));
    
    // 检测是否包含价值观冲突相关的关键词
    const valueConflictKeywords = ['不想考研', '想做喜欢的事', '价值观冲突', '热爱与现实', '格格不入', '不想', '喜欢的事', '现实', '理想', '追求', '放弃'];
    const hasValueConflictKeywords = valueConflictKeywords.some(keyword => userInput.includes(keyword));
    
    // 检测是否包含家庭变故学业打击相关的关键词
    const familyCrisisKeywords = ['家里出事', '学业也挂了', '家庭变故', '学业打击', '绝望感', '挂科', '家里', '出事', '失败', '完蛋了', '亲人', '去世', '工作', '找不到'];
    const hasFamilyCrisisKeywords = familyCrisisKeywords.some(keyword => userInput.includes(keyword));
    
    // 检测是否包含挫败权威伤害相关的关键词
    const frustrationKeywords = ['被老师否定', '很难受', '挫败', '权威伤害', '无力反抗', '否定', '打击', '失败', '搞砸', '拒绝', '批评', '不公平'];
    const hasFrustrationKeywords = frustrationKeywords.some(keyword => userInput.includes(keyword));
    
    // 检测是否包含逃离自由向往相关的关键词
    const escapeKeywords = ['想出去旅行', '散散心', '逃离', '自由向往', '治愈', '旅行', '出去', '散心', '放松', '远方', '自由', '治愈'];
    const hasEscapeKeywords = escapeKeywords.some(keyword => userInput.includes(keyword));
    
    // 检测是否包含自我成长内在力量相关的关键词
    const growthKeywords = ['感觉自己变强大了', '自我成长', '和解', '内在力量', '变强大', '成长', '强大', '内在', '力量', '和解', '目标'];
    const hasGrowthKeywords = growthKeywords.some(keyword => userInput.includes(keyword));
    
    // 检测是否包含野心动力搞钱相关的关键词
    const ambitionKeywords = ['想赚钱', '搞钱', '野心', '动力', '赚钱', '搞钱', '钱', '赚钱', '事业', '成功', '目标', '奋斗'];
    const hasAmbitionKeywords = ambitionKeywords.some(keyword => userInput.includes(keyword));
    
    // 检测是否包含怀旧回忆相关的关键词
    const nostalgiaKeywords = ['深夜睡不着', '想从前', '怀旧', '回忆', '从前', '小时候', '过去', '曾经', '回忆', '想念', '从前', '深夜'];
    const hasNostalgiaKeywords = nostalgiaKeywords.some(keyword => userInput.includes(keyword));
    
    // 检测是否包含努力无果隐形天花板相关的关键词（最高优先级）
    const effortNoResultKeywords = ['期末成绩', '复习了整整一个月', '每天泡图书馆', '笔记记了三本', '真题刷了两遍', '分数比那些只复习了一周的人还低', '不是没努力', '真的使不上劲', '透明的墙', '能看见对面', '怎么都穿不过去', '不想发朋友圈', '怕我妈打电话来', '不敢跟室友说', '她们都考得还行', '一开口就像在找借口', '一个人坐在食堂角落', '饭凉了也不想吃', '心里堵着一团东西', '吐不出来也咽不下去', '觉得很委屈', '委屈自己明明那么用力了', '一点用都没有', '我好累'];
    const hasEffortNoResultKeywords = effortNoResultKeywords.some(keyword => userInput.includes(keyword));
    
    if (hasEffortNoResultKeywords) {
      similarCount = 7; // 努力无果隐形天花板有7条留言
    } else if (hasConfusionKeywords) {
      similarCount = 5; // 迷茫情绪有5条留言
    } else if (hasBreakupKeywords) {
      similarCount = 4; // 分手失落有4条留言
    } else if (hasExamStressKeywords) {
      similarCount = 5; // 期末压力崩溃有5条留言
    } else if (hasPositiveKeywords) {
      similarCount = 5; // 治愈积极情绪有5条留言
    } else if (hasSelfNegationKeywords) {
      similarCount = 4; // 自我否定低自尊有4条留言
    } else if (hasSolitudeKeywords) {
      similarCount = 5; // 孤独自洽有5条留言
    } else if (hasFriendshipKeywords) {
      similarCount = 4; // 友情疏离感有4条留言
    } else if (hasValueConflictKeywords) {
      similarCount = 5; // 价值观冲突有5条留言
    } else if (hasFamilyCrisisKeywords) {
      similarCount = 4; // 家庭变故学业打击有4条留言
    } else if (hasFrustrationKeywords) {
      similarCount = 5; // 挫败权威伤害有5条留言
    } else if (hasEscapeKeywords) {
      similarCount = 5; // 逃离自由向往有5条留言
    } else if (hasGrowthKeywords) {
      similarCount = 5; // 自我成长内在力量有5条留言
    } else if (hasAmbitionKeywords) {
      similarCount = 5; // 野心动力搞钱有5条留言
    } else if (hasNostalgiaKeywords) {
      similarCount = 5; // 怀旧回忆有5条留言
    } else if (hasInterpersonalKeywords) {
      similarCount = 3; // 人际困扰有3条留言
    }
    
    // 立即保存相似留言数量到sessionStorage
    sessionStorage.setItem("similarCardCount", String(similarCount));
    console.log("立即设置相似留言数量:", similarCount); // 调试信息
    
    // Reset typewriter text
    setDisplayText1("");
    setDisplayText2("");
    setDisplayText3("");
    setDisplayText4("");
    setDisplayText5("");
    setDisplayText6("");
    
    // 保存投星范围偏好到sessionStorage（如果没有选择则使用默认"全宇宙"）
    const finalPreference = starPreference.length > 0 ? starPreference : ["全宇宙"];
    sessionStorage.setItem("starPreference", JSON.stringify(finalPreference));
    console.log("保存投星范围偏好:", finalPreference); // 调试信息
    
    // 同步到星轨时间轴
    try {
      const userTags = tags.length > 0 ? tags : [];
      addUserRecordToTrail(text.trim(), userTags);
      console.log("成功同步到星轨时间轴"); // 调试信息
    } catch (error) {
      console.error("同步到星轨时间轴失败:", error); // 调试信息
    }
    
    // 同步到回声页面
    try {
      addAIReplyToEcho(text.trim());
      console.log("成功同步到回声页面"); // 调试信息
    } catch (error) {
      console.error("同步到回声页面失败:", error); // 调试信息
    }
    
    // 开始动画流程
    setStage("paper");
    // 显示纸张 4 秒
    setTimeout(() => {
      setStage("shrinking");
      // 缩小动画 2 秒
      setTimeout(() => {
        setStage("meteor");
        // 流星动画 4 秒
        setTimeout(() => {
          setStage("message");
          // Start typewriter effect
          setTimeout(() => {
            typeWriter(currentCode, setDisplayText1, 150);
            setTimeout(() => {
              typeWriter("你的记录已投向极夜星河", setDisplayText2, 150);
              setTimeout(() => {
                typeWriter("极夜终将结束", setDisplayText3, 150);
                setTimeout(() => {
                  typeWriter("......", setDisplayText4, 200);
                  setTimeout(() => {
                    typeWriter(getCurrentTime(), setDisplayText5, 100);
                    // After message complete, wait 2s then fade out
                    setTimeout(() => {
                      setStage("final");
                      // Fade out and show new message
                      setTimeout(() => {
                        setStage("navigation");
                        // Start final message typewriter
                        setTimeout(() => {
                          // 动态获取最新的相似留言数量
                          const currentSimilarCount = Number(sessionStorage.getItem("similarCardCount") ?? 0);
                          console.log("刻录页面获取similarCardCount:", currentSimilarCount); // 调试信息
                          
                          // 根据相似记录数量显示不同的消息
                          if (currentSimilarCount === 0) {
                            typeWriter(`守夜人发现，\n这是第一颗记录这种感受的碎星，\n感谢你照亮了这里。`, setDisplayText6, 100);
                          } else {
                            typeWriter(`守夜人发现\n在过去\n有${currentSimilarCount}颗星星与你有相似的记录。`, setDisplayText6, 100);
                          }
                        }, 500);
                      }, 2000);
                    }, 2000);
                  }, 1000);
                }, 2500);
              }, 2500);
            }, 2000);
          }, 500);
        }, 4000);
      }, 2000);
    }, 4000);
  };

  const handleOpenTagDialog = (index?: number) => {
    if (index !== undefined) {
      setEditingTagIndex(index);
      setNewTag(tags[index]);
    } else {
      setEditingTagIndex(null);
      setNewTag("");
    }
    setUseAIRecognition(false);
    setShowTagDialog(true);
  };

  const handleCloseTagDialog = () => {
    setShowTagDialog(false);
    setNewTag("");
    setEditingTagIndex(null);
    setUseAIRecognition(false);
  };

  // AI情绪识别函数
  const identifyEmotion = (content: string, existingTags: string[] = []): string => {
    // 学业焦虑词库
    const academicAnxietyWords = ['高数', '考试', '绩点', '保研', '比赛', 'NPC', '作业'];
    // 人际孤独词库
    const socialLonelinessWords = ['孤单', '一个人', '舍友', '朋友', '冷淡'];
    // 开心治愈词库
    const happyHealingWords = ['星星', '蛋糕', '开心', '喜欢', '阳光'];
    // 虚无失重词库
    const emptinessWords = ['循环播放', '闹钟响', '洗漱', '赶路', '阶梯教室', '食堂', '宿舍', '刷短视频', '熄灯', '失眠', '发呆', '行色匆匆', '一滩死水', '伸不出去', '劲儿消失了', '没有剧本', '懒得背'];
    // 价值冲突词库
    const valueConflictWords = ['嘲笑', '傻', '六十分万岁', '多一分浪费', '保研线', '图书馆', '数学分析', '课后题', '一题一题', '原理', '嚼碎了', '建模', '算法', '功利', '学习'];
    // 生死钝痛词库
    const lifeDeathWords = ['奶奶', '走', '丧事', '番茄炒蛋', '眼泪', '悲伤', '暴风雨', '回南天', '水渍'];
    // 迷茫未来焦虑词库
    const confusionWords = ['迷茫', '不知道', '以后', '干嘛', '方向', '未来', '焦虑', '选择', '路', '怎么办'];
    // 人际困扰烦躁词库
    const interpersonalWords = ['室友', '吵', '烦', '烦躁', '困扰', '环境', '不适', '噪音', '影响', '安静'];
    // 分手失落词库
    const breakupWords = ['分手', '失恋', '分开', '结束', '空空的', '空虚', '失落', '难过', '心痛', '舍不得'];
    // 期末压力崩溃词库
    const examStressWords = ['期末', '期末周', '崩溃', '压力', '考试', '复习', '挂科', '焦虑', '自我否定', '撑不住', '学不动'];
    // 治愈积极情绪词库
    const positiveWords = ['天气很好', '心情不错', '开心', '高兴', '快乐', '治愈', '美好', '阳光', '温暖', '幸福', '愉快', '舒服'];
    // 自我否定低自尊词库
    const selfNegationWords = ['什么都做不好', '自我否定', '无力感', '低自尊', '没用', '废物', '失败', '做不好', '不行', '做不到', '很差', '糟糕'];
    // 孤独自洽词库
    const solitudeWords = ['一个人', '也挺好', '孤独', '自洽', '平静接受', '独处', '安静', '自在', '享受', '一个人也挺好的'];
    // 友情疏离感词库
    const friendshipWords = ['朋友', '疏远', '友情', '疏离感', '困惑', '远离', '冷淡', '不联系', '陌生', '距离', '变了', '好像'];
    // 价值观冲突词库
    const valueConflict2Words = ['不想考研', '想做喜欢的事', '价值观冲突', '热爱与现实', '格格不入', '不想', '喜欢的事', '现实', '理想', '追求', '放弃'];
    // 家庭变故学业打击词库
    const familyCrisisWords = ['家里出事', '家庭变故', '学业也挂了', '学业打击', '绝望感', '家里', '出事', '挂科', '挂了', '家庭', '变故', '学业', '打击', '绝望'];
    // 挫败权威伤害词库
    const authorityWords = ['被老师否定了', '挫败', '权威伤害', '无力反抗', '老师', '否定', '难受', '挫败感', '权威', '伤害', '无力', '反抗', '批评', '指责'];
    // 逃离自由向往词库
    const escapeWords = ['想出去旅行', '散散心', '逃离', '自由向往', '治愈', '旅行', '出去', '散心', '逃离', '自由', '向往', '治愈', '放松', '解脱'];
    // 自我成长内在力量词库
    const growthWords = ['感觉自己变强大了', '自我成长', '和解', '内在力量', '变强大', '强大', '成长', '和解', '内在', '力量', '进步', '提升', '成熟'];
    // 野心搞钱词库
    const ambitionWords = ['想赚钱', '搞钱', '野心', '动力', '搞钱', '赚钱', '钱', '搞钱', '野心', '动力', '目标', '奋斗', '努力', '拼搏'];
    // 努力无果隐形天花板词库
    const effortNoResultWords = ['期末成绩', '复习了整整一个月', '每天泡图书馆', '笔记记了三本', '真题刷了两遍', '分数比那些只复习了一周的人还低', '不是没努力', '真的使不上劲', '透明的墙', '能看见对面', '怎么都穿不过去', '不想发朋友圈', '怕我妈打电话来', '不敢跟室友说', '她们都考得还行', '一开口就像在找借口', '一个人坐在食堂角落', '饭凉了也不想吃', '心里堵着一团东西', '吐不出来也咽不下去', '觉得很委屈', '委屈自己明明那么用力了', '一点用都没有', '我好累'];
    
    const lowerContent = content.toLowerCase();
    
    // 辅助函数：过滤已存在的标签并随机选择
    const getRandomTag = (tagArray: string[]): string => {
      // 过滤掉已存在的标签（移除#符号进行比较）
      const availableTags = tagArray.filter(tag => 
        !existingTags.some(existingTag => existingTag === tag.replace('#', ''))
      );
      
      // 如果没有可用的标签，返回空字符串
      if (availableTags.length === 0) {
        return '';
      }
      
      return availableTags[Math.floor(Math.random() * availableTags.length)];
    };
    
    // 检查努力无果隐形天花板（优先级最高）
    if (effortNoResultWords.some(word => lowerContent.includes(word))) {
      const tags = ['#努力无果', '#隐形天花板', '#孤独委屈'];
      const selectedTag = getRandomTag(tags);
      if (selectedTag) return selectedTag;
    }
    
    // 检查生死钝痛
    if (lifeDeathWords.some(word => lowerContent.includes(word))) {
      const tags = ['#生死', '#钝痛'];
      const selectedTag = getRandomTag(tags);
      if (selectedTag) return selectedTag;
    }
    
    // 检查迷茫未来焦虑
    if (confusionWords.some(word => lowerContent.includes(word))) {
      const tags = ['#迷茫', '#未来焦虑', '#方向缺失'];
      const selectedTag = getRandomTag(tags);
      if (selectedTag) return selectedTag;
    }
    
    // 检查分手失落
    if (breakupWords.some(word => lowerContent.includes(word))) {
      const tags = ['#分手', '#空虚', '#失落'];
      const selectedTag = getRandomTag(tags);
      if (selectedTag) return selectedTag;
    }
    
    // 检查期末压力崩溃
    if (examStressWords.some(word => lowerContent.includes(word))) {
      const tags = ['#期末压力', '#崩溃', '#自我否定'];
      const selectedTag = getRandomTag(tags);
      if (selectedTag) return selectedTag;
    }
    
    // 检查治愈积极情绪
    if (positiveWords.some(word => lowerContent.includes(word))) {
      const tags = ['#治愈', '#小确幸', '#积极情绪'];
      const selectedTag = getRandomTag(tags);
      if (selectedTag) return selectedTag;
    }
    
    // 检查自我否定低自尊
    if (selfNegationWords.some(word => lowerContent.includes(word))) {
      const tags = ['#自我否定', '#无力感', '#低自尊'];
      const selectedTag = getRandomTag(tags);
      if (selectedTag) return selectedTag;
    }
    
    // 检查孤独自洽
    if (solitudeWords.some(word => lowerContent.includes(word))) {
      const tags = ['#孤独', '#自洽', '#平静接受'];
      const selectedTag = getRandomTag(tags);
      if (selectedTag) return selectedTag;
    }
    
    // 检查友情疏离感
    if (friendshipWords.some(word => lowerContent.includes(word))) {
      const tags = ['#友情', '#疏离感', '#困惑'];
      const selectedTag = getRandomTag(tags);
      if (selectedTag) return selectedTag;
    }
    
    // 检查价值观冲突
    if (valueConflict2Words.some(word => lowerContent.includes(word))) {
      const tags = ['#价值观冲突', '#热爱与现实', '#格格不入'];
      const selectedTag = getRandomTag(tags);
      if (selectedTag) return selectedTag;
    }
    
    // 检查家庭变故学业打击
    if (familyCrisisWords.some(word => lowerContent.includes(word))) {
      const tags = ['#家庭变故', '#学业打击', '#绝望感'];
      const selectedTag = getRandomTag(tags);
      if (selectedTag) return selectedTag;
    }
    
    // 检查挫败权威伤害
    if (authorityWords.some(word => lowerContent.includes(word))) {
      const tags = ['#挫败', '#权威伤害', '#无力反抗'];
      const selectedTag = getRandomTag(tags);
      if (selectedTag) return selectedTag;
    }
    
    // 检查逃离自由向往
    if (escapeWords.some(word => lowerContent.includes(word))) {
      const tags = ['#逃离', '#自由向往', '#治愈'];
      const selectedTag = getRandomTag(tags);
      if (selectedTag) return selectedTag;
    }
    
    // 检查自我成长内在力量
    if (growthWords.some(word => lowerContent.includes(word))) {
      const tags = ['#自我成长', '#和解', '#内在力量'];
      const selectedTag = getRandomTag(tags);
      if (selectedTag) return selectedTag;
    }
    
    // 检查野心搞钱
    if (ambitionWords.some(word => lowerContent.includes(word))) {
      const tags = ['#野心', '#动力', '#搞钱'];
      const selectedTag = getRandomTag(tags);
      if (selectedTag) return selectedTag;
    }
    
    // 检查人际困扰烦躁
    if (interpersonalWords.some(word => lowerContent.includes(word))) {
      const tags = ['#人际困扰', '#烦躁', '#环境不适'];
      const selectedTag = getRandomTag(tags);
      if (selectedTag) return selectedTag;
    }
    
    // 检查价值冲突
    if (valueConflictWords.some(word => lowerContent.includes(word))) {
      const tags = ['#价值冲突', '#倔强'];
      const selectedTag = getRandomTag(tags);
      if (selectedTag) return selectedTag;
    }
    
    // 检查虚无失重感
    if (emptinessWords.some(word => lowerContent.includes(word))) {
      const tags = ['#空虚', '#失重感'];
      const selectedTag = getRandomTag(tags);
      if (selectedTag) return selectedTag;
    }
    
    // 检查学业焦虑
    if (academicAnxietyWords.some(word => lowerContent.includes(word))) {
      const tags = ['#学业焦虑', '#深夜迷茫'];
      const selectedTag = getRandomTag(tags);
      if (selectedTag) return selectedTag;
    }
    
    // 检查人际孤独
    if (socialLonelinessWords.some(word => lowerContent.includes(word))) {
      const tags = ['#社交内耗', '#渴望同频'];
      const selectedTag = getRandomTag(tags);
      if (selectedTag) return selectedTag;
    }
    
    // 检查开心治愈
    if (happyHealingWords.some(word => lowerContent.includes(word))) {
      const tags = ['#隐秘的喜悦', '#小确幸'];
      const selectedTag = getRandomTag(tags);
      if (selectedTag) return selectedTag;
    }
    
    // 兜底标签
    const fallbackTags = ['#极夜碎碎念', '#此刻的感触'];
    const selectedTag = getRandomTag(fallbackTags);
    return selectedTag || '#极夜碎碎念'; // 如果所有标签都被占用，返回默认标签
  };

  const handleConfirmTag = () => {
    if (useAIRecognition) {
      // AI识别流程
      setShowTagDialog(false);
      setStage("ai-identifying");
      setTimeout(() => {
        // 传递已存在的标签给AI识别函数，避免生成重复标签
        const existingTagsForAI = editingTagIndex !== null 
          ? tags.filter((_, i) => i !== editingTagIndex) // 编辑模式时排除当前编辑的标签
          : tags; // 新增模式时排除所有已存在的标签
        
        const aiTag = identifyEmotion(text, existingTagsForAI);
        const cleanTag = aiTag.replace('#', ''); // 移除#符号，因为显示时会自动添加
        
        if (editingTagIndex !== null) {
          // 编辑模式：直接替换当前标签
          const newTags = [...tags];
          newTags[editingTagIndex] = cleanTag;
          setTags(newTags);
        } else {
          // 新增模式：检查重复标签和数量限制
          if (cleanTag && !tags.includes(cleanTag) && tags.length < 3) {
            setTags([...tags, cleanTag]);
          }
        }
        setStage("writing");
      }, 3000);
    } else if (newTag.trim()) {
      const trimmedTag = newTag.trim();
      if (editingTagIndex !== null) {
        const newTags = [...tags];
        newTags[editingTagIndex] = trimmedTag;
        setTags(newTags);
      } else {
        // 检查重复标签
        if (!tags.includes(trimmedTag) && tags.length < 3) {
          setTags([...tags, trimmedTag]);
        }
      }
    }
    handleCloseTagDialog();
  };

  const handleRemoveTag = (index: number) => {
    setTags(tags.filter((_, i) => i !== index));
  };

  return (
    <PageShell title="刻录" subtitle="你的情绪是...">
      <div className="w-full h-full">
        {stage === "writing" && (
          <div className="absolute inset-x-5 top-[10px] bottom-[200px] p-6 flex flex-col animate-fade-up">
            <Textarea
              value={text}
              onChange={(e) => {
                if (e.target.value.length <= 1000) {
                  setText(e.target.value);
                  // 保存用户输入到sessionStorage，供相似留言页面使用
                  sessionStorage.setItem("carveUserInput", e.target.value);
                  // 如果内容被清空，清空标签
                  if (!e.target.value.trim()) {
                    setTags([]);
                    // 清空sessionStorage中的用户输入
                    sessionStorage.removeItem("carveUserInput");
                  }
                }
              }}
              autoFocus
              placeholder="卸下防备，写下此刻的感受..."
              className="flex-grow border border-white/10 bg-white/5 backdrop-blur-md rounded-lg text-white placeholder:text-white/50 p-4 text-[16px] leading-relaxed font-cn outline-none resize-none focus:border-white/20 transition-colors"
            />
            {/* 标签部分 - 仅在输入框有内容时显示 */}
            {text.trim() && (
              <div className="mt-4 flex flex-wrap gap-2">
                {tags.map((tag, index) => (
                  <div
                    key={index}
                    className="group relative border border-white/10 bg-white/5 backdrop-blur-md rounded-full px-3 py-1 text-xs text-white/90 outline-none transition-all duration-200 hover:bg-white/10 hover:border-white/20 flex items-center"
                  >
                    <button
                      onClick={() => handleOpenTagDialog(index)}
                      className="flex-1 text-left"
                    >
                      #{tag}
                    </button>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        handleRemoveTag(index);
                      }}
                      className="ml-2 text-white hover:text-red-400 transition-colors"
                    >
                      ×
                    </button>
                  </div>
                ))}
                {tags.length < 3 && (
                  <button
                    onClick={() => handleOpenTagDialog()}
                    className="border border-white/10 bg-white/5 backdrop-blur-md rounded-full px-3 py-1 text-xs text-white/70 hover:text-white/50 hover:bg-white/10 hover:border-white/20 outline-none transition-colors"
                  >
                    添加标签...
                  </button>
                )}
              </div>
            )}
            {/* 投放区域显示 - 单独一行 */}
            <div className="mt-2 flex items-center">
              <span className="text-[12px] tracking-widest text-white/50">
                投放区域：
              </span>
              <button
                onClick={() => setStage("star-preference")}
                className="ml-2 px-2 py-0.5 rounded-full text-[10px] font-medium bg-white/10 text-white/80 border border-white/20 hover:bg-white/20 hover:text-white transition-all"
              >
                {starPreference.length > 0 ? starPreference.join("、") : "全宇宙"}
              </button>
            </div>
            <div className="relative mt-2 flex items-center justify-between">
              {/* 字数统计 */}
              <div className="flex items-center space-x-2">
                <span className="text-[10px] tracking-widest text-white/50">
                  {text.length}/1000 · Unsigned
                </span>
              </div>
              {/* 发送按钮 */}
              <button
                onClick={handleSend}
                disabled={!text.trim()}
                className="relative p-2 rounded-full text-white/80 hover:text-white transition-colors disabled:opacity-30 disabled:cursor-not-allowed
                           shadow-lg shadow-white/10 hover:shadow-white/10"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="lucide lucide-send"
                >
                  <path d="m22 2-7 20-4-9-9-4 20-7Z" />
                  <path d="M9 15 22 2" />
                </svg>
                <span className="sr-only">发送</span>
              </button>
            </div>
          </div>
        )}

        {stage === "paper" && (
          <div className="flex flex-col items-center justify-center py-20 animate-fade-in">
            <div className="bg-background/80 backdrop-blur-md shadow-2xl rounded-lg p-8 max-w-md w-full mx-4 transform transition-all duration-300 border border-white/20">
              <div className="text-white/90 space-y-4">
                <p className="text-base leading-relaxed whitespace-pre-wrap font-cn">
                  {text}
                </p>
                {tags.length > 0 && (
                  <div className="flex flex-wrap gap-2 pt-2">
                    {tags.map((tag, index) => (
                      <span
                        key={index}
                        className="bg-white/10 text-white/80 rounded-full px-3 py-1 text-xs border border-white/30"
                      >
                        #{tag}
                      </span>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>
        )}

        {stage === "shrinking" && (
          <div className="flex flex-col items-center justify-center py-20">
            <div className="relative w-64 h-64">
              <div className="absolute inset-0 bg-background/80 backdrop-blur-md shadow-2xl rounded-lg border border-white/20 transition-all duration-2000"
                   style={{
                     animation: 'shrink 2s ease-in forwards',
                     transformOrigin: 'center'
                   }}>
                <div className="text-white/90 p-4 text-xs transition-opacity duration-1000"
                     style={{
                       animation: 'fadeOut 1s ease-out forwards'
                     }}>
                  {text.substring(0, 50)}...
                </div>
              </div>
            </div>
          </div>
        )}

        {stage === "meteor" && (
          <div className="flex flex-col items-center justify-center py-20 relative overflow-hidden">
            <div className="absolute w-4 h-4 bg-white rounded-full shadow-lg"
                 style={{
                   animation: 'meteor 3s ease-in forwards',
                   boxShadow: '0 0 20px 10px rgba(255, 255, 255, 0.8)'
                 }}>
            </div>
            <div className="absolute w-1 h-32 bg-gradient-to-t from-white/60 to-transparent"
                 style={{
                   animation: 'meteor-tail 3s ease-in forwards'
                 }}>
            </div>
          </div>
        )}

        {stage === "message" && (
          <div className="flex flex-col items-center justify-center py-20 px-8 text-center">
            <div className="space-y-4">
              <p className="text-lg tracking-wider text-white/90 font-cn text-center min-h-[1.5rem]">
                {displayText1}
              </p>
              <p className="text-lg tracking-wider text-white/90 font-cn text-center min-h-[1.5rem]">
                {displayText2}
              </p>
              <p className="text-lg tracking-wider text-white/90 font-cn text-center min-h-[1.5rem]">
                {displayText3}
                {displayText4 && (
                  <>
                    <br />
                    {displayText4}
                  </>
                )}
              </p>
              <p className="text-sm text-white/60 font-cn text-center min-h-[1.2rem]">
                {displayText5}
              </p>
            </div>
          </div>
        )}

        {stage === "final" && (
          <div className="flex flex-col items-center justify-center py-20 px-8 text-center">
            <div className="space-y-4 animate-fade-out">
              <p className="text-lg tracking-wider text-white/90 font-cn text-center min-h-[1.5rem]">
                {displayText1}
              </p>
              <p className="text-lg tracking-wider text-white/90 font-cn text-center min-h-[1.5rem]">
                {displayText2}
              </p>
              <p className="text-lg tracking-wider text-white/90 font-cn text-center min-h-[1.5rem]">
                {displayText3}
                {displayText4 && (
                  <>
                    <br />
                    {displayText4}
                  </>
                )}
              </p>
              <p className="text-sm text-white/60 font-cn text-center min-h-[1.2rem]">
                {displayText5}
              </p>
            </div>
          </div>
        )}

        {stage === "ai-identifying" && (
          <div className="absolute inset-0 flex flex-col items-center justify-start pt-32 bg-black/60 backdrop-blur-md">
            {/* Beautiful aurora and star ring animation */}
            <div className="relative w-64 h-64">
              {/* Aurora background effect */}
              <div className="absolute inset-0 rounded-full opacity-30">
                <div className="absolute inset-0 bg-gradient-to-r from-blue-400/20 via-purple-400/20 to-teal-400/20 rounded-full blur-2xl animate-pulse"></div>
              </div>
              
              {/* Main rotating star ring */}
              <div className="absolute inset-8 rounded-full border-2 border-white/10 animate-spin" 
                   style={{ animationDuration: '12s' }}>
                {/* Star points on the ring */}
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-3 h-3">
                  <div className="w-full h-full bg-white rounded-full shadow-lg shadow-white/80"></div>
                </div>
                <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-2 h-2">
                  <div className="w-full h-full bg-blue-300 rounded-full shadow-lg shadow-blue-300/60"></div>
                </div>
                <div className="absolute left-0 top-1/2 -translate-y-1/2 w-2.5 h-2.5">
                  <div className="w-full h-full bg-purple-300 rounded-full shadow-lg shadow-purple-300/60"></div>
                </div>
                <div className="absolute right-0 top-1/2 -translate-y-1/2 w-2 h-2">
                  <div className="w-full h-full bg-teal-300 rounded-full shadow-lg shadow-teal-300/60"></div>
                </div>
              </div>
              
              {/* Inner glowing ring */}
              <div className="absolute inset-16 rounded-full border border-white/20 animate-spin" 
                   style={{ animationDuration: '8s', animationDirection: 'reverse' }}>
              </div>
              
              {/* Central pulsing core */}
              <div className="absolute inset-1/3 -translate-x-1/2 -translate-y-1/2 w-20 h-20">
                <div className="w-full h-full rounded-full bg-gradient-to-r from-white/20 to-blue-300/20 blur-xl animate-pulse"></div>
                <div className="absolute inset-2 rounded-full bg-white/10 animate-ping"></div>
              </div>
              
              {/* Floating particles */}
              <div className="absolute inset-0">
                <div className="absolute top-8 left-12 w-1 h-1 bg-white/60 rounded-full animate-pulse"></div>
                <div className="absolute bottom-12 right-8 w-1.5 h-1.5 bg-blue-200/60 rounded-full animate-pulse" style={{ animationDelay: '0.5s' }}></div>
                <div className="absolute left-8 top-1/2 w-1 h-1 bg-purple-200/60 rounded-full animate-pulse" style={{ animationDelay: '1s' }}></div>
                <div className="absolute right-12 bottom-8 w-1 h-1 bg-teal-200/60 rounded-full animate-pulse" style={{ animationDelay: '1.5s' }}></div>
              </div>
            </div>
            
            {/* Text below animation */}
            <div className="mt-16 text-center">
              <p className="text-lg tracking-wider text-white/70 font-cn animate-fade-in-out">
                AI 守星人正在感知你的情绪...
              </p>
            </div>
          </div>
        )}

        {stage === "navigation" && (
          <div className="flex flex-col items-center justify-center py-20 px-8 text-center animate-fade-in">
            <div className="space-y-8">
              <p className="text-lg tracking-wider text-white/90 font-cn text-center whitespace-pre-line">
                {displayText6}
              </p>
              {displayText6.includes("记录。") && (
                <div className="flex justify-center">
                  <button
                    onClick={() => navigate({ to: "/similar" })}
                    className="flex items-center space-x-2 text-white/80 hover:text-white transition-colors text-lg animate-fade-in"
                  >
                    <span>查看</span>
                    <span className="text-lg">→</span>
                  </button>
                </div>
              )}
            </div>
          </div>
        )}
        
        {/* 标签编辑对话框 */}
        <Dialog open={showTagDialog} onOpenChange={setShowTagDialog}>
          <DialogContent className="bg-background/95 backdrop-blur-lg border border-white/20 max-w-sm mx-auto shadow-2xl shadow-black/30 rounded-xl [button[data-radix-dialog-close]]:hidden [&>button:last-child]:hidden">
            <DialogHeader className="pb-4">
              <DialogTitle className="text-white text-lg">
                {editingTagIndex !== null ? "编辑标签" : "添加标签"}
              </DialogTitle>
            </DialogHeader>
            
            <div className="space-y-4">
              <div className="flex items-center space-x-2">
                <Switch
                  id="ai-recognition"
                  checked={useAIRecognition}
                  onCheckedChange={setUseAIRecognition}
                />
                <label htmlFor="ai-recognition" className="text-sm text-white/80">
                  让 AI 识别情绪
                </label>
              </div>
              
              {!useAIRecognition && (
                <Input
                  value={newTag}
                  onChange={(e) => setNewTag(e.target.value)}
                  placeholder="输入标签内容..."
                  className="bg-background/50 border-white/20 text-white placeholder:text-white/50"
                />
              )}
              
              {useAIRecognition && (
                <p className="text-sm text-white/60">
                  AI 将分析你的文字内容并识别出相应的情绪标签
                </p>
              )}
            </div>
            
            <DialogFooter>
              <Button
                variant="outline"
                onClick={handleCloseTagDialog}
                className="border-white/20 text-white hover:bg-white/10"
              >
                取消
              </Button>
              <Button
                onClick={handleConfirmTag}
                disabled={!useAIRecognition && !newTag.trim()}
                className="bg-white/10 hover:bg-white/20 text-white border border-white/20"
              >
                确认
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
        
        {/* 危机Modal */}
        <Dialog open={showCrisisModal} onOpenChange={setShowCrisisModal}>
          <DialogContent className="bg-background/95 backdrop-blur-lg border border-white/20 max-w-md mx-auto shadow-2xl shadow-black/30 rounded-xl" style={{ animation: 'gentle-appear 0.8s ease-out' }}>
            <DialogHeader className="pb-6">
              <DialogTitle className="text-white text-lg text-center min-h-[2rem]">
                {crisisTitle || <span className="text-white/20">极夜漫长，但你不是一个人</span>}
              </DialogTitle>
            </DialogHeader>
            
            <div className="text-center space-y-6">
              {showCrisisContent && (
                <div style={{ animation: 'gentle-appear 1.2s ease-out' }}>
                  <p className="text-white/80 text-sm leading-relaxed">
                    检测到你的情绪正处于极夜的深渊，请不要害怕。请相信，这世上总有人在爱你。如果撑不住了，请握住我的手，随时拨打心理援助热线：400-161-9995（24小时援助热线）。守卫者一直都在。
                  </p>
                  
                  <div className="space-y-3 mt-6">
                    <Button
                      onClick={() => {
                        // 可以在这里添加拨打电话的逻辑
                        setShowCrisisModal(false);
                      }}
                      className="bg-red-500/20 hover:bg-red-500/30 text-red-300 border border-red-500/30 w-full"
                    >
                      呼叫援助📞
                    </Button>
                    
                    <Button
                      onClick={() => {
                        setShowCrisisModal(false);
                        navigate({ to: "/keeper" });
                      }}
                      className="bg-blue-500/20 hover:bg-blue-500/30 text-blue-300 border border-blue-500/30 w-full"
                    >
                      去找守夜人聊聊🧠
                    </Button>
                    
                    <Button
                      onClick={() => setShowCrisisModal(false)}
                      className="bg-white/10 hover:bg-white/20 text-white border border-white/20 w-full"
                    >
                      我没事，返回修改←
                    </Button>
                  </div>
                </div>
              )}
            </div>
          </DialogContent>
        </Dialog>
        
        {/* 投星范围偏好选择弹窗 */}
        <Dialog open={stage === "star-preference"} onOpenChange={() => {}}>
          <DialogContent className="bg-background/95 backdrop-blur-lg border border-white/20 max-w-sm mx-auto shadow-2xl shadow-black/30 rounded-lg" style={{ animation: 'fade-in 0.5s ease-out' }}>
            <DialogHeader className="pb-4">
              <DialogTitle className="text-white text-base text-center">
                选择投星范围偏好
              </DialogTitle>
            </DialogHeader>
            
            <div className="space-y-3">
              <p className="text-white/70 text-xs text-center">
                你的碎星将被投向哪个范围？
              </p>
              
              {/* 填空框 */}
              <div className="relative">
                <Input
                  value={starPreference.join("、")}
                  readOnly
                  placeholder="点击下方胶囊选择投星范围..."
                  className="bg-white/10 border-white/20 text-white placeholder:text-white/40 text-sm h-10 pr-8"
                />
                {starPreference.length > 0 && (
                  <button
                    onClick={() => setStarPreference([])}
                    className="absolute right-2 top-1/2 -translate-y-1/2 text-white/50 hover:text-white/80 transition-colors"
                  >
                    ✕
                  </button>
                )}
              </div>
              
              {/* 胶囊状选项 */}
              <div className="flex flex-wrap gap-2 justify-center">
                {[
                  "全宇宙",
                  "仅投放在自己星空",
                  "校内", 
                  "同一层次院校",
                  "高层次院校",
                  "高年级",
                  "低年级"
                ].map((option) => (
                  <button
                    key={option}
                    onClick={() => {
                      if (starPreference.includes(option)) {
                        // 如果已选择，则移除
                        setStarPreference(starPreference.filter(item => item !== option));
                      } else {
                        // 如果未选择，则添加
                        setStarPreference([...starPreference, option]);
                      }
                    }}
                    className={`px-3 py-1.5 rounded-full text-xs font-medium transition-all border ${
                      starPreference.includes(option)
                        ? "bg-white/20 text-white border-white/40"
                        : "bg-white/5 text-white/70 border-white/20 hover:bg-white/10 hover:text-white hover:border-white/30"
                    }`}
                  >
                    {option}
                  </button>
                ))}
              </div>
            </div>
            
            <DialogFooter className="pt-4 gap-2">
              <Button
                variant="outline"
                onClick={() => {
                  setStage("writing");
                  setStarPreference([]);
                }}
                className="border-white/20 text-white hover:bg-white/10 text-xs h-8 px-3"
              >
                返回修改
              </Button>
              <Button
                onClick={() => {
                  if (starPreference.length === 0) {
                    // 如果没有选择，设置为默认"全宇宙"
                    setStarPreference(["全宇宙"]);
                  }
                  setStage("writing");
                }}
                className="bg-white/10 hover:bg-white/20 text-white border border-white/20 text-xs h-8 px-3"
              >
                确认
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
        
        {/* Toast提示 */}
        {showToast && (
          <div className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-50 animate-fade-in">
            <div className="bg-background/95 backdrop-blur-lg border border-white/20 rounded-lg px-8 py-4 shadow-lg shadow-black/30 min-w-[300px] max-w-[400px]">
              <p className="text-white/90 text-base whitespace-pre-line">{toastMessage}</p>
            </div>
          </div>
        )}
      </div>
    </PageShell>
  );
}

// 添加全局样式
if (typeof document !== 'undefined') {
  const style = document.createElement('style');
  style.textContent = `
    @keyframes fade-in {
      0% {
        opacity: 0;
        transform: scale(0.95);
      }
      100% {
        opacity: 1;
        transform: scale(1);
      }
    }
    
    @keyframes gentle-appear {
      0% {
        opacity: 0;
        transform: scale(0.95);
      }
      50% {
        opacity: 0.6;
        transform: scale(0.98);
      }
      100% {
        opacity: 1;
        transform: scale(1);
      }
    }
  `;
  document.head.appendChild(style);
}
