"use client";

import React, {
  useEffect,
  useRef,
  useState,
} from "react";

import {
  motion,
} from "framer-motion";

import {
  FileText,
  Save,
  Edit,
  Tag,
  ChevronDown,
  Bold,
  Italic,
  Underline,
  Image as ImageIcon,
  Loader,
  X,
} from "lucide-react";

import Image from "next/image";

/* ============================================================
   TYPES
============================================================ */

type PostStatus =
  | "draft"
  | "published"
  | "scheduled";

interface ExistingPost {
  id?: string;
  _id?: string;

  title?: string;
  content?: string;

  status?: PostStatus;

  tags?: string[];

  image?: string;

  images?: string[];
}

interface CreatePostProps {
  post?: ExistingPost;

  onPostCreated?: () => void;
}

/* ============================================================
   TAG INPUT
============================================================ */

const TagInput = ({
  tags,
  onAddTag,
  onRemoveTag,
}: {
  tags: string[];

  onAddTag:
  (tag: string) => void;

  onRemoveTag:
  (tag: string) => void;
}) => {
  const [
    newTag,
    setNewTag,
  ] =
    useState("");

  const handleAddTag =
    () => {
      const cleaned =
        newTag.trim();

      if (
        !cleaned ||
        tags.includes(
          cleaned
        )
      ) {
        return;
      }

      onAddTag(
        cleaned
      );

      setNewTag(
        ""
      );
    };

  return (
    <div>
      <div className="mb-2 flex items-center space-x-2">
        <input
          type="text"
          value={
            newTag
          }
          onChange={(
            e
          ) =>
            setNewTag(
              e
                .target
                .value
            )
          }
          onKeyDown={(
            e
          ) => {
            if (
              e.key ===
              "Enter"
            ) {
              e.preventDefault();

              handleAddTag();
            }
          }}
          placeholder="Add a tag"
          className="flex-1 rounded-lg border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#FAB2FF]"
        />

        <button
          type="button"
          onClick={
            handleAddTag
          }
          className="rounded-lg bg-gray-100 px-4 py-2 hover:bg-gray-200"
        >
          Add
        </button>
      </div>

      <div className="flex flex-wrap gap-2">
        {tags.map(
          (
            tag
          ) => (
            <span
              key={
                tag
              }
              className="flex items-center rounded-full bg-blue-100 px-2 py-1 text-xs text-blue-800"
            >
              {
                tag
              }

              <button
                type="button"
                onClick={() =>
                  onRemoveTag(
                    tag
                  )
                }
                className="ml-2 text-blue-600 hover:text-blue-800"
              >
                &times;
              </button>
            </span>
          )
        )}
      </div>
    </div>
  );
};

/* ============================================================
   FONT OPTIONS
============================================================ */

const FONT_FAMILIES =
  [
    "Arial",
    "Times New Roman",
    "Courier New",
    "Verdana",
    "Georgia",
    "Palatino Linotype",
  ];

const FONT_SIZES =
  [
    "12px",
    "14px",
    "16px",
    "18px",
    "20px",
    "24px",
    "28px",
    "32px",
  ];

/* ============================================================
   COMPONENT
============================================================ */

