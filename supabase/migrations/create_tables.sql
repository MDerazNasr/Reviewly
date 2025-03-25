-- Create the companies table
create table public.companies (
    id uuid default gen_random_uuid() primary key,
    name text not null,
    description text not null default '',
    logo_url text,
    address text not null,
    membership_type text not null check (membership_type in ('free', 'basic', 'premium', 'enterprise')),
    keywords text[] not null default '{}',
    google_review_link text not null,
    reviews_generated integer not null default 0,
    reviews_cost decimal(10,2) not null default 0.00,
    created_at timestamp with time zone default timezone('utc'::text, now()) not null,
    updated_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Create trigger to update updated_at timestamp
create or replace function update_updated_at_column()
returns trigger as $$
begin
    new.updated_at = now();
    return new;
end;
$$ language plpgsql;

create trigger update_companies_updated_at
    before update on companies
    for each row
    execute function update_updated_at_column();

-- Create the reviews table with company reference
create table public.reviews (
    id uuid default gen_random_uuid() primary key,
    company_id uuid not null references companies(id) on delete cascade,
    review_text text not null,
    keywords text[] not null,
    language text not null,
    cost decimal(10,2) not null default 0.10,  -- Default cost per review
    created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Create trigger to update company reviews count and cost
create or replace function update_company_review_stats()
returns trigger as $$
begin
    if TG_OP = 'INSERT' then
        update companies
        set reviews_generated = reviews_generated + 1,
            reviews_cost = reviews_cost + new.cost
        where id = new.company_id;
    elsif TG_OP = 'DELETE' then
        update companies
        set reviews_generated = reviews_generated - 1,
            reviews_cost = reviews_cost - old.cost
        where id = old.company_id;
    end if;
    return null;
end;
$$ language plpgsql;

create trigger update_company_stats
    after insert or delete on reviews
    for each row
    execute function update_company_review_stats();

-- Set up Row Level Security (RLS)
alter table public.companies enable row level security;
alter table public.reviews enable row level security;

-- Create policies that allow all operations (for now)
create policy "Allow all operations on companies" on public.companies
    for all
    using (true)
    with check (true);

create policy "Allow all operations on reviews" on public.reviews
    for all
    using (true)
    with check (true);

-- Create indexes
create index reviews_created_at_idx on public.reviews(created_at desc);
create index reviews_company_id_idx on public.reviews(company_id);
create index companies_name_idx on public.companies(name);

-- Create storage bucket for company logos
insert into storage.buckets (id, name, public) values ('company-logos', 'company-logos', true);

-- Create a storage policy to allow public access to logos
create policy "Public Access" on storage.objects for select using (bucket_id = 'company-logos');

-- Insert a sample company (Active Health Institute)
insert into public.companies (
    name,
    description,
    logo_url,
    address,
    membership_type,
    keywords,
    google_review_link,
    reviews_generated,
    reviews_cost
) values (
    'Active Health Institute',
    'Active Health Institute is a leading healthcare provider specializing in physiotherapy, chiropractic care, and holistic wellness services. Our team of experienced professionals is dedicated to helping patients achieve optimal health through personalized treatment plans and evidence-based care.',
    null,
    '1385 Woodroffe Ave Unit 103, Ottawa, ON K2G 1V8',
    'premium',
    ARRAY['professional', 'friendly', 'knowledgeable', 'effective', 'thorough', 'welcoming'],
    'https://www.google.com/maps/place/Active+Health+Institute/@45.4110979,-75.7236781,17z/data=!4m8!3m7!1s0x4cce043aea094a85:0x9d811f5333ffbd9f!8m2!3d45.4110979!4d-75.7214894!9m1!1b1!16s%2Fg%2F11bwl25z33?entry=ttu',
    0,
    0.00
); 