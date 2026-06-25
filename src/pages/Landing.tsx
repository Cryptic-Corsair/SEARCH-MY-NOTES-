import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import {
  ArrowRight,
  BookOpenCheck,
  Clock3,
  FileText,
  Layers3,
  MousePointer2,
  Search,
  ShieldCheck,
  Sparkles,
  Target,
  Wand2,
  Zap,
} from "lucide-react";
import { BackgroundPaths } from "@/components/BackgroundPaths";

const LANDING_THEME = {
  bg: "#1a1515",
  text: "#ffffff",
  primary: "#FA8072",
  secondary: "#2d2a2a",
  accent: "#DC143C",
};

const LANDING_FEATURES = [
  {
    icon: <Search className="h-6 w-6" />,
    title: "Surgical search",
    copy: "Compose exam-board-aware queries that cut through noisy results and move straight toward revision notes, PDFs, and topic pages.",
  },
  {
    icon: <Layers3 className="h-6 w-6" />,
    title: "Curriculum layers",
    copy: "Stack board, level, subject, unit, and topic context so each search starts with the academic signal students actually need.",
  },
  {
    icon: <FileText className="h-6 w-6" />,
    title: "PDF-first workflow",
    copy: "Prioritize portable revision resources that are easy to open, save, annotate, and revisit before exams.",
  },
  {
    icon: <Zap className="h-6 w-6" />,
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
  "Kinematics",
  "Bonding",
  "Cell structure",
  "Calculus",
  "Macroeconomics",
  "Organic chemistry",
  "Vectors",
  "Genetics",
  "Forces",
  "Statistics",
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
    <div className="relative text-3xl text-[var(--primary)] drop-shadow-[0_0_18px_var(--primary)] md:text-4xl">{value}</div>
    <div className="relative mt-1 text-[10px] uppercase tracking-[0.28em] text-[var(--text)]/55">{label}</div>
  </motion.div>
);

const Landing = () => {
  return (
    <main
      className="relative min-h-screen overflow-hidden bg-[var(--bg)] font-sans text-[var(--text)]"
      style={
        {
          "--bg": LANDING_THEME.bg,
          "--text": LANDING_THEME.text,
          "--primary": LANDING_THEME.primary,
          "--secondary": LANDING_THEME.secondary,
          "--accent": LANDING_THEME.accent,
        } as React.CSSProperties
      }
    >
      <BackgroundPaths />
      <div className="fixed left-[-10%] top-[-10%] -z-10 h-[40%] w-[40%] rounded-full bg-[var(--primary)]/20 blur-[120px]" />
      <div className="fixed bottom-[-10%] right-[-10%] -z-10 h-[40%] w-[40%] rounded-full bg-[var(--accent)]/20 blur-[120px]" />

      <nav className="relative z-50 mx-auto flex w-full max-w-7xl items-center justify-between px-4 py-5">
        <Link to="/" className="rounded-full border border-white/20 bg-[var(--secondary)]/20 px-5 py-3 text-xs uppercase tracking-[0.28em] text-[var(--text)]/70 backdrop-blur-xl transition hover:border-[var(--primary)]/50 hover:text-[var(--primary)]">
          Search My Notes
        </Link>
        <Link to="/" className="group inline-flex items-center gap-2 rounded-full bg-[var(--primary)] px-5 py-3 text-sm uppercase tracking-[0.18em] text-[var(--bg)] shadow-[0_0_24px_-10px_var(--primary)] transition hover:scale-105">
          Launch app <ArrowRight className="h-4 w-4 transition group-hover:translate-x-1" />
        </Link>
      </nav>

      <section className="relative mx-auto flex min-h-[calc(100vh-5.5rem)] w-full max-w-7xl flex-col items-center justify-center overflow-hidden px-4 py-10 text-center">
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

        <div className="mt-10 grid w-full max-w-4xl grid-cols-1 gap-3 md:grid-cols-3">
          <AnimatedMetric value="3" label="filters to focus" delay={0.35} />
          <AnimatedMetric value="10x" label="less tab chaos" delay={0.45} />
          <AnimatedMetric value="PDF" label="ready resources" delay={0.55} />
        </div>
      </section>

      <section className="mx-auto grid max-w-7xl gap-4 px-4 py-10 md:grid-cols-2 lg:grid-cols-4">
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

      <section className="relative mx-auto my-8 max-w-7xl overflow-hidden rounded-[3rem] border border-[var(--text)]/10 bg-[var(--secondary)]/20 p-6 backdrop-blur-2xl md:p-10">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_25%_20%,var(--primary)_0,transparent_30%),radial-gradient(circle_at_80%_70%,var(--accent)_0,transparent_28%)] opacity-10" />
        <div className="relative grid items-center gap-10 lg:grid-cols-[0.9fr_1.1fr]">
          <div className="text-left">
            <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-[var(--primary)]/20 px-4 py-2 text-xs uppercase tracking-[0.3em] text-[var(--primary)]">
              <Target className="h-4 w-4" /> study flow
            </div>
            <h2 className="text-4xl uppercase leading-none tracking-[-0.07em] md:text-6xl">From topic panic to revision clarity.</h2>
            <p className="mt-5 max-w-xl text-base leading-8 text-[var(--text)]/60">This standalone landing page stays separate from the app, while the main search page keeps its original compact workflow.</p>
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

      <section className="mx-auto max-w-7xl px-4 py-10">
        <div className="mb-6 flex items-center justify-between gap-4 text-left">
          <h2 className="text-3xl uppercase tracking-[-0.06em] md:text-5xl">Live topic atmosphere</h2>
          <div className="hidden items-center gap-2 rounded-full border border-[var(--text)]/10 px-4 py-2 text-xs uppercase tracking-[0.25em] text-[var(--text)]/50 md:flex"><Clock3 className="h-4 w-4" /> always moving</div>
        </div>
        <div className="relative overflow-hidden rounded-[2rem] border border-[var(--text)]/10 bg-[var(--secondary)]/15 py-5 backdrop-blur-xl">
          <motion.div
            className="flex w-max gap-3 px-3"
            animate={{ x: [0, "-50%"] }}
            transition={{ duration: 34, repeat: Infinity, ease: "linear" }}
          >
            {[...FLOATING_TOPICS, ...FLOATING_TOPICS].map((topic, index) => (
              <span key={`${topic}-${index}`} className="rounded-full border border-[var(--primary)]/20 bg-[var(--primary)]/10 px-5 py-3 text-sm uppercase tracking-[0.12em] text-[var(--text)]/75 shadow-[0_0_20px_-14px_var(--primary)]">{topic}</span>
            ))}
          </motion.div>
        </div>
      </section>

      <section className="mx-auto mb-10 max-w-7xl px-4">
        <div className="overflow-hidden rounded-[3rem] border border-[var(--primary)]/20 bg-[var(--primary)]/10 p-8 text-center backdrop-blur-2xl md:p-12">
          <ShieldCheck className="mx-auto mb-5 h-10 w-10 text-[var(--primary)] drop-shadow-[0_0_18px_var(--primary)]" />
          <h2 className="text-4xl uppercase tracking-[-0.07em] md:text-6xl">Ready when revision gets real.</h2>
          <p className="mx-auto mt-5 max-w-2xl text-[var(--text)]/60">The real search app is untouched on the home route. Open it when you want the focused resource workflow.</p>
          <Link to="/" className="mt-8 inline-flex items-center gap-3 rounded-full bg-[var(--primary)] px-7 py-4 text-sm uppercase tracking-[0.2em] text-[var(--bg)] transition hover:scale-105">
            <BookOpenCheck className="h-5 w-5" /> Open Search App
          </Link>
        </div>
      </section>
    </main>
  );
};

export default Landing;
