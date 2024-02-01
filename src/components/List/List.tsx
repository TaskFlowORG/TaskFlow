import { TaskCanvas } from "@/model/relations/TaskCanvas"
import { If } from "../If"
import { Property } from "@/model/Properties/Property"
import { TypeOfProperty } from "@/model/enums/TypeOfProperty"
import { Option } from "@/model/Properties/Option"
import { IconArchive, IconCheckbox, IconNumber, IconSelect, IconTask, IconUser, IconCalendar, IconProgress, IconRadio, IconTag, IconText, IconClock } from "../icons"
import { MultiOptionValued } from "@/model/values/MultiOptionValued"
import { TaskValue } from "@/model/relations/TaskValue"
import { ReactElement, ReactNode } from "react"
import { useContrast } from "@/hooks"
import { generateContrast } from "@/functions"
import { format } from "path"
import { Obj } from "../Obj"
import { User } from "@/model/User"
import { Task } from "@/model/tasks/Task"

interface Props {
    list: Array<TaskCanvas>,
    headName: string,
    multivalued?: boolean,
    justName: boolean,
    property?: Property
}


export const List = ({ list, headName, multivalued, justName, property }: Props) => {

    function getValueOfProperty(task: TaskCanvas) {
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

        <div className="w-min h-min p-2 px-6  bg-white dark:bg-modal-grey flex flex-col items-center rounded-sm truncate shadow-blur-10 ">

            <div className="flex gap-4 p-3 h-20 w-min items-center justify-start truncate text-modal-grey dark:text-white">
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
            <div className="h-full w-min ">

                <If condition={justName}>
                    <div>
                        {list.map((l) => {
                            return <div key={l.id} className="w-full py-4 px-3  h-16 overflow-clip border-zinc-400 dark:border-zinc-800 border-t-2 justify-start items-center flex flex-wrap truncate" 
                            style={{color:l.task.name ? "#52525b" : "#a1a1aa" }}>{l.task.name || "Sem Nome"}</div>
                        })}
                    </div>
                    <div>
                        {list.map((l) => {
                            const propVl = getValueOfProperty(l);
                            return (
                                <div key={l.id} className="w-full py-4 px-6 h-16 overflow-clip border-zinc-400 dark:border-zinc-800 border-t-2 justify-start text-zinc-400 items-center flex flex-wrap truncate">

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
                                            <Obj objs={propVl?.value.value as Array<User>} max={5} functionObj={() => { }} />
                                        </div>
                                    </If>
                                </div>
                            )

                        })}
                    </div>
                </If>
            </div>

        </div>
    )
}