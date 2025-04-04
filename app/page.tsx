"use client";

import { Suspense, useEffect, useState } from "react";
import Link from "next/link";
import Header from "@/components/Header";
import { Button } from "@/components/ui/button";
import PostsSkeleton from "@/components/PostsSkeleton";
import Image from "next/image";

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
            className="h-40 bg-card text-card-foreground p-2 border border-border rounded-md flex text-lg font-semibold shadow transition-all duration-500">
            {fetchThread ? (
              <PostsSkeleton /> // Single rectangle skeleton
            ) : (
              <div className="flex space-x-2">
                <div className="">
                  <Image src="/Indomie_Logo.png" alt="placeholder" width={100} height={100} /> 
                </div>
                <div className="">
                  <p>
                    Post {i + 1}
                  </p>
                  <span className="text-sm text-muted-foreground">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Konoha sukiyo ohayo makan laper aku lagi puasa hmmm.</span>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>


    </div>
  );
}
