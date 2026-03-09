import fs from "fs";
// ignore-styles will handle the images imported inside this file:
import { projects } from "../client/src/data/portfolio";

const BASE_URL = "https://digiwebagency.com";

const staticPages = ["", "/our-work", "/services", "/contact"];
const projectPages = projects.map((project) => `/our-work/${project.slug}`);
const allPages = [...staticPages, ...projectPages];

const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  ${allPages
    .map(
      (path) => `
    <url>
      <loc>${BASE_URL}${path}</loc>
      <lastmod>${new Date().toISOString().split("T")[0]}</lastmod>
      <changefreq>${path === "" ? "weekly" : "monthly"}</changefreq>
      <priority>${path === "" ? "1.0" : "0.8"}</priority>
    </url>`,
    )
    .join("")}
</urlset>`;

try {
  const outputPath = "client/public/sitemap.xml";
  fs.writeFileSync(outputPath, sitemap.trim());
  console.log(`✅ Sitemap generated at ${outputPath}`);
} catch (err) {
  console.error("❌ Failed to generate sitemap:", err);
}
