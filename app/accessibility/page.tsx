import Link from "next/link";

export const metadata = {
  title: "Accessibility statement",
  description: "CWGH website accessibility commitments and ways to request accessible information."
};

export default function AccessibilityPage() {
  return (
    <main>
      <section className="inner-hero" style={{ backgroundImage: "linear-gradient(90deg, rgba(14,16,17,.9), rgba(14,16,17,.5)), url(https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=1800&q=85)" }}>
        <div className="container inner-hero-content">
          <span className="eyebrow eyebrow-light"><i /> ACCESS FOR EVERYONE</span>
          <h1>Accessibility matters.</h1>
          <p>We want CWGH information and services to be usable by people with different needs and technologies.</p>
          <div className="breadcrumb"><Link href="/">Home</Link><span>/</span><span>Accessibility</span></div>
        </div>
      </section>
      <section className="section">
        <div className="container legal-copy">
          <p className="article-lead">This statement describes the design goals for the redesigned CWGH website. A full accessibility audit is still required before the site can claim conformance with a formal standard.</p>
          <h2>Our approach</h2>
          <p>The interface is designed to support responsive layouts, keyboard focus visibility, semantic page structure, readable text and reduced-motion preferences. Images should have meaningful alternative text where they communicate information; decorative images should not create unnecessary screen-reader noise.</p>
          <h2>Video and documents</h2>
          <p>Campaign videos should include captions or transcripts. Downloadable reports should be provided in accessible formats wherever possible. Important information should not be communicated through colour or imagery alone.</p>
          <h2>Known limitations</h2>
          <p>Some external documents, embedded video players and third-party media may not meet the same accessibility standard as the website. The site requires testing with keyboard-only navigation, screen readers, zoom, high contrast and mobile assistive technologies.</p>
          <h2>Request information in another format</h2>
          <p>If you cannot access information on this website, contact the CWGH Secretariat at <a href="mailto:cwgh@mweb.co.zw">cwgh@mweb.co.zw</a> and describe the page or document and the format you need.</p>
          <p className="editorial-note">Draft statement · CWGH should nominate an accessibility contact and review this statement after an independent audit.</p>
        </div>
      </section>
    </main>
  );
}
