
'use client'
import { Inter } from 'next/font/google'

import '../globals.css'
import { Header } from '@/components/Header';
import { usePathname } from 'next/navigation';





export default function RootLayout({ children }) {


  const theme = "light"
  const pathName = usePathname();
  return (
    <html lang="en">
      <body className='w-screen h-screen flex flex-col first-line:'>
        <Header></Header>

        <main className="flex flex-col items-center justify-center min-w-full min-h-full">
          {children}
        </main>
      </body>
    </html>
  )
}
