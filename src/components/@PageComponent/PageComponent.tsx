import { Page } from "@/models";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { If } from "../If";
import { IconTrashBin } from "../icons";
import { pageService } from "@/services";

import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Scrollbar, A11y } from "swiper/modules";
import { Button } from "../Button";

interface Props {
    page: Page;
    username: string;
    projectId: string;
}

export const PageComponent = ({ page, username, projectId }: Props) => {

    const [modal, setModal] = useState(false);
    const [truncate, setTruncate] = useState(false);
    const [renaiming, setRenaiming] = useState(false);
    const [connecting, setConnecting] = useState(false);
    const [changingType, setChangingType] = useState(false);
    const [name, setName] = useState(page.name);
    const inputRef = useRef<HTMLInputElement>(null);

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


    return (
        <div key={page.id} className=' w-full flex gap-2 relative text-modal-grey'
            onMouseOver={() => setTruncate(true)} onMouseLeave={() => setTruncate(modal)}>
            {/* <Link href={"/" + username + "/" + projectId + "/" + page.id} className="w-full duration-300"> */}
            <div className="bg-input-grey  w-full text-start font-alata rounded-md px-4 py-px cursor-pointer hover:brightness-95" >
                <input ref={inputRef} autoFocus value={name ?? "Sem Nome"} className={name ? "appearance-none bg-transparent outline-none" : "opacity-50 appearance-none bg-transparent outline-none"}
                    onBlur={saveNewName} onKeyDown={saveNewName}
                    disabled={!renaiming} onChange={(e) => setName(e.target.value)} type="text" />
            </div>
            {/* </Link> */}
            <If condition={truncate}>
                <div className="bg-input-grey h-full  rounded-full flex flex-col p-1 gap-px cursor-pointer hover:brightness-95"
                    onClick={() => setModal(true)} >
                    <div className="bg-white w-[0.35rem] h-[0.35rem] rounded-full brightness-[90%]"></div>
                    <div className="bg-white w-[0.35rem] h-[0.35rem] rounded-full brightness-[90%]"></div>
                    <div className="bg-white w-[0.35rem] h-[0.35rem] rounded-full brightness-[90%]"></div>
                </div>
            </If>
            <If condition={modal}>
                <>
                    <div className="fixed top-0 right-0 bottom-0 z-40 left-0  " onClick={() => { setModal(false); setTruncate(false) }} onMouseOver={e => e.stopPropagation()} >
                    </div>
                    <div className=" bg-input-grey shadow-blur-10 left-[17.2rem] font-alata text-[14px] fixed z-50 flex w-36 py-6 px-4 rounded-md" id={"modalPage"}
                        onClick={e => e.stopPropagation()}>
                        <div className="flex flex-col w-full">
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
                                <div className="bg-white fixed ">
                                    <Swiper className="flex  justify-center items-center w-full h-max"
                                        // install Swiper modules
                                        modules={[Navigation, Pagination, Scrollbar, A11y]}
                                        slidesPerView={1}
                                        pagination={{ clickable: true }}
                                        onSwiper={(swiper) => console.log(swiper)}
                                        onSlideChange={(swiper) => console.log(swiper.activeIndex)}
                                    >
                                        {
                                            [["Kanban", "Calendar", "Time Line"], ["Lista", "Tabela", "Canvas"]].map((slide, index) => {
                                                return (
                                                    <SwiperSlide key={index}>
                                                        <div>
                                                            {slide.map((t, i) =>{
                                                                return <Button width='w-full' key={i} text={t} padding='p-2' paddingY='p-1' textSize='font-[14re]' />
                                                            })}
                                                        </div>
                                                    </SwiperSlide>
                                                )
                                            })
                                        }
                                    </Swiper>
                                </div>
                            </If>
                        </div>
                    </div>
                </>
            </If>
        </div>
    )
}; 