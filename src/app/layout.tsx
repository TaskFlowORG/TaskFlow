import Providers from "@/services/Theme/providers"
import ThemeSwitcher from "@/services/Theme/ThemeSwitcher"
import React from "react"


export default function RootLayout({ children }: { children: React.ReactNode}) {

    return (
    <html lang="pt-br">
        <body className="w-screen h-screen dark:bg-back-grey bg-white flex flex-col items-center justify-start">
        <Providers>
            <ThemeSwitcher />
            {children}
            </Providers>
        </body>

    </html >

    )
}
