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

interface Props {
    page: Page;
    username: string;
    project: Project;
}

export const PageComponent = ({ page, username, project }: Props) => {

    const [modal, setModal] = useState(false);
    const [truncate, setTruncate] = useState(false);
    const [renaiming, setRenaiming] = useState(false);
    const [connecting, setConnecting] = useState(false);
    const [changingType, setChangingType] = useState(false);
    const [name, setName] = useState<string>(page.name);
    const inputRef = useRef<HTMLInputElement>(null);
    const [type, setType] = useState<TypeOfPage>(TypeOfPage.KANBAN)
    const { theme, setTheme } = useTheme();

    const [windowWidth, setWindowWidth] = useState<number>(0);
    useEffect(() => {
        window.addEventListener('resize', () => {
            setWindowWidth(window.innerWidth)
        })
        setWindowWidth(window.innerWidth)
    }, [])


    const excludePage = () => {
        pageService.delete(page.id)
    }

    const saveNewName = (e: any) => {
        if (!e.key || e.key === "Enter") {
            pageService.upDateName(name, page.id)
            setRenaiming(false)
        }
    }

    useEffect(() => {
        if (renaiming) {
            inputRef.current?.focus()
        }
    }, [renaiming])

    const swiperType = (s: any) => {
        switch (s.index) {
            case 0:
                setType(TypeOfPage.KANBAN)
                break;
            case 1:
                setType(TypeOfPage.CALENDAR)
                break;
            case 2:
                setType(TypeOfPage.TIMELINE)
                break;
            case 3:
                setType(TypeOfPage.LIST)
                break;
            case 4:
                setType(TypeOfPage.TABLE)
                break;
            case 5:
                setType(TypeOfPage.CANVAS)
                break;
        }
    }

    const changeType = async () => {

        let subclass = ""
        if (TypeOfPage.CANVAS == type) {
            subclass = "canvas"
        } else if ([TypeOfPage.KANBAN, TypeOfPage.TIMELINE, TypeOfPage.CALENDAR].includes(type)) {
            subclass = "page"
        }
        const pagePromise = await pageService.insert(new PagePost(page.name, type, project), subclass)
        pageService.merge([pagePromise], page.id)
        pageService.delete(page.id)
    }
    

    const a = () => {
        console.log("JHjkshdkjh")
    }

    return (
        <div key={page.id} className=' w-full flex gap-2 relative text-modal-grey'
            onMouseOver={() => setTruncate(true)} onMouseLeave={() => setTruncate(modal)}>
            {/* <img src="/img/arquivo.svg" className="h-7 w-7 rounded-md" /> */}
            {page.type}
            <Link href={!renaiming ? ("/" + username + "/" + project.id + "/" + page.id) : "#"} className=" w-fit " >
                <div className="bg-input-grey text-start font-alata rounded-md h-7 px-4 py-px cursor-pointer w-fit hover:brightness-95" >
                    <input ref={inputRef} value={name ?? "Sem Nome"}
                        className={"appearance-none bg-transparent w-full outline-none truncate " + (!name ? "opacity-50":"")}
                        onBlur={saveNewName} onKeyDown={saveNewName}
                        disabled={!renaiming} onChange={(e) => setName(e.target.value)} type="text" />
                </div>
            </Link>
            <If condition={truncate}>
                <div className="bg-input-grey h-full rounded-full flex flex-col p-1 gap-px cursor-pointer w-4 hover:brightness-95"
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
                    <div className=" bg-input-grey shadow-blur-10 left-[17.2rem] font-alata text-[14px] fixed z-50 flex w-36 py-6 px-4 rounded-md" id={"modalPage"}
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
                                onClick={() => setConnecting(true)}>
                                <span>[]</span>
                                <span>|</span>
                                <span>Conectar</span>
                            </button>
                            <button className="w-max flex gap-3 bg-input-grey hover:text-zinc-500  text-[12px]"
                                onClick={() => setChangingType(true)}>
                                <span>[]</span>
                                <span>|</span>
                                <span>Mudar Tipo</span>
                            </button>
                            <If condition={changingType}>
                                <div className="flex gap-3 p-2 py-3 h-max fixed items-center bg-white shadow-blur-10 rounded-md flex-col">
                                    <Swiper
                                        className={" p-6 max-w-[6rem] min-h-[9rem] flex justify-center ".concat(theme == "dark" ? "swiper-type-of-page-dark" : "swiper-type-of-page-light")}
                                        modules={[Pagination, Navigation]}
                                        slidesPerView={1}
                                        navigation={{
                                            prevEl: ".swiper-button-prev",
                                            nextEl: ".swiper-button-next",
                                        }}
                                        onSlideChange={swiperType}
                                        pagination={{ clickable: true }}>
                                        {[{ title: "Kanban", image: "" }, { title: "Calendar", image: "" }, { title: "TimeLine", image: "" }, { title: "Lista", image: "" }, { title: "Tabela", image: "" }, { title: "Canvas", image: "" }]
                                            .map((slide) => {
                                                return (
                                                    <SwiperSlide key={slide.title} className="">
                                                        <div className="h-32 flex items-center flex-col whitespace-nowrap gap-6 ">
                                                            {slide.title}
                                                            <img src={slide.image} className="w-12 h-12 " />
                                                        </div>
                                                    </SwiperSlide>
                                                );
                                            })}
                                        <div className="swiper-button-prev"></div>
                                        <div className="swiper-button-next"></div>
                                    </Swiper>
                                    <div className=" w-full flex justify-around gap-2">
                                        <Button text="Cancelar" padding="p-1" textColor="text-primary dark:text-secondary" background="bg-transparent"
                                            border="border-2 border-primary dark:border-secondary" fnButton={() => { setChangingType(false) }}
                                            rounded="rounded-sm" paddingY="py-0" textSize="12px" hover="hover:border-[#ee4444] hover:text-[#ee4444]" />
                                        <Button text="Concluir" padding="p-1" rounded="rounded-sm" paddingY="py-0" textSize="12px" fnButton={changeType} />
                                    </div>
                                </div>
                            </If>
                        </div>
                    </div>
                </>
            </If>
        </div>
    )
}; 