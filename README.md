# JobToProof

JobToProof is a validation MVP for mobile detailers. It turns one completed detailing job into ready-to-copy proof assets, including social captions, a short-form video idea, a review request, and a static proof page demo. The app also includes an early-access lead capture form backed by Supabase.

## Tech Stack

- Next.js
- React
- TypeScript
- Tailwind CSS
- Supabase

## Local Setup

Install dependencies:

```bash
npm install
```

Create a local environment file:

```bash
cp .env.example .env.local
```

Add your Supabase project values to `.env.local`:

```bash
SUPABASE_URL=your-supabase-project-url
SUPABASE_ANON_KEY=your-supabase-anon-key
```

Run the development server:

```bash
npm run dev
```

Run checks:

```bash
npm run typecheck
npm run build
```

## Supabase Setup

The database setup file is:

```text
supabase/early-access-leads.sql
```

Run that SQL in the Supabase SQL editor for the target project. It creates the `early_access_leads` table, enables row level security, and allows anonymous inserts for the early-access form.

## Vercel Deployment

Deploy the Next.js app to Vercel and add these environment variables in the Vercel project settings:

```bash
SUPABASE_URL=your-supabase-project-url
SUPABASE_ANON_KEY=your-supabase-anon-key
```

Use the Supabase SQL setup file before testing the deployed early-access form.

## Current Limitations

- Validation MVP only
- Static demo generation
- No authentication
- No payments
- No AI API yet
- No Google, SMS, or social posting integrations
