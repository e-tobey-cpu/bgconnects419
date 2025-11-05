-- Initial schema for BGConnects marketplace

-- USERS table
create table if not exists public.users (
  id uuid primary key default gen_random_uuid(),
  email text unique not null,
  role text check (role in ('buyer','seller','admin')) not null default 'buyer',
  name text,
  phone text,
  image_url text,
  admin boolean default false,
  created_at timestamptz default now()
);

-- SELLERS table (1:1 with users)
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
  active boolean default true,
  created_at timestamptz default now()
);

-- SERVICES table (what sellers offer)
create table if not exists public.services (
  id uuid primary key default gen_random_uuid(),
  seller_id uuid not null references public.sellers(id) on delete cascade,
  title text not null,
  description text not null,
  price_cents integer not null check (price_cents > 0),
  duration_minutes integer not null check (duration_minutes > 0),
  category text,
  image_url text,
  is_active boolean default true,
  created_at timestamptz default now()
);

-- BOOKINGS table (when a buyer books a service)
create table if not exists public.bookings (
  id uuid primary key default gen_random_uuid(),
  service_id uuid not null references public.services(id) on delete cascade,
  buyer_id uuid not null references public.users(id) on delete cascade,
  seller_id uuid not null references public.sellers(id) on delete cascade,
  start_at timestamptz not null,
  end_at timestamptz not null,
  status text check (status in ('pending','paid','canceled','refunded')) default 'pending',
  amount_cents integer not null,
  currency text default 'USD',
  payment_intent_id text,
  charge_id text,
  coupon_code text references public.coupons(code),
  tax_amount_cents integer,
  created_at timestamptz default now()
);

-- REVIEWS table
create table if not exists public.reviews (
  id uuid primary key default gen_random_uuid(),
  service_id uuid not null references public.services(id) on delete cascade,
  reviewer_id uuid not null references public.users(id) on delete cascade,
  rating integer not null check (rating >= 1 and rating <= 5),
  text text,
  created_at timestamptz default now()
);

-- CONVERSATIONS table
create table if not exists public.conversations (
  id uuid primary key default gen_random_uuid(),
  buyer_id uuid not null references public.users(id) on delete cascade,
  seller_id uuid not null references public.users(id) on delete cascade,
  created_at timestamptz default now()
);

-- MESSAGES table
create table if not exists public.messages (
  id uuid primary key default gen_random_uuid(),
  conversation_id uuid not null references public.conversations(id) on delete cascade,
  sender_id uuid not null references public.users(id) on delete cascade,
  content text not null,
  created_at timestamptz default now()
);

-- AVAILABILITY RULES table
create table if not exists public.availability_rules (
  id uuid primary key default gen_random_uuid(),
  seller_id uuid not null references public.sellers(id) on delete cascade,
  day_of_week integer not null check (day_of_week between 0 and 6), -- 0=Sunday
  start_time time not null,
  end_time time not null,
  created_at timestamptz default now()
);

-- AVAILABILITY EXCEPTIONS table
create table if not exists public.availability_exceptions (
  id uuid primary key default gen_random_uuid(),
  seller_id uuid not null references public.sellers(id) on delete cascade,
  date date not null,
  start_time time,
  end_time time,
  is_available boolean default false,
  created_at timestamptz default now()
);

-- COUPONS table
create table if not exists public.coupons (
  code text primary key,
  type text check (type in ('percent','amount')) not null,
  value numeric not null,
  active boolean default true,
  valid_from date,
  valid_to date,
  usage_limit integer,
  usage_count integer default 0,
  created_at timestamptz default now()
);

-- Enable RLS on all tables
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

-- ===== PUBLIC READ POLICIES =====

-- Services: public can read active services
drop policy if exists "public read services" on public.services;
create policy "public read services"
on public.services
for select
to anon, authenticated
using (is_active = true);

-- Sellers: public can read active sellers
drop policy if exists "public read sellers" on public.sellers;
create policy "public read sellers"
on public.sellers
for select
to anon, authenticated
using (active = true);

-- Users: public can read safe fields
drop policy if exists "public read users" on public.users;
create policy "public read users"
on public.users
for select
to anon, authenticated
using (true);

-- Reviews: public read
drop policy if exists "public read reviews" on public.reviews;
create policy "public read reviews"
on public.reviews
for select
to anon, authenticated
using (true);

-- Coupons: public read active coupons
drop policy if exists "public read coupons" on public.coupons;
create policy "public read coupons"
on public.coupons
for select
to anon, authenticated
using (active = true);

-- ===== AUTHENTICATED USER POLICIES =====

-- Services: allow sellers to manage their own services
drop policy if exists "owner manage services" on public.services;
create policy "owner manage services"
on public.services
for all
to authenticated
using (auth.uid() = seller_id);

-- Bookings: buyers and sellers can read bookings they are a party to
drop policy if exists "owner or counterparty can read booking" on public.bookings;
create policy "owner or counterparty can read booking"
on public.bookings
for select
to authenticated
using (auth.uid() = buyer_id OR auth.uid() = seller_id);

-- Reviews: only the reviewer can update/delete their reviews
drop policy if exists "reviewer manage review" on public.reviews;
create policy "reviewer manage review"
on public.reviews
for all
to authenticated
using (auth.uid() = reviewer_id);

-- Messages: participants can read/write messages in their conversation
drop policy if exists "participants read messages" on public.messages;
create policy "participants read messages"
on public.messages
for select
to authenticated
using (exists (
  select 1 from public.conversations c
  where c.id = messages.conversation_id and (c.buyer_id = auth.uid() OR c.seller_id = auth.uid())
));

drop policy if exists "participants write messages" on public.messages;
create policy "participants write messages"
on public.messages
for insert
to authenticated
with check (exists (
  select 1 from public.conversations c
  where c.id = messages.conversation_id and (c.buyer_id = auth.uid() OR c.seller_id = auth.uid())
));

-- Block browser-side writes to certain tables (except through API)
revoke insert, update, delete on public.users    from anon, authenticated;
revoke insert, update, delete on public.sellers  from anon, authenticated;
revoke insert, update, delete on public.services from anon, authenticated;
revoke insert, update, delete on public.bookings from anon, authenticated;
revoke insert, update, delete on public.reviews  from anon, authenticated;