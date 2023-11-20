'use client';

import { useEffect, useState } from "react"
import { InitialPageTask } from "./components";

export const InitialPageTasks = () => {
    const [tasks, setTasks] = useState([])
    useEffect(() => {
        //Comunicação API
        setTasks([
            {
                id: 1
            },
            {
                id: 2
            },
            {
                id: 3
            },
            {
                id: 4
            },
            {
                id: 5
            },
            {
                id: 6
            },
            {
                id: 7
            },
            {
                id: 8
            }
        ])
    }, [])

    return (
        <div className="p-8 flex-col justify-start h-full w-full gap-8
         items-center flex bg-white rounded-sm shadow-blur-10">

            <h4 className="h4 text-pink h-min">Tarefas De Hoje</h4>
            <div className="flex justify-center flex-wrap gap-5 h-[54vh] w-full overflow-y-auto p-2" >
                {
                    tasks.map(t => {
                        return <InitialPageTask key={t.id} />
                    })
                }
            </div >
        </div >
    )
}