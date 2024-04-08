
import { useTranslation } from "next-i18next";
import { CardContent } from "../CardContent";
import { RoundedCard } from "../RoundedCard";
import { Task } from "@/models";
import { useEffect } from "react";


export const InitialPageTasks = ({tasks}:{tasks:Task[]}) => {
    
    return (
        <div className="flex-col justify-start h-full w-full gap-8 py-4 p-7
         items-center flex bg-white dark:bg-modal-grey rounded-sm shadow-blur-10">

            <h4 className="h4 text-primary dark:text-white  h-min">Tarefas De Hoje</h4>
            <div className="flex justify-center flex-wrap gap-5 h-min min-h-[70%] w-full none-scrollbar max-h-[85%] overflow-y-auto p-2" >
                {
                    tasks.length > 0? 
                    tasks.map(t => {
                        return <div className="h-min w-min flex items-center" key={t.id}>
                            <RoundedCard>
                                <CardContent task={t} />
                            </RoundedCard>
                        </div>
                    }) :
                    <div className="w-full h-full items-center flex text-primary dark:text-secondary text-alata text-[1.2rem] justify-center ">
                        {t('no-tasks-today')}
                    </div>
                }
            </div >
        </div >
    )
}