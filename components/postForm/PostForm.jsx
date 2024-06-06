import useUserInfo from "@/hooks/useUserInfo"
import axios from "axios"
import { useState } from "react"
import Avatar from "../avatar/Avatar"
import Link from "next/link"
import UploadPostImage from "../uploadPostImage/UploadPostImage"
import Spinner from "../spinner/Spinner"

export default function PostForm({
  onPost, 
  compact, 
  placeholder="What's happening",
  parent
}) {
  const {userInfo, status} = useUserInfo({})
  const [text, setText] = useState('')
  const [images, setImages] = useState([])

  const handlePost = async (ev) => {
    ev.preventDefault()

    const data = { author: userInfo?._id, text, images, parent }
    await axios.post('/api/posts', data)
      .catch(err => {
        console.error(err.data)
      })
      
    setText('')
    setImages([])
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
          <UploadPostImage 
            onUploadFinish={src => setImages(prev => [...prev, src])} 
          >
            {({isUploading}) => (
              <div>
                <textarea 
                  className={(compact ? 'h-10 mt-1' : '')+" w-full p-2 bg-transparent outline-none"} 
                  placeholder={placeholder}
                  value={text}
                  onChange={ev => setText(ev.target.value)}
                />
                <div className="grid grid-cols-4">
                  {!!images.length && images.map((src, key) => (
                    <div 
                      key={key}
                      className="m-2 rounded-lg overflow-hidden flex items-center justify-center h-[7.125rem] border border-twitterBorder"
                    >
                      <img src={src} alt="imagePost" />
                    </div>
                  ))}

                  {isUploading && (
                    <div
                      className="flex items-center justify-center h-32 w-32"
                    >
                      <Spinner />
                    </div>
                  )}
                </div>
              </div>
            )}
          </UploadPostImage>
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