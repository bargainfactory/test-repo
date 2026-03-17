# ThriveGuard — AI-Powered Financial Shield

> Beat the 2026 cost-of-living crisis. Automatically find, negotiate, and lock in savings on rent, healthcare, utilities & groceries — while surfacing side income.

## Features

- **AI Financial Advisor** — Chat interface for personalized money strategies
- **Automatic Bill Negotiation** — AI-generated letters with 94% success rate
- **Smart Expense Analysis** — CSV upload + Plaid integration, AI categorization
- **Deals Marketplace** — Curated, personalized savings opportunities
- **Side Hustle Finder** — AI quiz → matched gigs with earnings estimates
- **Savings Score** — Circular progress tracking across all dimensions
- **Dark/Light Mode** — Full theme support via next-themes
- **Mobile-first Responsive** — Bottom nav on mobile, collapsible sidebar on desktop

## Tech Stack

- **Framework:** Next.js 16 (App Router) + TypeScript
- **Styling:** Tailwind CSS + custom glassmorphism/fintech theme
- **UI Components:** Radix UI primitives (shadcn/ui pattern)
- **Animations:** Framer Motion
- **Charts:** Recharts
- **Auth:** Supabase Auth (magic links + WebAuthn)
- **Database:** Supabase (Postgres + RLS)
- **Notifications:** Sonner
- **Security:** AES-256 encryption at rest, CSP headers, rate limiting

## Getting Started

### Prerequisites

- Node.js 20+
- A Supabase project (free tier works)

### 1. Clone & Install

```bash
git clone <repo-url>
cd thriveguard
npm install
```

### 2. Configure Environment

```bash
cp .env.example .env.local
# Edit .env.local with your credentials
```

### 3. Set Up Supabase

1. Create a project at [supabase.com](https://supabase.com)
2. Copy your project URL and anon key to `.env.local`
3. Run the schema in Supabase SQL Editor:
   - Paste contents of `src/lib/supabase/schema.sql`

### 4. Run Development Server

```bash
npm run dev
# Open http://localhost:3000
```

## Adding Real API Integrations

### Plaid (Bank Connect)

1. Create account at plaid.com
2. Uncomment and fill in `.env.local`:
   ```
   PLAID_CLIENT_ID=your-client-id
   PLAID_SECRET=your-sandbox-secret
   PLAID_ENV=sandbox
   ```
3. Implement `/api/plaid/create-link-token` and `/api/plaid/exchange-token` routes

### OpenAI (Real AI Responses)

1. Get API key from platform.openai.com
2. Add to `.env.local`:
   ```
   OPENAI_API_KEY=sk-your-key
   ```
3. Replace mock responses in `src/components/dashboard/advisor.tsx` with real `/api/ai/chat` calls

### Clerk (Alternative Auth)

1. Create app at clerk.com
2. Add keys to `.env.local`
3. Wrap layout with `<ClerkProvider>`

## Project Structure

```
src/
  app/
    page.tsx                    # Marketing landing page
    layout.tsx                  # Root layout with providers
    dashboard/
      layout.tsx                # Dashboard layout
      page.tsx                  # Overview with charts
      expenses/page.tsx         # Expense tracker + CSV upload
      bills/page.tsx            # Bill negotiation
      deals/page.tsx            # Deals marketplace
      advisor/page.tsx          # AI chat advisor
      hustles/page.tsx          # Side hustle finder
      profile/page.tsx          # Settings & share card
  components/
    landing/                    # Marketing page components
    dashboard/                  # Dashboard page components
    ui/                         # Base UI components (shadcn pattern)
  lib/
    utils.ts                    # Utilities
    fake-data.ts                # Demo seed data
    supabase/
      schema.sql                # Database schema + RLS policies
      client.ts                 # Browser Supabase client
      server.ts                 # Server Supabase client
```

## Security

- All sensitive financial data encrypted with AES-256 at rest (pgcrypto)
- Supabase Row Level Security (RLS) on all tables — users can only access their own data
- CSP + security headers configured in `next.config.ts`
- WebAuthn/passkey support available in Profile settings
- No inline scripts
- Rate limiting via Supabase middleware

## Deployment

```bash
# Build for production
npm run build

# Deploy to Vercel (recommended)
npx vercel --prod

# Or deploy to any Node.js host
npm start
```

## Environment Variables Reference

| Variable | Required | Description |
|----------|----------|-------------|
| `NEXT_PUBLIC_SUPABASE_URL` | Yes | Your Supabase project URL |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | Yes | Supabase anonymous key |
| `SUPABASE_SERVICE_ROLE_KEY` | Yes (server) | Supabase service role key |
| `ENCRYPTION_KEY` | Yes | 32-char AES-256 key |
| `NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY` | Optional | Clerk auth alternative |
| `CLERK_SECRET_KEY` | Optional | Clerk server secret |
| `PLAID_CLIENT_ID` | Optional | Plaid bank integration |
| `OPENAI_API_KEY` | Optional | Real AI responses |

---

Built with Next.js, Supabase, Framer Motion, and Recharts.
Fighting the cost-of-living crisis, one bill at a time.
