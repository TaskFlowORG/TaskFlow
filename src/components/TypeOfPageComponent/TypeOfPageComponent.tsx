
import { If } from "../If";
import { Button } from "../Button";
import { SwiperSlide, Swiper } from "swiper/react";
import { Navigation, Pagination } from "swiper/modules";
import { useTheme } from "next-themes";
import { TypeOfPage } from "@/models";
interface Props {
    changingType:boolean;
    closeModals: ()=>void;
    setChangingType:(value:boolean) => void;
    changeType:() => Promise<void>;
    setType: (value:TypeOfPage) => void
}
export const TypeOfPageComponent = ({changingType, closeModals, setChangingType, changeType, setType}:Props) => {

    const{theme, setTheme} = useTheme()

    const swiperType = (s: any) => {
        switch (s.activeIndex) {
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

    return (
        <If condition={changingType}>
        <>
            <div className="fixed top-0 right-0 bottom-0 z-40 left-0  " onClick={closeModals}
                onMouseOver={e => e.stopPropagation()} >
            </div>
            <div className="flex gap-3 p-2 py-3 h-max items-center absolute z-50 right-2  bg-white shadow-blur-10 rounded-md flex-col">
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
        </>
    </If>
    )
}