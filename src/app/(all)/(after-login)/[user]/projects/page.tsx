'use client'

import { ProjectComponent } from "@/components/Project"
import { SVGProjectsPage } from "@/components/Shapes"
import { getData, getListData } from "@/services/http/api";
import { Project } from "@/models";
import { useEffect, useState } from "react";

export default function Projects({params}:{params:{user:string}}) {	

    const [windowWidth, setWindowWidth] = useState<number>(0);
    const [projects, setProjects] = useState<Project[]>([])

    useEffect(() => {
        window.addEventListener('resize', () => {
            setWindowWidth(window.innerWidth)
        })
        setWindowWidth(window.innerWidth);
        (async () => {
            const projectsPromise = await getListData("project/user/"+params.user)
            setProjects(projectsPromise)
        })()
    // eslint-disable-next-line
    }, [])

    function getCol2Xl(index:number):number {
        if (index % 3 == 0) {
            return 1
        } else if ((index + 1) % 3 == 0) {
            return 3
        }
        return 2
    }
    function getColLg(index:number):number {
        if (index % 2 == 0) {
            return 1
        } else if ((index + 1) % 2 == 0) {
            return 2
        }
        return 1
    }
    function getCol(p:Project):number {
        const index = projects.indexOf(p)
        if (windowWidth > 1440) {
            return getCol2Xl(index)
        } else if (windowWidth > 1024) {
            return getColLg(index)
        }
        return 1
    }
    return (
        <div className="h-[99vh] flex flex-col justify-center items-center w-screen">
            <SVGProjectsPage />
            <div className=" flex flex-col gap-6 items-center justify-center w-full h-full">
                <div className="flex items-center flex-col w-full h-4/5">
                    <h1 className="h2 sm:text-[68px] sm:w-3/5 w-full stroke-text-white text-center px-6 lg:text-start text-white lg:stroke-text-white lg:text-primary dark:lg:text-white">
                        Projetos
                    </h1>
                    <div className="w-full lg:w-3/5 h-[70vh] flex justify-center overflow-y-scroll">
                        <div className={"justify-start grid-flow-col grid-cols-1 lg:grid-cols-2 2xl:grid-cols-3 grid p-6 gap-y-5 gap-x-12 h-min w-fit sm:w-1/2 lg:w-full "}>
                            {projects.map(p => {
                                return <ProjectComponent project={p} key={p.id} col={getCol(p)} />
                            })}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}