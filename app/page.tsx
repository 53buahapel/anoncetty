"use client";

import { Suspense, useEffect, useState } from "react";
import Link from "next/link";
import Header from "@/components/Header";
import { Button } from "@/components/ui/button";
import PostsSkeleton from "@/components/PostsSkeleton";

export default function Home() {
  const [fetchThread, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 800);
    return () => clearTimeout(timer);
  }, []);

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
      <div className="grid grid-cols-3 gap-6 p-6">
        {Array.from({ length: 6 }).map((_, i) => (
          <div
            key={i}
            className="h-40 bg-card text-card-foreground border border-border rounded-md flex items-center justify-center text-lg font-semibold shadow transition-all duration-500">
            {fetchThread ? (
              <PostsSkeleton /> // Single rectangle skeleton
            ) : (
              <p>Post {i + 1}</p> // Final content
            )}
          </div>
        ))}
      </div>


    </div>
  );
}
