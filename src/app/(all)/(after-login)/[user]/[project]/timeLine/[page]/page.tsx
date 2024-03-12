"use client"
import { SideModal } from "@/components/Modal"
import { RegisterProperty } from "@/components/RegisterProperty"
import { Page, Project } from "@/models"
import { pageService, projectService } from "@/services"
import { ProjectContext } from "@/utils/ContextProject"
import { useContext, useEffect, useState } from "react"


export default function timeLine ({ params }: { params: { project: number, page: number } }) {
    const {project} = useContext(ProjectContext)
    const [page, setPage] = useState<Page>()

    useEffect(() => {
        (async () => {
            const pagePromisse = await pageService.findOne(params.page)
            setPage(pagePromisse)
        })()
    }, [params.project, params.page])
    interface Task {
        date: Date,
        id: number,
        name: string,
        uniProperties: Array<PropertyValue>,
        userProperties: Array<PropertyValue>,
        multiProperties: Array<MultiPropertyValue>,

    }
    interface Property {
        id: number,
        type: string,
        visible: true
    }
    interface PropertyValue {
        property: Property,
        value: string
    }
    interface MultiPropertyValue {
        property: Property,
        value: Array<string>
    }


    const [modalProperty, setModalProperty] = useState(false)
    return (
        <>
   <div className="h-full w-full">
                <div className=" flex items-center justify-center h-10 w-10  rounded-full  shadowww cursor-pointer bottom-10 right-10 fixed hover:bg-primary" onClick={()=> {setModalProperty(true)}}>
                    <p className="h5 text-primary h-min w-min hover:text-white" onClick={() => setModalProperty(true)}>+</p>
                </div>
                <SideModal condition={modalProperty} setCondition={setModalProperty} right>
                    <RegisterProperty project={project!} properties={project?.properties ?? []}  />
                </SideModal>


            </div>

        </>
    )
}