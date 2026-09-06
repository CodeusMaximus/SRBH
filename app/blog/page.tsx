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

const normalizeImageUrl = (
    url: string
): string => {
    /*
     * No uploaded image yet.
     * Use our own local fallback instead
     * of an external placeholder service.
     */
    if (!url) {
        return "/images/solid-rock-logo.png";
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
                "Failed to fetch posts:",
                response.status
            );

            return [];
        }

        const data =
            await response.json();

        if (
            !data.success ||
            !Array.isArray(data.posts)
        ) {
            console.error(
                "Invalid posts response:",
                data
            );

            return [];
        }

        return [...data.posts].sort(
            (a: Post, b: Post) =>
                new Date(
                    b.date
                ).getTime() -
                new Date(
                    a.date
                ).getTime()
        );
    } catch (error) {
        console.error(
            "Error fetching posts:",
            error
        );

        return [];
    }
}

export default async function Blog() {
    const posts =
        await getPosts();

    const featuredPost =
        posts[0] ?? null;

    const regularPosts =
        posts.slice(1);

    return (
        <div className="container mx-auto max-w-7xl bg-white px-4 py-8 pt-24 md:px-8">
            <header className="mb-8 text-center">
                <h1 className="mb-4 font-serif text-4xl font-semibold text-[#082957] sm:text-5xl">
                    Insights & Resources
                </h1>

                <p className="mb-6 text-xl text-gray-600">
                    Stay updated with the latest
                    mental health insights and
                    resources.
                </p>

                <BlogSearch
                    posts={posts}
                />
            </header>

            <main>
                {posts.length === 0 ? (
                    <div className="py-16 text-center">
                        <h2 className="text-2xl font-bold text-[#082957]">
                            No posts yet
                        </h2>

                        <p className="mt-2 text-gray-500">
                            Check back soon for new
                            articles and resources.
                        </p>
                    </div>
                ) : (
                    <>
                        {featuredPost && (
                            <section className="mb-12 overflow-hidden rounded-[28px] border border-[#082957]/10 bg-white shadow-[0_20px_60px_rgba(8,41,87,0.10)] transition duration-300 hover:-translate-y-1 hover:shadow-[0_28px_70px_rgba(8,41,87,0.15)]">
                                <Link
                                    href={`/blog/${featuredPost.slug ||
                                        featuredPost.id
                                        }`}
                                >
                                    <div className="relative h-96 w-full">
                                        <Image
                                            src={normalizeImageUrl(
                                                featuredPost.image
                                            )}
                                            alt={
                                                featuredPost.title
                                            }
                                            fill
                                            className="object-cover"
                                            priority
                                        />
                                    </div>

                                    <div className="p-6 sm:p-8">
                                        <div className="mb-3 flex flex-wrap justify-between gap-3 text-sm text-gray-500">
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

                                        <h2 className="mb-3 font-serif text-3xl font-semibold text-[#082957] sm:text-4xl">
                                            {
                                                featuredPost.title
                                            }
                                        </h2>

                                        <p className="mb-6 leading-7 text-gray-600">
                                            {
                                                featuredPost.excerpt
                                            }
                                        </p>

                                        <div className="inline-flex rounded-full bg-[#075187] px-6 py-3 font-semibold text-white transition hover:bg-[#063f6b]">
                                            Read Article
                                        </div>
                                    </div>
                                </Link>
                            </section>
                        )}

                        <section className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
                            {regularPosts.map(
                                (post) => (
                                    <Link
                                        href={`/blog/${post.slug ||
                                            post.id
                                            }`}
                                        key={
                                            post.id
                                        }
                                        className="group"
                                    >
                                        <article className="flex h-full flex-col overflow-hidden rounded-[24px] border border-[#082957]/10 bg-white shadow-[0_12px_35px_rgba(8,41,87,0.08)] transition duration-300 group-hover:-translate-y-1 group-hover:shadow-[0_20px_50px_rgba(8,41,87,0.14)]">
                                            <div className="relative h-48 w-full overflow-hidden">
                                                <Image
                                                    src={normalizeImageUrl(
                                                        post.image
                                                    )}
                                                    alt={
                                                        post.title
                                                    }
                                                    fill
                                                    className="object-cover transition duration-500 group-hover:scale-105"
                                                />
                                            </div>

                                            <div className="flex flex-grow flex-col p-5">
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

                                                <h3 className="mb-2 font-serif text-xl font-semibold text-[#082957]">
                                                    {
                                                        post.title
                                                    }
                                                </h3>

                                                <p className="mb-4 flex-grow leading-6 text-gray-600">
                                                    {
                                                        post.excerpt
                                                    }
                                                </p>

                                                <span className="font-semibold text-[#075187]">
                                                    Read
                                                    Article
                                                    →
                                                </span>
                                            </div>
                                        </article>
                                    </Link>
                                )
                            )}
                        </section>
                    </>
                )}
            </main>
        </div>
    );
}