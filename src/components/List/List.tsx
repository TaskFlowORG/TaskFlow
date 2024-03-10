
import {  Draggable, Droppable, DropResult } from "@hello-pangea/dnd"
import { Property, TaskOrdered} from "@/models"
import { IconsSelector, ValueSelector } from "./component"
import { useEffect, WheelEvent, useRef, useState } from "react"

interface Props {
    list: Array<TaskOrdered>,
    headName: string,
    multivalued?: boolean,
    justName: boolean,
    property?: Property,
    listId: number;
    scrollY?: number;
    setScrollY?: (y: number) => void;
}


export const List = ({ list, headName, justName, property, listId, scrollY, setScrollY}: Props) => {
    const [mouseOver, setMouseOver] = useState<boolean>(false)
    const ref = useRef<HTMLDivElement>(null)
    function getValueOfProperty(task: TaskOrdered) {
        if (!property) return
        for (let prop of task.task.properties) {
            if (prop.property.id == property.id) return prop
        }
    }
    useEffect(() => {
        if (scrollY != undefined && ref.current) {
            ref.current.scrollTop = scrollY
        }
    }, [scrollY, mouseOver])

    const setScroll = (e:WheelEvent<HTMLDivElement>) => {
        e.stopPropagation()
        console.log(e)
        if (ref.current && mouseOver) {
            let y = ref.current.scrollTop + e.deltaY * 0.3
            if (y < 0) y = 0
            if (y > ref.current.scrollHeight - ref.current.clientHeight) y = ref.current.scrollHeight - ref.current.clientHeight
            setScrollY!(y)
        }   
    }

    return (

        <Droppable droppableId={listId.toString()} direction="vertical">
            {(provided, snapshot) => {
                return (
                    <div key={listId} ref={provided.innerRef} {...provided.droppableProps}  className=" min-w-[16rem] w-full h-full
                     p-2 px-6  bg-white dark:bg-modal-grey flex flex-col items-center rounded-sm truncate shadow-blur-10">
                        <div className="flex gap-4 p-3 h-14 sm:h-20 w-full items-center justify-start text-modal-grey dark:text-white border-zinc-400 dark:border-zinc-600 border-b-2">
                            <IconsSelector property={property} justName={justName} />
                            <p className={"w-full truncate " + (headName ? "":"opacity-50")}>{ headName ?? "Sem Nome"}</p>
                        </div>
                        <div className="h-5/6 overflow-hidden none-scrollbar w-full" ref={ref}  onWheelCapture={e => setScroll(e)}
                        onMouseLeave={() => setMouseOver(false)}  onMouseEnter={() => setMouseOver(true)}>
                            <div className="w-full relative flex flex-col">
                                {list.sort((a, b) => a.indexAtColumn - b.indexAtColumn).map((l, index) => {
                                    return (
                                        <Draggable  draggableId={l.id.toString()} index={index} key={index} >{
                                            (provided, snapshot) => {
                                                const propVl = getValueOfProperty(l);
                                                return (<div className="relative block">
                                                        <div key={l.id}
                                                            className="bg-white dark:bg-modal-grey block  border-zinc-400 dark:border-zinc-600 border-b-2 w-full"
                                                            {...provided.draggableProps}{...provided.dragHandleProps} ref={provided.innerRef}
                                                            style={snapshot.isDragging ?
                                                                { ...provided.draggableProps.style, filter: "brightness(90%)", position:"absolute", top:0, left:0} :
                                                                { ...provided.draggableProps.style }}>
                                                            <ValueSelector l={l} justName={justName} property={property} propVl={propVl} />
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
    )
}