import type { MetadataRoute } from "next";

const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://www.cwgh.co.zw";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [{ userAgent: "*", allow: "/", disallow: ["/portal", "/portal/"] }],
    sitemap: `${baseUrl}/sitemap.xml`
  };
}
