import Image from "next/image"


export const Loading = () => {
    const style: Object = {
        clipPath: "polygon(49% 7%, 88% 29%, 88% 76%, 50% 98%, 10% 77%, 10% 29%)"
    }
    return (
        <div className="w-screen h-screen bg-white dark:bg-back-grey z-[950] fixed flex justify-center items-center  ">
            <div className="relative opacity-25 dark:opacity-50 ">
                <div className='w-28 h-28 brightness-0 relative dark:invert z-[980]'>
                <Image src="/Icon.svg" alt="LOGO" fill className=""  />
                </div>
                <div className="w-[2.30rem] aspect-square bg-zinc-600 dark:bg-zinc-400 absolute top-0 animate-custom-pulse  right-[1.45rem] z-[960]" style={style}></div>
                <div className="w-9 aspect-square bg-zinc-600 dark:bg-zinc-400 absolute top-9 right-1 animate-custom-pulse  animation-delay-800 z-[960]" style={style}></div>
                <div className="w-3 aspect-square bg-zinc-600 dark:bg-zinc-400 absolute top-[4.4rem]  animate-custom-pulse animation-delay-600  right-[1.80rem] z-[960]" style={style}></div>
                <div className="w-3 aspect-square bg-zinc-600 dark:bg-zinc-400 absolute top-[4.4rem]  animate-custom-pulse  animation-delay-400  right-0 z-[960]" style={style}></div>
                <div className="w-7 aspect-square bg-zinc-600 dark:bg-zinc-400 absolute top-[5.25rem] animate-custom-pulse  animation-delay-200 right-8 z-[960]" style={style}></div>

            </div>
        </div>
    )
}