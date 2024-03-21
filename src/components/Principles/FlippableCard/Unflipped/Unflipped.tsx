import Image from "next/image"

interface Props {
    img: string,
    title: string
}


export const Unflipped = ({ img, title }: Props) => {
    return (
        <div className=" w-full p-2 border-2  dark:bg-modal-grey z-[10] bg-white  border-primary rounded-md">
            <div className=" px-16 pt-12 w-max z-[11] h-max min-h-[313px] dark:bg-modal-grey bg-white rounded-md shadowww">
                <div className="flex gap-6 flex-col justify-center">
                    <Image src={`/${img}`} width={105} height={105} alt={title} />
                    <p className="h4 text-primary text-center dark:text-white">{title}</p>
                </div>

            </div>
        </div>
    )
}