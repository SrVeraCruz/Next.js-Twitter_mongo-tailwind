import Avatar from "../avatar/Avatar";
import Link from "next/link";

export default function People({
  user
}) {

  return (
    <div className={"relative"}>
      <div className="flex gap-2 text-sm w-full">
        <div className="flex flex-col">
          <Link href={'/'+user?.username}>
            <Avatar src={user?.image} />
          </Link>
        </div>
        <div className="grow">
          <div className="flex gap-4 justify-between">
            <div>
              <Link 
                href={'/'+user?.username} 
                className="font-bold pr-1 hover:underline text-nowrap"
              >
                {user?.name}
              </Link>
              <br />
              <Link 
                href={'/'+user?.username} 
                className="text-twitterLightGray"
              >
                @{user?.username}
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}