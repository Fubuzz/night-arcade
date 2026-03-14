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
- Dedicated game detail/play routes with future-ready embed mount points
- Dashboard scaffold with profile level, rewards, recent activity, and global rank framing
- Auth page for Google + email/password with preview-mode fallback when Supabase env vars are missing
- Typed mock data architecture for easy future platform growth

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
    supabase.ts
    types.ts
    utils.ts
```

## Adding a New Game

1. Add a new game object to `src/lib/data.ts`
2. Include:
   - `slug`
   - title, tagline, description
   - difficulty, status, genre, tags
   - rewards, stats, leaderboard seed data
   - accent gradient classes for visual identity
3. Add the slug to `generateStaticParams()` in `src/app/games/[slug]/page.tsx`
4. The game will automatically appear in the homepage and library if included in the exported `games` array

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
- Mount real games into the play surface shell
- Persist leaderboard entries and profile XP
- Add more nightly games with the same platform structure
