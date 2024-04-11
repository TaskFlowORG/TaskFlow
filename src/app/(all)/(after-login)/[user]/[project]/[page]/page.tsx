
"use client"

import { Calendar, Canvas, Kanban, List, Table, TimeLine } from "@/components/Pages";
import { ProjectContext } from "@/contexts";
import { UserContext } from "@/contexts/UserContext";
import { CanvasPage, OrderedPage,  Page,  Project,  TypeOfPage, User } from "@/models";
import { FilteredProperty } from "@/types/FilteredProperty";
import { FilterContext } from "@/utils/FilterlistContext";
import { PageContext } from "@/utils/pageContext";
import { log } from "console";
import { useContext, useEffect, useState } from "react";
   
export default function Pages({params}:{params:{user:string, project:number, page:number}}){
    const {project} = useContext(ProjectContext)
    const [page, setPage] = useState<Page | undefined>(project?.pages.find(p => p.id == params.page))
    const {user} = useContext(UserContext);
    const {setPageId, setInPage} = useContext(PageContext)
    const [filter, setFilter] = useState<FilteredProperty[]>([]);
    const [input, setInput] = useState("");
    const [list, setList] = useState<FilteredProperty>();


    useEffect(() => {
        const pageTemp = project?.pages.find(p => p.id == params.page)
        setPage(pageTemp)
        console.log(pageTemp)
        if(!pageTemp || !setInPage || !setPageId) return
        setPageId(pageTemp?.id)
        setInPage(true)
    }, [params.page, project, project?.pages])

    
    if(!user) return <></>
    if(!page) return (
        <div className="h3 text-primary dark:text-secondary w-full h-full flex justify-center items-center">
            Essa página não existe ou não pertence a esse projeto!
        </div>
    )
//     return (
//         <FilterContext.Provider
//         value={{
//           filterProp: filter,
//           setFilterProp: setFilter,
//           list,
//           setList: setList,
//           input: input,
//           setInput: setInput,
//         }}
//       >
// {page.type == TypeOfPage.CALENDAR && <Calendar page={page as OrderedPage} />}


//       </FilterContext.Provider>
//     )
   
    switch(page?.type){
        case TypeOfPage.CALENDAR:
            return <Calendar page={page as OrderedPage} />
        case TypeOfPage.KANBAN:
            return <Kanban user={user} page={page as OrderedPage} project={project as Project}/>
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

