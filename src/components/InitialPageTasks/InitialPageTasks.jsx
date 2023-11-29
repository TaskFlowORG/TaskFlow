'use client';

import { useEffect, useState } from "react"
import { CardContent } from "../CardContent";
import { RoundedCard } from "../RoundedCard";

export const InitialPageTasks = () => {
    const [tasks, setTasks] = useState([])
    useEffect(() => {
        //Comunicação API
        setTasks([])
    }, [])

    return (
        <div className="flex-col justify-start h-full w-full gap-8 py-4 p-8
         items-center flex bg-white rounded-sm shadow-blur-10">

            <h4 className="h4 text-primary h-min">Tarefas De Hoje</h4>
            <div className="flex justify-center flex-wrap gap-5 h-96 lg:h-full w-full overflow-y-auto p-2" >
                {
                    tasks.map(t => {
                        return <div className="h-min flex items-center">
                            <RoundedCard color={t.color}>
                                <CardContent task={t} />
                            </RoundedCard>
                        </div>
                    })
                }
            </div >
        </div >
    )
}