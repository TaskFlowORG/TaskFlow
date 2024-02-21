"use client";

import { Description } from "@/components/Description";
import { SVGGroupPageD } from "@/components/SVGGroupPageDark/SVGGroupPageD";
import { SVGGroupPageL } from "@/components/SVGGroupPageLight/SVGGroupPageL";
import { SVGGroupMobileL } from "@/components/SVGGroupMobileL/SVGGroupMobileL"
import { UsersList } from "@/components/UsersList";
import { useEffect, useState } from "react"
import { useTheme } from "next-themes";
import { SVGGroupMobileD } from "@/components/SVGGroupMobileD/SVGGroupMobileD";

export default function Home({ projectId = 1 }) {
    const { theme, setTheme } = useTheme();

    const svgGroupPage = theme === "dark" ? <SVGGroupPageD /> : <SVGGroupPageL />;
    const svgGroupMobile = theme === "dark" ? <SVGGroupMobileD /> : <SVGGroupMobileL />;

    return (
        <div className="flex w-screen h-screen">
            <div className="flex hidden">
                {svgGroupPage}
            </div>
            <div className="flex lg:hidden md:hidden pt-40">
                {svgGroupMobile}
            </div>
                <div className="flex w-1/2 pt-32 justify-end">
                    <Description projectId={projectId} />
                </div>
                <div className="flex w-1/2 lg:pt-32">
                    <UsersList projectId={projectId} />
            </div>
        </div>
    )
}
