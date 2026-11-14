
import { clerkMiddleware } from "@clerk/nextjs/server";

export default clerkMiddleware(async (auth, req) => {
    const pathname = req.nextUrl.pathname;

    // Keep the dashboard private
    const isProtectedRoute =
        pathname === "/Dashboard" ||
        pathname.startsWith("/Dashboard/");

    if (isProtectedRoute) {
        await auth.protect();
    }

    // All other routes remain public
});

export const config = {
    matcher: [
        // Exclude Next.js internals, SEO metadata files,
        // and static assets from Clerk processing
        "/((?!_next|robots\\.txt|sitemap\\.xml|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)",

        // Keep Clerk available for API routes
        "/(api|trpc)(.*)",

        // Include Clerk frontend API routes
        "/__clerk/(.*)",
    ],
};
