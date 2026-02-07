import React, { useEffect, useMemo, useState } from "react";
import { motion } from "framer-motion";
import LoaderScreen from "../components/LoaderScreen";
import Particles from "../components/Particles";
import Section from "../components/Section";
import PremiumButton from "../components/PremiumButton";
import TimelineChapters, { Chapter } from "../components/TimelineChapters";
import ReasonsGenerator from "../components/ReasonsGenerator";
import VoiceNote from "../components/VoiceNote";
import PolaroidDesk from "../components/PolaroidDesk";
import SecretVault from "../components/SecretVault";
import LoveMeter from "../components/LoveMeter";
import ProposalSection from "../components/ProposalSection";
import CelebrationModal from "../components/CelebrationModal";
import MiniPlayer from "../components/MiniPlayer";
import { formatTimeSince, pad2 } from "../lib/utils";
import { loadState, saveState } from "../lib/storage";

const MET_AT = "2025-12-14T18:30:00.000Z";
const SECRET_CODE = "1412";

const RedesignedHero = ({ herName, time, pad2, goTo }: { herName: string; time: any; pad2: (n: number) => string; goTo: (id: string) => void }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
      className="mx-auto max-w-5xl px-4 sm:px-6"
    >
      <div className="relative">
        {/* Decorative Background Glows */}
        <div className="absolute -top-24 -left-24 h-96 w-96 rounded-full bg-pink-200/30 blur-[120px] -z-10" />
        <div className="absolute -bottom-24 -right-24 h-96 w-96 rounded-full bg-purple-200/30 blur-[120px] -z-10" />

        {/* Main Card Container */}
        <div className="glass premium-border relative overflow-hidden rounded-[32px] p-8 sm:p-12">
          {/* Floating Note Card (Desktop Only) */}
          <div className="relative z-10 grid gap-12 lg:grid-cols-2 lg:items-center">
            {/* Content Column */}
            <div className="flex flex-col items-center text-center lg:items-start lg:text-left">
              <div className="inline-flex items-center gap-2.5 rounded-full border border-white/80 bg-white/40 px-4 py-1.5 text-[10px] uppercase tracking-[0.2em] text-[#0f0f12]/60 shadow-sm backdrop-blur-md">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-pink-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-pink-500/80"></span>
                </span>
                Limited to One: {herName}
              </div>

              <h1 className="mt-6 text-4xl sm:text-6xl font-bold tracking-tight text-[#0f0f12] leading-[1.1]">
                A portal <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-pink-500 to-purple-600">
                  built for love.
                </span>
              </h1>

              <p className="mt-6 text-base text-[#0f0f12]/60 leading-relaxed max-w-md">
                "This little world is built for <span className="text-[#0f0f12] font-sans not-italic font-semibold">{herName}</span>.
                Not for show. Just for the girl I never want to lose."
              </p>

              <div className="mt-8 flex flex-wrap justify-center lg:justify-start items-center gap-4">
                <PremiumButton onClick={() => goTo("chapters")} glow className="px-8 py-4 rounded-2xl shadow-xl">
                  Start the story
                </PremiumButton>
                <button onClick={() => goTo("letter")} className="rounded-2xl border border-white/60 bg-white/20 px-7 py-3.5 text-sm font-medium text-[#0f0f12]/70 hover:bg-white/50 transition-all duration-300">
                  Read the letter
                </button>
              </div>
            </div>

            {/* Counter Section: The Cinematic Bento */}
            <div className="relative w-full max-w-[500px] mx-auto lg:mx-0">
              {/* The "Aura" - Layered glows for depth */}
              <div className="absolute -top-10 -right-10 w-40 h-40 bg-pink-300/20 blur-[80px] rounded-full" />
              <div className="absolute -bottom-10 -left-10 w-40 h-40 bg-purple-300/20 blur-[80px] rounded-full" />

              <div className="relative flex flex-col gap-4">

                {/* 01. The "Hero" Card: Days */}
                <motion.div
                  whileHover={{ y: -5, transition: { duration: 0.4 } }}
                  className="glass premium-border relative overflow-hidden rounded-[32px] p-8 bg-white/10 backdrop-blur-2xl"
                >
                  {/* Subtle Mesh Gradient Background */}
                  <div className="absolute inset-0 opacity-[0.08] pointer-events-none bg-[radial-gradient(circle_at_50%_0%,rgba(255,255,255,1)_0%,transparent_70%)]" />

                  <div className="relative z-10">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-[10px] uppercase tracking-[0.4em] font-bold text-[#0f0f12]/40">
                        Current Chapter
                      </span>
                      <div className="flex items-center gap-1.5 px-2 py-1 rounded-full bg-white/40 border border-white/60">
                        <span className="relative flex h-1.5 w-1.5">
                          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-pink-400 opacity-75"></span>
                          <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-pink-500"></span>
                        </span>
                        <span className="text-[9px] font-bold text-[#0f0f12]/60 uppercase tracking-tighter">Live</span>
                      </div>
                    </div>

                    <div className="flex items-baseline gap-3">
                      <span className="text-7xl sm:text-8xl font-light tracking-tighter text-[#0f0f12]/90 tabular-nums">
                        {time.days}
                      </span>
                      <span className="text-xl font-medium text-[#0f0f12]/30 lowercase">days.</span>
                    </div>

                    <p className="mt-4 text-[11px] text-[#0f0f12]/50 font-medium leading-relaxed">
                      Since the world started feeling a lot more like <span className="text-pink-600/60">{herName}</span>.
                    </p>
                  </div>
                </motion.div>

                {/* 02. The "Precision" Row: Hours, Minutes, Seconds */}
                <div className="grid grid-cols-3 gap-4">
                  {[
                    { label: "Hrs", value: pad2(time.hours) },
                    { label: "Min", value: pad2(time.minutes) },
                    { label: "Sec", value: pad2(time.seconds), highlight: true },
                  ].map((item, i) => (
                    <motion.div
                      key={item.label}
                      whileHover={{ scale: 1.02 }}
                      className="glass premium-border rounded-[24px] p-5 flex flex-col items-center justify-center bg-white/10 backdrop-blur-xl"
                    >
                      <span className={`text-2xl sm:text-3xl font-light tracking-tight tabular-nums ${item.highlight ? 'text-pink-500/80' : 'text-[#0f0f12]/80'}`}>
                        {item.value}
                      </span>
                      <span className="text-[9px] uppercase tracking-[0.2em] font-bold text-[#0f0f12]/30 mt-1">
                        {item.label}
                      </span>
                    </motion.div>
                  ))}
                </div>

                {/* 03. The "Meta" Info: Detailed Timestamp */}
                <div className="px-4 flex items-center justify-between opacity-40">
                  <div className="text-[9px] uppercase tracking-[0.2em] font-medium">
                    Ref: Us / Always / Forever
                  </div>
                  <div className="h-[1px] flex-1 mx-4 bg-[#0f0f12]/10" />
                  <div className="text-[9px] font-mono italic">
                    Infinite Loop
                  </div>
                </div>

              </div>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default function App() {
  const [boot, setBoot] = useState(true);

  const herName = "Preeti";
  const [songUrl] = useState("/perfect.mp3");
  const [voiceUrl] = useState("/voice-note.mp3");
  const metAtISO = MET_AT;

  const [unlocked, setUnlocked] = useState(false);
  const [yes, setYes] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [showLastThing, setShowLastThing] = useState(false);

  const [now, setNow] = useState(Date.now());

  useEffect(() => {
    const s = loadState();
    if (s.yesClicked) setYes(true);
  }, []);

  useEffect(() => {
    saveState({ yesClicked: yes });
  }, [yes]);

  useEffect(() => {
    const t = setInterval(() => setNow(Date.now()), 1000);
    return () => clearInterval(t);
  }, []);

  const time = useMemo(() => {
    const ms = now - new Date(metAtISO).getTime();
    return formatTimeSince(ms);
  }, [now, metAtISO]);

  const handleLoaderDone = React.useCallback(() => {
    setBoot(false);
  }, []);

  const chapters = useMemo<Chapter[]>(
    () => [
      {
        title: "The Day We Met",
        date: "Chapter One",
        body: "I didn’t know it that day… but my life quietly changed direction. You walked in, and suddenly everything felt a little more alive.",
      },
      {
        title: "The Little Things",
        date: "Chapter Two",
        body: "The way you laugh. The way you listen. The way you exist so softly yet leave such a loud impact on my heart.",
      },
      {
        title: "The Safe Place",
        date: "Chapter Three",
        body: "Somehow, in a world that moves too fast… you became the calm I keep searching for. The kind of peace I want forever.",
      },
      {
        title: "The Future I Want",
        date: "Chapter Four",
        body: "I don’t just like you. I want to build days with you. Quiet mornings. Loud laughs. Late-night talks. All of it.",
      },
    ],
    []
  );

  const photos = useMemo(
    () => [
      { label: "My favorite smile", src: "/photos/photo-1.jpg" },
      { label: "Uff Hotie", src: "/photos/photo-2.jpg" },
      { label: "You & Me", src: "/photos/photo-3.jpg" },
      { label: "Us, being us", src: "/photos/photo-4.jpg" },
      { label: "This one is special", src: "/photos/photo-5.jpg" },
    ],
    []
  );

  const goTo = (id: string) => {
    const el = document.getElementById(id);
    if (!el) return;
    el.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  const onYes = () => {
    setYes(true);
    setShowModal(true);
    setTimeout(() => setShowLastThing(true), 1500);
  };

  return (
    <div className="smooth-scroll relative min-h-screen">
      {/* background texture */}
      <div className="noise-overlay" />
      <Particles />

      {boot && <LoaderScreen onDone={handleLoaderDone} />}

      <MiniPlayer songUrl={songUrl} title="Our Song" />

      <div className="relative z-10">
        {/* NAV */}
        <div className="mx-auto flex max-w-6xl flex-col items-center justify-center gap-4 px-4 sm:flex-row sm:justify-between sm:px-6 lg:px-8 pt-7">
          <div className="flex items-center gap-3">
            <div className="h-10 w-10 rounded-[16px] bg-white/55 border border-white/60 shadow-soft grid place-items-center font-semibold tracking-tight">
              PB
            </div>
            <div>
              <div className="text-sm font-semibold tracking-tight">
                My Love Portal
              </div>
              <div className="text-[11px] uppercase tracking-[0.20em] text-[#0f0f12]/55">
                one of one • made for you
              </div>
            </div>
          </div>

          {/* Desktop Nav */}
          <div className="hidden sm:flex items-center gap-2">
            {[
              { id: "chapters", label: "Chapters" },
              { id: "vault", label: "Secret" },
              { id: "question", label: "The Question" },
            ].map((x) => (
              <button
                key={x.id}
                onClick={() => goTo(x.id)}
                className="rounded-[14px] px-4 py-2 text-sm text-[#0f0f12]/70 hover:bg-white/40 transition"
              >
                {x.label}
              </button>
            ))}
          </div>

          {/* Mobile breadcrumb */}
          <div className="flex sm:hidden items-center gap-2 rounded-[999px] border border-white/60 bg-white/35 px-4 py-2 text-xs text-[#0f0f12]/70 shadow-soft">
            <button onClick={() => goTo("chapters")} className="hover:underline">
              Chapters
            </button>
            <span className="opacity-50">›</span>
            <button onClick={() => goTo("vault")} className="hover:underline">
              Secret
            </button>
            <span className="opacity-50">›</span>
            <button onClick={() => goTo("question")} className="hover:underline">
              Question
            </button>
          </div>
        </div>

        {/* HERO */}
        <Section
          id="hero"
          className="pt-14 sm:pt-16"
          align="center"
          title={`Hey, ${herName} 🤍`}
          subtitle="This is not a website. It’s a memory."
        >
          <RedesignedHero herName={herName} time={time} pad2={pad2} goTo={goTo} />
        </Section>

        {/* CHAPTERS */}
        <Section
          id="chapters"
          title="Chapters of Us"
          subtitle="Not a timeline. A story. And every chapter is my favorite."
        >
          <TimelineChapters chapters={chapters} />
        </Section>

        {/* REASONS */}
        <Section
          id="reasons"
          title="16 Reasons Why"
          subtitle="I could write a thousand pages. Here are a few lines."
        >
          <ReasonsGenerator herName={herName} />
        </Section>

        {/* VOICE NOTE */}
        <Section
          id="voice"
          title="Voice Note Mode"
          subtitle="Because sometimes love sounds better than it reads."
        >
          <VoiceNote audioUrl={voiceUrl} />
        </Section>

        {/* GALLERY */}
        <Section
          id="gallery"
          title="Memory Gallery"
          subtitle="Drag the polaroids around. Like we’re sitting at the same table."
        >
          <PolaroidDesk photos={photos} />
        </Section>

        {/* VAULT */}
        <Section
          id="vault"
          title="The Vault"
          subtitle="There’s something here I didn’t want to say too easily."
        >
          <SecretVault
            isUnlocked={unlocked}
            onUnlocked={() => setUnlocked(true)}
            correctCode={SECRET_CODE}
            hint="The date we first met (DDMM)"
            revealTitle="Okay… you found it."
            revealMessage="I love you in a way that feels calm and dangerous at the same time. Like peace with fireworks underneath. And I’m grateful it’s you."
            revealImage="/photos/secret.jpg"
          />
        </Section>

        {/* LOVE LETTER */}
        <Section
          id="letter"
          title="A Letter (for your heart)"
          subtitle="No loud words. Just honest ones."
        >
          <motion.div
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.35 }}
            transition={{ duration: 1.0, ease: [0.16, 1, 0.3, 1] }}
            className="relative overflow-hidden rounded-[26px]"
          >
            <div className="absolute inset-0 bg-gradient-to-br from-pink-200/40 via-white/15 to-purple-200/30 blur-2xl" />

            <div className="relative glass premium-border rounded-[26px] p-7 sm:p-10">
              <div className="text-[11px] uppercase tracking-[0.22em] text-[#0f0f12]/55">
                Love Letter
              </div>

              <h3 className="mt-3 text-xl sm:text-2xl font-semibold tracking-tight">
                I wrote this slowly.
              </h3>

              <p className="mt-6 text-base sm:text-lg leading-relaxed text-[#0f0f12]/75 max-w-3xl">
                I don’t know how you did it…
                <br />
                but you became my favorite part of everything.
                <br />
                <br />
                In a world full of noise, you feel like clarity.
                <br />
                In a world full of rush, you feel like home.
                <br />
                <br />
                If love had a design language, it would look like you:
                soft, intentional, and impossible to forget.
                <br />
                <br />
                So this is me, choosing you — out loud.
              </p>

              <div className="mt-7 text-sm text-[#0f0f12]/60">
                — from someone who is hopelessly yours
              </div>

              <div className="mt-8 h-[1px] w-full bg-white/60" />

              <div className="mt-6 text-xs text-[#0f0f12]/55">
                archived in my heart • forever ever
              </div>
            </div>
          </motion.div>
        </Section>

        {/* LOVE METER */}
        <Section
          id="meter"
          title="A Very Serious Test"
          subtitle="Don’t worry. This one has a correct answer."
        >
          <LoveMeter />
        </Section>

        {/* QUESTION */}
        <Section
          id="question"
          title="Final Step"
          subtitle="If I could choose again… I’d still choose you."
        >
          <ProposalSection herName={herName} onYes={onYes} />
        </Section>

        {/* AFTER YES */}
        <Section
          id="after"
          title="After This…"
          subtitle="Just in case you thought I was done."
        >
          <motion.div
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.35 }}
            transition={{ duration: 1.0, ease: [0.16, 1, 0.3, 1] }}
            className="relative overflow-hidden rounded-[26px]"
          >
            <div className="absolute inset-0 bg-gradient-to-br from-pink-200/35 via-white/10 to-purple-200/30 blur-2xl" />

            <div className="relative glass premium-border rounded-[26px] p-7 sm:p-10">
              <div className="text-[11px] uppercase tracking-[0.22em] text-[#0f0f12]/55">
                Bonus Features
              </div>

              <h3 className="mt-3 text-xl sm:text-2xl font-semibold tracking-tight">
                One more thing…
              </h3>

              <p className="mt-4 text-sm sm:text-base text-[#0f0f12]/70 leading-relaxed max-w-3xl">
                There are some people you meet and you instantly know…
                the story is about to get better.
              </p>

              <div className="mt-7 flex flex-wrap items-center gap-3">
                <PremiumButton
                  onClick={() => setShowLastThing(true)}
                  glow
                  disabled={!yes}
                >
                  Reveal the last thing
                </PremiumButton>

                {!yes && (
                  <div className="text-xs text-[#0f0f12]/55">
                    (Unlocks after you say YES 😌)
                  </div>
                )}
              </div>

              {showLastThing && yes && (
                <motion.div
                  initial={{ opacity: 0, y: 14 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
                  className="mt-7 rounded-[22px] border border-white/60 bg-white/40 p-6 sm:p-7"
                >
                  <div className="text-[11px] uppercase tracking-[0.22em] text-[#0f0f12]/55">
                    Surprise
                  </div>

                  <h4 className="mt-3 text-lg sm:text-xl font-semibold tracking-tight">
                    Here’s the plan.
                  </h4>

                  <p className="mt-4 text-sm sm:text-base text-[#0f0f12]/75 leading-relaxed">
                    A proper date. No excuses. No delays.
                    <br />
                    We dress up. We eat something sweet. We take pictures.
                    <br />
                    And at the end, I hold your hand like it’s the only thing that makes sense.
                  </p>

                  <div className="mt-6 grid gap-3 sm:grid-cols-3">
                    <div className="rounded-[20px] border border-white/60 bg-white/40 p-4">
                      <div className="text-xs text-[#0f0f12]/55">📍 Location</div>
                      <div className="mt-2 font-medium">Your choice.</div>
                    </div>
                    <div className="rounded-[20px] border border-white/60 bg-white/40 p-4">
                      <div className="text-xs text-[#0f0f12]/55">🕒 Time</div>
                      <div className="mt-2 font-medium">This weekend.</div>
                    </div>
                    <div className="rounded-[20px] border border-white/60 bg-white/40 p-4">
                      <div className="text-xs text-[#0f0f12]/55">🎁 Dress code</div>
                      <div className="mt-2 font-medium">Your smile.</div>
                    </div>
                  </div>

                  <div className="mt-6 text-xs text-[#0f0f12]/55">
                    If you say yes again, I’ll book it immediately.
                  </div>
                </motion.div>
              )}
            </div>
          </motion.div>
        </Section>

        {/* FOOTER */}
        <footer className="pb-24 pt-10">
          <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
            <div className="relative overflow-hidden rounded-[24px]">
              <div className="absolute inset-0 bg-gradient-to-br from-pink-200/35 via-white/15 to-purple-200/25 blur-2xl" />

              <div className="relative glass premium-border rounded-[24px] p-6 sm:p-8 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                <div>
                  <div className="text-sm font-semibold tracking-tight">
                    My Love Portal
                  </div>
                  <div className="text-xs text-[#0f0f12]/60 mt-1">
                    Built with intention. Delivered with love.
                  </div>
                </div>

                <div className="text-xs text-[#0f0f12]/55 leading-relaxed">
                  © UR — Always has been,
                  <br />
                  always will be, yours.
                </div>
              </div>
            </div>
          </div>
        </footer>
      </div>

      <CelebrationModal
        open={showModal}
        herName={herName}
        onClose={() => setShowModal(false)}
      />
    </div>
  );
}
