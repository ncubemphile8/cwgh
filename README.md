# CWGH Digital Platform

A premium public website and staff-portal prototype for the Community Working Group on Health (CWGH), Zimbabwe.

## Stack

- Next.js App Router
- React and TypeScript
- Custom responsive CSS design system
- CSS motion and Intersection Observer reveal effects
- Public content pages and a clearly labelled staff-portal demonstration

## Run locally

1. Install Node.js 20 or later.
2. Run npm install.
3. Run npm run dev.
4. Open http://localhost:3000.

For a production build, run npm run build and then npm start.

## Routes

- / — public homepage
- /about
- /programmes
- /advocacy
- /impact
- /news
- /resources
- /partners
- /get-involved
- /contact
- /news/itai-rusike-health-champion-2026
- /portal — staff sign-in demonstration
- /portal/dashboard — staff dashboard demonstration

## Staff portal demonstration

The requested temporary demonstration credentials are:

- Username: cwgh
- Password: cwgh2026

These credentials are deliberately only a front-end preview. They are not secure authentication and must not be used for a live staff system. Before production, connect a managed authentication service (for example Supabase Auth), individual staff accounts, role-based authorization enforced server-side, audit logging, secure file storage and a PostgreSQL database. Do not put production credentials in client-side code.

The dashboard currently uses sample records to demonstrate workflow and layout; it does not store or transmit real employee, beneficiary, financial or field data.

## Video and imagery

The hero uses the CWGH Universal Health Coverage community video embedded from the organisation's existing website video library. It is muted and inline so autoplay can work in browsers that permit it. A poster image remains underneath as a graceful fallback.

The CWGH logo and the Executive Director image are referenced from the organisation's existing public website. Some supporting documentary imagery uses the Unsplash image CDN. Replace or supplement these with CWGH-approved original photography and video before public launch. Do not publish identifiable beneficiaries or staff without the appropriate consent.

## Content verification notes

The public copy uses CWGH's published material and the content supplied for this project. Figures in the 2025 CWGH in Brief are represented as 31 member organisations, presence in all 10 provinces and a geographic presence in 35 districts. Earlier pages contain older figures; the 2025 brief is treated as the more recent reference.

The supplied Harare water campaign graphic cites 84% of tested water points as unsafe. The number is not used as a headline website statistic until CWGH supplies the underlying sampling report, date, locations and methodology.

Contact information and social handles are carried over from CWGH's public materials and the supplied campaign artwork. CWGH should confirm that they remain current before launch.

## Deployment

The repository is structured for Vercel's standard Next.js deployment. Connect ncubemphile8/cwgh to a Vercel project and use the default build command npm run build. No environment variables are required for the public sample or demo login. Production staff authentication and data storage will require secure environment variables and backend configuration.

## Research references

- Official CWGH website: https://www.cwgh.co.zw/
- CWGH vision, mission and values: https://www.cwgh.co.zw/about-cwgh/vision-mission-values/
- CWGH history: https://www.cwgh.co.zw/about-cwgh/our-history/
- CWGH executive members: https://www.cwgh.co.zw/about-cwgh/the-executive-members/
- CWGH programmes: https://www.cwgh.co.zw/cwgh/programmes/
- CWGH in Brief (2025): https://www.cwgh.co.zw/wp-content/uploads/2025/09/CWGH-in-Brief_web.pdf
- CWGH contact page: https://www.cwgh.co.zw/contact-us/
- HealthTimes, Zimbabwe's Top 10 Health Champions for 2026: https://healthtimes.co.zw/zimbabwe-top-10-health-champions-2026/
- CWGH 2025 annual report: https://drive.google.com/file/d/1zs4ONsrwX-DPrkE0R4s-Cnucwy_9jqSr/view?usp=sharing
- CWGH 2027 National Health Budget position paper: https://docs.google.com/document/d/12lU5VAWW6DqLHumYFNGtS1BZ-0qSnW0C/edit?usp=sharing


## Recent social-channel material included

The newsroom and programme content also incorporates public posts from CWGH's LinkedIn activity:
- SRHR awareness campaign in Vic Range, Masvingo, including youth access to MNCH information, menstrual hygiene support, family planning, HIV testing and mental health support: https://www.linkedin.com/posts/community-working-group-on-health_srhr-youthhealth-healthequity-activity-7496126048905043968-nEGp
- Community governance learning from a GIZ-supported Health Centre Committee programme in 18 facilities across Bubi and Mhondoro-Ngezi: https://www.linkedin.com/posts/community-working-group-on-health_cwgh-programmes-officer-mandy-mathias-presenting-activity-7435305362678992896-HM86
- 4th Annual Reproductive Justice Litigation Baraza 2026 recap: https://www.linkedin.com/posts/community-working-group-on-health_reproductivejusticelitigationbaraza2026-srhr-activity-7498691957586661378-DbgQ
- 2027 health budget and domestic resource mobilisation update: https://www.linkedin.com/posts/community-working-group-on-health_2027healthbudget-healthfinancing-domesticresourcemobilisation-activity-7503004773072400384-HLK1

These are linked to their original LinkedIn posts so users can read the full updates and view CWGH's original media.

## Important

This is a high-fidelity platform prototype and implementation foundation, not a production-ready internal information system. Complete security, privacy, access-control, backup, records-retention and safeguarding reviews before collecting real staff or community data.
