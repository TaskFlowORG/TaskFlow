

import { SVGInitialPage } from "@/components/Shapes"
import { ProjectsMainPage } from "@/components/ProjectsMainPage"
import { InitialPageTasks } from "@/components/InitialPageTasks/InitialPageTasks"

export default function InitialPage({params}:{params:{user:string}}) {


    return (
        <div className="flex flex-col justify-center items-center pt-24 sm:pt-18 lg:pt-0 h-max w-screen">
            <SVGInitialPage />
            <div className="w-screen flex flex-col gap-6 items-center justify-center h-max lg:h-4/5">
                <div className="flex flex-col gap-2 sm:gap-6 items-center h-full w-full lg:w-3/5 pb-12 lg:pt-0">
                    <h1 className="h3 sm:text-[68px] w-full h-min px-1 text-white stroke-text-white text-center xl:text-primary dark:xl:text-white xl:text-start">
                        Página Inicial
                    </h1>
                    <div className={`flex w-full flex-col-reverse  flex-1 h-full pt-6 lg:pt-0 justify-start 
                    items-center gap-6 lg:flex-row lg:justify-center lg:items-start`}>
                        <ProjectsMainPage user={params.user} />
                        <div className="h-full w-2/3 lg:h-[70vh]">
                            <InitialPageTasks user={params.user} />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}