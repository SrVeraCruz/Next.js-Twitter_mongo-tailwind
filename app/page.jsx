'use client'

import Layout from "@/components/layout/Layout";
import PostContent from "@/components/postContent/PostContent";
import PostForm from "@/components/postForm/PostForm";
import Spinner from "@/components/spinner/Spinner";
import UsernameForm from "@/components/usernameForm/UsernameForm";
import useUserInfo from "@/hooks/useUserInfo";
import axios from "axios";
import { useEffect, useState } from "react";

export default function Home() {
  const {userInfo, status} = useUserInfo()
  const [posts, setPosts] = useState([])

  const fetchPosts = async () => {
    await axios.get('/api/posts')
      .then(res => {
        setPosts(res.data.postsData)
      })
      .catch(err => {
        console.error(err.data)
      })
  }

  useEffect(() => {
    fetchPosts()
  }, [])

  if(status === 'loading') {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <Spinner />
      </div>
    )
  }

  if(!userInfo?.username) {
    return (
      <UsernameForm />
    )
  }

  return (
    <Layout>
      <h1 className="text-lg font-bold  p-4">Home</h1>
      <PostForm onPost={() => {fetchPosts()}} />
      <div>
        {posts.length && (
          posts.map(post => (
            <div key={post._id} className="border-t border-twitterBorder p-5">
              <PostContent {...post} />
            </div>
          ))
        )}
      </div>
    </Layout>
  );
}
