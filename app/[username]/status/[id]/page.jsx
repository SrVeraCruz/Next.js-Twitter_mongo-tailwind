'use client'

import Layout from "@/components/layout/Layout";
import PostContent from "@/components/postContent/PostContent";
import Spinner from "@/components/spinner/Spinner";
import useUserInfo from "@/hooks/useUserInfo";
import axios from "axios";
import { redirect } from "next/navigation";
import Link from "next/link";
import { useEffect, useState } from "react";
import PostForm from "@/components/postForm/PostForm";

export default function PostPage({params}) {
  const { id } = params;
  const {userInfo, status} = useUserInfo()
  const [post, setPost] = useState()
  const [idLikedByMe, setIdLikedByMe] = useState()
  const [replies, setReplies] = useState([])
  const [idsLikedByMe, setIdsLikedByMe] = useState([])
  const [isLoading, setIsLoading] = useState(true)

  const fetchData = async () => {
    await axios.put(`/api/posts?id=${id}`, {userId: userInfo._id})
      .then(res => {
        setPost(res.data.postData)
        setIdLikedByMe(res.data.idLikedByMe)
      })
      .catch(err => {
        console.error(err.data)
      })

    await axios.put(`/api/posts?parent=${id}`, {userId: userInfo._id})
    .then(res => {
      setReplies(res.data.postsData)
      setIdsLikedByMe(res.data.idsLikedByMe)
      setIsLoading(false)
    })
    .catch(err => {
      console.error(err.message)
    })
  }

  const fetchPost = async () => {
    if(!id || !userInfo?._id) {
      return
    }

    await fetchData()
  }

  useEffect(() => {
    fetchPost()
  }, [id, userInfo?._id])

  if(status === 'loading') {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <Spinner />
      </div>
    )
  }

  if(!userInfo?._id) {
    redirect('/login')
  }

  return (
    <Layout>
      {(isLoading || status === 'loading')  && 
        <div className="flex items-center justify-center min-h-screen">
          <Spinner />
        </div>
      }
      {post && (
        <div>
          <Link href={'/'} 
            className="flex items-center gap-10 font-bold text-lg sticky left-0 top-0 py-3 px-4 bg-black/75 backdrop-blur-md"
          >
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" className="size-4">
              <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5 3 12m0 0 7.5-7.5M3 12h18" />
            </svg>
            Post
          </Link>
          <div className="p-4 pt-0.5 pb-1">
            <div className="mt-4">
              <PostContent 
                {...post} 
                big 
                likedByMe={id === idLikedByMe} 
              />
            </div>
          </div>
        </div>
      )}
      {userInfo?._id && (
        <div className="border-b border-twitterBorder pb-4">
          <PostForm 
            compact 
            placeholder="Post your reply" 
            parent={id} 
            onPost={() => fetchData()}
          />
        </div>
      )}

      {!!replies.length > 0 && replies.map((reply, key) => (
        <div key={key} className="border-t border-b border-twitterBorder p-5">
          <PostContent {...reply} likedByMe={idsLikedByMe.includes(reply?._id)} />
        </div>
      ))}
    </Layout>
  )
}