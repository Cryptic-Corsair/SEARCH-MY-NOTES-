import { useState, useMemo, memo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ExternalLink, LayoutGrid, GraduationCap, Library, ArrowUp, FlaskConical, Atom, Dna, Calculator, TrendingUp, Palette, Info, Maximize2, X, Sparkles, Zap, Search, FileText, Target, ShieldCheck, MousePointer2, Layers3, Wand2, Clock3 } from "lucide-react";
import CustomDropdown from "@/components/CustomDropdown";
import MenuOverlay from "@/components/MenuOverlay";
import { BackgroundPaths } from "@/components/BackgroundPaths";
import { SUBJECTS } from "@/data/subjects";

const BOARDS = [
  "Edexcel",
  "AQA",
  "OCR",
  "CIE (Cambridge)",
  "WJEC",
  "IB",
] as const;

const LEVELS = [
  "IGCSE",
  "GCSE",
  "A-Level",
  "IAL",
  "AS-Level",
  "IB Standard",
  "IB Higher",
  "Pre-U",
] as const;

const iconMap: Record<string, React.ReactNode> = {
  FlaskConical: <FlaskConical className="w-4 h-4" />,
  Atom: <Atom className="w-4 h-4" />,
  Dna: <Dna className="w-4 h-4" />,
  Calculator: <Calculator className="w-4 h-4" />,
  TrendingUp: <TrendingUp className="w-4 h-4" />,
};

const boardOpts = BOARDS.map((b) => ({ value: b, label: b }));
const levelOpts = LEVELS.map((l) => ({ value: l, label: l }));
const subjectOpts = SUBJECTS.map((s) => ({ value: s.name, label: s.name, icon: iconMap[s.icon] }));

const BOARD_ICON = <LayoutGrid className="w-4 h-4 text-[var(--primary)]" />;
const LEVEL_ICON = <GraduationCap className="w-4 h-4 text-[var(--primary)]" />;
const SUBJECT_ICON = <Library className="w-4 h-4 text-[var(--primary)]" />;

const LANDING_FEATURES = [
  {
    icon: <Search className="w-6 h-6" />,
    title: "Surgical search",
    copy: "Compose exam-board-aware queries that cut through noisy results and move straight toward revision notes, PDFs, and topic pages.",
  },
  {
    icon: <Layers3 className="w-6 h-6" />,
    title: "Curriculum layers",
    copy: "Stack board, level, subject, unit, and topic context so each search starts with the academic signal students actually need.",
  },
  {
    icon: <FileText className="w-6 h-6" />,
    title: "PDF-first workflow",
    copy: "Prioritize portable revision resources that are easy to open, save, annotate, and revisit before exams.",
  },
  {
    icon: <Zap className="w-6 h-6" />,
    title: "Fast study loops",
    copy: "Jump from uncertainty to focused resources in seconds, then keep refining your search as your revision plan evolves.",
  },
];

const STUDY_STEPS = [
  "Pick your exam board",
  "Choose level and subject",
  "Type the topic you need",
  "Open focused revision notes",
];

const FLOATING_TOPICS = [
  "Kinematics", "Bonding", "Cell structure", "Calculus", "Macroeconomics", "Organic chemistry", "Vectors", "Genetics", "Forces", "Statistics"
];

const LandingOrb = ({ className, delay = 0 }: { className: string; delay?: number }) => (
  <motion.div
    aria-hidden="true"
    className={`absolute rounded-full border border-[var(--primary)]/20 bg-[var(--primary)]/10 backdrop-blur-xl shadow-[0_0_40px_var(--primary)]/20 ${className}`}
    animate={{ y: [0, -22, 0], rotate: [0, 10, -6, 0], scale: [1, 1.06, 1] }}
    transition={{ duration: 7, delay, repeat: Infinity, ease: "easeInOut" }}
  />
);

