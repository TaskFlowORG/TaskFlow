"use client";

import { Description } from "@/components/Description";
import { SVGGroupPageD } from "@/components/SVGGroupPageDark/SVGGroupPageD";
import { SVGGroupPageL } from "@/components/SVGGroupPageLight/SVGGroupPageL";
import { UsersList } from "@/components/UsersList";
import { useEffect, useState } from "react"
import { useTheme } from "next-themes";

export default function Home({ projectId = 1 }) {
    const {theme, setTheme} = useTheme();

    const svgGroupPage = theme === "dark" ? <SVGGroupPageD/> : <SVGGroupPageL/>;

    return (
        <div className="flex w-screen h-screen pt-28">
            {svgGroupPage}
            <div className="flex w-1/2 justify-end">
                <Description projectId={projectId}/>
            </div>
            <div className="flex w-1/2 ">
                <UsersList projectId={projectId}/>
            </div>
        </div>
    )
}
