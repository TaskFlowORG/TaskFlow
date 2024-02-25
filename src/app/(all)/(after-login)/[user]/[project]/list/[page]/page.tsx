'use client'

import { List } from "@/components/List";
import { useEffect, useState } from "react";
import { DragDropContext, DropResult } from "@hello-pangea/dnd";
import { OrderedPage, Page, TaskOrdered, TaskPage } from "@/models";
import { pageService } from "@/services";


export default function ListPage({ params }: { params: { page: number } }) {

    const [pages, setPages] = useState<Page[]>([])
    const [pageObj, setPageObj] = useState<Page>()

    useEffect(() => {
        (async () => {
            const pagePromise: Page = await pageService.findOne(params.page)
            setPageObj( pagePromise)
            const pagesPromise: Page[] = await pageService.findAll()
            let tasksPromise = ( pagePromise).tasks
            const list = []
            for (let page of  pagesPromise) {
                for (let task of page.tasks) {
                    if (task.id == tasksPromise[0].id && page.id != params.page) {
                        list.push(page)
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
            const pagePromise = await pageService.updateIndexes(pageObj!, +id, e.destination?.index)
            setPageObj(await pagePromise)
        }
    }

    function contains(p:Page,  t: TaskPage): boolean {
        if(!p) return false
        for (let task of p.tasks) {
            if (task.task.id == t.task.id ) return true
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
                                return <List key={p.id} list={(pageObj?.tasks.filter(t => contains(p, t)) as TaskOrdered[])?? []} headName={p.name} updateIndexes={updateIndexes} justName listId={p.id} />
                            })
                        }
                        </DragDropContext>
                    </div>
                </div>
            </div>
        </div>
    );
};