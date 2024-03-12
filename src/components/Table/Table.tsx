"use client";

import { DragDropContext, Draggable, Droppable, DropResult } from "@hello-pangea/dnd"
import { Page, Property, TaskOrdered } from "@/models"
import { IconsSelector, ValueSelector } from "./component"
import { useEffect, WheelEvent, useRef, useState } from "react"
import { Header } from "../Header";
import { HeaderList } from "./component/HeaderList";

interface Props {
    page: Page,
    updateIndex: (e: DropResult) => void
}


export const Table = ({ page, updateIndex }: Props) => {
    const ref = useRef<HTMLDivElement>(null)
    const {project} = 


    return (
        <div className="w-full h-full p-2 px-6 bg-white dark:bg-modal-grey flex flex-col items-center rounded-md shadow-blur-10">
            <DragDropContext onDragEnd={updateIndex} >
                <Droppable droppableId={`${page.id}`}>
                    {(provided, snapshot) => {
                        return (
                            <table key={page.id} ref={provided.innerRef} {...provided.droppableProps}>
                                <tr className="flex"  >
                                    <HeaderList justName={true} name={"Tasks"} />
                                    {page.tasks[0].task.properties.map((p, index) => {
                                        return (
                                            <HeaderList justName={false} name={p.property.name} key={p.id} p={p} />
                                        )
                                    })}
                                </tr>
                                {(page.tasks as TaskOrdered[])
                                    .sort((a, b) => a.indexAtColumn - b.indexAtColumn)
                                    .map((l, index) => {
                                        return (
                                            <Draggable draggableId={`${l.id}`} index={index} key={index} >{
                                                (providedDrag, snapshot) => {
                                                    return (
                                                        <tr key={l.id} className="bg-white w-min dark:bg-modal-grey flex border-zinc-400 
                                                        dark:border-zinc-600 border-b-2 hover:brightness-95"
                                                            {...providedDrag.draggableProps}
                                                            {...providedDrag.dragHandleProps}
                                                            ref={providedDrag.innerRef}>
                                                            <ValueSelector l={l} justName={true} />
                                                            {
                                                                .map((p, index) => {
                                                                    return <ValueSelector l={l} key={index} justName={false} property={p.property} propVl={p} />
                                                                })
                                                            }
                                                        </tr>)
                                                }}
                                            </Draggable>)
                                    })}
                                {provided.placeholder}
                            </table>
                        )
                    }}
                </Droppable>
            </DragDropContext>
        </div >
    )
}