import ReactTimeAgo from "react-time-ago";
import Avatar from "../avatar/Avatar";
import Link from "next/link";
import PostButtons from "../postButtons/PostButons";

export default function PostContent({text, author, createdAt, _id, big=false}) {
  return (
    <div>
      <div className="flex gap-2 text-sm w-full">
        <div>
          <Avatar src={author?.image} />
        </div>
        <div className="grow">
          <div>
            <span className="font-bold pr-1">
              {author?.name}
            </span>
            {big && <br />}
            <span className="text-twitterLightGray">
              @{author?.username}
            </span>
            <span className="text-twitterLightGray pl-1">
              {createdAt && !big && (
                <div className="inline-block">
                · <ReactTimeAgo 
                    date={createdAt} 
                    timeStyle={'twitter'}
                    locale="en-US"
                  />
                </div>
              )}
            </span>
          </div>
          {!big && (
            <div>
              <div className="my-0.5 mb-2">
                <Link href={`/${author?.username}/status/${_id}`}>
                  {text}
                </Link>
              </div>
              <PostButtons />
            </div>
          )}
        </div>
      </div>
      {big && (
        <div className="my-3 flex flex-col gap-3">
          <div>
            {text}
          </div>
          
          <div className="flex items-center gap-1 text-sm text-twitterLightGray">
            {createdAt && (
              <Link 
                href={`/${author?.username}/status/${_id}`} 
                className="hover:underline"
              >
                {(new Date(createdAt))
                  .toISOString()
                  .replace('T',' · ')
                  .slice(0,18)
                  .split(' · ')
                  .reverse()
                  .join(' · ')
                }
              </Link>
            )}

          · <p>
              <span className="font-bold text-twitterWhite">0.0M</span>
              <span className="pl-1">View</span>
            </p>
          </div>

          <div className="border-t border-b border-twitterBorder py-3">
            <PostButtons big />
          </div>
        </div>

      )}
    </div>
  )
}