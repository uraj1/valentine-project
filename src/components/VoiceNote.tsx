import React, { useEffect, useRef, useState } from "react";
import { Pause, Play, Mic, Sparkles } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

type Props = {
  audioUrl?: string;
};

function formatTime(sec: number) {
  if (!sec || isNaN(sec)) return "00:00";
  const m = Math.floor(sec / 60);
  const s = Math.floor(sec % 60);
  return `${String(m).padStart(2, "0")}:${String(s).padStart(2, "0")}`;
}

export default function VoiceNote({ audioUrl }: Props) {
  const audioRef = useRef<HTMLAudioElement | null>(null);

  const [playing, setPlaying] = useState(false);
  const [progress, setProgress] = useState(0);

  const [duration, setDuration] = useState(0);
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    if (!audioRef.current) return;
    const a = audioRef.current;

    const onLoaded = () => {
      if (!a.duration) return;
      setDuration(a.duration);
    };

    const update = () => {
      if (!a.duration) return;
      setCurrent(a.currentTime);
      setProgress((a.currentTime / a.duration) * 100);
    };

    const onEnd = () => {
      setPlaying(false);
      setCurrent(0);
      setProgress(0);
    };

    a.addEventListener("loadedmetadata", onLoaded);
    a.addEventListener("timeupdate", update);
    a.addEventListener("ended", onEnd);

    return () => {
      a.removeEventListener("loadedmetadata", onLoaded);
      a.removeEventListener("timeupdate", update);
      a.removeEventListener("ended", onEnd);
    };
  }, []);

  const toggle = async () => {
    if (!audioRef.current) return;

    try {
      if (playing) {
        audioRef.current.pause();
        setPlaying(false);
      } else {
        await audioRef.current.play();
        setPlaying(true);
      }
    } catch {
      setPlaying(false);
    }
  };

  const seek = (val: number) => {
    if (!audioRef.current || !duration) return;
    const newTime = (val / 100) * duration;
    audioRef.current.currentTime = newTime;
    setProgress(val);
    setCurrent(newTime);
  };

  // EMPTY STATE
  if (!audioUrl) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 22 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
        className="relative overflow-hidden rounded-[22px]"
      >
        <div className="absolute inset-0 bg-gradient-to-br from-pink-200/35 via-white/20 to-purple-200/30 blur-2xl" />

        <div className="relative glass premium-border rounded-[22px] p-6 sm:p-8">
          <div className="flex items-start justify-between gap-4">
            <div>
              <div className="text-[11px] uppercase tracking-[0.22em] text-[#0f0f12]/55">
                Voice Note Mode
              </div>
              <h3 className="mt-3 text-xl sm:text-2xl font-semibold tracking-tight">
                Add your voice here
              </h3>
              <p className="mt-3 text-sm text-[#0f0f12]/70 leading-relaxed max-w-xl">
                Drop a file at{" "}
                <span className="font-mono text-[#0f0f12]/80">
                  public/voice-note.mp3
                </span>{" "}
                (or update the URL in code).
                <br />
                This section is ready — it just needs your voice.
              </p>
            </div>

            <div className="h-11 w-11 rounded-[16px] border border-white/60 bg-white/40 grid place-items-center shadow-soft">
              <Mic size={18} className="text-[#0f0f12]/65" />
            </div>
          </div>

          <div className="mt-6 rounded-[18px] border border-white/60 bg-white/40 px-5 py-4 text-sm text-[#0f0f12]/65">
            This part hits different when it’s your voice.
          </div>
        </div>
      </motion.div>
    );
  }

  // MAIN PLAYER
  return (
    <motion.div
      initial={{ opacity: 0, y: 22 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
      className="relative overflow-hidden rounded-[22px]"
    >
      {/* Premium glow */}
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

      <div className="relative glass premium-border rounded-[22px] p-6 sm:p-8">
        <div className="flex items-start justify-between gap-4">
          <div>
            <div className="text-[11px] uppercase tracking-[0.22em] text-[#0f0f12]/55">
              Voice Note Mode
            </div>

            <h3 className="mt-2 text-xl sm:text-2xl font-semibold tracking-tight">
              A message from me to you
            </h3>

            <p className="mt-2 text-sm text-[#0f0f12]/65 leading-relaxed">
              Press play.
              <br className="hidden sm:block" />
              Listen with your heart, not your ears.
            </p>
          </div>

          {/* Play button */}
          <motion.button
            onClick={toggle}
            whileHover={{ y: -1 }}
            whileTap={{ scale: 0.96 }}
            className="relative grid h-12 w-12 place-items-center rounded-[18px] bg-[#0f0f12] text-white shadow-soft"
            aria-label={playing ? "Pause" : "Play"}
          >
            {/* pulsing ring */}
            <AnimatePresence>
              {playing && (
                <motion.div
                  initial={{ opacity: 0.5, scale: 0.9 }}
                  animate={{ opacity: 0, scale: 1.6 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 1.2, repeat: Infinity }}
                  className="absolute inset-0 rounded-[18px] border border-white/40"
                />
              )}
            </AnimatePresence>

            {playing ? <Pause size={18} /> : <Play size={18} />}
          </motion.button>
        </div>

        {/* Time + progress */}
        <div className="mt-7">
          <div className="flex items-center justify-between text-xs text-[#0f0f12]/55">
            <span>{formatTime(current)}</span>
            <span>{formatTime(duration)}</span>
          </div>

          {/* progress bar */}
          <div className="mt-3 h-[10px] w-full overflow-hidden rounded-full border border-white/60 bg-white/30">
            <motion.div
              className="h-full rounded-full bg-gradient-to-r from-pink-400/90 via-purple-400/80 to-indigo-400/70"
              animate={{ width: `${progress}%` }}
              transition={{ duration: 0.25 }}
            />
          </div>

          {/* seek slider */}
          <input
            type="range"
            min={0}
            max={100}
            value={progress}
            onChange={(e) => seek(Number(e.target.value))}
            className="mt-4 w-full accent-[#ff7aa2]"
          />
        </div>

        {/* footer romantic line */}
        <div className="mt-6 flex items-center justify-between gap-4">
          <div className="text-xs text-[#0f0f12]/55 leading-relaxed">
            This isn’t just audio.
            <br />
            It’s me, wrapped inside a few seconds.
          </div>

          <motion.div
            animate={{ opacity: [0.4, 0.8, 0.4] }}
            transition={{ duration: 2.4, repeat: Infinity }}
            className="hidden sm:flex items-center gap-2 text-xs text-[#0f0f12]/55"
          >
            <Sparkles size={14} className="text-[#ff4f87]/70" />
            <span>play it again.</span>
          </motion.div>
        </div>

        <audio ref={audioRef} src={audioUrl} preload="auto" />
      </div>
    </motion.div>
  );
}
