import type { MetadataRoute } from "next";
import { NEWS, PAGES } from "./data";

const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://www.cwgh.co.zw";

export default function sitemap(): MetadataRoute.Sitemap {
  const staticRoutes = [
    "",
    ...Object.keys(PAGES).map((slug) => `/${slug}`),
    "/privacy",
    "/safeguarding"
  ];
  const newsRoutes = NEWS.map((story) => `/news/${story.slug}`);
  return [...staticRoutes, ...newsRoutes].map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: route === "" ? "weekly" : "monthly",
    priority: route === "" ? 1 : route.startsWith("/news/") ? 0.65 : 0.8
  }));
}
