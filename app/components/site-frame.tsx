"use client";

import { usePathname } from "next/navigation";
import { SiteFooter, SiteHeader } from "./site";

export function SiteFrame({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const isPortal = pathname.startsWith("/portal");

  return (
    <>
      {!isPortal ? <SiteHeader /> : null}
      <a className="skip-link" href="#main-content">Skip to main content</a>
      <div className="site-main" id="main-content" tabIndex={-1}>{children}</div>
      {!isPortal ? <SiteFooter /> : null}
    </>
  );
}
