# The Love Portal — Premium Edition

A premium cinematic romantic proposal website.

## ✨ Features Included
- Cinematic intro loader
- Personalized greeting (Her Name)
- Smooth scroll + section reveal animations
- Premium bokeh particles background (no cringe hearts)
- Floating mini music player (Spotify-like)
- Chapters timeline (storybook roadmap style)
- Reasons generator with smooth transitions
- Voice note mode (plays your recorded audio)
- Draggable polaroid gallery (Framer Motion drag)
- Secret vault unlock with code
- Elegant Love Meter with snap-back below 80%
- NO button escape with premium spring animation
- YES click → full-screen celebration + confetti + modal
- Screenshot moment button
- Valentine Pass ticket generator + download as image
- "One more thing..." surprise section with date plan
- Live counter since you met

## 🚀 Quick Start

```bash
npm install
npm run dev
```

## 📦 Add Your Real Assets

Place these files:

- (Optional) `public/our-song.mp3` (if you want local music)
- `public/voice-note.mp3`
- `public/photos/photo-1.jpg` ... `photo-5.jpg`
- `public/photos/secret.jpg`

You can use any JPG/PNG images.

## 🔐 Secret Code
Update in:

`src/pages/App.tsx`

```ts
const SECRET_CODE = "1402";
```

Hint is DDMM format.

## ⏳ Met Date
Update:

```ts
const MET_AT = "2024-02-14T18:30:00.000Z";
```

## 🌍 Deploy on Vercel
- Push to GitHub
- Import into Vercel
- Done

Works perfectly as a Vite React app.

If you prefer Next.js, this structure can be migrated easily.


## 🎵 Music Source
The mini player is configured to use a **direct MP3 streaming URL (Pixabay)** by default.
You can replace it in `src/pages/App.tsx`.
