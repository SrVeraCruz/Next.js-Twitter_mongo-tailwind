import Aside from "../aside/Aside";
import WhoToFollow from "../whoToFollow/WhoToFollow";

export default function Layout({children}) {
  return (
    <div className="flex">
      <Aside />
      <div 
        className="max-w-[38rem] border-l border-r border-twitterBorder min-h-screen grow"
      >
        {children}
      </div>
      <WhoToFollow />
    </div>
  )
}