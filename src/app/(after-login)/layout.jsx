
'use client'
import { Inter } from 'next/font/google'

import '../globals.css'
import { Header } from '@/components/Header';
import { usePathname } from 'next/navigation';





export default function RootLayout({ children }) {

  const a = []

  b = a.filter(if (b.length<3){
    return 
  })
  
const theme = "light"
const pathName = usePathname();
  return (
    <html lang="en">
      <body className={theme == "dark" ? 'bg-back-grey': 'bg-white' }>
        <div className='h-screen w-screen'>
        {pathName !== "/login" && pathName !== "/register" && <Header></Header>}
        {children}
        
        </div>
        </body>
        
    </html>
  )
}
