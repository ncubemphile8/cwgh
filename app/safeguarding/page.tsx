import Link from "next/link";

export const metadata = {
  title: "Safeguarding & responsible engagement",
  description: "CWGH safeguarding principles for community engagement, digital content and field information."
};

export default function SafeguardingPage() {
  return (
    <main>
      <section className="inner-hero" style={{ backgroundImage: "linear-gradient(90deg, rgba(14,16,17,.9), rgba(14,16,17,.5)), url(https://images.unsplash.com/photo-1551836022-d5d88e9218df?auto=format&fit=crop&w=1800&q=85)" }}>
        <div className="container inner-hero-content">
          <span className="eyebrow eyebrow-light"><i /> PEOPLE FIRST</span>
          <h1>Safeguarding & responsible engagement.</h1>
          <p>Digital communication and community work must protect dignity, safety and the rights of the people involved.</p>
          <div className="breadcrumb"><Link href="/">Home</Link><span>/</span><span>Safeguarding</span></div>
        </div>
      </section>
      <section className="section">
        <div className="container legal-copy">
          <p className="article-lead">This is a proposed public-facing framework and must be checked against CWGH's formally approved safeguarding policies before publication.</p>
          <h2>Respect, dignity and informed consent</h2>
          <p>Use photographs, video, quotations and personal stories only where CWGH has the necessary permissions and has explained the intended use. Participation in a health activity must never be conditional on agreeing to publicity.</p>
          <h2>Children and people at heightened risk</h2>
          <p>Do not publish identifying details, precise locations or images that could expose a child or vulnerable person to harm. Obtain the required guardian consent and the child's age-appropriate assent where applicable, and follow CWGH's approved child safeguarding procedures.</p>
          <h2>Health and beneficiary information</h2>
          <p>Do not publish patient records, diagnoses, contact details, case histories or other sensitive information without a verified legal basis, informed consent where required and a documented safeguarding assessment. Use anonymised, aggregated information wherever possible.</p>
          <h2>Field reporting</h2>
          <p>Field officers should collect only information necessary for an approved programme purpose. GPS coordinates, photographs and community records must have defined access, retention and deletion rules. Never record a person's exact location or sensitive details merely because a device makes it possible.</p>
          <h2>Raising a concern</h2>
          <p>Use CWGH's established safeguarding and incident-reporting channels. The public website must not imply that an unmonitored web form is an emergency or confidential reporting service.</p>
          <p className="editorial-note">Draft for safeguarding lead and management approval before launch.</p>
        </div>
      </section>
    </main>
  );
}
