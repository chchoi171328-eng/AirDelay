-- 온라인 사건 접수 저장소
-- Supabase 대시보드 > SQL Editor에서 한 번 실행하세요.

create table if not exists public.intakes (
  id uuid primary key default gen_random_uuid(),
  created_at timestamptz not null default now(),
  -- awaiting_files: 첨부파일 업로드 중 / received: 접수 완료
  status text not null default 'received' check (status in ('awaiting_files', 'received')),
  airline text not null,
  flight_no text,
  origin text not null,
  destination text not null,
  flight_date date not null,
  incident_type text not null check (incident_type in ('delay', 'cancel')),
  delay_range text,
  name text not null,
  phone text not null,
  email text not null,
  detail text,
  files jsonb not null default '[]'::jsonb, -- [{ path, name, size }]
  consent_version text not null,           -- 동의한 개인정보처리방침 시행일
  consented_at timestamptz not null,
  firm_notified_at timestamptz,
  client_notified_at timestamptz
);

create index if not exists intakes_created_at_idx on public.intakes (created_at desc);

-- 정책을 만들지 않으므로 공개(anon) 키로는 읽기·쓰기가 모두 막히고, 서버(service role)만 접근합니다.
alter table public.intakes enable row level security;

-- 첨부파일 비공개 버킷: 파일당 10MB, PDF·이미지만 허용
insert into storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
values (
  'intake-files', 'intake-files', false, 10485760,
  array['application/pdf', 'image/jpeg', 'image/png', 'image/heic']
)
on conflict (id) do nothing;
