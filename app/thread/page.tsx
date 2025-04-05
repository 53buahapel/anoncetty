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
    deletedAt?: string | null;
  } | null>(null);
  const [comments, setComments] = useState<
    { id: string; content: string; author: string }[]
  >([]);
  const [newComment, setNewComment] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPostDetails = async () => {
      if (!postId) return;

      setLoading(true);
      try {
        const response = await fetch(`/api/thread?id=${postId}`, {
          method: "GET",
          cache: "no-store",
        });
        const data = await response.json();
        console.log("Fetched post data:", data);

        const currentTime = new Date();
        const deletedAtTime = data?.deletedAt
          ? new Date(data.deletedAt)
          : null;

        // Show the post if deletedAt is null or in the future
        if (data && (!deletedAtTime || deletedAtTime > currentTime)) {
          setPost(data);
          console.log("Post data:", data);
          setComments(Array.isArray(data.Comments) ? data.Comments : []); // Use Comments from API response
        } else {
          setPost(null); // Treat as not found if deletedAt is in the past
          setComments([]); // Clear comments if post is not found
          console.log("Post data:", data);
        }
      } catch (error) {
        console.error("Error fetching post details:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchPostDetails();
  }, [postId]);

  const handleCommentSubmit = async () => {
    if (!newComment.trim()) return;

    try {
      const response = await fetch(`/api/comment?id=${postId}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ content: newComment }),
      });

      if (response.ok) {
        const addedComment = await response.json();
        setComments((prev) => [...prev, addedComment]);
        setNewComment("");
      } else {
        console.error("Failed to add comment");
      }
    } catch (error) {
      console.error("Error submitting comment:", error);
    }
  };

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
              className="w-full max-w-md h-auto mb-4 rounded mx-auto"
            />
          )}
          <p className="text-lg">{post.content}</p>
        </div>
      </main>
      <section className="w-full max-w-2xl mx-auto mt-6 p-4">
        <h2 className="text-xl font-bold mb-4">Diskusi</h2>
        <div className="space-y-4">
          {comments.length > 0 ? (
            comments.map((comment) => (
              <div
                key={comment.id}
                className="p-4 border-2 border-[#144949] rounded-md bg-[#F4E5DA] shadow-md transition-transform transform hover:scale-105 hover:shadow-lg"
              >
                <p className="font-semibold text-[#144949]">{comment.author}</p>
                <p className="text-[#144949]">{comment.content}</p>
              </div>
            ))
          ) : (
            <p className="text-gray-500">Belum ada diskusi, jadilah orang pertama yang memberi pesan!</p>
          )}
        </div>
        <div className="mt-6">
          <textarea
            value={newComment}
            onChange={(e) => setNewComment(e.target.value)}
            placeholder="Tulis pesan anda..."
            className="w-full p-2 border-2 border-[#144949] rounded-md bg-[#F4E5DA] text-[#144949] focus:outline-none focus:ring-2 focus:ring-[#144949]"
          />
          <button
            onClick={handleCommentSubmit}
            className="mt-2 px-4 py-2 bg-[#144949] text-white rounded-md hover:bg-[#0f3737] transition-colors"
          >
            Kirim
          </button>
        </div>
      </section>
    </div>
  );
}
