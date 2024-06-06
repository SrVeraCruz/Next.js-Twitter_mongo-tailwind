import ReactTimeAgo from "react-time-ago";
import Avatar from "../avatar/Avatar";
import Link from "next/link";
import PostButtons from "../postButtons/PostButons";

export default function PostContent({
  text, 
  images,
  author, 
  createdAt, 
  _id, 
  likesCount, 
  likedByMe,
  commentsCount,
  big=false,
  extend=false
}) {

  const schowImage = () => {
    return (
      <div className={"grid "+(images?.length === 1 ? 'grid-cols-1' : 'grid-cols-2')}>
        {!!images?.length && images.map((src, key) => (
          <div 
            key={key} 
            className="m-2 border border-twitterBorder p-4 rounded-3xl overflow-hidden flex items-center justify-center max-h-[90vh]"
          >
            <img src={src} alt="imagePost" className="h-full w-full object-cover" />
          </div>
        ))}
      </div>
    )
  }

  return (
    <div 
      className={"relative "+(big ? 'cursor-default' : '')}>
      {/* {!big && (
        <div 
          className={"absolute hover:bg-twitterWhite/10 transition "+(extend ? '-inset-5 bottom-14' : '-inset-5 bottom-14')} 
        />
      )} */}
      <div className="flex gap-2 text-sm w-full">
        <div className="flex flex-col">
          <Link href={'/'+author?.username}>
            <Avatar src={author?.image} />
          </Link>
          {extend && (
            <div className="grow flex items-center justify-center my-1">
              <div className="h-full w-[0.14rem] bg-twitterBorder" />
            </div>
          )}
        </div>
        <div className="grow">
          <div className="flex gap-4 justify-between">
            <div>
              <Link 
                href={'/'+author?.username} 
                className="font-bold pr-1 hover:underline"
              >
                {author?.name}
              </Link>
              {big && <br />}
              <Link 
                href={'/'+author?.username} 
                className="text-twitterLightGray"
              >
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

            <div className="relative">
              <button className=" stroke-twitterLightGray hover:stroke-twitterBlue hover:bg-twitterBlue/10 p-1 absolute top-0 right-0 rounded-full transition">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-6 stroke-inherit">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 12a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0ZM12.75 12a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0ZM18.75 12a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Z" />
                </svg>
              </button>
            </div>
          </div>
          {!big && (
            <div className={(extend ? 'mb-5' : '')}>
              <div className={"my-0.5 mb-2"}>
                <Link href={`/${author?.username}/status/${_id}`}>
                  <div className="w-full mb-4">
                    {text}
                  </div>
                  {schowImage()}
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
            <div>
              {text}
            </div>
            {schowImage()}
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