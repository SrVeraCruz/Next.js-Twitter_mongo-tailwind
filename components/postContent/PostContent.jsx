import ReactTimeAgo from "react-time-ago";
import Avatar from "../avatar/Avatar";
import Link from "next/link";
import PostButtons from "../postButtons/PostButons";

export default function PostContent({
  text, 
  author, 
  createdAt, 
  _id, 
  likesCount, 
  likedByMe,
  commentsCount,
  big=false
}) {

  return (
    <div>
      <div className="flex gap-2 text-sm w-full">
        <Link href={'/'+author?.username}>
          <Avatar src={author?.image} />
        </Link>
        <div className="grow">
          <div>
            <Link href={'/'+author?.username} className="font-bold pr-1 hover:underline">
              {author?.name}
            </Link>
            {big && <br />}
            <Link href={'/'+author?.username} className="text-twitterLightGray">
              @{author?.username}
            </Link>
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
                  <div className="w-full">
                    {text}
                  </div>
                </Link>
              </div>
              <PostButtons 
                big={big} 
                postId={_id} 
                username={author?.username}
                likesCount={likesCount}
                likedByMe={likedByMe}
                commentsCount={commentsCount}
              />
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
            <PostButtons 
              big={big} 
              postId={_id}
              username={author?.username}
              likesCount={likesCount} 
              likedByMe={likedByMe}
              commentsCount={commentsCount}
            />
          </div>
        </div>

      )}
    </div>
  )
}