import { SVGInitialPage } from "@/components/InitialPageShape"
import { InitialPageTasks } from "@/components/InitialPageTasks"
import { ProjectsMainPage } from "@/components/ProjectsMainPage"

export default function InitialPage() {

    return (
        <div className="h-full">
            <SVGInitialPage />
            <div className="w-screen flex flex-col gap-6 items-center justify-center relative z-[2] h-full">
                <div className="flex justify-start w-4/6 p-2">
                    <h1 className="h1 text-pink">Pagina Inicial</h1>
                </div>
                <div className="flex w-4/6 h-1/5 justify-center items-center">
                    <ProjectsMainPage />
                    <div className="h-full p-8 flex-col justify-center items-center flex bg-white rounded-sm shadow-blur-10 w-full">
                        <InitialPageTasks />
                    </div>
                </div>
            </div>
        </div>
    )
}