'use client';

import { useEffect, useState } from "react"
import { InitialPageTask } from "./components";

export const InitialPageTasks = () => {
    const [tasks, setTasks] = useState([])
    useEffect(() => {
        //Comunicação API
        setTasks([
            {
                id: 1,
                name: "Tarefa 1",
                properties: [
                    { type: "text", value: "Descrição da Tarefa" },
                    { type: "users", value: [{ image: "/next.svg" }] },
                ]
            },
            {
                id: 2,
                name: "Tarefa 1",
                properties: [
                    { type: "text", value: "Descrição da Tarefa" },
                    { type: "users", value: [{ image: "/next.svg" }] },
                ]
            },
            {
                id: 3,
                name: "Tarefa 1",
                properties: [
                    { type: "text", value: "Descrição da Tarefa" },
                    { type: "users", value: [{ image: "/next.svg" }] },
                ]
            },
            {
                id: 4,
                name: "Tarefa 1",
                properties: [
                    { type: "text", value: "Descrição da Tarefa" },
                    { type: "users", value: [{ image: "/next.svg" }] },
                ]
            },
            {
                id: 5,
                name: "Tarefa 1",
                properties: [
                    { type: "text", value: "Descrição da Tarefa" },
                    { type: "users", value: [{ image: "/next.svg" }] },
                ]
            },
            {
                id: 6,
                name: "Tarefa 1",
                properties: [
                    { type: "text", value: "Descrição da Tarefa" },
                    { type: "users", value: [{ image: "/next.svg" }] },
                ]
            },
            {
                id: 7,
                name: "Tarefa 1",
                properties: [
                    { type: "text", value: "Descrição da Tarefa" },
                    { type: "users", value: [{ image: "/next.svg" }] },
                ]
            },
            {
                id: 8,
                name: "Tarefa 1",
                properties: [
                    { type: "text", value: "Descrição da Tarefa" },
                    { type: "users", value: [{ image: "/next.svg" }] },
                ]
            }
        ])
    }, [])

    return (
        <div className="p-8 flex-col justify-start h-full w-full gap-8
         items-center flex bg-white rounded-sm shadow-blur-10">

            <h4 className="h4 text-pink h-min">Tarefas De Hoje</h4>
            <div className="flex justify-center flex-wrap gap-5 h-[54vh] w-full overflow-y-auto p-2" >
                {
                    tasks.map(t => {
                        return <InitialPageTask key={t.id} />
                    })
                }
            </div >
        </div >
    )
}