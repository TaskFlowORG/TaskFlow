"use client"

import Providers from "@/services/Theme/providers";
import ThemeSwitcher from "@/services/Theme/ThemeSwitcher";
import VLibras from "vlibras-nextjs";
import '@/styles/global.css';
import { userService } from "@/services";
import Cookies from 'js-cookie';

export default function RootLayout({ children }: { children: React.ReactNode }) {
    return (
        <html lang="pt-br" className="w-screen h-screen">
            <body className="w-screen h-screen dark:bg-back-grey bg-white flex flex-col items-center justify-start">
                <VLibras forceOnload={Cookies.getJSON("libras")} />
                <Providers>
                    <ThemeSwitcher />
                    {children}
                </Providers>
            </body>
        </html>
    );
}
