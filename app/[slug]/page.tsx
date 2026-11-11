import Link from "next/link";
import { notFound } from "next/navigation";
import { CAMPAIGNS, CONTACT, NEWS, PAGES, PROGRAMMES, RESOURCES, STATS } from "../data";
import { ScrollReveal, SectionHeading } from "../components/site";

export function generateStaticParams() {
  return Object.keys(PAGES).map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const page = PAGES[slug];
  if (!page) return {};
  return { title: page.kicker + " — " + page.title, description: page.intro };
}

export default async function ContentPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const page = PAGES[slug];
  if (!page) notFound();

  return (
    <main>
      <section className="inner-hero" style={{ backgroundImage: "linear-gradient(90deg, rgba(14,16,17,.88), rgba(14,16,17,.32)), url(" + page.image + ")" }}>
        <div className="container inner-hero-content">
          <span className="eyebrow eyebrow-light"><i />{page.kicker}</span>
          <h1>{page.title}</h1>
          <p>{page.intro}</p>
          <div className="breadcrumb"><Link href="/">Home</Link><span>/</span><span>{page.kicker}</span></div>
        </div>
      </section>

      {slug === "programmes" ? (
        <section className="section">
          <div className="container">
            <SectionHeading eyebrow="Our programme areas" title="Community participation, in practice." body="The following programme headings reflect CWGH's published programme areas. Project activities and current implementation locations can be updated by the CWGH team." />
            <div className="programme-grid programme-grid-all">
              {PROGRAMMES.map((item) => (
                <ScrollReveal key={item.number} className="programme-card">
                  <div className="programme-image"><img src={item.image} alt="" loading="lazy" /><span>{item.number}</span></div>
                  <div className="programme-content">
                    <span className="card-tag">{item.tag}</span>
                    <h3>{item.title}</h3>
                    <p>{item.short}</p>
                    <Link className="card-arrow" href="/contact">Enquire about this work <span>↗</span></Link>
                  </div>
                </ScrollReveal>
              ))}
            </div>
          </div>
        </section>
      ) : null}

      {slug === "advocacy" ? (
        <>
          <section className="section">
            <div className="container">
              <SectionHeading eyebrow="Campaigns & awareness" title="Information for healthier everyday choices." body="Campaigns shared by CWGH address prevention, health awareness, safer environments and informed public participation." />
              <div className="campaign-grid campaign-grid-light">
                {CAMPAIGNS.map((campaign) => (
                  <ScrollReveal key={campaign.title} className="campaign-card campaign-card-light">
                    <div className="campaign-image"><img src={campaign.image} alt="" loading="lazy" /></div>
                    <div className="campaign-meta"><span>{campaign.category}</span><span>{campaign.date}</span></div>
                    <h3>{campaign.title}</h3>
                    <p>{campaign.description}</p>
                  </ScrollReveal>
                ))}
              </div>
            </div>
          </section>
          <section className="section section-soft">
            <div className="container advocacy-callout">
              <div className="budget-mark">2027<br /><span>HEALTH<br />BUDGET</span></div>
              <div>
                <span className="eyebrow"><i /> CURRENT POLICY PRIORITY</span>
                <h2>Make health investment answer to community needs.</h2>
                <p>CWGH's position paper on the 2027 National Health Budget is a key resource for public participation and advocacy.</p>
                <a className="button button-orange" href="https://docs.google.com/document/d/12lU5VAWW6DqLHumYFNGtS1BZ-0qSnW0C/edit?usp=sharing" target="_blank" rel="noreferrer">Read the position paper ↗</a>
              </div>
            </div>
          </section>
        </>
      ) : null}

      {slug === "impact" ? (
        <section className="section stats-detail-section">
          <div className="container">
            <div className="stats-grid stats-grid-large">
              {STATS.map((stat) => (
                <div className="stat-item" key={stat.label}>
                  <div className="stat-value">{stat.value}{stat.suffix ? <small>{stat.suffix}</small> : null}</div>
                  <div className="stat-label">{stat.label}</div>
                </div>
              ))}
            </div>
            <p className="stat-note">Figures are taken from CWGH in Brief (2025); please confirm current organisational reach before final public launch.</p>
          </div>
        </section>
      ) : null}

      {slug === "news" ? (
        <section className="section">
          <div className="container">
            <div className="news-grid news-grid-page">
              {NEWS.map((item, index) => (
                <ScrollReveal key={item.slug} className={"news-card " + (index === 0 ? "news-card-feature" : "")}>
                  <Link href={item.slug === "itai-rusike-health-champion-2026" ? "/news/" + item.slug : item.href} className="news-card-link" target={item.slug === "itai-rusike-health-champion-2026" ? undefined : "_blank"} rel="noreferrer">
                    <div className="news-image"><img src={item.image} alt="" loading="lazy" /></div>
                    <div className="news-info"><span>{item.category}</span><small>{item.date}</small></div>
                    <h3>{item.title}</h3>
                    <p>{item.excerpt}</p>
                    <span className="card-arrow">Read more <b>↗</b></span>
                  </Link>
                </ScrollReveal>
              ))}
            </div>
            <div className="editorial-note">News items are linked to CWGH or original publishing sources. The CWGH communications team can manage future stories through a connected content-management workflow.</div>
          </div>
        </section>
      ) : null}

      {slug === "resources" ? (
        <section className="section">
          <div className="container resources-list">
            {RESOURCES.map((item, index) => (
              <ScrollReveal key={item.title} className="resource-row">
                <div className="resource-number">0{index + 1}</div>
                <div className="resource-copy">
                  <span className="card-tag">{item.type} · {item.year}</span>
                  <h3>{item.title}</h3>
                  <p>{item.description}</p>
                </div>
                <a className="resource-open" href={item.href} target="_blank" rel="noreferrer" aria-label={"Open " + item.title}>↗</a>
              </ScrollReveal>
            ))}
          </div>
        </section>
      ) : null}

      {slug === "contact" ? (
        <section className="section">
          <div className="container contact-grid">
            <ScrollReveal className="contact-card">
              <span className="contact-number">01</span>
              <span className="eyebrow"><i /> HEAD OFFICE</span>
              <h2>{CONTACT.harare.name}</h2>
              <p>{CONTACT.harare.address}</p>
              <a href="tel:+26345732856">{CONTACT.harare.phone}</a>
              <small>{CONTACT.harare.additional}</small>
              <a className="text-link" href="https://maps.google.com/?q=4+OConnor+Crescent+Cranborne+Harare" target="_blank" rel="noreferrer">Get directions ↗</a>
            </ScrollReveal>
            <ScrollReveal className="contact-card">
              <span className="contact-number">02</span>
              <span className="eyebrow"><i /> REGIONAL OFFICE</span>
              <h2>{CONTACT.bulawayo.name}</h2>
              <p>{CONTACT.bulawayo.address}</p>
              <a href="tel:+263777645392">{CONTACT.bulawayo.phone}</a>
              <small>{CONTACT.bulawayo.additional}</small>
              <a className="text-link" href="https://maps.google.com/?q=11+Coghlan+Road+Khumalo+Bulawayo" target="_blank" rel="noreferrer">Get directions ↗</a>
            </ScrollReveal>
            <div className="contact-wide">
              <div><span className="eyebrow"><i /> WRITE TO CWGH</span><h2>Start a conversation.</h2><p>For general enquiries, programmes, publications and partnership discussions.</p></div>
              <a className="button button-orange" href={"mailto:" + CONTACT.email}>{CONTACT.email} ↗</a>
            </div>
          </div>
        </section>
      ) : null}

      <section className="section content-detail-section">
        <div className="container content-detail-layout">
          <div className="content-main">
            {page.sections.map((section, index) => (
              <ScrollReveal key={section.title} className="content-block">
                <span className="content-index">0{index + 1}</span>
                <div>
                  <h2>{section.title}</h2>
                  <p>{section.body}</p>
                  {section.items ? (
                    <ul className="check-list">
                      {section.items.map((item) => <li key={item}><span>+</span>{item}</li>)}
                    </ul>
                  ) : null}
                </div>
              </ScrollReveal>
            ))}
          </div>
          <aside className="content-aside">
            <div className="aside-card">
              <img src="https://www.cwgh.co.zw/wp-content/uploads/2016/02/cropped-cwghlogo.png" alt="CWGH logo" />
              <span className="eyebrow">OUR COMMITMENT</span>
              <h3>Health is your right and responsibility.</h3>
              <p>People's health. Our priority.</p>
              <Link className="text-link" href="/get-involved">Connect with CWGH ↗</Link>
            </div>
          </aside>
        </div>
      </section>

      {slug === "partners" ? (
        <section className="section section-soft">
          <div className="container">
            <SectionHeading eyebrow="Our community" title="A network of people, experience and commitment." body="CWGH's national membership includes civic, community, professional and rights-based organisations. The current membership roll and approved partner marks should be confirmed before launch." />
            <Link className="button button-dark" href="https://www.cwgh.co.zw/cwgh-national-members/" target="_blank">View published member list ↗</Link>
          </div>
        </section>
      ) : null}

      <section className="section mini-cta-section">
        <div className="container mini-cta">
          <div><span className="eyebrow eyebrow-light"><i /> CONNECT WITH CWGH</span><h2>Let's make community voices count.</h2></div>
          <Link className="button button-white" href="/contact">Contact the Secretariat <span>↗</span></Link>
        </div>
      </section>
    </main>
  );
}