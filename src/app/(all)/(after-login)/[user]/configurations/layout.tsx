"use client"
import { SideBarConfig } from "@/components/SideBarConfig";
import { User } from "@/models";
import Providers from "@/services/Theme/providers";
import { useEffect, useState } from "react";
import { ConfigContext } from "@/utils";

interface Props {
    user: User;
}

export default function Layout({ children, user }: { children: React.ReactNode, user: Props }) {
    const [pageTitle, setPageTitle] = useState<string>('')

    return (
        <>
            <ConfigContext.Provider value={{ title: pageTitle, setTitle: setPageTitle }}>
                <SideBarConfig user={user} pageTitle={pageTitle}></SideBarConfig>
                {children}
            </ConfigContext.Provider>
        </>
    )
}