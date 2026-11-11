import type { Metadata } from "next";
import "./globals.css";
import { SiteFrame } from "./components/site-frame";

export const metadata: Metadata = {
  title: {
    default: "CWGH | People's Health. Our Priority.",
    template: "%s | Community Working Group on Health"
  },
  description:
    "The Community Working Group on Health advances community participation, health rights and equitable health services in Zimbabwe.",
  keywords: [
    "CWGH",
    "Community Working Group on Health",
    "Zimbabwe",
    "community health",
    "health rights",
    "health advocacy",
    "universal health coverage"
  ],
  metadataBase: new URL("https://www.cwgh.co.zw"),
  openGraph: {
    title: "CWGH | People's Health. Our Priority.",
    description:
      "Health is your right and responsibility. Discover CWGH's community-led health advocacy across Zimbabwe.",
    type: "website",
    locale: "en_ZW"
  }
};

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <SiteFrame>{children}</SiteFrame>
      </body>
    </html>
  );
}
