interface Props {
    bg: string,
    text: string,
    size: string,
    title:string,
    content:string
}

export const Function = ({ bg, text, size, title, content }: Props) => {
    return (
        <div className="flex items-center relative z-10 px-6 py-6  md:py-14 rounded-2xl shadowww dark:bg-modal-grey bg-white gap-6 w-full">
            <div className="relative  hidden md:flex  justify-center">
                <div className={`w-32 h-32 z-[1] hidden md:block  shadowww bg-white dark:bg-modal-grey rounded-full`}>
                </div>
                <div className={`w-2 absolute  centeredAbsolute ${size}  z-0  ${bg}`}>

                </div>
            </div>

            <div className="flex flex-col  w-full md:w-4/5 gap-4 md:gap-7">
                <h3 className={` text-[24px] text-center md:text-start md:text-[32px] font-alata ${text} dark:text-white`}>{title}  </h3>
                <p className="text-[12px] md:text-[16px] font-montserrat md:text-start text-center w-full text-modal-grey dark:text-white"> {content}</p>
            </div>
        </div>
    )
}