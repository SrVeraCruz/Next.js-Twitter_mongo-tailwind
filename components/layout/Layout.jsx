import Aside from "../aside/Aside";

export default function Layout({children}) {
  return (
    <div className="flex">
      <Aside />
      <div 
        className="max-w-lg border-l border-r border-twitterBorder min-h-screen grow"
      >
        {children}
      </div>
    </div>
  )
}