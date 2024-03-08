'use client'

import { List } from "@/components/List";
import { useEffect, useState } from "react";
import { DragDropContext, DropResult } from "@hello-pangea/dnd";
import { OrderedPage, Page, TaskOrdered, TaskPage } from "@/models";
import { pageService } from "@/services";

interface Props {
    page: Page
}

export const ListPage = ({page }:Props) => {

    const [pages, setPages] = useState<Page[]>([])

    useEffect(() => {
        (async () => {
            const pagesPromise: Page[] = await pageService.findAll()
            let tasksPromise =  page.tasks
            const list = []
            for (let p of  pagesPromise) {
                for (let task of p.tasks) {
                    if (task.task.id == tasksPromise[0]?.task.id && page.id != p.id && list.find(p1 => p1.id == p.id) == undefined) {
                        list.push(p)
                    }
                }
            }
            setPages(list)
        })()
    // eslint-disable-next-line
    }, [])

    async function updateIndexes(e: DropResult) {
        if(!e.draggableId || !e.destination?.index) return
        const id = e.draggableId.split("/")[1]
        if (e.source.droppableId == e.destination?.droppableId) {
            await pageService.updateIndexes(page, +id, e.destination?.index)
        }
    }

    function contains(t: TaskPage): boolean {
        if(!page) return false
        for (let task of page.tasks){
            if (task.task.id == t.task.id ) return true
        }
        return false
    }

    return (
        <div className="w-full h-full pt-20 flex flex-col justify-start items-center">
            <div className="h-full flex flex-col w-5/6 md:w-2/3 lg:w-3/5 xl:w-[45%] 2xl:w-[45%] gap-14">
                <div className="h-min w-full flex items-center justify-between">
                    <div className="h4 dark:text-white sm:text-[40px] md:text-[48px] w-full text-primary">
                        {page?.name}
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
                                return <List key={p.id} list={(p?.tasks.filter(t => contains(t)) as TaskOrdered[])?? []} headName={p.name} updateIndexes={updateIndexes} justName listId={p.id} />
                            })
                        }
                        </DragDropContext>
                    </div>
                </div>
            </div>
        </div>
    );
};