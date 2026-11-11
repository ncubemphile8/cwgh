# CWGH production launch checklist

This repository is a complete public-site and staff-platform foundation. It is not authorised for live staff, beneficiary or health information until the checklist below is completed.

## 1. Deploy the public website

1. Import `ncubemphile8/cwgh` into Vercel.
2. Framework preset: Next.js. Build command: `npm run build`.
3. Set `NEXT_PUBLIC_SITE_URL` to the final canonical domain.
4. Attach the CWGH domain only after DNS and ownership are confirmed by CWGH.
5. Enable HTTPS and verify redirects from the non-canonical hostname.
6. Verify every navigation route, external document link, social link, image and video on desktop and mobile.
7. Submit `/sitemap.xml` to Google Search Console and Bing Webmaster Tools.

## 2. Configure Supabase

1. Create a CWGH-owned Supabase project in an approved region and confirm the data residency implications.
2. Apply `supabase/migrations/202611110001_initial_cwgh_platform.sql`.
3. Add the project URL and anon key to Vercel environment variables.
4. Keep `SUPABASE_SERVICE_ROLE_KEY` server-only; never prefix it with `NEXT_PUBLIC_`.
5. Create private Storage buckets for staff-only files. Add object-level policies before enabling uploads.
6. Create staff profiles through a trusted administrative process. Do not allow public sign-up or self-assigned roles.
7. Enable MFA for privileged roles and enforce strong password/session policies.
8. Test row-level security using separate accounts for every role, including attempts to access another employee's records.

## 3. Role and approval model

- Executive Director: organisation-wide visibility, final approvals and governance reporting.
- Senior Management: cross-department oversight, management review and delegated approvals.
- Programme Manager: programme plans, assigned budgets, staff tasks and programme reports.
- Field Supervisor: assigned field teams, visit verification, report review and follow-up.
- Field Officer: own tasks, attendance/check-ins and field submissions.
- Communications: approved public stories, campaigns and media assets.
- Finance: restricted financial records and finance reports.
- Administrator: technical user and configuration administration; does not automatically receive beneficiary access.

Roles must be enforced in server-side actions and database policies. Hiding a button in the interface is not access control. CWGH must approve the final permission matrix.

## 4. Operational workflows to configure

- Tasks: assignment, priority, due dates, escalation, completion evidence and audit trail.
- Meetings: calendar invitations, agenda, attendance, minutes, actions and reminder schedule.
- Reports: templates, submission, supervisor review, return for correction, approval and export.
- Field visits: minimal data capture, optional GPS only where justified, offline-safe drafts, evidence consent, supervisor verification and follow-up.
- Documents: private storage, classification, versioning, approvals and retention.
- Notifications: in-app alerts plus approved email delivery; SMS or WhatsApp only after provider, consent and cost decisions.

## 5. Security, privacy and safeguarding

- Replace the demonstration login with individual Supabase Auth accounts.
- Remove the public demo password and any client-side credential checks before production.
- Review the SQL policies with a qualified Supabase/Postgres engineer; add a dedicated, audited role-provisioning function.
- Add rate limiting, secure headers, CSRF protections for any custom mutation endpoints, input validation and upload scanning.
- Establish backups, point-in-time recovery, restore drills, incident response and access review.
- Obtain CWGH legal review for Zimbabwe's applicable data protection requirements and any cross-border data processing.
- Approve privacy, retention, consent, child safeguarding and media-release procedures.
- Never place patient names, diagnoses, phone numbers, beneficiary IDs or sensitive GPS coordinates in public content or test fixtures.

## 6. Brand, content and accessibility sign-off

- Replace stock photography with CWGH-owned or licensed images and signed releases.
- Use the supplied campaign posters as approved campaign artwork; preserve their original message and brand marks.
- Confirm the Itai Rusike portrait, award copy, date and HealthTimes attribution with CWGH communications.
- Verify current office contacts, social handles, member organisations, partners, statistics and publication links.
- Provide alt text, keyboard access, visible focus states, reduced-motion support, readable contrast and captions/transcripts for video.
- Review all English copy and approve final Zimbabwe-specific terminology.

## 7. Automated delivery

GitHub Actions runs type checking and a Next.js production build on pushes and pull requests to main. Vercel can be connected to GitHub for preview deployments and production deployment after checks pass.

## Not yet connected

The repository intentionally does not contain live service credentials. Supabase, transactional email, map tiles, staff invitations, calendar integrations, real-time notifications and live records require CWGH-owned accounts and authorised configuration.
