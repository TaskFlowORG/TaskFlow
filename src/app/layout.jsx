
'use client'
import { Inter } from 'next/font/google'

import './globals.css'
import Header from '../components/Header/Header';
import { usePathname } from 'next/navigation';





export default function RootLayout({ children }) {

  
const theme = "dark"
const pathName = usePathname();
  return (
    <html lang="en">
      <body className={theme == "dark" ? 'bg-back-grey': 'bg-white' }>
        
        {pathName !== "/login" && pathName !== "/register" && <Header></Header>}
        {children}</body>
    </html>
  )
}
