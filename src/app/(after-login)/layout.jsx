
'use client'
import { Inter } from 'next/font/google'

import '../globals.css'
import { Header } from '@/components/Header';
import { usePathname } from 'next/navigation';





export default function RootLayout({ children }) {


  const theme = "light"
  const pathName = usePathname();
  return (
    <>
    <div className='h-screen w-screen'></div>
    <Header></Header>
    {children}
    </>
  )
}
