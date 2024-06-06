import { NextResponse } from "next/server"
import { mongooseConnect } from "@/lib/mongoose"
import Like from "@/models/Like"
import Post from "@/models/Post"
import User from "@/models/User"
import Follow from "@/models/Follow"

export async function PUT(req) {
  await mongooseConnect()

  const url = new URL(req.url)
  const id = url.searchParams.get('id')
  const author = url.searchParams.get('author')
  
  const data = await req.json()
  const { userId } = data
  
  if(id && id !== '') {
    const postData = await Post.findById(id)
    .populate('author')
    .populate({
      path: 'parent',
      populate: 'author'
    })

    const postLikedByMe = await Like.find({
      author: userId,
      post: id
    }).limit(1)

    const idLikedByMe = postLikedByMe[0]?.post

    return NextResponse.json({
      postData,
      idLikedByMe
    })
  } else if(author && author !== '') { 
    const postsData = await Post.find({author, parent: null})
      .populate('author')

    const postsLikedByMe = await Like.find({author: userId})
    const idsLikedByMe = postsLikedByMe.map(pl => pl.post)

    return NextResponse.json({
      postsData,
      idsLikedByMe
    })
  } else {
    let serchFilter
    const parent = url.searchParams.get('parent') || null
    if(!parent) {
      const myFollows = await Follow.find({source: userId})
      const idsMyFollows = myFollows.map(mf => mf.destination)
      serchFilter = {author: [...idsMyFollows, userId]}
    }

    if(parent) {
      serchFilter = {parent}
    }

    const postsData = await Post.find(serchFilter)
    .sort({createdAt: -1})
    .limit(20)
    .populate('author')
    .populate({
      path: 'parent',
      populate: 'author'
    })
    
    const postsLikedByMe = await Like.find({
      author: userId,
      post: postsData.map(p => p._id)
    })
    
    const idsLikedByMe = postsLikedByMe.map(pl => pl.post)
    
    return NextResponse.json({
      postsData,
      idsLikedByMe,
    })
  }

}


export async function POST(req) {
  await mongooseConnect()

  const data = await req.json()
  const { author, text, images, parent } = data

  await Post.create({
    author,
    text,
    images,
    parent
  })

  const user = await User.findById(author)
  user.postsCount = await Post.countDocuments({author})
  user.save()

  if (parent) {
    const postParent = await Post.findById(parent)
    postParent.commentsCount = await Post.countDocuments({parent})
    postParent.save();
  }

  return NextResponse.json(200)
}