'use client'

import Avatar from "@/components/avatar/Avatar"
import Layout from "@/components/layout/Layout"
import TopNavLink from "@/components/nav/TopNavLink"
import PostContent from "@/components/postContent/PostContent"
import Cover from "@/components/cover/Cover"
import Spinner from "@/components/spinner/Spinner"
import useUserInfo from "@/hooks/useUserInfo"
import axios from "axios"
import { redirect } from "next/navigation"
import { useEffect, useState } from "react"

export default function UserPage({params}) {
  const { username } = params
  const {userInfo, status} = useUserInfo()
  const [profileInfo, setProfileInfo] = useState()
  const [originalUserInfo, setOriginalUserInfo] = useState([])
  const [profilePosts, setProfilePosts] = useState([])
  const [idsLikedByMe, setIdsLikedByMe] = useState([])
  const [profileInfostatus, setProfileInfostatus] = useState('loading')
  const [profilePostsStatus, setProfilePostsStatus] = useState('loading')
  const [editMode, setEditMode] = useState(false)
  const [isFollowing, setIsFollowing] = useState(false)

  const isMyProfile = userInfo?._id === profileInfo?._id

  const fetchProfileInfo = async () => {
    if(!username || !userInfo?._id) {
      return
    }

    await axios.get(`/api/users?username=${username}&source=${userInfo?._id}`)
      .then(res => {
        setProfileInfo(res.data.userDoc)
        setOriginalUserInfo(res.data.userDoc)
        setIsFollowing(!!res.data?.followingByMe)
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
        console.log(res.data)
        setProfilePostsStatus('done')
      })
      .catch(err => {
        console.error(err.message)
      })
  }

  const updateProfile = async () => {
    setEditMode(false)
    if(!profileInfo?._id) {
      return
    }

    const data = {
      id: profileInfo?._id,
      name: profileInfo?.name, 
      username: profileInfo?.username, 
      bio: profileInfo?.bio,
    }
    await axios.put('/api/users?update=profile', data)
      .catch(err => {
        console.error(err.message)
      })
  }

  const cancelEdit = () => {
    setEditMode(false)
    setProfileInfo(prev => ({
      ...prev, 
      name: originalUserInfo?.name, 
      username: originalUserInfo?.username, 
      bio: originalUserInfo?.bio
    }))
  }

  const toogleFollow = () => {
    if(!profileInfo?._id || !userInfo?._id) {
      return
    }

    const data = {source: userInfo?._id, destination: profileInfo?._id}
    axios.post('api/follows', data)
      .then(res => {
        if(res.data?.followDoc) {
          setIsFollowing(true)
        } else {
          setIsFollowing(false)
        }
      })
      .catch(err => {
        console.error(err.data)
      })
  }

  useEffect(() => {
    fetchProfileInfo()
  }, [username, userInfo])

  useEffect(() => {
    fecthProfilePosts()
  }, [profileInfo, userInfo])
  
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

  if(profileInfostatus === 'loading') {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <Spinner />
      </div>
    )
  }

  
  if(!profileInfo?._id) {
    redirect('/')
  }


  return (
    <div>
      <Layout>
        <TopNavLink title={profileInfo?.name} desc={profileInfo?.postsCount} />
        <div className="border-b border-twitterBorder">
          <Cover 
            editable={isMyProfile}
            src={profileInfo?.cover} 
            userId={isMyProfile ? userInfo?._id : null} 
          />
          <div className="flex justify-between px-4 h-max">
            <div className="relative">
              <div className="absolute -top-[4.5rem] bg-black p-0.5 rounded-full">
                <Avatar 
                  big 
                  src={profileInfo?.image}
                  editable={isMyProfile} 
                  userId={isMyProfile ? userInfo?._id : null}
                />
              </div>
            </div>
            <div className="my-3 flex items-center min-h-[2.8rem]">
              {isMyProfile && (
                <div className="self-start flex items-center gap-2">
                  {!editMode && (
                    <button 
                      onClick={() => setEditMode(true)}
                      className="p-2 px-4 text-twitterWhite border-[0.05rem] border-t-white rounded-full bg-black font-semibold text-sm hover:bg-twitterBorder/65 transition"
                    >
                      Edit profile
                    </button>
                  )}

                  {editMode && (
                    <div className="flex gap-2">
                      <button 
                        onClick={() => cancelEdit()}
                        className="p-2 px-4 text-twitterWhite border-[0.05rem] border-t-white rounded-full bg-black font-semibold text-sm hover:bg-twitterBorder/65 transition"
                      >
                       Cancel
                      </button>

                      <button 
                        onClick={() => updateProfile()}
                        className="p-2 px-4 bg-twitterWhite rounded-full text-black font-semibold text-sm"
                      >
                        Save profile
                      </button>
                    </div>
                  )}
                </div>
              )}

              {!isMyProfile && (  
                <div className="self-start flex items-center gap-2">
                  <button className="p-1.5 border border-twitterBorder rounded-full" >
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-6">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 12a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0ZM12.75 12a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0ZM18.75 12a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Z" />
                    </svg>
                  </button>
                  <button 
                    className="p-2 border border-twitterPurple rounded-full" 
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-5 fill-twitterPurple stroke-twitterPurple">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M18 7.5v3m0 0v3m0-3h3m-3 0h-3m-2.25-4.125a3.375 3.375 0 1 1-6.75 0 3.375 3.375 0 0 1 6.75 0ZM3 19.235v-.11a6.375 6.375 0 0 1 12.75 0v.109A12.318 12.318 0 0 1 9.374 21c-2.331 0-4.512-.645-6.374-1.766Z" />
                    </svg>
                  </button>
                  <button 
                    onClick={() => toogleFollow()}
                    className={(isFollowing ? 'text-twitterWhite bg-black border border-twitterWhite' : 'bg-twitterWhite text-black')+" p-2 px-4 rounded-full  font-semibold text-sm"}
                  >
                    {isFollowing ? 'Unfollow' : 'Follow'}
                  </button>
                </div>
              )}
            </div>
          </div>

          <div className=" m-4">
            {!editMode && (
              <div>
                <h1 className="font-bold text-lg leading-4">{profileInfo?.name}</h1>
                <span className="text-sm font-normal text-twitterLightGray ">
                  @{profileInfo?.username}
                </span>

                <div className="my-3">
                  <p className="text-[.95rem]">
                    {profileInfo?.bio}
                  </p>
                </div>
              </div>
            )}

            {editMode && (
              <div className="flex flex-col gap-3">
                <input 
                  type="text" 
                  value={profileInfo?.name} 
                  onChange={ev => setProfileInfo(prev => ({...prev, name:ev.target.value}))}
                  className="bg-transparent border-[0.05rem] border-twitterBorder rounded-[.2rem] p-2"
                  placeholder="Name"
                />
                <input 
                  type="text" 
                  value={profileInfo?.username} 
                  onChange={ev => setProfileInfo(prev => ({...prev, username:ev.target.value}))}
                  className="bg-transparent border-[0.05rem] border-twitterBorder rounded-[.2rem] p-2"
                  placeholder="Username"
                />

                <div>
                  <textarea 
                    value={profileInfo?.bio} 
                    onChange={ev => setProfileInfo(prev => ({...prev, bio:ev.target.value}))} 
                    className="bg-transparent border-[0.05rem] border-twitterBorder rounded-[.2rem] p-2 w-full" 
                  />
                </div>
              </div>
            )}
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