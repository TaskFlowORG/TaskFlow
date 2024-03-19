'use client'

import { ProjectComponent } from "@/components/InitialAndProjectsPage"
import { SVGProjectsPage } from "@/components/Shapes"
import { getData, getListData } from "@/services/http/api";
import { Project, ProjectPost, User } from "@/models";
import { useEffect, useState } from "react";
import { projectService, userService } from "@/services";
import { useRouter } from 'next/navigation'

export default function Projects({ params }: { params: { user: string } }) {
    const router = useRouter()
    const [windowWidth, setWindowWidth] = useState<number>(0);
    const [projects, setProjects] = useState<Project[]>([])
    const [user, setUser] = useState<User>()

    useEffect(() => {
        window.addEventListener('resize', () => {
            setWindowWidth(window.innerWidth)
        })
        setWindowWidth(window.innerWidth);
        setProjectsOfService()
        // eslint-disable-next-line
    }, [])

    function getCol2Xl(index: number): number {
        if (index % 3 == 0) {
            return 1
        } else if ((index + 1) % 3 == 0) {
            return 3
        }
        return 2
    }
    function getColLg(index: number): number {
        if (index % 2 == 0) {
            return 1
        } else if ((index + 1) % 2 == 0) {
            return 2
        }
        return 1
    }
    function getCol(p: Project): number {
        const index = projects.indexOf(p)
        if (windowWidth > 1440) {
            return getCol2Xl(index)
        } else if (windowWidth > 1024) {
            return getColLg(index)
        }
        return 1
    }
    const postProject = async () => {
        await projectService.insert(new ProjectPost(undefined, undefined, undefined, user!)).then(async () => {
            const newProject = await setProjectsOfService()
            if (newProject) {
                router.push(`/${params.user}/${newProject.id}`)
            }
        })


    }
    const setProjectsOfService = async (): Promise<Project | undefined> => {
        const projectsPromise = await projectService.findAllOfAUser(params.user)
        const newProject = projectsPromise.find(p => !projects.find(p2 => p2.id === p.id))
        setProjects(projectsPromise)
        const userPromise = await userService.findByUsername(params.user)
        setUser(userPromise)
        return newProject;
    }
    // separar em tres, duas e uma lista vai ser a melhor opção, cansei de me estressar com isso, vou fazer isso depois

    return (
        <div className="h-[99vh] flex flex-col justify-center items-center w-screen">
            <SVGProjectsPage />
            <div className=" flex flex-col gap-6 items-center justify-center w-full h-full">
                <div className="flex items-center flex-col w-full h-4/5">
                    <h1 className="h2 sm:text-[68px] sm:w-3/5 w-full stroke-text-white text-center px-6 lg:text-start text-white lg:stroke-text-white lg:text-primary dark:lg:text-white">
                        Projetos
                    </h1>
                    <div className="w-full lg:w-3/5 h-[70vh] flex justify-center none-scrollbar overflow-y-scroll">
                        <div className={"justify-start grid-flow-col grid-cols-1 lg:grid-cols-2 2xl:grid-cols-3 grid p-6 gap-y-5 gap-x-12 h-min w-fit sm:w-1/2 lg:w-full "}>
                            {projects.sort((p1, p2) => new Date(p2.visualizedAt).getTime()-new Date(p1.visualizedAt).getTime() ).map(p => {
                                return <ProjectComponent user={params.user} project={p} key={p.id} col={getCol(p)} />
                            })}
                        </div>
                    </div>
                </div>
            </div>
            <button onClick={postProject} className="rounded-full fixed bottom-10 right-10 w-10  h-10 flex justify-center items-center shadow-blur-10 bg-white 
            text-primary dark:bg-modal-grey dark:text-secondary hover:brightness-95 cursor-pointer">+</button>
        </div>
    )
}