const AnimatedMetric = ({ value, label, delay }: { value: string; label: string; delay: number }) => (
  <motion.div
    initial={{ opacity: 0, y: 24 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.65, delay }}
    className="relative overflow-hidden rounded-[2rem] border border-[var(--text)]/10 bg-[var(--secondary)]/20 p-5 text-left backdrop-blur-2xl shadow-[0_20px_60px_-30px_var(--primary)]"
  >
    <div className="absolute inset-0 bg-gradient-to-br from-white/15 via-transparent to-[var(--primary)]/10" />
    <div className="relative text-3xl md:text-4xl text-[var(--primary)] drop-shadow-[0_0_18px_var(--primary)]">{value}</div>
    <div className="relative mt-1 text-[10px] uppercase tracking-[0.28em] text-[var(--text)]/55">{label}</div>
  </motion.div>
);

const SearchBox = memo(({ onSearch }: { 
  onSearch: (topic: string) => void
}) => {
  const [topic, setTopic] = useState("");

  return (
    <div className="w-full flex flex-col gap-2">
      {/* Search Box */}
      <div className="bg-[var(--bg)] rounded-full px-6 py-3 flex items-center shadow-[0_0_30px_-5px_var(--primary)] transition-all duration-300 focus-within:border-[var(--primary)]/50 animate-border-run w-full max-w-2xl mx-auto">
        
        <input
          type="text"
          value={topic}
          onChange={(e) => setTopic(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === 'Enter') {
              e.preventDefault();
              if (topic.trim()) onSearch(topic);
            }
          }}
          placeholder="Search academic resources..."
          className="bg-transparent border-none outline-none text-[var(--text)] placeholder:text-[var(--text)]/40 text-sm md:text-base w-full font-medium"
        />
        
        <div className="flex items-center gap-2">
          <button
            onClick={() => { if (topic.trim()) onSearch(topic); }}
            disabled={!topic.trim()}
            className="w-8 h-8 md:w-9 md:h-9 shrink-0 rounded-full flex items-center justify-center transition-all duration-300 hover:scale-105 disabled:opacity-50 border border-[var(--primary)]/30 text-[var(--primary)] hover:bg-[var(--primary)]/20 shadow-md"
          >
            <ArrowUp className="w-6 h-6 md:w-7 md:h-7 rotate-45" />
          </button>
        </div>
      </div>
    </div>
  );
});
SearchBox.displayName = "SearchBox";

const THEMES = [
  { name: 'Dark Salmon', bg: '#1a1515', text: '#ffffff', primary: '#FA8072', secondary: '#2d2a2a', accent: '#DC143C', isLight: false },
  { name: 'Clean Light', bg: '#fafafa', text: '#171717', primary: '#3b82f6', secondary: '#e5e7eb', accent: '#6366f1', isLight: true },
  { name: 'Soft Sand', bg: '#fdfbf7', text: '#292524', primary: '#d97706', secondary: '#e7e5e4', accent: '#ea580c', isLight: true },
  { name: 'Cyberpunk', bg: '#09090b', text: '#e0e7ff', primary: '#f0abfc', secondary: '#18181b', accent: '#c026d3', isLight: false },
];

