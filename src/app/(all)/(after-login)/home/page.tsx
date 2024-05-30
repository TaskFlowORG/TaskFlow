"use client"
import { SVGInitialPage } from "@/components/Shapes"
import { ProjectsMainPage, InitialPageTasks} from "@/components/InitialAndProjectsPage"
import {  } from "@/components/InitialAndProjectsPage"
import { projectService, taskService } from "@/services"
import { useContext, useEffect, useState } from "react"
import { Project } from "@/models"
import { Task } from "@/models"
import { ProjectsContext } from "@/contexts"
import { useTranslation } from "next-i18next"
import { useAsyncThrow } from "@/hooks/useAsyncThrow"
import { UserContext } from "@/contexts/UserContext"

export default function InitialPage() {
    const {projects} = useContext(ProjectsContext);
    const [tasks, setTasks] = useState<Task[]>([])
  const asynThrow = useAsyncThrow();
        const {user} = useContext(UserContext);
    
  
    useEffect(() => {
        (async () => {
            const tasks = await taskService.findTodaysTasks(user?.username ?? "").catch(asynThrow);
            if(!tasks) return;
            setTasks(tasks)
        })()
    }, [])

    const {t} = useTranslation()

    return (
        <div className="flex flex-col justify-center items-center pt-24 sm:pt-18 lg:pt-0 h-full w-screen">
            <SVGInitialPage />
            <div className="w-screen flex flex-col gap-6 items-center justify-center h-full lg:h-4/5">
                <div className="flex flex-col gap-2 initial-page  sm:gap-6 items-center h-full w-full lg:w-3/5 pb-12 lg:pt-0">
                    <h1 className="sm:text-h1 w-full h-min px-1 text-white font-alata stroke-text-white
                    text-center xl:text-primary dark:xl:text-white xl:text-start">
                        {t("initial-page")}
                    </h1>
                    <div className={`flex w-full flex-col  flex-1 h-full pt-6 lg:pt-0 justify-start 
                    items-center gap-6 lg:flex-row lg:justify-center lg:items-start`}>
                        <ProjectsMainPage projects={projects} user={user?.username ?? ""} />
                        <div className="h-full w-2/3 lg:h-full flex tasks-today">
                            <InitialPageTasks tasks={tasks}/>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}