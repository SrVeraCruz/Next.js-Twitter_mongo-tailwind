import User from "@/models/User";
import { NextResponse } from "next/server";

export async function POST(req) {
  const data = await req.json()
  const { userId, cover } = data

  const user = await User.findByIdAndUpdate(userId, {cover:cover})

  return NextResponse.json({
    user,
    cover
  })
}