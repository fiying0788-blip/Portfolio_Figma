import { useState, useEffect, useRef } from "react";
import { motion } from "motion/react";
import {
  ChevronDown, X, Send, Download, Mail, Linkedin, Github,
  MessageCircle, Calendar, Target, Users, ArrowRight, Brain,
  Database, Layers, FileText, Network, Building2, GraduationCap,
  Cpu, Briefcase, CheckCheck, Bot, AlertTriangle, CheckCircle2,
  BookOpen, Zap, TrendingUp, Clock, Flag, Circle, BarChart3,
  PenLine, Star
} from "lucide-react";

// ─── HOOKS ──────────────────────────────────────────────────────────────────

function useInView(threshold = 0.15) {
  const ref = useRef<HTMLDivElement>(null);
  const [inView, setInView] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) setInView(true); },
      { threshold }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [threshold]);
  return { ref, inView };
}

function useCounter(target: number, active: boolean) {
  const [val, setVal] = useState(0);
  useEffect(() => {
    if (!active) return;
    let frame = 0;
    const total = 90;
    const id = setInterval(() => {
      frame++;
      const p = Math.min(frame / total, 1);
      const eased = 1 - Math.pow(1 - p, 3);
      setVal(Math.round(target * eased));
      if (p >= 1) clearInterval(id);
    }, 18);
    return () => clearInterval(id);
  }, [active, target]);
  return val;
}

// ─── DATA ───────────────────────────────────────────────────────────────────

const TIMELINE = [
  {
    id: 1, year: "2017", title: "研究所入學", org: "資訊管理學系",
    color: "#4F7DF7", Icon: GraduationCap,
    desc: "進入資訊管理學系研究所，專注資訊系統整合與數位治理研究，奠定扎實的理論與實務基礎。",
    items: ["修習專案管理、資料庫設計、系統分析等核心課程", "參與教授主導的政府資訊化研究計畫", "取得 PMP 考試資格預備認證"],
  },
  {
    id: 2, year: "2019", title: "研究助理", org: "國立大學 資管所",
    color: "#8B5CF6", Icon: BookOpen,
    desc: "擔任研究助理，協助執行產學合作計畫，發表學術論文，累積政府資訊化實務第一手經驗。",
    items: ["參與三項政府委託研究計畫", "發表兩篇資訊整合學術論文", "開發原型資料視覺化工具"],
  },
  {
    id: 3, year: "2021", title: "初級專案經理", org: "數位科技顧問公司",
    color: "#10B981", Icon: Briefcase,
    desc: "踏入企業界，以初級 PM 身份參與多項軟體導入與系統整合，同年取得 PMP 國際認證。",
    items: ["主導 ERP 系統導入，準時於預算內完成", "建立標準化文件模板，效率提升 40%", "取得 PMP 國際專案管理師認證"],
  },
  {
    id: 4, year: "2022", title: "政府數位轉型", org: "跨部會數位轉型辦公室",
    color: "#F59E0B", Icon: Building2,
    desc: "受聘為政府數位轉型計畫 PM，負責協調多個政府機關的系統整合與法規配套工作。",
    items: ["統籌 5 個部會的跨域資料整合", "設計跨機關資訊交換標準作業流程", "成功推動 3 項法規配套修訂"],
  },
  {
    id: 5, year: "2023", title: "資訊整合負責人", org: "政府資訊服務機構",
    color: "#EF4444", Icon: Network,
    desc: "晉升部門負責人，主導全國性政府資料交換平台架構設計，帶領跨機關技術工作小組。",
    items: ["設計連結 12 個機關的資料交換平台", "建立資料品質管控，錯誤率降低 65%", "培訓 30+ 名政府資訊人員"],
  },
  {
    id: 6, year: "2024", title: "AI 工作流程優化", org: "現職 · 進行中",
    color: "#4F7DF7", Icon: Cpu,
    desc: "結合 AI 工具與 PM 方法論，開發新世代政府數位服務優化方案，引領部門 AI 轉型。",
    items: ["導入 AI 輔助文件生成，節省 50% 工時", "建立提示工程標準庫供跨部門共用", "規劃智慧型政府服務資訊整合藍圖"],
  },
];

const PROJECTS = [
  {
    id: 1,
    name: "跨部會資料交換平台",
    status: "已完成", statusColor: "#22C55E",
    timeline: "2022.06 — 2023.03",
    role: "首席專案經理",
    tags: ["資訊整合", "API 設計", "政府專案"],
    summary: "建構連結 12 個政府機關的統一資料交換平台，實現跨域資料共享與即時同步。",
    problem: "各機關資料格式不一，手動轉換耗時且資料正確率僅 72%，嚴重影響跨機關業務效率與決策品質。",
    analysis: "透過現況盤點與 AS-IS 流程分析，識別 7 個核心痛點，並對 12 個機關 IT 主管進行深度需求訪談。",
    planning: "採 PMI 方法論規劃 18 個月專案，建立 WBS 分解結構、里程碑管控機制與風險登錄冊，獲所有利害關係人簽核。",
    execution: "採敏捷迭代開發，每兩週交付可運行版本，建立跨機關測試環境，持續收集使用者回饋並調整優先序。",
    results: ["資料交換效率提升 380%", "手動作業時間減少 85%", "資料正確率提升至 99.3%"],
    deliverables: ["系統架構規格書", "API 介接文件", "教育訓練手冊", "維運 SOP"],
  },
  {
    id: 2,
    name: "智慧政府服務整合系統",
    status: "進行中", statusColor: "#4F7DF7",
    timeline: "2023.09 — 至今",
    role: "資訊整合負責人",
    tags: ["數位轉型", "UX 設計", "雲端架構"],
    summary: "整合 8 項政府民眾服務至單一入口，提供一站式數位服務體驗，大幅提升民眾滿意度。",
    problem: "民眾需跨越 8 個不同網站辦理業務，各系統帳號不互通，整體使用者體驗零碎且繁瑣。",
    analysis: "收集 2,000+ 份民眾問卷，識別最高頻使用服務，繪製完整使用者旅程地圖，確認整合優先序。",
    planning: "分三里程碑推進：系統整合架構→前端統一介面→帳號整併，每階段設置明確驗收標準與回滾機制。",
    execution: "與 8 機關 IT 團隊協調，解決 23 個跨系統介接問題，同步推進法規調整與資安合規審查。",
    results: ["服務申辦時間縮短 60%", "民眾滿意度提升至 4.6/5", "線上申辦率提升至 78%"],
    deliverables: ["需求規格書", "介面設計稿", "整合測試報告", "上線計畫書"],
  },
  {
    id: 3,
    name: "AI 輔助文件生成系統",
    status: "已完成", statusColor: "#22C55E",
    timeline: "2024.01 — 2024.06",
    role: "專案負責人 & AI 架構師",
    tags: ["AI 應用", "自動化", "提示工程"],
    summary: "開發政府機關專用 AI 文件生成平台，結合機關知識庫與合規審查機制，節省 70% 文件工時。",
    problem: "政府文件格式嚴格複雜，資深人員耗費大量時間在重複性文書作業，品質標準也難以維持一致。",
    analysis: "分析 500+ 份政府文件，萃取 12 種文件類型的共通結構，建立文件分類矩陣與品質評估維度。",
    planning: "以兩個月為單位規劃三迭代：基礎生成能力→知識庫整合→合規審查機制，每迭代含使用者驗收測試。",
    execution: "開發提示工程標準庫，對大型語言模型進行領域微調，建立四層審核機制確保輸出合規性與準確性。",
    results: ["文件生成速度提升 70%", "品質一致性提升 90%", "用戶滿意度 4.8/5"],
    deliverables: ["AI 模型微調方案", "提示工程標準庫", "用戶操作手冊", "系統整合文件"],
  },
  {
    id: 4,
    name: "開放資料品質管控平台",
    status: "規劃中", statusColor: "#F59E0B",
    timeline: "2024.10 — 2025.06",
    role: "專案經理",
    tags: ["開放資料", "品質管控", "資料視覺化"],
    summary: "建立政府開放資料自動化品質檢核機制，提升公共資料可用性與社會信賴度。",
    problem: "政府開放資料格式混亂，缺乏統一品質標準，資料再利用率僅 12%，遠低於國際基準值。",
    analysis: "盤點 150+ 個政府開放資料集，依格式完整性、時效性、可讀性三維度建立品質評分框架。",
    planning: "分兩階段執行：平台開發（6 個月）+ 跨機關全面推廣（3 個月），建立激勵性品質改善機制。",
    execution: "開發自動化品質檢核腳本，建立即時監控儀表板，導入差異化輔導機制協助各機關改善資料品質。",
    results: ["目標：資料可用率提升至 95%", "目標：建立統一品質評分標準", "目標：開放資料再利用率提升 3 倍"],
    deliverables: ["品質評估框架", "自動化檢核腳本", "資料品質儀表板", "推廣培訓計畫"],
  },
];

