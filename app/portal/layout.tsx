import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Staff workspace",
  robots: { index: false, follow: false, noarchive: true }
};

export default function PortalLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return children;
}
