

import { pageService } from "@/services"
import { useState } from "react"
import { Page, PagePost, Project, TypeOfPage } from "@/models"
import { If } from "@/components/If"
import { TypeOfPageComponent } from "@/components/TypeOfPageComponent"
import { PageComponent } from "@/components/PageComponent"
import { Button } from "@/components/Button"


interface Props {
    project: Project
    user: string

}

export const PageSide = ({ project, user }: Props) => {

    const [pageMerging, setPageMerging] = useState<Page>()
    const [listMerge, setListMerge] = useState<Page[]>([]);
    const [modal, setModal] = useState(false);
    const [type, setType] = useState<TypeOfPage>(TypeOfPage.KANBAN)
    const [merging, setMerging] = useState(false)

    const merge = () => {
        console.log(listMerge, pageMerging)
        pageService.merge(listMerge, pageMerging!.id)
        setListMerge([]);
        setMerging(false);
        setPageMerging(undefined)
    }

    const insert = async () => {
        await pageService.insert(new PagePost('Nova Página', type, project))
    }
    return (
        <>
            <div className='flex flex-col h-full overflow-auto p-1  pb-48'>
                <div className='flex flex-col gap-3 items-start h-min  w-[15.5rem] '>
                    {project?.pages.map(page => {
                        return (
                            <div key={page.id} className='flex gap-[1.15rem] w-[15.5rem] items-center'>
                                <If condition={merging && pageMerging != page}>
                                    <input type="checkbox" id={`${page.id}`} value={page.id} onChange={e => {
                                        if (e.target.checked) {
                                            listMerge.push(page)
                                        } else {
                                            listMerge.splice(listMerge.indexOf(page), 1)
                                        }
                                    }} className='w-5 h-5' />
                                </If>
                                <PageComponent page={page} username={user} project={project} merging={merging} pageMerging={page == pageMerging}
                                    setMerging={setMerging} listMerge={listMerge} setPageMerging={setPageMerging} />
                            </div>
                        )
                    })}
                </div>
            </div>
            <If condition={merging}>
                <div className='flex'>
                    <Button width='w-64' text='Cancelar' fnButton={() => { setListMerge([]); setMerging(false); setPageMerging(undefined) }} padding='p-2' paddingY='p-1' textSize='font-[14re]' />
                    <Button width='w-64' text='Conectar' fnButton={merge} padding='p-2' paddingY='p-1' textSize='font-[14re]' />
                </div>
                <Button width='w-64' text='Adicionar Página' fnButton={() => setModal(true)} padding='p-2' paddingY='p-1' textSize='font-[14re]' />
            </If>
            <div className='absolute bottom-[14.1rem] -right-2'>
                <div className='relative'>
                    <TypeOfPageComponent changingType={modal} setType={setType} setChangingType={setModal} closeModals={() => setModal(false)} changeType={insert} />
                </div>
            </div>
        </>
    )
}