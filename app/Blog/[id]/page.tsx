import Link from "next/link";
import Image from "next/image";
import ReactMarkdown from "react-markdown";
import { notFound } from "next/navigation";
import type { Metadata } from "next";

interface Post {
  id: string;
  title: string;
  excerpt: string;
  content: string;
  date: string;
  image: string;
  readTime: string;
}

const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL ||
  "https://srnpp.com";

async function getPost(
  id: string
): Promise<Post | null> {
  try {
    const response = await fetch(
      `${SITE_URL}/api/posts/${id}`,
      {
        next: {
          revalidate: 3600,
        },
      }
    );

    if (!response.ok) {
      return null;
    }

    const data =
      await response.json();

    return data.success &&
      data.post
      ? data.post
      : null;

  } catch (error) {

    console.error(
      "Error fetching post:",
      error
    );

    return null;
  }
}

export async function generateStaticParams() {
  try {
    const response = await fetch(
      `${SITE_URL}/api/posts`,
      {
        next: {
          revalidate: 3600,
        },
      }
    );

    if (!response.ok) {
      return [];
    }

    const data =
      await response.json();

    const posts: Post[] =
      data.posts || [];

    return posts.map(
      (post) => ({
        id: post.id,
      })
    );

  } catch (error) {

    console.error(
      "Error generating blog params:",
      error
    );

    return [];
  }
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{
    id: string;
  }>;
}): Promise<Metadata> {

  const { id } =
    await params;

  const post =
    await getPost(id);

  if (!post) {
    return {
      title: "Post Not Found | Solid Rock Behavioral Health",
    };
  }

  return {
    title: `${post.title} | Solid Rock Behavioral Health`,
    description:
      post.excerpt,

    openGraph: {
      title: post.title,
      description:
        post.excerpt,
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

const normalizeImageUrl = (
  url: string
): string => {

  if (!url) {
    return "/fallback.png";
  }

  // Vercel Blob
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
};

export default async function PostDetail({
  params,
}: {
  params: Promise<{
    id: string;
  }>;
}) {

  const { id } =
    await params;

  const post =
    await getPost(id);

  if (!post) {
    notFound();
  }

  return (
    <div className="container mx-auto max-w-6xl bg-white px-6 py-8 pt-24 md:px-10">

      <div className="mb-8">

        <Link
          href="/blog"
          className="inline-flex items-center font-medium text-[#075187] transition hover:text-[#082957]"
        >
          ← Back to All Posts
        </Link>

      </div>

      <article>

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

        <div className="mb-10 overflow-hidden rounded-[28px]">

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

        <div
          className="
                        mx-auto
                        max-w-4xl
                        text-[17px]
                        leading-8
                        text-[#3e5062]

                        [&>h1]:mb-6
                        [&>h1]:mt-10
                        [&>h1]:font-serif
                        [&>h1]:text-4xl
                        [&>h1]:font-semibold
                        [&>h1]:text-[#082957]

                        [&>h2]:mb-4
                        [&>h2]:mt-10
                        [&>h2]:font-serif
                        [&>h2]:text-3xl
                        [&>h2]:font-semibold
                        [&>h2]:text-[#082957]

                        [&>h3]:mb-3
                        [&>h3]:mt-8
                        [&>h3]:text-xl
                        [&>h3]:font-semibold
                        [&>h3]:text-[#082957]

                        [&>p]:mb-6

                        [&>ul]:mb-6
                        [&>ul]:list-disc
                        [&>ul]:pl-7

                        [&>ol]:mb-6
                        [&>ol]:list-decimal
                        [&>ol]:pl-7

                        [&>li]:mb-2

                        [&>strong]:font-bold
                        [&>strong]:text-[#082957]

                        [&>blockquote]:my-8
                        [&>blockquote]:border-l-4
                        [&>blockquote]:border-[#d7a447]
                        [&>blockquote]:bg-[#fbf8f2]
                        [&>blockquote]:px-6
                        [&>blockquote]:py-4
                        [&>blockquote]:italic

                        [&>a]:font-medium
                        [&>a]:text-[#075187]
                        [&>a]:underline
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