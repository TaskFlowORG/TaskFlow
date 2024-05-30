
import { useTranslation } from "next-i18next";
import { CardContent } from "../CardContent";
import { RoundedCard } from "../RoundedCard";
import { Task } from "@/models";
import { useContext, useEffect } from "react";
import { UserContext } from "@/contexts/UserContext";
import { Loading } from "../Loading";
import { TaskModalContent } from "../TaskModal/TaskModalContent";
import { TaskModalContext } from "@/utils/TaskModalContext";
import { useRouter } from "next/navigation";
import { ProjectsContext } from "@/contexts";
import { projectService } from "@/services";
import { useAsyncThrow } from "@/hooks/useAsyncThrow";


export const InitialPageTasks = ({tasks}:{tasks:Task[]}) => {

    const {t} = useTranslation()
    const {setIsOpen, setSelectedTask} = useContext(TaskModalContext)
    const {user} = useContext(UserContext)
    const router = useRouter()
    const {projects} = useContext(ProjectsContext)
    const asynThrow = useAsyncThrow();

    const open = async (task:Task) => {
        if(!projects) return
        let projectsTemp = [];
        for(let p of projects){
            if(p.qttyPages > 0){
                const project = await projectService.findOne(p.id).catch(asynThrow)
                if(project) projectsTemp.push(project)
            }
        }
        const pages = projectsTemp.map(p => p.pages).flat() 
        const pageWithTask = pages.find(p => p.tasks.find(t => t.task.id === task.id))
        const projectWithPage = projectsTemp.find(p => p.pages.find(page => page.id === pageWithTask?.id))
        if(!setIsOpen || !setSelectedTask) return
        setSelectedTask(task)
        setIsOpen(true)
        router.push(`/home/${projectWithPage?.id}/${pageWithTask?.id}`)
    }


    if(!user) return <Loading/>
    return (
        <div className="flex-col justify-start h-full w-full gap-8 py-4 p-7
         items-center flex bg-white dark:bg-modal-grey rounded-sm shadow-blur-10">

            <h4 className="text-h4 font-alata text-primary dark:text-white  h-min">{t("todays-tasks")}</h4>
            <div className="flex justify-center flex-wrap gap-5 h-min min-h-[70%] w-full none-scrollbar max-h-[85%] overflow-y-auto p-2" >
                {
                    tasks.length > 0? 
                    tasks.map(t => {
                        return <div className="h-min w-min flex items-center cursor-pointer" key={t.id} onClick={() => open(t)}>
                            <RoundedCard>
                                <CardContent user={user} task={t} />
                            </RoundedCard>
                        </div>
                    }) :
                    <div className="w-full h-full items-center flex text-primary dark:text-secondary text-alata text-h5 font-montserrat justify-center ">
                        {t('no-tasks-today')}
                    </div>
                }
            </div >
        </div >
    )
}