import Providers from "@/services/Theme/providers"
import ThemeSwitcher from "@/services/Theme/ThemeSwitcher"
import React from "react"


export default function RootLayout({ children }) {

    return (
    <html lang="en">
        <body className="w-screen h-screen dark:bg-back-grey bg-white flex flex-col items-center justify-start">
        <Providers>
            <ThemeSwitcher />
            {children}
            </Providers>
        </body>

    </html >

    )
}
