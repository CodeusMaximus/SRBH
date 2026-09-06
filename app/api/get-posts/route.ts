import {
    NextRequest,
    NextResponse,
} from "next/server";

import {
    auth,
} from "@clerk/nextjs/server";

import {
    ObjectId,
} from "mongodb";

import {
    connectToDatabase,
} from "../../lib/mongodb";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

function formatPost(post: any) {
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
            ? post.images[0]
            : post.image || "";

    return {
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

        date:
            post.publishedAt ||
            post.createdAt ||
            null,

        image,

        images:
            Array.isArray(post.images)
                ? post.images
                : image
                    ? [image]
                    : [],

        readTime: `${Math.max(
            1,
            Math.ceil(words / 200)
        )} min`,

        status:
            post.status || "draft",

        author:
            post.author || "",

        publishedAt:
            post.publishedAt || null,

        createdAt:
            post.createdAt || null,

        updatedAt:
            post.updatedAt || null,

        tags:
            Array.isArray(post.tags)
                ? post.tags
                : [],

        views:
            post.views || 0,
    };
}

export async function GET(
    req: NextRequest
) {
    try {
        const { searchParams } =
            new URL(req.url);

        const postId =
            searchParams.get("id");

        const isAdminRequest =
            searchParams.get(
                "admin"
            ) === "true";

        const { db } =
            await connectToDatabase();

        const posts =
            db.collection("posts");

        /*
         * =================================
         * GET ONE POST BY ID
         * =================================
         */
        if (postId) {
            const { userId } =
                await auth();

            if (!userId) {
                return NextResponse.json(
                    {
                        success: false,
                        error:
                            "Unauthorized",
                    },
                    {
                        status: 401,
                    }
                );
            }

            if (
                !ObjectId.isValid(
                    postId
                )
            ) {
                return NextResponse.json(
                    {
                        success: false,
                        error:
                            "Invalid post ID",
                    },
                    {
                        status: 400,
                    }
                );
            }

            const post =
                await posts.findOne({
                    _id:
                        new ObjectId(
                            postId
                        ),
                    author: userId,
                });

            if (!post) {
                return NextResponse.json(
                    {
                        success: false,
                        error:
                            "Post not found",
                    },
                    {
                        status: 404,
                    }
                );
            }

            return NextResponse.json({
                success: true,
                post:
                    formatPost(post),
            });
        }

        /*
         * =================================
         * ADMIN — GET ALL OF MY POSTS
         * =================================
         */
        if (isAdminRequest) {
            const { userId } =
                await auth();

            if (!userId) {
                return NextResponse.json(
                    {
                        success: false,
                        error:
                            "Unauthorized",
                    },
                    {
                        status: 401,
                    }
                );
            }

            const results =
                await posts
                    .find({
                        author:
                            userId,
                    })
                    .sort({
                        createdAt: -1,
                    })
                    .toArray();

            return NextResponse.json({
                success: true,

                posts:
                    results.map(
                        formatPost
                    ),
            });
        }

        /*
         * =================================
         * PUBLIC — PUBLISHED POSTS ONLY
         * =================================
         */

        const results =
            await posts
                .find({
                    status:
                        "published",
                })
                .sort({
                    publishedAt: -1,
                    createdAt: -1,
                })
                .toArray();

        return NextResponse.json({
            success: true,

            posts:
                results.map(
                    formatPost
                ),
        });
    } catch (error) {
        console.error(
            "GET /api/get-posts:",
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