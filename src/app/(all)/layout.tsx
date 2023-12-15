'use client'

import '../globals.css'
import Providers from "@/services/Theme/providers"
import ThemeSwitcher from "@/services/Theme/ThemeSwitcher"
import { useEffect } from 'react'
import { useTheme } from 'next-themes'

export default function RootLayout({children }: { children: React.ReactNode}) {
    const { theme, setTheme } = useTheme();
    useEffect(() => {
        async function setProps() {
            // setTheme(await request) 
            // document.documentElement.style.setProperty('--primary-color',await request);
            // document.documentElement.style.setProperty('--secondary-color', await request);
        }
    })

    return children
}