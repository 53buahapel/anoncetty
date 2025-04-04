"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import Header from "@/components/Header";
import { Button } from "@/components/ui/button";
import PostsSkeleton from "@/components/PostsSkeleton";

export default function Home() {
  interface Post {
    id: string; // Changed to string for UUID compatibility
    title: string;
    content: string;
    image_url?: string;
  }

  const [posts, setPosts] = useState<Post[]>([]); // Store fetched posts
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  useEffect(() => {
    const fetchThreads = async () => {
      setLoading(true);
      try {
        const response = await fetch(`/api/posts?page=${page}`, {
          method: "GET",
          cache: "no-store",
        });
        const data = await response.json();
        setPosts(data.posts);
        setTotalPages(data.totalPages);
      } catch (error) {
        console.error("Error fetching posts:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchThreads();
  }, [page]); // Refetch when `page` changes

  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      {/* Create Post Button */}
      <div className="flex justify-center mt-6">
        <Link href="/create">
          <Button className="bg-primary text-primary-foreground px-6 py-2 hover:bg-primary/90">
            Create Post
          </Button>
        </Link>
      </div>

      {/* Posts */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 p-6">
        {loading ? (
          Array.from({ length: posts.length || 6 }).map((_, i) => <PostsSkeleton key={i} />)
        ) : (
          posts.map((post) => (
            <Link
              key={post.id}
              href={`/thread?id=${post.id}`} // Link to thread page
              className="h-40 bg-card text-card-foreground p-2 border border-border rounded-md flex text-lg font-semibold shadow transition-all duration-500 cursor-pointer hover:shadow-lg hover:scale-105 active:scale-95"
            >
              <div className="flex space-x-2">
                <div>
                  <Image
                    src={post.image_url && post.image_url.trim() ? post.image_url : "/placeholder.png"}
                    alt="Post Image"
                    width={100}
                    height={100}
                  />
                </div>
                <div>
                  <p>{post.title}</p>
                  <span className="text-sm text-muted-foreground">{post.content}</span>
                </div>
              </div>
            </Link>
          ))
        )}
      </div>

      {/* Pagination Controls */}
      <div className="flex justify-center my-4 space-x-4">
        <Button disabled={page === 1} onClick={() => setPage(page - 1)}>
          Previous
        </Button>
        <span className="text-lg">
          Page {page} of {totalPages}
        </span>
        <Button disabled={page === totalPages} onClick={() => setPage(page + 1)}>
          Next
        </Button>
      </div>
    </div>
  );
}
