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
        <div className=" w-screen h-screen ">
            <div className="flex hidden lg:flex md:flex absolute md:-bottom-36 xl: 2xl:bottom-0 lg:z-10 ">
                {svgGroupPage}
            </div>
            {/* <div className="flex lg:hidden md:hidden pt-56 sm:pt-72  max-h-screen overflow-clip absolute">
                {svgGroupMobile}
            </div> */}



            <div className="w-full  flex flex-col lg:flex-row lg:gap-32 mt-32">
              <div className="flex flex-col lg:flex-row w-1/2 lg:justify-end">
                <Description project={project} />
            </div>
            <div className="flex flex-col lg:flex-row lg:w-1/2 mt-12 lg:mt-0">
                <UsersList project={project} />
            </div>   
            </div>
             
        </div>
    )
}
