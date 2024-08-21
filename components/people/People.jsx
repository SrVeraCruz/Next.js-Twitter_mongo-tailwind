import { useState } from "react";
import Avatar from "../avatar/Avatar";
import Link from "next/link";
import FollowButton from "../followButton/FollowButton";

export default function People({
  profileInfo,
  userId
}) {
  const [isFollowing, setIsFollowing] = useState(false)

  return (
    <div className={"relative"}>
      <div className="flex gap-2 text-sm w-full mr-2">
        <div className="flex flex-col">
          <Link href={'/'+profileInfo?.username}>
            <Avatar src={profileInfo?.image} />
          </Link>
        </div>
        <div className="grow">
          <div className="flex gap-4 justify-between">
            <div className="max-w-32 truncate">
              <Link 
                href={'/'+profileInfo?.username} 
                className="font-bold pr-1 hover:underline"
              >
                {profileInfo?.name}
              </Link>
              <br />
              <Link 
                href={'/'+profileInfo?.username} 
                className="text-twitterLightGray"
              >
                @{profileInfo?.username}
              </Link>
            </div>
          </div>
        </div>
        <FollowButton 
          profileId={profileInfo._id} 
          userId={userId} 
          setIsFollowing={setIsFollowing} 
          isFollowing={isFollowing} 
          className="!self-start py-1.5"
        />
      </div>
    </div>
  )
}