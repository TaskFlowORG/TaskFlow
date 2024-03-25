"use client"

import { Calendar, Canvas, Kanban, List, Table, TimeLine } from "@/components/Pages";
import { CanvasPage, OrderedPage,  Page,  TypeOfPage, User } from "@/models";
import { pageService, projectService, userService } from "@/services";
import { ProjectContext } from "@/utils/ContextProject";
import { useContext, useEffect, useState } from "react";
   
export default function Pages({params}:{params:{user:string, project:number, page:number}}){
    const [page, setPage] = useState<Page>()
    const {project} = useContext(ProjectContext)
    const [user, setUser] = useState<User>()

    useEffect(()=>{
        (async () => {
            const pageT = await pageService.findOne(params.page)
            const userT = await userService.findByUsername(params.user)
            setPage(pageT)
            setUser(userT)
        })()
    },[params])

    switch(page?.type){
        case TypeOfPage.CALENDAR:
            return <Calendar page={page as OrderedPage} />
        case TypeOfPage.KANBAN:
            return <Kanban />
        case TypeOfPage.LIST:
            return <List page={page} />
        case TypeOfPage.TABLE:
            return <Table page={page} project={project!} />
        case TypeOfPage.TIMELINE:
            return <TimeLine />
        case TypeOfPage.CANVAS:
            return <Canvas page={page as CanvasPage} user={user!} />
    }
}