"use client";
import React from "react";
import Image from "next/image";
import { Sparkles, Heart, ShieldCheck, Zap } from "lucide-react";

export default function CatShowcase() {
  return (
    <div className="mt-12 backdrop-blur-xl bg-slate-900/90 dark:bg-slate-900/95 border border-purple-500/30 rounded-3xl p-6 md:p-8 shadow-2xl relative overflow-hidden group">
      {/* Glowing Accents */}
      <div className="absolute -top-16 -right-16 w-48 h-48 bg-purple-600/15 rounded-full blur-3xl group-hover:bg-purple-600/25 transition-all pointer-events-none" />
      <div className="absolute -bottom-16 -left-16 w-48 h-48 bg-amber-500/15 rounded-full blur-3xl pointer-events-none" />

      <div className="flex flex-col md:flex-row items-center gap-6 md:gap-8 relative z-10">
        {/* Cat Image Container */}
        <div className="relative w-44 h-44 md:w-56 md:h-56 rounded-2xl overflow-hidden shadow-2xl border-2 border-purple-400/40 group-hover:scale-105 transition-transform duration-300 flex-shrink-0">
          <Image
            src="/images/coding_cat.png"
            alt="Chief Meow Officer - Coding Cat"
            fill
            className="object-cover"
            priority
          />
          <div className="absolute bottom-2.5 right-2.5 bg-slate-950/90 backdrop-blur-md text-amber-300 text-[10px] font-extrabold px-2.5 py-1 rounded-lg border border-amber-400/40 flex items-center gap-1.5 shadow-lg">
            <Sparkles size={12} className="text-amber-400 animate-spin" />
            <span className="tracking-wide">CHIEF MEOW OFFICER</span>
          </div>
        </div>

        {/* Details & Bio */}
        <div className="flex-1 text-center md:text-left">
          <div className="flex items-center justify-center md:justify-start gap-2 mb-3">
            <span className="text-2xl">🐱</span>
            <h4 className="text-xl md:text-2xl font-extrabold text-white bg-clip-text text-transparent bg-gradient-to-r from-purple-400 via-indigo-300 to-amber-300">
              Meet Pixel — Official Code Inspector
            </h4>
          </div>

          <p className="text-sm text-slate-300 dark:text-slate-300 leading-relaxed mb-5 font-normal">
            As a passionate developer and devoted cat lover, I build web applications with the same precision, curiosity, and elegance that cats bring to everything they do! Pixel keeps my code purr-fect, ensures zero bugs sneak past code reviews, and sits on the keyboard whenever it&apos;s time for a stretch break.
          </p>

          {/* Cat Badges Grid - Dark Mode Optimized */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <div className="bg-slate-950/70 border border-purple-500/30 p-3 rounded-2xl flex items-center gap-3 shadow-md backdrop-blur-md hover:border-purple-400/50 transition-colors">
              <div className="p-2 rounded-xl bg-purple-500/20 text-purple-300 border border-purple-500/30">
                <ShieldCheck className="w-5 h-5 text-purple-400" />
              </div>
              <div className="text-left">
                <p className="font-bold text-white text-xs">100% Purr-Tested</p>
                <p className="text-[11px] text-purple-200/80 font-medium">Bug Free Code</p>
              </div>
            </div>

            <div className="bg-slate-950/70 border border-indigo-500/30 p-3 rounded-2xl flex items-center gap-3 shadow-md backdrop-blur-md hover:border-indigo-400/50 transition-colors">
              <div className="p-2 rounded-xl bg-indigo-500/20 text-indigo-300 border border-indigo-500/30">
                <Zap className="w-5 h-5 text-indigo-400" />
              </div>
              <div className="text-left">
                <p className="font-bold text-white text-xs">Fast Reflexes</p>
                <p className="text-[11px] text-indigo-200/80 font-medium">Optimized Performance</p>
              </div>
            </div>

            <div className="bg-slate-950/70 border border-amber-500/30 p-3 rounded-2xl flex items-center gap-3 shadow-md backdrop-blur-md hover:border-amber-400/50 transition-colors">
              <div className="p-2 rounded-xl bg-amber-500/20 text-amber-300 border border-amber-500/30">
                <Heart className="w-5 h-5 text-amber-400 fill-amber-400/20" />
              </div>
              <div className="text-left">
                <p className="font-bold text-white text-xs">Cat Lover ❤️</p>
                <p className="text-[11px] text-amber-200/80 font-medium">Passionate Dev</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
