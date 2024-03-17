"use client";
import { DragDropContext, Draggable, Droppable, DropResult } from "@hello-pangea/dnd"
import { Page, Property, TaskOrdered } from "@/models"
import { ValueSelector } from "."
import { useRef, useContext, useState, useEffect } from "react"
import { HeaderList } from "./HeaderList";
import { ProjectContext } from "@/utils/ContextProject";
interface Props {
    page: Page,
    updateIndex: (e: DropResult) => void
}
export const Table = ({ page, updateIndex }: Props) => {
    const ref = useRef<HTMLDivElement>(null)
    const { project } = useContext(ProjectContext)
    const [props, setProps] = useState<Property[]>([])
    useEffect(() => {
        if (project) {
            setProps([...project.properties, ...page.properties])
        }
    }, [project, page])
    return (
        <div className=" px-6 bg-white dark:bg-modal-grey  h-full w-full flex flex-col overflow-y-scroll rounded-md shadow-blur-10">
            <main key={page.id} className=" max-h-full flex w-full h-full flex-col">
                <header className=" bg-white dark:bg-modal-grey h-24 w-full flex sticky top-0  left-0 ">
                    <span className="min-w-[14rem] w-full h-full bg-white dark:bg-modal-grey border-zinc-400  dark:border-zinc-600 border-b-2">
                        <span className="w-full flex items-center justify-start h-full">
                            <HeaderList name={"Tasks"} />
                        </span>
                    </span>
                    {props.map((p) => (
                        <span key={p.id} className="min-w-[14rem] w-full h-full bg-white dark:bg-modal-grey border-zinc-400  dark:border-zinc-600 border-b-2">
                            <span className="w-full flex items-center justify-start h-full">                                
                                <HeaderList name={p.name} p={p} />
                            </span>
                        </span>
                    ))}
                </header>
                <DragDropContext onDragEnd={updateIndex} >
                    <Droppable droppableId={`${page.id}`}>
                        {(provided, snapshot) => {
                            return (
                                // se eu deixar com w-min ele vai funcionar o tamanho da linha, mas quando tiver menas colunas ele nao vai preencher a linha
                                <div ref={provided.innerRef} {...provided.droppableProps} className="h-min flex flex-col w-full">
                                        {(page.tasks as TaskOrdered[])
                                            .sort((a, b) => a.indexAtColumn - b.indexAtColumn)
                                            .map((l, index) => {
                                                return (
                                                    <Draggable draggableId={`${index}`} index={index} key={index} >{
                                                        (providedDrag, snapshot) => {
                                                            return (
                                                                <div 
                                                                    {...providedDrag.draggableProps}
                                                                    {...providedDrag.dragHandleProps}
                                                                    ref={providedDrag.innerRef} 
                                                                    className="bg-white dark:bg-modal-grey flex w-full hover:brightness-95">
                                                                    <div className="min-w-[14rem] w-full bg-white dark:bg-modal-grey border-zinc-400  dark:border-zinc-600 border-y-[1px] ">
                                                                        <ValueSelector l={l} justName={true} />
                                                                    </div>
                                                                    {
                                                                        props.map((p, index) => {
                                                                            return <div key={index} className="min-w-[14rem] w-full bg-white dark:bg-modal-grey border-zinc-400  
                                                                            dark:border-zinc-600 border-y-[1px] ">
                                                                                <span className=" flex items-center justify-between w-full">
                                                                                    <div className="w-px bg-zinc-400 dark:bg-zinc-600 h-8" />
                                                                                    <ValueSelector l={l} justName={false} property={p} propVl={l.task.properties.find(p1 => p1.property.id == p.id)} />
                                                                                </span>
                                                                            </div>
                                                                        })
                                                                    }
                                                                </div>)
                                                        }}
                                                    </Draggable>)
                                            })}
                                    {provided.placeholder}
                                </div>
                            )
                        }}
                    </Droppable>
                </DragDropContext>
            </main>
            </div>
    )
}
