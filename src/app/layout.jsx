'use client'
import { Inter } from 'next/font/google'
import './globals.css'
import Header from '../components/Header/Header';
import { usePathname } from 'next/navigation';


const inter = Inter({ subsets: ['latin'] })


export default function RootLayout({ children }) {
  

const pathName = usePathname();
  return (
    <html lang="en">
      <body className={inter.className}>
        
        {pathName !== "/login" && pathName !== "/register" && <Header></Header>}
        {children}</body>
    </html>
  )
}
