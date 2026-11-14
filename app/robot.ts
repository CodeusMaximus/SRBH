
import type { MetadataRoute } from "next";

const SITE_URL = "https://srnpp.com";

export default function robots(): MetadataRoute.Robots {
    return {
        rules: {
            userAgent: "*",
            allow: "/",
            disallow: [
                "/api/",
                "/Dashboard",
                "/admin/",
                "/sign-in",
                "/sign-up",
                "/admin-sign-in",
            ],
        },
        sitemap: `${SITE_URL}/sitemap.xml`,
        host: SITE_URL,
    };
}
