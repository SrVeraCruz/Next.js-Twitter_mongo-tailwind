import Link from "next/link";

export default function TopNavLink({
  extend=false,
  href='/', 
  title='Post', 
  desc=0
}){
  return (
    <Link href={href} 
      className="flex items-center gap-10 font-bold text-lg sticky left-0 top-0 py-1 px-4 bg-black/65 backdrop-blur-md h-[3.3rem] z-30"
    >
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" className="size-4">
        <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5 3 12m0 0 7.5-7.5M3 12h18" />
      </svg>
        <div className="flex flex-col">
          {title}
          {extend && (
            <span className="text-xs text-twitterLightGray font-normal">
              {desc} posts
            </span>
          )}
        </div>
    </Link>
  )
}