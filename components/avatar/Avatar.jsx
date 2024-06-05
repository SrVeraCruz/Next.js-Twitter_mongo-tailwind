export default function Avatar({src, big}) {
  const withClass = big ? 'size-[8rem]' : 'size-10'
  return(
    <div className={"rounded-full overflow-hidden "+ withClass}>
      <img 
        src={src} 
        alt="avatar"
        className="h-full w-full object-cover"
      />
    </div>
  )
}