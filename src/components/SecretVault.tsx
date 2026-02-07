import React, { useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import PremiumButton from "./PremiumButton";
import { Lock, Unlock, Sparkles } from "lucide-react";

type Props = {
  onUnlocked: () => void;
  isUnlocked: boolean;
  correctCode: string;
  hint: string;
  revealTitle: string;
  revealMessage: string;
  revealImage?: string;
};

export default function SecretVault({
  onUnlocked,
  isUnlocked,
  correctCode,
  hint,
  revealTitle,
  revealMessage,
  revealImage,
}: Props) {
  const [code, setCode] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [shake, setShake] = useState(false);

  const masked = useMemo(() => correctCode.replace(/\d/g, "•"), [correctCode]);

  const unlock = () => {
    if (code.trim() === correctCode.trim()) {
      setError(null);
      onUnlocked();
    } else {
      setError("That’s not it. Try again, love.");
      setShake(true);
      setTimeout(() => setShake(false), 450);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 22 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
      className="relative overflow-hidden rounded-[22px]"
    >
      {/* premium glow background */}
      <div className="absolute inset-0 bg-gradient-to-br from-pink-200/35 via-white/20 to-purple-200/30 blur-2xl" />

      {/* animated shine */}
      <motion.div
        className="absolute inset-0 opacity-30"
        animate={{ x: ["-30%", "130%"] }}
        transition={{ duration: 7, repeat: Infinity, ease: "linear" }}
        style={{
          background:
            "linear-gradient(90deg, transparent, rgba(255,255,255,0.85), transparent)",
        }}
      />

      {/* MAIN CARD */}
      <div className="relative glass premium-border rounded-[22px] p-6 sm:p-8">
        <div className="flex items-start justify-between gap-4">
          <div>
            <div className="text-[11px] uppercase tracking-[0.22em] text-[#0f0f12]/55">
              Secret Vault
            </div>

            <h3 className="mt-2 text-xl sm:text-2xl font-semibold tracking-tight">
              There’s something here…
              <br className="hidden sm:block" />
              only meant for you.
            </h3>

            <p className="mt-3 text-sm text-[#0f0f12]/65 leading-relaxed">
              Hint:{" "}
              <span className="font-medium text-[#0f0f12]/75">{hint}</span>
            </p>
          </div>

          {/* lock icon */}
          <motion.div
            animate={{ y: [0, -4, 0] }}
            transition={{ duration: 2.8, repeat: Infinity, ease: "easeInOut" }}
            className="h-11 w-11 rounded-[16px] border border-white/60 bg-white/40 grid place-items-center shadow-soft"
          >
            {isUnlocked ? (
              <Unlock size={18} className="text-[#0f0f12]/65" />
            ) : (
              <Lock size={18} className="text-[#0f0f12]/65" />
            )}
          </motion.div>
        </div>

        {/* security line */}
        <div className="mt-5 h-[6px] w-full overflow-hidden rounded-full border border-white/60 bg-white/30">
          <motion.div
            className="h-full rounded-full bg-gradient-to-r from-pink-400/80 via-purple-400/70 to-indigo-400/70"
            animate={{ width: isUnlocked ? "100%" : "38%" }}
            transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
          />
        </div>

        {/* code display */}
        <div className="mt-4 text-xs text-[#0f0f12]/55">
          Vault Code: <span className="font-mono tracking-widest">{masked}</span>
        </div>

        <div className="mt-7">
          {!isUnlocked ? (
            <motion.div
              animate={shake ? { x: [-8, 8, -6, 6, -3, 3, 0] } : {}}
              transition={{ duration: 0.45 }}
              className="flex flex-col sm:flex-row gap-3 sm:items-center"
            >
              <input
                value={code}
                onChange={(e) => setCode(e.target.value)}
                placeholder="Enter secret code"
                inputMode="numeric"
                className="w-full sm:max-w-[240px] rounded-[16px] border border-white/60 bg-white/45 px-4 py-3 text-sm outline-none focus:border-[#ff7aa2]/70 focus:ring-2 focus:ring-[#ff7aa2]/20 transition"
              />

              <PremiumButton onClick={unlock} glow>
                Unlock
              </PremiumButton>

              <div className="text-xs text-[#0f0f12]/55">
                (I’ll wait patiently. But not forever 😌)
              </div>
            </motion.div>
          ) : (
            <AnimatePresence mode="wait">
              <motion.div
                key="unlocked"
                initial={{ opacity: 0, y: 18, filter: "blur(8px)" }}
                animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                exit={{ opacity: 0, y: 10 }}
                transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
                className="mt-4"
              >
                <div className="relative overflow-hidden rounded-[22px] border border-white/60 bg-white/55 p-5 sm:p-6 shadow-soft">
                  {/* subtle sparkles */}
                  <motion.div
                    animate={{ opacity: [0.25, 0.6, 0.25] }}
                    transition={{ duration: 2.8, repeat: Infinity }}
                    className="absolute top-5 right-5 text-[#ff4f87]/70"
                  >
                    <Sparkles size={18} />
                  </motion.div>

                  <div className="text-[11px] uppercase tracking-[0.22em] text-[#0f0f12]/55">
                    Unlocked
                  </div>

                  <h4 className="mt-2 text-lg sm:text-xl font-semibold tracking-tight">
                    {revealTitle}
                  </h4>

                  <p className="mt-3 text-sm sm:text-base text-[#0f0f12]/75 leading-relaxed">
                    {revealMessage}
                  </p>

                  {revealImage && (
                    <motion.div
                      initial={{ opacity: 0, scale: 0.98 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
                      className="mt-5 overflow-hidden rounded-[22px] border border-white/60 bg-white/30"
                    >
                      <motion.img
                        src={revealImage}
                        alt="Secret"
                        className="h-56 w-full object-cover"
                        initial={{ scale: 1.05 }}
                        animate={{ scale: 1 }}
                        transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
                      />
                    </motion.div>
                  )}

                  <div className="mt-5 text-xs text-[#0f0f12]/55">
                    This secret stays between us. Always. 🤍
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          )}

          {/* error */}
          <AnimatePresence>
            {error && !isUnlocked && (
              <motion.div
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 8 }}
                transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
                className="mt-4 inline-flex rounded-[999px] border border-white/60 bg-white/45 px-4 py-2 text-xs text-[#b20a2f]"
              >
                {error}
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </motion.div>
  );
}
