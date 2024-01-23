'use client'
import { useTheme } from 'next-themes'
import React, { useEffect } from 'react'

export default function Layout({ children } : { children: React.ReactNode }) {
  const { theme, setTheme } = useTheme();
  useEffect(() => {
          setTheme(localStorage.getItem('theme') || 'light')
  }, [])
  return (
        <>
          <div className=" p-4 flex justify-between w-full items-center">
            <img src="Icon.svg" alt="" className='w-16 dark:grayscale dark:brightness-[60] cursor-pointer' />
            <div className="flex gap-6">     
              <img src="moon.svg" className="dark:hidden cursor-pointer" alt="" onClick={() => setTheme("dark")} />
             <img src="sun.svg" className="hidden dark:flex cursor-pointer" alt="" onClick={() => setTheme("light")} />              
             <img src="language.svg" alt="" />
            </div>
          </div>
          {children}
        </>
  )
}
