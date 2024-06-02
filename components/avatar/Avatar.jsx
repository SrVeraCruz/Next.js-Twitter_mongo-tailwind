export default function Avatar({src}) {
  return(
    <div className="w-10 h-10 rounded-full overflow-hidden">
      <img 
        src={src} 
        alt="avatar"
        className="h-full w-full object-cover"
      />
    </div>
  )
}