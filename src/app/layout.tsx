"use client";

import Providers from "@/services/Theme/providers";
import ThemeSwitcher from "@/services/Theme/ThemeSwitcher";
import VLibras from "vlibras-nextjs";
import "@/styles/global.css";
import Cookies from "js-cookie";
import { useEffect, useState } from "react";
import { User } from "@/models";
import { UserContext } from "@/contexts/UserContext";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [user, setUser] = useState<User>();


  return (
    <html lang="pt-br" className="w-screen h-screen">
        <UserContext.Provider value={{ user, setUser }}>
        <body className="w-screen h-screen dark:bg-back-grey bg-white flex flex-col items-center justify-start">
          {user ? user.configuration.libras : true && <VLibras forceOnload={Cookies.getJSON("libras")} />}
          <Providers>
            <ThemeSwitcher />
            {children}
          </Providers>
        </body>
      </UserContext.Provider>
    </html>
  );
}
