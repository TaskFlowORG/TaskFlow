
import Providers from "@/services/Theme/providers"
import ThemeSwitcher from "@/services/Theme/ThemeSwitcher"
import React, { useEffect } from "react"
import '@/styles/global.css'

export default function RootLayout({ children }: { children: React.ReactNode}) {

    return (
    <html lang="pt-br" className="w-screen h-screen overflow-hidden">
        <body className="w-screen h-screen dark:bg-back-grey bg-white flex flex-col items-center justify-start">
        <Providers>
            <ThemeSwitcher />
            {children}
        </Providers>
        </body>
    </html >
    )
}
