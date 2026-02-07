import React from "react";
import { motion, HTMLMotionProps } from "framer-motion";
import { cx } from "../lib/utils";

type Props = HTMLMotionProps<"button"> & {
  variant?: "primary" | "ghost" | "danger";
  glow?: boolean;
};

export default function PremiumButton({
  className,
  variant = "primary",
  glow = false,
  ...props
}: Props) {
  const base =
    "relative inline-flex items-center justify-center gap-2 rounded-[14px] px-5 py-3 text-sm font-medium transition will-change-transform select-none";
  const styles =
    variant === "primary"
      ? "bg-[#0f0f12] text-white shadow-soft hover:shadow-[0_20px_90px_rgba(10,10,20,0.22)]"
      : variant === "danger"
      ? "bg-[#1a1016] text-white border border-white/10 hover:border-white/20"
      : "bg-white/40 text-[#0f0f12] border border-white/50 hover:bg-white/55";

  return (
    <motion.button
      whileHover={{ y: -1 }}
      whileTap={{ scale: 0.98 }}
      className={cx(
        base,
        styles,
        glow &&
          "shadow-[0_0_0_1px_rgba(255,122,162,0.15),0_25px_90px_rgba(255,122,162,0.18)]",
        className
      )}
      {...props}
    />
  );
}
