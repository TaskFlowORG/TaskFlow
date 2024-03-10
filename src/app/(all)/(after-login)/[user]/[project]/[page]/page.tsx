import { Calendar, Canvas, Kanban, List, Table, TimeLine } from "@/components/Pages";
import { CanvasPage, OrderedPage,  TypeOfPage } from "@/models";
import { pageService, projectService, userService } from "@/services";
   
export default async function Pages({params}:{params:{user:string, project:number, page:number}}){
    const page = await pageService.findOne(params.page)
    const project = await projectService.findOne(params.project)
    const user = await userService.findByUsername(params.user)
    switch(page?.type){
        case TypeOfPage.CALENDAR:
            return <Calendar page={page as OrderedPage} />
        case TypeOfPage.KANBAN:
            return <Kanban />
        case TypeOfPage.LIST:
            return <List page={page} />
        case TypeOfPage.TABLE:
            return <Table page={page} project={project} />
        case TypeOfPage.TIMELINE:
            return <TimeLine />
        case TypeOfPage.CANVAS:
            return <Canvas page={page as CanvasPage} user={user} />
    }
}