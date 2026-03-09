import fs from "fs";
import path from "path";

const portfolioPath = path.resolve(
  process.cwd(),
  "client/src/data/portfolio.ts",
);
const portfolioContent = fs.readFileSync(portfolioPath, "utf-8");

const slugRegex = /slug:\s*["']([^"']+)["']/g;
const projectSlugs: string[] = [];
let match;

while ((match = slugRegex.exec(portfolioContent)) !== null) {
  projectSlugs.push(match[1]);
}

const BASE_URL = "https://digiweb-agency.com";

// Updated with your full page list
const staticPages = [
  "", // Home
  "/services",
  "/our-work",
  "/process",
  "/team",
  "/contact",
];

const projectPages = projectSlugs.map((slug) => `/our-work/${slug}`);
const allPages = [...staticPages, ...projectPages];

const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  ${allPages
    .map(
      (urlPath) => `
    <url>
      <loc>${BASE_URL}${urlPath}</loc>
      <lastmod>${new Date().toISOString().split("T")[0]}</lastmod>
      <changefreq>${urlPath === "" ? "weekly" : "monthly"}</changefreq>
      <priority>${urlPath === "" ? "1.0" : urlPath === "/get-started" ? "0.9" : "0.8"}</priority>
    </url>`,
    )
    .join("")}
</urlset>`;

try {
  const outputPath = "client/public/sitemap.xml";
  fs.writeFileSync(outputPath, sitemap.trim());
  console.log(
    `✅ Sitemap generated with ${allPages.length} total URLs at ${outputPath}`,
  );
} catch (err) {
  console.error("❌ Failed to generate sitemap:", err);
}
