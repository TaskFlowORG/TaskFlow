
import '../globals.css'
import Providers from '@/services/Theme/providers'
import ThemeSwitcher from '@/services/Theme/ThemeSwitcher'

export default function RootLayout({ children }) {

  const theme = "light"
  return (
    <html lang="en">
      <body>
        <div className='h-screen w-screen'>
          <div className=" p-4 flex justify-between  w-full items-center">
            <img src="Icon.svg" alt="" className='w-16 ' />
            <div className="flex gap-6">
              <img src="moon.svg" alt="" />
              <img src="language.svg" alt="" />
            </div>
          </div>
          <Providers>
            <ThemeSwitcher />
            {children}</Providers>
        </div>
      </body>

    </html >

  )
}
