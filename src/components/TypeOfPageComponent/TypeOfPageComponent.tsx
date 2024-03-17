
import { If } from "../If";
import { Button } from "../Button";
import { SwiperSlide, Swiper } from "swiper/react";
import { Navigation, Pagination } from "swiper/modules";
import { useTheme } from "next-themes";
import { TypeOfPage } from "@/models";
import { PageTypeIcons } from "../icons";
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
            <div className="flex gap-3 h-max items-center bg-white dark:bg-modal-grey p-2 rounded-md flex-col">
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
                    {[{ title: TypeOfPage.KANBAN, image: "" }, { title: TypeOfPage.CALENDAR, image: "" }, { title: TypeOfPage.TIMELINE, image: "" }, 
                    { title: TypeOfPage.LIST, image: "" }, { title: TypeOfPage.TABLE, image: "" }, { title: TypeOfPage.CANVAS, image: "" }]
                        .map((slide) => {
                            return (
                                <SwiperSlide key={`${slide.title}`} className="">
                                    <div className="h-32 flex items-center flex-col whitespace-nowrap gap-6 ">
                                        {slide.title}
                                        <PageTypeIcons type={slide.title} />
                                    </div>
                                </SwiperSlide>
                            );
                        })}
                    <div className="swiper-button-prev swiper-type-of-page-dark"></div>
                    <div className="swiper-button-next swiper-type-of-page-dark"></div>
                </Swiper>
                <div className=" w-full flex justify-around gap-2">
                    <Button text="Cancelar" padding="p-1" fnButton={() => { setChangingType(false) }}
                        rounded="rounded-sm" paddingY="py-0" textSize="12px" secondary />
                    <Button text="Concluir" padding="p-1" rounded="rounded-sm" paddingY="py-0" textSize="12px" fnButton={changeType} />
                </div>
                </div>
    )
}