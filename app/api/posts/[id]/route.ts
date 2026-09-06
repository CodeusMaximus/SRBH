import { NextRequest, NextResponse } from "next/server";
import { ObjectId } from "mongodb";
import { connectToDatabase } from "../../../lib/mongodb";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

function getValidImageUrl(
  imageUrl: string | undefined
): string {
  if (!imageUrl?.trim()) {
    return "";
  }

  if (
    imageUrl.startsWith("http://") ||
    imageUrl.startsWith("https://") ||
    imageUrl.startsWith("/")
  ) {
    return imageUrl;
  }

  return `/${imageUrl}`;
}

export async function GET(
  request: NextRequest
) {
  try {
    const pathParts =
      request.nextUrl.pathname.split("/");

    const postId =
      pathParts[pathParts.length - 1];

    if (
      !postId ||
      !ObjectId.isValid(postId)
    ) {
      return NextResponse.json(
        {
          success: false,
          error: "Invalid post ID format",
        },
        {
          status: 400,
        }
      );
    }

    const { db } =
      await connectToDatabase();

    const post =
      await db
        .collection("posts")
        .findOne({
          _id: new ObjectId(postId),
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

    const content =
      typeof post.content === "string"
        ? post.content
        : "";

    const words =
      content
        .trim()
        .split(/\s+/)
        .filter(Boolean)
        .length;

    const image =
      Array.isArray(post.images) &&
        post.images.length > 0
        ? getValidImageUrl(
          post.images[0]
        )
        : getValidImageUrl(
          post.image
        );

    const createdAt =
      post.createdAt instanceof Date
        ? post.createdAt.toISOString()
        : post.createdAt ||
        new Date().toISOString();

    const formattedPost = {
      id: post._id.toString(),
      title: post.title || "",
      content,
      excerpt:
        post.excerpt ||
        (content.length > 150
          ? `${content.substring(
            0,
            150
          )}...`
          : content),

      slug: post.slug || "",
      author: post.author || "",
      status:
        post.status || "draft",

      tags: Array.isArray(post.tags)
        ? post.tags
        : [],

      images: Array.isArray(
        post.images
      )
        ? post.images
        : image
          ? [image]
          : [],

      image,

      publishedAt:
        post.publishedAt || null,

      createdAt,
      updatedAt:
        post.updatedAt || null,

      date:
        post.publishedAt ||
        createdAt,

      views: post.views || 0,

      readTime: `${Math.max(
        1,
        Math.ceil(words / 200)
      )} min`,
    };

    return NextResponse.json({
      success: true,
      post: formattedPost,
    });
  } catch (error) {
    console.error(
      "GET POST ERROR:",
      error
    );

    return NextResponse.json(
      {
        success: false,
        error:
          "Failed to fetch post",
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