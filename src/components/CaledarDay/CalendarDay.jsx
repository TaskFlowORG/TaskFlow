'use client'

import { compareDates } from "@/functions";
import { TaskCalendar } from "./components/TaskCalendar";
import { useState } from "react";

export const CalendarDay = ({ date }) => {

    const [isHovering, setIsHovering] = useState(false);

    const dayClasses = date.inThisMonth
        ? " border-[1px] border-primary text-primary " + (compareDates(date.day, new Date()) ? "bg-primary text-white opacity-50"  : "bg-white ")
        : " bg-zinc-200 text-black opacity-50 ";

    return (
        <div className={"aspect-square h-full px-2 pt-2 font-montserrat text-[32px] rounded-sm" + dayClasses}>
            <div className="w-full h-1/5 flex justify-start items-start flex-wrap">
                {
                    date.tasks.length >=22 ?
                        <div className=" relative  w-full "
                            onMouseEnter={() => setIsHovering(true)} onMouseLeave={() => setIsHovering(false)}>
                            <p className="text-[12px] text-white bg-primary rounded-full w-min h-min px-1">Tasks</p>
                            {isHovering && (
                                <div className="absolute flex w-full flex-wrap text-pink bg-white py-1 px-2 rounded-md shadow-blur-10 top-0 left-0">
                                    {date.tasks.map(t => <TaskCalendar task={t} key={t.id} />)}
                                </div>)
                            }
                        </div>
                        :
                        date.tasks.map(t => <TaskCalendar task={t} key={t.id} />)
                }
            </div>
            <div className="w-full h-4/5 flex items-end justify-end">
                {String(date.day.getDate()).padStart(2, "0")}
            </div>
        </div>
    )
}