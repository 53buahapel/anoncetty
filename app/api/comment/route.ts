import { PrismaClient } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";
const prisma = new PrismaClient();

let commentsData: Record<string, { id: string; content: string; author: string }[]> = {};

export async function POST(request: Request) {
  const { searchParams } = new URL(request.url);
  const threadId = searchParams.get("id");
  if (!threadId) {
    return NextResponse.json({ error: "Post ID is required" }, { status: 400 });
  }
  const body = await request.json();
  const { content } = body;
  if (!content || content.trim() === "") {
    return NextResponse.json({ error: "Content is required" }, { status: 400 });
  }
  const newComment = {
    id: Date.now().toString(),
    content,
    author: "You",
  };

  const postComments = await prisma.comments.create({
    data: {
      content,
      threadId: threadId,
    },
  });

  if (!commentsData[threadId]) {
    commentsData[threadId] = [];
  }
  commentsData[threadId].push(newComment);
  return NextResponse.json(newComment, { status: 201 });
}
