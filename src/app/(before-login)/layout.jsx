
import '../globals.css'

export default function RootLayout({ children }) {

  const theme = "light"
  return (
    <html lang="en">
      <body className={theme == "dark" ? 'bg-back-grey' : 'bg-white'}>
        <div className='h-screen w-screen'>
          <div className="lg:p-12 md:p-4 lg:py-8 xl:p-6 lg:pb-0 flex justify-between w-full items-center">
          <img src="Icon.svg" alt="" className=' lg:w-[7rem] md:w-[4rem]' />
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
