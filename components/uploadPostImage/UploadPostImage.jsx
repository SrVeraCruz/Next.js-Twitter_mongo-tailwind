import axios from "axios"
import { useState } from "react"
import { FileDrop } from "react-file-drop"
import Spinner from "../spinner/Spinner"

export default function UploadPostImage({children, onUploadFinish}) {
  const [isFileNearby, setIsFileNearby] = useState(false)
  const [isFileOver, setIsFileOver] = useState(false)
  const [isUploading, setIsUploading] = useState(false)

  const uploadImage = async (files, ev) => {
    ev.preventDefault()
    
    setIsUploading(true)
    
    const imageSrc = await saveImage(files[0])
    if(onUploadFinish) {
      onUploadFinish(imageSrc)
    }
    setIsUploading(false)  
  }

  const saveImage = async (file) => {
    const data = new FormData()
    data.append('file', file)
    data.append('upload_preset', process.env.NEXT_PUBLIC_UPLOAD_PRESET)

    return await axios.post(process.env.NEXT_PUBLIC_UPLOAD_URL, data)
      .then(res => {
        return res.data.secure_url
      })
      .catch(err => {
        console.error(err.message)
      })
  }

  return (
    <FileDrop
      onDrop={uploadImage}
      onDragOver={() => setIsFileOver(true)}
      onDragLeave={() => setIsFileOver(false)}
      onFrameDragEnter={() => setIsFileNearby(true)}
      onFrameDragLeave={() => setIsFileNearby(false)}
      onFrameDrop={() => {
        setIsFileNearby(false)
        setIsFileOver(false)
      }}
    >
      <div className="relative">
        {(isFileNearby || isFileOver) && (
          <div className="absolute inset-0 bg-twitterBlue flex items-center justify-center font-semibold">
            drop image here
          </div>
        )}
        {isUploading === 'uploading' && (
          <div className="absolute inset-0 bg-twitterBlue flex items-center justify-center font-semibold">
            <Spinner color="#e8eaeb" />
          </div>
        )}
        {children({isUploading})}
      </div>
    </FileDrop>
  )
}