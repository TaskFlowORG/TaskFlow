"use client";

import { Description } from "@/components/Description";
import { SVGGroupPageD } from "@/components/SVGGroupPageDark/SVGGroupPageD";
import { SVGGroupPageL } from "@/components/SVGGroupPageLight/SVGGroupPageL";
import { SVGGroupMobileL } from "@/components/SVGGroupMobileL/SVGGroupMobileL"
import { UsersList } from "@/components/UsersList";
import { useEffect, useState } from "react"
import { useTheme } from "next-themes";
import { SVGGroupMobileD } from "@/components/SVGGroupMobileD/SVGGroupMobileD";
import { getData} from "@/services/http/api";


export default function Home({ projectId = 1 }) {
    const { theme, setTheme } = useTheme();
    const [project, setProject] = useState({})

    useEffect(() => {
        const fetchData = async () => {
            const fetchedProject = await getData("project", projectId)
            setProject(fetchedProject)
        }
        fetchData();
    }, []);


    const svgGroupPage = theme === "dark" ? <SVGGroupPageD /> : <SVGGroupPageL />;
    const svgGroupMobile = theme === "dark" ? <SVGGroupMobileD/> : <SVGGroupMobileL />;

    return (
        <div className="flex flex-col md:flex-row w-screen h-screen">
            <div className="flex hidden lg:flex">
                {svgGroupPage}
            </div>
            <div className="flex lg:hidden md:hidden pt-56 absolute">
                {svgGroupMobile}
            </div>
            <div className="flex flex-col pb-12 z-50 sm:flex-row w-full lg:w-1/2 pt-32 lg:pt-42 lg:justify-end">
                <Description project={project} />
            </div>
            <div className="flex flex-col sm:flex-row lg:w-1/2 lg:pt-32">
                <UsersList project={project} />
            </div>
        </div>
    )
}
