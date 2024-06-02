import useUserInfo from "@/hooks/useUserInfo"
import axios from "axios"
import { useEffect, useState } from "react"

export default function UsernameForm() {
  const {userInfo, status} = useUserInfo()
  const [username, setUsername] = useState('')

  const handleSubmitForm = async (ev) => {
    ev.preventDefault()
    
    const data = {id: userInfo?._id , username: username}
    await axios.put('/api/users', data)
      .catch(err => {
        console.error(err.message)
      })
    location.reload()
  }

  useEffect(() => {
    if(status === 'loading') {
      return
    }

    if(username === '') {
      const defaultUserName = userInfo?.email?.split('@')[0]
      setUsername(defaultUserName.replace(/[^a-z]/, ''))
    }
  }, [status])

  if(status === 'loading') {
    return ''
  }

  return (
    <form onSubmit={handleSubmitForm} 
      className="flex items-center justify-center h-screen bg"
    >
      <div className="text-center flex flex-col gap-1.5">
        <h1 className="text-xl">Pick a username</h1>
        <input type="text"
          value={username}
          onChange={(ev) => setUsername(ev.target.value)} 
          className="bg-twitterBorder px-3 py-1 rounded-full" placeholder="username" 
        />
        <button className="bg-twitterBlue p-1 rounded-full">Continue</button>
      </div>
    </form>
  )
}
