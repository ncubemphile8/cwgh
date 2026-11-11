create table public.attendance_records (
  id uuid primary key default gen_random_uuid(),
  staff_id uuid not null references public.profiles(id) on delete restrict,
  work_date date not null default current_date,
  check_in_at timestamptz,
  check_out_at timestamptz,
  check_in_method text not null default 'manual' check (check_in_method in ('manual','supervisor','approved_device')),
  check_in_note text,
  check_out_note text,
  work_location text,
  status text not null default 'pending' check (status in ('pending','approved','amended','flagged')),
  reviewed_by uuid references public.profiles(id) on delete set null,
  reviewed_at timestamptz,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  check (check_out_at is null or check_in_at is not null),
  check (check_out_at is null or check_out_at >= check_in_at),
  unique (staff_id, work_date)
);

create index attendance_staff_date_idx on public.attendance_records (staff_id, work_date desc);
alter table public.attendance_records enable row level security;

create policy "Staff view own attendance and supervisors view team" on public.attendance_records
for select to authenticated using (staff_id = auth.uid() or public.is_cwgh_supervisor());

create policy "Staff submit own attendance" on public.attendance_records
for insert to authenticated with check (staff_id = auth.uid());

create policy "Staff amend own pending attendance" on public.attendance_records
for update to authenticated using (staff_id = auth.uid() and status = 'pending')
with check (staff_id = auth.uid() and status = 'pending');

create policy "Supervisors review attendance" on public.attendance_records
for update to authenticated using (public.is_cwgh_supervisor())
with check (public.is_cwgh_supervisor());

-- Attendance edits and approvals should be written to audit_logs by the
-- trusted server action that performs the mutation.
