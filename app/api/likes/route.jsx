import { mongooseConnect } from "../../../lib/mongoose";
import Like from "../../../models/Like";
import Post from "../../../models/Post";
import { NextResponse } from "next/server";

const updateLikesCount = async (postId) => {
  const post = await Post.findById(postId)
  post.likesCount = await Like.countDocuments({post: postId})
  await post.save()
}

export async function POST(req) {
  await mongooseConnect()
  const data = await req.json()
  const {userId, postId} = data

  const existingLike = await Like.findOne({author: userId, post: postId})
  if(existingLike) {
    await Like.findOneAndDelete({_id:existingLike?._id})
    await updateLikesCount(postId)
    return NextResponse.json(null)

  } else {
    const like = await Like.create({author: userId, post: postId})
    await updateLikesCount(postId)
    return NextResponse.json({like})
  }
}