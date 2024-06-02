export default function Layout({children}) {
  return (
    <div 
      className="max-w-lg m-auto border-l border-r border-twitterBorder min-h-screen"
    >
      {children}
    </div>
  )
}