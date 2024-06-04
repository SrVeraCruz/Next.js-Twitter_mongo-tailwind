import useUserInfo from "@/hooks/useUserInfo";
import { signOut } from "next-auth/react";
import Link from "next/link";

export default function Aside() {
  const {userInfo, setUserInfo} = useUserInfo()

  const handleLogout = async () => {
    setUserInfo(null)
    await signOut()
  }


  return (
    <aside className="grow-[0.1] flex justify-end py-2 px-2.5 ">
      <div className="flex flex-col align-center mr-0">
        <div className="w-10 h-10">
          <Link href={'/'} >
            <img src="/twitter-logo.svg" alt="twitter" 
              className="h-full w-full object-cover" 
            />
          </Link>
        </div>

        <nav className="w-10 h-10 flex justify-center my-6">
          <ul className="w-7 h-7">
            <li>
              <Link href={'/'}>
                <img src="/home-icon.png" />
              </Link>
            </li>
          </ul>
        </nav>

        <div>
          <button className="w-full" onClick={() => handleLogout()}>
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-8 m-auto" >
              <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 9V5.25A2.25 2.25 0 0 0 13.5 3h-6a2.25 2.25 0 0 0-2.25 2.25v13.5A2.25 2.25 0 0 0 7.5 21h6a2.25 2.25 0 0 0 2.25-2.25V15M12 9l-3 3m0 0 3 3m-3-3h12.75" />
            </svg>
          </button>
        </div>
      </div>
    </aside>
  )
}