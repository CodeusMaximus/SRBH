import Link from "next/link";
import Image from "next/image";
import BlogSearch from "../components/BlogSearch";

interface Post {
    id: string;
    title: string;
    excerpt: string;
    date: string;
    image: string;
    readTime: string;
    slug: string;
}

const SITE_URL =
    process.env.NEXT_PUBLIC_SITE_URL ||
    "http://localhost:3000";

/* =========================================================
   IMAGE URL
========================================================= */

const normalizeImageUrl = (
    url: string
): string => {
    /*
     * No uploaded image yet.
     * Use a MediaDari local fallback.
     *
     * Change this path if your actual
     * MediaDari logo has a different name.
     */
    if (!url) {
        return "/images/mediadari-logo.png";
    }

    /*
     * Vercel Blob URLs are already
     * absolute URLs.
     */
    if (
        url.startsWith("http://") ||
        url.startsWith("https://")
    ) {
        return url;
    }

    if (url.startsWith("/")) {
        return url;
    }

    return `/${url}`;
};

/* =========================================================
   GET PUBLISHED BLOG POSTS
========================================================= */

async function getPosts(): Promise<Post[]> {
    try {
        const response = await fetch(
            `${SITE_URL}/api/get-posts`,
            {
                cache: "no-store",
            }
        );

        if (!response.ok) {
            console.error(
                "Failed to fetch MediaDari posts:",
                response.status
            );

            return [];
        }

        const data = await response.json();

        if (
            !data.success ||
            !Array.isArray(data.posts)
        ) {
            console.error(
                "Invalid MediaDari posts response:",
                data
            );

            return [];
        }

        /*
         * Newest articles first.
         */
        return [...data.posts].sort(
            (a: Post, b: Post) =>
                new Date(b.date).getTime() -
                new Date(a.date).getTime()
        );
    } catch (error) {
        console.error(
            "Error fetching MediaDari posts:",
            error
        );

        return [];
    }
}

/* =========================================================
   BLOG PAGE
========================================================= */

