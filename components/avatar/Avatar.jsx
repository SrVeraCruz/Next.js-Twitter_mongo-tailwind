import EditableImage from "../editableImage/EditableImage"

export default function Avatar({
  src="", 
  big=false, 
  editable=false, 
  userId =null
}) {
  const withClass = big ? 'size-[8rem]' : 'size-10'
  
  return(
    <div className={"rounded-full overflow-hidden "+ withClass}>
      <EditableImage 
        editable={editable}
        userId={userId} 
        src={src} 
        type={"avatar"} 
        className={withClass+" rounded-full"}
      />
    </div>
  )
}

{/* <div className={"rounded-full overflow-hidden "+ withClass}>
      <img 
        src={src} 
        alt="avatar"
        className="h-full w-full object-cover"
      />
    </div> */}