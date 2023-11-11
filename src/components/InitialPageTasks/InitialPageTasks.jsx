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
        <>
            <h4 className="h4 text-pink">Tarefas De Hoje</h4>
            <div className="flex justify-center flex-wrap scroll-smooth gap-5 scroll w-full relative overflow-y-scroll p-2">
                {tasks.map(t => {
                    return <InitialPageTask key={t.id} />
                })}
            </div>
        </>
    )
}