create table if not exists public.analyses (
  id uuid primary key default gen_random_uuid(),
  created_at timestamptz not null default now(),
  filename text not null,
  title text not null,
  recommendation text not null,
  fire_score integer not null,
  soul_score integer not null,
  report jsonb not null
);

alter table public.analyses enable row level security;
