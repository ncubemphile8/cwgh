import Link from "next/link";

export default function NotFound() {
  return (
    <main className="not-found-page">
      <div className="container">
        <span className="eyebrow"><i /> PAGE NOT FOUND</span>
        <h1>We couldn't find<br /><em>that page.</em></h1>
        <p>The page may have moved. Head back to the CWGH homepage or explore our work.</p>
        <div className="hero-actions">
          <Link className="button button-orange" href="/">Return home ↗</Link>
          <Link className="button button-dark" href="/programmes">Explore programmes</Link>
        </div>
      </div>
    </main>
  );
}
