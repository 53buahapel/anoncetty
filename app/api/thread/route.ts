import { PrismaClient } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";
const prisma = new PrismaClient();

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const id = searchParams.get("id");
  if (!id) {
    return NextResponse.json({ message: "ID is required" }, { status: 400 });
  }
  const post = await prisma.threads.findUnique({
    where: {
      id,
      deletedAt: {
        gte: new Date(),
      },
    },
    include: {
      Comments: true,
    },
  });
  if (!post) {
    return NextResponse.json({ message: "Post not found" }, { status: 404 });
  }
  return NextResponse.json(post);
}

export async function POST(request: NextRequest) {
  const body = await request.json();
  console.log(body);

  const { title, content, image_url } = body;
  if (!title || !content) {
    return NextResponse.json({ message: "Title and content are required" }, { status: 400 });
  }

  const date = new Date();
  const deletedAt = new Date(date.getTime() + 7 * 24 * 60 * 60 * 1000);

  // save to prisma
  const post = await prisma.threads.create({
    data: {
      title,
      content,
      image_url,
      deletedAt,
    },
  });

  return NextResponse.json(post, { status: 201 });
}