export default function CreatePost({
  post,
  onPostCreated,
}: CreatePostProps) {
  const [
    title,
    setTitle,
  ] =
    useState("");

  const [
    content,
    setContent,
  ] =
    useState("");

  const [
    status,
    setStatus,
  ] =
    useState<PostStatus>(
      "draft"
    );

  const [
    tags,
    setTags,
  ] =
    useState<
      string[]
    >([]);

  /*
   * New images selected
   * from the user's computer.
   */

  const [
    images,
    setImages,
  ] =
    useState<
      File[]
    >([]);

  /*
   * Browser previews for
   * newly selected files.
   */

  const [
    imagePreviews,
    setImagePreviews,
  ] =
    useState<
      string[]
    >([]);

  /*
   * Existing Blob URLs when
   * editing an existing post.
   */

  const [
    existingImages,
    setExistingImages,
  ] =
    useState<
      string[]
    >([]);

  const [
    isSubmitting,
    setIsSubmitting,
  ] =
    useState(
      false
    );

  const [
    uploadProgress,
    setUploadProgress,
  ] =
    useState<
      number | null
    >(null);

  const [
    errorMessage,
    setErrorMessage,
  ] =
    useState<
      string | null
    >(null);

  const [
    formatting,
    setFormatting,
  ] =
    useState({
      bold:
        false,

      italic:
        false,

      underline:
        false,

      fontFamily:
        "Arial",

      fontSize:
        "16px",
    });

  const fileInputRef =
    useRef<HTMLInputElement>(
      null
    );

  const contentRef =
    useRef<HTMLTextAreaElement>(
      null
    );

  /* ========================================================
     LOAD POST FOR EDIT MODE
  ======================================================== */

  useEffect(
    () => {
      if (!post) {
        return;
      }

      setTitle(
        post.title ||
        ""
      );

      setContent(
        post.content ||
        ""
      );

      setStatus(
        post.status ||
        "draft"
      );

      setTags(
        Array.isArray(
          post.tags
        )
          ? post.tags
          : []
      );

      if (
        Array.isArray(
          post.images
        ) &&
        post.images.length >
        0
      ) {
        setExistingImages(
          post.images
        );
      } else if (
        post.image
      ) {
        setExistingImages(
          [
            post.image,
          ]
        );
      } else {
        setExistingImages(
          []
        );
      }
    },
    [post]
  );

  /* ========================================================
     CLEAN PREVIEW URLS
  ======================================================== */

  useEffect(
    () => {
      return () => {
        imagePreviews.forEach(
          (
            preview
          ) => {
            URL.revokeObjectURL(
              preview
            );
          }
        );
      };
    },
    [
      imagePreviews,
    ]
  );

  /* ========================================================
     TAGS
  ======================================================== */

  const handleAddTag =
    (
      tag: string
    ) => {
      setTags(
        (
          previous
        ) => {
          if (
            previous.includes(
              tag
            )
          ) {
            return previous;
          }

          return [
            ...previous,
            tag,
          ];
        }
      );
    };

  const handleRemoveTag =
    (
      tagToRemove: string
    ) => {
      setTags(
        (
          previous
        ) =>
          previous.filter(
            (
              tag
            ) =>
              tag !==
              tagToRemove
          )
      );
    };

  /* ========================================================
     IMAGE SELECTION
  ======================================================== */

  const handleImageUpload =
    (
      e: React.ChangeEvent<HTMLInputElement>
    ) => {
      const files =
        Array.from(
          e.target
            .files ||
          []
        );

      if (
        files.length ===
        0
      ) {
        return;
      }

      const invalidFile =
        files.find(
          (
            file
          ) =>
            !file.type.startsWith(
              "image/"
            )
        );

      if (
        invalidFile
      ) {
        setErrorMessage(
          `${invalidFile.name} is not an image.`
        );

        e.target.value =
          "";

        return;
      }

      const MAX_SIZE =
        10 *
        1024 *
        1024;

      const oversized =
        files.find(
          (
            file
          ) =>
            file.size >
            MAX_SIZE
        );

      if (
        oversized
      ) {
        setErrorMessage(
          `${oversized.name} is larger than 10 MB.`
        );

        e.target.value =
          "";

        return;
      }

      /*
       * Selecting a new image
       * means the backend will
       * replace the existing
       * Blob image on edit.
       */

      imagePreviews.forEach(
        (
          preview
        ) =>
          URL.revokeObjectURL(
            preview
          )
      );

      const previews =
        files.map(
          (
            file
          ) =>
            URL.createObjectURL(
              file
            )
        );

      setImages(
        files
      );

      setImagePreviews(
        previews
      );

      setErrorMessage(
        null
      );

      /*
       * Allow selecting same
       * file again later.
       */

      e.target.value =
        "";
    };

  /* ========================================================
     REMOVE NEW IMAGE
  ======================================================== */

  const handleRemoveImage =
    (
      index: number
    ) => {
      const preview =
        imagePreviews[
        index
        ];

      if (
        preview
      ) {
        URL.revokeObjectURL(
          preview
        );
      }

      setImages(
        (
          previous
        ) =>
          previous.filter(
            (
              _,
              i
            ) =>
              i !==
              index
          )
      );

      setImagePreviews(
        (
          previous
        ) =>
          previous.filter(
            (
              _,
              i
            ) =>
              i !==
              index
          )
      );
    };

  /* ========================================================
     FORMATTING
  ======================================================== */

  const applyFormatting =
    (
      type:
        | "bold"
        | "italic"
        | "underline"
    ) => {
      const textarea =
        contentRef.current;

      if (
        !textarea
      ) {
        return;
      }

      const start =
        textarea.selectionStart;

      const end =
        textarea.selectionEnd;

      const selectedText =
        content.substring(
          start,
          end
        );

      if (
        !selectedText
      ) {
        return;
      }

      let formattedText =
        selectedText;

      if (
        type ===
        "bold"
      ) {
        formattedText =
          `**${selectedText}**`;
      }

      if (
        type ===
        "italic"
      ) {
        formattedText =
          `*${selectedText}*`;
      }

      if (
        type ===
        "underline"
      ) {
        formattedText =
          `<u>${selectedText}</u>`;
      }

      const newContent =
        content.substring(
          0,
          start
        ) +
        formattedText +
        content.substring(
          end
        );

      setContent(
        newContent
      );

      setFormatting(
        (
          previous
        ) => ({
          ...previous,

          [type]:
            !previous[
            type
            ],
        })
      );

      requestAnimationFrame(
        () => {
          textarea.focus();
        }
      );
    };

  /* ========================================================
     SUBMIT
  ======================================================== */

  const handleSubmit =
    async (
      e: React.FormEvent
    ) => {
      e.preventDefault();

      if (
        !title.trim() ||
        !content.trim()
      ) {
        setErrorMessage(
          "Please provide a title and content."
        );

        return;
      }

      setIsSubmitting(
        true
      );

      setUploadProgress(
        25
      );

      setErrorMessage(
        null
      );

      try {
        const formData =
          new FormData();

        formData.append(
          "title",
          title.trim()
        );

        formData.append(
          "content",
          content.trim()
        );

        formData.append(
          "status",
          status
        );

        tags.forEach(
          (
            tag
          ) => {
            formData.append(
              "tags",
              tag
            );
          }
        );

        /*
         * IMPORTANT:
         * Actual File objects
         * are sent here.
         */

        images.forEach(
          (
            image
          ) => {
            formData.append(
              "images",
              image,
              image.name
            );
          }
        );

        setUploadProgress(
          50
        );

        /*
         * API serializes Mongo
         * _id into id, but this
         * supports both shapes
         * for older posts.
         */

        const postId =
          post?.id ||
          post?._id;

        const isEditing =
          Boolean(
            postId
          );

        const endpoint =
          isEditing
            ? `/api/dashpost?postId=${encodeURIComponent(
              postId!
            )}&action=edit`
            : "/api/dashpost";

        console.log(
          "SUBMITTING POST:",
          {
            endpoint,

            isEditing,

            imageCount:
              images.length,

            images:
              images.map(
                (
                  image
                ) => ({
                  name:
                    image.name,

                  type:
                    image.type,

                  size:
                    image.size,
                })
              ),
          }
        );

        /*
         * DO NOT set the
         * Content-Type header.
         *
         * Browser creates the
         * multipart boundary.
         */

        const response =
          await fetch(
            endpoint,
            {
              method:
                isEditing
                  ? "PUT"
                  : "POST",

              body:
                formData,
            }
          );

        setUploadProgress(
          80
        );

        /*
         * Robust response
         * parsing so an HTML
         * Next error page
         * doesn't produce the
         * old JSON parse error.
         */

        const responseText =
          await response.text();

        let data:
          | Record<
            string,
            any
          >
          | null =
          null;

        try {
          data =
            responseText
              ? JSON.parse(
                responseText
              )
              : null;
        } catch {
          console.error(
            "NON-JSON API RESPONSE:",
            responseText
          );
        }

        if (
          !response.ok
        ) {
          throw new Error(
            data?.details ||
            data?.error ||
            `Post request failed with status ${response.status}`
          );
        }

        if (
          data &&
          data.success ===
          false
        ) {
          throw new Error(
            data.details ||
            data.error ||
            "Failed to save post."
          );
        }

        console.log(
          "POST SAVE SUCCESS:",
          data
        );

        setUploadProgress(
          100
        );

        /*
         * Clean browser preview
         * URLs.
         */

        imagePreviews.forEach(
          (
            preview
          ) =>
            URL.revokeObjectURL(
              preview
            )
        );

        setTitle(
          ""
        );

        setContent(
          ""
        );

        setStatus(
          "draft"
        );

        setTags(
          []
        );

        setImages(
          []
        );

        setImagePreviews(
          []
        );

        setExistingImages(
          []
        );

        if (
          onPostCreated
        ) {
          onPostCreated();
        } else {
          window.location.href =
            "/Dashboard?tab=posts";
        }
      } catch (
      error
      ) {
        console.error(
          "ERROR SAVING POST:",
          error
        );

        setErrorMessage(
          error instanceof
            Error
            ? error.message
            : "Failed to save post. Please try again."
        );
      } finally {
        setIsSubmitting(
          false
        );

        setUploadProgress(
          null
        );
      }
    };

  /* ========================================================
     UI
  ======================================================== */

  return (
    <motion.div
      initial={{
        opacity:
          0,

        scale:
          0.95,
      }}
      animate={{
        opacity:
          1,

        scale:
          1,
      }}
      transition={{
        duration:
          0.3,
      }}
      className="mx-auto max-w-4xl rounded-xl border border-gray-100 bg-white p-6 shadow-lg"
    >
      <form
        onSubmit={
          handleSubmit
        }
        className="space-y-6"
      >
        <div>
          <h2 className="mb-4 flex items-center text-2xl font-bold">
            <FileText className="mr-3 h-6 w-6 text-[#1904E5]" />

            {post
              ? "Edit Post"
              : "Create New Post"}
          </h2>

          {/* ERROR */}

          {errorMessage && (
            <div className="mb-4 rounded-lg border border-red-200 bg-red-50 p-3 text-red-700">
              {
                errorMessage
              }
            </div>
          )}

          {/* TITLE */}

          <div className="mb-4">
            <label
              htmlFor="title"
              className="mb-2 block text-sm font-medium text-gray-700"
            >
              Post
              Title
            </label>

            <input
              id="title"
              type="text"
              value={
                title
              }
              onChange={(
                e
              ) =>
                setTitle(
                  e
                    .target
                    .value
                )
              }
              placeholder="Enter post title"
              className="w-full rounded-lg border border-gray-300 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-[#FAB2FF]"
              required
            />
          </div>

          {/* CONTENT */}

          <div className="mb-4">
            <label
              htmlFor="content"
              className="mb-2 block text-sm font-medium text-gray-700"
            >
              Post
              Content
            </label>

            {/* TOOLBAR */}

            <div className="mb-2 flex flex-wrap items-center gap-2 rounded-t-lg border-b bg-gray-50 p-2">
              <button
                type="button"
                onClick={() =>
                  applyFormatting(
                    "bold"
                  )
                }
                className="rounded p-1 hover:bg-gray-200"
                title="Bold"
              >
                <Bold className="h-4 w-4" />
              </button>

              <button
                type="button"
                onClick={() =>
                  applyFormatting(
                    "italic"
                  )
                }
                className="rounded p-1 hover:bg-gray-200"
                title="Italic"
              >
                <Italic className="h-4 w-4" />
              </button>

              <button
                type="button"
                onClick={() =>
                  applyFormatting(
                    "underline"
                  )
                }
                className="rounded p-1 hover:bg-gray-200"
                title="Underline"
              >
                <Underline className="h-4 w-4" />
              </button>

              <select
                value={
                  formatting.fontFamily
                }
                onChange={(
                  e
                ) =>
                  setFormatting(
                    (
                      previous
                    ) => ({
                      ...previous,

                      fontFamily:
                        e
                          .target
                          .value,
                    })
                  )
                }
                className="rounded border px-2 py-1 text-sm"
              >
                {FONT_FAMILIES.map(
                  (
                    family
                  ) => (
                    <option
                      key={
                        family
                      }
                      value={
                        family
                      }
                    >
                      {
                        family
                      }
                    </option>
                  )
                )}
              </select>

              <select
                value={
                  formatting.fontSize
                }
                onChange={(
                  e
                ) =>
                  setFormatting(
                    (
                      previous
                    ) => ({
                      ...previous,

                      fontSize:
                        e
                          .target
                          .value,
                    })
                  )
                }
                className="rounded border px-2 py-1 text-sm"
              >
                {FONT_SIZES.map(
                  (
                    size
                  ) => (
                    <option
                      key={
                        size
                      }
                      value={
                        size
                      }
                    >
                      {
                        size
                      }
                    </option>
                  )
                )}
              </select>

              <button
                type="button"
                onClick={() =>
                  fileInputRef.current?.click()
                }
                className="rounded p-1 hover:bg-gray-200"
                title="Upload image"
              >
                <ImageIcon className="h-4 w-4" />
              </button>

              <input
                type="file"
                ref={
                  fileInputRef
                }
                onChange={
                  handleImageUpload
                }
                accept="image/*"
                multiple
                className="hidden"
              />
            </div>

            {/* EXISTING BLOB IMAGES */}

            {existingImages.length >
              0 &&
              imagePreviews.length ===
              0 && (
                <div className="mb-3">
                  <p className="mb-2 text-xs font-medium uppercase tracking-wide text-gray-500">
                    Current
                    image
                  </p>

                  <div className="flex flex-wrap gap-3">
                    {existingImages.map(
                      (
                        url,
                        index
                      ) => (
                        <div
                          key={
                            url
                          }
                          className="relative h-24 w-24 overflow-hidden rounded-lg border bg-gray-50"
                        >
                          <Image
                            src={
                              url
                            }
                            alt={`Current image ${index + 1}`}
                            fill
                            unoptimized
                            className="object-cover"
                          />
                        </div>
                      )
                    )}
                  </div>
                </div>
              )}

            {/* NEW IMAGE PREVIEWS */}

            {imagePreviews.length >
              0 && (
                <div className="mb-3 rounded-lg bg-gray-50 p-3">
                  <p className="mb-2 text-xs font-medium uppercase tracking-wide text-gray-500">
                    New
                    image
                  </p>

                  <div className="flex flex-wrap gap-3">
                    {imagePreviews.map(
                      (
                        preview,
                        index
                      ) => (
                        <div
                          key={
                            preview
                          }
                          className="relative h-24 w-24 overflow-hidden rounded-lg border bg-white"
                        >
                          <Image
                            src={
                              preview
                            }
                            alt={`Upload ${index + 1}`}
                            fill
                            unoptimized
                            className="object-cover"
                          />

                          <button
                            type="button"
                            onClick={() =>
                              handleRemoveImage(
                                index
                              )
                            }
                            className="absolute right-1 top-1 flex h-6 w-6 items-center justify-center rounded-full bg-red-500 text-white shadow"
                          >
                            <X className="h-3.5 w-3.5" />
                          </button>
                        </div>
                      )
                    )}
                  </div>
                </div>
              )}

            <textarea
              ref={
                contentRef
              }
              id="content"
              value={
                content
              }
              onChange={(
                e
              ) =>
                setContent(
                  e
                    .target
                    .value
                )
              }
              placeholder="Write your post content here..."
              rows={
                12
              }
              style={{
                fontFamily:
                  formatting.fontFamily,

                fontSize:
                  formatting.fontSize,
              }}
              className="w-full rounded-lg border border-gray-300 px-4 py-3 focus:outline-none focus:ring-2 focus:ring-[#FAB2FF]"
              required
            />
          </div>

          {/* TAGS */}

          <div className="mb-4">
            <label className="mb-2 flex items-center text-sm font-medium text-gray-700">
              <Tag className="mr-2 h-4 w-4 text-gray-500" />

              Tags
            </label>

            <TagInput
              tags={
                tags
              }
              onAddTag={
                handleAddTag
              }
              onRemoveTag={
                handleRemoveTag
              }
            />
          </div>

          {/* STATUS */}

          <div className="mb-4">
            <label className="mb-2 flex items-center text-sm font-medium text-gray-700">
              <Edit className="mr-2 h-4 w-4 text-gray-500" />

              Post
              Status
            </label>

            <div className="relative">
              <select
                value={
                  status
                }
                onChange={(
                  e
                ) =>
                  setStatus(
                    e
                      .target
                      .value as PostStatus
                  )
                }
                className="w-full appearance-none rounded-lg border border-gray-300 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-[#FAB2FF]"
              >
                <option value="draft">
                  Draft
                </option>

                <option value="published">
                  Publish
                  Now
                </option>

                <option value="scheduled">
                  Schedule
                </option>
              </select>

              <ChevronDown className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-gray-400" />
            </div>
          </div>

          {/* PROGRESS */}

          {uploadProgress !==
            null && (
              <div className="mb-4">
                <div className="h-2.5 w-full rounded-full bg-gray-200">
                  <div
                    className="h-2.5 rounded-full bg-gradient-to-r from-[#FAB2FF] to-[#1904E5] transition-all duration-300"
                    style={{
                      width:
                        `${uploadProgress}%`,
                    }}
                  />
                </div>

                <p className="mt-1 text-center text-sm text-gray-500">
                  {uploadProgress <
                    100
                    ? images.length >
                      0
                      ? "Uploading image..."
                      : "Saving post..."
                    : "Post saved."}
                </p>
              </div>
            )}

          {/* SUBMIT */}

          <div className="flex justify-end">
            <button
              type="submit"
              disabled={
                isSubmitting
              }
              className={`flex items-center space-x-2 rounded-full px-6 py-2 text-white transition ${isSubmitting
                  ? "cursor-not-allowed bg-gray-400"
                  : "bg-gradient-to-r from-[#FAB2FF] to-[#1904E5] hover:opacity-90"
                }`}
            >
              {isSubmitting ? (
                <>
                  <Loader className="mr-2 h-4 w-4 animate-spin" />

                  <span>
                    Saving...
                  </span>
                </>
              ) : (
                <>
                  <Save className="mr-2 h-4 w-4" />

                  <span>
                    {post
                      ? "Update Post"
                      : "Save Post"}
                  </span>
                </>
              )}
            </button>
          </div>
        </div>
      </form>
    </motion.div>
  );
}