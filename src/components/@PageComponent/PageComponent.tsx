import { Page, PagePost, Project, TypeOfPage, TypeOfProperty } from "@/models";
import { useEffect, useRef, useState } from "react";
import { If } from "../If";
import { pageService } from "@/services";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Scrollbar, A11y, EffectCards, EffectCoverflow, Thumbs, Controller, HashNavigation, Manipulation, Parallax, Virtual } from "swiper/modules";
import "swiper/css";
import "swiper/css/effect-flip";
import "swiper/css/pagination";
import "swiper/css/navigation";
import { useTheme } from "next-themes";
import { Button } from "../Button";
import Link from "next/link";
import { TypeOfPageComponent } from "../@TypeOfPageComponent";

interface Props {
    page: Page;
    username: string;
    project: Project;
    merging: boolean;
    listMerge: Page[];
    setMerging: (value: boolean) => void;
    setPageMerging: (value: Page) => void;
    pageMerging: boolean;
}

export const PageComponent = ({ page, username, project, merging, setMerging, listMerge, setPageMerging, pageMerging }: Props) => {

    const [modal, setModal] = useState(false);
    const [truncate, setTruncate] = useState(false);
    const [renaiming, setRenaiming] = useState(false);
    const [changingType, setChangingType] = useState(false);
    const [name, setName] = useState<string>(page.name);
    const inputRef = useRef<HTMLInputElement>(null);
    const [type, setType] = useState<TypeOfPage>(TypeOfPage.KANBAN)
    const { theme, setTheme } = useTheme();

    const [y, setY] = useState<number>(0)

    const [windowWidth, setWindowWidth] = useState<number>(0);
    useEffect(() => {
        window.addEventListener('resize', () => {
            setWindowWidth(window.innerWidth)
        })
        setWindowWidth(window.innerWidth)
    }, [])

    useEffect(() => {
        setTruncate(false)
    }, [merging])


    const excludePage = () => {
        pageService.delete(page.id)
        setModal(false)
        setTruncate(false)
    }

    const saveNewName = (e: any) => {
        if (!e.key || e.key === "Enter") {
            console.log(inputRef.current?.textContent)
            pageService.upDateName(inputRef.current?.textContent ?? null , page.id)
            setRenaiming(false)        }
    }

    useEffect(() => {
        if (renaiming) {
            inputRef.current?.focus()
        }
    }, [renaiming])

    const changeType = async () => {
        let subclass = "page"
        if (TypeOfPage.CANVAS == type) {
            subclass = "canvas"
        } else if ([TypeOfPage.KANBAN, TypeOfPage.TIMELINE, TypeOfPage.CALENDAR].includes(type)) {
            subclass = "ordered"
        }
        const pagePromise = await pageService.insert(new PagePost(page.name, type, project))
        pageService.merge([pagePromise], page.id)
        pageService.delete(page.id)
        setTruncate(false)
        setModal(false)
        setChangingType(false)
    }

    return (
        <label htmlFor={`${page.id}`} className="w-full">
            <div key={page.id} className={' w-full flex gap-2 text-modal-grey ' + (merging ? " pointer-events-none" : "cursor-pointer")}
                onMouseOver={() => setTruncate(true)} onMouseLeave={() => setTruncate(modal)}>
                <Link href={(!renaiming && !merging) ? ("/" + username + "/" + project.id + "/" + page.id) : "#"} className=" w-full flex gap-2" >
                    <If condition={!merging || pageMerging}>
                        <img src="/img/arquivo.svg" className="h-7 w-7 rounded-md" />
                    </If>
                    <div className="bg-input-grey text-start font-alata rounded-md h-7 px-4 py-px w-full hover:brightness-95">
                        <div ref={inputRef}
                        
                            className={"appearance-none cursor-pointer bg-transparent w-full outline-none truncate "
                                + (!page.name ? "opacity-50" : "")}
                            onBlur={saveNewName} onKeyDown={saveNewName}
                            suppressContentEditableWarning={true}
                            contentEditable={renaiming}>
                            {page.name ?? "Sem Nome"}
                        </div>
                    </div>
                </Link>
                <If condition={truncate && !merging}>
                    <div className="bg-input-grey h-full rounded-full flex flex-col p-1 gap-px w-4 hover:brightness-95"
                        onClick={() => setModal(true)} >
                        <div className="bg-white w-[0.35rem] h-[0.35rem] rounded-full brightness-[90%]"></div>
                        <div className="bg-white w-[0.35rem] h-[0.35rem] rounded-full brightness-[90%]"></div>
                        <div className="bg-white w-[0.35rem] h-[0.35rem] rounded-full brightness-[90%]"></div>
                    </div>
                </If>
                <If condition={modal}>
                    <>
                        <div className="fixed top-0 right-0 bottom-0 z-40 left-0  " onClick={() => { setModal(false); setTruncate(false); setChangingType(false) }}
                            onMouseOver={e => e.stopPropagation()} >
                        </div>
                        <div className=" bg-input-grey shadow-blur-10 right-8 absolute font-alata text-[14px]  z-50 flex w-36 py-6 px-4 rounded-md" id={"modalPage"}
                            onClick={e => e.stopPropagation()}>
                            <div className="flex flex-col w-full relative">
                                <button className="w-max flex gap-3 bg-input-grey hover:text-zinc-500 text-[12px]"
                                    onClick={excludePage}>
                                    <span>[]</span>
                                    <span>|</span>
                                    <span>Excluir</span>
                                </button>
                                <button className="w-max flex gap-3 bg-input-grey hover:text-zinc-500  text-[12px]"
                                    onClick={() => {
                                        setRenaiming(true);
                                        setModal(false);
                                        setTruncate(false);
                                    }}>
                                    <span>[]</span>
                                    <span>|</span>
                                    <span>Renomear</span>
                                </button>
                                <button className="w-max flex gap-3 bg-input-grey hover:text-zinc-500  text-[12px]"
                                    onClick={() => { setPageMerging(page); setModal(false); setMerging(true); }}>
                                    <span>[]</span>
                                    <span>|</span>
                                    <span>Conectar</span>
                                </button>
                                <button className="w-max flex gap-3 bg-input-grey hover:text-zinc-500  text-[12px]"
                                    onClick={() => { setChangingType(true); setModal(false) }}>
                                    <span>[]</span>
                                    <span>|</span>
                                    <span>Mudar Tipo</span>
                                </button>
                            </div>
                        </div>
                    </>
                </If>
                <TypeOfPageComponent changingType={changingType} closeModals={() => { setModal(false); setTruncate(false); setChangingType(false) }}
                    setChangingType={setChangingType} changeType={changeType} setType={setType} />
            </div>
        </label>
    )
}; 