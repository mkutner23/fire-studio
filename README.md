# Fire Studio Vol. 1

A working screenplay-coverage MVP.

## Stack

- Next.js
- OpenAI Responses API
- `pdf-parse`
- Supabase (optional persistence)
- Vercel deployment

## Local setup

```bash
npm install
cp .env.example .env.local
npm run dev
```

Add:

```env
OPENAI_API_KEY=...
OPENAI_MODEL=gpt-5
```

Open `http://localhost:3000`.

## Optional Supabase

1. Create a Supabase project.
2. Run `supabase/schema.sql`.
3. Add the Supabase environment variables.
4. Analyses will be stored automatically.

## Deploy to Vercel

1. Push this repository to GitHub.
2. Import it into Vercel.
3. Add environment variables.
4. Deploy.

## One-week execution plan

Day 1: Deploy and validate PDF extraction.
Day 2: Improve Fire prompt and JSON reliability.
Day 3: Add authentication and private projects.
Day 4: Add report history and export.
Day 5: Test with five scripts.
Day 6: Fix failures and tighten Fire's voice.
Day 7: Invite first external testers.

## Known limits

- PDF only
- Image-only PDFs will fail
- Very long scripts are truncated
- Budget and market analysis are inference, not verified industry forecasts
- No billing yet
