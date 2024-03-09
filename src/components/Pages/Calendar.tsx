'use client'

import { CalendarDay } from "@/components/CaledarDay";
import { Arrow } from "@/components/icons/";
import { compareDates } from "@/functions";
import { DateValued, OrderedPage, Property, TaskOrdered, TaskPage, TaskValue } from "@/models";
import { pageService } from "@/services";
import { useEffect, useState } from "react";
import { CenterModal } from "../Modal";
import { CalendarTasksModal } from "../CalendarTasksModal";
import {Date as DateProp} from "@/models"

interface Day{
    day:Date,
    inThisMonth:boolean,
    tasks:TaskPage[]
}

interface Props  {
    page: OrderedPage
}

export const Calendar = ({page}:Props) => {

    const [tasks, setTasks] = useState<TaskOrdered[]>([])
    const [month, setMonth] = useState<number>(0)
    const [year, setYear] = useState<number>(0)
    const [modal, setModal] = useState<boolean>(false)

    useEffect(() => {
            const temporaryMonth = (new Date()).getMonth() + 1
            setMonth(temporaryMonth)
            setYear((new Date()).getUTCFullYear())
            const tasksPromise = page.tasks as TaskOrdered[]
            setTasks(tasksPromise)
    }, [page.tasks])

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
            days.push({ day: date, inThisMonth: false, tasks: tasks.filter(t => 
                compareDates(new Date(getPropertyValueOfOrdering(t, page.propertyOrdering)?.value.value), date)) })
        }
        for (let i = 0; i < lastDate.getDate(); i++) {
            let date:Date = new Date(firstDate);
            date.setTime(firstDate.getTime() + (i * 24 * 60 * 60 * 1000))
            
            days.push({ day: date, inThisMonth: true, tasks: tasks.filter(t => 
                compareDates(new Date(getPropertyValueOfOrdering(t, page.propertyOrdering)?.value.value), date) )})
        }
        for (let i = 1; i < (7 - lastDate.getDay()); i++) {
            let date:Date = new Date(lastDate);
            date.setTime(lastDate.getTime() + (i * 24 * 60 * 60 * 1000))
            days.push({ day: date, inThisMonth: false, tasks: tasks.filter(t => 
                compareDates(new Date(getPropertyValueOfOrdering(t, page.propertyOrdering)?.value.value), date)) })
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
        <div className="w-full h-full pt-20 flex justify-center items-start">

            <div className="max-w-[80%] h-5/6 flex items-center flex-col aspect-square ">
                <div className="h-fit w-full flex items-center">
                    <div className="font-alata text-[16px] dark:text-white smm:text-[24px] sm:text-[40px] md:text-[48px]  w-min text-primary">
                        {year}
                    </div>
                    <div className="w-full h-min flex justify-center items-center">
                        <button onClick={decMonth} className="rotate-180 h-4 sm:h-6">
                            <Arrow />
                        </button>
                        <span className=" sm:text-[40px] text-[16px] font-alata smm:text-[24px]  md:text-[48px] h-min text-secondary
                         dark:text-white w-24 smm:w-36  md:w-64 text-center">{getMonthName()}</span>
                        <button onClick={incMonth} className="h-4 sm:h-6" >
                            <Arrow />
                        </button>
                    </div>
                    <div className="w-min flex">
                        <div className=" aspect-square dark:bg-secondary h-6 sm:h-12 bg-primary rounded-full"></div>
                        <div className=" aspect-square dark:bg-secondary h-6 sm:h-12 bg-primary rounded-full"></div>
                    </div>
                </div>
                <div className="grid grid-cols-7 smm:gap-1 w-full h-fit">
                    <span className="text-back-grey dark:text-white h-3 mb-1 smm:mb-0 sm:h-10 text-[0.7rem] w-full font-alata sm:text-[1.5rem] text-center">DOM</span>
                    <span className="text-back-grey dark:text-white h-3 mb-1 smm:mb-0 sm:h-10 text-[0.7rem] w-full font-alata sm:text-[1.5rem] text-center">SEG</span>
                    <span className="text-back-grey dark:text-white h-3 mb-1 smm:mb-0 sm:h-10 text-[0.7rem] w-full font-alata sm:text-[1.5rem] text-center">TER</span>
                    <span className="text-back-grey dark:text-white h-3 mb-1 smm:mb-0 sm:h-10 text-[0.7rem] w-full font-alata sm:text-[1.5rem] text-center">QUA</span>
                    <span className="text-back-grey dark:text-white h-3 mb-1 smm:mb-0 sm:h-10 text-[0.7rem] w-full font-alata sm:text-[1.5rem] text-center">QUI</span>
                    <span className="text-back-grey dark:text-white h-3 mb-1 smm:mb-0 sm:h-10 text-[0.7rem] w-full font-alata sm:text-[1.5rem] text-center">SEX</span>
                    <span className="text-back-grey dark:text-white h-3 mb-1 smm:mb-0 sm:h-10 text-[0.7rem] w-full font-alata sm:text-[1.5rem] text-center relative">
                        SAB
                            <button className="[writing-mode:vertical-rl] font-montserrat h-min w-min px-px smm:px-1 rounded-r-md text-contrast text-[8px] sm:text-[12px] md:text-[13px] lg:text-[14px]
                            py-2 smm:py-3 xl:text-[16px] bg-primary dark:bg-secondary whitespace-nowrap absolute left-[95%] smm:left-full ml-1 cursor-pointer top-full mt-1" 
                            onClick={() => setModal(true)}>Tarefas sem Data...</button>
                    </span>
                    {getDays().map(d=> <CalendarDay propOrd={page.propertyOrdering as DateProp} date={d} key={d.day.getDate() + ", " + d.day.getMonth() + ", " + d.day.getFullYear()} />)}

                </div>
            </div>
            <CalendarTasksModal title="Tarefas Sem Data" modal={modal} setModal={setModal} propOrd={page.propertyOrdering as DateProp} withotTime
            tasks={tasks.filter((t) => t.task.properties.find(p => p.property.id === page.propertyOrdering?.id)?.value.value == null)} />
        </div>
    );
};