import { useSwiper } from "swiper/react"

interface Props {
    img: string,
    title: string
}


export const Unflipped = ({ img, title }: Props) => {
    const swiper = useSwiper()
    return (
        <div className=" w-full p-2 border-2  dark:bg-modal-grey z-[10] bg-white  border-primary rounded-md" onClick={()=> swiper.slideNext()}>
            <div className=" px-16 pt-12 w-max z-[11] h-max min-h-[313px] dark:bg-modal-grey bg-white rounded-md shadowww">
                <div className="flex gap-6 flex-col justify-center">
                    <img src={img} alt="" />
                    <p className="h4 text-primary text-center dark:text-white">{title}</p>
                </div>

            </div>
        </div>
    )
}