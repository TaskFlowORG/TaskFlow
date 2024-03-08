'use client'

import { compareDates } from "@/functions";
import { useEffect, useState } from "react";
import { If } from "../If";
import { Obj } from "../Obj";
import { Date as DateProp, TaskPage } from "@/models";
import { CalendarTasksModal } from "../CalendarTasksModal";

interface Props {
    date: Day
    propOrd: DateProp
}
interface Day {
    day: Date,
    inThisMonth: boolean,
    tasks: TaskPage[];
}

export const CalendarDay = ({ date, propOrd }: Props) => {

    const [modal, setModal] = useState<boolean>(false)

    const [windowWidth, setWindowWidth] = useState<number>(0);
    useEffect(() => {
        window.addEventListener('resize', () => {
            setWindowWidth(window.innerWidth)
        })
        setWindowWidth(window.innerWidth)
    }, [])
    const dayClasses: string = date.inThisMonth
        ? (compareDates(date.day, new Date()) ? " bg-primary-opacity dark:bg-secondary text-contrast" :
            "bg-white dark:bg-transparent border-[1px] dark:text-white border-primary dark:border-white text-primary")
        : "bg-zinc-200 text-black opacity-50 dark:opacity-100 dark:bg-modal-grey dark:border-secondary dark:text-secondary dark:border-[1px]";


    return (
        <>
        <div className={"aspect-square h-full px-2 pt-px sm:pt-2 font-montserrat relative text-[24x] cursor-pointer sm:text-[32px] rounded-sm " + dayClasses}
        onClick={() => setModal(true)}>
            <div className="w-full h-1/5 flex justify-start items-start flex-wrap">
                <div className="flex flex-wrap w-full ">
                    {date.tasks.map((t, index) => <Obj objs={date.tasks} key={index} max={windowWidth <= 1280 ? windowWidth <= 560 ? 1 : 2: 3} functionObj={() => { }} />)}
                </div>
            </div>
            <div className="w-full h-4/5 flex items-end relative z-20 justify-end">
                {String(date.day.getDate()).padStart(2, "0")}
            </div>
        </div>
            <CalendarTasksModal propOrd={propOrd} setModal={setModal} modal={modal} title={"Tasks do dia "+String(date.day.getDate()).padStart(2, "0")} tasks={date.tasks} />
        </>
    )
}