const SKILLS = [
  {
    id: "pm", name: "專案管理", Icon: Target, color: "#4F7DF7",
    desc: "端到端專案規劃、執行與交付管理",
    subs: ["需求分析", "利害關係人溝通", "進度管理", "風險管理", "文件撰寫", "品質管控"],
    projects: ["跨部會資料交換平台", "智慧政府服務整合系統", "AI 輔助文件生成系統"],
  },
  {
    id: "integration", name: "資訊整合", Icon: Database, color: "#8B5CF6",
    desc: "跨系統資料串接、流程設計與標準化",
    subs: ["工作流設計", "資料組織架構", "視覺化呈現", "API 介接規劃", "資料品質管控"],
    projects: ["跨部會資料交換平台", "開放資料品質管控平台"],
  },
  {
    id: "ai", name: "AI 應用", Icon: Brain, color: "#10B981",
    desc: "AI 工具整合、提示工程與工作流自動化",
    subs: ["提示工程設計", "ChatGPT 企業應用", "工作流自動化", "AI 效益評估", "知識庫建構"],
    projects: ["AI 輔助文件生成系統"],
  },
];

const ACHIEVEMENTS = [
  { label: "交付專案", value: 20, suffix: "+", Icon: CheckCheck, color: "#4F7DF7" },
  { label: "政府專案", value: 8, suffix: "", Icon: Building2, color: "#8B5CF6" },
  { label: "主持會議", value: 300, suffix: "+", Icon: Users, color: "#10B981" },
  { label: "正式簡報", value: 50, suffix: "+", Icon: Layers, color: "#F59E0B" },
  { label: "技術文件", value: 100, suffix: "+", Icon: FileText, color: "#EF4444" },
];

const SIDE_PROJECTS = [
  {
    id: 1, name: "PM 效率儀表板", status: "上線中", statusColor: "#22C55E",
    desc: "個人專用的每日任務、里程碑追蹤與會議管理工具，以 Notion 風格設計體驗，深度整合 PM 工作流。",
    tags: ["React", "TypeScript", "Supabase"],
    architecture: "前端 React 18 + 後端 Supabase + 即時 WebSocket 同步",
    lessons: "設計符合 PM 思維的 UX 流程需要深度理解使用者心智模型，反覆迭代才能到位。",
    roadmap: "整合 AI 自動摘要與風險預警功能，讓儀表板能主動提醒潛在風險。",
    hasDemo: true, hasGithub: true,
  },
  {
    id: 2, name: "政府資料視覺化工具", status: "開發中", statusColor: "#4F7DF7",
    desc: "將政府開放資料轉換為互動式圖表，以易讀的視覺化方式提升民眾對公共資訊的理解與可近性。",
    tags: ["D3.js", "Python", "FastAPI"],
    architecture: "Python 爬蟲 + FastAPI RESTful API + D3.js 互動視覺化前端",
    lessons: "政府開放資料的清理複雜度遠超預期，資料品質標準化是首要挑戰。",
    roadmap: "加入 AI 自動分析，讓工具能自動摘要資料趨勢並以自然語言解釋。",
    hasDemo: false, hasGithub: true,
  },
  {
    id: 3, name: "AI 提示工程知識庫", status: "持續更新", statusColor: "#8B5CF6",
    desc: "整理 200+ 個政府行政、文件撰寫、資料分析場景的最佳化提示詞，建立可複用的提示工程庫。",
    tags: ["Notion", "AI", "提示工程"],
    architecture: "Notion 結構化資料庫 + 自動同步腳本 + 分類標籤系統",
    lessons: "提示詞的情境通用性與可複用性設計是最複雜的智識挑戰。",
    roadmap: "開發 Chrome 擴充功能，讓使用者能在任何網頁快速調用提示詞庫。",
    hasDemo: true, hasGithub: false,
  },
];

const CHAT_QA: Record<string, string> = {
  intro: "Eric 是一位資深專案管理師，專注於政府數位轉型與資訊整合領域，擁有 7 年以上實務經驗。他結合系統化 PM 方法論與前沿 AI 工具應用，致力於打造更高效的政府數位服務生態。目前持有 PMP 國際認證，並積極研究 AI 在公部門的落地應用策略，是少數同時擁有政府業務理解與技術整合能力的複合型 PM。",
  projects: "Eric 主導過多項大型政府專案：\n\n① 跨部會資料交換平台 — 連結 12 個政府機關，資料交換效率提升 380%\n\n② 智慧政府服務整合系統 — 整合 8 項民眾服務，申辦時間縮短 60%\n\n③ AI 輔助文件生成系統 — 節省 70% 文件工時，品質一致性提升 90%\n\n④ 開放資料品質管控平台 — 規劃中，目標提升開放資料再利用率 3 倍",
  strengths: "Eric 的核心優勢：\n\n① 跨域溝通能力 — 有效橋接技術團隊與政府行政人員，消弭認知落差\n\n② 系統化思維 — 善用流程設計與標準化方法解決複雜跨機關問題\n\n③ AI 工具整合 — 將新技術實際落地到業務流程，不只是使用而是創造價值\n\n④ 嚴謹的文件能力 — 確保知識傳承、品質一致性與稽核合規性",
  hire: "選擇 Eric 的五大理由：\n\n✦ 政府專案實戰豐富，深度理解公部門特殊需求與限制\n✦ 技術理解 × 行政管理雙軌能力，溝通零障礙\n✦ AI 工具前瞻視野，協助組織提前布局數位轉型\n✦ 所有專案均準時高品質交付，信賴度有實績背書\n✦ 具備建立標準與制度的能力，影響超越單一專案",
};

