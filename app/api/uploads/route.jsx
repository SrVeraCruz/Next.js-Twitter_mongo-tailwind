import User from "../../../models/User";
import { NextResponse } from "next/server";

export async function POST(req) {
  const data = await req.json()
  const { userId, cover, avatar } = data

  const user = await User.findById(userId)

  if(cover) {
    user.cover = cover
    user.save()
  } else if(avatar) {
    user.image = avatar
    user.save()
  }

  return NextResponse.json({
    user,
    cover,
    avatar,
  })
}