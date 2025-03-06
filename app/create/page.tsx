"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";

export default function CreatePost() {
  return (
    <div className="min-h-screen flex flex-col">
      <header className="relative py-4 shadow-sm bg-[#F4E5DA] text-[#144949]">
        <h1 className="text-3xl font-bold text-center">AnonCetty</h1>

        <img
          src="/Indomie_logo.png"
          alt="AnonCetty"
          className="absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10"
        />
      </header>

      <main className="flex-1 flex items-center justify-center px-4 ">
        <div className="w-full max-w-md rounded-md p-6 border-2 border-[#144949] shadow-md">
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
              <Input id="picture" type="file" />
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
