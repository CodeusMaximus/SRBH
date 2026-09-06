import {
  NextRequest,
  NextResponse,
} from "next/server";

import {
  auth,
} from "@clerk/nextjs/server";

import {
  put,
  del,
} from "@vercel/blob";

import {
  ObjectId,
} from "mongodb";

import slugify from "slugify";

import {
  connectToDatabase,
} from "../../lib/mongodb";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

/* ============================================================
   TYPES
============================================================ */

type PostStatus =
  | "draft"
  | "published"
  | "scheduled";

/* ============================================================
   HELPERS
============================================================ */

function cleanFilename(
  filename: string
) {
  return filename
    .replace(
      /[^a-zA-Z0-9._-]/g,
      "-"
    )
    .replace(/-+/g, "-");
}

function isValidStatus(
  status: string
): status is PostStatus {
  return [
    "draft",
    "published",
    "scheduled",
  ].includes(status);
}

function serializePost(
  post: Record<string, any>
) {
  return {
    ...post,

    id:
      post._id?.toString?.() ??
      post.id,

    _id:
      post._id?.toString?.() ??
      post._id,
  };
}

/* ============================================================
   UNIQUE SLUG
============================================================ */

async function createUniqueSlug(
  db: any,
  title: string,
  excludeId?: ObjectId
) {
  const baseSlug =
    slugify(title, {
      lower: true,
      strict: true,
      trim: true,
    }) || `post-${Date.now()}`;

  let uniqueSlug = baseSlug;
  let counter = 1;

  while (true) {
    const query: Record<
      string,
      any
    > = {
      slug: uniqueSlug,
    };

    if (excludeId) {
      query._id = {
        $ne: excludeId,
      };
    }

    const existing =
      await db
        .collection("posts")
        .findOne(query);

    if (!existing) {
      return uniqueSlug;
    }

    uniqueSlug =
      `${baseSlug}-${counter}`;

    counter++;
  }
}

/* ============================================================
   BLOB UPLOAD
============================================================ */

async function uploadImages(
  files: File[],
  userId: string
): Promise<string[]> {
  const urls: string[] = [];

  for (const file of files) {
    if (
      !file ||
      file.size === 0
    ) {
      continue;
    }

    /*
     * Only allow images.
     */
    if (
      !file.type.startsWith(
        "image/"
      )
    ) {
      throw new Error(
        `${file.name} is not an image`
      );
    }

    /*
     * 10 MB limit per image.
     * Change this if you want.
     */
    const MAX_FILE_SIZE =
      10 * 1024 * 1024;

    if (
      file.size >
      MAX_FILE_SIZE
    ) {
      throw new Error(
        `${file.name} exceeds the 10 MB upload limit`
      );
    }

    const filename =
      cleanFilename(
        file.name ||
        "blog-image"
      );

    const pathname =
      `blog-images/${userId}/${Date.now()}-${crypto.randomUUID()}-${filename}`;

    const blob =
      await put(
        pathname,
        file,
        {
          access: "public",
          contentType:
            file.type ||
            undefined,

          addRandomSuffix:
            false,
        }
      );

    urls.push(blob.url);
  }

  return urls;
}

/* ============================================================
   POST
   CREATE BLOG POST
============================================================ */

