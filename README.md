# 🛒 বাজার দর (BazarDor)

প্রয়োজনীয় পণ্যের দাম এক নজরে — চাল, ডাল, তেল, সবজি, মাছ, মাংস, ডিম-দুধ ও মসলার আজকের বাজারদর, দাম বাড়া-কমার হিসাব এবং বিভাগভিত্তিক বাজারের তুলনা।

**Live:** _deploy করার পর এখানে লিংক বসান_

## Technologies
- Next.js 16 (App Router) + TypeScript
- Tailwind CSS v4 + DaisyUI v5
- BetterAuth (Email/Password, Google, GitHub) with MongoDB adapter
- react-hot-toast, Hind Siliguri (Bangla font)
- Data: live from `https://openapi.programming-hero.com/api/bazardor` (no local copy)

## Features
1. **Live price ticker & hero** – infinite marquee with price and ▲/▼ change; hero CTA smooth-scrolls to `#সব-পণ্য`.
2. **Home sections** – top 6 risers, top 6 fallers, and all products in a responsive grid (Bengali digits, green/red/gray badges).
3. **Category pages with sorting** – default / price low→high / high→low (numeric sort), skeleton loaders, 404-style empty state.
4. **Protected product details** – min / max / average price, price history and market-wise prices grouped by division; guests are redirected to sign-in with a toast.
5. **Authentication** – BetterAuth email/password + Google/GitHub login, validation errors and toasts for every action.
6. **My Profile + Update information** – update the display name via BetterAuth `updateUser`.
7. **Fully responsive** with a custom 404 page; dynamic routes work on refresh.

## Getting started
```bash
npm install
cp .env.example .env.local   # fill in values
npm run dev
```
| Variable | Purpose |
|---|---|
| `BETTER_AUTH_SECRET` | random secret (`openssl rand -base64 32`) |
| `BETTER_AUTH_URL` | app URL (your Vercel URL in production) |
| `MONGODB_URI` | MongoDB connection string (required in production; without it users live in memory only) |
| `GOOGLE_CLIENT_ID/SECRET`, `GITHUB_CLIENT_ID/SECRET` | social login. Callback: `<APP_URL>/api/auth/callback/<provider>` |

## Deploy (Vercel)
Import the repo, add the env variables above, deploy. No extra config needed.

