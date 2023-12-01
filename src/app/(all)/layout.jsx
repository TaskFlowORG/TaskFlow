'use client'

import '../globals.css'
import Providers from "@/services/Theme/providers"
import ThemeSwitcher from "@/services/Theme/ThemeSwitcher"
import { useEffect } from 'react'
import { useTheme } from 'next-themes'

export default function RootLayout({ children }) {
    const { theme, setTheme } = useTheme();
    useEffect(() => {
        async function setProps() {
            // setTheme(await request) 
            // document.documentElement.style.setProperty('--primary-color',await request);
            // document.documentElement.style.setProperty('--secondary-color', await request);
        }
    })

    return (
        <html lang="en">
            <body className=" w-screen h-screen dark:bg-back-grey bg-white flex flex-col items-center justify-start">
                <Providers>
                    <ThemeSwitcher />
                    {children}
                </Providers>
            </body>

        </html >
    )
}