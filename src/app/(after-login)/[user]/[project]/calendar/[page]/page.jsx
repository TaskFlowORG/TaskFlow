'use client'

import { CalendarDay } from "@/components/CaledarDay";
import { compareDates } from "@/functions";
import { useEffect, useState } from "react";

export default function CalendarPage() {

    const tasks = [{
        id: 1,
        name: "Tarefa 1",
        color: "#ff0000",
        date: new Date(2023, 10, 1)
    },
    {
        id: 2,
        name: "Tarefa 2",
        color: "#ff0000",
        date: new Date(2023, 10, 1)
    },
    {
        id: 3,
        name: "Tarefa 3",
        color: "#ff0000",
        date: new Date(2023, 10, 1)
    },
    {
        id: 4,
        name: "Tarefa 4",
        color: "#ff0000",
        date: new Date(2023, 10, 1)
    },
    {
        id: 5,
        name: "Tarefa 5",
        color: "#ff0000",
        date: new Date(2023, 10, 1)
    },
    {
        id: 6,
        name: "Tarefa 6",
        color: "#ff0000",
        date: new Date(2023, 10, 1)
    },
    {
        id: 7,
        name: "Tarefa 7",
        color: null,
        date: new Date(2023, 10, 1)
    },,
    {
        id: 8,
        name: "Tarefa 8",
        color: "#ff0000",
        date: new Date(2023, 10, 1)
    },
    {
        id: 11,
        name: "Tarefa 11",
        color: null,
        date: new Date(2023, 10, 2)
    },
    {
        id: 5,
        name: "Tarefa 5",
        color: "#ff0000",
        date: new Date(2023, 10, 1)
    },
    {
        id: 6,
        name: "Tarefa 6",
        color: "#ff0000",
        date: new Date(2023, 10, 1)
    },
    {
        id: 7,
        name: "Tarefa 7",
        color: null,
        date: new Date(2023, 10, 1)
    },,
    {
        id: 8,
        name: "Tarefa 8",
        color: "#ff0000",
        date: new Date(2023, 10, 1)
    },
    {
        id: 11,
        name: "Tarefa 11",
        color: null,
        date: new Date(2023, 10, 2)
    },
    {
        id: 2,
        name: "Tarefa 2",
        color: "#ff0000",
        date: new Date(2023, 10, 1)
    },
    {
        id: 3,
        name: "Tarefa 3",
        color: "#ff0000",
        date: new Date(2023, 10, 1)
    }
    ]
    const [month, setMonth] = useState(0)
    const [year, setYear] = useState(2023)
    const [days, setDays] = useState(getDays())

    useEffect(() => {
        setMonth(new Date().getMonth() + 1)
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
    }
    function incMonth() {
        if (month == 12) {
            setYear(year + 1)
            setMonth(1)
        } else {
            setMonth(month + 1)
        }
        setDays(getDays())
    }
    function getMonthName() {
        const date = new Date(year, month - 1);
        const name = date.toLocaleString('pt-br', { month: 'long' });
        return name[0].toUpperCase() + name.slice(1, name.length)
    }

    return (
        <div className="w-full h-min flex flex-col items-center justify-center">

            <div className="w-1/2 flex flex-col h-full justify-center items-center gap-4">
                <div className="flex items-center justify-between w-full">
                    <div className="h2 text-primary">
                        {year}
                    </div>
                    <div className="flex gap-2 items-center">
                        <button onClick={decMonth}>
                            <img src="/img/arrow.svg" className="rotate-180" alt="Arrow" />
                        </button>
                        <span className="h2 text-secondary w-64 text-center">{getMonthName()}</span>
                        <button onClick={incMonth} >
                            <img src="/img/arrow.svg" alt="Arrow" />
                        </button>
                    </div>
                    <div className="flex gap-2">
                        <div className="w-12 rounded-full h-12 bg-primary"></div>
                        <div className="w-12 rounded-full h-12 bg-primary"></div>
                    </div>
                </div>
                <div className="grid grid-cols-7 gap-1 w-full h-full">
                    <span className="text-back-grey h-10 h4 text-center">DOM</span>
                    <span className="text-back-grey h-10 h4 text-center">SEG</span>
                    <span className="text-back-grey h-10 h4 text-center">TER</span>
                    <span className="text-back-grey h-10 h4 text-center">QUA</span>
                    <span className="text-back-grey h-10 h4 text-center">QUI</span>
                    <span className="text-back-grey h-10 h4 text-center">SEX</span>
                    <span className="text-back-grey h-10 h4 text-center">SAB</span>
                    {getDays().map(d => <CalendarDay date={d}
                        key={d.day.getDate() + ", " + d.day.getMonth() + ", " + d.day.getFullYear()} />)}
                </div>
            </div>
        </div>
    );
};