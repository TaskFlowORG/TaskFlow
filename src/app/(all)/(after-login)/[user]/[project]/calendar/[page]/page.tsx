'use client'

import page from "@/app/(all)/(before-login)/login/page";
import { CalendarDay } from "@/components/CaledarDay";
import { Arrow } from "@/components/icons/";
import { compareDates } from "@/functions";
import { OrderedPage, Property, TaskOrdered, TaskPage, TaskValue } from "@/models";
import { getData } from "@/services/http/api";
import { useEffect, useState } from "react";

interface Day{
    day:Date,
    inThisMonth:boolean,
    tasks:TaskPage[]
}


export default function CalendarPage({params}:{params:{page:string}}) {

    const [tasks, setTasks] = useState<TaskOrdered[]>([])
    const [page, setPage] = useState<OrderedPage>()
    const [month, setMonth] = useState<number>(0)
    const [year, setYear] = useState<number>(0)

    useEffect(() => {
        (async () => {
            const temporaryMonth = (new Date()).getMonth() + 1
            setMonth(temporaryMonth)
            setYear((new Date()).getUTCFullYear())
            const pagePromise:OrderedPage = (await getData("page", params.page));
            setPage(pagePromise)
            const tasksPromise = pagePromise.tasks as TaskOrdered[]
            setTasks(tasksPromise.filter((t:TaskOrdered) => {
                return (new Date(getPropertyValueOfOrdering(t , pagePromise.propertyOrdering)?.value.getValue()).getMonth()+1) == temporaryMonth 
            }))
        })()
    // eslint-disable-next-line
    }, [])

    function getPropertyValueOfOrdering(task:TaskOrdered, prop:Property| undefined):TaskValue | null{
        if(!prop) return null   
        for(let p of task.task.properties){
            if(p.property.id == prop.id){
                return p;
            }
        }
        return null;
    }

    function getDays():Array<Day> {
        const lastDate:Date = new Date(year, month, 0)
        const firstDate:Date = new Date(year, month - 1)
        const days:Array<Day> = [];
        for (let i = firstDate.getDay(); i > 0; i--) {
            let date:Date = new Date(firstDate);
            date.setTime(firstDate.getTime() - (i * 24 * 60 * 60 * 1000))
            days.push({ day: date, inThisMonth: false, tasks: tasks.filter(t => compareDates(new Date(getPropertyValueOfOrdering(t, page?.propertyOrdering)?.value.getValue()), date)) })
        }
        for (let i = 0; i < lastDate.getDate(); i++) {
            let date:Date = new Date(firstDate);
            date.setTime(firstDate.getTime() + (i * 24 * 60 * 60 * 1000))
            days.push({ day: date, inThisMonth: true, tasks: tasks.filter(t => compareDates(new Date(getPropertyValueOfOrdering(t, page?.propertyOrdering)?.value.getValue()), date) )})
        }
        for (let i = 1; i < (7 - lastDate.getDay()); i++) {
            let date:Date = new Date(lastDate);
            date.setTime(lastDate.getTime() + (i * 24 * 60 * 60 * 1000))
            days.push({ day: date, inThisMonth: false, tasks: tasks.filter(t => compareDates(new Date(getPropertyValueOfOrdering(t, page?.propertyOrdering)?.value.getValue()), date)) })
        }
        return days
    }
    function decMonth():void {
        if (month == 1) {
            setYear(year - 1)
            setMonth(12)
        } else {
            setMonth(month - 1)
        }
    }
    function incMonth():void {
        if (month == 12) {
            setYear(year + 1)
            setMonth(1)
        } else {
            setMonth(month + 1)
        }
    }
    function getMonthName():string {
        const date:Date = new Date(year, month - 1);
        const name:string = date.toLocaleString('pt-br', { month: 'long' });
        return name[0].toUpperCase() + name.slice(1, name.length)
    }

    return (
        <div className="w-full h-full pt-20 flex flex-col justify-start items-center">

            <div className="h-full flex flex-col w-5/6 md:w-2/3 lg:w-3/5 xl:w-[45%] 2xl:w-[45%]">
                <div className="h-fit w-full flex items-center">
                    <div className="h4 dark:text-white sm:text-[40px] md:text-[48px]  w-min text-primary">
                        {year}
                    </div>
                    <div className="w-full h-min flex justify-center items-center">
                        <button onClick={decMonth} className="rotate-180 h-4 md:h-6">
                            <Arrow />
                        </button>
                        <span className="h4 sm:text-[40px] md:text-[48px] h-min text-secondary dark:text-white w-32 sm:w-56 md:w-64 text-center">{getMonthName()}</span>
                        <button onClick={incMonth} className="h-4 md:h-6" >
                            <Arrow />
                        </button>
                    </div>
                    <div className="w-min flex">
                        <div className=" aspect-square dark:bg-secondary h-6 md:h-12 bg-primary rounded-full"></div>
                        <div className=" aspect-square dark:bg-secondary h-6 md:h-12 bg-primary rounded-full"></div>
                    </div>
                </div>
                <div className="grid grid-cols-7 gap-1 w-full h-fit">
                    <span className="text-back-grey dark:text-white h-6 sm:h-10 text-[1rem] font-alata sm:text-[1.5rem] text-center">DOM</span>
                    <span className="text-back-grey dark:text-white h-6 sm:h-10 text-[1rem] font-alata sm:text-[1.5rem] text-center">SEG</span>
                    <span className="text-back-grey dark:text-white h-6 sm:h-10 text-[1rem] font-alata sm:text-[1.5rem] text-center">TER</span>
                    <span className="text-back-grey dark:text-white h-6 sm:h-10 text-[1rem] font-alata sm:text-[1.5rem] text-center">QUA</span>
                    <span className="text-back-grey dark:text-white h-6 sm:h-10 text-[1rem] font-alata sm:text-[1.5rem] text-center">QUI</span>
                    <span className="text-back-grey dark:text-white h-6 sm:h-10 text-[1rem] font-alata sm:text-[1.5rem] text-center">SEX</span>
                    <span className="text-back-grey dark:text-white h-6 sm:h-10 text-[1rem] font-alata sm:text-[1.5rem] text-center">SAB</span>
                    {getDays().map(d=> <CalendarDay date={d} key={d.day.getDate() + ", " + d.day.getMonth() + ", " + d.day.getFullYear()} />)}
                </div>
            </div>
        </div>
    );
};