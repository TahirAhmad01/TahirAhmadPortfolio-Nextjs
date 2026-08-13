"use client";
import React, { useState, useEffect, useRef } from "react";
import { useTheme } from "next-themes";
import { playMeow, playPurr } from "@/utils/catAudio";
import { Sparkles, Heart, Volume2, VolumeX, Zap, Gamepad2, Smile } from "lucide-react";
import CatGameModal from "./CatGameModal";

const CAT_QUOTES = [
  "If it fits, I sits. If it compiles, I ships! 🐱",
  "Tahir's code is 100% purr-tested and approved! 🐾",
  "I don't always catch bugs, but when I do, I swat them off the desk! ⚡",
  "Fun Fact: Cats sleep 16 hours a day to build energy for late-night coding sessions! 😴",
  "Git commit -m 'Fed the cat a fish 🐟'",
  "Keep calm and meow on! 🐾",
  "System Status: All servers purring smoothly! 💖",
  "Press 'Pet Me' for extra good luck in your code! ✨",
];

const CAT_JOKES = [
  "Why did the cat sit on the keyboard? To keep an eye on the mouse! 🖱️😸",
  "How do cats write code? With purr-fect indentation! 🐾💻",
  "Why don't cats play poker in the jungle? Too many cheetahs! 🐆😹",
  "What is a cat's favorite programming language? Scratch! 🐱✨",
  "What do you call a cat that works in web dev? A Code Whiskerer! 🐾",
  "Why was the cat so good at debugging? Because it caught all the mice! 🐭💥",
];

