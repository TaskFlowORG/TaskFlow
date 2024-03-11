'use client';

import { useEffect, useState } from "react"
import { CardContent } from "../CardContent";
import { RoundedCard } from "../RoundedCard";
import { Task } from "@/models";
import { taskService } from "@/services";


export const InitialPageTasks = ({user}:{user:string}) => {
    const [tasks, setTasks] = useState<Array<Task>>([])
    useEffect(() => {
        (async () => {
            setTasks(await taskService.findTodaysTasks(user))
        })()
    }, [])

    return (
        <div className="flex-col justify-start h-full w-full gap-8 py-4 p-8
         items-center flex bg-white dark:bg-modal-grey rounded-sm shadow-blur-10">

            <h4 className="h4 text-primary dark:text-white h-min">Tarefas De Hoje</h4>
            <div className="flex justify-center flex-wrap gap-5 h-full w-full overflow-y-auto p-2" >
                {
                    tasks.length > 0? 
                    tasks.map(t => {
                        return <div className="h-min flex items-center" key={t.id}>
                            <RoundedCard>
                                <CardContent task={t} />
                            </RoundedCard>
                        </div>
                    }) :
                    <div className="w-full h-full pb-14 flex text-primary dark:text-secondary text-alata text-[1.2rem] justify-center items-center">
                        Não há tarefas agendadas para hoje!
                    </div>
                }
            </div >
        </div >
    )
}