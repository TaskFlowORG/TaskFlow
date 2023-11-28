
'use client'

import Image from "next/image"
import { usePathname, useRouter } from "next/navigation";
import { useEffect } from "react";
export function Header() {
    const path = usePathname();

    useEffect(() => {
        console.log(path);
    }, [path.pathname])

    return (


        <div className="h-14 w-full fixed bg-white shadow-md flex items-center justify-between px-6">
            <img src="/Assets/logo/iconLight.svg" alt="" height={'50px'} width={'50px'} />

            <div className=" w-1/4 h-full flex space-x-[48px]  items-center justify-end">
                <img src="/Assets/themeLight/notification.svg" alt="" width={"20px"} hight={"20px"} />
                <img src="/Assets/Language.svg" alt="" width={"20px"} height={"20px"} />
                <img src="/Assets/themeLight/themeLight.svg" alt="" width={"20px"} height={"20px"} />
                <img src="/Assets/themeLight/Profile.svg" alt="" width={"20px"} height={"20px"} />
            </div>

        </div>

    )

}

