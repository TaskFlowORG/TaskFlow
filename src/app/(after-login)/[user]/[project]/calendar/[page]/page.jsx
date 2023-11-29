'use client'

import { CalendarDay } from "@/components/CaledarDay";
import { compareDates } from "@/functions";
import { useEffect, useState } from "react";

export default function CalendarPage() {

    const [tasks, setTasks] = useState([])
    const [month, setMonth] = useState(0)
    const [year, setYear] = useState(0)
    const [days, setDays] = useState(getDays())

    useEffect(() => {
        setMonth((new Date()).getMonth() + 1)
        setYear((new Date()).getUTCFullYear())
        //comunicação com API
        setTasks([])
    }, [])

    function getDays() {
        const lastDate = new Date(year, month, 0)
        const firstDate = new Date(year, month - 1)
        const days = [];
        for (let i = firstDate.getDay(); i > 0; i--) {
            let date = new Date(firstDate);
            date.setTime(firstDate.getTime() - (i * 24 * 60 * 60 * 1000))
            days.push({ day: date, inThisMonth: false, tasks: tasks.filter(t => compareDates(t.date, date)) })
        }
        for (let i = 0; i < lastDate.getDate(); i++) {
            let date = new Date(firstDate);
            date.setTime(firstDate.getTime() + (i * 24 * 60 * 60 * 1000))
            days.push({ day: date, inThisMonth: true, tasks: tasks.filter(t => compareDates(t.date, date)) })
        }
        for (let i = 1; i < (7 - lastDate.getDay()); i++) {
            let date = new Date(lastDate);
            date.setTime(lastDate.getTime() + (i * 24 * 60 * 60 * 1000))
            days.push({ day: date, inThisMonth: false, tasks: tasks.filter(t => compareDates(t.date, date)) })
        }
        return days
    }
    function decMonth() {
        console.log(month)
        if (month == 1) {
            setYear(year - 1)
            setMonth(12)
        } else {
            setMonth(month - 1)
        }
        setDays(getDays())
        //comunicação com API
        setTasks([])
    }
    function incMonth() {
        if (month == 12) {
            setYear(year + 1)
            setMonth(1)
        } else {
            setMonth(month + 1)
        }
        setDays(getDays())
        //comunicação com API
        setTasks([])
    }
    function getMonthName() {
        const date = new Date(year, month - 1);
        const name = date.toLocaleString('pt-br', { month: 'long' });
        return name[0].toUpperCase() + name.slice(1, name.length)
    }

    return (
        <div className="w-full h-full pt-20 flex flex-col justify-start items-center">

            <div className="h-full flex flex-col w-5/6 md:w-2/3 lg:w-3/5 xl:w-[45%] 2xl:w-[45%]">
                <div className="h-fit w-full flex items-center">
                    <div className="h4 sm:text-[40px] md:text-[48px]  w-min text-primary">
                        {year}
                    </div>
                    <div className="w-full h-min flex justify-center">
                        <button onClick={decMonth}>
                            <img src="/img/arrow.svg" className="rotate-180 relative -z-10 h-4 md:h-6" alt="Arrow" />
                        </button>
                        <span className="h4 sm:text-[40px] md:text-[48px] text-secondary w-32 sm:w-56 md:w-64 text-center">{getMonthName()}</span>
                        <button onClick={incMonth} >
                            <img src="/img/arrow.svg" className=" h-4 md:h-6" alt="Arrow" />
                        </button>
                    </div>
                    <div className="w-min flex">
                        <div className=" aspect-square h-6 md:h-12 bg-primary rounded-full"></div>
                        <div className=" aspect-square h-6 md:h-12 bg-primary rounded-full"></div>
                    </div>
                </div>
                <div className="grid grid-cols-7 gap-1 w-full h-fit">
                    <span className="text-back-grey h-6 sm:h-10 text-[1rem] font-alata sm:text-[1.5rem] text-center">DOM</span>
                    <span className="text-back-grey h-6 sm:h-10 text-[1rem] font-alata sm:text-[1.5rem] text-center">SEG</span>
                    <span className="text-back-grey h-6 sm:h-10 text-[1rem] font-alata sm:text-[1.5rem] text-center">TER</span>
                    <span className="text-back-grey h-6 sm:h-10 text-[1rem] font-alata sm:text-[1.5rem] text-center">QUA</span>
                    <span className="text-back-grey h-6 sm:h-10 text-[1rem] font-alata sm:text-[1.5rem] text-center">QUI</span>
                    <span className="text-back-grey h-6 sm:h-10 text-[1rem] font-alata sm:text-[1.5rem] text-center">SEX</span>
                    <span className="text-back-grey h-6 sm:h-10 text-[1rem] font-alata sm:text-[1.5rem] text-center">SAB</span>
                    {getDays().map(d => <CalendarDay date={d}
                        key={d.day.getDate() + ", " + d.day.getMonth() + ", " + d.day.getFullYear()} />)}
                </div>
            </div>
        </div>
    );
};