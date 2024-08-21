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

        {uploadingStatus !== 'uploading' && (
          <div 
            className="
              bg-twitterDarkGray/75 hover:bg-twitterDarkGray 
              transition rounded-full p-2 absolute
            "
          >
            <div className="relative overflow-hidden">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-5">
                <path strokeLinecap="round" strokeLinejoin="round" d="M6.827 6.175A2.31 2.31 0 0 1 5.186 7.23c-.38.054-.757.112-1.134.175C2.999 7.58 2.25 8.507 2.25 9.574V18a2.25 2.25 0 0 0 2.25 2.25h15A2.25 2.25 0 0 0 21.75 18V9.574c0-1.067-.75-1.994-1.802-2.169a47.865 47.865 0 0 0-1.134-.175 2.31 2.31 0 0 1-1.64-1.055l-.822-1.316a2.192 2.192 0 0 0-1.736-1.039 48.774 48.774 0 0 0-5.232 0 2.192 2.192 0 0 0-1.736 1.039l-.821 1.316Z" />
                <path strokeLinecap="round" strokeLinejoin="round" d="M16.5 12.75a4.5 4.5 0 1 1-9 0 4.5 4.5 0 0 1 9 0ZM18.75 10.5h.008v.008h-.008V10.5Z" />
              </svg>
              
              <input 
                type="file" 
                onChange={(ev)=> updateImage(ev.target.files, ev)}
                className="absolute -inset-5 opacity-0"
              />
            </div>
          </div>
        )}
      </div>
    </FileDrop>
  )
}