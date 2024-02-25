
import { If } from "../If"
import { IconArchive, IconCheckbox, IconNumber, IconSelect, IconTask, IconUser, IconCalendar, IconProgress, IconRadio, IconTag, IconText, IconClock } from "../icons"
import { useState } from "react"
import { generateContrast } from "@/functions"
import { Obj } from "../Obj"
import { DragDropContext, Draggable, Droppable, DropResult } from "@hello-pangea/dnd"
import { Option, Property, TaskOrdered, TaskValue, TypeOfProperty, UserWithoutPermission } from "@/models"

interface Props {
    list: Array<TaskOrdered>,
    headName: string,
    multivalued?: boolean,
    justName: boolean,
    property?: Property,
    updateIndexes: (e: DropResult) => void,
    listId: number
}


export const List = ({ list, headName, multivalued, justName, property, updateIndexes, listId }: Props) => {


    function getValueOfProperty(task: TaskOrdered) {
        if (!property) return
        for (let prop of task.task.properties) {
            if (prop.property.id == property.id) return prop
        }
    }

    function generateList(value: TaskValue | null | undefined): Array<Option> {
        let list = new Array<Option>
        if (!value) return list
        if (value.property.type == TypeOfProperty.CHECKBOX || value.property.type == TypeOfProperty.TAG) {
            let val = value.value.value as Option[]
            for (let opt of val) {
                list.push(opt)
            }
        }
        return list
    }

    return (
        <Droppable droppableId={listId.toString()}>
            {(provided, snapshot) => {
                return (

                    <div key={listId} ref={provided.innerRef} {...provided.droppableProps} className=" lg:min-w-[25%] sm:min-w-[30%] min-w-full w-full h-full p-2 px-6  bg-white dark:bg-modal-grey flex flex-col items-center rounded-sm truncate shadow-blur-10 ">

                        <div className={`flex gap-4 p-3 h-20 w-full min-w-min items-center justify-start truncate
             text-modal-grey dark:text-white border-zinc-400 dark:border-zinc-600 border-b-2`}>
                            <If condition={justName}>
                                <IconTask />
                                <div>

                                    <If condition={property?.type == TypeOfProperty.ARCHIVE}>
                                        <IconArchive />
                                    </If>
                                    <If condition={property?.type == TypeOfProperty.CHECKBOX}>
                                        <IconCheckbox />
                                    </If>
                                    <If condition={property?.type == TypeOfProperty.DATE}>
                                        <IconCalendar />
                                    </If>
                                    <If condition={property?.type == TypeOfProperty.NUMBER}>
                                        <IconNumber />
                                    </If>
                                    <If condition={property?.type == TypeOfProperty.PROGRESS}>
                                        <IconProgress />
                                    </If>
                                    <If condition={property?.type == TypeOfProperty.RADIO}>
                                        <IconRadio />
                                    </If>
                                    <If condition={property?.type == TypeOfProperty.SELECT}>
                                        <IconSelect />
                                    </If>
                                    <If condition={property?.type == TypeOfProperty.TAG}>
                                        <IconTag />
                                    </If>
                                    <If condition={property?.type == TypeOfProperty.TEXT}>
                                        <IconText />
                                    </If>
                                    <If condition={property?.type == TypeOfProperty.TIME}>
                                        <IconClock />
                                    </If>
                                    <If condition={property?.type == TypeOfProperty.USER}>
                                        <IconUser />
                                    </If>
                                </div>
                            </If>
                            <If condition={headName != null}>
                                <p>{headName}</p>
                            </If>
                        </div>
                        <div className="h-full min-w-min w-full">



                            <div className="w-full relative">
                                {list.sort((a, b) => a.indexAtColumn - b.indexAtColumn).map((l) => {
                                    return (
                                        <Draggable draggableId={listId + "/" + l.id ?? ""} index={l.indexAtColumn ?? 0} key={l.id}>{
                                            (provided, snapshot) => {
                                                const propVl = getValueOfProperty(l);
                                                return (
                                                    <div >
                                                        <div key={l.id}
                                                            className="bg-white dark:bg-modal-grey  border-zinc-400 dark:border-zinc-600 border-b-2 w-full"
                                                            {...provided.draggableProps}{...provided.dragHandleProps} ref={provided.innerRef}
                                                            style={snapshot.isDragging ?
                                                                { ...provided.draggableProps.style, filter: "brightness(90%)", left: 0, position: "absolute", top: (list.indexOf(l) * 5 + "rem") } :
                                                                { ...provided.draggableProps.style }}>
                                                            <If condition={justName}>
                                                                <div className={"w-full py-4 px-3 gap-6 h-16 overflow-clip justify-start items-center flex flex-wrap truncate" +
                                                                 (l.task.name ? " text-zinc-600 dark:text-zinc-200":" text-zinc-400 dark:text-zinc-500") } >
                                                                        <div className="bg-zinc-200 p-[0.35rem] text-white dark:text-zinc-800 dark:bg-zinc-600 flex flex-col text-[0.5rem] rounded-full">
                                                                           <p >/\</p>
                                                                           <p >\/</p>
                                                                        </div>
                                                                    {l.task.name || "Sem Nome"}
                                                                </div>
                                                                <div>
                                                                    <div className="w-full py-4 px-6 h-16 overflow-clip  justify-start text-zinc-400 items-center flex flex-wrap truncate">

                                                                        <If condition={property?.type == TypeOfProperty.ARCHIVE}>
                                                                            <div>
                                                                                Archive
                                                                            </div>
                                                                        </If>
                                                                        <If condition={property?.type == TypeOfProperty.DATE}>
                                                                            <div>
                                                                                {new Date(propVl?.value.value).toLocaleDateString()}
                                                                            </div>
                                                                        </If>
                                                                        <If condition={property?.type == TypeOfProperty.NUMBER}>
                                                                            <div>
                                                                                {propVl?.value.value}
                                                                            </div>
                                                                        </If>
                                                                        <If condition={property?.type == TypeOfProperty.PROGRESS}>
                                                                            <div>
                                                                                {propVl?.value.value + "%"}
                                                                            </div>
                                                                        </If>
                                                                        <If condition={property?.type == TypeOfProperty.RADIO || property?.type == TypeOfProperty.SELECT}>
                                                                            {
                                                                                propVl?.value.value != null ?
                                                                                    (<div className="p-1 rounded-md" style={{ backgroundColor: propVl?.value.value.color, color: generateContrast(propVl?.value.value.color) }}>
                                                                                        {propVl?.value.value.name}
                                                                                    </div>)
                                                                                    :
                                                                                    <></>
                                                                            }
                                                                        </If>
                                                                        <If condition={property?.type == TypeOfProperty.TAG || property?.type == TypeOfProperty.CHECKBOX}>
                                                                            <div className="flex gap-1 w-min max-w-[10rem] overflow-auto">
                                                                                {
                                                                                    generateList(propVl).map((opt) => {
                                                                                        return <div key={opt.id} className="p-1 rounded-md" style={{ backgroundColor: opt.color, color: generateContrast(opt.color) }}>{opt.name}</div>
                                                                                    })
                                                                                }
                                                                            </div>
                                                                        </If>
                                                                        <If condition={property?.type == TypeOfProperty.TEXT}>
                                                                            <div>
                                                                                {propVl?.value.value}
                                                                            </div>
                                                                        </If>
                                                                        <If condition={property?.type == TypeOfProperty.TIME}>
                                                                            <div>
                                                                                {!propVl?.value.value || propVl?.value.value.toString().slice(0, 8)}
                                                                            </div>
                                                                        </If>
                                                                        <If condition={property?.type == TypeOfProperty.USER}>
                                                                            <div>
                                                                                <Obj objs={propVl?.value.value as Array<UserWithoutPermission>} max={5} functionObj={() => { }} />
                                                                            </div>
                                                                        </If>
                                                                    </div>

                                                                </div>
                                                            </If>
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