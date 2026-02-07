import React, { useMemo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import PremiumButton from "./PremiumButton";
import { Quote } from "lucide-react";

export default function ReasonsGenerator({ herName }: { herName: string }) {
  const reasons = useMemo(
    () => [
      "You make ordinary days feel like a movie scene.",
      "Your presence is my favorite kind of peace.",
      "You somehow turn chaos into calm.",
      "You’re the soft part of my world that I never knew I needed.",
      "You have a way of making me believe in better things.",
      "Even your silence feels warm.",
      "You are my best decision — every single day.",
      "You make love feel simple, not complicated.",
      "You look at me like I’m home.",
      "I don’t want a perfect story. I want ours.",
      "You are the reason my future feels exciting.",
      "You’re effortlessly beautiful — in ways you don’t even notice.",
      "Your smile has a ridiculous amount of power over me.",
      "You make me want to be softer, kinder, better.",
      "You’re my favorite notification.",
      "You’re the chapter I never want to end.",
    ],
    []
  );

  const [index, setIndex] = useState(0);

  const next = () => {
    setIndex((p) => (p + 1) % reasons.length);
  };

  const progress = ((index + 1) / reasons.length) * 100;

  return (
    <div className="grid gap-6">
      <motion.div
        initial={{ opacity: 0, y: 22 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.4 }}
        transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
        className="relative overflow-hidden rounded-[22px]"
      >
        {/* PREMIUM GLOW BACKGROUND */}
        <div className="absolute inset-0 bg-gradient-to-br from-pink-200/30 via-white/20 to-purple-200/30 blur-2xl" />

        {/* Animated border shine */}
        <motion.div
          className="absolute inset-0 opacity-40"
          animate={{ x: ["-30%", "130%"] }}
          transition={{ duration: 6, repeat: Infinity, ease: "linear" }}
          style={{
            background:
              "linear-gradient(90deg, transparent, rgba(255,255,255,0.8), transparent)",
          }}
        />

        {/* MAIN CARD */}
        <div className="relative glass premium-border rounded-[22px] p-6 sm:p-8">
          <div className="flex items-start justify-between gap-4">
            <div>
              <div className="text-[11px] uppercase tracking-[0.22em] text-[#0f0f12]/55">
                Reasons I adore you
              </div>

              <div className="mt-2 text-xs text-[#0f0f12]/50">
                {index + 1} / {reasons.length}
              </div>
            </div>

            {/* subtle floating quote icon */}
            <motion.div
              animate={{ y: [0, -4, 0] }}
              transition={{ duration: 2.8, repeat: Infinity, ease: "easeInOut" }}
              className="h-10 w-10 rounded-[16px] border border-white/60 bg-white/40 grid place-items-center shadow-soft"
            >
              <Quote size={18} className="text-[#0f0f12]/60" />
            </motion.div>
          </div>

          {/* Progress bar */}
          <div className="mt-4 h-[6px] w-full overflow-hidden rounded-full bg-white/35 border border-white/50">
            <motion.div
              className="h-full rounded-full bg-gradient-to-r from-pink-400/80 via-purple-400/70 to-indigo-400/70"
              animate={{ width: `${progress}%` }}
              transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
            />
          </div>

          {/* Quote */}
          <div className="mt-6 min-h-[120px] flex items-center">
            <AnimatePresence mode="wait">
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 16, filter: "blur(6px)" }}
                animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                exit={{ opacity: 0, y: -10, filter: "blur(6px)" }}
                transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
                className="w-full"
              >
                <p className="text-xl sm:text-2xl font-semibold tracking-tight leading-relaxed text-[#0f0f12]">
                  “{reasons[index]}”
                </p>

                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: "64px" }}
                  transition={{ delay: 0.2, duration: 0.8 }}
                  className="mt-5 h-[2px] rounded-full bg-[#0f0f12]/20"
                />
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Footer text */}
          <p className="mt-5 text-sm sm:text-base text-[#0f0f12]/60 leading-relaxed">
            For the record, <span className="font-medium">{herName}</span>…
            <br className="hidden sm:block" />
            I could keep going. And I probably will.
          </p>

          {/* Buttons */}
          <div className="mt-7 flex flex-wrap items-center justify-between gap-4">
            <PremiumButton onClick={next} glow>
              Another reason ✨
            </PremiumButton>

            <div className="text-xs text-[#0f0f12]/50 text-right max-w-[260px]">
              Written softly, with a thousand emotions.
              <br />
              Just for you, always.
            </div>
          </div>

          {/* Floating particles (very subtle) */}
          <div className="pointer-events-none absolute inset-0 overflow-hidden">
            <motion.div
              className="absolute top-6 right-10 h-2 w-2 rounded-full bg-white/60"
              animate={{ y: [0, -18, 0], opacity: [0.4, 0.8, 0.4] }}
              transition={{ duration: 3.8, repeat: Infinity }}
            />
            <motion.div
              className="absolute bottom-10 left-12 h-2 w-2 rounded-full bg-white/60"
              animate={{ y: [0, -22, 0], opacity: [0.3, 0.7, 0.3] }}
              transition={{ duration: 4.6, repeat: Infinity }}
            />
            <motion.div
              className="absolute top-16 left-1/3 h-1.5 w-1.5 rounded-full bg-white/50"
              animate={{ y: [0, -14, 0], opacity: [0.3, 0.6, 0.3] }}
              transition={{ duration: 5.2, repeat: Infinity }}
            />
          </div>
        </div>
      </motion.div>
    </div>
  );
}
