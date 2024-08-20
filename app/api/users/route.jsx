import { mongooseConnect } from "@/lib/mongoose";
import Follow from "@/models/Follow";
import User from "@/models/User";
import { NextResponse } from "next/server"

export async function GET(req) {
  await mongooseConnect()

  const url = new URL(req.url);
  const id = url.searchParams.get('id');
  const userId = url.searchParams.get('userId')
  const source = url.searchParams.get('source');
  const username = url.searchParams.get('username');

  if(id && id !== '') {
    const userDoc = await User.findById(id)
    
    return NextResponse.json({userDoc})
  } else if(username && username !== '') {
    const userDoc = await User.findOne({username}).limit(1)
    const followingByMe = await Follow.findOne({source, destination:userDoc?._id})

    return NextResponse.json({userDoc, followingByMe})
  } else if(userId && userId !== '') {
    const myFollows = await Follow.find({source: userId})
    const idsMyFollows = myFollows.map(mf => mf.destination)

    const usersDoc = await User.find({
      _id: { $nin: [...idsMyFollows, userId] }
    }).limit(3);
    
    return NextResponse.json({usersDoc})
  }
  
  return NextResponse.json(null)
}

export async function PUT(req) {
  await mongooseConnect()
  const data = await req.json()
  const { name, username, bio, id } = data

  const url = new URL(req.url)
  const update = url.searchParams.get('update')

  if(update && update === 'profile') {
    await User.findByIdAndUpdate(id, {name, username, bio})
  } else {
    await User.findByIdAndUpdate(id, {username})
  }

  return NextResponse.json(200)
}