# FC Bundes

Official website for FC Bundes, The Federals. The club was established in 2017 in Dagoretti, Nairobi, Kenya.

Live site: https://fc-bundes.vercel.app

## Stack

- Next.js 15 (App Router)
- React 19
- TypeScript
- GSAP

## Install

```bash
npm install
npm run dev
```

Open http://localhost:3000.

## Production build

```bash
npm run build
npm start
```

Vercel uses `next build`. There is no custom output directory.

## Environment

Copy `.env.example` to `.env.local` only if you connect a supporter list.

`FANS_WEBHOOK_URL` is optional. It is an HTTPS endpoint that receives `{ name, email }` when someone joins the supporter list. Leave it unset and the form reports that the list is not open yet.

Do not commit `.env` or `.env.local`.

## Deployment

The production site is the Vercel project `fc-bundes`, connected to `OnyxWebSystems/fc-bundes-website`.

- Pushes to `main` deploy production at https://fc-bundes.vercel.app.
- Pushes to any other branch create a Vercel preview deployment.
- Each deployment has a build status in Vercel and on the GitHub commit.
