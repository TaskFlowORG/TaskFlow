
'use client'

import { useTheme } from "next-themes";
import Image from "next/image"
import { usePathname, useRouter } from "next/navigation";
import { useEffect } from "react";
export function Header() {
    const path = usePathname();
    const { theme, setTheme } = useTheme()

    useEffect(() => {
        console.log(path);
    }, [path.pathname])

    return (


        <div className="h-14 w-full fixed bg-white shadow-md flex items-center dark:bg-modal-grey justify-between px-6">
            <img src="/Assets/logo/iconLight.svg" alt="" className="dark:hidden  cursor-pointer" height={'50px'} width={'50px'} />
            <img src="/WhiteLogo.svg" alt="" className="hidden dark:flex  cursor-pointer"  height={'50px'} width={'50px'} />

            <div className=" w-1/4 h-full flex space-x-[48px] items-center justify-end">
                
                <img src="/Assets/themeLight/notification.svg" alt="" className="dark:invert  cursor-pointer" width={"20px"} hight={"20px"} />

                <img src="/Assets/Language.svg" alt="" className=" cursor-pointer" width={"20px"} height={"20px"} />

                <img src="/moon.svg" className="dark:hidden  cursor-pointer" alt="" onClick={() => setTheme("dark")} />
                <img src="/sun.svg" className="hidden dark:flex  cursor-pointer" alt="" onClick={() => setTheme("light")} />

                <img src="/Assets/themeLight/Profile.svg" className=" cursor-pointer" alt="" width={"20px"} height={"20px"} />
            </div>

        </div>

    )

}

