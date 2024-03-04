"use client";

import { Calendar, Canvas, Kanban, List, Table, TimeLine } from "@/components/Pages";
import { CanvasPage, OrderedPage, Page, TypeOfPage } from "@/models";
import { pageService } from "@/services";
import { useEffect, useState } from "react";
import { set } from "react-hook-form";


export default function Pages({params}:{params:{page:number, project:number, user:string}}){

    const[page, setPage] = useState<Page>()
    useEffect(() => {
        (async () => {
            const pagePromise = await pageService.findOne(params.page)
            console.log(pagePromise)
            setPage(pagePromise)

        })()
    // eslint-disable-next-line
    }, [params.page])

    switch(page?.type){
        case TypeOfPage.CALENDAR:
            return <Calendar page={page as OrderedPage} />
        case TypeOfPage.KANBAN:
            return <Kanban />
        case TypeOfPage.LIST:
            return <List page={page} />
        case TypeOfPage.TABLE:
            return <Table page={page} project={params.project} />
        case TypeOfPage.TIMELINE:
            return <TimeLine />
        case TypeOfPage.CANVAS:
            return <Canvas page={page as CanvasPage} user={params.user} />
    
    }

}