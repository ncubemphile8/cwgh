"use client";

import { usePathname } from "next/navigation";
import { SiteFooter, SiteHeader } from "./site";

export function SiteFrame({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const isPortal = pathname.startsWith("/portal");

  return (
    <>
      {!isPortal ? <SiteHeader /> : null}
      <div className="site-main">{children}</div>
      {!isPortal ? <SiteFooter /> : null}
    </>
  );
}
