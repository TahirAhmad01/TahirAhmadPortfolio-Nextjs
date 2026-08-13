"use client";
import React, { useState, useEffect, useRef } from "react";
import { playMeow, playPurr } from "@/utils/catAudio";
import { Trophy, RefreshCw, X, Sparkles, Award, Zap, Gauge } from "lucide-react";

const BUG_TYPES = [
  { icon: "🐞", name: "Ladybug", points: 10, speed: 0.5 },
  { icon: "🪲", name: "Beetle", points: 15, speed: 0.7 },
  { icon: "🦟", name: "Mosquito", points: 25, speed: 1.0 },
  { icon: "🐛", name: "Caterpillar", points: 20, speed: 0.35 },
];

export default function CatGameModal({ isOpen, onClose }) {
  const [gameState, setGameState] = useState("idle"); // 'idle' | 'playing' | 'ended'
  const [score, setScore] = useState(0);
  const [highScore, setHighScore] = useState(0);
  const [timeLeft, setTimeLeft] = useState(30);
  const [bugs, setBugs] = useState([]);
  const [splatters, setSplatters] = useState([]);
  const [combo, setCombo] = useState(0);
  const [speedMultiplier, setSpeedMultiplier] = useState(1.0); // 0.7 (Chill), 1.0 (Normal), 1.4 (Turbo)

  const arenaRef = useRef(null);

  // Load high score
  useEffect(() => {
    if (typeof window !== "undefined") {
      const saved = parseInt(localStorage.getItem("cat_bug_highscore") || "0", 10);
      setHighScore(saved);
    }
  }, []);

  // Timer loop
  useEffect(() => {
    if (gameState !== "playing") return;
    if (timeLeft <= 0) {
      setGameState("ended");
      if (score > highScore) {
        setHighScore(score);
        if (typeof window !== "undefined") {
          localStorage.setItem("cat_bug_highscore", score.toString());
        }
      }
      return;
    }

    const timer = setInterval(() => {
      setTimeLeft((prev) => prev - 1);
    }, 1000);

    return () => clearInterval(timer);
  }, [gameState, timeLeft, score, highScore]);

  // Spawn and move bugs animation loop
  useEffect(() => {
    if (gameState !== "playing") return;

    // Initial bug spawn
    if (bugs.length < 5) {
      spawnBug();
    }

    const moveInterval = setInterval(() => {
      setBugs((prevBugs) =>
        prevBugs.map((bug) => {
          let step = bug.speed * speedMultiplier * 1.2;
          let newX = bug.x + Math.cos(bug.angle) * step;
          let newY = bug.y + Math.sin(bug.angle) * step;
          let newAngle = bug.angle;

          // Bounce off arena walls (0 to 100%)
          if (newX < 5 || newX > 90) newAngle = Math.PI - newAngle;
          if (newY < 5 || newY > 85) newAngle = -newAngle;

          return {
            ...bug,
            x: Math.max(5, Math.min(90, newX)),
            y: Math.max(5, Math.min(85, newY)),
            angle: newAngle + (Math.random() - 0.5) * 0.15,
          };
        })
      );
    }, 50);

    return () => clearInterval(moveInterval);
  }, [gameState, bugs.length, speedMultiplier]);

  const spawnBug = () => {
    const bugType = BUG_TYPES[Math.floor(Math.random() * BUG_TYPES.length)];
    const newBug = {
      id: Date.now() + Math.random(),
      ...bugType,
      x: Math.random() * 80 + 10,
      y: Math.random() * 70 + 10,
      angle: Math.random() * Math.PI * 2,
    };
    setBugs((prev) => [...prev, newBug]);
  };

  const startGame = () => {
    setScore(0);
    setTimeLeft(30);
    setCombo(0);
    setBugs([]);
    setSplatters([]);
    setGameState("playing");
    playMeow();
  };

  const handleSquashBug = (bugId, bugPoints, x, y, e) => {
    e.stopPropagation();
    playMeow();

    const newCombo = combo + 1;
    setCombo(newCombo);
    const addedPoints = bugPoints * (1 + Math.floor(newCombo / 5) * 0.5);
    const newScore = Math.floor(score + addedPoints);
    setScore(newScore);

    // Remove squashed bug
    setBugs((prev) => prev.filter((b) => b.id !== bugId));

    // Add splatter / pop text effect
    const newSplatter = {
      id: Date.now() + Math.random(),
      x,
      y,
      points: Math.floor(addedPoints),
    };
    setSplatters((prev) => [...prev, newSplatter]);

    // Spawn replacement bug
    setTimeout(() => spawnBug(), 300);
  };

  // Clean old splatters
  useEffect(() => {
    if (splatters.length === 0) return;
    const timer = setTimeout(() => {
      setSplatters((prev) => prev.slice(1));
    }, 800);
    return () => clearTimeout(timer);
  }, [splatters]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100000] flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md animate-fade-in select-none">
      <div className="relative w-full max-w-lg bg-slate-900 !text-white border border-purple-500/40 rounded-3xl shadow-2xl overflow-hidden flex flex-col font-sans">
        {/* Header */}
        <div className="flex justify-between items-center px-6 py-4 bg-slate-800/80 border-b border-purple-500/20">
          <div className="flex items-center gap-2">
            <span className="text-2xl animate-bounce">🐱</span>
            <div>
              <h3 className="text-lg font-bold !text-white flex items-center gap-2">
                <span className="!text-white">Pixel&apos;s Bug Hunter</span>
                <span className="text-[10px] bg-purple-500/20 !text-purple-300 border border-purple-400/30 px-2 py-0.5 rounded-full">
                  Arcade
                </span>
              </h3>
              <p className="text-xs !text-purple-300/80">Swat bugs with relaxed cat reflexes!</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 !text-gray-400 hover:!text-white hover:bg-slate-700/60 rounded-full transition-colors"
          >
            <X size={20} />
          </button>
        </div>

        {/* Game Arena Container */}
        <div
          ref={arenaRef}
          className="relative h-80 w-full bg-gradient-to-b from-slate-950 via-slate-900 to-indigo-950/50 overflow-hidden"
        >
          {/* Start Overlay */}
          {gameState === "idle" && (
            <div className="absolute inset-0 flex flex-col items-center justify-center text-center p-6 bg-slate-950/90 z-20">
              <div className="text-5xl mb-3 animate-pulse">🐾🐞</div>
              <h4 className="text-xl font-bold !text-white mb-1">Ready to Catch Bugs?</h4>
              <p className="text-xs !text-gray-300 max-w-xs mb-4">
                Tap or click as many crawling bugs as you can in 30 seconds!
              </p>

              {/* Speed Mode Controls */}
              <div className="mb-6 flex items-center gap-2 bg-slate-900/90 p-1.5 rounded-2xl border border-slate-800">
                <span className="text-xs !text-slate-400 font-semibold px-2 flex items-center gap-1">
                  <Gauge size={13} className="!text-purple-400" />
                  Speed:
                </span>
                <button
                  onClick={() => setSpeedMultiplier(0.6)}
                  className={`px-3 py-1 rounded-xl text-xs font-bold transition-all ${
                    speedMultiplier === 0.6
                      ? "bg-emerald-500 !text-slate-950 shadow-md"
                      : "!text-slate-400 hover:!text-white"
                  }`}
                >
                  Chill 🐢
                </button>
                <button
                  onClick={() => setSpeedMultiplier(1.0)}
                  className={`px-3 py-1 rounded-xl text-xs font-bold transition-all ${
                    speedMultiplier === 1.0
                      ? "bg-purple-500 !text-white shadow-md"
                      : "!text-slate-400 hover:!text-white"
                  }`}
                >
                  Normal 🐾
                </button>
                <button
                  onClick={() => setSpeedMultiplier(1.5)}
                  className={`px-3 py-1 rounded-xl text-xs font-bold transition-all ${
                    speedMultiplier === 1.5
                      ? "bg-amber-500 !text-slate-950 shadow-md"
                      : "!text-slate-400 hover:!text-white"
                  }`}
                >
                  Fast ⚡
                </button>
              </div>

              <button
                onClick={startGame}
                className="bg-gradient-to-r from-purple-500 to-indigo-600 hover:from-purple-600 hover:to-indigo-700 !text-white font-bold px-6 py-3 rounded-2xl shadow-lg transition-all transform hover:scale-105 flex items-center gap-2"
              >
                <Zap size={18} />
                <span>Start Bug Hunt!</span>
              </button>
            </div>
          )}

          {/* Game Over Overlay */}
          {gameState === "ended" && (
            <div className="absolute inset-0 flex flex-col items-center justify-center text-center p-6 bg-slate-950/95 z-20 animate-fade-in">
              <div className="text-5xl mb-2">🎉🐱</div>
              <h4 className="text-2xl font-black !text-white mb-1">Time&apos;s Up!</h4>
              <p className="text-xs !text-purple-300 mb-4">
                {score >= highScore && score > 0
                  ? "🏆 NEW HIGH SCORE! Outstanding cat reflexes!"
                  : "Great hunting! Pixel is proud of your bug swatting skills."}
              </p>

              {/* Score Card */}
              <div className="flex gap-4 mb-6">
                <div className="bg-slate-800/80 border border-purple-500/30 p-3 rounded-2xl text-center min-w-[100px]">
                  <p className="text-[10px] !text-gray-400 font-semibold uppercase">Final Score</p>
                  <p className="text-2xl font-black !text-amber-400">{score}</p>
                </div>
                <div className="bg-slate-800/80 border border-purple-500/30 p-3 rounded-2xl text-center min-w-[100px]">
                  <p className="text-[10px] !text-gray-400 font-semibold uppercase">High Score</p>
                  <p className="text-2xl font-black !text-purple-400">{highScore}</p>
                </div>
              </div>

              <div className="flex gap-3">
                <button
                  onClick={startGame}
                  className="bg-gradient-to-r from-purple-500 to-indigo-600 hover:from-purple-600 hover:to-indigo-700 !text-white font-bold px-5 py-2.5 rounded-xl shadow-lg flex items-center gap-2 text-sm"
                >
                  <RefreshCw size={16} />
                  <span>Play Again</span>
                </button>
                <button
                  onClick={onClose}
                  className="bg-slate-800 hover:bg-slate-700 !text-gray-200 font-semibold px-5 py-2.5 rounded-xl text-sm border border-slate-700"
                >
                  Close
                </button>
              </div>
            </div>
          )}

          {/* Gameplay HUD */}
          {gameState === "playing" && (
            <>
              <div className="absolute top-3 left-3 right-3 flex justify-between items-center z-10 text-xs font-bold">
                <div className="bg-slate-800/80 !text-[#fbbf24] px-3 py-1.5 rounded-xl border border-amber-400/20 flex items-center gap-1.5 shadow-md">
                  <Sparkles size={14} className="!text-[#fbbf24]" />
                  <span className="!text-[#fbbf24]">Score: {score}</span>
                </div>
                <div className="bg-slate-800/80 !text-[#22d3ee] px-3 py-1.5 rounded-xl border border-cyan-400/20 shadow-md">
                  ⏱️ {timeLeft}s
                </div>
                <div className="bg-slate-800/80 !text-[#c084fc] px-3 py-1.5 rounded-xl border border-purple-400/20 flex items-center gap-1 shadow-md">
                  <Trophy size={14} className="!text-[#c084fc]" />
                  <span className="!text-[#c084fc]">Best: {highScore}</span>
                </div>
              </div>

              {/* Crawling Bugs */}
              {bugs.map((bug) => (
                <button
                  key={bug.id}
                  onClick={(e) => handleSquashBug(bug.id, bug.points, bug.x, bug.y, e)}
                  className="absolute text-2xl hover:scale-125 transition-transform duration-75 cursor-pointer transform -translate-x-1/2 -translate-y-1/2 focus:outline-none"
                  style={{
                    left: `${bug.x}%`,
                    top: `${bug.y}%`,
                    transform: `translate(-50%, -50%) rotate(${bug.angle}rad)`,
                  }}
                >
                  {bug.icon}
                </button>
              ))}

              {/* Splatters / Points Text Popups */}
              {splatters.map((s) => (
                <div
                  key={s.id}
                  className="absolute !text-[#fbbf24] font-black text-sm pointer-events-none animate-bounce z-20"
                  style={{ left: `${s.x}%`, top: `${s.y}%` }}
                >
                  +{s.points} 💥
                </div>
              ))}
            </>
          )}
        </div>
      </div>
    </div>
  );
}

