import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

type Props = {
  onDone: () => void;
};

export default function LoaderScreen({ onDone }: Props) {
  const [progress, setProgress] = useState(0);
  const [phase, setPhase] = useState<"loading" | "hello">("loading");

  useEffect(() => {
    const start = Date.now();
    const duration = 3000;

    const t = setInterval(() => {
      const p = Math.min(100, Math.floor(((Date.now() - start) / duration) * 100));
      setProgress(p);
      if (p >= 100) {
        clearInterval(t);
        setTimeout(() => setPhase("hello"), 300);
        setTimeout(() => onDone(), 300+5000);
      }
    }, 40);

    return () => clearInterval(t);
  }, [onDone]);

  return (
    <div className="fixed inset-0 z-[60] flex items-center justify-center bg-[#0b0b10] text-white">
      <div className="absolute inset-0 opacity-60"
        style={{
          background:
            "radial-gradient(900px 700px at 25% 20%, rgba(201,179,255,0.35), transparent 65%), radial-gradient(900px 700px at 70% 40%, rgba(255,122,162,0.30), transparent 60%), linear-gradient(135deg, rgba(10,10,16,1), rgba(10,10,16,1))",
        }}
      />

      <div className="relative w-full max-w-md px-6">
        <AnimatePresence mode="wait">
          {phase === "loading" ? (
            <motion.div
              key="loading"
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
              className="text-center"
            >
              <p className="text-sm tracking-wide text-white/70">
                Preparing something special…
              </p>
              <h1 className="mt-3 text-2xl sm:text-3xl font-semibold tracking-tight">
                Loading your favorite person…
              </h1>

              <div className="mt-8 h-[8px] w-full overflow-hidden rounded-full bg-white/10">
                <motion.div
                  className="h-full rounded-full"
                  style={{
                    background:
                      "linear-gradient(90deg, rgba(255,122,162,0.9), rgba(201,179,255,0.9))",
                  }}
                  initial={{ width: "0%" }}
                  animate={{ width: `${progress}%` }}
                  transition={{ duration: 0.3 }}
                />
              </div>

              <div className="mt-3 text-xs text-white/55">{progress}%</div>
            </motion.div>
          ) : (
            <motion.div
              key="hello"
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 1.0, ease: [0.16, 1, 0.3, 1] }}
              className="text-center"
            >
              <p className="text-sm tracking-wide text-white/70">Just one second…</p>
              <h1 className="mt-3 text-3xl sm:text-4xl font-semibold tracking-tight">
                Hey love <span className="text-white/80">🤍</span>
              </h1>
              <p className="mt-4 text-sm text-white/60">
                I built this with love ❤️.
              </p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