export async function POST(
  req: NextRequest
) {
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

  try {
    const formData =
      await req.formData();

    const title =
      String(
        formData.get(
          "title"
        ) || ""
      ).trim();

    const content =
      String(
        formData.get(
          "content"
        ) || ""
      ).trim();

    const rawStatus =
      String(
        formData.get(
          "status"
        ) || "draft"
      );

    const status: PostStatus =
      isValidStatus(
        rawStatus
      )
        ? rawStatus
        : "draft";

    const tags =
      formData
        .getAll("tags")
        .map((tag) =>
          String(
            tag
          ).trim()
        )
        .filter(Boolean);

    const imageFiles =
      formData
        .getAll("images")
        .filter(
          (
            item
          ): item is File =>
            item instanceof
            File &&
            item.size >
            0
        );

    if (!title) {
      return NextResponse.json(
        {
          success: false,
          error:
            "Post title is required.",
        },
        {
          status: 400,
        }
      );
    }

    if (!content) {
      return NextResponse.json(
        {
          success: false,
          error:
            "Post content is required.",
        },
        {
          status: 400,
        }
      );
    }

    const { db } =
      await connectToDatabase();

    const posts =
      db.collection(
        "posts"
      );

    const slug =
      await createUniqueSlug(
        db,
        title
      );

    /*
     * Upload images to
     * Vercel Blob.
     */
    const imageUrls =
      await uploadImages(
        imageFiles,
        userId
      );

    const now =
      new Date();

    const newPost = {
      title,
      content,
      slug,

      author: userId,

      status,

      tags,

      images:
        imageUrls,

      /*
       * Also store the first
       * image separately.
       * This keeps compatibility
       * with your existing blog UI.
       */
      image:
        imageUrls[0] ||
        "",

      published:
        status ===
        "published",

      publishedAt:
        status ===
          "published"
          ? now
          : null,

      views: 0,

      createdAt: now,
      updatedAt: now,
    };

    const result =
      await posts.insertOne(
        newPost
      );

    const createdPost = {
      ...newPost,

      _id:
        result.insertedId.toString(),

      id:
        result.insertedId.toString(),
    };

    return NextResponse.json(
      {
        success: true,
        post: createdPost,
      },
      {
        status: 201,
      }
    );
  } catch (error) {
    console.error(
      "POST /api/dashpost:",
      error
    );

    return NextResponse.json(
      {
        success: false,
        error:
          "Failed to create post",

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

/* ============================================================
   GET
   ADMIN POSTS
============================================================ */

export async function GET(
  req: NextRequest
) {
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

  try {
    const { db } =
      await connectToDatabase();

    const {
      searchParams,
    } = new URL(req.url);

    const isPublished =
      searchParams.get(
        "published"
      ) === "true";

    const query: Record<
      string,
      any
    > = {
      author: userId,
    };

    if (isPublished) {
      query.status =
        "published";
    }

    const posts =
      await db
        .collection(
          "posts"
        )
        .find(query)
        .sort({
          createdAt: -1,
        })
        .toArray();

    return NextResponse.json({
      success: true,

      posts:
        posts.map(
          serializePost
        ),
    });
  } catch (error) {
    console.error(
      "GET /api/dashpost:",
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

/* ============================================================
   PUT
   PUBLISH / UNPUBLISH / EDIT
============================================================ */

export async function PUT(
  req: NextRequest
) {
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

  try {
    const { db } =
      await connectToDatabase();

    const posts =
      db.collection(
        "posts"
      );

    const {
      searchParams,
    } = new URL(req.url);

    const postId =
      searchParams.get(
        "postId"
      );

    const action =
      searchParams.get(
        "action"
      );

    if (
      !postId ||
      !ObjectId.isValid(
        postId
      )
    ) {
      return NextResponse.json(
        {
          success: false,
          error:
            "Valid post ID is required",
        },
        {
          status: 400,
        }
      );
    }

    const _id =
      new ObjectId(
        postId
      );

    /*
     * Author check prevents one
     * authenticated account from
     * modifying another author's
     * post.
     */
    const existingPost =
      await posts.findOne({
        _id,
        author: userId,
      });

    if (!existingPost) {
      return NextResponse.json(
        {
          success: false,
          error:
            "Post not found or you do not have permission to modify it",
        },
        {
          status: 404,
        }
      );
    }

    const now =
      new Date();

    /* ---------------------------
       PUBLISH
    --------------------------- */

    if (
      action ===
      "publish"
    ) {
      await posts.updateOne(
        {
          _id,
          author:
            userId,
        },
        {
          $set: {
            status:
              "published",
            published:
              true,
            publishedAt:
              now,
            updatedAt:
              now,
          },
        }
      );
    }

    /* ---------------------------
       UNPUBLISH
    --------------------------- */

    else if (
      action ===
      "unpublish"
    ) {
      await posts.updateOne(
        {
          _id,
          author:
            userId,
        },
        {
          $set: {
            status:
              "draft",
            published:
              false,
            publishedAt:
              null,
            updatedAt:
              now,
          },
        }
      );
    }

    /* ---------------------------
       EDIT
    --------------------------- */

    else if (
      action === "edit"
    ) {
      const formData =
        await req.formData();

      const title =
        String(
          formData.get(
            "title"
          ) || ""
        ).trim();

      const content =
        String(
          formData.get(
            "content"
          ) || ""
        ).trim();

      const tags =
        formData
          .getAll(
            "tags"
          )
          .map((tag) =>
            String(
              tag
            ).trim()
          )
          .filter(
            Boolean
          );

      const imageFiles =
        formData
          .getAll(
            "images"
          )
          .filter(
            (
              item
            ): item is File =>
              item instanceof
              File &&
              item.size >
              0
          );

      const update: Record<
        string,
        any
      > = {
        updatedAt:
          now,
      };

      if (title) {
        update.title =
          title;

        if (
          title !==
          existingPost.title
        ) {
          update.slug =
            await createUniqueSlug(
              db,
              title,
              _id
            );
        }
      }

      if (content) {
        update.content =
          content;
      }

      /*
       * We set tags even if
       * empty so an admin can
       * remove all tags.
       */
      update.tags =
        tags;

      /*
       * If new images were
       * selected, upload them
       * to Blob and replace
       * the post's image list.
       */
      if (
        imageFiles.length >
        0
      ) {
        const newImageUrls =
          await uploadImages(
            imageFiles,
            userId
          );

        update.images =
          newImageUrls;

        update.image =
          newImageUrls[0] ||
          "";

        /*
         * Delete the old Blob
         * images after the new
         * ones upload.
         */
        const oldImages:
          | string[]
          | undefined =
          Array.isArray(
            existingPost.images
          )
            ? existingPost.images
            : existingPost.image
              ? [
                existingPost.image,
              ]
              : [];

        const blobImages =
          oldImages.filter(
            (
              url
            ) =>
              typeof url ===
              "string" &&
              url.includes(
                ".blob.vercel-storage.com"
              )
          );

        if (
          blobImages.length >
          0
        ) {
          try {
            await del(
              blobImages
            );
          } catch (
          blobDeleteError
          ) {
            console.error(
              "Old Blob cleanup failed:",
              blobDeleteError
            );
          }
        }
      }

      await posts.updateOne(
        {
          _id,
          author:
            userId,
        },
        {
          $set: update,
        }
      );
    } else {
      return NextResponse.json(
        {
          success: false,
          error:
            "Invalid action",
        },
        {
          status: 400,
        }
      );
    }

    const updatedPost =
      await posts.findOne({
        _id,
        author: userId,
      });

    return NextResponse.json({
      success: true,

      message:
        `Post ${action} successful`,

      post:
        updatedPost
          ? serializePost(
            updatedPost
          )
          : null,
    });
  } catch (error) {
    console.error(
      "PUT /api/dashpost:",
      error
    );

    return NextResponse.json(
      {
        success: false,
        error:
          "Failed to modify post",

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

/* ============================================================
   DELETE
============================================================ */

export async function DELETE(
  req: NextRequest
) {
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

  try {
    const { db } =
      await connectToDatabase();

    const posts =
      db.collection(
        "posts"
      );

    const {
      searchParams,
    } = new URL(req.url);

    const postId =
      searchParams.get(
        "postId"
      );

    if (
      !postId ||
      !ObjectId.isValid(
        postId
      )
    ) {
      return NextResponse.json(
        {
          success: false,
          error:
            "Valid post ID is required",
        },
        {
          status: 400,
        }
      );
    }

    const _id =
      new ObjectId(
        postId
      );

    const post =
      await posts.findOne({
        _id,
        author: userId,
      });

    if (!post) {
      return NextResponse.json(
        {
          success: false,
          error:
            "Post not found or you do not have permission to delete it",
        },
        {
          status: 404,
        }
      );
    }

    /*
     * Delete associated Blob
     * images first.
     */
    const imageUrls: string[] =
      Array.isArray(
        post.images
      )
        ? post.images
        : post.image
          ? [post.image]
          : [];

    const blobUrls =
      imageUrls.filter(
        (url) =>
          typeof url ===
          "string" &&
          url.includes(
            ".blob.vercel-storage.com"
          )
      );

    if (
      blobUrls.length > 0
    ) {
      try {
        await del(
          blobUrls
        );
      } catch (
      blobDeleteError
      ) {
        /*
         * Don't prevent deletion
         * of the database record
         * because Blob cleanup
         * failed.
         */
        console.error(
          "Blob cleanup failed:",
          blobDeleteError
        );
      }
    }

    const result =
      await posts.deleteOne({
        _id,
        author: userId,
      });

    if (
      result.deletedCount !==
      1
    ) {
      return NextResponse.json(
        {
          success: false,
          error:
            "Failed to delete post",
        },
        {
          status: 500,
        }
      );
    }

    return NextResponse.json({
      success: true,
      message:
        "Post deleted successfully",
    });
  } catch (error) {
    console.error(
      "DELETE /api/dashpost:",
      error
    );

    return NextResponse.json(
      {
        success: false,
        error:
          "Failed to delete post",

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