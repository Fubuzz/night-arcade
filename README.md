# Night Arcade

Night Arcade is a polished MVP web arcade platform built with Next.js App Router and Tailwind CSS. It provides a premium dark-mode shell for Ahmed's nightly mini-games, with shared progression, per-game leaderboards, reward scaffolding, and graceful Supabase auth setup.

## Stack

- Next.js (App Router)
- TypeScript
- Tailwind CSS
- Supabase-ready auth scaffold
- Vercel-friendly deployment

## Features

- Premium landing page with arcade-style dark neon aesthetic
- Games library seeded with **Orbit Drop** and **Stack Sprint**
- Dedicated game detail/play routes with real playable cabinet embeds
- Dashboard scaffold with profile level, rewards, recent activity, and global rank framing
- Auth page for Google + email/password with preview-mode fallback when Supabase env vars are missing
- Future-friendly game integration registry for adding more cabinets later

## Getting Started

```bash
npm install
npm run dev
```

Open `http://localhost:3000`.

## Environment Variables

Create a `.env.local` file from `.env.example`:

```bash
cp .env.example .env.local
```

Required for live Supabase auth wiring:

- `NEXT_PUBLIC_SUPABASE_URL`
- `NEXT_PUBLIC_SUPABASE_ANON_KEY`

If these are missing, the app still runs with mock/preview behavior and clear setup guidance on the auth page.

## Supabase Setup Notes

1. Create a Supabase project
2. Enable **Google** and **Email** auth providers
3. Copy the project URL into `NEXT_PUBLIC_SUPABASE_URL`
4. Copy the anon public key into `NEXT_PUBLIC_SUPABASE_ANON_KEY`
5. Add the same variables in Vercel project settings

## Project Structure

```text
public/
  games/
    orbit-drop/
      app.js
      index.html
      style.css
    stack-sprint/
      app.js
      index.html
      style.css
src/
  app/
    auth/
    dashboard/
    games/
      [slug]/
  components/
    auth/
    dashboard/
    games/
    home/
    layout/
    shared/
    ui/
  lib/
    data.ts
    game-integrations.ts
    supabase.ts
    types.ts
    utils.ts
```

## Game Integration Architecture

Night Arcade now treats each playable game as a **cabinet runtime** mounted inside the platform shell.

### How it works

- The platform route (`/games/[slug]`) keeps the premium Night Arcade header, stats, rewards, and leaderboard UI.
- The actual playable game lives as a static runtime under `public/games/<slug>/`.
- `src/lib/game-integrations.ts` maps a slug to its integration settings:
  - public path
  - embed mode
  - aspect ratio
  - minimum height / sizing behavior
- `src/components/games/game-embed.tsx` renders the runtime consistently inside the Night Arcade play surface.

This keeps the shell reusable while letting each game keep its own runtime style, canvas logic, and assets.

## Current Game Sources Found

### Stack Sprint
- Existing playable source was found in the workspace at:
  - `/data/.openclaw/workspace/tmp-stack-sprint-fix`
- That standalone game was brought into Night Arcade at:
  - `public/games/stack-sprint/`

### Orbit Drop
- A complete standalone Orbit source was **not found elsewhere in the workspace** during inspection.
- To satisfy the playable-route requirement cleanly, a production-style standalone Orbit Drop cabinet runtime was created directly for Night Arcade at:
  - `public/games/orbit-drop/`
- This keeps the platform architecture consistent and leaves a clean slot for swapping in an older/original Orbit build later if it turns up.

## Adding a New Game

1. Add a static runtime under:
   - `public/games/<slug>/`
2. Include the runtime files the game needs, usually:
   - `index.html`
   - `app.js`
   - `style.css`
   - plus any local assets
3. Add or update the game entry in `src/lib/data.ts` with metadata:
   - `slug`
   - title, tagline, description
   - difficulty, status, genre, tags
   - rewards, stats, leaderboard seed data
   - accent gradient classes for visual identity
4. Register the cabinet in `src/lib/game-integrations.ts`
5. Add the slug to `generateStaticParams()` in `src/app/games/[slug]/page.tsx`
6. The game will then render inside the shared Night Arcade shell automatically

## Mobile Integration Notes

- Cabinet embeds are sized intentionally per game instead of forcing one ratio everywhere
- Orbit Drop uses a portrait-first embed for better touch play
- Stack Sprint keeps its wider canvas but is still contained cleanly in the shell
- Standalone links are included so each cabinet can also be opened directly if needed

## Deployment Notes for Vercel

- Push the project to GitHub
- Import the repository into Vercel
- Add the two Supabase env vars in Vercel
- Deploy

Expected live URL pattern:

```text
https://night-arcade.vercel.app
```

## Validation

Recommended checks:

```bash
npm run lint
npm run build
```

## Future Extensions

- Replace mock data with Supabase queries and mutations
- Add real auth actions and protected sessions
- Persist real leaderboard entries and profile XP
- Add more nightly games through the same cabinet runtime pattern
- Swap embedded static runtimes for deeper React/custom integrations when useful
