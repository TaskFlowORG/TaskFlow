import { SVGInitialPage } from "@/components/Shapes"
import { InitialPageTasks } from "@/components/InitialPageTasks"
import { ProjectsMainPage } from "@/components/ProjectsMainPage"

export default function InitialPage() {

    return (
        <div className="h-full flex flex-col justify-center">
            <SVGInitialPage />
            <div className="w-screen flex flex-col gap-6 items-center justify-center h-4/5">
                <div className="flex justify-start w-4/6 px-12">
                    <h1 className="h1 text-pink ">Pagina Inicial</h1>
                </div>
                <div className="flex w-[62%] h-full justify-center items-start">
                    <ProjectsMainPage />
                     <div className="h-full pt-2">
                        <InitialPageTasks />
                     </div>
                </div>
            </div>
        </div>
    )
}