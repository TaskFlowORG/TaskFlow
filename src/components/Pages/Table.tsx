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

    const [tasks, setTasks] = useState<TaskOrdered[]>(page.tasks as TaskOrdered[])
    const [properties, setProperties] = useState<Property[]>([...project.properties, ...page.properties])

    async function updateIndexes(e: DropResult) {
        if(!e.draggableId || !e.destination?.index) return
        const id = e.draggableId.split("/")[1]
        console.log(e.draggableId, e.destination?.index)
            const pagePromise = await pageService.updateIndexes(page!, +id, e.destination?.index, )
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
                    <div className="min-w-full h-full flex gap-1 shadow-blur-10">
                <DragDropContext onDragEnd={e => updateIndexes(e)}>

                            <List list={tasks} headName="Tasks" justName listId={ page.id ?? 0} />
                            {properties.map((p) => {
                                return <List list={tasks} property={p} headName={p.name} key={p.id} justName={false}   listId={page.id ?? 0} /> 
                            })}
                            </DragDropContext>
                    </div>
                </div>
            </div>
        </div>
        )
}
