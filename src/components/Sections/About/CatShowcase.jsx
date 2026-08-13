"use client";
import React, { useState, useEffect, useRef } from "react";
import { useTheme } from "next-themes";
import Image from "next/image";
import {
  Sparkles,
  Heart,
  ShieldCheck,
  Zap,
  Terminal,
  CheckCircle2,
  Volume2,
  VolumeX,
  Fish,
  Flame,
  MousePointerClick,
  Award,
  Gamepad2,
  Play,
  MessageSquare,
  ChevronRight
} from "lucide-react";
import { playMeow, playPurr } from "@/utils/catAudio";
import CatGameModal from "@/components/CatGameModal";

const CAT_WISDOM = [
  "Pixel says: 'Zero N+1 query leaks detected in Rails today! Purr-fect! 💎'",
  "Pixel says: 'Next.js hydration completed under 10ms! ⚡'",
  "Pixel says: 'If it fits, I sits. If it compiles, I ships! 🐾'",
  "Pixel says: 'AI Agentic workflows purring smoothly at 100% capacity! 🤖'",
  "Pixel says: 'Remember to commit your code before feeding me treats! 🐟'",
];

export default function CatShowcase() {
  const { resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const isDark = mounted && resolvedTheme === "dark";

  const [petCount, setPetCount] = useState(0);
  const [treatCount, setTreatCount] = useState(0);
  const [streak, setStreak] = useState(0);
  const [soundEnabled, setSoundEnabled] = useState(true);
  const [activeTab, setActiveTab] = useState("inspection"); // 'inspection' | 'cli' | 'game'
  const [isPurring, setIsPurring] = useState(false);
  const [particles, setParticles] = useState([]);
  const [isGameOpen, setIsGameOpen] = useState(false);
  const [highScore, setHighScore] = useState(0);
  const [quoteIndex, setQuoteIndex] = useState(0);
  const [showSpeech, setShowSpeech] = useState(false);

  // Interactive CLI logs
  const [cliLogs, setCliLogs] = useState([
    { type: "sys", text: "Pixel OS v2.4 initialized. Ready for developer commands." },
    { type: "cmd", text: "$ pixel --status" },
    { type: "out", text: "All systems operational. Chief Meow Officer active. 🐾" },
  ]);

  const streakTimeoutRef = useRef(null);

  // Sync state with localStorage
  useEffect(() => {
    if (typeof window !== "undefined") {
      const savedPets = parseInt(localStorage.getItem("cat_pet_count") || "0", 10);
      const savedTreats = parseInt(localStorage.getItem("cat_treat_count") || "0", 10);
      const savedScore = parseInt(localStorage.getItem("cat_bug_highscore") || "0", 10);
      setPetCount(savedPets);
      setTreatCount(savedTreats);
      setHighScore(savedScore);
      setMounted(true);
    }
  }, []);

  const spawnParticle = (emoji, x, y) => {
    const newParticle = {
      id: Date.now() + Math.random(),
      emoji,
      x: x || Math.random() * 80 + 10,
      y: y || Math.random() * 40 + 30,
    };
    setParticles((prev) => [...prev.slice(-12), newParticle]);
    setTimeout(() => {
      setParticles((prev) => prev.filter((p) => p.id !== newParticle.id));
    }, 1100);
  };

  const handlePet = (e) => {
    if (e && e.stopPropagation) e.stopPropagation();

    const newCount = petCount + 1;
    const newStreak = streak + 1;
    setPetCount(newCount);
    setStreak(newStreak);

    if (typeof window !== "undefined") {
      localStorage.setItem("cat_pet_count", newCount.toString());
    }

    if (soundEnabled) {
      if (Math.random() > 0.5) {
        playMeow(Math.random() > 0.5 ? "standard" : "expressive");
      } else {
        playPurr();
      }
    }

    setIsPurring(true);
    setTimeout(() => setIsPurring(false), 1400);

    if (streakTimeoutRef.current) clearTimeout(streakTimeoutRef.current);
    streakTimeoutRef.current = setTimeout(() => setStreak(0), 3000);

    setQuoteIndex((prev) => (prev + 1) % CAT_WISDOM.length);
    setShowSpeech(true);

    const rect = e?.currentTarget?.getBoundingClientRect();
    const x = rect ? ((e.clientX - rect.left) / rect.width) * 100 : 50;
    const y = rect ? ((e.clientY - rect.top) / rect.height) * 100 : 50;

    const icons = ["💖", "🐾", "✨", "🔥", "💕"];
    spawnParticle(icons[Math.floor(Math.random() * icons.length)], x, y);

    appendCliLog("cmd", `$ pixel --pet (Pet #${newCount})`);
    appendCliLog("out", `Purrrrr~ Combo Multiplier: ${newStreak}x 🐾`);
  };

  const handleFeedTreat = (e) => {
    if (e && e.stopPropagation) e.stopPropagation();

    const newCount = treatCount + 1;
    setTreatCount(newCount);
    if (typeof window !== "undefined") {
      localStorage.setItem("cat_treat_count", newCount.toString());
    }

    if (soundEnabled) {
      playMeow("chirp");
      setTimeout(() => playPurr(), 300);
    }

    setIsPurring(true);
    setTimeout(() => setIsPurring(false), 1400);

    spawnParticle("🐟", 50, 40);

    appendCliLog("cmd", `$ pixel --feed-fish`);
    appendCliLog("out", `Nom nom! Fish treat consumed. Energy +100% 🐟`);
  };

  const appendCliLog = (type, text) => {
    setCliLogs((prev) => [...prev.slice(-15), { type, text }]);
  };

  const runCliCommand = (cmd) => {
    if (cmd === "audit") {
      appendCliLog("cmd", "$ pixel --run-inspection");
      appendCliLog("out", "[PASS] Rails 💎 | Next.js ⚛️ | AI 🤖 | Postgres ⚡");
      appendCliLog("out", "STATUS: 100% PURR-APPROVED FOR PRODUCTION 🚀");
    } else if (cmd === "pet") {
      handlePet();
    } else if (cmd === "feed") {
      handleFeedTreat();
    } else if (cmd === "quote") {
      const q = CAT_WISDOM[Math.floor(Math.random() * CAT_WISDOM.length)];
      appendCliLog("cmd", "$ pixel --cat-wisdom");
      appendCliLog("out", q);
    } else if (cmd === "clear") {
      setCliLogs([{ type: "sys", text: "Terminal cleared." }]);
    }
  };

  return (
    <>
      <div className="mt-14 relative group rounded-3xl p-[1.5px] bg-gradient-to-r from-indigo-500 via-purple-500 to-cyan-500 shadow-xl dark:shadow-[0_0_50px_rgba(99,102,241,0.2)] transition-all duration-500">
        
        {/* Responsive Backdrop Card (Light mode glass + Dark mode obsidian) */}
        <div className="relative rounded-[22px] bg-white/95 dark:bg-[#070a13] p-4 sm:p-6 md:p-9 overflow-hidden transition-colors duration-300">
          
          {/* Accent Ambient Glow */}
          <div className="absolute top-0 right-0 w-96 h-96 bg-purple-500/10 dark:bg-indigo-600/10 rounded-full blur-[120px] pointer-events-none" />
          <div className="absolute bottom-0 left-0 w-96 h-96 bg-cyan-500/10 dark:bg-cyan-600/10 rounded-full blur-[120px] pointer-events-none" />

          {/* Floating Emoji Particles */}
          {particles.map((p) => (
            <span
              key={p.id}
              className="absolute z-30 text-2xl animate-bounce pointer-events-none transition-all duration-700"
              style={{ left: `${p.x}%`, top: `${p.y}%` }}
            >
              {p.emoji}
            </span>
          ))}

          {/* Main Layout Container */}
          <div className="flex flex-col lg:flex-row items-center lg:items-start gap-8 relative z-10">
            
            {/* Left Column: Pixel Avatar & Quick Action Controls */}
            <div className="flex flex-col items-center flex-shrink-0 w-full sm:w-auto">
              
              {/* Interactive Avatar Box */}
              <div
                onClick={handlePet}
                className="relative w-52 h-52 sm:w-60 sm:h-60 rounded-3xl p-1 bg-gradient-to-br from-indigo-500 via-purple-500 to-cyan-400 shadow-2xl group/cat cursor-pointer transition-all duration-300 hover:scale-105 active:scale-95"
                title="Click to pet Pixel!"
              >
                <div className="relative w-full h-full rounded-[20px] overflow-hidden bg-slate-900">
                  <Image
                    src="/images/coding_cat.png"
                    alt="Chief Meow Officer - Coding Cat"
                    fill
                    className="object-cover transition-transform duration-500 group-hover/cat:scale-110"
                    priority
                  />
                  
                  {/* Purring Overlay & Combo Flash */}
                  {isPurring && (
                    <div className="absolute inset-0 bg-[#0f172a]/65 backdrop-blur-[2px] flex flex-col items-center justify-center animate-pulse z-10">
                      <span className="text-white font-black text-sm px-3.5 py-1.5 rounded-full bg-slate-950/90 border border-purple-400/60 shadow-xl flex items-center gap-1.5">
                        <Heart size={15} className="text-pink-500 fill-pink-500 animate-ping" />
                        Purrrr-fect! 🐾
                      </span>
                      {streak > 1 && (
                        <span className="mt-1.5 text-xs font-black text-amber-300 bg-amber-950/90 border border-amber-400/50 px-2.5 py-0.5 rounded-full animate-bounce">
                          🔥 {streak}x Combo Multiplier!
                        </span>
                      )}
                    </div>
                  )}

                   {/* Top Badge: Live Inspector */}
                  <div className="absolute top-2.5 left-2.5 bg-[#050811]/90 backdrop-blur-md text-[10px] font-bold px-2.5 py-1 rounded-full border border-[#10b981]/40 flex items-center gap-1.5 shadow-lg z-10">
                    <span className="w-2 h-2 rounded-full bg-[#34d399] animate-ping" />
                    <span className="!text-[#34d399]">ONLINE INSPECTOR</span>
                  </div>

                  {/* Bottom Badge: Chief Meow Officer */}
                  <div className="absolute bottom-2.5 left-2.5 right-2.5 bg-[#050811]/95 backdrop-blur-md text-[11px] font-extrabold py-1.5 px-3 rounded-xl border border-[#fbbf24]/40 flex items-center justify-between shadow-xl z-10">
                    <div className="flex items-center gap-1.5">
                      <Sparkles size={13} className="!text-[#fbbf24] animate-spin" />
                      <span className="tracking-wide !text-[#fbbf24]">CHIEF MEOW OFFICER</span>
                    </div>
                    <MousePointerClick size={12} className="!text-[#fbbf24] opacity-80 animate-bounce" />
                  </div>
                </div>
              </div>

              {/* Action Buttons below Avatar */}
              <div className="flex flex-wrap items-center justify-center gap-2 mt-4 w-full">
                <button
                  onClick={handlePet}
                  className="px-3.5 py-1.5 rounded-xl bg-purple-100 dark:bg-purple-500/15 hover:bg-purple-200 dark:hover:bg-purple-500/25 border border-purple-300 dark:border-purple-500/40 text-purple-700 dark:text-purple-300 text-xs font-bold flex items-center gap-1.5 transition-all active:scale-95 shadow-sm"
                >
                  <Heart size={13} className="text-pink-500 fill-pink-500/50" />
                  <span>Pet ({petCount})</span>
                </button>

                <button
                  onClick={handleFeedTreat}
                  className="px-3.5 py-1.5 rounded-xl bg-amber-100 dark:bg-amber-500/15 hover:bg-amber-200 dark:hover:bg-amber-500/25 border border-amber-300 dark:border-amber-500/40 text-amber-800 dark:text-amber-300 text-xs font-bold flex items-center gap-1.5 transition-all active:scale-95 shadow-sm"
                >
                  <Fish size={13} className="text-amber-600 dark:text-amber-400" />
                  <span>Treat ({treatCount})</span>
                </button>

                <button
                  onClick={() => setIsGameOpen(true)}
                  className="px-3 py-1.5 rounded-xl bg-emerald-100 dark:bg-emerald-500/15 hover:bg-emerald-200 dark:hover:bg-emerald-500/25 border border-emerald-300 dark:border-emerald-500/40 text-emerald-800 dark:text-emerald-300 text-xs font-bold flex items-center gap-1 transition-all active:scale-95 shadow-sm"
                  title="Play Bug Hunter Arcade Game 🕹️"
                >
                  <Gamepad2 size={13} />
                  <span>Game 🕹️</span>
                </button>

                <button
                  onClick={() => setSoundEnabled(!soundEnabled)}
                  className={`p-1.5 rounded-xl border text-xs transition-all active:scale-95 ${
                    soundEnabled
                      ? "bg-cyan-100 dark:bg-cyan-500/15 border-cyan-300 dark:border-cyan-500/40 text-cyan-800 dark:text-cyan-300 hover:bg-cyan-200"
                      : "bg-slate-200 dark:bg-slate-800 border-slate-300 dark:border-slate-700 text-slate-600 dark:text-slate-400"
                  }`}
                  title={soundEnabled ? "Mute Meow Sound FX" : "Enable Meow Sound FX"}
                >
                  {soundEnabled ? <Volume2 size={14} /> : <VolumeX size={14} />}
                </button>
              </div>
            </div>

            {/* Right Column: Persona Bio, High-Contrast Terminal & Badges Grid */}
            <div className="flex-1 text-left w-full">
              
              {/* Header Title */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-3">
                <div className="flex items-center gap-2.5">
                  <span className="text-2xl animate-bounce">🐱</span>
                  <h4 className="text-xl md:text-2xl font-black text-slate-900 dark:text-white tracking-wide">
                    Meet Pixel —{" "}
                    <span className="bg-clip-text text-transparent bg-gradient-to-r from-purple-600 via-indigo-600 to-cyan-600 dark:from-indigo-400 dark:via-cyan-300 dark:to-amber-300">
                      Official Code Inspector
                    </span>
                  </h4>
                </div>

                <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-purple-100 dark:bg-purple-500/10 border border-purple-300 dark:border-purple-500/30 text-purple-700 dark:text-purple-300 text-xs font-bold self-start sm:self-auto shadow-sm">
                  <Flame size={13} className="text-amber-500" />
                  <span>Pair Programmer</span>
                </div>
              </div>

              {/* Speech Wisdom Popover */}
              {showSpeech && (
                <div className={`mb-4 p-3 rounded-2xl border text-xs font-medium flex items-center justify-between shadow-md animate-fade-in ${
                  isDark
                    ? "bg-[#0f172a]/95 border-purple-500/40 text-slate-100"
                    : "bg-indigo-50 border-indigo-200 text-indigo-900"
                }`}>
                  <div className="flex items-center gap-2">
                    <MessageSquare size={14} className={isDark ? "text-cyan-400 flex-shrink-0" : "text-indigo-600 flex-shrink-0"} />
                    <span>{CAT_WISDOM[quoteIndex]}</span>
                  </div>
                  <button
                    onClick={() => setShowSpeech(false)}
                    className={`text-xs px-1.5 ${
                      isDark ? "text-slate-400 hover:text-white" : "text-slate-500 hover:text-slate-900"
                    }`}
                  >
                    ✕
                  </button>
                </div>
              )}

              {/* Bio Paragraph */}
              <p className="text-xs md:text-sm text-slate-700 dark:text-slate-300 leading-relaxed mb-5 font-normal">
                Pixel is Tahir’s full-time AI pair-programmer & quality inspector! Whether Tahir is engineering robust backends with <strong className="text-purple-700 dark:text-purple-300">Ruby on Rails 💎</strong>, building fast responsive UIs in <strong className="text-cyan-700 dark:text-cyan-300">Next.js ⚛️</strong>, or orchestrating autonomous AI workflows with <strong className="text-amber-700 dark:text-amber-300">AI & MCP 🤖</strong>, Pixel inspects every pull request by sitting directly on the keyboard to ensure 100% purr-fect execution.
              </p>

              {/* Terminal Console (Always crisp Dark IDE Theme for optimal code contrast) */}
              <div className="mb-6 rounded-2xl bg-[#090d18] border border-slate-700/80 shadow-xl overflow-hidden">
                
                {/* Console Bar */}
                <div className="bg-[#111728] px-4 py-2.5 border-b border-slate-700/80 flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
                  <div className="flex items-center gap-2">
                    <div className="flex gap-1.5 flex-shrink-0">
                      <div className="w-3 h-3 rounded-full bg-red-500/90" />
                      <div className="w-3 h-3 rounded-full bg-yellow-500/90" />
                      <div className="w-3 h-3 rounded-full bg-green-500/90" />
                    </div>
                    <span className="ml-2 text-xs font-mono flex items-center gap-1.5 flex-shrink-0" style={{ color: "#cbd5e1" }}>
                      <Terminal size={13} className="flex-shrink-0" style={{ color: "#22d3ee" }} />
                      pixel-pr-inspector.sh
                    </span>
                  </div>

                  {/* Tab Selector Buttons */}
                  <div className="flex items-center gap-1 text-[11px] font-medium overflow-x-auto scrollbar-hide w-full sm:w-auto pb-1 sm:pb-0">
                    <button
                      onClick={() => setActiveTab("inspection")}
                      className={`px-2.5 py-0.5 rounded-md transition-all flex-shrink-0 ${
                        activeTab === "inspection"
                          ? "bg-purple-500/30 border border-purple-400/50 font-bold"
                          : "hover:!text-white"
                      }`}
                      style={{ color: activeTab === "inspection" ? "#e9d5ff" : "#94a3b8" }}
                    >
                      PR Audit
                    </button>
                    <button
                      onClick={() => setActiveTab("cli")}
                      className={`px-2.5 py-0.5 rounded-md transition-all flex-shrink-0 ${
                        activeTab === "cli"
                          ? "bg-cyan-500/30 border border-cyan-400/50 font-bold"
                          : "hover:!text-white"
                      }`}
                      style={{ color: activeTab === "cli" ? "#a5f3fc" : "#94a3b8" }}
                    >
                      Interactive Shell
                    </button>
                    <button
                      onClick={() => setActiveTab("game")}
                      className={`px-2.5 py-0.5 rounded-md transition-all flex-shrink-0 ${
                        activeTab === "game"
                          ? "bg-emerald-500/30 border border-emerald-400/50 font-bold"
                          : "hover:!text-white"
                      }`}
                      style={{ color: activeTab === "game" ? "#a7f3d0" : "#94a3b8" }}
                    >
                      Bug Hunter Arcade
                    </button>
                  </div>
                </div>

                {/* Console Output Area (Forced high-contrast text via !important) */}
                <div className="p-4 font-mono text-xs !text-slate-100 min-h-[140px] bg-[#090d18]">
                  {activeTab === "inspection" && (
                    <div className="space-y-2">
                      <div className="flex items-start gap-2 !text-purple-300">
                        <span className="!text-slate-500">$</span>
                        <span className="!text-slate-200">pixel --run-inspection --target=TahirPortfolio-Nextjs</span>
                      </div>
                      <div className="flex items-center gap-2 !text-[#34d399]">
                        <CheckCircle2 size={13} className="!text-[#34d399] flex-shrink-0" />
                        <span className="!text-[#34d399] font-medium">[PASS] Ruby on Rails 💎 : Zero N+1 query leaks detected.</span>
                      </div>
                      <div className="flex items-center gap-2 !text-[#34d399]">
                        <CheckCircle2 size={13} className="!text-[#34d399] flex-shrink-0" />
                        <span className="!text-[#34d399] font-medium">[PASS] Next.js & React ⚛️ : Sub-10ms SSR hydration & clean UI.</span>
                      </div>
                      <div className="flex items-center gap-2 !text-[#34d399]">
                        <CheckCircle2 size={13} className="!text-[#34d399] flex-shrink-0" />
                        <span className="!text-[#34d399] font-medium">[PASS] AI & MCP Servers 🤖 : Agentic orchestration purring smoothly.</span>
                      </div>
                      <div className="flex items-center gap-2 !text-[#34d399]">
                        <CheckCircle2 size={13} className="!text-[#34d399] flex-shrink-0" />
                        <span className="!text-[#34d399] font-medium">[PASS] PostgreSQL & Redis ⚡ : Query indexing & caching optimized.</span>
                      </div>
                      <div className="pt-2 flex flex-col sm:flex-row sm:items-center justify-between border-t border-slate-800 font-bold gap-2">
                        <span className="!text-amber-300">STATUS: 🐾 100% PURR-APPROVED FOR PRODUCTION</span>
                        <span className="text-[10px] !text-slate-400 self-start sm:self-auto">Latency: 0ms</span>
                      </div>
                    </div>
                  )}

                  {activeTab === "cli" && (
                    <div className="flex flex-col justify-between h-full space-y-3">
                      {/* Command Logs */}
                      <div className="space-y-1.5 max-h-[100px] overflow-y-auto pr-2 scrollbar-thin">
                        {cliLogs.map((log, idx) => (
                          <div
                            key={idx}
                            className={`flex items-start gap-2 ${
                              log.type === "sys"
                                ? "!text-[#cbd5e1]"
                                : log.type === "cmd"
                                ? "!text-[#67e8f9]"
                                : "!text-[#34d399]"
                            }`}
                          >
                            <ChevronRight size={13} className="mt-0.5 !text-[#64748b] flex-shrink-0" />
                            <span className={log.type === "sys" ? "!text-[#cbd5e1]" : log.type === "cmd" ? "!text-[#67e8f9]" : "!text-[#34d399]"}>{log.text}</span>
                          </div>
                        ))}
                      </div>

                      {/* Executable Control Chips */}
                      <div className="pt-2 border-t border-slate-800 flex flex-wrap items-center gap-1.5">
                        <span className="text-[11px] !text-[#94a3b8] font-sans font-semibold mr-1">
                          Run Command:
                        </span>
                        <button
                          onClick={() => runCliCommand("audit")}
                          className="px-2 py-1 rounded bg-purple-500/30 hover:bg-purple-500/45 border border-purple-400/50 !text-purple-200 text-[10px] font-mono transition-all active:scale-95"
                        >
                          $ pixel --run-inspection
                        </button>
                        <button
                          onClick={() => runCliCommand("pet")}
                          className="px-2 py-1 rounded bg-pink-500/30 hover:bg-pink-500/45 border border-pink-400/50 !text-pink-200 text-[10px] font-mono transition-all active:scale-95"
                        >
                          $ pixel --pet
                        </button>
                        <button
                          onClick={() => runCliCommand("feed")}
                          className="px-2 py-1 rounded bg-amber-500/30 hover:bg-amber-500/45 border border-amber-400/50 !text-amber-200 text-[10px] font-mono transition-all active:scale-95"
                        >
                          $ pixel --feed-fish
                        </button>
                        <button
                          onClick={() => runCliCommand("quote")}
                          className="px-2 py-1 rounded bg-cyan-500/30 hover:bg-cyan-500/45 border border-cyan-400/50 !text-cyan-200 text-[10px] font-mono transition-all active:scale-95"
                        >
                          $ pixel --cat-wisdom
                        </button>
                        <button
                          onClick={() => runCliCommand("clear")}
                          className="px-2 py-1 rounded bg-slate-800 hover:bg-slate-700 !text-[#cbd5e1] text-[10px] font-mono transition-all"
                        >
                          clear
                        </button>
                      </div>
                    </div>
                  )}

                  {activeTab === "game" && (
                    <div className="flex flex-col items-center justify-center text-center py-2 space-y-3">
                      <div className="flex items-center gap-3">
                        <span className="text-3xl animate-bounce">🕹️</span>
                        <div className="text-left">
                          <h5 className="font-bold text-sm" style={{ color: "#ffffff" }}>Pixel&apos;s Bug Hunter Arcade</h5>
                          <p className="text-[11px] font-sans" style={{ color: "#cbd5e1" }}>
                            Test your developer reflexes by swatting bugs before time expires!
                          </p>
                        </div>
                      </div>

                      <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 w-full sm:w-auto">
                        <div className="bg-[#121829] border border-purple-400/40 px-4 py-2 rounded-xl text-center sm:text-left">
                          <span className="text-[10px] block font-sans" style={{ color: "#94a3b8" }}>HIGH SCORE</span>
                          <span className="text-lg font-black" style={{ color: "#fbbf24" }}>{highScore} pts</span>
                        </div>

                        <button
                          onClick={() => setIsGameOpen(true)}
                          className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-600 hover:to-teal-700 !text-white font-sans font-bold text-xs flex items-center justify-center gap-2 shadow-lg transition-all transform hover:scale-105 active:scale-95 w-full sm:w-auto"
                        >
                          <Play size={14} />
                          <span>Launch Arcade Game 🎮</span>
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              </div>

              {/* Feature Badges Grid */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                <div
                  onClick={handlePet}
                  className="bg-slate-50 dark:bg-[#090e1a] border border-purple-200 dark:border-purple-500/30 p-3.5 rounded-2xl flex items-center gap-3 shadow-sm hover:shadow-md hover:border-purple-400 dark:hover:bg-[#0e1628] transition-all cursor-pointer group/badge"
                >
                  <div className="p-2.5 rounded-xl bg-purple-100 dark:bg-purple-500/20 text-purple-700 dark:text-purple-300 border border-purple-300 dark:border-purple-500/30 group-hover/badge:scale-110 transition-transform">
                    <ShieldCheck className="w-5 h-5 text-purple-600 dark:text-purple-400" />
                  </div>
                  <div className="text-left">
                    <p className="font-bold text-slate-900 dark:text-white text-xs">100% Purr-Tested</p>
                    <p className="text-[11px] text-purple-700 dark:text-purple-200/80 font-medium">Zero Bugs In Code</p>
                  </div>
                </div>

                <div
                  onClick={handlePet}
                  className="bg-slate-50 dark:bg-[#090e1a] border border-cyan-200 dark:border-cyan-500/30 p-3.5 rounded-2xl flex items-center gap-3 shadow-sm hover:shadow-md hover:border-cyan-400 dark:hover:bg-[#0e1628] transition-all cursor-pointer group/badge"
                >
                  <div className="p-2.5 rounded-xl bg-cyan-100 dark:bg-cyan-500/20 text-cyan-800 dark:text-cyan-300 border border-cyan-300 dark:border-cyan-500/30 group-hover/badge:scale-110 transition-transform">
                    <Zap className="w-5 h-5 text-cyan-600 dark:text-cyan-400" />
                  </div>
                  <div className="text-left">
                    <p className="font-bold text-slate-900 dark:text-white text-xs">Fast Reflexes</p>
                    <p className="text-[11px] text-cyan-800 dark:text-cyan-200/80 font-medium">Sub-10ms Hydration</p>
                  </div>
                </div>

                <div
                  onClick={handlePet}
                  className="bg-slate-50 dark:bg-[#090e1a] border border-amber-200 dark:border-amber-500/30 p-3.5 rounded-2xl flex items-center gap-3 shadow-sm hover:shadow-md hover:border-amber-400 dark:hover:bg-[#0e1628] transition-all cursor-pointer group/badge"
                >
                  <div className="p-2.5 rounded-xl bg-amber-100 dark:bg-amber-500/20 text-amber-800 dark:text-amber-300 border border-amber-300 dark:border-amber-500/30 group-hover/badge:scale-110 transition-transform">
                    <Award className="w-5 h-5 text-amber-600 dark:text-amber-400" />
                  </div>
                  <div className="text-left">
                    <p className="font-bold text-slate-900 dark:text-white text-xs">Dev Companion</p>
                    <p className="text-[11px] text-amber-800 dark:text-amber-200/80 font-medium">
                      {petCount > 0 ? `${petCount} Pets Received ❤️` : "Click to pet Pixel!"}
                    </p>
                  </div>
                </div>
              </div>

            </div>
          </div>
        </div>
      </div>

      {/* Bug Hunter Arcade Game Modal */}
      <CatGameModal isOpen={isGameOpen} onClose={() => setIsGameOpen(false)} />
    </>
  );
}



