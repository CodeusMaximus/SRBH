import Link from "next/link";
import Image from "next/image";
import ReactMarkdown from "react-markdown";
import { notFound } from "next/navigation";
import type { Metadata } from "next";

interface Post {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  date: string;
  image: string;
  readTime: string;
}

const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL ||
  "http://localhost:3000";

/* =========================================================
   GET ONE PUBLISHED POST
========================================================= */

async function getPost(
  slug: string
): Promise<Post | null> {
  try {
    const baseUrl =
      process.env.NODE_ENV === "development"
        ? "http://localhost:3000"
        : "https://srnpp.com";

    const response = await fetch(
      `${baseUrl}/api/get-posts?slug=${encodeURIComponent(
        slug
      )}`,
      {
        cache: "no-store",
      }
    );

    if (!response.ok) {
      console.error(
        "Failed to fetch post:",
        response.status
      );

      return null;
    }

    const data = await response.json();

    if (
      !data.success ||
      !Array.isArray(data.posts) ||
      data.posts.length === 0
    ) {
      return null;
    }

    return data.posts[0];
  } catch (error) {
    console.error(
      "Error fetching post:",
      error
    );

    return null;
  }
}
/* =========================================================
   METADATA
========================================================= */

export async function generateMetadata({
  params,
}: {
  params: Promise<{
    id: string;
  }>;
}): Promise<Metadata> {
  const { id } = await params;

  const post = await getPost(id);

  if (!post) {
    return {
      title:
        "Post Not Found | Solid Rock Behavioral Health",
    };
  }

  return {
    title: `${post.title} | Solid Rock Behavioral Health`,

    description: post.excerpt,

    openGraph: {
      title: post.title,
      description: post.excerpt,
      type: "article",

      images: post.image
        ? [
          {
            url: post.image,
          },
        ]
        : [],
    },
  };
}

/* =========================================================
   IMAGE URL
========================================================= */

function normalizeImageUrl(
  url: string
): string {
  if (!url) {
    return "/images/solid-rock-logo.png";
  }

  if (
    url.startsWith("https://") ||
    url.startsWith("http://")
  ) {
    return url;
  }

  if (url.startsWith("/")) {
    return url;
  }

  return `/${url}`;
}

/* =========================================================
   POST DETAIL PAGE
========================================================= */

export default async function PostDetail({
  params,
}: {
  params: Promise<{
    id: string;
  }>;
}) {
  /*
   * Folder can remain:
   *
   * app/Blog/[id]/page.tsx
   *
   * The value inside "id" is now the slug.
   */

  const { id } = await params;

  const post = await getPost(id);

  if (!post) {
    notFound();
  }

  return (
    <div className="container mx-auto max-w-6xl bg-white px-6 py-8 pt-24 md:px-10">
      {/* Back Button */}

      <div className="mb-8">
        <Link
          href="/blog"
          className="inline-flex items-center font-medium text-[#075187] transition hover:text-[#082957]"
        >
          ← Back to All Posts
        </Link>
      </div>

      <article>
        {/* Article Header */}

        <header className="mx-auto mb-8 max-w-5xl">
          <h1 className="mb-5 font-serif text-4xl font-semibold leading-tight text-[#082957] sm:text-5xl lg:text-6xl">
            {post.title}
          </h1>

          <div className="flex flex-wrap justify-between gap-3 text-gray-500">
            <span>
              {new Date(
                post.date
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
              {post.readTime} read
            </span>
          </div>
        </header>

        {/* Featured Image */}

        {post.image && (
          <div className="mb-10 overflow-hidden rounded-[28px] shadow-[0_20px_60px_rgba(8,41,87,0.10)]">
            <Image
              src={normalizeImageUrl(
                post.image
              )}
              alt={post.title}
              width={1200}
              height={675}
              className="h-auto w-full object-cover"
              priority
            />
          </div>
        )}

        {/* Article Content */}

        <div
          className="
                        mx-auto
                        max-w-4xl
                        text-[17px]
                        leading-8
                        text-[#3e5062]

                        [&_h1]:mb-6
                        [&_h1]:mt-10
                        [&_h1]:font-serif
                        [&_h1]:text-4xl
                        [&_h1]:font-semibold
                        [&_h1]:text-[#082957]

                        [&_h2]:mb-4
                        [&_h2]:mt-10
                        [&_h2]:font-serif
                        [&_h2]:text-3xl
                        [&_h2]:font-semibold
                        [&_h2]:text-[#082957]

                        [&_h3]:mb-3
                        [&_h3]:mt-8
                        [&_h3]:font-serif
                        [&_h3]:text-2xl
                        [&_h3]:font-semibold
                        [&_h3]:text-[#082957]

                        [&_p]:mb-6

                        [&_ul]:mb-6
                        [&_ul]:list-disc
                        [&_ul]:pl-7

                        [&_ol]:mb-6
                        [&_ol]:list-decimal
                        [&_ol]:pl-7

                        [&_li]:mb-2

                        [&_strong]:font-bold
                        [&_strong]:text-[#082957]

                        [&_blockquote]:my-8
                        [&_blockquote]:border-l-4
                        [&_blockquote]:border-[#d7a447]
                        [&_blockquote]:bg-[#fbf8f2]
                        [&_blockquote]:px-6
                        [&_blockquote]:py-4
                        [&_blockquote]:italic

                        [&_a]:font-medium
                        [&_a]:text-[#075187]
                        [&_a]:underline
                    "
        >
          <ReactMarkdown>
            {post.content ||
              post.excerpt}
          </ReactMarkdown>
        </div>
      </article>
    </div>
  );
}