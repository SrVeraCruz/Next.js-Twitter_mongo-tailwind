import useUserInfo from "@/hooks/useUserInfo"
import axios from "axios"
import { useState } from "react"
import Avatar from "../avatar/Avatar"
import Link from "next/link"

export default function PostForm({
  onPost, 
  compact, 
  placeholder="What's happening",
  parent
}) {
  const {userInfo, status} = useUserInfo({})
  const [text, setText] = useState('')

  const handlePost = async (ev) => {
    ev.preventDefault()

    const data = { author: userInfo?._id, text, parent }
    await axios.post('/api/posts', data)
      .catch(err => {
        console.error(err.data)
      })
      
    setText('')
    if(onPost) {
      onPost()
    }
  }

  if(status === 'loading') {
    return ''
  }

  return (
    <form onSubmit={handlePost} className="px-4">
      <div className={(compact ? 'items-center' : '')+" flex"}>
        <Link href={'/'+userInfo?.username} >
          <Avatar src={userInfo?.image} />
        </Link>
        <div className={(compact ? 'mr-2' : '')+" grow pl-2"}>
          <textarea 
            className={(compact ? 'h-10 mt-1' : '')+" w-full p-2 bg-transparent outline-none"} 
            placeholder={placeholder}
            value={text}
            onChange={ev => setText(ev.target.value)}
          />
          {!compact && (
            <div className="text-right border-t border-twitterBorder py-2">
              <button 
                className="bg-twitterBlue text-white px-5 py-1 rounded-full self-end"
              >
                Post
              </button>
            </div>
          )}
        </div>
        {compact && (
          <button 
          className="bg-twitterBlue text-white px-5 py-1 rounded-full"
          >
            Reply
          </button>
        )}
      </div>
    </form>
  )
}