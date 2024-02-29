"use client"
import { RegisterProperty } from "@/components/RegisterProperty"
import { Page, Project } from "@/models"
import { pageService, projectService } from "@/services"
import { useEffect, useState } from "react"

const timeLine = ({ params }: { params: { project: number, page: number } }) => {
    const [project, setProject] = useState<Project>()
    const [page, setPage] = useState<Page>()

    useEffect(() => {
        (async () => {
            const projectPromisse = await projectService.findOne(params.project)
            setProject(projectPromisse)
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
                    <p className="h5 text-primary h-min w-min hover:text-white">+</p>
                </div>
                <RegisterProperty open={modalProperty} project={project!} page={page} properties={[...project?.properties ?? [], ...page?.properties ?? []]} close={() => setModalProperty(false)} />


            </div>

        </>
    )
}

export default timeLine;