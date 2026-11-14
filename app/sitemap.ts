
import type { MetadataRoute } from "next";

const SITE_URL = "https://srnpp.com";

export default function sitemap(): MetadataRoute.Sitemap {
    const pages = [
        "/",
        "/about-us",

        // Add other existing public routes here:
        // "/services",
        // "/contact",
        // "/provider",
        // "/blog",
    ];

    return pages.map((path) => ({
        url: `${SITE_URL}${path}`,
        changeFrequency: "monthly",
        priority: path === "/" ? 1.0 : 0.8,
    }));
}
