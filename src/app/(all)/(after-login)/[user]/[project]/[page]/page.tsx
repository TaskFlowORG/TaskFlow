"use client"

import { Calendar, Canvas, Kanban, List, Table, TimeLine } from "@/components/Pages";
import { ProjectContext } from "@/contexts";
import { CanvasPage, OrderedPage,  Page,  TypeOfPage, User } from "@/models";
import { pageService, projectService, userService } from "@/services";
import { log } from "console";
import { useContext, useEffect, useState } from "react";
   
export default function Pages({params}:{params:{user:string, project:number, page:number}}){
    const {project} = useContext(ProjectContext)
    const [page, setPage] = useState<Page | undefined>(project?.pages.find(p => p.id == params.page))
    const [user, setUser] = useState<User>()
    useEffect(() => {
        (async () => {
            setUser(await userService.findLogged())
        })()
    }, [params.user])
    
    useEffect(() => {
        const pageTemp = project?.pages.find(p => p.id == params.page)
        setPage(pageTemp)
        console.log(pageTemp)
    }, [params.page, project, project?.pages])

    
    if(!user) return <></>
    if(!page) return (
        <div className="h3 text-primary dark:text-secondary w-full h-full flex justify-center items-center">
            Essa página não existe ou não pertence a esse projeto!
        </div>
    )
    switch(page?.type){
        case TypeOfPage.CALENDAR:
            return <Calendar page={page as OrderedPage} />
        case TypeOfPage.KANBAN:
            return <Kanban user={user} />
        case TypeOfPage.LIST:
            return <List page={page} />
        case TypeOfPage.TABLE:
            return <Table page={page} project={project} />
        case TypeOfPage.TIMELINE:
            return <TimeLine page={page} />
        case TypeOfPage.CANVAS:
            return <Canvas page={page as CanvasPage} user={user} />
    }
}