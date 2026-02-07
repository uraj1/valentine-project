import React, { useEffect, useMemo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { clamp } from "../lib/utils";
import { Heart } from "lucide-react";

export default function LoveMeter() {
  const [value, setValue] = useState(92);
  const [hint, setHint] = useState<string | null>(null);

  useEffect(() => {
    if (value < 80) {
      setHint("That’s illegal 😌");
      const t = setTimeout(() => setValue(80), 450);
      return () => clearTimeout(t);
    } else {
      setHint(null);
    }
  }, [value]);

  const message = useMemo(() => {
    if (value >= 99) return "Okay wow… this is dangerously perfect. 💘";
    if (value >= 95) return "This feels like forever type love. 🥺❤️";
    if (value >= 90) return "This is exactly the amount I was hoping for. 😌✨";
    if (value >= 85) return "Good choice. You’re safe… for now. 😏";
    return "Hmm… suspicious. But acceptable. 😌";
  }, [value]);

  const progressWidth = `${value}%`;

  return (
    <motion.div
      initial={{ opacity: 0, y: 22 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.4 }}
      transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
      className="relative overflow-hidden rounded-[22px]"
    >
      {/* Premium glow background */}
      <div className="absolute inset-0 bg-gradient-to-br from-pink-200/35 via-white/20 to-purple-200/30 blur-2xl" />

      {/* floating heart particles */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <motion.div
          className="absolute bottom-6 left-8 h-2 w-2 rounded-full bg-white/60"
          animate={{ y: [0, -20, 0], opacity: [0.2, 0.8, 0.2] }}
          transition={{ duration: 4, repeat: Infinity }}
        />
        <motion.div
          className="absolute top-10 right-10 h-2 w-2 rounded-full bg-white/60"
          animate={{ y: [0, -18, 0], opacity: [0.3, 0.7, 0.3] }}
          transition={{ duration: 5, repeat: Infinity }}
        />
        <motion.div
          className="absolute top-16 left-1/3 h-1.5 w-1.5 rounded-full bg-white/50"
          animate={{ y: [0, -14, 0], opacity: [0.2, 0.6, 0.2] }}
          transition={{ duration: 6, repeat: Infinity }}
        />
      </div>

      {/* MAIN CARD */}
      <div className="relative glass premium-border rounded-[22px] p-6 sm:p-8">
        <div className="flex items-start justify-between gap-4">
          <div>
            <div className="text-[11px] uppercase tracking-[0.22em] text-[#0f0f12]/55">
              Love Meter
            </div>

            <h3 className="mt-2 text-xl sm:text-2xl font-semibold tracking-tight">
              How much do you love me?
            </h3>

            <p className="mt-2 text-sm text-[#0f0f12]/65 leading-relaxed">
              Move the slider… but just remember.
              <br className="hidden sm:block" />
              My heart has strict minimum requirements.
            </p>
          </div>

          {/* percentage bubble */}
          <motion.div
            key={value}
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
            className="shrink-0 rounded-[16px] border border-white/60 bg-white/45 px-4 py-2 shadow-soft"
          >
            <div className="flex items-center gap-2">
              <Heart size={16} className="text-[#ff4f87]" />
              <span className="text-sm font-semibold text-[#0f0f12]">
                {value}%
              </span>
            </div>
          </motion.div>
        </div>

        {/* progress bar */}
        <div className="mt-6">
          <div className="h-[10px] w-full overflow-hidden rounded-full border border-white/60 bg-white/30">
            <motion.div
              className="h-full rounded-full bg-gradient-to-r from-pink-400/90 via-purple-400/80 to-indigo-400/70"
              animate={{ width: progressWidth }}
              transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
            />
          </div>

          {/* slider */}
          <input
            type="range"
            min={0}
            max={100}
            value={value}
            onChange={(e) => setValue(clamp(Number(e.target.value), 0, 100))}
            className="mt-5 w-full accent-[#ff7aa2]"
          />

          <div className="mt-3 flex items-center justify-between text-xs text-[#0f0f12]/55">
            <span>0%</span>
            <span>100%</span>
          </div>
        </div>

        {/* romantic message */}
        <motion.div
          key={message}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="mt-6 rounded-[18px] border border-white/60 bg-white/40 px-5 py-4 text-sm sm:text-base text-[#0f0f12]/70 leading-relaxed"
        >
          {message}
        </motion.div>

        {/* hint warning */}
        <AnimatePresence>
          {hint && (
            <motion.div
              initial={{ opacity: 0, y: 10, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 10, scale: 0.95 }}
              transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
              className="mt-5 inline-flex items-center gap-2 rounded-[999px] border border-white/60 bg-white/50 px-4 py-2 text-xs text-[#0f0f12]/70 shadow-soft"
            >
              <span className="text-sm">⚠️</span>
              {hint}
            </motion.div>
          )}
        </AnimatePresence>

        {/* footer line */}
        <div className="mt-6 text-xs text-[#0f0f12]/50">
          Official minimum required love:{" "}
          <span className="font-medium text-[#0f0f12]/70">80%</span>.
          Anything less is emotionally rejected.
        </div>
      </div>
    </motion.div>
  );
}
