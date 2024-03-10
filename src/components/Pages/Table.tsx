"use client";

import { List } from "@/components/List";
import { useEffect, useState } from "react";
import { DragDropContext, DropResult } from "@hello-pangea/dnd";
import { Page, Project, Property, TaskOrdered } from "@/models";
import { pageService, projectService } from "@/services";

interface Props{
    page:Page,
    project:Project
}

export const Table = ({ page, project}:Props) => {

    const[scroll, setScroll] = useState<number>(0)

    const [tasks, setTasks] = useState<TaskOrdered[]>(page.tasks as TaskOrdered[])
    const [properties, setProperties] = useState<Property[]>([...project.properties, ...page.properties])

    async function updateIndexes(e: DropResult) {
        if(!e.destination) return
        const task = page.tasks.find(t => t.id == +e.draggableId)
        page.tasks = page.tasks.sort((a, b) => (a as TaskOrdered).indexAtColumn - (b as TaskOrdered).indexAtColumn)
        if(!task) return
        const [removed] = page.tasks.splice(e.source.index, 1);
        page.tasks.splice(e.destination.index, 0, removed);
        for(let task of page.tasks){
            const t = task as TaskOrdered
            t.indexAtColumn = page.tasks.indexOf(t)
        }
        setTasks(page.tasks as TaskOrdered[])
        // pageService.update(page)
    }


    return (
        <div className="w-full h-full pt-20 flex flex-col justify-start items-center">
            <div className="h-full flex flex-col w-5/6 md:w-2/3 lg:w-3/5 xl:w-[45%] 2xl:w-[45%] gap-14">
                <div className="h-min w-full flex items-center justify-between">
                    <div className="h4 dark:text-white sm:text-[40px] md:text-[48px] w-full text-primary" style={page.name ? {opacity:0.7} : {}}>
                        {page.name || "Sem Nome"}
                    </div>
                    <div className="w-min flex">
                        <div className=" aspect-square dark:bg-secondary h-6 md:h-12 bg-primary rounded-full"></div>
                        <div className=" aspect-square dark:bg-secondary h-6 md:h-12 bg-primary rounded-full"></div>
                    </div>
                </div>
                <div className="w-full h-4/5 overflow-auto p-2">
                    <div className="min-w-full h-full flex gap-1 shadow-blur-10" >
                        <DragDropContext onDragEnd={e => updateIndexes(e)} >
                            <List list={tasks} headName="Tasks" justName listId={0} scrollY={scroll} setScrollY={setScroll} />
                            {properties.map((p) => {
                                return <List list={tasks} property={p} headName={p.name} key={p.id} justName={false} scrollY={scroll} setScrollY={setScroll}   listId={p.id} /> 
                            })}
                        </DragDropContext>
                    </div>
                </div>
            </div>
        </div>
        )
}
