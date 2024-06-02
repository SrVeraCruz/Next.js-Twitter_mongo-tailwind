import useUserInfo from "@/hooks/useUserInfo"
import axios from "axios"
import { useState } from "react"
import Avatar from "../avatar/Avatar"

export default function PostForm({onPost}) {
  const {userInfo, status} = useUserInfo()
  const [text, setText] = useState('')

  const handlePost = async (ev) => {
    ev.preventDefault()

    const data = { author: userInfo?._id, text }
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
      <div className="flex">
        <Avatar src={userInfo?.image} />
        <div className="grow pl-2">
          <textarea 
            className="w-full p-2 bg-transparent outline-none" 
            placeholder="What's happening" 
            value={text}
            onChange={ev => setText(ev.target.value)}
          />
          <div className="text-right border-t border-twitterBorder py-2">
            <button 
              className="bg-twitterBlue text-white px-5 py-1 rounded-full self-end"
            >
              Post
            </button>
          </div>
        </div>
      </div>
    </form>
  )
}