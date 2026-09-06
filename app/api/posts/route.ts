import {
  NextRequest,
  NextResponse,
} from "next/server";

import { auth } from "@clerk/nextjs/server";
import { ObjectId } from "mongodb";
import { connectToDatabase } from "../../lib/mongodb";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

type MongoPost = {
  _id: ObjectId;
  title?: string;
  content?: string;
  excerpt?: string;
  slug?: string;
  author?: string;
  status?: "draft" | "published" | "scheduled";
  tags?: string[];
  images?: string[];
  image?: string;
  publishedAt?: Date | null;
  createdAt?: Date;
  updatedAt?: Date;
  views?: number;
};

/*
 * Format MongoDB document for the frontend.
 *
 * MongoDB uses:
 *     _id: ObjectId(...)
 *
 * Frontend receives:
 *     id: "..."
 */
function formatPost(post: MongoPost) {
  const content =
    typeof post.content === "string"
      ? post.content
      : "";

  const wordCount = content
    .trim()
    .split(/\s+/)
    .filter(Boolean).length;

  const images = Array.isArray(post.images)
    ? post.images
    : [];

  const image =
    images.length > 0
      ? images[0]
      : post.image || "";

  const excerpt =
    post.excerpt ||
    (content.length > 150
      ? `${content.substring(0, 150)}...`
      : content);

  return {
    id: post._id.toString(),

    title: post.title || "",

    content,

    excerpt,

    slug: post.slug || "",

    date:
      post.publishedAt?.toISOString?.() ||
      post.createdAt?.toISOString?.() ||
      null,

    image,

    images:
      images.length > 0
        ? images
        : image
          ? [image]
          : [],

    readTime: `${Math.max(
      1,
      Math.ceil(wordCount / 200)
    )} min`,

    status: post.status || "draft",

    author: post.author || "",

    publishedAt:
      post.publishedAt?.toISOString?.() ||
      null,

    createdAt:
      post.createdAt?.toISOString?.() ||
      null,

    updatedAt:
      post.updatedAt?.toISOString?.() ||
      null,

    tags: Array.isArray(post.tags)
      ? post.tags
      : [],

    views: post.views || 0,
  };
}

/*
 * ============================================================
 * GET /api/get-posts
 *
 * Supports:
 *
 * /api/get-posts
 *     Public published posts
 *
 * /api/get-posts?admin=true
 *     All posts belonging to logged-in admin
 *
 * /api/get-posts?id=POST_ID
 *     One post for editing
 * ============================================================
 */

export async function GET(req: NextRequest) {
  try {
    const { searchParams } =
      new URL(req.url);

    const postId =
      searchParams.get("id");

    const isAdminRequest =
      searchParams.get("admin") ===
      "true";

    const { db } =
      await connectToDatabase();

    const postsCollection =
      db.collection<MongoPost>("posts");

    /*
     * ====================================================
     * GET ONE POST BY ID
     * Used by:
     * /Dashboard/edit/[id]
     * ====================================================
     */

    if (postId) {
      const { userId } =
        await auth();

      if (!userId) {
        return NextResponse.json(
          {
            success: false,
            error: "Unauthorized",
          },
          {
            status: 401,
          }
        );
      }

      if (!ObjectId.isValid(postId)) {
        return NextResponse.json(
          {
            success: false,
            error: "Invalid post ID",
          },
          {
            status: 400,
          }
        );
      }

      const post =
        await postsCollection.findOne({
          _id: new ObjectId(postId),
          author: userId,
        });

      if (!post) {
        return NextResponse.json(
          {
            success: false,
            error: "Post not found",
          },
          {
            status: 404,
          }
        );
      }

      return NextResponse.json({
        success: true,
        post: formatPost(post),
      });
    }

    /*
     * ====================================================
     * ADMIN POSTS
     *
     * GET /api/get-posts?admin=true
     * ====================================================
     */

    if (isAdminRequest) {
      const { userId } =
        await auth();

      if (!userId) {
        return NextResponse.json(
          {
            success: false,
            error: "Unauthorized",
          },
          {
            status: 401,
          }
        );
      }

      console.log(
        `Fetching admin posts for ${userId}`
      );

      const posts =
        await postsCollection
          .find({
            author: userId,
          })
          .sort({
            createdAt: -1,
          })
          .toArray();

      console.log(
        `Found ${posts.length} admin posts`
      );

      return NextResponse.json({
        success: true,
        posts: posts.map(formatPost),
      });
    }

    /*
     * ====================================================
     * PUBLIC BLOG
     *
     * GET /api/get-posts
     *
     * No Clerk login required.
     * Only published posts are returned.
     * ====================================================
     */

    console.log(
      "Fetching published posts"
    );

    const posts =
      await postsCollection
        .find({
          status: "published",
        })
        .sort({
          publishedAt: -1,
          createdAt: -1,
        })
        .toArray();

    console.log(
      `Found ${posts.length} published posts`
    );

    return NextResponse.json({
      success: true,
      posts: posts.map(formatPost),
    });
  } catch (error) {
    console.error(
      "GET /api/get-posts error:",
      error
    );

    return NextResponse.json(
      {
        success: false,
        error:
          "Failed to fetch posts",

        details:
          error instanceof Error
            ? error.message
            : "Unknown error",
      },
      {
        status: 500,
      }
    );
  }
}