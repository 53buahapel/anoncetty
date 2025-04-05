import { PrismaClient } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";
const prisma = new PrismaClient();

export async function GET(params : NextRequest) {
  const { searchParams } = new URL(params.url);
  const page = searchParams.get("page") || "1";
  const pageSize = 6;

  const posts = await prisma.threads.findMany({
    skip: (parseInt(page) - 1) * pageSize,
    take: pageSize,
    where: {
      deletedAt: {
        gte: new Date(),
      },
    },
    orderBy: {
      createdAt: "desc",
    },
  });
  const totalPosts = await prisma.threads.count();

  return NextResponse.json({
    posts,
    page: parseInt(page),
    totalPages: Math.ceil(totalPosts / pageSize),
  });
}
