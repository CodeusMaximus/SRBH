import { NextRequest, NextResponse } from "next/server";
import { auth } from "@clerk/nextjs/server";
import { connectToDatabase } from "../../lib/mongodb";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function GET(req: NextRequest) {
    try {
        const { searchParams } =
            new URL(req.url);

        const admin =
            searchParams.get("admin") === "true";

        /*
        =========================================================
        ADMIN AUTHENTICATION
        =========================================================
        */

        if (admin) {
            const {
                userId,
                sessionClaims,
            } = await auth();

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

            /*
             * Once we add your Clerk admin role,
             * we'll also verify:
             *
             * sessionClaims.metadata.role === "admin"
             *
             * For now the authenticated Clerk account
             * can access the admin post list.
             */
        }

        /*
        =========================================================
        DATABASE
        =========================================================
        */

        const { db } =
            await connectToDatabase();

        const collection =
            db.collection("posts");

        /*
        =========================================================
        QUERY
        =========================================================
        */

        const query = admin
            ? {}
            : {
                published: true,
            };

        const posts =
            await collection
                .find(query)
                .sort({
                    date: -1,
                    createdAt: -1,
                })
                .toArray();

        /*
        =========================================================
        NORMALIZE MONGODB DATA
        =========================================================
        */

        const formattedPosts =
            posts.map((post) => ({
                id:
                    post.id ||
                    post._id.toString(),

                title:
                    post.title || "",

                excerpt:
                    post.excerpt || "",

                content:
                    post.content || "",

                date:
                    post.date ||
                    post.createdAt ||
                    new Date(),

                image:
                    post.image || "",

                readTime:
                    post.readTime ||
                    "5 min",

                published:
                    post.published ??
                    false,

                createdAt:
                    post.createdAt ||
                    null,

                updatedAt:
                    post.updatedAt ||
                    null,
            }));

        return NextResponse.json(
            {
                success: true,
                posts:
                    formattedPosts,
            },
            {
                status: 200,
            }
        );
    } catch (error) {
        console.error(
            "GET POSTS ERROR:",
            error
        );

        return NextResponse.json(
            {
                success: false,
                error:
                    "Failed to retrieve posts.",
            },
            {
                status: 500,
            }
        );
    }
}