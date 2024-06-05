'use client'

import axios from "axios";
import { useState } from "react";
import { FileDrop } from "react-file-drop";
import Spinner from "../spinner/Spinner";

export default function Cover({userId=null, src=''}) {
  const [isFileNearby, setIsFileNearby] = useState(false)
  const [isFileOver, setIsFileOver] = useState(false)
  const [uploadingStatus, setUploadingStatus] = useState('')
  const [cover, setCover] = useState(src)
  
  let dragStyle = ''
  if(isFileNearby) dragStyle += ' bg-blue-500/30';
  if(isFileOver) dragStyle += ' bg-blue-500/50 border-2 border-dashed border-twitterBlue';

  const updateCover = async (files, ev) => {
    ev.preventDefault()
    setIsFileNearby(false)
    setIsFileOver(false)
    setUploadingStatus('uploading')

    const coverImage = await saveCoverImage(files[0])
    await axios.post('/api/uploads', {userId, cover: coverImage})
      .then(res => {
        setCover(res.data.cover)
        setUploadingStatus('done')
        console.log(res.data)
      })
      .catch(err => {
        console.error(err.message)
      })
    
  }

  const saveCoverImage = async (file) => {
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

  if(!userId) {
    return (
      <div className={"h-48 bg-twitterBorder "}>
        {cover && (
          <div className="h-full w-full">
            <img className="h-full w-full object-cover" src={cover} alt="cover" />
          </div>
        )}
      </div>
    )
  }

  return (
    <FileDrop 
      onDrop={updateCover}
      onDragOver={() => setIsFileOver(true)}
      onDragLeave={() => setIsFileOver(false)}
      onFrameDragEnter={() => setIsFileNearby(true)}
      onFrameDragLeave={() => setIsFileNearby(false)}
    >
      <div className={"h-48 overflow-hidden relative bg-twitterBorder "+dragStyle}>
        <div className={"absolute inset-0 opacity-70 "+dragStyle}></div>
        {uploadingStatus === 'uploading' && (
          <div className="flex items-center justify-center h-full relative">
            <div className={"absolute inset-0 opacity-70 bg-blue-500/50"}></div>
            <Spinner />
          </div>
        )}
  
        {src && (
          <div className="h-full w-full">
            <img className="h-full w-full object-cover" src={cover} alt="cover" />
          </div>
        )}
      </div>
    </FileDrop>
  )
}