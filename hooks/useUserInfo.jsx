'use client'

import axios from "axios";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";

export default function useUserInfo() {
  const { data: session, status: sessionStatus } = useSession();
  const [userInfo, setUserInfo] = useState({})
  const [status, setStatus] = useState('loading')

  const getUserInfo = async () => {
    if (sessionStatus === 'loading') {
      return
    }

    if (!session?.user?.id) {
      setStatus('unauthenticated')
      return 
    }

    await axios.get(`/api/users?id=${session?.user.id}`)
    .then(res => {
      setUserInfo(res.data.userDoc)
      setStatus('done')
    })
    .catch(err => {
      console.error(err.message)
    })
  }

  useEffect(() => {
    getUserInfo()
  }, [sessionStatus])

  return {userInfo, status, setUserInfo}
}