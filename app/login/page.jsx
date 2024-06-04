'use client'

import axios from "axios"
import { useSession, signIn } from "next-auth/react"
import { redirect } from "next/navigation"
import { useEffect, useState } from "react"

export default function page() {
  const [providers, setProviders] = useState([])
  const { data, status } = useSession()

  const getProviders = async () => {
    await axios.get('/api/providers')
      .then(res => {
        setProviders(res.data)
      })
      .catch(err => {
        console.error(err.message)
      })
  }

  useEffect(() => {
    getProviders()
  }, [])
  
  if(status === 'loading') {
    return ''
  }

  if (data) {
    redirect('/')
  }

  return (
    <div className="flex items-center justify-center h-screen">
      {Object.values(providers).map((provider,key) => (
        <div key={key}>
          <button 
            className="bg-twitterWhite text-black pl-3 pr-5 py-2 rounded-full flex items-center gap-1"
            onClick={ async () => await signIn(provider.id)}
          >
            <img src="/google_icon.png" alt="google_icon" 
              className="w-8 h-8" 
            />
            Sign in with {provider?.name}
          </button>
        </div>
      ))}
    </div>
  )
}
