'use client'

import { List } from "@/components/List";
import { IconTask } from "@/components/icons";
import { useEffect, useState } from "react";

interface Task {
    date: Date,
    id: number,
    name:string,
    uniProperties: Array<PropertyValue>,
    userProperties: Array<PropertyValue>,
    multiProperties: Array<MultiPropertyValue>,

}
interface Property {
    id: number,
    type: string,
    visible : true
}
interface PropertyValue {
    property: Property,
    value: string
}
interface MultiPropertyValue {
    property: Property,
    value: Array<string>
}
export default function tablePage() {

    const [tasks, setTasks] = useState<Array<Task>>([])
    const [properties, setProperties] = useState<Array<Property>>([])
    useEffect(() => {
        //comunicação com API
        setTasks([
        ])
        // let props = [...await getPropsOfPage()]
        // props =  [...props, ...await getPropsOfProject()]

        setProperties([
        ])
    }, [])

    return (
        <div className="w-full h-full pt-20 flex flex-col justify-start items-center">

            <div className="h-full flex flex-col w-5/6 md:w-2/3 lg:w-3/5 xl:w-[45%] 2xl:w-[45%] gap-14">
                <div className="h-min w-full flex items-center justify-between">
                    <div className="h4 dark:text-white sm:text-[40px] md:text-[48px] w-full text-primary">
                        Page Name
                    </div>
                    <div className="w-min flex">
                        <div className=" aspect-square dark:bg-secondary h-6 md:h-12 bg-primary rounded-full"></div>
                        <div className=" aspect-square dark:bg-secondary h-6 md:h-12 bg-primary rounded-full"></div>
                    </div>
                </div>
                <div className="w-full h-4/5 justify-center items-start flex">
                    {properties.map(p => {
                        return p.visible && <List icon={<IconTask />} list={tasks} property={p} headName="Tasks" key={p.id}/>    
                    })}
                </div>
            </div>
        </div>
    );
};