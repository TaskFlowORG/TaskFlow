
'use client'
import { Inter } from 'next/font/google'

import { Header } from '@/components/Header';
import { usePathname } from 'next/navigation';

export default function Layout({ children }) {

  return (
    <>
    <Header></Header>
    <main className='w-full h-full flex flex-col items-center justify-start'>
    {children}
    </main>
    </>
  )
}
