export const HeadlineImage = () => {
    return (
        <div className="relative hidden lg:flex items-center justify-center gap-4 h-full ">
            <div className="absolute 2xl:hidden rounded-2xl centeredAbsolute bg-orange-500 shadowwwsecondary w-[260px] h-[280px] "></div>
            <div className="absolute hidden rounded centeredAbsolute 2xl:flex justify-between gap-8 items-center  overflow-clip w-[500px] h-[335px] ">
                <div className="w-full h-full bg-orange-500 rounded-xl shadowwwsecondary"></div>
                <div className="w-full h-full bg-orange-500 rounded-xl shadowwwsecondary"></div>
            </div>
            <img src="landing.svg" className="z-[-1]  2xl:w-[550px] w-[400px]" alt="" />
        </div>
    )
}