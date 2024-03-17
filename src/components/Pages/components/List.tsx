"use client";

import {  DragDropContext, Draggable, Droppable, DropResult } from "@hello-pangea/dnd"
import { Page, Property, TaskOrdered} from "@/models"
import { ValueSelector } from "./"
import { useEffect, WheelEvent, useRef, useState } from "react"
import { PageTypeIcons } from "../../icons";
import { HeaderList } from "./HeaderList";

interface Props {
    list: Array<TaskOrdered>,
    page: Page
}


export const List = ({ list, page}: Props) => {



    return (
<DragDropContext  key={page.id} onDragEnd={() => console.log("Update Indexes")} >
        <Droppable droppableId={`${page.id}`}>
            {(provided, snapshot) => {
                return (
                    <div key={page.id} ref={provided.innerRef} {...provided.droppableProps}  className=" min-w-[16rem] w-full h-full 
                     p-2 px-6  bg-white dark:bg-modal-grey flex flex-col items-center rounded-sm truncate shadow-blur-10">
                        <HeaderList page={page} name={page.name} />
                        <div className={"h-5/6 none-scrollbar w-full overflow-y-auto"}>
                            <div className="w-full relative h-min flex flex-col">
                                {list.sort((a, b) => a.indexAtColumn - b.indexAtColumn).map((l, index) => {
                                    return (
                                        <Draggable draggableId={`${l.id}`} index={index} key={index} >{
                                            (providedDrag, snapshot) => {
                                                return (<div className="relative block">
                                                        <div key={l.id}
                                                            className="bg-white dark:bg-modal-grey block  border-zinc-400 dark:border-zinc-600 border-b-2 w-full"
                                                            {...providedDrag.draggableProps}{...providedDrag.dragHandleProps} ref={providedDrag.innerRef}
                                                            style={snapshot.isDragging ?
                                                                { ...providedDrag.draggableProps.style, filter: "brightness(90%)", position:"absolute", top:0, left:0} :
                                                                { ...providedDrag.draggableProps.style }}>
                                                            <ValueSelector l={l} justName={true}/>
                                                        </div>
                                                    </div>)}}
                                        </Draggable>)
                                })}
                                {provided.placeholder}
                            </div>
                        </div>
                    </div>
                )
            }}
        </Droppable>
        </DragDropContext>
    )
}