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

    function generateList(value: TaskValue | null | undefined) {
        let list = [<></>]
        if (!value) return list
        if(value.property.type == TypeOfProperty.CHECKBOX || value.property.type == TypeOfProperty.TAG){
            let val = value.value.value as Option[]
            for (let opt of val) {
                list.push(<div key={opt.id} className="p-1 rounded-md" style={{ backgroundColor:opt.color, color: generateContrast(opt.color)}}>{opt.name}</div>)
            }
        }
        return list
    }
    return (

        <div className="w-full h-full p-2  min-w-[150px] bg-white dark:bg-modal-grey shadow-blur-10 flex flex-col items-start rounded-sm truncate">

            <div className="flex gap-4 p-3 h-20 items-center justify-start truncate text-modal-grey dark:text-white">
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
                <p>{headName}</p>
            </div>
            <div className="h-full overflow-auto w-full ">

                <If condition={justName}>
                    <div>
                        {list.map((l) => {
                            return <div key={l.task.id} className="w-full py-4 px-3 border-zinc-400 dark:border-zinc-800 border-t-2 justify-start text-zinc-400 items-center flex flex-wrap truncate">{l.task.name}</div>
                        })}
                    </div>
                    <div>
                        {list.map((l) => {
                            const propVl = getValueOfProperty(l);
                            return (
                                <div key={l.task.id} className="w-full py-4 px-3 border-zinc-400 dark:border-zinc-800 border-t-2 justify-start text-zinc-400 items-center flex flex-wrap truncate">
                                    <If condition={property?.type == TypeOfProperty.ARCHIVE}>
                                        <div>
                                            Archive
                                        </div>
                                    </If>
                                    <If condition={property?.type == TypeOfProperty.DATE}>
                                        <div>
                                            {propVl?.value.value}
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
                                        <div className="p-1 rounded-md" style={{ backgroundColor: propVl?.value.value.color, color: generateContrast(propVl?.value.value.color)}}>
                                            {propVl?.value.value.name}
                                        </div>
                                    </If>
                                    <If condition={property?.type == TypeOfProperty.TAG || property?.type == TypeOfProperty.CHECKBOX}>
                                        <div>
                                            {
                                                generateList(propVl).map((o: ReactNode) => {
                                                    return o
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
                                            {propVl?.value.value}
                                        </div>
                                    </If>
                                    <If condition={property?.type == TypeOfProperty.USER}>
                                        <div>
                                            {propVl?.value.value.name}
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