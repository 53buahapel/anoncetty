"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import Header from "@/components/Header";
import Popup from "@/components/Popup"; // Import the Popup component

export default function CreatePost() {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [pictureUrl, setPictureUrl] = useState("");
  const [error, setError] = useState("");
  const [popupMessage, setPopupMessage] = useState("");
  const [showPopup, setShowPopup] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!title || !content) {
      setError("Title and content are required.");
      return;
    }

    try {
      if (pictureUrl) {
        new URL(pictureUrl); // Validate URL if provided
      }
      setError("");

      const response = await fetch("/api/thread", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          title,
          content,
          image_url: pictureUrl || "/next.svg", // Use default image if none provided
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to post data.");
      }

      // Show success popup and redirect
      setPopupMessage("Post created successfully!");
      setShowPopup(true);
      setTimeout(() => {
        setShowPopup(false);
        router.push("/");
      }, 2000);
    } catch (err) {
      setPopupMessage((err as Error).message || "An error occurred.");
      setShowPopup(true);
      setTimeout(() => setShowPopup(false), 3000);
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1 flex items-center justify-center px-4 ">
        <div className="w-full max-w-md rounded-md p-6 border-2 border-[#144949] shadow-md bg-[#F4E5DA]">
          <h2 className="mb-4 text-xl font-semibold text-center">
            Buat Thread Kamu Disini!
          </h2>

          <form className="space-y-4" onSubmit={handleSubmit}>
            <Input
              type="text"
              placeholder="Judulnya disini..."
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full placeholder:text-[#144949]/50"
            />

            <Textarea
              placeholder="Apa yang ingin kamu sampaikan?"
              value={content}
              onChange={(e) => setContent(e.target.value)}
              className="w-full placeholder:text-[#144949]/50"
            />

            <div className="grid w-full max-w-sm items-center gap-1.5 placeholder:text-[#144949]/50">
              <Label htmlFor="picture">Image URL (optional)</Label>
              <Input
                id="picture"
                type="url"
                accept="image/*"
                value={pictureUrl}
                onChange={(e) => setPictureUrl(e.target.value)}
                className={error ? "border-red-500" : ""}
              />
            </div>

            {error && <p className="text-red-500 text-sm">{error}</p>}

            <Button
              type="submit"
              className="w-full"
            >
              Kirim
            </Button>
          </form>
        </div>
      </main>

      {showPopup && <Popup message={popupMessage} />}
    </div>
  );
}
