import React from "react";
import { motion } from "framer-motion";

export type Chapter = {
  title: string;
  date?: string;
  body: string;
};

const reveal = {
  hidden: { opacity: 0, y: 18 },
  show: { opacity: 1, y: 0 },
};

export default function TimelineChapters({ chapters }: { chapters: Chapter[] }) {
  return (
    <div className="relative grid gap-6 sm:gap-8">
      <div className="absolute left-4 top-0 h-full w-[2px] bg-gradient-to-b from-[#ff7aa2]/40 via-white/40 to-[#c9b3ff]/40 sm:left-6" />

      {chapters.map((c, idx) => (
        <motion.div
          key={idx}
          variants={reveal}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
          className="relative pl-12 sm:pl-16"
        >
          <div className="absolute left-[9px] top-6 h-3 w-3 rounded-full bg-[#0f0f12] sm:left-[13px]" />
          <div className="glass premium-border rounded-[18px] p-6 sm:p-7">
            <div className="flex flex-wrap items-end justify-between gap-3">
              <div>
                <div className="text-[11px] uppercase tracking-[0.18em] text-[#0f0f12]/55">
                  Chapter {String(idx + 1).padStart(2, "0")}
                </div>
                <h3 className="mt-2 text-xl sm:text-2xl font-semibold tracking-tight text-[#0f0f12]">
                  {c.title}
                </h3>
              </div>

              {c.date && (
                <div className="text-sm text-[#0f0f12]/55">{c.date}</div>
              )}
            </div>

            <p className="mt-4 text-sm sm:text-base leading-relaxed text-[#0f0f12]/75">
              {c.body}
            </p>
          </div>
        </motion.div>
      ))}
    </div>
  );
}
