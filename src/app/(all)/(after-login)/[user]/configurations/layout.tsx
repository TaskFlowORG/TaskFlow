"use client"
import { SideBarConfig } from "@/components/SideBarConfig";
import { User } from "@/models";
import { useContext, useEffect, useState } from "react";
import {ConfigContext} from "@/utils";
import { UserContext } from "@/contexts/UserContext";

interface Props {
    user: User;
}

export default function Layout({ children }: { children: React.ReactNode, user: Props }) {
    const [pageTitle, setPageTitle] = useState<string>('')
    const { user } = useContext(UserContext);

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