'use client'

import { List } from "@/components/List";
import { IconTask } from "@/components/icons";
import { Project } from "@/model/Project";
import { Property } from "@/model/Properties/Property";
import { Page } from "@/model/pages/Page";
import { TaskCanvas } from "@/model/relations/TaskCanvas";
import { getData, getListData } from "@/services/http/api";
import { useEffect, useState } from "react";


export default function tablePage({ params }: { params: { page: string, project: string } }) {

    const [tasks, setTasks] = useState<Array<TaskCanvas>>([])
    const [properties, setProperties] = useState<Array<Property>>([])
    const [pageObj, setPageObj] = useState<Page>()

    useEffect(() => {
        (async () => {
            const pagePromise: Promise<Page> = await getData("page", JSON.parse(params.page))
            setPageObj(await pagePromise)
            const projectPromise: Promise<Project> = await getData("project", JSON.parse(params.project))

            let tasksPromise = (await pagePromise).tasks
            let propsPromise = [...(await projectPromise).properties, ...(await pagePromise).properties]
            setTasks(tasksPromise)
            setProperties(propsPromise.filter(p => p.visible))
        })()
    }, [])

    return (
        <div className="w-full h-full pt-20 flex flex-col justify-start items-center">

            <div className="h-full flex flex-col w-5/6 md:w-2/3 lg:w-3/5 xl:w-[45%] 2xl:w-[45%] gap-14">
                <div className="h-min w-full flex items-center justify-between">
                    <div className="h4 dark:text-white sm:text-[40px] md:text-[48px] w-full text-primary" style={!pageObj?.name ? {opacity:0.7} : {}}>
                        {pageObj?.name || "Sem Nome"}
                    </div>
                    <div className="w-min flex">
                        <div className=" aspect-square dark:bg-secondary h-6 md:h-12 bg-primary rounded-full"></div>
                        <div className=" aspect-square dark:bg-secondary h-6 md:h-12 bg-primary rounded-full"></div>
                    </div>
                </div>
                <div className="w-full h-4/5 overflow-auto p-2">
                    <div className="w-min h-min flex gap-1 shadow-blur-10">
                            <List list={tasks} headName="Tasks" justName />
                            {properties.map((p) => {
                                return <List list={tasks} property={p} headName={p.name} key={p.id} justName={false} />
                            })}
                    </div>
                </div>
            </div>
        </div>
    );
};