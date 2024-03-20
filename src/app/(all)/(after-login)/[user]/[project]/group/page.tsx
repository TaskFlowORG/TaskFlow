"use client";

import { Description } from "@/components/Description/Description";
import { SVGGroupPageD } from "@/components/SVGGroupPageDark/SVGGroupPageD";
import { SVGGroupPageL } from "@/components/SVGGroupPageLight/SVGGroupPageL";
import { UsersList} from "@/components/UsersList/UsersList";
import { useEffect, useState } from "react"
import { useTheme } from "next-themes";
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

    return (
        <div className=" w-screen h-screen ">
            <div className="flex absolute md:-bottom-36 xl: 2xl:bottom-0 lg:z-10 ">
                {svgGroupPage}
            </div>

            <div className="w-full flex flex-col lg:flex-row lg:gap-32 mt-32">

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
