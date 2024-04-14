'use client'

import { compareDates } from "../../functions";
import { useEffect, useState } from "react";
import { If } from "../../../If";
import { Obj } from "../../../Obj";
import { Date as DateProp, TaskPage } from "@/models";
import { CalendarTasksModal } from "../";

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
        ? (compareDates(date.day, new Date()) ? " bg-primary-opacity dark:bg-secondary text-contrast dark:border-white border-primary smm:border-none" :
            "bg-white dark:bg-transparent dark:text-white border-primary dark:border-white text-primary")
        : "bg-zinc-200 text-black opacity-50 smm:border-none border-zinc-400 dark:opacity-100 dark:bg-modal-grey dark:border-secondary dark:text-secondary dark:border-[1px]";


    return (
        <>
        <button className={"aspect-square h-full px-px smm:px-2  border-[1px] pt-1 font-montserrat relative cursor-pointer sm:text-[32px] smm:rounded-sm " + dayClasses}
        onClick={() => setModal(true)}>
            <div className="w-full h-1/5 flex justify-end items-start flex-wrap">
                <div className="flex flex-wrap w-full ">
                    <Obj objs={date.tasks} isTaskPage color={compareDates(date.day, new Date())} mawWidth="w-full" max={windowWidth > 1280 ? 1 : windowWidth > 1024 ? 2 : windowWidth>600  ? 2 : 1}functionObj={() => { }} />
                </div>
            </div>
            <div className="w-full h-4/5 text-[12px] smm:text-[18px]  md:text-[24px] flex items-end relative z-20 justify-end">
                {String(date.day.getDate()).padStart(2, "0")}
            </div>
        </button>
            <CalendarTasksModal propOrd={propOrd} setModal={setModal} modal={modal} title={"Tasks do dia "+String(date.day.getDate()).padStart(2, "0")} tasks={date.tasks} />
        </>
    )
}