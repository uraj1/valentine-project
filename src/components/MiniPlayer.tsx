import React, { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { Pause, Play, Volume2, ChevronUp, ChevronDown } from "lucide-react";
import { cx } from "../lib/utils";

type Props = {
  songUrl?: string;
  title?: string;
};

export default function MiniPlayer({ songUrl, title = "Our Song" }: Props) {
  const audioRef = useRef<HTMLAudioElement | null>(null);

  const [minimized, setMinimized] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [volume, setVolume] = useState(0.8);

  useEffect(() => {
    if (!audioRef.current) return;
    audioRef.current.volume = volume;
  }, [volume]);

  useEffect(() => {
    if (!audioRef.current) return;

    const audio = audioRef.current;

    const handleEnd = () => setIsPlaying(false);
    audio.addEventListener("ended", handleEnd);

    return () => audio.removeEventListener("ended", handleEnd);
  }, []);

  useEffect(() => {
    setIsPlaying(false);
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current.currentTime = 0;
    }
  }, [songUrl]);

  const toggle = async () => {
    if (!audioRef.current) return;

    try {
      if (isPlaying) {
        audioRef.current.pause();
        setIsPlaying(false);
      } else {
        await audioRef.current.play();
        setIsPlaying(true);
      }
    } catch (err) {
      console.log("Audio play blocked:", err);
      setIsPlaying(false);
    }
  };

  if (!songUrl) return null;

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 18 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
      className="fixed bottom-5 right-5 z-50"
    >
      <motion.div
        layout
        transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
        className={cx(
          "glass premium-border rounded-[18px] shadow-soft overflow-hidden",
          minimized ? "w-[170px]" : "w-[360px] sm:w-[480px]"
        )}
      >
        <motion.div layout className="px-4 py-3">
          <div className="flex items-center justify-between gap-3">
            {/* LEFT SIDE TEXT ONLY WHEN EXPANDED */}
            {!minimized && (
              <motion.div
                layout
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="min-w-0"
              >
                <div className="text-[11px] uppercase tracking-[0.18em] text-[#0f0f12]/60">
                  Now Playing
                </div>
                <div className="truncate text-sm font-medium text-[#0f0f12]">
                  {title}
                </div>
              </motion.div>
            )}

            {/* RIGHT SIDE CONTROLS */}
            <div className="flex items-center gap-2">
              <button
                onClick={toggle}
                className="grid h-10 w-10 place-items-center rounded-[14px] bg-[#0f0f12] text-white shadow-soft"
                aria-label={isPlaying ? "Pause" : "Play"}
              >
                {isPlaying ? <Pause size={16} /> : <Play size={16} />}
              </button>

              {/* VOLUME ONLY WHEN EXPANDED */}
              {!minimized && (
                <motion.div
                  layout
                  className="hidden sm:flex items-center gap-2 rounded-[14px] border border-white/40 bg-white/35 px-3 py-2"
                >
                  <Volume2 size={14} className="text-[#0f0f12]/70" />
                  <input
                    type="range"
                    min={0}
                    max={1}
                    step={0.01}
                    value={volume}
                    onChange={(e) => setVolume(Number(e.target.value))}
                    className={cx("w-28 accent-[#ff7aa2]")}
                  />
                </motion.div>
              )}

              <button
                onClick={() => setMinimized(!minimized)}
                className="rounded-[14px] border border-white/45 bg-white/30 px-3 py-2 text-xs text-[#0f0f12]/70 hover:bg-white/45"
              >
                {minimized ? (
                  <span className="flex items-center gap-1">
                    <ChevronUp size={14} /> Show
                  </span>
                ) : (
                  <span className="flex items-center gap-1">
                    <ChevronDown size={14} /> Minimize
                  </span>
                )}
              </button>
            </div>
          </div>
        </motion.div>
      </motion.div>

      <audio ref={audioRef} src={songUrl} preload="auto" />
    </motion.div>
  );
}
