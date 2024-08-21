"use client"

import Layout from '../../components/layout/Layout'
import WhoToFollow from '../../components/whoToFollow/WhoToFollow'
import React from 'react'
import useUserInfo from '../../hooks/useUserInfo'
import { redirect } from 'next/navigation'

export default function ExplorePage() {
  const {userInfo, status} = useUserInfo()

  if(!userInfo?._id && status !== 'loading') {
    redirect('/login')
  }

  return (
    <Layout>
      <WhoToFollow explore />
    </Layout>
  )
}
