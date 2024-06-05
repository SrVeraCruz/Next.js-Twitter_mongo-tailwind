import { mongooseConnect } from "@/lib/mongoose";
import User from "@/models/User";
import { NextResponse } from "next/server"

export async function GET(req) {
  await mongooseConnect()

  const url = new URL(req.url);
  const id = url.searchParams.get('id');
  const username = url.searchParams.get('username');

  if(id && id !== '') {
    const userDoc = await User.findById(id)

    return NextResponse.json({userDoc})
  } else if(username && username !== '') {
    const userDoc = await User.find({username}).limit(1)

    return NextResponse.json({userDoc})
  }
  
  return NextResponse.json(null)
}

export async function PUT(req) {
  await mongooseConnect()
  const data = await req.json()
  const { username, id } = data

  await User.findByIdAndUpdate(id, {username})

  return NextResponse.json(200)
}