const TopBar = ({ theme, onToggleTheme, onShowInfo }: { theme: typeof THEMES[0], onToggleTheme: () => void, onShowInfo: () => void }) => {
  const toggleFullscreen = () => {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen();
    } else {
      document.exitFullscreen();
    }
  };

  const borderColor = theme.isLight ? 'border-[var(--accent)]/30' : 'border-white/40';

  return (
    <div className="w-full p-4 flex items-center justify-between z-50 h-20">
      {/* Top Left Capsule: Glassmorphism, Bigger, Hues */}
      <div className={`flex items-center gap-2 rounded-full p-1.5 bg-[var(--secondary)]/20 backdrop-blur-xl border ${borderColor} shadow-2xl relative overflow-hidden group`}>
        {/* Glossy Reflection Overlay */}
        <div className="absolute inset-0 bg-gradient-to-br from-white/20 via-transparent to-transparent pointer-events-none" />
        
        <button onClick={onToggleTheme} className="p-3 text-[var(--text)]/70 hover:text-[var(--primary)] transition-all rounded-full hover:bg-[var(--primary)]/20 hover:shadow-[0_0_15px_var(--primary)] relative z-10">
          <Palette className="w-5 h-5" strokeDasharray="2 2" strokeWidth={2} />
        </button>
        <button onClick={onShowInfo} className="p-3 text-[var(--text)]/70 hover:text-[var(--accent)] transition-all rounded-full hover:bg-[var(--accent)]/20 hover:shadow-[0_0_15px_var(--accent)] relative z-10">
          <Info className="w-5 h-5" strokeDasharray="2 2" strokeWidth={2} />
        </button>
      </div>

      {/* Center Decorative Element */}
      <div className="flex-1 flex justify-center items-center relative h-full">
        <div className="absolute w-24 h-8 bg-[var(--primary)]/10 blur-xl rounded-full pointer-events-none" />
        <span className="text-[var(--text)]/30 text-xs md:text-sm tracking-[0.5em] md:tracking-[1em] font-medium relative z-10 select-none">
          .: :. .: :.
        </span>
      </div>

      {/* Top Right: Fullscreen Button - Glassmorphism, Bigger, Hues */}
      <button
        onClick={toggleFullscreen}
        className={`w-14 h-14 flex items-center justify-center rounded-full bg-[var(--secondary)]/20 backdrop-blur-xl border ${borderColor} text-[var(--text)]/70 hover:text-[var(--primary)] hover:border-[var(--primary)]/50 hover:shadow-[0_0_20px_var(--primary)] transition-all relative overflow-hidden group`}
      >
        {/* Glossy Reflection Overlay */}
        <div className="absolute inset-0 bg-gradient-to-br from-white/20 via-transparent to-transparent pointer-events-none" />
        <Maximize2 className="w-6 h-6 relative z-10" strokeDasharray="2 2" strokeWidth={2} />
      </button>
    </div>
  );
};

