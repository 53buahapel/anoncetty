import { NextRequest, NextResponse } from "next/server";

export async function GET(params : NextRequest) {
  return NextResponse.json({
    message: `My name is ${params.nextUrl.searchParams.get("name")}`
  });
}

export async function POST(request : NextRequest) {
  const body = await request.json();
  console.log(body);

  return NextResponse.json({ 
    message: "Hello World"
  });
}