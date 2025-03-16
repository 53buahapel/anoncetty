"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import Header from "@/components/Header";

export default function CreatePost() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      <main className="flex-1 flex items-center justify-center px-4 ">
        <div className="w-full max-w-md rounded-md p-6 border-2 border-[#144949] shadow-md bg-[#F4E5DA]">
          <h2 className="mb-4 text-xl font-semibold text-center">
            Buat Thread Kamu Disini!
          </h2>

          <form className="space-y-4">
            <Input
              type="text"
              placeholder="Tulis Nama Kamu Disini..."
              className="w-ful placeholder:text-[#144949]/50l"
            />

            <Textarea
              placeholder="Apa yang ingin kamu sampaikan?"
              className="w-full placeholder:text-[#144949]/50"
            />

            <div className="grid w-full max-w-sm items-center gap-1.5 placeholder:text-[#144949]/50">
              <Label htmlFor="picture">Picture</Label>
              <Input id="picture" type="file" accept="image/*" />
            </div>

            <Button
              type="submit"
              className="w-full"
            >
              Kirim
            </Button>
          </form>
        </div>
      </main>
    </div>
  );
}
