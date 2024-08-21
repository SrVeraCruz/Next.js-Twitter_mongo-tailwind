import Follow from "../../../models/Follow";
import { NextResponse } from "next/server";

export async function POST(req) {
  const data = await req.json()
  const { source, destination } = data

  const existingFollow = await Follow.findOne({source,destination})
  if(existingFollow) {
    // await existingFollow.remove()
    await Follow.findByIdAndDelete(existingFollow?._id)

    return NextResponse.json(null)
  } else {
    const followDoc = await Follow.create({
      source,
      destination
    })
    
    return NextResponse.json({followDoc})
  }

}