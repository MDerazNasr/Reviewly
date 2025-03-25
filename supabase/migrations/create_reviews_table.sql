-- Create the reviews table
create table public.reviews (
  id uuid default gen_random_uuid() primary key,
  review_text text not null,
  keywords text[] not null,
  language text not null,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Set up Row Level Security (RLS)
alter table public.reviews enable row level security;

-- Create a policy that allows all operations (for now)
create policy "Allow all operations" on public.reviews
  for all
  using (true)
  with check (true);

-- Create an index on created_at for faster sorting
create index reviews_created_at_idx on public.reviews(created_at desc); 