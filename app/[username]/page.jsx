'use client'

import Avatar from "@/components/avatar/Avatar"
import Layout from "@/components/layout/Layout"
import TopNavLink from "@/components/nav/TopNavLink"
import PostContent from "@/components/postContent/PostContent"
import Cover from "@/components/profile/Cover"
import Spinner from "@/components/spinner/Spinner"
import useUserInfo from "@/hooks/useUserInfo"
import axios from "axios"
import { redirect } from "next/navigation"
import { useEffect, useState } from "react"

export default function UserPage({params}) {
  const { username } = params
  const {userInfo, status} = useUserInfo()
  const [profileInfo, setProfileInfo] = useState()
  const [profilePosts, setProfilePosts] = useState([])
  const [idsLikedByMe, setIdsLikedByMe] = useState([])
  const [profileInfostatus, setProfileInfostatus] = useState('loading')
  const [profilePostsStatus, setProfilePostsStatus] = useState('loading')

  const fetchProfileInfo = async () => {
    await axios.get(`/api/users?username=${username}`)
      .then(res => {
        setProfileInfo(res.data.userDoc[0])
        setProfileInfostatus('done')
      })
      .catch(err => {
        console.error(err.message)
      })
  }

  const fecthProfilePosts = async () => {
    if(!profileInfo?._id || !userInfo?._id) {
      return
    }

    await axios.put(`/api/posts?author=${profileInfo?._id}`, {userId: userInfo?._id})
      .then(res => {
        setProfilePosts(res.data.postsData)
        setIdsLikedByMe(res.data.idsLikedByMe)
        setProfilePostsStatus('done')
      })
      .catch(err => {
        console.error(err.message)
      })
  }

  useEffect(() => {
    fetchProfileInfo()
  }, [username])

  useEffect(() => {
    fecthProfilePosts()
  }, [profileInfo, userInfo])
  
  if(profileInfostatus === 'loading') {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <Spinner />
      </div>
    )
  }

  if(status === 'loading') {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <Spinner />
      </div>
    )
  }

  if(!profileInfo?._id) {
    redirect('/')
  }

  if(!userInfo?._id) {
    redirect('/login')
  }

  return (
    <div>
      <Layout>
        <TopNavLink title={profileInfo?.name} desc={profileInfo?.postsCount} />
        <div className="border-b border-twitterBorder">
          <Cover 
            src={profileInfo?.cover} 
            userId={userInfo?._id === profileInfo?._id ? profileInfo?._id : null} 
          />
          <div className="flex justify-between px-4 h-max">
            <div className="relative">
              <div className="absolute -top-[4.5rem] bg-black p-1 rounded-full">
                <Avatar big src={profileInfo?.image} />
              </div>
            </div>
            <div className="my-3 flex items-center">
              <div className="self-start flex items-center gap-2">
                <button className="p-1.5 border border-twitterBorder rounded-full" >
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-6">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 12a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0ZM12.75 12a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0ZM18.75 12a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Z" />
                  </svg>
                </button>
                <button className="p-2 border border-twitterPurple rounded-full" >
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-5 fill-twitterPurple stroke-twitterPurple">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M18 7.5v3m0 0v3m0-3h3m-3 0h-3m-2.25-4.125a3.375 3.375 0 1 1-6.75 0 3.375 3.375 0 0 1 6.75 0ZM3 19.235v-.11a6.375 6.375 0 0 1 12.75 0v.109A12.318 12.318 0 0 1 9.374 21c-2.331 0-4.512-.645-6.374-1.766Z" />
                  </svg>
                </button>
                <button 
                  className="p-2 px-4 bg-twitterWhite rounded-full text-black font-semibold text-sm"
                >
                  Follow
                </button>
              </div>
            </div>
          </div>

          <div className=" m-4">
            <h1 className="font-bold text-lg leading-4">{profileInfo?.name}</h1>
            <span className="text-sm font-normal text-twitterLightGray ">
              @{profileInfo?.username}
            </span>

            <div className="my-3">
              <p className="text-[.95rem]">
                {profileInfo?.bio}
                Lorem, ipsum dolor sit amet consectetur adipisicing elit. Nesciunt dolore necessitatibus ratione fugiat magni, eius at provident ad commodi repudiandae.
              </p>
            </div>
          </div>
        </div>

        {profilePostsStatus === 'loading' && (
          <div className="p-4 flex items-center justify-center">
            <Spinner />
          </div>
        )}

        {!!profilePosts.length && profilePosts.map(post => (
          <div 
            key={post._id} 
            className="p-4 border-t border-b border-twitterBorder"
          >
            <PostContent 
              {...post} 
              likedByMe={idsLikedByMe.includes(post?._id)} 
            />
          </div>
        ))}
      </Layout>
    </div>
  )
}