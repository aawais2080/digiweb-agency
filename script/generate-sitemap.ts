import fs from "fs";
import { projects } from "../client/src/data/portfolio"; // Adjust path to your data file

const BASE_URL = "https://digiweb-agency.com";

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
  // Ensure the public directory exists
  if (!fs.existsSync("public")) {
    fs.mkdirSync("public");
  }
  fs.writeFileSync("public/sitemap.xml", sitemap.trim());
  console.log("✅ Sitemap generated: public/sitemap.xml");
} catch (err) {
  console.error("❌ Failed to generate sitemap:", err);
}
