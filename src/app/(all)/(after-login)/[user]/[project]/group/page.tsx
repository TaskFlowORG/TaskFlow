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


export default function Home({ params }:{params:{project:number}}) {
    const { theme, setTheme } = useTheme();
    const [project, setProject] = useState({})

    useEffect(() => {
        const fetchData = async () => {
            const fetchedProject = await getData("project", params.project)
            setProject(fetchedProject)
        }
        fetchData();
    }, [params.project]);

    const svgGroupPage = theme === "dark" ? <SVGGroupPageD /> : <SVGGroupPageL />;
    const svgGroupMobile = theme === "dark" ? <SVGGroupMobileD/> : <SVGGroupMobileL />;

    return (
        <div className="flex flex-col lg:flex-row w-screen h-screen lg:gap-36">
            <div className=" hidden lg:flex">
                {svgGroupPage}
            </div>
            <div className="flex lg:hidden pt-56 absolute">
                {svgGroupMobile}
            </div>
            <div className="flex flex-col ml-2 lg:ml-0 z-50 lg:flex-row w-1/2 mt-32 lg:justify-end">
                <Description project={project} />
            </div>
            <div className="flex flex-col lg:flex-row lg:w-1/2 mt-12 lg:mt-32">
                <UsersList project={project} />
            </div>  
        </div>
    )
}
