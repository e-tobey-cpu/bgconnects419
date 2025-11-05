-- Users table
create table if not exists public.users (
  id uuid primary key default gen_random_uuid(),
  role text check (role in ('buyer','seller','admin')) not null,
  email text unique not null,
  name text,
  phone text,
  created_at timestamptz default now()
);

-- Sellers table (1:1 with users)
create table if not exists public.sellers (
  id uuid primary key references public.users(id) on delete cascade,
  display_name text not null,
  stripe_account_id text unique,
  payout_status text check (payout_status in ('pending','verified','restricted')) default 'pending',
  categories text[],
  bio text,
  website_url text,
  instagram_url text,
  booking_link text,
  active boolean default true
);

-- Services table
create table if not exists public.services (
  id uuid primary key default gen_random_uuid(),
  seller_id uuid not null references public.sellers(id) on delete cascade,
  title text not null,
  description text not null,
  price_cents integer not null check (price_cents > 0),
  duration_minutes integer not null check (duration_minutes > 0),
  is_active boolean default true,
  created_at timestamptz default now()
);

-- Bookings table
create table if not exists public.bookings (
  id uuid primary key default gen_random_uuid(),
  service_id uuid not null references public.services(id) on delete cascade,
  buyer_id uuid not null references public.users(id) on delete cascade,
  seller_id uuid not null references public.sellers(id) on delete cascade,
  start_at timestamptz not null,
  end_at timestamptz not null,
  status text check (status in ('pending','paid','canceled','refunded')) default 'pending',
  amount_cents integer not null,
  payment_intent_id text,
  charge_id text,
  created_at timestamptz default now()
);

-- Reviews table
create table if not exists public.reviews (
  id uuid primary key default gen_random_uuid(),
  service_id uuid not null references public.services(id) on delete cascade,
  reviewer_id uuid not null references public.users(id) on delete cascade,
  rating integer not null check (rating >= 1 and rating <= 5),
  text text,
  created_at timestamptz default now()
);

-- Conversations & messages for in‑app chat
create table if not exists public.conversations (
  id uuid primary key default gen_random_uuid(),
  buyer_id uuid not null references public.users(id) on delete cascade,
  seller_id uuid not null references public.users(id) on delete cascade,
  created_at timestamptz default now()
);

create table if not exists public.messages (
  id uuid primary key default gen_random_uuid(),
  conversation_id uuid not null references public.conversations(id) on delete cascade,
  sender_id uuid not null references public.users(id) on delete cascade,
  body text not null,
  created_at timestamptz default now()
);

-- Availability
create table if not exists public.availability_rules (
  id uuid primary key default gen_random_uuid(),
  seller_id uuid not null references public.sellers(id) on delete cascade,
  day_of_week integer not null check (day_of_week >= 0 and day_of_week <= 6),
  start_time time not null,
  end_time time not null
);

create table if not exists public.availability_exceptions (
  id uuid primary key default gen_random_uuid(),
  seller_id uuid not null references public.sellers(id) on delete cascade,
  start_at timestamptz not null,
  end_at timestamptz not null
);

-- Coupons
create table if not exists public.coupons (
  id uuid primary key default gen_random_uuid(),
  code text unique not null,
  type text check (type in ('percent','amount')) not null,
  value numeric not null,
  active boolean default true,
  valid_from timestamptz,
  valid_to timestamptz,
  usage_limit integer,
  created_at timestamptz default now()
);

-- User profiles (extended attributes)
create table if not exists public.user_profiles (
  id uuid primary key references public.users(id) on delete cascade,
  avatar_url text,
  currency text default 'USD',
  admin boolean default false
);

-- Enable row level security on all tables
alter table public.users enable row level security;
alter table public.sellers enable row level security;
alter table public.services enable row level security;
alter table public.bookings enable row level security;
alter table public.reviews enable row level security;
alter table public.conversations enable row level security;
alter table public.messages enable row level security;
alter table public.availability_rules enable row level security;
alter table public.availability_exceptions enable row level security;
alter table public.coupons enable row level security;
alter table public.user_profiles enable row level security;

-- Public read policies for services and sellers
create policy if not exists "public read services"
on public.services
for select
to anon, authenticated
using (is_active = true);

create policy if not exists "public read sellers"
on public.sellers
for select
to anon, authenticated
using (active = true);

create policy if not exists "public read users"
on public.users
for select
to anon, authenticated
using (true);

create policy if not exists "public read reviews"
on public.reviews
for select
to anon, authenticated
using (true);

-- Booking policies: only buyer or seller can see their booking
create policy if not exists "buyer or seller can read booking"
on public.bookings
for select
to authenticated
using (
  auth.uid()::uuid = buyer_id OR auth.uid()::uuid = seller_id
);

-- Messages: only conversation participants can read
create policy if not exists "participants can read messages"
on public.messages
for select
to authenticated
using (
  auth.uid()::uuid in (select buyer_id from public.conversations where id = conversation_id) OR
  auth.uid()::uuid in (select seller_id from public.conversations where id = conversation_id)
);

-- Conversations: restrict to participants
create policy if not exists "participants can read conversations"
on public.conversations
for select
to authenticated
using (
  auth.uid()::uuid = buyer_id OR auth.uid()::uuid = seller_id
);

-- Allow authenticated users to insert bookings, messages, reviews
create policy if not exists "authenticated can insert booking"
on public.bookings
for insert
to authenticated
with check (
  auth.uid()::uuid = buyer_id
);

create policy if not exists "authenticated can insert review"
on public.reviews
for insert
to authenticated
with check (
  auth.uid()::uuid = reviewer_id
);

create policy if not exists "authenticated can insert message"
on public.messages
for insert
to authenticated
with check (
  auth.uid()::uuid = sender_id
);

-- Restrict writes from anon and authenticated on sensitive tables (avoid client‑side writes)
revoke insert, update, delete on public.users from anon, authenticated;
revoke insert, update, delete on public.sellers from anon, authenticated;
revoke insert, update, delete on public.services from anon, authenticated;
revoke insert, update, delete on public.bookings from anon; -- only authenticated can insert booking per policy
revoke insert, update, delete on public.reviews from anon; -- only authenticated can insert reviews per policy
revoke insert, update, delete on public.coupons from anon, authenticated;
revoke insert, update, delete on public.user_profiles from anon, authenticated;