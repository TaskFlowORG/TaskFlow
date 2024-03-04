
'use client'

import { Header } from '@/components/Header';
import { ReactComponentElement, useEffect } from 'react';
import { useTheme } from 'next-themes';
import {useContrast} from '@/hooks/useContrast'

export default function Layout({ children }: { children: React.ReactNode }) {

  const {theme, setTheme} = useTheme()
  const {contrastColor} = useContrast()

  useEffect(() => {
    (async () => {//const theme = await Promise
      //setTheme(theme)
      //document.documentElement.style.setProperty('--primary-color', await color);
      //document.documentElement.style.setProperty('--secondary-color', await color);
      document.documentElement.style.setProperty('--contrast-color',  contrastColor);
    })()})
  return (
    <>
    <Header></Header>
    <main className='w-full h-full flex flex-col items-center justify-start'>
    {children}
    </main>
    </>
  )
}
