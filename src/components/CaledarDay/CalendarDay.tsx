'use client'

import { compareDates } from "@/functions";
import { useEffect, useState } from "react";
import { If } from "../If";
import { TaskCanvas } from "@/model/relations/TaskCanvas";
import { Obj } from "../Obj";

interface Props {
    date: Day
}
interface Day {
    day: Date,
    inThisMonth: boolean,
    tasks: Array<TaskCanvas>
}

export const CalendarDay = ({ date }: Props) => {

    const [windowWidth, setWindowWidth] = useState<number>(0);
    useEffect(() => {
        window.addEventListener('resize', () => {
            setWindowWidth(window.innerWidth)
        })
        setWindowWidth(window.innerWidth)
    }, [])
    const dayClasses: string = date.inThisMonth
        ? (compareDates(date.day, new Date()) ? " bg-primary dark:bg-secondary text-primary dark:text-white  " :
            "bg-white dark:bg-transparent border-[1px] dark:text-white border-primary dark:border-white text-primary")
        : "bg-zinc-200 text-black opacity-50 dark:opacity-100 dark:bg-modal-grey dark:border-secondary dark:text-secondary dark:border-[1px]";

    return (
        <div className={"aspect-square h-full px-2 pt-px sm:pt-2 font-montserrat relative text-[24x] sm:text-[32px] rounded-sm " + dayClasses}>
            <div className="w-full h-1/5 flex justify-start items-start flex-wrap">
                <div className="flex flex-wrap w-full">
                    {date.tasks.map(t => <Obj objs={date.tasks} key={t.id} max={windowWidth <= 1280 ? windowWidth <= 560 ? 3 : 5 : 21} functionObj={() => { }} />)}
                </div>
            </div>
            <div className="w-full h-4/5 flex items-end relative z-20 justify-end">
                {String(date.day.getDate()).padStart(2, "0")}
            </div>
            <If condition={compareDates(date.day, new Date())}>
                <div className={`w-full h-full absolute bg-white z-10 dark:bg-back-grey opacity-75 border-[1px] 
                border-primary dark:border-white dark:opacity-50 top-0 left-0 rounded-sm`}></div>
            </If>
        </div>
    )
}