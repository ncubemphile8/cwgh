-- Harden profile self-service and remove recursive profile policy lookups.
create or replace function public.current_cwgh_department()
returns uuid
language sql stable security definer
set search_path = public
as $$
  select department_id from public.profiles
  where id = auth.uid() and is_active = true
$$;

drop policy if exists "Staff can view permitted profiles" on public.profiles;
create policy "Staff can view permitted profiles" on public.profiles
for select to authenticated using (
  id = auth.uid()
  or public.is_cwgh_management()
  or supervisor_id = auth.uid()
  or (department_id is not null and department_id = public.current_cwgh_department())
);

-- Prevent a normal staff member from promoting themselves, changing their
-- department/supervisor, disabling their account, or changing their work email.
create or replace function public.protect_profile_privileges()
returns trigger
language plpgsql security definer
set search_path = public
as $$
begin
  if auth.uid() is not null
     and auth.uid() = old.id
     and not public.is_cwgh_management()
     and (
       new.role is distinct from old.role
       or new.department_id is distinct from old.department_id
       or new.supervisor_id is distinct from old.supervisor_id
       or new.is_active is distinct from old.is_active
       or new.work_email is distinct from old.work_email
     ) then
    raise exception 'Only authorised CWGH management can change protected staff profile fields';
  end if;
  return new;
end;
$$;

drop trigger if exists protect_profile_privileges_trigger on public.profiles;
create trigger protect_profile_privileges_trigger
before update on public.profiles
for each row execute function public.protect_profile_privileges();

-- Restrict direct public execution of helper functions; authenticated users
-- need execute permission for row-level-security policies.
revoke all on function public.current_cwgh_department() from public;
revoke all on function public.protect_profile_privileges() from public;
grant execute on function public.current_cwgh_department() to authenticated;
