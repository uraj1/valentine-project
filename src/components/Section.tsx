import React from "react";
import { motion } from "framer-motion";
import { cx } from "../lib/utils";

type Props = {
  id?: string;
  title?: string;
  subtitle?: string;
  children: React.ReactNode;
  className?: string;
  align?: "left" | "center";
  compact?: boolean;
};

export default function Section({
  id,
  title,
  subtitle,
  children,
  className,
  align = "left",
  compact = false,
}: Props) {
  return (
    <section
      id={id}
      className={cx(
        "relative mx-auto w-full max-w-6xl px-4 sm:px-6 lg:px-8",
        compact ? "py-14 sm:py-16" : "py-16 sm:py-20",
        className
      )}
    >
      {/* premium subtle background glow for each section */}
      <div
        className="pointer-events-none absolute inset-0 -z-10 opacity-[0.65]"
        style={{
          background:
            "radial-gradient(900px 600px at 30% 15%, rgba(255,122,162,0.18), transparent 70%), radial-gradient(900px 600px at 70% 25%, rgba(201,179,255,0.16), transparent 72%)",
        }}
      />

      {(title || subtitle) && (
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.35 }}
          transition={{ duration: 1.0, ease: [0.16, 1, 0.3, 1] }}
          className={cx(
            "mb-10 sm:mb-12",
            align === "center" && "text-center"
          )}
        >
          {title && (
            <div className={cx("relative inline-block")}>
              {/* title glow */}
              <div
                className={cx(
                  "absolute -inset-x-8 -inset-y-6 -z-10 blur-2xl opacity-70",
                  align === "center" ? "left-1/2 -translate-x-1/2" : ""
                )}
                style={{
                  background:
                    "radial-gradient(circle at 30% 40%, rgba(255,122,162,0.28), transparent 65%), radial-gradient(circle at 70% 60%, rgba(201,179,255,0.22), transparent 70%)",
                }}
              />

              <h2 className="text-3xl sm:text-5xl font-semibold tracking-tight text-[#0f0f12] leading-[1.08]">
                {title}
              </h2>

              {/* premium underline */}
              <motion.div
                initial={{ width: 0, opacity: 0 }}
                whileInView={{ width: "100%", opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 1.1, ease: [0.16, 1, 0.3, 1] }}
                className={cx(
                  "mt-4 h-[1px] bg-gradient-to-r from-transparent via-[#0f0f12]/20 to-transparent",
                  align === "center" ? "mx-auto" : ""
                )}
              />
            </div>
          )}

          {subtitle && (
            <p
              className={cx(
                "mt-5 text-base sm:text-lg text-[#0f0f12]/70 leading-relaxed",
                align === "center" ? "mx-auto max-w-2xl" : "max-w-3xl"
              )}
            >
              {subtitle}
            </p>
          )}
        </motion.div>
      )}

      {/* Content */}
      <div className="relative">{children}</div>
    </section>
  );
}
