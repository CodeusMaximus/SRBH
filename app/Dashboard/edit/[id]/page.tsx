"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import CreatePost from "../../../components/createpost"

export default function EditPostPage() {
    const params = useParams();
    const router = useRouter();
    const postId = params?.id as string;

    const [post, setPost] = useState<any>(null);
    const [loading, setLoading] = useState(true);

    // Fetch post by ID
    useEffect(() => {
        const fetchPost = async () => {
            try {
                const res = await fetch(`/api/get-posts?id=${postId}`);
                const data = await res.json();

                if (data.success && data.post) {
                    setPost(data.post);
                } else {
                    console.error("Post not found");
                }
            } catch (err) {
                console.error("Error fetching post:", err);
            } finally {
                setLoading(false);
            }
        };

        if (postId) fetchPost();
    }, [postId]);

    if (loading) {
        return (
            <div className="flex items-center justify-center min-h-screen">
                <p>Loading post...</p>
            </div>
        );
    }

    if (!post) {
        return (
            <div className="flex items-center justify-center min-h-screen">
                <p>Post not found</p>
            </div>
        );
    }

    return (
        <div className="p-6">
            <h1 className="text-2xl font-bold mb-6">Edit Post</h1>

            <CreatePost
                post={post}
                onPostCreated={() => {
                    router.push("/Dashboard?tab=posts");
                }}
            />
        </div>
    );
}