const Index = () => {
  const [board, setBoard] = useState("");
  const [level, setLevel] = useState("");
  const [subject, setSubject] = useState("");
  const [unit, setUnit] = useState("");
  const [autoOpen, setAutoOpen] = useState(false);
  const [selectedTopics, setSelectedTopics] = useState<string[]>([]);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [searchUrl, setSearchUrl] = useState<string | null>(null);
  const [themeIndex, setThemeIndex] = useState(() => Math.floor(Math.random() * THEMES.length));
  const [showInfo, setShowInfo] = useState(false);

  const theme = THEMES[themeIndex];

  const toggleTheme = () => setThemeIndex((prev) => (prev + 1) % THEMES.length);

  const selectedSubject = useMemo(
    () => SUBJECTS.find((s) => s.name === subject),
    [subject]
  );

  const selectedUnit = useMemo(
    () => selectedSubject?.units.find((u) => u.name === unit),
    [selectedSubject, unit]
  );

  const buildQuery = (topicText: string) => {
    const parts = ["site:cdn.savemyexams.com"];
    if (board || level) {
      parts.push(`[${[board, level].filter(Boolean).join(" ")}]`);
    }
    if (subject) parts.push(subject);
    if (topicText.trim()) parts.push(topicText.trim());
    parts.push('"revision notes"');
    parts.push("filetype:pdf");
    return parts.join(" ");
  };

  const buildSearchUrl = (topicText: string) =>
    `https://www.google.com/search?igu=1&gl=us&hl=en&pws=0&q=${encodeURIComponent(buildQuery(topicText))}`;

  const handleSearch = (topicText: string) => {
    if (!topicText.trim()) return;
    setSearchUrl(buildSearchUrl(topicText));
  };

  const handleBatchSearch = () => {
    if (selectedTopics.length === 0) return;
    selectedTopics.forEach((t, i) => {
      setTimeout(() => {
        window.open(buildSearchUrl(t), "_blank", "noopener,noreferrer");
      }, i * 300);
    });
  };

  const toggleTopic = (topicName: string) => {
    setSelectedTopics((prev) =>
      prev.includes(topicName)
        ? prev.filter((t) => t !== topicName)
        : [...prev, topicName]
    );
  };

  const selectAllTopics = () => {
    if (!selectedUnit) return;
    const all = selectedUnit.topics.map((t) => t.name);
    setSelectedTopics((prev) =>
      prev.length === all.length ? [] : all
    );
  };

  const unitOpts = useMemo(() => selectedSubject?.units.map((u) => ({ value: u.name, label: u.name })) ?? [], [selectedSubject]);

  return (
    <div className="h-[100dvh] w-screen flex flex-col font-sans overflow-hidden relative text-[var(--text)] transition-colors duration-500" style={{ '--bg': theme.bg, '--text': theme.text, '--primary': theme.primary, '--secondary': theme.secondary, '--accent': theme.accent } as React.CSSProperties}>
      <BackgroundPaths />
      
      {/* Decorative Blur Backdrops */}
      <div className="fixed top-[-10%] left-[-10%] w-[40%] h-[40%] bg-[var(--primary)]/20 blur-[120px] rounded-full pointer-events-none -z-10" />
      <div className="fixed bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-[var(--accent)]/20 blur-[120px] rounded-full pointer-events-none -z-10" />
      <div className="fixed top-[40%] left-[60%] w-[30%] h-[30%] bg-[var(--text)]/10 blur-[100px] rounded-full pointer-events-none -z-10" />

      <TopBar theme={theme} onToggleTheme={toggleTheme} onShowInfo={() => setShowInfo(true)} />

      <AnimatePresence>
        {showInfo && (
          <div className="fixed inset-0 z-[100] flex items-end justify-center bg-black/40 backdrop-blur-sm p-0 md:p-4" onClick={() => setShowInfo(false)}>
            <motion.div 
              initial={{ y: "100%" }}
              animate={{ y: 0 }}
              exit={{ y: "100%" }}
              transition={{ type: "spring", damping: 25, stiffness: 200 }}
              className="bg-[var(--bg)] p-8 rounded-t-[3rem] md:rounded-[2rem] border-t md:border border-[var(--primary)]/30 max-w-xl w-full max-h-[90vh] overflow-y-auto transition-all duration-500 shadow-[0_-20px_50px_-12px_var(--primary)] relative overflow-hidden group" 
              onClick={(e) => e.stopPropagation()}
            >
              {/* Drag Handle for Drawer feel */}
              <div className="w-12 h-1.5 bg-[var(--text)]/10 rounded-full mx-auto mb-6 md:hidden" />

              {/* Decorative background elements for info card */}
              <div className="absolute top-0 right-0 w-32 h-32 bg-[var(--primary)]/5 blur-3xl rounded-full -mr-16 -mt-16" />
              <div className="absolute bottom-0 left-0 w-32 h-32 bg-[var(--accent)]/5 blur-3xl rounded-full -ml-16 -mb-16" />
              
              <div className="relative z-10">
                <h2 className="text-3xl font-medium mb-8 text-[var(--text)] tracking-widest uppercase flex items-center gap-4">
                  <div className="p-2 rounded-xl bg-[var(--primary)]/10 border border-[var(--primary)]/20 shadow-[0_0_15px_var(--primary)]/20">
                    <Info className="w-6 h-6 text-[var(--primary)]" />
                  </div>
                  About
                </h2>
                
                <div className="space-y-6 text-[var(--text)]/70 leading-relaxed tracking-wide">
                  <p className="text-lg font-light italic border-l-2 border-[var(--primary)]/30 pl-4">
                    "Empowering students to master their curriculum, one topic at a time."
                  </p>
                  
                  <p>
                    Search My Notes is a precision-engineered tool for academic efficiency. We aggregate high-quality revision resources from trusted sources, specifically tailored for your exam board and level.
                  </p>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-8">
                    {[
                      "Multi-Board Search",
                      "Unit-Level Filtering",
                      "Direct PDF Access",
                      "Academic Efficiency"
                    ].map((item, i) => (
                      <div key={i} className="flex items-center gap-3 p-3 rounded-2xl bg-[var(--secondary)]/30 border border-[var(--text)]/5 hover:border-[var(--primary)]/20 transition-colors">
                        <div className="w-1.5 h-1.5 rounded-full bg-[var(--primary)] shadow-[0_0_8px_var(--primary)]" />
                        <span className="text-sm font-medium uppercase tracking-tighter">{item}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <button 
                  onClick={() => setShowInfo(false)} 
                  className="mt-10 w-full px-8 py-4 bg-[var(--primary)] text-[var(--bg)] rounded-2xl font-bold uppercase tracking-widest hover:scale-[1.02] active:scale-[0.98] transition-all shadow-[0_10px_20px_-10px_var(--primary)]"
                >
                  Continue
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      <div className={`flex-1 flex flex-col w-full max-w-7xl mx-auto px-4 transition-all duration-500 min-h-0 ${searchUrl ? 'pt-2' : 'overflow-y-auto landing-scroll pb-16'}`}>
        
        {!searchUrl && (
          <section className="relative flex min-h-[calc(100dvh-5rem)] flex-col items-center justify-center overflow-hidden py-10 text-center">
            <LandingOrb className="left-[4%] top-[14%] h-24 w-24" />
            <LandingOrb className="right-[8%] top-[24%] h-16 w-16" delay={1.2} />
            <LandingOrb className="bottom-[18%] left-[18%] h-12 w-12" delay={2.1} />
            <motion.div
              initial={{ opacity: 0, scale: 0.92, y: 28 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              className="relative z-10 mb-8 inline-flex items-center gap-3 rounded-full border border-[var(--primary)]/30 bg-[var(--secondary)]/25 px-5 py-3 text-xs uppercase tracking-[0.32em] text-[var(--text)]/70 backdrop-blur-2xl shadow-[0_0_35px_-15px_var(--primary)]"
            >
              <Sparkles className="h-4 w-4 text-[var(--primary)]" />
              revision search engine
              <Wand2 className="h-4 w-4 text-[var(--accent)]" />
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 35 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.9, delay: 0.1, ease: "easeOut" }}
              className="max-w-6xl text-5xl font-black uppercase leading-[0.88] tracking-[-0.08em] text-[var(--text)] drop-shadow-[0_0_28px_var(--primary)] md:text-8xl lg:text-9xl"
            >
              Search My <span className="font-display italic normal-case tracking-[-0.05em] text-[var(--primary)]">Notes</span>
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.75, delay: 0.25 }}
              className="mt-7 max-w-3xl text-base leading-8 text-[var(--text)]/65 md:text-xl"
            >
              A glowing command center for finding exam-board-specific revision notes, topic PDFs, and focused study resources without the endless tab spiral.
            </motion.p>

            <div className="relative z-50 mt-10 w-full max-w-4xl">
              <div className="absolute inset-x-0 top-1/2 h-32 -translate-y-1/2 rounded-full bg-[var(--primary)]/15 blur-[80px]" />
              <div className="relative rounded-[2rem] border border-[var(--text)]/10 bg-[var(--secondary)]/15 p-4 backdrop-blur-2xl shadow-[0_30px_100px_-45px_var(--primary)]">
                <div className="mb-3 flex flex-wrap justify-center gap-2 px-1 pb-2">
                  <CustomDropdown label="" value={board} onChange={setBoard} placeholder="Board" options={boardOpts} variant="ai-capsule" icon={BOARD_ICON} themeName={theme.name} />
                  <CustomDropdown label="" value={level} onChange={setLevel} placeholder="Level" options={levelOpts} variant="ai-capsule" icon={LEVEL_ICON} themeName={theme.name} />
                  <CustomDropdown label="" value={subject} onChange={setSubject} placeholder="Subject" options={subjectOpts} variant="ai-capsule" icon={SUBJECT_ICON} themeName={theme.name} />
                </div>
                <SearchBox onSearch={handleSearch} />
              </div>
            </div>

            <div className="mt-10 grid w-full max-w-4xl grid-cols-1 gap-3 md:grid-cols-3">
              <AnimatedMetric value="3" label="filters to focus" delay={0.35} />
              <AnimatedMetric value="10x" label="less tab chaos" delay={0.45} />
              <AnimatedMetric value="PDF" label="ready resources" delay={0.55} />
            </div>
          </section>
        )}

        {!searchUrl && (
          <>
            <section className="grid gap-4 py-10 md:grid-cols-2 lg:grid-cols-4">
              {LANDING_FEATURES.map((feature, index) => (
                <motion.article
                  key={feature.title}
                  initial={{ opacity: 0, y: 40 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-80px" }}
                  transition={{ duration: 0.6, delay: index * 0.08 }}
                  whileHover={{ y: -10, rotate: index % 2 === 0 ? -1 : 1 }}
                  className="group relative min-h-72 overflow-hidden rounded-[2rem] border border-[var(--text)]/10 bg-[var(--secondary)]/20 p-6 text-left backdrop-blur-2xl shadow-[0_24px_70px_-45px_var(--primary)]"
                >
                  <div className="absolute inset-0 bg-gradient-to-br from-white/15 via-transparent to-[var(--primary)]/10 opacity-70" />
                  <div className="absolute -right-10 -top-10 h-32 w-32 rounded-full bg-[var(--primary)]/15 blur-3xl transition-transform duration-700 group-hover:scale-150" />
                  <div className="relative mb-8 flex h-14 w-14 items-center justify-center rounded-2xl border border-[var(--primary)]/25 bg-[var(--primary)]/10 text-[var(--primary)] shadow-[0_0_25px_-10px_var(--primary)]">
                    {feature.icon}
                  </div>
                  <h3 className="relative text-2xl uppercase tracking-[-0.05em] text-[var(--text)]">{feature.title}</h3>
                  <p className="relative mt-4 text-sm leading-7 text-[var(--text)]/58">{feature.copy}</p>
                </motion.article>
              ))}
            </section>

            <section className="relative my-8 overflow-hidden rounded-[3rem] border border-[var(--text)]/10 bg-[var(--secondary)]/20 p-6 backdrop-blur-2xl md:p-10">
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_25%_20%,var(--primary)_0,transparent_30%),radial-gradient(circle_at_80%_70%,var(--accent)_0,transparent_28%)] opacity-10" />
              <div className="relative grid items-center gap-10 lg:grid-cols-[0.9fr_1.1fr]">
                <div className="text-left">
                  <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-[var(--primary)]/20 px-4 py-2 text-xs uppercase tracking-[0.3em] text-[var(--primary)]">
                    <Target className="h-4 w-4" /> study flow
                  </div>
                  <h2 className="text-4xl uppercase leading-none tracking-[-0.07em] md:text-6xl">From topic panic to revision clarity.</h2>
                  <p className="mt-5 max-w-xl text-base leading-8 text-[var(--text)]/60">The landing experience is intentionally kinetic: animated cards, floating study chips, glowing surfaces, and a guided search stack make the product feel like a premium study cockpit.</p>
                </div>
                <div className="grid gap-3">
                  {STUDY_STEPS.map((step, index) => (
                    <motion.div
                      key={step}
                      initial={{ opacity: 0, x: 40 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.55, delay: index * 0.1 }}
                      className="group flex items-center gap-4 rounded-[1.5rem] border border-[var(--text)]/10 bg-[var(--bg)]/45 p-4 text-left backdrop-blur-xl hover:border-[var(--primary)]/35 hover:shadow-[0_0_30px_-18px_var(--primary)]"
                    >
                      <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-[var(--primary)] text-[var(--bg)] shadow-[0_0_22px_-8px_var(--primary)]">0{index + 1}</div>
                      <span className="uppercase tracking-[-0.03em] text-[var(--text)]/80">{step}</span>
                      <MousePointer2 className="ml-auto h-5 w-5 text-[var(--primary)] opacity-0 transition-opacity group-hover:opacity-100" />
                    </motion.div>
                  ))}
                </div>
              </div>
            </section>

            <section className="py-10">
              <div className="mb-6 flex items-center justify-between gap-4 text-left">
                <h2 className="text-3xl uppercase tracking-[-0.06em] md:text-5xl">Live topic atmosphere</h2>
                <div className="hidden items-center gap-2 rounded-full border border-[var(--text)]/10 px-4 py-2 text-xs uppercase tracking-[0.25em] text-[var(--text)]/50 md:flex"><Clock3 className="h-4 w-4" /> always moving</div>
              </div>
              <div className="relative overflow-hidden rounded-[2rem] border border-[var(--text)]/10 bg-[var(--secondary)]/15 py-5 backdrop-blur-xl">
                <div className="landing-marquee flex w-max gap-3 px-3">
                  {[...FLOATING_TOPICS, ...FLOATING_TOPICS].map((topic, index) => (
                    <span key={`${topic}-${index}`} className="rounded-full border border-[var(--primary)]/20 bg-[var(--primary)]/10 px-5 py-3 text-sm uppercase tracking-[0.12em] text-[var(--text)]/75 shadow-[0_0_20px_-14px_var(--primary)]">{topic}</span>
                  ))}
                </div>
              </div>
            </section>

            <section className="mb-10 overflow-hidden rounded-[3rem] border border-[var(--primary)]/20 bg-[var(--primary)]/10 p-8 text-center backdrop-blur-2xl md:p-12">
              <ShieldCheck className="mx-auto mb-5 h-10 w-10 text-[var(--primary)] drop-shadow-[0_0_18px_var(--primary)]" />
              <h2 className="text-4xl uppercase tracking-[-0.07em] md:text-6xl">Ready when revision gets real.</h2>
              <p className="mx-auto mt-5 max-w-2xl text-[var(--text)]/60">Choose your filters above, enter one topic, and let the animated search cockpit build a focused resource hunt for you.</p>
            </section>
          </>
        )}

        {/* Results */}
        {searchUrl && (
          <div className="flex-1 mt-6 w-full animate-fade-up flex flex-col pb-4 z-10 min-h-0">
            <div className="flex-1 bg-[var(--bg)] rounded-3xl overflow-hidden shadow-2xl border border-[var(--text)]/10 relative flex flex-col">
              {/* Browser Header Bar */}
              <div className="h-10 md:h-12 bg-[var(--text)]/5 border-b border-[var(--text)]/10 flex items-center px-3 md:px-4 shrink-0 relative justify-center">
                <div className="flex gap-1.5 md:gap-2 absolute left-3 md:left-4">
                  <button onClick={() => setSearchUrl(null)} className="w-2.5 h-2.5 md:w-3 md:h-3 rounded-full bg-red-500 hover:bg-red-600 transition-colors" title="Close browser" />
                  <div className="w-2.5 h-2.5 md:w-3 md:h-3 rounded-full bg-amber-500" />
                  <div className="w-2.5 h-2.5 md:w-3 md:h-3 rounded-full bg-green-500" />
                </div>
                <div className="w-[65%] md:w-full md:max-w-2xl bg-[var(--bg)] rounded-md h-7 md:h-8 px-3 flex items-center justify-center text-[10px] md:text-xs text-[var(--text)]/60 border border-[var(--text)]/10">
                  <span className="truncate">{searchUrl}</span>
                </div>
                <div className="absolute right-3 md:right-4 flex items-center gap-1">
                  <button
                    onClick={() => setSearchUrl(null)}
                    className="p-1.5 text-[var(--text)]/50 hover:text-red-500 transition-colors"
                    title="Close browser"
                  >
                    <X className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => window.open(searchUrl, "_blank", "noopener,noreferrer")}
                    className="p-1.5 text-[var(--text)]/50 hover:text-[var(--text)] transition-colors"
                    title="Open in new tab"
                  >
                    <ExternalLink className="w-4 h-4" />
                  </button>
                </div>
              </div>
              <div className="flex-1 relative bg-white">
                <iframe
                  src={searchUrl}
                  className="absolute inset-0 w-full h-full border-none"
                  title="Search Results"
                  loading="lazy"
                />
              </div>
            </div>
          </div>
        )}
      </div>

      <MenuOverlay
        isOpen={isMenuOpen}
        onClose={() => setIsMenuOpen(false)}
        board={board}
        setBoard={setBoard}
        level={level}
        setLevel={setLevel}
        subject={subject}
        setSubject={setSubject}
        unit={unit}
        setUnit={setUnit}
        boardOpts={boardOpts}
        levelOpts={levelOpts}
        subjectOpts={subjectOpts}
        unitOpts={unitOpts}
        autoOpen={autoOpen}
        setAutoOpen={setAutoOpen}
        setSelectedTopics={setSelectedTopics}
      />
    </div>
  );
};

export default Index;
