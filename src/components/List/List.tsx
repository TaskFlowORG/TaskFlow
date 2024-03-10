
import { If } from "../If"
import { generateContrast } from "@/functions"
import { Obj } from "../Obj"
import {  Draggable, Droppable, DropResult } from "@hello-pangea/dnd"
import { Option, Property, TaskOrdered, TaskValue, TypeOfProperty, UserWithoutPermission } from "@/models"
import { IconsSelector, ValueSelector } from "./component"

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


    function getValueOfProperty(task: TaskOrdered) {
        if (!property) return
        for (let prop of task.task.properties) {
            if (prop.property.id == property.id) return prop
        }
    }

    return (

        <Droppable droppableId={listId.toString()} direction="vertical">
            {(provided, snapshot) => {
                return (
                    <div key={listId} ref={provided.innerRef} {...provided.droppableProps} className=" lg:min-w-[25%] sm:min-w-[30%] min-w-full w-full h-full
                     p-2 px-6  bg-white dark:bg-modal-grey flex flex-col items-center rounded-sm truncate shadow-blur-10">
                        <div className={`flex gap-4 p-3 h-20 w-full min-w-min items-center justify-start truncate
                        text-modal-grey dark:text-white border-zinc-400 dark:border-zinc-600 border-b-2`}>
                            <IconsSelector property={property} justName={justName} />
                            <If condition={headName != null}>
                                <p>{headName}</p>
                            </If>
                        </div>
                        <div className="h-5/6 overflow-y-auto none-scrollbar w-full">
                            <div className="w-full relative flex flex-col">
                                {list.sort((a, b) => a.indexAtColumn - b.indexAtColumn).map((l, index) => {
                                    return (
                                        <Draggable draggableId={l.id.toString()} index={index} key={l.id}>{
                                            (provided, snapshot) => {
                                                const propVl = getValueOfProperty(l);
                                                return (
                                                    <div className="w-full flex" >
                                                        <div key={l.id}
                                                            className="bg-white dark:bg-modal-grey flex  border-zinc-400 dark:border-zinc-600 border-b-2 w-full"
                                                            {...provided.draggableProps}{...provided.dragHandleProps} ref={provided.innerRef}
                                                            style={snapshot.isDragging ?
                                                                { ...provided.draggableProps.style, filter: "brightness(90%)"} :
                                                                { ...provided.draggableProps.style }}>
                                                            <ValueSelector l={l} justName={justName} property={property} propVl={propVl} />
                                                        </div>
                                                    </div>)
                                            }}
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