const SUGGESTED_QS = [
  { label: "介紹 Eric", key: "intro" },
  { label: "管理過哪些專案？", key: "projects" },
  { label: "Eric 的優勢是什麼？", key: "strengths" },
  { label: "為什麼要聘請 Eric？", key: "hire" },
];

type Project = typeof PROJECTS[number];

// ─── NAV ────────────────────────────────────────────────────────────────────

function Nav() {
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const h = () => setScrolled(window.scrollY > 30);
    window.addEventListener("scroll", h);
    return () => window.removeEventListener("scroll", h);
  }, []);

  const links = [
    { label: "作品集", href: "#projects" },
    { label: "經歷", href: "#timeline" },
    { label: "技能", href: "#skills" },
    { label: "儀表板", href: "#dashboard" },
    { label: "聯絡", href: "#contact" },
  ];

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
      scrolled ? "bg-white/90 backdrop-blur-lg border-b border-gray-100 shadow-sm" : ""
    }`}>
      <div className="max-w-7xl mx-auto px-6 lg:px-12 h-16 flex items-center justify-between">
        <a href="#hero" className="text-2xl font-black tracking-tight text-[#4F7DF7]">E.</a>
        <div className="hidden md:flex items-center gap-8">
          {links.map(l => (
            <a key={l.label} href={l.href}
              className="text-sm font-medium text-[#6B7280] hover:text-[#1F2937] transition-colors duration-200">
              {l.label}
            </a>
          ))}
        </div>
        <a href="#contact"
          className="bg-[#4F7DF7] text-white text-sm font-semibold px-5 py-2.5 rounded-full hover:bg-[#3B6EF2] transition-all duration-200 shadow-sm hover:shadow-md">
          下載履歷
        </a>
      </div>
    </nav>
  );
}

// ─── FLOATING DASHBOARD ─────────────────────────────────────────────────────

function FloatingDashboard() {
  const [tasks, setTasks] = useState([true, true, true, true, false]);
  const toggleTask = (i: number) => setTasks(t => t.map((v, idx) => idx === i ? !v : v));

  const taskLabels = [
    "確認 API 文件格式", "與 IT 部門進行會議前置",
    "更新風險登錄表", "審核整合測試報告", "準備本週進度週報",
  ];

  return (
    <div className="relative w-full h-[520px] select-none">
      <div className="absolute top-12 left-1/2 -translate-x-1/4 w-72 h-72 bg-blue-100 rounded-full blur-3xl opacity-30 pointer-events-none" />

      {/* Today's Tasks */}
      <motion.div
        animate={{ y: [0, -6, 0] }}
        transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
        className="absolute top-0 left-0 w-72 bg-white rounded-2xl border border-gray-100 shadow-lg p-5 z-10"
      >
        <div className="flex items-center justify-between mb-4">
          <span className="text-sm font-semibold text-gray-800">今日任務</span>
          <span className="text-xs font-medium text-[#4F7DF7] bg-blue-50 px-2 py-0.5 rounded-full">
            {tasks.filter(Boolean).length}/{tasks.length}
          </span>
        </div>
        <div className="space-y-2">
          {taskLabels.map((t, i) => (
            <button key={i} onClick={() => toggleTask(i)}
              className="w-full flex items-center gap-2.5 group text-left">
              <div className={`w-4 h-4 rounded flex-shrink-0 flex items-center justify-center transition-all ${
                tasks[i] ? "bg-[#4F7DF7]" : "border-2 border-gray-200 group-hover:border-[#4F7DF7]"
              }`}>
                {tasks[i] && <svg className="w-2.5 h-2.5 text-white" fill="none" viewBox="0 0 10 8"><path d="M1 4l3 3 5-6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>}
              </div>
              <span className={`text-xs transition-colors ${tasks[i] ? "text-gray-400 line-through" : "text-gray-700"}`}>{t}</span>
            </button>
          ))}
        </div>
      </motion.div>

      {/* Project Progress */}
      <motion.div
        animate={{ y: [0, -8, 0] }}
        transition={{ duration: 6, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
        className="absolute top-6 right-0 w-64 bg-white rounded-2xl border border-gray-100 shadow-lg p-5 z-20"
      >
        <span className="text-sm font-semibold text-gray-800 block mb-4">專案進度</span>
        {[
          { name: "資料交換平台", pct: 92, color: "#22C55E" },
          { name: "智慧服務整合", pct: 65, color: "#4F7DF7" },
          { name: "AI 文件系統", pct: 100, color: "#22C55E" },
        ].map((p, i) => (
          <div key={i} className="mb-3.5 last:mb-0">
            <div className="flex justify-between mb-1.5">
              <span className="text-xs text-gray-600">{p.name}</span>
              <span className="text-xs font-semibold" style={{ color: p.color }}>{p.pct}%</span>
            </div>
            <div className="h-1.5 bg-gray-100 rounded-full overflow-hidden">
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: `${p.pct}%` }}
                transition={{ duration: 1.2, delay: i * 0.2, ease: "easeOut" }}
                className="h-full rounded-full"
                style={{ backgroundColor: p.color }}
              />
            </div>
          </div>
        ))}
      </motion.div>

      {/* Stat Badge */}
      <motion.div
        animate={{ y: [0, -10, 0] }}
        transition={{ duration: 4.5, repeat: Infinity, ease: "easeInOut", delay: 1 }}
        className="absolute top-52 left-44 bg-[#4F7DF7] text-white rounded-2xl shadow-xl p-3.5 z-30"
      >
        <div className="flex items-center gap-2.5">
          <TrendingUp className="w-4 h-4 opacity-80" />
          <div>
            <p className="text-[10px] font-medium opacity-80">效率提升</p>
            <p className="text-xl font-black leading-none">+380%</p>
          </div>
        </div>
      </motion.div>

      {/* Upcoming Meeting */}
      <motion.div
        animate={{ y: [0, -7, 0] }}
        transition={{ duration: 5.5, repeat: Infinity, ease: "easeInOut", delay: 1.5 }}
        className="absolute bottom-4 left-4 w-68 bg-white rounded-2xl border border-gray-100 shadow-lg p-5 z-10"
        style={{ width: "260px" }}
      >
        <div className="flex items-center gap-3 mb-3">
          <div className="w-9 h-9 bg-blue-50 rounded-xl flex items-center justify-center flex-shrink-0">
            <Calendar className="w-4 h-4 text-[#4F7DF7]" />
          </div>
          <div>
            <p className="text-xs font-semibold text-gray-800">下一場會議</p>
            <p className="text-xs text-gray-400">今天 14:30</p>
          </div>
        </div>
        <p className="text-sm font-medium text-gray-800 leading-snug">跨部會資料整合工作小組</p>
        <p className="text-xs text-gray-400 mt-1 mb-2">與會者：5 人</p>
        <div className="flex gap-1.5">
          {["資安", "API", "測試"].map(tag => (
            <span key={tag} className="text-xs px-2 py-0.5 bg-blue-50 text-[#4F7DF7] rounded-full font-medium">{tag}</span>
          ))}
        </div>
      </motion.div>

      {/* Risk Overview */}
      <motion.div
        animate={{ y: [0, -9, 0] }}
        transition={{ duration: 6.5, repeat: Infinity, ease: "easeInOut", delay: 0.8 }}
        className="absolute bottom-0 right-2 w-52 bg-white rounded-2xl border border-gray-100 shadow-lg p-5 z-20"
      >
        <span className="text-sm font-semibold text-gray-800 block mb-3">風險概覽</span>
        {[
          { label: "高風險", count: 1, color: "#EF4444" },
          { label: "中風險", count: 3, color: "#F59E0B" },
          { label: "低風險", count: 7, color: "#22C55E" },
        ].map((r, i) => (
          <div key={i} className="flex items-center justify-between py-1.5">
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full" style={{ backgroundColor: r.color }} />
              <span className="text-xs text-gray-600">{r.label}</span>
            </div>
            <span className="text-sm font-bold text-gray-800">{r.count}</span>
          </div>
        ))}
      </motion.div>
    </div>
  );
}

// ─── HERO ───────────────────────────────────────────────────────────────────

function HeroSection() {
  return (
    <section id="hero" className="min-h-screen flex items-center pt-16 overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 lg:px-12 py-20 grid grid-cols-1 lg:grid-cols-2 gap-16 items-center w-full">
        <div>
          <motion.div
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}
          >
            <div className="inline-flex items-center gap-2 bg-white border border-gray-200 rounded-full px-4 py-2 mb-8 shadow-sm">
              <div className="w-2 h-2 rounded-full bg-[#22C55E] animate-pulse" />
              <span className="text-sm text-gray-500 font-medium">專案管理師 × 資訊整合 × AI 應用</span>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: 0.1 }}
          >
            <p className="text-xl text-[#6B7280] font-medium mb-3">嗨，我是 Eric。</p>
            <h1 className="text-5xl lg:text-6xl font-black text-[#1F2937] leading-tight mb-3">
              打造更好的系統，
            </h1>
            <h1 className="text-5xl lg:text-6xl font-black leading-tight mb-8">
              <span className="text-[#4F7DF7]">不只是</span>
              <span className="text-[#1F2937]">管理專案。</span>
            </h1>
          </motion.div>

          <motion.p
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: 0.2 }}
            className="text-lg text-[#6B7280] leading-relaxed mb-10 max-w-lg"
          >
            專注於政府數位轉型、跨機關資訊整合與 AI 工作流優化的資深專案管理師。
            以系統化思維解決複雜問題，讓組織的每一個流程都更智慧、更高效。
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: 0.3 }}
            className="flex flex-wrap gap-4"
          >
            <a href="#projects"
              className="flex items-center gap-2 bg-[#4F7DF7] text-white font-semibold px-7 py-3.5 rounded-full hover:bg-[#3B6EF2] transition-all duration-200 shadow-md hover:shadow-lg hover:-translate-y-0.5">
              探索我的作品
              <ArrowRight className="w-4 h-4" />
            </a>
            <a href="#contact"
              className="flex items-center gap-2 bg-white text-[#1F2937] font-semibold px-7 py-3.5 rounded-full border border-gray-200 hover:border-[#4F7DF7] hover:text-[#4F7DF7] transition-all duration-200 shadow-sm hover:shadow-md">
              <Download className="w-4 h-4" />
              下載履歷
            </a>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.7, delay: 0.5 }}
            className="flex items-center gap-6 mt-12"
          >
            {[
              { label: "PMP 認證", icon: "🏅" },
              { label: "7 年經驗", icon: "⚡" },
              { label: "政府專案", icon: "🏛️" },
            ].map(b => (
              <div key={b.label} className="flex items-center gap-2">
                <span>{b.icon}</span>
                <span className="text-sm text-[#6B7280] font-medium">{b.label}</span>
              </div>
            ))}
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, x: 40 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.8, delay: 0.3 }}
        >
          <FloatingDashboard />
        </motion.div>
      </div>
    </section>
  );
}

// ─── ACHIEVEMENTS ───────────────────────────────────────────────────────────

function StatCard({ label, value, suffix, Icon, color }: { label: string; value: number; suffix: string; Icon: React.ComponentType<{ className?: string; style?: React.CSSProperties }>; color: string; }) {
  const { ref, inView } = useInView();
  const count = useCounter(value, inView);
  return (
    <div ref={ref} className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 hover:shadow-md hover:-translate-y-0.5 transition-all duration-300">
      <div className="w-10 h-10 rounded-xl flex items-center justify-center mb-4" style={{ backgroundColor: `${color}15` }}>
        <Icon className="w-5 h-5" style={{ color }} />
      </div>
      <div className="text-3xl font-black text-[#1F2937] mb-1">
        {count}{suffix}
      </div>
      <div className="text-sm text-[#6B7280] font-medium">{label}</div>
    </div>
  );
}

function AchievementsSection() {
  return (
    <section className="py-20 bg-white border-y border-gray-100">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
          {ACHIEVEMENTS.map(a => <StatCard key={a.label} {...a} />)}
        </div>
      </div>
    </section>
  );
}

// ─── TIMELINE ───────────────────────────────────────────────────────────────

function TimelineSection() {
  const [active, setActive] = useState<number | null>(null);

  return (
    <section id="timeline" className="py-24">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        <div className="mb-14">
          <p className="text-sm font-semibold text-[#4F7DF7] uppercase tracking-wider mb-3">職涯歷程</p>
          <h2 className="text-4xl font-black text-[#1F2937]">每個里程碑，<span className="text-[#4F7DF7]">都是積累。</span></h2>
        </div>

        <div className="relative">
          {/* vertical line */}
          <div className="absolute left-5 top-0 bottom-0 w-px bg-gray-200" />

          <div className="space-y-4">
            {TIMELINE.map((item, idx) => {
              const isOpen = active === item.id;
              return (
                <div key={item.id}>
                  <button
                    onClick={() => setActive(isOpen ? null : item.id)}
                    className="w-full flex items-start gap-6 text-left group"
                  >
                    <div className="flex-shrink-0 w-10 h-10 rounded-full border-2 border-white shadow-md flex items-center justify-center z-10 transition-all duration-300"
                      style={{ backgroundColor: isOpen ? item.color : "#F3F4F6" }}>
                      <item.Icon className="w-4 h-4" style={{ color: isOpen ? "white" : item.color }} />
                    </div>
                    <div className="flex-1 bg-white rounded-2xl border border-gray-100 p-5 hover:border-gray-200 hover:shadow-sm transition-all duration-200">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <span className="text-xs font-bold text-[#6B7280] bg-gray-100 px-2.5 py-1 rounded-full">{item.year}</span>
                          <h3 className="text-base font-bold text-[#1F2937]">{item.title}</h3>
                          <span className="text-sm text-[#6B7280]">{item.org}</span>
                        </div>
                        <ChevronDown className={`w-4 h-4 text-gray-400 transition-transform duration-300 ${isOpen ? "rotate-180" : ""}`} />
                      </div>

                      {isOpen && (
                        <motion.div
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: "auto" }}
                          exit={{ opacity: 0, height: 0 }}
                          transition={{ duration: 0.3 }}
                          className="mt-4 pt-4 border-t border-gray-100"
                        >
                          <p className="text-sm text-[#6B7280] leading-relaxed mb-3">{item.desc}</p>
                          <ul className="space-y-1.5">
                            {item.items.map((it, i) => (
                              <li key={i} className="flex items-start gap-2 text-sm text-[#1F2937]">
                                <div className="w-1.5 h-1.5 rounded-full mt-1.5 flex-shrink-0" style={{ backgroundColor: item.color }} />
                                {it}
                              </li>
                            ))}
                          </ul>
                        </motion.div>
                      )}
                    </div>
                  </button>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}

// ─── PROJECT MODAL ──────────────────────────────────────────────────────────

function ProjectModal({ project, onClose }: { project: Project; onClose: () => void }) {
  useEffect(() => {
    const h = (e: KeyboardEvent) => { if (e.key === "Escape") onClose(); };
    document.addEventListener("keydown", h);
    return () => document.removeEventListener("keydown", h);
  }, [onClose]);

  const steps = [
    { label: "問題定義", content: project.problem, Icon: AlertTriangle, color: "#EF4444" },
    { label: "分析", content: project.analysis, Icon: BarChart3, color: "#F59E0B" },
    { label: "規劃", content: project.planning, Icon: Flag, color: "#8B5CF6" },
    { label: "執行", content: project.execution, Icon: Zap, color: "#4F7DF7" },
    { label: "成果", content: project.results.join(" · "), Icon: CheckCircle2, color: "#22C55E" },
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/30 backdrop-blur-sm"
      onClick={onClose}>
      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ duration: 0.25 }}
        className="bg-white rounded-3xl shadow-2xl max-w-3xl w-full max-h-[90vh] overflow-y-auto"
        onClick={e => e.stopPropagation()}
      >
        <div className="p-8">
          <div className="flex items-start justify-between mb-6">
            <div>
              <div className="flex items-center gap-3 mb-2">
                <div className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: project.statusColor }} />
                <span className="text-sm font-medium" style={{ color: project.statusColor }}>{project.status}</span>
                <span className="text-sm text-[#6B7280]">· {project.timeline}</span>
              </div>
              <h3 className="text-2xl font-black text-[#1F2937]">{project.name}</h3>
              <p className="text-sm text-[#6B7280] mt-1">擔任：{project.role}</p>
            </div>
            <button onClick={onClose} className="w-8 h-8 flex items-center justify-center rounded-full bg-gray-100 hover:bg-gray-200 transition-colors">
              <X className="w-4 h-4 text-gray-600" />
            </button>
          </div>

          <p className="text-[#6B7280] leading-relaxed mb-8">{project.summary}</p>

          {/* Case Study Flow */}
          <div className="mb-8">
            <p className="text-xs font-bold text-[#6B7280] uppercase tracking-wider mb-4">案例研究流程</p>
            <div className="space-y-3">
              {steps.map((s, i) => (
                <div key={i} className="flex gap-4">
                  <div className="flex flex-col items-center">
                    <div className="w-8 h-8 rounded-xl flex items-center justify-center flex-shrink-0" style={{ backgroundColor: `${s.color}15` }}>
                      <s.Icon className="w-4 h-4" style={{ color: s.color }} />
                    </div>
                    {i < steps.length - 1 && <div className="w-px flex-1 bg-gray-200 my-1" />}
                  </div>
                  <div className="pb-4">
                    <p className="text-xs font-bold text-[#6B7280] mb-1">{s.label}</p>
                    <p className="text-sm text-[#1F2937] leading-relaxed">{s.content}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-2 gap-6">
            <div>
              <p className="text-xs font-bold text-[#6B7280] uppercase tracking-wider mb-3">關鍵成果</p>
              <div className="space-y-2">
                {project.results.map((r, i) => (
                  <div key={i} className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-[#22C55E] mt-0.5 flex-shrink-0" />
                    <span className="text-sm text-[#1F2937]">{r}</span>
                  </div>
                ))}
              </div>
            </div>
            <div>
              <p className="text-xs font-bold text-[#6B7280] uppercase tracking-wider mb-3">交付物</p>
              <div className="space-y-2">
                {project.deliverables.map((d, i) => (
                  <div key={i} className="flex items-start gap-2">
                    <FileText className="w-4 h-4 text-[#4F7DF7] mt-0.5 flex-shrink-0" />
                    <span className="text-sm text-[#1F2937]">{d}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
}

// ─── PROJECTS ───────────────────────────────────────────────────────────────

function ProjectsSection() {
  const [selected, setSelected] = useState<Project | null>(null);

  return (
    <section id="projects" className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        <div className="mb-14">
          <p className="text-sm font-semibold text-[#4F7DF7] uppercase tracking-wider mb-3">精選專案</p>
          <h2 className="text-4xl font-black text-[#1F2937]">每個專案，<span className="text-[#4F7DF7]">都有完整故事。</span></h2>
          <p className="text-[#6B7280] mt-3">點擊卡片查看完整案例研究</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {PROJECTS.map(p => (
            <button key={p.id}
              onClick={() => setSelected(p)}
              className="text-left bg-[#F7F7F5] hover:bg-white rounded-2xl border border-gray-100 hover:border-gray-200 p-6 hover:shadow-md hover:-translate-y-0.5 transition-all duration-300 group"
            >
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center gap-2">
                  <div className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: p.statusColor }} />
                  <span className="text-xs font-semibold" style={{ color: p.statusColor }}>{p.status}</span>
                </div>
                <span className="text-xs text-[#6B7280]">{p.timeline}</span>
              </div>

              <h3 className="text-lg font-bold text-[#1F2937] mb-1 group-hover:text-[#4F7DF7] transition-colors">{p.name}</h3>
              <p className="text-xs text-[#6B7280] mb-3">擔任：{p.role}</p>
              <p className="text-sm text-[#6B7280] leading-relaxed mb-4">{p.summary}</p>

              <div className="flex flex-wrap gap-1.5 mb-4">
                {p.tags.map(t => (
                  <span key={t} className="text-xs px-2.5 py-1 bg-white border border-gray-200 text-[#6B7280] rounded-full font-medium">{t}</span>
                ))}
              </div>

              <div className="flex items-center gap-1 text-xs font-semibold text-[#4F7DF7]">
                查看案例研究
                <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
              </div>
            </button>
          ))}
        </div>
      </div>

      {selected && <ProjectModal project={selected} onClose={() => setSelected(null)} />}
    </section>
  );
}

// ─── SKILLS ─────────────────────────────────────────────────────────────────

function SkillsSection() {
  const [open, setOpen] = useState<string | null>(null);

  return (
    <section id="skills" className="py-24">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        <div className="mb-14">
          <p className="text-sm font-semibold text-[#4F7DF7] uppercase tracking-wider mb-3">技能樹</p>
          <h2 className="text-4xl font-black text-[#1F2937]">能力組合，<span className="text-[#4F7DF7]">環環相扣。</span></h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {SKILLS.map(s => {
            const isOpen = open === s.id;
            return (
              <div key={s.id} className={`bg-white rounded-2xl border shadow-sm overflow-hidden transition-all duration-300 ${isOpen ? "border-gray-200 shadow-md" : "border-gray-100 hover:shadow-md hover:-translate-y-0.5"}`}>
                <button className="w-full p-6 text-left" onClick={() => setOpen(isOpen ? null : s.id)}>
                  <div className="flex items-start justify-between">
                    <div className="w-11 h-11 rounded-2xl flex items-center justify-center mb-4" style={{ backgroundColor: `${s.color}15` }}>
                      <s.Icon className="w-5 h-5" style={{ color: s.color }} />
                    </div>
                    <ChevronDown className={`w-4 h-4 text-gray-400 transition-transform duration-300 ${isOpen ? "rotate-180" : ""}`} />
                  </div>
                  <h3 className="text-lg font-bold text-[#1F2937] mb-1">{s.name}</h3>
                  <p className="text-sm text-[#6B7280]">{s.desc}</p>
                </button>

                {isOpen && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.2 }}
                    className="px-6 pb-6 border-t border-gray-100"
                  >
                    <div className="pt-5 mb-4">
                      <p className="text-xs font-bold text-[#6B7280] uppercase tracking-wider mb-3">核心技能</p>
                      <div className="flex flex-wrap gap-2">
                        {s.subs.map(sub => (
                          <span key={sub} className="text-xs px-3 py-1.5 rounded-full font-medium border transition-colors"
                            style={{ color: s.color, backgroundColor: `${s.color}10`, borderColor: `${s.color}30` }}>
                            {sub}
                          </span>
                        ))}
                      </div>
                    </div>
                    <div>
                      <p className="text-xs font-bold text-[#6B7280] uppercase tracking-wider mb-2">相關專案</p>
                      {s.projects.map(proj => (
                        <div key={proj} className="flex items-center gap-2 py-1.5">
                          <div className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: s.color }} />
                          <span className="text-xs text-[#1F2937]">{proj}</span>
                        </div>
                      ))}
                    </div>
                  </motion.div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

// ─── DASHBOARD ──────────────────────────────────────────────────────────────

function DashboardSection() {
  const [note, setNote] = useState("");
  const [dTasks, setDTasks] = useState([
    { text: "確認系統整合測試報告", done: false },
    { text: "與資安部門確認合規事項", done: true },
    { text: "更新里程碑追蹤表", done: false },
    { text: "準備利害關係人週報", done: false },
  ]);

  return (
    <section id="dashboard" className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        <div className="mb-14">
          <p className="text-sm font-semibold text-[#4F7DF7] uppercase tracking-wider mb-3">PM 工作台</p>
          <h2 className="text-4xl font-black text-[#1F2937]">我的<span className="text-[#4F7DF7]">工作節奏。</span></h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {/* Today's Tasks */}
          <div className="bg-[#F7F7F5] rounded-2xl border border-gray-100 p-6">
            <div className="flex items-center gap-2 mb-5">
              <CheckCheck className="w-4 h-4 text-[#4F7DF7]" />
              <span className="text-sm font-bold text-[#1F2937]">今日任務</span>
              <span className="ml-auto text-xs text-[#6B7280]">{dTasks.filter(t => t.done).length}/{dTasks.length}</span>
            </div>
            <div className="space-y-3">
              {dTasks.map((t, i) => (
                <button key={i} onClick={() => setDTasks(prev => prev.map((tt, ii) => ii === i ? { ...tt, done: !tt.done } : tt))}
                  className="w-full flex items-center gap-3 text-left group">
                  <div className={`w-5 h-5 rounded-lg flex-shrink-0 flex items-center justify-center transition-all ${t.done ? "bg-[#4F7DF7]" : "border-2 border-gray-300 group-hover:border-[#4F7DF7]"}`}>
                    {t.done && <svg className="w-3 h-3 text-white" fill="none" viewBox="0 0 10 8"><path d="M1 4l3 3 5-6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" /></svg>}
                  </div>
                  <span className={`text-sm ${t.done ? "line-through text-gray-400" : "text-[#1F2937]"}`}>{t.text}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Project Progress */}
          <div className="bg-[#F7F7F5] rounded-2xl border border-gray-100 p-6">
            <div className="flex items-center gap-2 mb-5">
              <BarChart3 className="w-4 h-4 text-[#8B5CF6]" />
              <span className="text-sm font-bold text-[#1F2937]">專案進度</span>
            </div>
            {[
              { name: "跨部會資料交換平台", pct: 92, color: "#22C55E", status: "已完成" },
              { name: "智慧服務整合系統", pct: 65, color: "#4F7DF7", status: "進行中" },
              { name: "AI 文件生成系統", pct: 100, color: "#22C55E", status: "已完成" },
              { name: "開放資料品質平台", pct: 15, color: "#F59E0B", status: "規劃中" },
            ].map((p, i) => (
              <div key={i} className="mb-4 last:mb-0">
                <div className="flex justify-between items-center mb-1.5">
                  <span className="text-xs text-[#1F2937] font-medium">{p.name}</span>
                  <span className="text-xs font-bold" style={{ color: p.color }}>{p.pct}%</span>
                </div>
                <div className="h-1.5 bg-gray-200 rounded-full overflow-hidden">
                  <div className="h-full rounded-full" style={{ width: `${p.pct}%`, backgroundColor: p.color }} />
                </div>
              </div>
            ))}
          </div>

          {/* Upcoming Meetings */}
          <div className="bg-[#F7F7F5] rounded-2xl border border-gray-100 p-6">
            <div className="flex items-center gap-2 mb-5">
              <Calendar className="w-4 h-4 text-[#10B981]" />
              <span className="text-sm font-bold text-[#1F2937]">即將到來的會議</span>
            </div>
            {[
              { title: "跨部會工作小組", time: "今天 14:30", type: "例行會議", count: 5 },
              { title: "資安合規審查", time: "明天 10:00", type: "稽核會議", count: 8 },
              { title: "AI 系統驗收測試", time: "週四 15:00", type: "驗收會議", count: 12 },
            ].map((m, i) => (
              <div key={i} className="flex gap-3 py-3 border-b border-gray-200 last:border-0">
                <div className="w-8 h-8 bg-emerald-50 rounded-xl flex items-center justify-center flex-shrink-0">
                  <Clock className="w-4 h-4 text-[#10B981]" />
                </div>
                <div>
                  <p className="text-sm font-medium text-[#1F2937]">{m.title}</p>
                  <p className="text-xs text-[#6B7280]">{m.time} · {m.count} 人 · {m.type}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Risk Overview */}
          <div className="bg-[#F7F7F5] rounded-2xl border border-gray-100 p-6">
            <div className="flex items-center gap-2 mb-5">
              <AlertTriangle className="w-4 h-4 text-[#F59E0B]" />
              <span className="text-sm font-bold text-[#1F2937]">風險概覽</span>
            </div>
            {[
              { label: "資安合規未確認", level: "高", color: "#EF4444", project: "智慧服務整合" },
              { label: "第三方 API 穩定性", level: "中", color: "#F59E0B", project: "資料交換平台" },
              { label: "資源排程衝突", level: "中", color: "#F59E0B", project: "多專案共用" },
              { label: "文件更新延遲", level: "低", color: "#22C55E", project: "AI 文件系統" },
            ].map((r, i) => (
              <div key={i} className="flex items-center gap-3 py-2.5 border-b border-gray-200 last:border-0">
                <div className="w-2 h-2 rounded-full flex-shrink-0" style={{ backgroundColor: r.color }} />
                <div className="flex-1">
                  <p className="text-xs font-medium text-[#1F2937]">{r.label}</p>
                  <p className="text-xs text-[#6B7280]">{r.project}</p>
                </div>
                <span className="text-xs font-semibold px-2 py-0.5 rounded-full" style={{ color: r.color, backgroundColor: `${r.color}15` }}>{r.level}</span>
              </div>
            ))}
          </div>

          {/* Milestones */}
          <div className="bg-[#F7F7F5] rounded-2xl border border-gray-100 p-6">
            <div className="flex items-center gap-2 mb-5">
              <Flag className="w-4 h-4 text-[#4F7DF7]" />
              <span className="text-sm font-bold text-[#1F2937]">里程碑</span>
            </div>
            {[
              { name: "資料交換平台驗收", date: "2024.02.28", done: true },
              { name: "智慧服務 β 測試啟動", date: "2024.03.15", done: true },
              { name: "開放資料平台需求確認", date: "2024.04.01", done: false },
              { name: "跨機關推廣計畫啟動", date: "2024.05.20", done: false },
            ].map((m, i) => (
              <div key={i} className="flex items-center gap-3 py-2.5 border-b border-gray-200 last:border-0">
                <div className={`w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0 ${m.done ? "bg-[#22C55E]" : "border-2 border-gray-300"}`}>
                  {m.done && <svg className="w-3 h-3 text-white" fill="none" viewBox="0 0 10 8"><path d="M1 4l3 3 5-6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" /></svg>}
                </div>
                <div className="flex-1">
                  <p className={`text-xs font-medium ${m.done ? "line-through text-gray-400" : "text-[#1F2937]"}`}>{m.name}</p>
                </div>
                <span className="text-xs text-[#6B7280]">{m.date}</span>
              </div>
            ))}
          </div>

          {/* Quick Notes */}
          <div className="bg-[#F7F7F5] rounded-2xl border border-gray-100 p-6">
            <div className="flex items-center gap-2 mb-5">
              <PenLine className="w-4 h-4 text-[#6B7280]" />
              <span className="text-sm font-bold text-[#1F2937]">快速筆記</span>
            </div>
            <textarea
              value={note}
              onChange={e => setNote(e.target.value)}
              placeholder="記錄想法或待辦事項..."
              className="w-full h-36 text-sm text-[#1F2937] bg-white border border-gray-200 rounded-xl p-3 resize-none focus:outline-none focus:border-[#4F7DF7] transition-colors placeholder:text-gray-300"
            />
            <div className="flex justify-between items-center mt-2">
              <span className="text-xs text-[#6B7280]">{note.length} 字</span>
              {note && (
                <button onClick={() => setNote("")} className="text-xs text-[#6B7280] hover:text-[#EF4444] transition-colors">清除</button>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

// ─── SIDE PROJECTS ──────────────────────────────────────────────────────────

function SideProjectsSection() {
  const [open, setOpen] = useState<number | null>(null);

  return (
    <section className="py-24">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        <div className="mb-14">
          <p className="text-sm font-semibold text-[#4F7DF7] uppercase tracking-wider mb-3">側專案</p>
          <h2 className="text-4xl font-black text-[#1F2937]">業餘時間，<span className="text-[#4F7DF7]">持續創造。</span></h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {SIDE_PROJECTS.map(p => (
            <div key={p.id} className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden hover:shadow-md hover:-translate-y-0.5 transition-all duration-300">
              <div className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 rounded-full" style={{ backgroundColor: p.statusColor }} />
                    <span className="text-xs font-semibold" style={{ color: p.statusColor }}>{p.status}</span>
                  </div>
                  <Star className="w-4 h-4 text-gray-300" />
                </div>

                <h3 className="text-lg font-bold text-[#1F2937] mb-2">{p.name}</h3>
                <p className="text-sm text-[#6B7280] leading-relaxed mb-4">{p.desc}</p>

                <div className="flex flex-wrap gap-1.5 mb-5">
                  {p.tags.map(t => (
                    <span key={t} className="text-xs px-2.5 py-1 bg-[#F7F7F5] border border-gray-200 text-[#6B7280] rounded-full">{t}</span>
                  ))}
                </div>

                <button onClick={() => setOpen(open === p.id ? null : p.id)}
                  className="text-xs font-semibold text-[#4F7DF7] flex items-center gap-1">
                  {open === p.id ? "收起詳情" : "查看詳情"}
                  <ChevronDown className={`w-3.5 h-3.5 transition-transform ${open === p.id ? "rotate-180" : ""}`} />
                </button>

                {open === p.id && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    transition={{ duration: 0.25 }}
                    className="mt-4 pt-4 border-t border-gray-100 space-y-3"
                  >
                    {[
                      { label: "架構", value: p.architecture },
                      { label: "學到了", value: p.lessons },
                      { label: "下一步", value: p.roadmap },
                    ].map(item => (
                      <div key={item.label}>
                        <p className="text-xs font-bold text-[#6B7280] mb-1">{item.label}</p>
                        <p className="text-xs text-[#1F2937] leading-relaxed">{item.value}</p>
                      </div>
                    ))}
                  </motion.div>
                )}
              </div>

              <div className="border-t border-gray-100 flex">
                {p.hasDemo && (
                  <a href="#" className="flex-1 flex items-center justify-center gap-1.5 py-3 text-xs font-semibold text-[#4F7DF7] hover:bg-blue-50 transition-colors">
                    <Zap className="w-3.5 h-3.5" />
                    Live Demo
                  </a>
                )}
                {p.hasDemo && p.hasGithub && <div className="w-px bg-gray-100" />}
                {p.hasGithub && (
                  <a href="#" className="flex-1 flex items-center justify-center gap-1.5 py-3 text-xs font-semibold text-[#6B7280] hover:bg-gray-50 transition-colors">
                    <Github className="w-3.5 h-3.5" />
                    GitHub
                  </a>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── CONTACT ────────────────────────────────────────────────────────────────

function ContactSection() {
  return (
    <section id="contact" className="py-32 bg-[#1F2937]">
      <div className="max-w-7xl mx-auto px-6 lg:px-12 text-center">
        <p className="text-sm font-semibold text-[#4F7DF7] uppercase tracking-wider mb-6">聯絡我</p>
        <h2 className="text-5xl lg:text-6xl font-black text-white mb-6 leading-tight">
          一起打造<span className="text-[#4F7DF7]">更好的事物。</span>
        </h2>
        <p className="text-lg text-gray-400 mb-14 max-w-lg mx-auto leading-relaxed">
          無論是專案合作、顧問諮詢或只是想交流想法，都歡迎與我聯繫。
        </p>

        <div className="flex flex-wrap justify-center gap-4">
          {[
            { label: "寄信給我", Icon: Mail, href: "mailto:eric@example.com", primary: true },
            { label: "LinkedIn", Icon: Linkedin, href: "#" },
            { label: "GitHub", Icon: Github, href: "#" },
            { label: "下載履歷", Icon: Download, href: "#" },
          ].map(btn => (
            <a key={btn.label} href={btn.href}
              className={`flex items-center gap-2.5 px-7 py-3.5 rounded-full font-semibold transition-all duration-200 ${
                btn.primary
                  ? "bg-[#4F7DF7] text-white hover:bg-[#3B6EF2] shadow-lg hover:shadow-xl hover:-translate-y-0.5"
                  : "bg-white/10 text-white hover:bg-white/20 border border-white/20 hover:-translate-y-0.5"
              }`}>
              <btn.Icon className="w-4 h-4" />
              {btn.label}
            </a>
          ))}
        </div>

        <div className="mt-24 pt-8 border-t border-white/10 flex flex-col md:flex-row items-center justify-between gap-4">
          <span className="text-2xl font-black text-[#4F7DF7]">Eric.</span>
          <p className="text-sm text-gray-500">© 2024 Eric · 專案管理師 × 資訊整合 × AI</p>
          <p className="text-sm text-gray-500">Designed with care ✦</p>
        </div>
      </div>
    </section>
  );
}

// ─── AI CHAT ────────────────────────────────────────────────────────────────

type ChatMsg = { role: "user" | "ai"; text: string };

function AIChat() {
  const [open, setOpen] = useState(false);
  const [msgs, setMsgs] = useState<ChatMsg[]>([
    { role: "ai", text: "嗨！我是 Eric AI 助理。你可以問我任何關於 Eric 的問題，或選擇以下常見問題。" }
  ]);
  const [input, setInput] = useState("");
  const [typing, setTyping] = useState(false);
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [msgs, typing]);

  const send = (text: string) => {
    if (!text.trim()) return;
    setMsgs(m => [...m, { role: "user", text }]);
    setInput("");
    setTyping(true);
    setTimeout(() => {
      const key = Object.keys(CHAT_QA).find(k =>
        text.toLowerCase().includes(k) || k === text
      ) || "intro";
      setTyping(false);
      setMsgs(m => [...m, { role: "ai", text: CHAT_QA[key] }]);
    }, 1200);
  };

  return (
    <>
      {/* Floating button */}
      <button
        onClick={() => setOpen(true)}
        className="fixed bottom-6 right-6 z-40 w-14 h-14 bg-[#4F7DF7] text-white rounded-full shadow-xl hover:bg-[#3B6EF2] hover:shadow-2xl hover:-translate-y-0.5 transition-all duration-200 flex items-center justify-center"
      >
        <Bot className="w-6 h-6" />
      </button>

      {/* Chat panel */}
      {open && (
        <motion.div
          initial={{ opacity: 0, y: 20, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.2 }}
          className="fixed bottom-24 right-6 z-50 w-88 bg-white rounded-3xl shadow-2xl border border-gray-100 overflow-hidden flex flex-col"
          style={{ width: "360px", height: "520px" }}
        >
          {/* Header */}
          <div className="flex items-center gap-3 px-5 py-4 border-b border-gray-100 bg-gradient-to-r from-[#4F7DF7] to-[#6B8FF8]">
            <div className="w-9 h-9 bg-white/20 rounded-xl flex items-center justify-center">
              <Bot className="w-5 h-5 text-white" />
            </div>
            <div>
              <p className="text-sm font-bold text-white">詢問 Eric AI</p>
              <div className="flex items-center gap-1.5">
                <div className="w-1.5 h-1.5 rounded-full bg-green-300 animate-pulse" />
                <p className="text-xs text-white/70">線上中</p>
              </div>
            </div>
            <button onClick={() => setOpen(false)} className="ml-auto w-7 h-7 rounded-full bg-white/20 flex items-center justify-center hover:bg-white/30 transition-colors">
              <X className="w-3.5 h-3.5 text-white" />
            </button>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-4 space-y-3">
            {msgs.map((m, i) => (
              <div key={i} className={`flex ${m.role === "user" ? "justify-end" : "justify-start"}`}>
                <div className={`max-w-[85%] px-4 py-3 rounded-2xl text-sm leading-relaxed whitespace-pre-line ${
                  m.role === "user"
                    ? "bg-[#4F7DF7] text-white rounded-br-md"
                    : "bg-gray-100 text-[#1F2937] rounded-bl-md"
                }`}>
                  {m.text}
                </div>
              </div>
            ))}
            {typing && (
              <div className="flex justify-start">
                <div className="bg-gray-100 rounded-2xl rounded-bl-md px-4 py-3 flex gap-1">
                  {[0, 1, 2].map(i => (
                    <motion.div key={i} className="w-1.5 h-1.5 rounded-full bg-gray-400"
                      animate={{ y: [0, -4, 0] }}
                      transition={{ duration: 0.6, repeat: Infinity, delay: i * 0.15 }} />
                  ))}
                </div>
              </div>
            )}
            <div ref={bottomRef} />
          </div>

          {/* Suggested questions */}
          {msgs.length <= 2 && (
            <div className="px-4 pb-2 flex flex-wrap gap-1.5">
              {SUGGESTED_QS.map(q => (
                <button key={q.key} onClick={() => send(q.key)}
                  className="text-xs px-3 py-1.5 bg-blue-50 text-[#4F7DF7] rounded-full hover:bg-blue-100 transition-colors font-medium">
                  {q.label}
                </button>
              ))}
            </div>
          )}

          {/* Input */}
          <div className="flex items-center gap-2 px-4 py-3 border-t border-gray-100">
            <input
              value={input}
              onChange={e => setInput(e.target.value)}
              onKeyDown={e => e.key === "Enter" && send(input)}
              placeholder="輸入問題..."
              className="flex-1 text-sm bg-gray-100 rounded-full px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-[#4F7DF7]/30"
            />
            <button onClick={() => send(input)}
              className="w-9 h-9 bg-[#4F7DF7] rounded-full flex items-center justify-center hover:bg-[#3B6EF2] transition-colors flex-shrink-0">
              <Send className="w-4 h-4 text-white" />
            </button>
          </div>
        </motion.div>
      )}
    </>
  );
}

// ─── APP ────────────────────────────────────────────────────────────────────

export default function App() {
  return (
    <div className="min-h-screen bg-[#F7F7F5]" style={{ fontFamily: "'Inter', sans-serif", scrollBehavior: "smooth" }}>
      <Nav />
      <HeroSection />
      <AchievementsSection />
      <TimelineSection />
      <ProjectsSection />
      <SkillsSection />
      <DashboardSection />
      <SideProjectsSection />
      <ContactSection />
      <AIChat />
    </div>
  );
}
