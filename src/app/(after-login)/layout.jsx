
'use client'
import { Inter } from 'next/font/google'

import '../globals.css'
import { Header } from '@/components/Header';
import { usePathname } from 'next/navigation';

export default function RootLayout({ children }) {

  return (
    <>
    <Header></Header>
    <main className='h-screen w-screen w-full h-full flex flex-col items-center justify-start'>

    {children}
    </main>
    </>
  )
}
