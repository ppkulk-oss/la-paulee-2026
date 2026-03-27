# La Paulée NYC 2026 — Grand Tasting Companion

A PWA companion app for the La Paulée NYC Grand Tasting at Pier Sixty, March 28, 2026.

## Features

- **Interactive floor map** of all 34 producer stations + food vendors
- **Walking route** optimized to hit Tier 1 (highest demand) producers first
- **Full wine data** for 130+ wines with retail prices from Wine-Searcher
- **French pronunciation** — tap to hear each producer's name via Web Speech API
- **Tasting log** — star ratings + notes for every wine, persists across sessions
- **Food break reminders** every 6 wines logged
- **Offline-first PWA** — works without cell service (spotty at Chelsea Piers)
- **Installable** — "Add to Home Screen" on iOS & Android

## Deploy to Vercel

```bash
# Install dependencies
npm install

# Dev server
npm run dev

# Build
npm run build
```

### Vercel (one-click)

1. Push this repo to GitHub
2. Go to [vercel.com/new](https://vercel.com/new)
3. Import the repo
4. Framework preset: **Vite**
5. Deploy

That's it. Share the URL with your crew.

### Install as PWA

- **Android**: Open in Chrome → three-dot menu → "Add to Home Screen" or "Install App"
- **iOS**: Open in Safari → Share → "Add to Home Screen"

## Tech Stack

- React 18 + Vite 5
- vite-plugin-pwa (Workbox service worker)
- Web Speech API for French TTS
- localStorage for persistence
- Zero backend — all data baked in

## Data Sources

- Wine list from [lapaulee.com/nyc-grand-tasting-2026](https://www.lapaulee.com/nyc-grand-tasting-2026)
- Prices from Wine-Searcher average US retail (March 2026)
- Floor map from official La Paulée venue layout
