import useUserInfo from "../../hooks/useUserInfo"
import axios from "axios"
import Link from "next/link"
import { useState } from "react"
import FlipNumbers from "react-flip-numbers"

export default function PostButtons({
  big=false,
  postId,
  username,
  likesCount: likesCountDefault = 0,
  likedByMe: likedByMeDefault = false,
  commentsCount = 0,
}) {

  const {userInfo} = useUserInfo()
  const [likesCount, setLikesCount] = useState(likesCountDefault)
  const [likedByMe, setlikedByMe] = useState(likedByMeDefault)

  const handleToggleLike = async (ev) => {
    ev.preventDefault()
    const data = {userId: userInfo?._id, postId}
    await axios.post('/api/likes', data)
      .then(res => {
        if(res.data?.like) {
          setLikesCount(prev => prev+1)
          setlikedByMe(true)
        } else {
          setLikesCount(prev => prev-1)
          setlikedByMe(false)
        }
      })
      .catch(err => {
        console.error(err.message)
      })
  }

  return (
    <div className="flex gap-2 justify-between text-twitterLightGray text-sm w-full">
      <Link 
        href={`/${username}/status/${postId}`} 
        className={"flex gap-1 items-center hover:text-twitterBlue group"} 
      >
        <div className={"relative w-6 h-6 "+(!big ? '-ml-2.5' : '')}>
          <div 
            className={(big ? '-top-[0.45rem] -left-0.5' : '-top-[0.3rem] left-0.5')+" absolute group-hover:bg-twitterBlue/10  transition-all duration-200 ease-in-out rounded-full p-2"}
          > 
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" className={(big ? 'size-5' : 'size-4')+" fill-inherit"}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 20.25c4.97 0 9-3.694 9-8.25s-4.03-8.25-9-8.25S3 7.444 3 12c0 2.104.859 4.023 2.273 5.48.432.447.74 1.04.586 1.641a4.483 4.483 0 0 1-.923 1.785A5.969 5.969 0 0 0 6 21c1.282 0 2.47-.402 3.445-1.087.81.22 1.668.337 2.555.337Z" />
            </svg>
          </div>
        </div>
        <span>
          <FlipNumbers 
            height={12} 
            width={12} 
            play 
            perspective={100} 
            numbers={commentsCount.toString()} 
          />
        </span>
      </Link>
      {/* <button className="flex gap-1 items-center hover:text-twitterGreen group">
        <div className={"relative w-6 h-6 "+(!big ? '-ml-2.5' : '')}>
          <div 
            className={(big ? '-top-[0.45rem] -left-0.5' : '-top-[0.3rem] left-0.5')+" absolute group-hover:bg-twitterGreen/10 group-hover:text-twitterGreen  transition-all duration-200 ease-in-out rounded-full p-2"}
          > 
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" className={big ? 'size-5' : 'size-4'}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 12c0-1.232-.046-2.453-.138-3.662a4.006 4.006 0 0 0-3.7-3.7 48.678 48.678 0 0 0-7.324 0 4.006 4.006 0 0 0-3.7 3.7c-.017.22-.032.441-.046.662M19.5 12l3-3m-3 3-3-3m-12 3c0 1.232.046 2.453.138 3.662a4.006 4.006 0 0 0 3.7 3.7 48.656 48.656 0 0 0 7.324 0 4.006 4.006 0 0 0 3.7-3.7c.017-.22.032-.441.046-.662M4.5 12l3 3m-3-3-3 3" />
            </svg>
          </div>
        </div>
        <span>
          <FlipNumbers 
            height={12} 
            width={12} 
            play 
            perspective={100} 
            numbers={'0'} 
          />
        </span>
      </button> */}
      <button 
        className={(likedByMe ? 'fill-twitterRose text-twitterRose' : '')+" flex gap-1 items-center hover:text-twitterRose group"} 
        onClick={handleToggleLike}
      >
        <div className="relative w-6 h-6">
          <div className={(big ? '-top-[0.45rem] -left-0.5' : '-top-[0.3rem] left-0.5')+" absolute group-hover:bg-twitterRose/10  transition-all duration-200 ease-in-out rounded-full p-2"}> 
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" className={(big ? 'size-5' : 'size-4')+" fill-inherit" }>
              <path strokeLinecap="round" strokeLinejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12Z" />
            </svg>
          </div>
        </div>
        <span>
          <FlipNumbers 
            height={12} 
            width={12} 
            play 
            perspective={100} 
            numbers={likesCount.toString()} 
          />
        </span>
      </button>
      {/* {big 
      ? <button className="flex gap-1 items-center hover:text-twitterBlue group">
          <div className={"relative w-6 h-6 "+(!big ? '-ml-2.5' : '')}>
            <div 
              className={(big ? '-top-[0.45rem] -left-0.5' : '-top-[0.3rem] left-0.5')+" absolute group-hover:bg-twitterBlue/10  transition-all duration-200 ease-in-out rounded-full p-2"}
            > 
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" className={big ? 'size-5' : 'size-4'}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M17.593 3.322c1.1.128 1.907 1.077 1.907 2.185V21L12 17.25 4.5 21V5.507c0-1.108.806-2.057 1.907-2.185a48.507 48.507 0 0 1 11.186 0Z" />
              </svg>
            </div>
          </div>
          <span>
            <FlipNumbers 
              height={12} 
              width={12} 
              play 
              perspective={100} 
              numbers={'0'} 
            />
          </span>
        </button>

      : <button className="flex gap-1 items-center hover:text-twitterBlue group">
          <div className={"relative w-6 h-6 "+(!big ? '-ml-2.5' : '')}>
            <div 
              className={(big ? '-top-[0.45rem] -left-0.5' : '-top-[0.3rem] left-0.5')+" absolute group-hover:bg-twitterBlue/10  transition-all duration-200 ease-in-out rounded-full p-2"}
            > 
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" className={big ? 'size-5' : 'size-4'}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M2.036 12.322a1.012 1.012 0 0 1 0-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178Z" />
                <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
              </svg>
            </div>
          </div>
          <span>
            <FlipNumbers 
              height={12} 
              width={12} 
              play 
              perspective={100} 
              numbers={'0'} 
            />
          </span>
        </button>
      } */}
      
      {/* <div className="flex gap-3">
        {!big && (
          <button className="flex gap-1 items-center hover:text-twitterBlue group">
            <div className={"relative w-6 h-6 "+(!big ? '-ml-2.5' : '')}>
              <div 
                className={(big ? '-top-[0.45rem] -left-0.5' : '-top-[0.3rem] left-0.5')+" absolute group-hover:bg-twitterBlue/10  transition-all duration-200 ease-in-out rounded-full p-2"}
              > 
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" className={big ? 'size-5' : 'size-4'}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M17.593 3.322c1.1.128 1.907 1.077 1.907 2.185V21L12 17.25 4.5 21V5.507c0-1.108.806-2.057 1.907-2.185a48.507 48.507 0 0 1 11.186 0Z" />
                </svg>
              </div>
            </div>
          </button>
        )}

        <button 
          className="hover:text-twitterBlue group"
          >
          <div className={"relative w-6 h-6 "+(!big ? '-ml-2.5' : '')}>
            <div 
              className={(big ? '-top-[0.45rem] -left-0.5' : '-top-[0.3rem] left-0.5')+" absolute group-hover:bg-twitterBlue/10  transition-all duration-200 ease-in-out rounded-full p-2"}
            > 
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" className={big ? 'size-5' : 'size-4'}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M3 16.5v2.25A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75V16.5m-13.5-9L12 3m0 0 4.5 4.5M12 3v13.5" />
              </svg>
            </div>
          </div>
        </button>
      </div> */}
    </div>
  )
}