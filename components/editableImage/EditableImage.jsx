'use client'

import axios from "axios";
import { useState } from "react";
import { FileDrop } from "react-file-drop";
import Spinner from "../spinner/Spinner";

export default function EditableImage({
  userId=null, 
  src='', 
  className="",
  type,
  editable=false
}) {
  const [isFileNearby, setIsFileNearby] = useState(false)
  const [isFileOver, setIsFileOver] = useState(false)
  const [uploadingStatus, setUploadingStatus] = useState('')
  const [image, setImage] = useState(src)
  
  let dragStyle = ''
  if(isFileNearby) dragStyle += ' bg-blue-500/30';
  if(isFileOver) dragStyle += ' bg-blue-500/50 border-2 border-dashed !border-twitterBlue';

  const updateImage = async (files, ev) => {
    ev.preventDefault()
    // setIsFileNearby(false)
    // setIsFileOver(false)
    setUploadingStatus('uploading')

    const imageSrc = await saveImage(files[0])
    await axios.post('/api/uploads', {userId, [type]: imageSrc})
      .then(res => {
        setImage(res.data?.[type])
        setUploadingStatus('done')
      })
      .catch(err => {
        console.error(err.message)
      })
    
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


  if(!editable) {
    return (
      <div className={"bg-twitterBorder "+className}>
        {image && (
          <div className={"h-full w-full flex items-center justify-center "}>
            <img className="h-full w-full object-cover" src={image} alt={type} />
          </div>
        )}
      </div>
    )
  }
  
  return (
    <FileDrop 
      onDrop={updateImage}
      onDragOver={() => setIsFileOver(true)}
      onDragLeave={() => setIsFileOver(false)}
      onFrameDragEnter={() => setIsFileNearby(true)}
      onFrameDragLeave={() => setIsFileNearby(false)}
      onFrameDrop={() => {
        setIsFileNearby(false)
        setIsFileOver(false)
      }}
    >
      <div 
        className={"overflow-hidden relative flex items-center justify-center bg-twitterBorder group border-2 border-black "+dragStyle+" "+className}
      >
        <div 
          className={"absolute inset-0 opacity-0 group-hover:opacity-90 flex items-center justify-center gap-2 transition"}
        >
          {uploadingStatus !== (
            <button 
              className="p-2 h-10 bg-twitterBorder rounded-full border border-twitterWhite"
            >
              <img src="/drag-drop.png" className="h-full w-full" alt="drag-drop" />
            </button>
          )}
        </div>
        <div className={"absolute inset-0 opacity-70 "+dragStyle}></div>
        {uploadingStatus === 'uploading' && (
          <div className="flex items-center justify-center h-full absolute inset-0">
            <div className={"absolute inset-0 opacity-70 bg-blue-500/50"}></div>
            <Spinner />
          </div>
        )}
  
        {image && (
          <div className="h-full w-full">
            <img className="h-full w-full object-cover" src={image} alt={type} />
          </div>
        )}
      </div>
    </FileDrop>
  )
}