import { useSwiper } from "swiper/react"

interface Props {
    content: string,
    title:string
}

export const Flipped = ({ content, title }: Props) => {
    const swiper = useSwiper()
    return (
        <div className="p-2 border-2  z-[10] bg-white dark:bg-modal-grey border-primary rounded-md w-full" onClick={()=> swiper.slidePrev()}>
            <div className=" max-w-[236px] w-max z-[11] h-max min-h-[313px] flex flex-col justify-between  p-4 py-6 dark:bg-modal-grey gap-4 bg-white rounded-md shadowww">
                <h4 className="text-h4 font-alata text-primary dark:text-white">{title}</h4>
                    <p className="text-[15px] h-full font-montserrat  text-black flex flex-1 overflow-auto dark:text-white">{content}</p>

            </div>
        </div>
    )
}