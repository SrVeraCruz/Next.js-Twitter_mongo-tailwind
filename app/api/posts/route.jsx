import { mongooseConnect } from "@/lib/mongoose"
import Post from "@/models/Post"
import { NextResponse } from "next/server"

export async function GET(req) {
  await mongooseConnect()

  const url = new URL(req.url)
  const id = url.searchParams.get('id')

  if(id && id !== '') {
    const postData = await Post.findById(id).populate('author')
    return NextResponse.json({
      postData
    })

  } else {
    const postsData = await Post.find().sort({createdAt: -1}).populate('author')
    return NextResponse.json({
      postsData
    })
  }

}

export async function POST(req) {
  await mongooseConnect()
  const data = await req.json()
  const { author, text } = data

  await Post.create({
    author,
    text,
  })

  return NextResponse.json(200)
}