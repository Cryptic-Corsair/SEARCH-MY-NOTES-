import { useState, useMemo, memo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Download, ExternalLink, LayoutGrid, GraduationCap, Library, ArrowUp, FlaskConical, Atom, Dna, Calculator, TrendingUp, Palette, Info, Maximize2, X } from "lucide-react";
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

  const downloadSelectedFile = () => {
    if (!searchUrl) return;

    const downloadLink = document.createElement("a");
    downloadLink.href = searchUrl;
    downloadLink.download = "search-my-notes-results";
    document.body.appendChild(downloadLink);
    downloadLink.click();
    document.body.removeChild(downloadLink);
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

      <div className={`flex-1 flex flex-col w-full max-w-5xl mx-auto px-4 transition-all duration-500 min-h-0 ${searchUrl ? 'pt-2' : 'justify-center pb-32'}`}>
        
        {!searchUrl && (
          <div className="mb-12 animate-fade-in flex flex-col items-center justify-center text-center shrink-0">
            <h1 
              className="text-3xl md:text-4xl font-medium md:font-bold text-[var(--text)] tracking-widest uppercase bg-transparent drop-shadow-[0_0_20px_var(--primary)] mb-4"
            >
              SEARCH MY NOTES
            </h1>
            <p className="text-[var(--text)]/60 text-sm md:text-base font-medium md:font-semibold tracking-wide">
              ONE TOPIC AT A TIME
            </p>
          </div>
        )}

        {/* Search Area */}
        <div className="w-full flex flex-col gap-3 relative z-50 shrink-0">
          {/* Circular blur gradient behind search bar */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-[150%] bg-[var(--primary)]/10 blur-[80px] rounded-full -z-10 pointer-events-none transition-colors duration-500" />
          
          {/* Capsules */}
          <div className="flex flex-wrap gap-2 px-1 pb-2 md:justify-center">
            <CustomDropdown 
              label="" 
              value={board} 
              onChange={setBoard} 
              placeholder="Board" 
              options={boardOpts} 
              variant="ai-capsule" 
              icon={BOARD_ICON}
              themeName={theme.name}
            />
            <CustomDropdown 
              label="" 
              value={level} 
              onChange={setLevel} 
              placeholder="Level" 
              options={levelOpts} 
              variant="ai-capsule" 
              icon={LEVEL_ICON}
              themeName={theme.name}
            />
            <CustomDropdown 
              label="" 
              value={subject} 
              onChange={setSubject} 
              placeholder="Subject" 
              options={subjectOpts} 
              variant="ai-capsule" 
              icon={SUBJECT_ICON}
              themeName={theme.name}
            />
          </div>

          <SearchBox 
            onSearch={handleSearch} 
          />
        </div>

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
                  <button
                    onClick={downloadSelectedFile}
                    className="p-1.5 text-[var(--text)]/50 hover:text-[var(--primary)] hover:bg-[var(--primary)]/10 rounded-md transition-colors"
                    title="Download selected file"
                    aria-label="Download selected file"
                  >
                    <Download className="w-4 h-4" />
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
