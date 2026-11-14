
import type { MetadataRoute } from "next";

const SITE_URL = "https://srnpp.com";

export default function sitemap(): MetadataRoute.Sitemap {
    const publicPages = [
        {
            path: "/",
            priority: 1.0,
        },
        {
            path: "/blog",
            priority: 0.9,
        },
        {
            path: "/Provider",
            priority: 0.8,
        },
        {
            path: "/services/medication-management",
            priority: 0.9,
        },
        {
            path: "/services/psychiatric-evaluation",
            priority: 0.9,
        },
        {
            path: "/services/psychopharmacology",
            priority: 0.9,
        },
        {
            path: "/services/telehealth",
            priority: 0.9,
        },
    ];

    return publicPages.map((page) => ({
        url: `${SITE_URL}${page.path}`,
        changeFrequency: "monthly" as const,
        priority: page.priority,
    }));
}
