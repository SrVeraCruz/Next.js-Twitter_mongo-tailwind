import EditableImage from "../editableImage/EditableImage";

export default function Cover({userId=null, src='', editable}) {

  return (
    <EditableImage 
      editable={editable}
      userId={userId} 
      src={src} 
      type={'cover'} 
      className="max-h-48 h-48 overflow-hidden" 
    />
  )
}