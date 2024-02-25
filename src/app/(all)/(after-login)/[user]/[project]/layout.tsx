
'use client'

import { Header } from '@/components/Header';
import { RefObject, useEffect, useState } from 'react';
import { useTheme } from 'next-themes';
import { useContrast } from '@/hooks/useContrast'
import { Page, Project } from '@/models';
import { pageService, projectService } from '@/services';
import { Button } from '@/components/Button';
import Link from 'next/link';
import { PageComponent } from '@/components/@PageComponent';
import { SwiperSlide, Swiper } from 'swiper/react';
import { Pagination } from 'swiper/modules';
import { If } from '@/components/If';

export default function Layout({ children, params }: { children: React.ReactNode, params: { project: number, user: string } }) {

    const [merging, setMerging] = useState(false)
    const [project, setProject] = useState<Project>();
    const [pageMerging, setPageMerging] = useState<Page>()
    const [listMerge, setListMerge] = useState<Page[]>([]);
    useEffect(() => {
        (async () => {
            const project = await projectService.findOne(params.project);
            setProject(project);
            console.log(project)
        })()
    }, [params.project])

    const merge = () => {
        console.log(listMerge, pageMerging)
        pageService.merge(listMerge, pageMerging!.id)
        setListMerge([]); 
        setMerging(false); 
        setPageMerging(undefined)
    }

    return (
        <div className='flex w-full h-full'>
            <div className='fixed z- bottom-0 h-full flex pt-14 '>
                <div className='flex flex-col gap-2 h-full p-4 ' >
                    <div className='flex flex-col h-full overflow-auto p-1 relative w-[30rem] pb-48'>
                        <div className='flex flex-col gap-3 items-start h-min w-72'>
                            {project?.pages.map(page => {
                                return (
                                    <div key={page.id} className='flex gap-[1.15rem] w-72 items-center'>
                                        <If condition={merging && pageMerging != page}>
                                            <input type="checkbox" id={`${page.id}`} value={page.id} onChange={e => {
                                                if (e.target.checked) {
                                                    listMerge.push(page)
                                                } else {
                                                    listMerge.splice(listMerge.indexOf(page), 1)
                                                }
                                            }} className='w-5 h-5' />
                                        </If>
                                        <PageComponent  page={page} username={params.user} project={project} merging={merging} pageMerging={page == pageMerging}
                                            setMerging={setMerging} listMerge={listMerge} setPageMerging={setPageMerging} />
                                    </div>
                                )
                            })}
                        </div>
                    </div>
                    <If condition={merging}>
                        <div className='flex'>

                        <Button width='w-72' text='Cancelar' fnButton={() => {setListMerge([]); setMerging(false); setPageMerging(undefined)}} padding='p-2' paddingY='p-1' textSize='font-[14re]' />
                        <Button width='w-72' text='Conectar' fnButton={merge} padding='p-2' paddingY='p-1' textSize='font-[14re]' />
                        </div>
                        
                        <Button width='w-72' text='Adicionar Página' padding='p-2' paddingY='p-1' textSize='font-[14re]' />
                    </If>
                </div>
            </div>
            {children}
        </div>
    )
}
