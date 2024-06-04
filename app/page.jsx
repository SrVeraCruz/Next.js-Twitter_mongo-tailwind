'use client'

import Layout from "@/components/layout/Layout";
import PostContent from "@/components/postContent/PostContent";
import PostForm from "@/components/postForm/PostForm";
import Spinner from "@/components/spinner/Spinner";
import UsernameForm from "@/components/usernameForm/UsernameForm";
import useUserInfo from "@/hooks/useUserInfo";
import axios from "axios";
import { redirect } from "next/navigation";
import { useEffect, useState } from "react";

export default function Home() {
  const {userInfo, status} = useUserInfo()
  const [posts, setPosts] = useState([])
  const [idsLikedByMe, setIdsLikedByMe] = useState([])
  const [loadingPosts, setLoadingPosts] = useState('loading')

  const fetchPosts = async () => {
    if(!userInfo?._id) {
      return
    }
    await axios.put('/api/posts', {userId: userInfo?._id})
      .then(res => {
        setPosts(res.data.postsData)
        setIdsLikedByMe(res.data.idsLikedByMe)
        setLoadingPosts('done')
      })
      .catch(err => {
        console.error(err.data)
      })
  }

  useEffect(() => {
    fetchPosts()
  }, [userInfo?._id])

  if(status === 'loading') {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <Spinner />
      </div>
    )
  }

  
  if(userInfo._id && !userInfo?.username) {
    return (
      <UsernameForm />
    )
  }
  
  if(!userInfo._id) {
    redirect('/login')
  }

  return (
    <Layout>
      <h1 className="text-lg font-bold  p-4">Home</h1>
      <PostForm onPost={() => {fetchPosts()}} />
      <div>
        {loadingPosts === 'loading' && (
          <div className="flex items-center justify-center">
            <Spinner />
          </div>
        )}
        {!!posts.length && (
          posts.map(post => (
            <div key={post._id} className="border-t border-b border-twitterBorder p-5">
              <PostContent 
                {...post} 
                likedByMe={idsLikedByMe.includes(post._id)}
              />
            </div>
          ))
        )}
      </div>
    </Layout>
  );
}
