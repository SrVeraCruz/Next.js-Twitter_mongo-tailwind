import useUserInfo from "../../hooks/useUserInfo";
import { signOut } from "next-auth/react";
import Link from "next/link";

export default function Aside() {
  const {userInfo, setUserInfo} = useUserInfo()

  const handleLogout = async () => {
    setUserInfo(null)
    await signOut()
  }

  return (
    <aside className="flex justify-end py-2 px-2.5 relative min-w-16 flex-1 lg:max-w-52">
      <div className="flex flex-col fixed">
        <div className="size-10 ml-1">
          <Link href={'/'} >
            <img src="/twitter-logo.svg" alt="twitter" 
              className="h-full w-full object-cover" 
            />
          </Link>
        </div>

        <nav className="my-6">
          <ul className="flex flex-col gap-1 items-start w-[18rem] xl:w-auto">
            <li className="hover:bg-twitterLightGray/25 rounded-full">
              <Link href={'/'} className="flex items-center gap-4 p-2 pr-6 xl:pr-2 transition duration-200 ease-in-out">
                <img src="/home-icon.svg" className="size-8"/>
                <span className="text-xl xl:hidden">Home</span>
              </Link>
            </li>
            <li className="hover:bg-twitterLightGray/25 rounded-full">
              <Link href={'/explore'} className="flex items-center gap-4 p-2 pr-6 xl:pr-2 transition duration-200 ease-in-out">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" className="size-7">
                  <path strokeLinecap="round" strokeLinejoin="round" d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z" />
                </svg>
                <span className="text-xl xl:hidden">Explore</span>
              </Link>
            </li>
            <li className="hover:bg-twitterLightGray/25 rounded-full">
              <button 
                className="w-full flex items-center gap-4 p-2 pr-6 xl:pr-2 transition duration-200 ease-in-out" 
                onClick={() => handleLogout()}
              >
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" className="size-8" >
                  <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 9V5.25A2.25 2.25 0 0 0 13.5 3h-6a2.25 2.25 0 0 0-2.25 2.25v13.5A2.25 2.25 0 0 0 7.5 21h6a2.25 2.25 0 0 0 2.25-2.25V15M12 9l-3 3m0 0 3 3m-3-3h12.75" />
                </svg>
                <span className="text-xl xl:hidden">Logout</span>
              </button>
            </li>
          </ul>
        </nav>

      </div>
    </aside>
  )
}