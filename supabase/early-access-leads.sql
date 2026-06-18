create extension if not exists pgcrypto;

create table if not exists public.early_access_leads (
  id uuid primary key default gen_random_uuid(),
  created_at timestamp with time zone not null default now(),
  name text not null,
  email text not null unique,
  business_name text not null,
  business_type text not null,
  social_link text,
  biggest_problem text not null,
  would_pay_20 text,
  source text not null default 'early_access',
  notes text,
  constraint early_access_leads_name_not_empty check (length(btrim(name)) > 0),
  constraint early_access_leads_email_not_empty check (length(btrim(email)) > 0),
  constraint early_access_leads_email_format check (email ~* '^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$'),
  constraint early_access_leads_business_name_not_empty check (length(btrim(business_name)) > 0),
  constraint early_access_leads_business_type_not_empty check (length(btrim(business_type)) > 0),
  constraint early_access_leads_biggest_problem_not_empty check (length(btrim(biggest_problem)) > 0),
  constraint early_access_leads_source_not_empty check (length(btrim(source)) > 0)
);

alter table public.early_access_leads enable row level security;

drop policy if exists "Allow anon insert early access leads" on public.early_access_leads;

create policy "Allow anon insert early access leads"
  on public.early_access_leads
  for insert
  to anon
  with check (true);
