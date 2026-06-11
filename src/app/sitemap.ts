import { MetadataRoute } from "next";

const BASE_URL = "https://manasagrawal.online";

const projects = [
  { slug: "grahbook", lastmod: "2026-06-10" },
  { slug: "formlabs", lastmod: "2026-06-10" },
  { slug: "codesnap", lastmod: "2026-06-10" },
  { slug: "jee-os", lastmod: "2026-06-10" },
  { slug: "ai-study-planner", lastmod: "2026-06-10" },
];

const blogPosts = [
  { slug: "building-grahbook-whatsapp-commerce", lastmod: "2026-06-01" },
  { slug: "formlabs-zero-dependency-form-builder", lastmod: "2026-05-15" },
  { slug: "codesnap-ai-code-screenshots", lastmod: "2026-04-20" },
];

export default function sitemap(): MetadataRoute.Sitemap {
  const today = new Date().toISOString().split("T")[0];

  const staticRoutes = [
    { url: BASE_URL, lastModified: new Date(today), changeFrequency: "weekly" as const, priority: 1 },
    { url: `${BASE_URL}/formlabs`, lastModified: new Date(today), changeFrequency: "monthly" as const, priority: 0.8 },
    { url: `${BASE_URL}/codesnap`, lastModified: new Date(today), changeFrequency: "monthly" as const, priority: 0.8 },
    { url: `${BASE_URL}/blog`, lastModified: new Date(today), changeFrequency: "weekly" as const, priority: 0.9 },
  ];

  const projectRoutes = projects.map((p) => ({
    url: `${BASE_URL}/projects/${p.slug}`,
    lastModified: new Date(p.lastmod),
    changeFrequency: "monthly" as const,
    priority: 0.7,
  }));

  const blogRoutes = blogPosts.map((p) => ({
    url: `${BASE_URL}/blog/${p.slug}`,
    lastModified: new Date(p.lastmod),
    changeFrequency: "monthly" as const,
    priority: 0.8,
  }));

  return [...staticRoutes, ...projectRoutes, ...blogRoutes];
}