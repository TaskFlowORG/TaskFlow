"use client"
import { SideBarConfig } from "@/components/SideBarConfig";
import { User } from "@/models";
import Providers from "@/services/Theme/providers";
import { useEffect, useState } from "react";
import {ConfigContext} from "@/utils";
import { set } from "zod";
import { userService } from "@/services";

interface Props {
    user: User;
}

export default function Layout({ children }: { children: React.ReactNode, user: Props }) {
    const [pageTitle, setPageTitle] = useState<string>('')
    const [user, setUser] = useState<User>();
    useEffect(() => {
        (async () => {
            const user = await userService.findLogged();
            setUser(user)
        })()
    }, [])

    if(!user) return null;
    return (
        <>
        <ConfigContext.Provider value={{ title: pageTitle, setTitle: setPageTitle }}>
            <div className="relative flex w-full h-full">
                <SideBarConfig user={user} pageTitle={pageTitle}></SideBarConfig>
                {children}
            </div>
        </ConfigContext.Provider>
        </>
    )
}