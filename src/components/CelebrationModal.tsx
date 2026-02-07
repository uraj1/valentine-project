import React, { useRef } from "react";
import { AnimatePresence, motion } from "framer-motion";
import Confetti from "react-confetti";
import html2canvas from "html2canvas";
import PremiumButton from "./PremiumButton";

type Props = {
  open: boolean;
  herName: string;
  onClose: () => void;
};

export default function CelebrationModal({ open, herName, onClose }: Props) {
  const ticketRef = useRef<HTMLDivElement | null>(null);

  const downloadTicket = async () => {
    if (!ticketRef.current) return;

    const canvas = await html2canvas(ticketRef.current, {
      backgroundColor: null,
      scale: 2,
    });

    const url = canvas.toDataURL("image/png");
    const a = document.createElement("a");
    a.href = url;
    a.download = `valentine-pass-${herName.toLowerCase()}.png`;
    a.click();
  };

  const screenshotMoment = async () => {
    const canvas = await html2canvas(document.body, {
      backgroundColor: "#0b0b10",
      scale: 2,
    });

    const url = canvas.toDataURL("image/png");
    const a = document.createElement("a");
    a.href = url;
    a.download = "our-valentine-moment.png";
    a.click();
  };

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          className="fixed inset-0 z-[80] flex items-center justify-center px-4 py-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.45 }}
        >
          {/* Background */}
          <div
            className="absolute inset-0"
            style={{
              background:
                "radial-gradient(900px 700px at 30% 20%, rgba(255,122,162,0.30), transparent 65%), radial-gradient(900px 700px at 70% 40%, rgba(201,179,255,0.30), transparent 60%), rgba(10,10,16,0.92)",
            }}
          />

          {/* Blur overlay */}
          <div className="absolute inset-0 backdrop-blur-[10px]" />

          {/* Confetti (balanced) */}
          <Confetti
            recycle={false}
            numberOfPieces={120}
            gravity={0.11}
            initialVelocityY={6}
          />

          {/* Modal Wrapper */}
          <motion.div
            initial={{ opacity: 0, y: 24, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 24, scale: 0.97 }}
            transition={{ duration: 0.75, ease: [0.16, 1, 0.3, 1] }}
            className="relative w-full max-w-xl sm:max-w-2xl"
          >
            {/* Outer glow */}
            <div className="absolute -inset-4 rounded-[28px] bg-gradient-to-br from-pink-400/15 via-white/5 to-purple-400/15 blur-2xl opacity-70" />

            {/* Main Card */}
            <div className="relative glass-dark premium-border rounded-[24px] p-5 sm:p-7 text-white shadow-[0_35px_120px_rgba(0,0,0,0.72)] overflow-hidden max-h-[88vh]">
              {/* Subtle shine */}
              <motion.div
                className="absolute inset-0 opacity-[0.12]"
                animate={{ x: ["-40%", "140%"] }}
                transition={{ duration: 7, repeat: Infinity, ease: "linear" }}
                style={{
                  background:
                    "linear-gradient(90deg, transparent, rgba(255,255,255,0.9), transparent)",
                }}
              />

              {/* HEADER */}
              <div className="relative">
                <div className="text-[10px] uppercase tracking-[0.26em] text-white/55">
                  Let's Celebrate! 🎉
                </div>

                <h3 className="mt-3 text-[22px] sm:text-3xl font-semibold tracking-tight leading-tight">
                  You just made my heart
                  <br className="hidden sm:block" />
                  feel like home.
                </h3>

                <p className="mt-3 text-sm sm:text-base text-white/70 leading-relaxed max-w-xl">
                  {herName}, you didn’t just say yes.
                  <br className="hidden sm:block" />
                  You just became my favorite forever. 🤍
                </p>
              </div>

              {/* CARDS */}
              <div className="relative mt-6 grid gap-4 sm:grid-cols-2">
                {/* PASS */}
                <div
                  ref={ticketRef}
                  className="relative overflow-hidden rounded-[22px] border border-white/15 bg-white/10 p-5"
                >
                  {/* Top strip */}
                  <div className="absolute top-0 left-0 right-0 h-[5px] bg-gradient-to-r from-pink-400/70 via-purple-400/60 to-indigo-400/60" />

                  {/* Watermark */}
                  <div className="pointer-events-none absolute -bottom-10 -right-10 text-white/10 text-[120px] leading-none">
                    ♥
                  </div>

                  <div className="mt-2 text-[10px] uppercase tracking-[0.22em] text-white/55">
                    Valentine Pass
                  </div>

                  <div className="mt-4 text-xl font-semibold tracking-tight">
                    {herName}
                  </div>

                  <div className="mt-3 text-sm text-white/70 leading-relaxed">
                    Valid for:{" "}
                    <span className="text-white font-medium">
                      Unlimited love
                    </span>
                    <br />
                    Issued by:{" "}
                    <span className="text-white font-medium">Me</span>
                  </div>

                  <div className="mt-5 h-[1px] w-full bg-white/15" />

                  {/* Barcode */}
                  <div className="mt-4 flex gap-[3px] opacity-70">
                    {Array.from({ length: 30 }).map((_, i) => (
                      <div
                        key={i}
                        className="h-5 w-[2px] rounded-full bg-white/35"
                        style={{
                          opacity: i % 4 === 0 ? 0.95 : 0.55,
                        }}
                      />
                    ))}
                  </div>

                  <div className="mt-4 text-[11px] text-white/55 leading-relaxed">
                    Redeem anytime.
                    <br />
                    No expiry. No rules. Only us.
                  </div>
                </div>

                {/* DETAILS */}
                <div className="rounded-[22px] border border-white/15 bg-white/10 p-5">
                  <div className="text-[10px] uppercase tracking-[0.22em] text-white/55">
                    Date Details
                  </div>

                  <div className="mt-4 text-sm text-white/75 leading-relaxed">
                    📍 Location:{" "}
                    <span className="text-white font-medium">
                      Guess the place...
                    </span>
                    <br />
                    🕒 Time:{" "}
                    <span className="text-white font-medium">
                     I will pick you up, yayy!
                    </span>
                    <br />
                    🎁 Dress code:{" "}
                    <span className="text-white font-medium">
                      Your smile.
                    </span>
                  </div>

                  <div className="mt-5 rounded-[18px] border border-white/15 bg-white/5 px-4 py-3 text-sm text-white/65 leading-relaxed">
                    Official contract:
                    <br />
                    <span className="text-white/80 font-medium">
                      You + Me = Always.
                    </span>
                  </div>

                  <div className="mt-4 text-[11px] text-white/55">
                    This moment is now archived in my heart.
                  </div>
                </div>
              </div>

              {/* BUTTONS */}
              <div className="relative mt-6 flex flex-wrap items-center gap-3">
                <PremiumButton onClick={downloadTicket} glow>
                  Download Pass
                </PremiumButton>

                <PremiumButton onClick={screenshotMoment} variant="ghost">
                  Screenshot
                </PremiumButton>

                <div className="flex-1" />

                <PremiumButton onClick={onClose} variant="danger">
                  Close
                </PremiumButton>
              </div>

              {/* FOOTER */}
              <div className="relative mt-4 text-[11px] text-white/55 leading-relaxed">
                You made my day BBG.
                <br />
                Just my heart, being honest.
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
