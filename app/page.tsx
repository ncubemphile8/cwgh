import Link from "next/link";
import { CAMPAIGNS, HERO_VIDEO_ID, ITAI_PORTRAIT, NEWS, PROGRAMMES, STATS } from "./data";
import { ScrollReveal, SectionHeading } from "./components/site";

const heroPoster = "https://i.ytimg.com/vi/" + HERO_VIDEO_ID + "/maxresdefault.jpg";

export default function HomePage() {
  return (
    <main>
      <section className="hero hero-home">
        <div className="hero-media" style={{ backgroundImage: "url(" + heroPoster + ")" }}>
          <iframe
            src={"https://www.youtube.com/embed/" + HERO_VIDEO_ID + "?autoplay=1&mute=1&controls=0&loop=1&playlist=" + HERO_VIDEO_ID + "&modestbranding=1&playsinline=1&rel=0"}
            title="CWGH community health video"
            allow="autoplay; encrypted-media; picture-in-picture"
            referrerPolicy="strict-origin-when-cross-origin"
          />
        </div>
        <div className="hero-shade" />
        <div className="hero-grain" />
        <div className="container hero-content">
          <div className="hero-kicker"><span className="pulse-dot" /> Community-led health advocacy in Zimbabwe</div>
          <h1>Health is a right.<br /><em>Community is the catalyst.</em></h1>
          <p>Working together for health rights, equitable services and stronger, more accountable health systems.</p>
          <div className="hero-actions">
            <Link className="button button-orange" href="/programmes">Explore our work <span>↗</span></Link>
            <a className="button button-glass" href={"https://www.youtube.com/watch?v=" + HERO_VIDEO_ID} target="_blank" rel="noreferrer"><span className="play-icon">▶</span> Watch CWGH in action</a>
          </div>
          <div className="hero-footnote">
            <span>01 — 04</span>
            <span>PEOPLE'S HEALTH. OUR PRIORITY.</span>
            <span>SCROLL TO EXPLORE ↓</span>
          </div>
        </div>
        <div className="hero-orange-orb" />
      </section>

      <div className="statement-strip">
        <div className="container statement-inner">
          <span>HEALTH IS YOUR RIGHT</span><i /> <span>HEALTH IS YOUR RESPONSIBILITY</span><i /> <span>PEOPLE'S HEALTH. OUR PRIORITY.</span>
        </div>
      </div>

      <section className="section stats-section">
        <div className="container stats-grid">
          {STATS.map((stat, index) => (
            <ScrollReveal key={stat.label} className="stat-item">
              <div className="stat-value">{stat.value}{stat.suffix ? <small>{stat.suffix}</small> : null}</div>
              <div className="stat-label">{stat.label}</div>
              <span className="stat-index">0{index + 1}</span>
            </ScrollReveal>
          ))}
        </div>
        <div className="container stat-note">Organisational reach figures are drawn from the CWGH in Brief (2025).</div>
      </section>

      <section className="section about-preview">
        <div className="container split-layout">
          <ScrollReveal className="about-image-wrap">
            <div className="image-frame">
              <img src="https://www.cwgh.co.zw/wp-content/uploads/2025/05/WhatsApp-Image-2025-05-08-at-16.32.54-1-e1746715441612.jpeg" alt="Community engagement and health advocacy activity" />
              <div className="image-stamp"><strong>1998</strong><span>Building community voice<br />in health since</span></div>
            </div>
          </ScrollReveal>
          <ScrollReveal className="about-copy">
            <span className="eyebrow"><i /> WHO WE ARE</span>
            <h2>Health systems work better when <em>people have a voice.</em></h2>
            <p className="lead">CWGH is a national network of civil society and community organisations working collectively to enhance community participation in health in Zimbabwe.</p>
            <p>Since 1998, the network has brought community experience into health discussions — supporting local structures, raising concerns with service providers and shaping collective positions on policy.</p>
            <Link className="text-link" href="/about">Discover the CWGH story <span>↗</span></Link>
          </ScrollReveal>
        </div>
      </section>

      <section className="section programmes-section section-soft">
        <div className="container">
          <SectionHeading
            eyebrow="Where we focus"
            title="Turning community voice into meaningful action."
            body="Across health rights, service accountability and policy, CWGH works to make community participation part of how health systems are shaped."
          />
          <div className="programme-grid">
            {PROGRAMMES.slice(0, 3).map((item) => (
              <ScrollReveal key={item.number} className="programme-card">
                <div className="programme-image"><img src={item.image} alt="" loading="lazy" /><span>{item.number}</span></div>
                <div className="programme-content">
                  <span className="card-tag">{item.tag}</span>
                  <h3>{item.title}</h3>
                  <p>{item.short}</p>
                  <Link className="card-arrow" href="/programmes" aria-label={"Explore " + item.title}>Explore programme <span>↗</span></Link>
                </div>
              </ScrollReveal>
            ))}
          </div>
          <div className="center-action"><Link className="button button-dark" href="/programmes">View all programmes <span>↗</span></Link></div>
        </div>
      </section>

      <section className="section feature-story-section">
        <div className="container feature-story">
          <ScrollReveal className="feature-story-image">
            <img src={ITAI_PORTRAIT} alt="Itai Rusike, Executive Director of the Community Working Group on Health" loading="lazy" />
            <span className="image-caption">LEADERSHIP &amp; RECOGNITION · 10 NOVEMBER 2026</span>
          </ScrollReveal>
          <ScrollReveal className="feature-story-copy">
            <span className="eyebrow"><i /> IN THE NEWS</span>
            <div className="award-mark">2026 <span>HEALTHTIMES<br />HEALTH CHAMPIONS</span></div>
            <h2>CWGH Executive Director recognised among Zimbabwe's leading health voices.</h2>
            <p>Itai Rusike has been named among the 2026 HealthTimes Health Champions for his longstanding advocacy for sustainable health financing, equitable healthcare and stronger health systems.</p>
            <Link className="text-link" href="/news/itai-rusike-health-champion-2026">Read the full story <span>↗</span></Link>
          </ScrollReveal>
        </div>
      </section>

      <section className="section campaign-section section-dark">
        <div className="container">
          <SectionHeading
            eyebrow="Community campaigns"
            title="Information that moves people to action."
            body="From prevention and early detection to safer environments, CWGH's public health messages bring essential information closer to communities."
            dark
          />
          <div className="campaign-grid">
            {CAMPAIGNS.slice(0, 4).map((campaign, index) => (
              <ScrollReveal key={campaign.title} className="campaign-card">
                <Link href="/advocacy" className="campaign-link">
                  <div className="campaign-image"><img src={campaign.image} alt="" loading="lazy" /><span className={"campaign-dot " + campaign.color} /></div>
                  <div className="campaign-meta"><span>{campaign.category}</span><span>{campaign.date}</span></div>
                  <h3>{campaign.title}</h3>
                  <p>{campaign.description}</p>
                  <span className="campaign-more">Explore campaign <b>↗</b></span>
                </Link>
              </ScrollReveal>
            ))}
          </div>
          <div className="center-action"><Link className="button button-outline-light" href="/advocacy">Explore advocacy &amp; campaigns <span>↗</span></Link></div>
        </div>
      </section>

      <section className="section budget-section">
        <div className="container budget-panel">
          <div className="budget-mark">2027<br /><span>HEALTH<br />BUDGET</span></div>
          <div className="budget-copy">
            <span className="eyebrow"><i /> POLICY &amp; PUBLIC FINANCE</span>
            <h2>Invest in health.<br /><em>Build a stronger Zimbabwe.</em></h2>
            <p>CWGH is calling for a national health budget that responds to the real needs of communities — from essential medicines and supported health workers to stronger facilities and equitable services.</p>
            <Link className="button button-orange" href="/news/2027-national-health-budget">Explore the position paper <span>↗</span></Link>
          </div>
          <div className="budget-image"><img src="https://images.unsplash.com/photo-1584515933487-779824d29309?auto=format&fit=crop&w=1000&q=85" alt="Health worker caring for a family" loading="lazy" /></div>
        </div>
      </section>

      <section className="section news-section section-soft">
        <div className="container">
          <div className="section-heading-row">
            <SectionHeading eyebrow="The newsroom" title="Stories, ideas and updates." body="Stay close to the work, the people and the conversations shaping health in Zimbabwe." />
            <Link className="text-link desktop-link" href="/news">Visit the newsroom <span>↗</span></Link>
          </div>
          <div className="news-grid">
            {NEWS.slice(0, 3).map((item, index) => (
              <ScrollReveal key={item.slug} className={"news-card " + (index === 0 ? "news-card-feature" : "")}>
                <Link href={item.slug === "itai-rusike-health-champion-2026" ? "/news/" + item.slug : "/news"} className="news-card-link">
                  <div className="news-image"><img src={item.image} alt="" loading="lazy" /></div>
                  <div className="news-info"><span>{item.category}</span><small>{item.date}</small></div>
                  <h3>{item.title}</h3>
                  <p>{item.excerpt}</p>
                  <span className="card-arrow">Read story <b>↗</b></span>
                </Link>
              </ScrollReveal>
            ))}
          </div>
          <div className="mobile-action"><Link className="button button-dark" href="/news">Visit the newsroom <span>↗</span></Link></div>
        </div>
      </section>

      <section className="section join-section">
        <div className="container join-panel">
          <div>
            <span className="eyebrow"><i /> BE PART OF THE CHANGE</span>
            <h2>Stronger communities.<br /><em>Better health.</em></h2>
          </div>
          <div className="join-copy">
            <p>Community participation is how health systems become more responsive, inclusive and accountable. Connect with CWGH and help make people's voices count.</p>
            <Link className="button button-white" href="/get-involved">Get involved <span>↗</span></Link>
          </div>
          <div className="join-watermark">CWGH</div>
        </div>
      </section>
    </main>
  );
}