export default async function Blog() {
    const posts = await getPosts();

    const featuredPost =
        posts[0] ?? null;

    const regularPosts =
        posts.slice(1);

    return (
        <div className="container mx-auto max-w-7xl bg-white px-4 py-8 pt-24 md:px-8">

            {/* ===================================================
          HEADER
      =================================================== */}

            <header className="mb-10 text-center">

                <p className="mb-3 text-sm font-bold uppercase tracking-[0.2em] text-[#1904E5]">
                    MediaDari Insights
                </p>

                <h1 className="mb-4 text-4xl font-bold text-black sm:text-5xl lg:text-6xl">
                    Digital Growth,
                    Technology & Business
                </h1>

                <p className="mx-auto mb-7 max-w-3xl text-lg leading-8 text-gray-600 sm:text-xl">
                    Practical insights on web design,
                    digital marketing, AI automation,
                    branding, SEO, and technology to
                    help businesses strengthen their
                    online presence and grow revenue.
                </p>

                {/* Search remains client-side */}

                <BlogSearch posts={posts} />

            </header>

            {/* ===================================================
          BLOG CONTENT
      =================================================== */}

            <main>

                {posts.length === 0 ? (

                    /* =================================================
                       NO POSTS
                    ================================================= */

                    <div className="py-20 text-center">

                        <h2 className="text-2xl font-bold text-black">
                            No articles yet
                        </h2>

                        <p className="mt-3 text-gray-500">
                            Check back soon for new
                            MediaDari insights and resources.
                        </p>

                    </div>

                ) : (

                    <>

                        {/* ===============================================
                FEATURED ARTICLE
            =============================================== */}

                        {featuredPost && (

                            <section
                                className="
                  mb-14
                  overflow-hidden
                  rounded-[28px]
                  border
                  border-gray-200
                  bg-white
                  shadow-xl
                  transition
                  duration-300
                  hover:-translate-y-1
                  hover:shadow-2xl
                "
                            >

                                <Link
                                    href={`/blog/${featuredPost.slug ||
                                        featuredPost.id
                                        }`}
                                >

                                    {/* Featured Image */}

                                    <div className="relative h-[300px] w-full sm:h-[400px] lg:h-[480px]">

                                        <Image
                                            src={normalizeImageUrl(
                                                featuredPost.image
                                            )}
                                            alt={featuredPost.title}
                                            fill
                                            className="object-cover"
                                            priority
                                        />

                                        {/* subtle dark gradient */}

                                        <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent" />

                                    </div>

                                    {/* Featured Content */}

                                    <div className="p-6 sm:p-8 lg:p-10">

                                        <div className="mb-4 flex flex-wrap justify-between gap-3 text-sm text-gray-500">

                                            <span>
                                                {new Date(
                                                    featuredPost.date
                                                ).toLocaleDateString(
                                                    "en-US",
                                                    {
                                                        year: "numeric",
                                                        month: "long",
                                                        day: "numeric",
                                                    }
                                                )}
                                            </span>

                                            <span>
                                                {
                                                    featuredPost.readTime
                                                }{" "}
                                                read
                                            </span>

                                        </div>

                                        <h2 className="mb-4 text-3xl font-bold leading-tight text-black sm:text-4xl lg:text-5xl">
                                            {featuredPost.title}
                                        </h2>

                                        <p className="mb-7 max-w-4xl text-lg leading-8 text-gray-600">
                                            {featuredPost.excerpt}
                                        </p>

                                        <div
                                            className="
                        inline-flex
                        rounded-full
                        bg-gradient-to-r
                        from-[#FAB2FF]
                        to-[#1904E5]
                        px-7
                        py-3
                        font-bold
                        text-white
                        transition
                        hover:opacity-90
                      "
                                        >
                                            Read Article →
                                        </div>

                                    </div>

                                </Link>

                            </section>
                        )}

                        {/* ===============================================
                ARTICLE GRID
            =============================================== */}

                        {regularPosts.length > 0 && (

                            <section>

                                <div className="mb-7 flex items-end justify-between">

                                    <div>

                                        <p className="mb-1 text-sm font-bold uppercase tracking-[0.15em] text-[#1904E5]">
                                            Latest
                                        </p>

                                        <h2 className="text-3xl font-bold text-black">
                                            More Insights
                                        </h2>

                                    </div>

                                </div>

                                <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">

                                    {regularPosts.map(
                                        (post) => (

                                            <Link
                                                href={`/blog/${post.slug ||
                                                    post.id
                                                    }`}
                                                key={post.id}
                                                className="group"
                                            >

                                                <article
                                                    className="
                            flex
                            h-full
                            flex-col
                            overflow-hidden
                            rounded-[24px]
                            border
                            border-gray-200
                            bg-white
                            shadow-md
                            transition
                            duration-300
                            group-hover:-translate-y-1
                            group-hover:shadow-xl
                          "
                                                >

                                                    {/* Article Image */}

                                                    <div className="relative h-56 w-full overflow-hidden bg-gray-100">

                                                        <Image
                                                            src={normalizeImageUrl(
                                                                post.image
                                                            )}
                                                            alt={post.title}
                                                            fill
                                                            className="
                                object-cover
                                transition
                                duration-500
                                group-hover:scale-105
                              "
                                                        />

                                                    </div>

                                                    {/* Article Content */}

                                                    <div className="flex flex-grow flex-col p-6">

                                                        <div className="mb-3 flex justify-between gap-3 text-sm text-gray-500">

                                                            <span>
                                                                {new Date(
                                                                    post.date
                                                                ).toLocaleDateString(
                                                                    "en-US",
                                                                    {
                                                                        year: "numeric",
                                                                        month: "short",
                                                                        day: "numeric",
                                                                    }
                                                                )}
                                                            </span>

                                                            <span>
                                                                {
                                                                    post.readTime
                                                                }{" "}
                                                                read
                                                            </span>

                                                        </div>

                                                        <h3 className="mb-3 text-xl font-bold leading-snug text-black transition group-hover:text-[#1904E5]">
                                                            {post.title}
                                                        </h3>

                                                        <p className="mb-5 flex-grow leading-7 text-gray-600">
                                                            {post.excerpt}
                                                        </p>

                                                        <span className="font-bold text-[#1904E5]">
                                                            Read Article →
                                                        </span>

                                                    </div>

                                                </article>

                                            </Link>

                                        )
                                    )}

                                </div>

                            </section>
                        )}

                    </>

                )}

            </main>

        </div>
    );
}