export default function CatCompanion() {
  const { resolvedTheme } = useTheme();
  const isDark = resolvedTheme === "dark";
  const [mounted, setMounted] = useState(false);
  const [petCount, setPetCount] = useState(0);
  const [treatCount, setTreatCount] = useState(0);
  const [quoteIndex, setQuoteIndex] = useState(0);
  const [jokeIndex, setJokeIndex] = useState(0);
  const [showSpeech, setShowSpeech] = useState(false);
  const [isPurring, setIsPurring] = useState(false);
  const [isMinimized, setIsMinimized] = useState(true);
  const [laserMode, setLaserMode] = useState(false);
  const [soundEnabled, setSoundEnabled] = useState(true);
  const [isGameOpen, setIsGameOpen] = useState(false);
  const [particles, setParticles] = useState([]);
  const [pawTrails, setPawTrails] = useState([]);
  const [laserPos, setLaserPos] = useState({ x: 0, y: 0 });
  const [catMood, setCatMood] = useState("happy"); // 'happy', 'purring', 'eating', 'sleeping'

  const catRef = useRef(null);

  // Load pet counter and set mounted client state
  useEffect(() => {
    setMounted(true);
    if (typeof window !== "undefined") {
      const savedPets = parseInt(localStorage.getItem("cat_pet_count") || "0", 10);
      const savedTreats = parseInt(localStorage.getItem("cat_treat_count") || "0", 10);
      setPetCount(savedPets);
      setTreatCount(savedTreats);
    }
  }, []);

  // Handle Mouse movement for Laser Pointer & Paw Trail Mode
  useEffect(() => {
    if (!laserMode) return;

    const handleMouseMove = (e) => {
      setLaserPos({ x: e.clientX, y: e.clientY });

      if (Math.random() > 0.6) {
        const newPaw = {
          id: Date.now() + Math.random(),
          x: e.clientX,
          y: e.clientY,
          rotation: Math.floor(Math.random() * 360),
        };
        setPawTrails((prev) => [...prev.slice(-15), newPaw]);
      }
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, [laserMode]);

  // Clean old paw prints
  useEffect(() => {
    if (pawTrails.length === 0) return;
    const timer = setTimeout(() => {
      setPawTrails((prev) => prev.slice(1));
    }, 800);
    return () => clearTimeout(timer);
  }, [pawTrails]);

  // Petting interaction
  const handlePetCat = (e) => {
    e.stopPropagation();
    const newCount = petCount + 1;
    setPetCount(newCount);
    if (typeof window !== "undefined") {
      localStorage.setItem("cat_pet_count", newCount.toString());
    }

    if (soundEnabled) {
      if (Math.random() > 0.4) playMeow();
      else playPurr();
    }

    setCatMood("purring");
    setIsPurring(true);
    setTimeout(() => {
      setIsPurring(false);
      setCatMood("happy");
    }, 1500);

    const rect = e.currentTarget.getBoundingClientRect();
    const spawnX = rect.left + rect.width / 2;
    const spawnY = rect.top;

    const icons = ["💖", "🐾", "✨", "💕", "⭐", "🐱"];
    const newParticles = Array.from({ length: 4 }).map((_, i) => ({
      id: Date.now() + i + Math.random(),
      x: spawnX + (Math.random() - 0.5) * 40,
      y: spawnY - 10,
      icon: icons[Math.floor(Math.random() * icons.length)],
      vx: (Math.random() - 0.5) * 60,
      vy: -40 - Math.random() * 40,
    }));

    setParticles((prev) => [...prev, ...newParticles]);
    setQuoteIndex((prev) => (prev + 1) % CAT_QUOTES.length);
    setShowSpeech(true);
  };

  // Treat feeding interaction
  const handleFeedTreat = (e) => {
    e.stopPropagation();
    const newTreats = treatCount + 1;
    setTreatCount(newTreats);
    if (typeof window !== "undefined") {
      localStorage.setItem("cat_treat_count", newTreats.toString());
    }

    if (soundEnabled) playMeow();

    setCatMood("eating");
    setTimeout(() => setCatMood("happy"), 1800);

    const rect = e.currentTarget.getBoundingClientRect();
    const spawnX = rect.left + rect.width / 2;
    const spawnY = rect.top;

    const newParticles = Array.from({ length: 5 }).map((_, i) => ({
      id: Date.now() + i + Math.random(),
      x: spawnX + (Math.random() - 0.5) * 40,
      y: spawnY - 10,
      icon: "🐟",
      vx: (Math.random() - 0.5) * 80,
      vy: -50 - Math.random() * 30,
    }));

    setParticles((prev) => [...prev, ...newParticles]);
  };

  // Clean particles
  useEffect(() => {
    if (particles.length === 0) return;
    const timer = setTimeout(() => {
      setParticles((prev) => prev.slice(1));
    }, 1200);
    return () => clearTimeout(timer);
  }, [particles]);

  if (!mounted) return null;

  return (
    <>
      {/* Laser Pointer Red Dot */}
      {laserMode && (
        <div
          className="fixed w-4 h-4 rounded-full bg-red-500 shadow-[0_0_14px_#ff0000] pointer-events-none z-[10000] transition-transform duration-75 ease-out transform -translate-x-1/2 -translate-y-1/2 animate-pulse"
          style={{ left: `${laserPos.x}px`, top: `${laserPos.y}px` }}
        />
      )}

      {/* Paw Prints Trail */}
      {laserMode &&
        pawTrails.map((paw) => (
          <div
            key={paw.id}
            className="fixed text-red-400 opacity-60 pointer-events-none z-[9999] transition-opacity duration-700 text-lg"
            style={{
              left: `${paw.x}px`,
              top: `${paw.y}px`,
              transform: `translate(-50%, -50%) rotate(${paw.rotation}deg)`,
            }}
          >
            🐾
          </div>
        ))}

      {/* Floating Particles */}
      {particles.map((p) => (
        <div
          key={p.id}
          className="fixed text-xl pointer-events-none z-[10001] animate-bounce transition-all duration-1000"
          style={{
            left: `${p.x}px`,
            top: `${p.y}px`,
            transform: `translate(${p.vx}px, ${p.vy}px)`,
            opacity: 0.9,
          }}
        >
          {p.icon}
        </div>
      ))}

      {/* Main Cat Companion Widget Container */}
      <div className="fixed bottom-4 left-4 z-[9999] flex flex-col items-start font-sans select-none">
        {/* Minimized Pill */}
        {isMinimized ? (
          <button
            onClick={() => setIsMinimized(false)}
            className={`flex items-center gap-2 px-3.5 py-2 rounded-full shadow-2xl border transition-all hover:scale-105 group backdrop-blur-xl ${
              isDark
                ? "bg-[#0f172a]/95 text-white border-purple-500/40"
                : "bg-white/95 text-slate-800 border-purple-300"
            }`}
            title="Expand Cat Companion 🐾"
          >
            <span className="text-xl animate-bounce">🐱</span>
            <span className={`text-xs font-bold ${isDark ? "text-purple-300" : "text-purple-700"}`}>
              Pet Me! ({petCount})
            </span>
          </button>
        ) : (
          <div className="relative group">
            {/* Speech Bubble */}
            {showSpeech && (
              <div className={`absolute -top-16 left-0 min-w-[210px] max-w-[270px] text-xs p-3.5 rounded-2xl shadow-2xl border z-20 animate-fade-in backdrop-blur-xl ${
                isDark
                  ? "bg-[#0f172a]/95 text-slate-100 border-purple-400/50"
                  : "bg-white/95 text-slate-900 border-purple-300"
              }`}>
                <div className={`flex justify-between items-center mb-1.5 border-b pb-1 ${
                  isDark ? "border-slate-800" : "border-slate-200"
                }`}>
                  <span className={`font-bold flex items-center gap-1 ${
                    isDark ? "text-purple-400" : "text-purple-700"
                  }`}>
                    🐾 Developer Cat
                  </span>
                  <button
                    onClick={() => setShowSpeech(false)}
                    className={`text-xs px-1 ${
                      isDark ? "text-slate-400 hover:text-white" : "text-slate-500 hover:text-slate-900"
                    }`}
                  >
                    ✕
                  </button>
                </div>
                <p className={`font-medium leading-snug ${isDark ? "text-slate-200" : "text-slate-700"}`}>{CAT_QUOTES[quoteIndex]}</p>
                {/* Speech Bubble Arrow */}
                <div className={`absolute -bottom-2 left-6 w-3 h-3 border-r border-b transform rotate-45 ${
                  isDark ? "bg-[#0f172a] border-purple-400/50" : "bg-white border-purple-300"
                }`}></div>
              </div>
            )}

            {/* Main Interactive Card (Light glass + Dark glass) */}
            <div className={`backdrop-blur-xl p-4 rounded-3xl shadow-2xl flex flex-col items-center gap-2.5 max-w-[230px] border transition-all ${
              isDark
                ? "bg-[#0f172a]/95 text-white border-purple-500/40"
                : "bg-white/95 text-slate-900 border-purple-300 hover:border-purple-400"
            }`}>
              {/* Top Controls Bar */}
              <div className={`w-full flex justify-between items-center text-[10px] font-medium ${
                isDark ? "text-slate-400" : "text-slate-500"
              }`}>
                <div className="flex items-center gap-1.5">
                  <span className={`inline-block w-2 h-2 rounded-full animate-ping ${
                    isDark ? "bg-emerald-400" : "bg-emerald-500"
                  }`}></span>
                  <span className={`font-bold ${isDark ? "text-emerald-400" : "text-emerald-600"}`}>ONLINE</span>
                </div>
                <div className="flex items-center gap-1">
                  <button
                    onClick={() => setLaserMode(!laserMode)}
                    className={`p-1 rounded-md transition-colors ${
                      laserMode
                        ? "bg-red-500 text-white"
                        : isDark
                        ? "text-slate-400 hover:bg-slate-800 hover:text-white"
                        : "text-slate-500 hover:bg-slate-100 hover:text-slate-900"
                    }`}
                    title={laserMode ? "Turn Off Laser Pointer" : "Turn On Laser Pointer 🔴"}
                  >
                    <Zap size={13} />
                  </button>
                  <button
                    onClick={() => setSoundEnabled(!soundEnabled)}
                    className={`p-1 rounded-md transition-colors ${
                      isDark
                        ? "text-slate-400 hover:bg-slate-800 hover:text-white"
                        : "text-slate-500 hover:bg-slate-100 hover:text-slate-900"
                    }`}
                    title={soundEnabled ? "Mute Meow Sounds" : "Enable Meow Sounds"}
                  >
                    {soundEnabled ? <Volume2 size={13} /> : <VolumeX size={13} />}
                  </button>
                  <button
                    onClick={() => setIsMinimized(true)}
                    className={`p-1 rounded-md text-sm font-bold transition-colors ${
                      isDark
                        ? "text-slate-400 hover:bg-slate-800 hover:text-white"
                        : "text-slate-500 hover:bg-slate-100 hover:text-slate-900"
                    }`}
                    title="Minimize Cat Widget"
                  >
                    −
                  </button>
                </div>
              </div>

              {/* Animated Interactive Cat Vector */}
              <div
                ref={catRef}
                onClick={handlePetCat}
                className="relative cursor-pointer py-1 group/cat transition-transform active:scale-95 hover:scale-105"
                title="Click to Pet Me! 🐾"
              >
                <div className="relative w-20 h-20 flex items-center justify-center">
                  <svg
                    viewBox="0 0 100 100"
                    className={`w-full h-full drop-shadow-lg transition-all duration-300 ${
                      isPurring ? "animate-bounce" : ""
                    }`}
                  >
                    {/* Tail */}
                    <path
                      d="M 25 75 Q 10 65 15 45 Q 20 30 10 25"
                      fill="none"
                      stroke="#f97316"
                      strokeWidth="8"
                      strokeLinecap="round"
                      className="origin-bottom animate-pulse"
                    />

                    {/* Body */}
                    <ellipse cx="50" cy="65" rx="26" ry="22" fill="#fb923c" />

                    {/* Belly */}
                    <ellipse cx="50" cy="67" rx="16" ry="14" fill="#ffedd5" />

                    {/* Cat Ears */}
                    <polygon points="32,25 22,5 44,18" fill="#f97316" />
                    <polygon points="34,23 26,9 42,18" fill="#fed7aa" />

                    <polygon points="68,25 78,5 56,18" fill="#f97316" />
                    <polygon points="66,23 74,9 58,18" fill="#fed7aa" />

                    {/* Head */}
                    <ellipse cx="50" cy="35" rx="24" ry="19" fill="#fb923c" />

                    {/* Developer Glasses */}
                    <rect
                      x="32"
                      y="27"
                      width="15"
                      height="13"
                      rx="3"
                      fill="none"
                      stroke="#0f172a"
                      strokeWidth="2.5"
                    />
                    <rect
                      x="53"
                      y="27"
                      width="15"
                      height="13"
                      rx="3"
                      fill="none"
                      stroke="#0f172a"
                      strokeWidth="2.5"
                    />
                    <line x1="47" y1="33" x2="53" y2="33" stroke="#0f172a" strokeWidth="2.5" />

                    {/* Eyes */}
                    {catMood === "sleeping" ? (
                      <>
                        <path d="M 35 34 Q 40 38 43 34" fill="none" stroke="#0f172a" strokeWidth="2" />
                        <path d="M 57 34 Q 61 38 65 34" fill="none" stroke="#0f172a" strokeWidth="2" />
                      </>
                    ) : (
                      <>
                        <circle cx="39.5" cy="33.5" r="3" fill="#16a34a" />
                        <circle cx="40.5" cy="32.5" r="1" fill="#ffffff" />
                        <circle cx="60.5" cy="33.5" r="3" fill="#16a34a" />
                        <circle cx="61.5" cy="32.5" r="1" fill="#ffffff" />
                      </>
                    )}

                    {/* Nose & Mouth */}
                    <polygon points="48,40 52,40 50,43" fill="#f43f5e" />
                    <path
                      d="M 46 44 Q 50 47 50 44 Q 50 47 54 44"
                      fill="none"
                      stroke="#334155"
                      strokeWidth="1.8"
                      strokeLinecap="round"
                    />

                    {/* Whiskers */}
                    <line x1="22" y1="37" x2="33" y2="38" stroke="#fdba74" strokeWidth="1.8" />
                    <line x1="20" y1="42" x2="32" y2="41" stroke="#fdba74" strokeWidth="1.8" />
                    <line x1="78" y1="37" x2="67" y2="38" stroke="#fdba74" strokeWidth="1.8" />
                    <line x1="80" y1="42" x2="68" y2="41" stroke="#fdba74" strokeWidth="1.8" />

                    {/* Paws */}
                    <ellipse cx="38" cy="83" rx="7" ry="5" fill="#ffedd5" />
                    <ellipse cx="62" cy="83" rx="7" ry="5" fill="#ffedd5" />
                  </svg>

                  {/* Sparkle Badge */}
                  <span className="absolute -top-1 -right-1 bg-amber-400 text-slate-950 font-extrabold text-[10px] px-1.5 py-0.5 rounded-full shadow-md animate-pulse">
                    PET ME
                  </span>
                </div>
              </div>

              {/* Status / Name */}
              <div className="text-center">
                <p className={`text-xs font-bold flex items-center justify-center gap-1.5 ${
                  isDark ? "text-white" : "text-slate-900"
                }`}>
                  <span>Pixel</span>
                  <span className={`text-[10px] px-1.5 py-0.5 rounded-md border font-semibold ${
                    isDark
                      ? "text-purple-300 bg-purple-950/80 border-purple-500/40"
                      : "text-purple-700 bg-purple-100 border-purple-300"
                  }`}>
                    Dev Cat
                  </span>
                </p>
                <p className={`text-[11px] mt-0.5 font-medium ${
                  isDark ? "text-slate-300" : "text-slate-600"
                }`}>
                  {catMood === "purring" && "Purrrrrr~ 💖"}
                  {catMood === "eating" && "Nom nom 🐟"}
                  {catMood === "happy" && "Ready to debug! 🐾"}
                </p>
              </div>

              {/* Action Buttons & Counters */}
              <div className={`w-full flex flex-col gap-1.5 pt-2 border-t text-xs ${
                isDark ? "border-slate-800" : "border-slate-200"
              }`}>
                <div className="flex items-center justify-between gap-1.5">
                  <button
                    onClick={handlePetCat}
                    className="flex-1 bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 text-white font-bold py-1.5 px-2 rounded-xl text-center flex items-center justify-center gap-1 shadow-md transition-all text-[11px]"
                    style={{ background: "linear-gradient(to right, #7c3aed, #4f46e5)", color: "#ffffff" }}
                  >
                    <Heart size={12} className="fill-current text-pink-300" />
                    <span>Pets ({petCount})</span>
                  </button>

                  <button
                    onClick={handleFeedTreat}
                    className={`font-bold py-1.5 px-2 rounded-xl text-[11px] border flex items-center gap-1 transition-all ${
                      isDark
                        ? "bg-amber-950/80 hover:bg-amber-900 text-amber-300 border-amber-500/40"
                        : "bg-amber-100 hover:bg-amber-200 text-amber-800 border-amber-300"
                    }`}
                    title="Feed Treat 🐟"
                  >
                    <span>🐟 ({treatCount})</span>
                  </button>
                </div>

                <div className="flex items-center justify-between gap-1.5">
                  <button
                    onClick={() => {
                      if (soundEnabled) playMeow();
                      const nextJoke = (jokeIndex + 1) % CAT_JOKES.length;
                      setJokeIndex(nextJoke);
                      setQuoteIndex(0);
                      setShowSpeech(true);
                    }}
                    className={`flex-1 font-bold py-1.5 px-2 rounded-xl text-[10px] flex items-center justify-center gap-1 border transition-colors ${
                      isDark
                        ? "bg-slate-800 hover:bg-slate-700 text-slate-200 border-slate-700"
                        : "bg-slate-100 hover:bg-slate-200 text-slate-700 border-slate-300"
                    }`}
                    title="Tell Cat Joke 😹"
                  >
                    <Smile size={11} className={isDark ? "text-amber-400" : "text-amber-500"} />
                    <span>Joke</span>
                  </button>

                  <button
                    onClick={() => setIsGameOpen(true)}
                    className="flex-1 bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white font-bold py-1.5 px-2 rounded-xl text-[10px] flex items-center justify-center gap-1 shadow-md transition-all"
                    style={{ background: "linear-gradient(to right, #059669, #0d9488)", color: "#ffffff" }}
                    title="Play Bug Hunter Arcade Game 🎮"
                  >
                    <Gamepad2 size={11} />
                    <span>Game</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Arcade Game Modal */}
      <CatGameModal isOpen={isGameOpen} onClose={() => setIsGameOpen(false)} />
    </>
  );
}
