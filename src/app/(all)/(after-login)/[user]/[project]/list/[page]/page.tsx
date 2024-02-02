'use client'

import { List } from "@/components/List";
import { IconTask } from "@/components/icons";
import { Page } from "@/model/pages/Page";
import { TaskCanvas } from "@/model/relations/TaskCanvas";
import { getData, getListData, putData } from "@/services/http/api";
import { useEffect, useState } from "react";
import { set } from "zod";
import page from "@/app/(all)/(before-login)/login/page";
import { TypeOfPage } from "@/model/enums/TypeOfPage";
import { TaskValue } from "@/model/relations/TaskValue";
import { Task } from "@/model/tasks/Task";
import { DragDropContext, DropResult } from "@hello-pangea/dnd";


export default function ListPage({ params }: { params: { page: string } }) {

    const [pages, setPages] = useState<Page[]>([])
    const [pageObj, setPageObj] = useState<Page>()

    useEffect(() => {
        (async () => {
            const pagePromise: Promise<Page> = await getData("page", JSON.parse(params.page))
            setPageObj(await pagePromise)
            const pagesPromise: Promise<Page[]> = await getListData("page")
            let tasksPromise = (await pagePromise).tasks
            const list = []
            for (let page of await pagesPromise) {
                for (let task of page.tasks) {
                    if (task.id == tasksPromise[0].id && page.id != JSON.parse(params.page)) {
                        list.push(page)
                    }
                }
            }
            setPages(list)
        })()
    }, [])

    async function updateIndexes(e: DropResult) {
        if(!e.draggableId || !e.destination?.index) return
        const id = e.draggableId.split("/")[1]
        if (e.source.droppableId == e.destination?.droppableId) {
            const pagePromise = await putData(`page/${id}/${e.destination?.index}`, pageObj)
            setPageObj(await pagePromise)
        }
    }

    function contains(p:Page,  t: TaskCanvas): boolean {
        if(!p) return false
        for (let task of p.tasks) {
            if (task.task.id == t.task.id) return true
        }
        return false
    }

    return (
        <div className="w-full h-full pt-20 flex flex-col justify-start items-center">

            <div className="h-full flex flex-col w-5/6 md:w-2/3 lg:w-3/5 xl:w-[45%] 2xl:w-[45%] gap-14">
                <div className="h-min w-full flex items-center justify-between">
                    <div className="h4 dark:text-white sm:text-[40px] md:text-[48px] w-full text-primary">
                        {pageObj?.name}
                    </div>
                    <div className="w-min flex">
                        <div className=" aspect-square dark:bg-secondary h-6 md:h-12 bg-primary rounded-full"></div>
                        <div className=" aspect-square dark:bg-secondary h-6 md:h-12 bg-primary rounded-full"></div>
                    </div>
                </div>
                <div className="w-full h-4/5 overflow-auto p-2">
                    <div className="min-w-full h-full flex gap-4">
                <DragDropContext onDragEnd={e => updateIndexes(e)}>

                        {
                            pages.map((p) => {
                                return <List key={p.id} list={pageObj?.tasks.filter(t => contains(p, t)) ?? []} headName={p.name} updateIndexes={updateIndexes} justName listId={p.id} />
                            })
                        }
                        </DragDropContext>
                    </div>
                </div>
            </div>
        </div>
    );
};