-- CWGH platform foundation
-- Apply with Supabase CLI: supabase db push
-- Review all roles, retention periods and safeguarding controls with CWGH before production use.

create extension if not exists pgcrypto;

create type public.cwgh_role as enum (
  'executive_director',
  'senior_management',
  'programme_manager',
  'field_supervisor',
  'field_officer',
  'communications',
  'finance',
  'administrator'
);

create type public.workflow_status as enum ('draft','submitted','in_review','approved','rejected','archived');
create type public.task_status as enum ('todo','in_progress','blocked','completed','cancelled');

create table public.departments (
  id uuid primary key default gen_random_uuid(),
  name text not null unique,
  description text,
  created_at timestamptz not null default now()
);

create table public.profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  full_name text not null,
  work_email text not null unique,
  job_title text,
  role public.cwgh_role not null default 'field_officer',
  department_id uuid references public.departments(id) on delete set null,
  supervisor_id uuid references public.profiles(id) on delete set null,
  phone text,
  is_active boolean not null default true,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table public.projects (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  code text unique,
  description text,
  department_id uuid references public.departments(id) on delete set null,
  project_lead uuid references public.profiles(id) on delete set null,
  start_date date,
  end_date date,
  status text not null default 'planning' check (status in ('planning','active','on_hold','completed','closed')),
  created_by uuid references public.profiles(id) on delete set null,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table public.tasks (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  description text,
  project_id uuid references public.projects(id) on delete set null,
  assigned_to uuid references public.profiles(id) on delete set null,
  assigned_by uuid references public.profiles(id) on delete set null,
  due_at timestamptz,
  priority text not null default 'normal' check (priority in ('low','normal','high','urgent')),
  status public.task_status not null default 'todo',
  completed_at timestamptz,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table public.meetings (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  agenda text,
  starts_at timestamptz not null,
  ends_at timestamptz not null,
  location text,
  meeting_url text,
  organiser_id uuid references public.profiles(id) on delete set null,
  reminder_minutes integer[] not null default array[1440,60],
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  check (ends_at > starts_at)
);

create table public.meeting_attendees (
  meeting_id uuid references public.meetings(id) on delete cascade,
  profile_id uuid references public.profiles(id) on delete cascade,
  attendance_status text not null default 'invited' check (attendance_status in ('invited','accepted','declined','attended','absent')),
  primary key (meeting_id, profile_id)
);

create table public.reports (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  report_type text not null check (report_type in ('field','programme','monthly','quarterly','management','incident','other')),
  project_id uuid references public.projects(id) on delete set null,
  author_id uuid not null references public.profiles(id) on delete restrict,
  reviewer_id uuid references public.profiles(id) on delete set null,
  reporting_period_start date,
  reporting_period_end date,
  body jsonb not null default '{}'::jsonb,
  status public.workflow_status not null default 'draft',
  reviewer_notes text,
  submitted_at timestamptz,
  reviewed_at timestamptz,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table public.field_visits (
  id uuid primary key default gen_random_uuid(),
  report_id uuid references public.reports(id) on delete set null,
  officer_id uuid not null references public.profiles(id) on delete restrict,
  project_id uuid references public.projects(id) on delete set null,
  visit_date date not null default current_date,
  district text,
  facility_or_community text,
  purpose text not null,
  observations text,
  follow_up_required boolean not null default false,
  follow_up_due date,
  latitude numeric(9,6),
  longitude numeric(9,6),
  location_accuracy_m numeric,
  sync_state text not null default 'synced' check (sync_state in ('draft','pending_sync','synced')),
  created_at timestamptz not null default now()
);

create table public.documents (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  description text,
  storage_path text not null,
  visibility text not null default 'staff' check (visibility in ('public','staff','management','restricted')),
  category text,
  uploaded_by uuid references public.profiles(id) on delete set null,
  approved_by uuid references public.profiles(id) on delete set null,
  approved_at timestamptz,
  created_at timestamptz not null default now()
);

create table public.attendance_records (
  id uuid primary key default gen_random_uuid(),
  profile_id uuid not null references public.profiles(id) on delete restrict,
  work_date date not null default current_date,
  check_in_at timestamptz,
  check_out_at timestamptz,
  status text not null default 'present' check (status in ('present','late','absent','leave','off_site')),
  note text,
  recorded_by uuid references public.profiles(id) on delete set null,
  reviewed_by uuid references public.profiles(id) on delete set null,
  reviewed_at timestamptz,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  unique (profile_id, work_date),
  check (check_out_at is null or check_in_at is not null),
  check (check_out_at is null or check_out_at >= check_in_at)
);

create table public.notifications (
  id uuid primary key default gen_random_uuid(),
  recipient_id uuid not null references public.profiles(id) on delete cascade,
  title text not null,
  message text not null,
  href text,
  read_at timestamptz,
  scheduled_for timestamptz,
  sent_at timestamptz,
  created_at timestamptz not null default now()
);

create table public.audit_logs (
  id bigint generated always as identity primary key,
  actor_id uuid references public.profiles(id) on delete set null,
  action text not null,
  entity_type text not null,
  entity_id text,
  metadata jsonb not null default '{}'::jsonb,
  created_at timestamptz not null default now()
);

create index tasks_assigned_due_idx on public.tasks (assigned_to, due_at);
create index meetings_start_idx on public.meetings (starts_at);
create index reports_author_status_idx on public.reports (author_id, status);
create index field_visits_officer_date_idx on public.field_visits (officer_id, visit_date desc);
create index notifications_recipient_schedule_idx on public.notifications (recipient_id, scheduled_for);
create index attendance_profile_date_idx on public.attendance_records (profile_id, work_date desc);
create index audit_logs_created_idx on public.audit_logs (created_at desc);

create or replace function public.current_cwgh_role()
returns public.cwgh_role
language sql stable security definer
set search_path = public
as $$
  select role from public.profiles
  where id = auth.uid() and is_active = true
$$;

create or replace function public.is_cwgh_management()
returns boolean
language sql stable security definer
set search_path = public
as $$
  select exists (
    select 1 from public.profiles
    where id = auth.uid()
      and is_active = true
      and role in ('executive_director','senior_management','administrator')
  )
$$;

create or replace function public.is_cwgh_supervisor()
returns boolean
language sql stable security definer
set search_path = public
as $$
  select exists (
    select 1 from public.profiles
    where id = auth.uid()
      and is_active = true
      and role in ('executive_director','senior_management','programme_manager','field_supervisor','administrator')
  )
$$;

alter table public.departments enable row level security;
alter table public.profiles enable row level security;
alter table public.projects enable row level security;
alter table public.tasks enable row level security;
alter table public.meetings enable row level security;
alter table public.meeting_attendees enable row level security;
alter table public.reports enable row level security;
alter table public.field_visits enable row level security;
alter table public.documents enable row level security;
alter table public.notifications enable row level security;
alter table public.attendance_records enable row level security;
alter table public.audit_logs enable row level security;

create policy "Active staff can view departments" on public.departments
for select to authenticated using (public.current_cwgh_role() is not null);
create policy "Management manages departments" on public.departments
for all to authenticated using (public.is_cwgh_management()) with check (public.is_cwgh_management());

create policy "Staff can view permitted profiles" on public.profiles
for select to authenticated using (
  id = auth.uid() or public.is_cwgh_management()
  or supervisor_id = auth.uid()
  or exists (select 1 from public.profiles p where p.id = auth.uid() and p.department_id = profiles.department_id and p.is_active)
);
-- Staff may edit contact/profile details only; role, department, supervisor,
-- employment status and work email remain controlled by authorised management.
create policy "Staff can update own basic profile" on public.profiles
for update to authenticated
using (id = auth.uid())
with check (
  id = auth.uid()
  and role = (select p.role from public.profiles p where p.id = auth.uid())
  and department_id is not distinct from (select p.department_id from public.profiles p where p.id = auth.uid())
  and supervisor_id is not distinct from (select p.supervisor_id from public.profiles p where p.id = auth.uid())
  and is_active = (select p.is_active from public.profiles p where p.id = auth.uid())
  and work_email = (select p.work_email from public.profiles p where p.id = auth.uid())
);
create policy "Management manages profiles" on public.profiles
for all to authenticated using (public.is_cwgh_management()) with check (public.is_cwgh_management());

create policy "Staff can view active projects" on public.projects
for select to authenticated using (public.current_cwgh_role() is not null);
create policy "Managers manage projects" on public.projects
for all to authenticated using (public.is_cwgh_supervisor()) with check (public.is_cwgh_supervisor());

create policy "Staff view assigned tasks" on public.tasks
for select to authenticated using (
  assigned_to = auth.uid() or assigned_by = auth.uid() or public.is_cwgh_supervisor()
);
create policy "Staff update assigned task progress" on public.tasks
for update to authenticated using (assigned_to = auth.uid() or public.is_cwgh_supervisor())
with check (assigned_to = auth.uid() or public.is_cwgh_supervisor());
create policy "Supervisors create tasks" on public.tasks
for insert to authenticated with check (public.is_cwgh_supervisor());
create policy "Management deletes tasks" on public.tasks
for delete to authenticated using (public.is_cwgh_management());

create policy "Staff view meetings they attend" on public.meetings
for select to authenticated using (
  organiser_id = auth.uid() or public.is_cwgh_supervisor()
  or exists (select 1 from public.meeting_attendees a where a.meeting_id = meetings.id and a.profile_id = auth.uid())
);
create policy "Supervisors manage meetings" on public.meetings
for all to authenticated using (public.is_cwgh_supervisor()) with check (public.is_cwgh_supervisor());
create policy "Attendees view own invitations" on public.meeting_attendees
for select to authenticated using (profile_id = auth.uid() or public.is_cwgh_supervisor());
create policy "Supervisors manage attendees" on public.meeting_attendees
for all to authenticated using (public.is_cwgh_supervisor()) with check (public.is_cwgh_supervisor());

create policy "Authors and supervisors view reports" on public.reports
for select to authenticated using (author_id = auth.uid() or reviewer_id = auth.uid() or public.is_cwgh_supervisor());
create policy "Staff create own reports" on public.reports
for insert to authenticated with check (author_id = auth.uid());
create policy "Authors edit drafts and supervisors review" on public.reports
for update to authenticated using (
  (author_id = auth.uid() and status in ('draft','rejected'))
  or public.is_cwgh_supervisor()
) with check (
  (author_id = auth.uid() and status in ('draft','submitted','rejected'))
  or public.is_cwgh_supervisor()
);

create policy "Officers and supervisors view field visits" on public.field_visits
for select to authenticated using (officer_id = auth.uid() or public.is_cwgh_supervisor());
create policy "Officers create own field visits" on public.field_visits
for insert to authenticated with check (officer_id = auth.uid());
create policy "Officers edit own pending field visits" on public.field_visits
for update to authenticated using (officer_id = auth.uid() and sync_state in ('draft','pending_sync'))
with check (officer_id = auth.uid() and sync_state in ('draft','pending_sync'));
create policy "Supervisors review field visits" on public.field_visits
for update to authenticated using (public.is_cwgh_supervisor()) with check (public.is_cwgh_supervisor());

create policy "Document visibility is role controlled" on public.documents
for select to authenticated using (
  visibility = 'staff'
  or (visibility = 'management' and public.is_cwgh_management())
  or (visibility = 'restricted' and public.is_cwgh_management())
  or visibility = 'public'
);
create policy "Supervisors upload documents" on public.documents
for insert to authenticated with check (public.is_cwgh_supervisor() and uploaded_by = auth.uid());
create policy "Management manages documents" on public.documents
for all to authenticated using (public.is_cwgh_management()) with check (public.is_cwgh_management());

create policy "Staff view own notifications" on public.notifications
for select to authenticated using (recipient_id = auth.uid());
create policy "Staff mark own notifications read" on public.notifications
for update to authenticated using (recipient_id = auth.uid()) with check (recipient_id = auth.uid());
create policy "Management creates notifications" on public.notifications
for insert to authenticated with check (public.is_cwgh_management());

create policy "Staff view own attendance and supervisors view team attendance" on public.attendance_records
for select to authenticated using (profile_id = auth.uid() or public.is_cwgh_supervisor());
create policy "Staff submit own attendance" on public.attendance_records
for insert to authenticated with check (profile_id = auth.uid() and recorded_by = auth.uid());
create policy "Staff correct own unreviewed attendance" on public.attendance_records
for update to authenticated
using (profile_id = auth.uid() and reviewed_at is null)
with check (profile_id = auth.uid() and reviewed_at is null and recorded_by = auth.uid());
create policy "Supervisors review team attendance" on public.attendance_records
for update to authenticated using (public.is_cwgh_supervisor())
with check (public.is_cwgh_supervisor());

create policy "Management views audit logs" on public.audit_logs
for select to authenticated using (public.is_cwgh_management());
create policy "Authenticated users write own audit events" on public.audit_logs
for insert to authenticated with check (actor_id = auth.uid());

-- Important production hardening:
-- 1. Restrict profile role changes to a trusted server-side admin function.
-- 2. Add Storage bucket policies before allowing file uploads.
-- 3. Add scheduled notification delivery (Edge Function + provider) and meeting email reminders.
-- 4. Add approved retention, consent, safeguarding and breach-response policies.
-- 5. Never expose the Supabase service-role key in browser code.
