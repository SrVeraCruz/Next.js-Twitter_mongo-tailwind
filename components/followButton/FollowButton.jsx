import axios from 'axios'
import React from 'react'

export default function FollowButton({
  profileId,
  userId,
  isFollowing,
  setIsFollowing,
  className=""
}) {

  const toogleFollow = () => {
    if(!profileId || !userId) {
      return
    }

    const data = {source: userId, destination: profileId}
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

  return (
    <button 
      onClick={() => toogleFollow()}
      className={(
        isFollowing 
        ? 'text-twitterWhite bg-black border border-twitterWhite' 
        : 'bg-twitterWhite text-black')
        +" p-2 px-4 rounded-full  font-semibold text-sm "
        +className
      }
    >
      {isFollowing ? 'Unfollow' : 'Follow'}
    </button>
  )
}
