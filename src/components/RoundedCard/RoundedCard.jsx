
'use client'

import { useEffect, useState } from "react";
import { CardContent } from "../CardContent/CardContent";
import { getListData } from "@/services/http/api";


export const RoundedCard = ({ color, task }) => {

    const [tasks, setTasks] = useState([])
    useEffect(() => {
        const getList = async () => {
            setTasks(await getListData("task"))
        }
        getList()
        console.log(task)
   

    },[])

    const style = {
        borderColor: color ? color : "#FF0000"
    }

    let hasProperty = true;
    return (

        <div style={style} className={` border-l-8   shadowww w-full  rounded-lg bg-[#FCFCFC] p-4 flex flex-col justify-between gap-4 max-w-[362px]`}>
 <CardContent key={task.id} task={task} />
        </div>
    )
}