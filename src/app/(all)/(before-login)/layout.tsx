'use client'
import { useTheme } from 'next-themes'
import Image from 'next/image';
import React, { useEffect } from 'react'

export default function Layout({ children } : { children: React.ReactNode }) {
  const { theme, setTheme } = useTheme();
  useEffect(() => {
          setTheme(localStorage.getItem('theme') || 'light')
    // eslint-disable-next-line
  }, [])
  return (
        <>
          <div className=" p-4 flex justify-between w-full items-center">
            <Image width={64} height={64}  src="Icon.svg" alt="Logo" className='w-16 dark:grayscale dark:brightness-[60] cursor-pointer' />
            <div className="flex gap-6">     
              <Image width={20} height={20}  src="moon.svg" className="dark:hidden cursor-pointer" alt="Theme Switcher-Moon" onClick={() => setTheme("dark")} />
             <Image  width={20} height={20} src="sun.svg" className="hidden dark:flex cursor-pointer" alt="Theme Switcher-Sun" onClick={() => setTheme("light")} />              
             <Image  width={20} height={20} src="language.svg" alt="Language Switcher-pt-BR" />
            </div>
          </div>
          {children}
        </>
  )
}
