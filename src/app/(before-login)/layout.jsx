
import '../globals.css'

export default function RootLayout({ children }) {

  const theme = "light"
  return (
    <html lang="en">
      <body className={theme == "dark" ? 'bg-back-grey' : 'bg-white'}>
        <div className='h-screen w-screen'>
          <div className= "h-[15%] p-12 flex justify-between w-full items-center">
          <img src="Icon.svg" alt="" />
          <div className="flex gap-6">
            <img src="moon.svg" alt="" />
            <img src="language.svg" alt="" />
          </div>
        </div>
        {children}
      </div>
    </body>
        
    </html >
  )
}
