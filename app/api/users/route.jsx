import { mongooseConnect } from "@/lib/mongoose";
import User from "@/models/User";
import { NextResponse } from "next/server"

export async function GET(req) {
  await mongooseConnect()

  const url = new URL(req.url);
  const id = url.searchParams.get('id');

  const UserDoc = await User.findById(id)

  return NextResponse.json({UserDoc})
}

export async function PUT(req) {
  await mongooseConnect()
  const data = await req.json()
  const { username, id } = data

  await User.findByIdAndUpdate(id, {username})

  return NextResponse.json(200)
}