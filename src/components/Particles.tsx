import React, { useMemo } from "react";
import { motion } from "framer-motion";

type Dot = {
  id: string;
  x: number;
  y: number;
  size: number;
  blur: number;
  opacity: number;
  hue: "rose" | "lavender";
  type: "dot" | "heart";
};

function rand(min: number, max: number) {
  return Math.random() * (max - min) + min;
}

export default function Particles() {
  const dots = useMemo<Dot[]>(() => {
    const items: Dot[] = [];

    for (let i = 0; i < 26; i++) {
      items.push({
        id: `dot-${i}`,
        x: rand(0, 100),
        y: rand(0, 100),
        size: rand(80, 220),
        blur: rand(12, 40),
        opacity: rand(0.08, 0.18),
        hue: Math.random() > 0.5 ? "rose" : "lavender",
        type: "dot",
      });
    }

    for (let i = 0; i < 7; i++) {
      items.push({
        id: `heart-${i}`,
        x: rand(0, 100),
        y: rand(0, 100),
        size: rand(18, 38),
        blur: rand(0, 0),
        opacity: rand(0.08, 0.16),
        hue: Math.random() > 0.5 ? "rose" : "lavender",
        type: "heart",
      });
    }

    return items;
  }, []);

  return (
    <div className="pointer-events-none fixed inset-0 z-0 overflow-hidden">
      {dots.map((d) => (
        <motion.div
          key={d.id}
          className="absolute"
          style={{
            left: `${d.x}%`,
            top: `${d.y}%`,
            width: d.size,
            height: d.type === "dot" ? d.size : d.size,
            opacity: d.opacity,
            filter: d.type === "dot" ? `blur(${d.blur}px)` : undefined,
            transform: "translate(-50%, -50%)",
          }}
          animate={{
            y: [0, -14, 0],
            x: [0, 10, 0],
          }}
          transition={{
            duration: 10 + Math.random() * 8,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        >
          {d.type === "dot" ? (
            <div
              className="h-full w-full rounded-full"
              style={{
                background:
                  d.hue === "rose"
                    ? "radial-gradient(circle at 30% 30%, rgba(255,122,162,0.8), rgba(255,122,162,0.0) 70%)"
                    : "radial-gradient(circle at 30% 30%, rgba(201,179,255,0.8), rgba(201,179,255,0.0) 70%)",
              }}
            />
          ) : (
            <svg viewBox="0 0 24 24" className="h-full w-full">
              <path
                d="M12 21s-7.2-4.35-9.6-8.4C.7 9.3 2.3 6 5.8 6c2 0 3.2 1.1 4.2 2.2C11 7.1 12.2 6 14.2 6c3.5 0 5.1 3.3 3.4 6.6C19.2 16.65 12 21 12 21z"
                fill="none"
                stroke={d.hue === "rose" ? "rgba(255,122,162,0.65)" : "rgba(201,179,255,0.65)"}
                strokeWidth="1.2"
              />
            </svg>
          )}
        </motion.div>
      ))}
    </div>
  );
}
