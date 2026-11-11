"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { CWGH_LOGO, NAV, SOCIALS } from "../data";

export function SiteHeader() {
  const pathname = usePathname();
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => setMenuOpen(false), [pathname]);

  useEffect(() => {
    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") setMenuOpen(false);
    };
    window.addEventListener("keydown", closeOnEscape);
    return () => window.removeEventListener("keydown", closeOnEscape);
  }, []);

  return (
    <>
      <div className="utility-bar">
        <div className="container utility-inner">
          <span>COMMUNITY WORKING GROUP ON HEALTH</span>
          <span className="utility-right">Health is your right &amp; responsibility.</span>
        </div>
      </div>
      <header className="site-header">
        <div className="container nav-wrap">
          <Link className="brand" href="/" aria-label="CWGH home">
            <img src={CWGH_LOGO} alt="CWGH Community Working Group on Health logo" />
            <span className="brand-copy">
              <strong>COMMUNITY WORKING</strong>
              <strong>GROUP ON HEALTH</strong>
              <small>PEOPLE'S HEALTH. OUR PRIORITY.</small>
            </span>
          </Link>
          <button
            className={"menu-toggle " + (menuOpen ? "is-open" : "")}
            aria-label={menuOpen ? "Close navigation" : "Open navigation"}
            aria-expanded={menuOpen}
            onClick={() => setMenuOpen((open) => !open)}
          >
            <span />
            <span />
          </button>
          <nav className={"primary-nav " + (menuOpen ? "nav-open" : "")} aria-label="Main navigation">
            {NAV.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={pathname === item.href || pathname.startsWith(item.href + "/") ? "active" : ""}
              >
                {item.label}
              </Link>
            ))}
            <Link className="nav-cta" href="/get-involved">
              Get involved <span aria-hidden="true">↗</span>
            </Link>
          </nav>
        </div>
      </header>
    </>
  );
}

export function SiteFooter() {
  return (
    <footer className="site-footer">
      <div className="footer-top">
        <div className="container footer-grid">
          <div className="footer-brand">
            <Link href="/" className="brand brand-footer">
              <img src={CWGH_LOGO} alt="CWGH logo" />
              <span className="brand-copy">
                <strong>COMMUNITY WORKING</strong>
                <strong>GROUP ON HEALTH</strong>
                <small>PEOPLE'S HEALTH. OUR PRIORITY.</small>
              </span>
            </Link>
            <p>Working with communities for health rights, equitable services and accountable health systems.</p>
            <div className="footer-socials">
              {SOCIALS.map((social) => (
                <a key={social.label} href={social.href} target="_blank" rel="noreferrer" aria-label={social.label}>
                  {social.label}
                </a>
              ))}
            </div>
          </div>
          <div>
            <h3>Explore</h3>
            <Link href="/about">About CWGH</Link>
            <Link href="/programmes">Our programmes</Link>
            <Link href="/advocacy">Advocacy &amp; campaigns</Link>
            <Link href="/impact">Our impact</Link>
          </div>
          <div>
            <h3>Knowledge</h3>
            <Link href="/news">News &amp; insights</Link>
            <Link href="/resources">Reports &amp; resources</Link>
            <Link href="/partners">Our network</Link>
            <Link href="/get-involved">Get involved</Link>
          </div>
          <div>
            <h3>Contact</h3>
            <p>4 O’Connor Crescent<br />Cranborne, Harare, Zimbabwe</p>
            <a href="mailto:cwgh@mweb.co.zw">cwgh@mweb.co.zw</a>
            <a href="tel:+26345732856">+263 4 573 285/6</a>
            <Link className="footer-portal" href="/portal">Staff portal sign in <span>↗</span></Link>
          </div>
        </div>
      </div>
      <div className="footer-bottom">
        <div className="container footer-bottom-inner">
          <span>© {new Date().getFullYear()} Community Working Group on Health.</span>
          <span>Health is your right &amp; responsibility.</span>
          <a href="https://www.cwgh.co.zw/" target="_blank" rel="noreferrer">Current CWGH website ↗</a>
        </div>
      </div>
    </footer>
  );
}

export function ScrollReveal({
  children,
  className = ""
}: {
  children: React.ReactNode;
  className?: string;
}) {
  const [visible, setVisible] = useState(false);
  const elementRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const target = elementRef.current;
    if (!target) return;
    if (!("IntersectionObserver" in window)) {
      setVisible(true);
      return;
    }
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries.some((entry) => entry.isIntersecting)) {
          setVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.12, rootMargin: "0px 0px -35px 0px" }
    );
    observer.observe(target);
    return () => observer.disconnect();
  }, []);

  return <div ref={elementRef} className={"reveal " + (visible ? "is-visible" : "") + " " + className}>{children}</div>;
}

export function SectionHeading({
  eyebrow,
  title,
  body,
  dark = false
}: {
  eyebrow: string;
  title: string;
  body?: string;
  dark?: boolean;
}) {
  return (
    <div className={"section-heading " + (dark ? "section-heading-light" : "")}>
      <span className="eyebrow"><i />{eyebrow}</span>
      <h2>{title}</h2>
      {body ? <p>{body}</p> : null}
    </div>
  );
}
