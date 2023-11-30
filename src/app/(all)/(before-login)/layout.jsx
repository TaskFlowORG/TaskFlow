'use client'
import Providers from '@/services/Theme/providers'
import ThemeSwitcher from '@/services/Theme/ThemeSwitcher'
import { useTheme } from 'next-themes'
import Link from 'next/link'

export default function RootLayout({ children }) {
  const { theme, setTheme } = useTheme()

  function toggleColor() {
    const element = document.querySelector("body");
    element.classList.remove("transition-iris")
    element.classList.add("transition-iris")
    setTheme(theme == "dark" ? "light" : "dark")
}

  return (
    <>
      <div className="py-4 p-12 flex justify-between w-full items-center">
        <Link href="/">
          <img src="Icon.svg" alt="" className='w-28 h-28 dark:hidden cursor-pointer' />
          <img src="WhiteLogo.svg" alt="" className='w-28 h-28 hidden dark:flex cursor-pointer' />
        </Link>
        <div className="flex gap-6">
          <img src="moon.svg" className="dark:hidden cursor-pointer" alt="" onClick={() => toggleColor()} />
          <img src="sun.svg" className="hidden dark:flex cursor-pointer" alt="" onClick={() => toggleColor()} />
          <img src="language.svg" className='cursor-pointer' alt="" />
        </div>
      </div>
      {children}
    </>

  )
}
