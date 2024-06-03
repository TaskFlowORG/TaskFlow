"use client"
import { SideBarConfig } from "@/components/SideBarConfig";
import { User } from "@/models";
import { useContext, useEffect, useState } from "react";
import {ConfigContext} from "@/utils";
import { UserContext } from "@/contexts/UserContext";




export default function Layout({ children }: { children: React.ReactNode}) {
    const [pageTitle, setPageTitle] = useState<string>('')
    const { user } = useContext(UserContext);

    if(!user) return null;
    return (
        <>
        <span className="w-screen h-screen ">

            <ConfigContext.Provider value={{ title: pageTitle, setTitle: setPageTitle }}>
                <SideBarConfig user={user} pageTitle={pageTitle}></SideBarConfig>
                {children}
            </ConfigContext.Provider>

        </span>

        </>
    )
}