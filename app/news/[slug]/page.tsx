import Link from "next/link";
import { notFound } from "next/navigation";
import { HEALTH_CHAMPION_ARTICLE, NEWS } from "../../data";

export function generateStaticParams() {
  return NEWS.map((story) => ({ slug: story.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const story = NEWS.find((item) => item.slug === slug);
  return story ? { title: story.title, description: story.excerpt } : {};
}

export default async function NewsArticlePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const story = NEWS.find((item) => item.slug === slug);
  if (!story) notFound();

  const isAward = slug === "itai-rusike-health-champion-2026";
  const article = isAward ? HEALTH_CHAMPION_ARTICLE : null;

  return (
    <main>
      <section className="article-hero">
        <div className="container article-hero-inner">
          <div className="breadcrumb"><Link href="/">Home</Link><span>/</span><Link href="/news">Newsroom</Link><span>/</span><span>Story</span></div>
          <span className="eyebrow"><i />{story.category}</span>
          <h1>{story.title}</h1>
          <div className="article-meta"><span>{article?.author || story.source}</span><span>{story.date}</span></div>
        </div>
      </section>
      <article className="section article-section">
        <div className="container article-layout">
          <div className="article-main">
            <div className="article-cover"><img src={story.image} alt={isAward ? "Itai Rusike, Executive Director of CWGH" : story.title} /></div>
            {article ? (
              <>
                {article.paragraphs.map((paragraph, index) => <p className={index === 0 ? "article-lead" : ""} key={paragraph}>{paragraph}</p>)}
                <div className="article-source"><span>ORIGINAL COVERAGE</span><a href={article.sourceHref} target="_blank" rel="noreferrer">{article.sourceLabel} ↗</a></div>
              </>
            ) : (
              <>
                <p className="article-lead">{story.excerpt}</p>
                <p>This item is listed in CWGH's public updates and resources. Open the original source for the full document or announcement.</p>
                <div className="article-source"><span>ORIGINAL SOURCE</span><a href={story.href} target="_blank" rel="noreferrer">Open source material ↗</a></div>
              </>
            )}
            <div className="article-share">
              <Link className="text-link" href="/news">← Back to newsroom</Link>
              <span>Health is your right &amp; responsibility.</span>
            </div>
          </div>
          <aside className="article-aside">
            <div className="aside-card">
              <img src="https://www.cwgh.co.zw/wp-content/uploads/2016/02/cropped-cwghlogo.png" alt="CWGH logo" />
              <span className="eyebrow">ABOUT CWGH</span>
              <h3>People's health. Our priority.</h3>
              <p>A network working to enhance community participation in health in Zimbabwe.</p>
              <Link className="text-link" href="/about">Learn about CWGH ↗</Link>
            </div>
          </aside>
        </div>
      </article>
    </main>
  );
}