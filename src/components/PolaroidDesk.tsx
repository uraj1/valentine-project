import React, { useMemo, useState } from "react";
import { motion } from "framer-motion";

type Photo = {
  id: string;
  label: string;
  src: string;
  rotation: number;
  x: number;
  y: number;
};

export default function PolaroidDesk({
  photos,
}: {
  photos: Array<{ label: string; src: string }>;
}) {
  const items = useMemo<Photo[]>(() => {
    return photos.map((p, i) => ({
      id: `p-${i}`,
      label: p.label,
      src: p.src,
      rotation: (Math.random() * 12 - 6) * 1.1,
      x: (Math.random() * 260 - 130) * (i % 2 === 0 ? 1 : 0.75),
      y: (Math.random() * 190 - 95) * (i % 2 === 0 ? 0.9 : 1),
    }));
  }, [photos]);

  // For "bring to front" effect
  const [activeId, setActiveId] = useState<string | null>(null);

  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
      className="relative overflow-hidden rounded-[22px]"
    >
      {/* Premium glow background */}
      <div className="absolute inset-0 bg-gradient-to-br from-pink-200/35 via-white/20 to-purple-200/30 blur-2xl" />

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

      {/* MAIN CARD */}
      <div className="relative glass premium-border rounded-[22px] p-6 sm:p-8">
        <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4">
          <div>
            <div className="text-[11px] uppercase tracking-[0.22em] text-[#0f0f12]/55">
              Polaroid Memory Desk
            </div>
            <h3 className="mt-2 text-xl sm:text-2xl font-semibold tracking-tight">
              Drag the memories around
            </h3>
            <p className="mt-2 text-sm text-[#0f0f12]/65 leading-relaxed max-w-xl">
              Like a table full of moments we never want to lose.
              <br className="hidden sm:block" />
              Soft chaos. The best kind.
            </p>
          </div>

          <div className="text-xs text-[#0f0f12]/55 sm:text-right">
            Tip: drag to move, tap to focus.
          </div>
        </div>

        {/* DESK AREA */}
        <div className="relative mt-8 h-[520px] w-full overflow-hidden rounded-[22px] border border-white/50 bg-white/25 shadow-soft">
          {/* Desk texture overlay */}
          <div className="pointer-events-none absolute inset-0 opacity-[0.25] bg-[radial-gradient(circle_at_20%_30%,rgba(255,255,255,0.9),transparent_55%),radial-gradient(circle_at_80%_70%,rgba(255,182,212,0.65),transparent_60%)]" />

          {/* faint grid dots */}
          <div className="pointer-events-none absolute inset-0 opacity-[0.15] bg-[radial-gradient(circle,rgba(15,15,18,0.7)_1px,transparent_1px)] [background-size:18px_18px]" />

          {items.map((p, idx) => {
            const isActive = activeId === p.id;

            return (
              <motion.div
                key={p.id}
                drag
                dragElastic={0.14}
                dragMomentum={false}
                onMouseDown={() => setActiveId(p.id)}
                onTouchStart={() => setActiveId(p.id)}
                initial={{
                  opacity: 0,
                  scale: 0.95,
                  x: p.x,
                  y: p.y,
                  rotate: p.rotation,
                }}
                whileInView={{
                  opacity: 1,
                  scale: 1,
                  transition: {
                    delay: idx * 0.08,
                    duration: 0.9,
                    ease: [0.16, 1, 0.3, 1],
                  },
                }}
                viewport={{ once: true, amount: 0.2 }}
                whileHover={{
                  scale: 1.03,
                  rotate: p.rotation + 1,
                  transition: { duration: 0.25 },
                }}
                whileTap={{
                  scale: 1.05,
                  rotate: p.rotation + 2,
                }}
                className="absolute left-1/2 top-1/2 cursor-grab active:cursor-grabbing select-none"
                style={{
                  x: p.x,
                  y: p.y,
                  rotate: p.rotation,
                  translateX: "-50%",
                  translateY: "-50%",
                  zIndex: isActive ? 50 : 10 + idx,
                }}
              >
                {/* POLAROID CARD */}
                <div className="relative w-[190px] sm:w-[220px] rounded-[20px] bg-white border border-black/5 shadow-soft overflow-hidden">
                  {/* Tape */}
                  <div className="absolute -top-3 left-1/2 h-7 w-20 -translate-x-1/2 rotate-[-3deg] rounded-[10px] bg-white/60 border border-white/70 shadow-soft backdrop-blur-md" />

                  {/* Image */}
                  <div className="h-[150px] sm:h-[170px] bg-[#0f0f12]/5 overflow-hidden">
                    <img
                      src={p.src}
                      alt={p.label}
                      className="h-full w-full object-cover"
                      draggable={false}
                    />
                  </div>

                  {/* Label */}
                  <div className="px-4 py-4">
                    <div className="text-sm font-semibold text-[#0f0f12] tracking-tight">
                      {p.label}
                    </div>

                    <div className="mt-1 text-xs text-[#0f0f12]/55">
                      a moment I keep replaying
                    </div>
                  </div>

                  {/* Polaroid bottom spacing */}
                  <div className="h-6 bg-white" />
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* footer */}
        <p className="mt-6 text-xs text-[#0f0f12]/55 leading-relaxed">
          These aren’t just pictures… they’re little pieces of us.
        </p>
      </div>
    </motion.div>
  );
}
