"use client";

import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import Header from "@/components/Header";

export default function ThreadPage() {
  const searchParams = useSearchParams();
  const postId = searchParams.get("id");

  const [post, setPost] = useState<{
    title: string;
    content: string;
    image_url?: string;
  } | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPostDetails = async () => {
      if (!postId) return;

      setLoading(true);
      try {
        const response = await fetch(`/api/post?id=${postId}`, {
          method: "GET",
          cache: "no-store",
        });
        const data = await response.json();
        setPost(data);
      } catch (error) {
        console.error("Error fetching post details:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchPostDetails();
  }, [postId]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p>Loading...</p>
      </div>
    );
  }

  if (!post) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p>Post not found.</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1 flex items-center justify-center px-4">
        <div className="w-full max-w-2xl rounded-md p-6 border-2 border-[#144949] shadow-md bg-[#F4E5DA]">
          <h1 className="text-2xl font-bold mb-4">{post.title}</h1>
          {post.image_url && (
            <img
              src={post.image_url}
              alt="Post Image"
              className="w-full h-auto mb-4 rounded"
            />
          )}
          <p className="text-lg">{post.content}</p>
        </div>
      </main>
    </div>
  );
}
