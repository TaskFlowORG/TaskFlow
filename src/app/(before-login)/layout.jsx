'use client'
import '../globals.css'
import { useTheme } from 'next-themes'
import React from 'react'

export default function RootLayout({ children }) {
  const { theme, setTheme } = useTheme()

  return (
        <>
          <div className=" p-4 flex justify-between w-full items-center">
            <img src="Icon.svg" alt="" className='w-16 ' />
            <div className="flex gap-6">     
              <img src="moon.svg" className="dark:hidden" alt="" onClick={() => setTheme("dark")} />
             <img src="sun.svg" className="hidden dark:flex" alt="" onClick={() => setTheme("light")} />              
             <img src="language.svg" alt="" />
            </div>
          </div>
          {children}
          </>

  )
}
