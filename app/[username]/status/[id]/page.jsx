'use client'

import Layout from "@/components/layout/Layout";
import PostContent from "@/components/postContent/PostContent";
import Spinner from "@/components/spinner/Spinner";
import axios from "axios";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function PostPage({params}) {
  const { username, id } = params;
  const [post, setPost] = useState()
  const [isLoading, setisLoading] = useState(true)

  const fetchPost = async () => {
    if(!id) {
      return
    }

    await axios.get(`/api/posts?id=${id}`)
      .then(res => {
        setPost(res.data.postData)
        setisLoading(false)
      })
      .catch(err => {
        console.error(err.data)
      })
  }

  useEffect(() => {
    fetchPost()
  }, [id])

  return (
    <Layout>
      {isLoading && 
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
          <div className="p-4 pt-0.5">
            <div className="mt-4">
              <PostContent {...post} big/>
            </div>

            {/* <div className="mt-4">
              <PostContent {...post}/>
            </div> */}
          </div>
        </div>
      )}
    </Layout>
  )
}