import Image from "next/image"


export const Loading = () => {
    const style: Object = {
        clipPath: "polygon(49% 7%, 88% 29%, 88% 76%, 50% 98%, 10% 77%, 10% 29%)"
    }
    return (
        <div className="w-screen h-screen bg-white dark:bg-back-grey  fixed flex justify-center items-center  ">
            <div className="relative invert dark:invert-0 opacity-25 dark:opacity-50">
                <Image width={112} height={112} src="/Icon.svg" alt="Logo" />
                <div className="w-[2.30rem] aspect-square bg-white absolute top-0 animate-custom-pulse  right-[1.45rem] -z-10" style={style}></div>
                <div className="w-9 aspect-square bg-white absolute top-9 right-1 animate-custom-pulse  animation-delay-800 -z-10" style={style}></div>
                <div className="w-3 aspect-square bg-white absolute top-[4.4rem]  animate-custom-pulse animation-delay-600  right-[1.80rem] -z-10" style={style}></div>
                <div className="w-3 aspect-square bg-white absolute top-[4.4rem]  animate-custom-pulse  animation-delay-400  right-0 -z-10" style={style}></div>
                <div className="w-7 aspect-square bg-white absolute top-[5.25rem] animate-custom-pulse  animation-delay-200 right-8 -z-10" style={style}></div>
            </div>
        </div>
    )
}