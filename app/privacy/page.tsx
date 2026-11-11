import Link from "next/link";

export const metadata = {
  title: "Privacy & data protection",
  description: "How CWGH should handle personal information on its public website and staff platform."
};

export default function PrivacyPage() {
  return (
    <main>
      <section className="inner-hero" style={{ backgroundImage: "linear-gradient(90deg, rgba(14,16,17,.9), rgba(14,16,17,.5)), url(https://images.unsplash.com/photo-1450101499163-c8848c66ca85?auto=format&fit=crop&w=1800&q=85)" }}>
        <div className="container inner-hero-content">
          <span className="eyebrow eyebrow-light"><i /> TRUST & ACCOUNTABILITY</span>
          <h1>Privacy & data protection.</h1>
          <p>Respecting the people and communities whose information may be entrusted to CWGH.</p>
          <div className="breadcrumb"><Link href="/">Home</Link><span>/</span><span>Privacy</span></div>
        </div>
      </section>
      <section className="section">
        <div className="container legal-copy">
          <p className="article-lead">This page is a draft framework for CWGH review. It is not a substitute for a legal assessment or an approved organisational privacy notice.</p>
          <h2>Information on the public website</h2>
          <p>The current website prototype is primarily informational. It does not provide a public account-registration flow or intentionally collect health records. If contact forms, analytics, mailing lists or other data collection are enabled, CWGH must publish the exact purposes, lawful basis, recipients, retention period and contact for privacy requests before launch.</p>
          <h2>Staff workspace and operational records</h2>
          <p>The staff workspace currently uses demonstration data only. Before live use, access must be limited to authorised staff, with individual accounts, role-based permissions, secure transport, encrypted storage, backups, audit trails and a documented retention schedule.</p>
          <h2>Community and health information</h2>
          <p>Do not submit patient-identifiable information, beneficiary case histories, sensitive health information, photographs of children or identifiable community members through a demonstration system. Any future collection must have an approved purpose, appropriate consent or other lawful basis, strict access controls and safeguarding review.</p>
          <h2>Cookies and analytics</h2>
          <p>The current prototype does not include third-party advertising or analytics tracking. Hosting providers may process technical logs for security and service operation. CWGH should update this notice if analytics, embedded media, maps or other third-party services are enabled.</p>
          <h2>Your questions and requests</h2>
          <p>For privacy enquiries, contact the CWGH Secretariat at <a href="mailto:cwgh@mweb.co.zw">cwgh@mweb.co.zw</a>. CWGH should confirm and publish a designated privacy contact before collecting personal information.</p>
          <p className="editorial-note">Draft for organisational review · Last prepared 11 November 2026.</p>
        </div>
      </section>
    </main>
  );
}
