'use client'

import { compareDates } from "@/functions";
import { TaskCalendar } from "./components/TaskCalendar";
import { useEffect, useState } from "react";
import { If } from "../If";

interface Props{
    date:InterfaceDate
}
interface InterfaceDate{
    day:Date,
    inThisMonth:boolean,
    tasks:Array<Task>
}

interface Task{
    date:Date,
    id:number
}
export const CalendarDay = ({ date }:Props) => {

    const [isHovering, setIsHovering] = useState<boolean>(false);
    const [windowWidth, setWindowWidth] = useState<number>(0);
    useEffect(() => {
        window.addEventListener('resize', () => {
            setWindowWidth(window.innerWidth)
        })
        setWindowWidth(window.innerWidth)
    }, [])
    const dayClasses:string = date.inThisMonth
        ? (compareDates(date.day, new Date()) ? " bg-primary dark:bg-secondary text-primary dark:text-white  " :
            "bg-white dark:bg-transparent border-[1px] dark:text-white border-primary dark:border-white text-primary")
        : "bg-zinc-200 text-black opacity-50 dark:opacity-100 dark:bg-modal-grey dark:border-secondary dark:text-secondary dark:border-[1px]";

    return (
        <div className={"aspect-square h-full px-2 pt-px sm:pt-2 font-montserrat relative text-[24x] sm:text-[32px] rounded-sm " + dayClasses}>
            <div className="w-full h-1/5 flex justify-start items-start flex-wrap">
                {
                    <If condition={date.tasks.length >= (windowWidth <= 1280 ? windowWidth <= 560 ? 3 : 5 : 21)}>
                        <div className="relative w-full flex justify-center"
                            onMouseEnter={() => setIsHovering(true)} onMouseLeave={() => setIsHovering(false)}>
                            <p className="text-[8px] sm:text-[12px] text-white bg-primarydark:bg-secondary  rounded-full w-min h-min sm:px-1">Tasks</p>
                            <If condition={isHovering}>
                                <div className="absolute flex w-full flex-wrap text-pink bg-white dark:bg-back-grey py-1 px-2 rounded-md shadow-blur-10 top-0 left-0">
                                    {date.tasks.map(t => <TaskCalendar task={t} key={t.id} />)}
                                </div>
                            </If>
                        </div>
                        <div className="flex flex-wrap w-full">
                            {date.tasks.map(t => <TaskCalendar task={t} key={t.id} />)}
                        </div>
                    </If>
                }
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