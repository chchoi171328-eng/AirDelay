-- 온라인 사건 접수 저장소 (선택 — 메일 알림과 별개로 접수 내용을 남기고 싶을 때)
-- Supabase 대시보드 > SQL Editor에서 한 번 실행하세요.

create table if not exists public.intakes (
  id uuid primary key default gen_random_uuid(),
  created_at timestamptz not null default now(),
  status text not null default 'received' check (status in ('received')),
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
  consent_version text not null,           -- 동의한 개인정보처리방침 시행일
  consented_at timestamptz not null,
  firm_notified_at timestamptz                -- 법인 알림 메일을 보낸 시각
);

create index if not exists intakes_created_at_idx on public.intakes (created_at desc);

-- 정책을 만들지 않으므로 공개(anon) 키로는 읽기·쓰기가 모두 막히고, 서버(service role)만 접근합니다.
alter table public.intakes enable row level security;
