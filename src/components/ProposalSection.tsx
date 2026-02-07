import React, { useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import PremiumButton from "./PremiumButton";
import { Heart, Sparkles } from "lucide-react";

type Props = {
  herName: string;
  onYes: () => void;
};

const noVariants = {
  initial: { x: 0, y: 0, rotate: 0 },
  move: (i: number) => ({
    x: (i % 2 === 0 ? 1 : -1) * (80 + i * 10),
    y: (i % 3 === 0 ? 1 : -1) * (20 + i * 6),
    rotate: (i % 2 === 0 ? 1 : -1) * (6 + i * 2),
    transition: { type: "spring", stiffness: 240, damping: 16 },
  }),
};

export default function ProposalSection({ herName, onYes }: Props) {
  const labels = useMemo(
    () => [
      "No",
      "Not today",
      "I’m shy",
      "Try again",
      "Stop 😭",
      "Impossible",
      "Nice try",
      "Nope",
      "I refuse 😤",
      "Still no 😭",
      "Bro please 💀",
    ],
    []
  );

  const [noCount, setNoCount] = useState(0);
  const [yesPressed, setYesPressed] = useState(false);

  const onNo = () => {
    setNoCount((p) => p + 1);
  };

  const handleYes = () => {
    setYesPressed(true);
    onYes();
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.35 }}
      transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
      className="relative overflow-hidden rounded-[24px]"
    >
      {/* Premium glow background */}
      <div className="absolute inset-0 bg-gradient-to-br from-pink-200/40 via-white/20 to-purple-200/35 blur-2xl" />

      {/* spotlight */}
      <div className="absolute inset-0 opacity-[0.25] bg-[radial-gradient(circle_at_50%_10%,rgba(255,255,255,0.95),transparent_65%)]" />

      {/* subtle animated shine */}
      <motion.div
        className="absolute inset-0 opacity-30"
        animate={{ x: ["-30%", "130%"] }}
        transition={{ duration: 7, repeat: Infinity, ease: "linear" }}
        style={{
          background:
            "linear-gradient(90deg, transparent, rgba(255,255,255,0.85), transparent)",
        }}
      />

      {/* floating particles */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <motion.div
          className="absolute top-10 left-10 h-2 w-2 rounded-full bg-white/60"
          animate={{ y: [0, -18, 0], opacity: [0.2, 0.7, 0.2] }}
          transition={{ duration: 4.8, repeat: Infinity }}
        />
        <motion.div
          className="absolute bottom-10 right-14 h-2 w-2 rounded-full bg-white/60"
          animate={{ y: [0, -20, 0], opacity: [0.25, 0.8, 0.25] }}
          transition={{ duration: 5.6, repeat: Infinity }}
        />
        <motion.div
          className="absolute top-20 right-1/3 h-1.5 w-1.5 rounded-full bg-white/50"
          animate={{ y: [0, -14, 0], opacity: [0.15, 0.6, 0.15] }}
          transition={{ duration: 6.2, repeat: Infinity }}
        />
      </div>

      {/* MAIN CARD */}
      <div className="relative glass premium-border rounded-[24px] p-6 sm:p-10">
        <div className="flex items-start justify-between gap-4">
          <div>
            <div className="text-[11px] uppercase tracking-[0.22em] text-[#0f0f12]/55">
              The Question
            </div>

            <h3 className="mt-3 text-2xl sm:text-4xl font-semibold tracking-tight leading-tight">
              {herName},
              <br className="hidden sm:block" />
              will you be my Valentine?
            </h3>

            <p className="mt-4 text-sm sm:text-base text-[#0f0f12]/70 max-w-2xl leading-relaxed">
              If I could choose again…
              <br className="hidden sm:block" />
              I’d still choose you. Every timeline. Every universe.
            </p>
          </div>

          {/* floating heart icon */}
          <motion.div
            animate={{ y: [0, -4, 0] }}
            transition={{ duration: 2.8, repeat: Infinity, ease: "easeInOut" }}
            className="hidden sm:grid h-12 w-12 rounded-[18px] border border-white/60 bg-white/40 place-items-center shadow-soft"
          >
            <Heart size={18} className="text-[#ff4f87]/80" />
          </motion.div>
        </div>

        {/* Buttons */}
        <div className="mt-10 flex flex-wrap items-center gap-3">
          {/* YES button with destiny glow */}
          <motion.div
            animate={{
              scale: [1, 1.04, 1],
            }}
            transition={{
              duration: 2.4,
              repeat: Infinity,
              ease: "easeInOut",
            }}
            className="relative"
          >
            <motion.div
              className="absolute inset-0 rounded-[18px] blur-xl"
              animate={{ opacity: [0.3, 0.6, 0.3] }}
              transition={{ duration: 2.2, repeat: Infinity }}
              style={{
                background:
                  "linear-gradient(90deg, rgba(255,122,162,0.65), rgba(201,179,255,0.55))",
              }}
            />

            <PremiumButton onClick={handleYes} glow>
              <span className="flex items-center gap-2">
                <Heart size={16} />
                Yes
              </span>
            </PremiumButton>
          </motion.div>

          {/* NO button tries to escape */}
          <motion.div
            variants={noVariants}
            initial="initial"
            animate={noCount === 0 ? "initial" : "move"} 
            custom={noCount}
          >
            <PremiumButton onClick={onNo} variant="ghost">
              {labels[Math.min(noCount, labels.length - 1)]}
            </PremiumButton>
          </motion.div>

          <div className="w-full pt-3 text-xs text-[#0f0f12]/55">
            (You can try… but love already decided.)
          </div>
        </div>

        {/* Dramatic reactions */}
        <AnimatePresence>
          {noCount >= 2 && !yesPressed && (
            <motion.div
              initial={{ opacity: 0, y: 12, filter: "blur(6px)" }}
              animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
              exit={{ opacity: 0, y: 12 }}
              transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
              className="mt-6 rounded-[20px] border border-white/60 bg-white/40 p-5 text-sm text-[#0f0f12]/70 leading-relaxed"
            >
              <span className="font-medium text-[#0f0f12]/80">
                Warning:
              </span>{" "}
              pressing “No” repeatedly may cause uncontrollable smiling.
            </motion.div>
          )}
        </AnimatePresence>

        <AnimatePresence>
          {noCount >= 5 && !yesPressed && (
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 12 }}
              transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
              className="mt-4 inline-flex items-center gap-2 rounded-[999px] border border-white/60 bg-white/45 px-5 py-2 text-xs text-[#0f0f12]/65 shadow-soft"
            >
              <Sparkles size={14} className="text-[#ff4f87]/70" />
              I admire your dedication… but the answer is still yes 😌
            </motion.div>
          )}
        </AnimatePresence>

        {/* tiny love note */}
        <div className="mt-8 text-xs text-[#0f0f12]/50 leading-relaxed">
          This moment is my favorite part of the story.
          <span className="font-medium text-[#ff4f87]/80"> And you’re the only ending I want.</span>
        </div>
      </div>
    </motion.div>
  );
}
