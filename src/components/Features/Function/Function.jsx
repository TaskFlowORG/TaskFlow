

export const Function = ({ bg, text, size }) => {
    return (
        <div className="flex items-center relative z-10 px-6 py-6  md:py-14 rounded-2xl shadowww dark:bg-modal-grey bg-white gap-6 w-full">
            <div className="relative  hidden md:flex  justify-center">
                <div className={`w-32 h-32 z-[1] hidden md:block  shadowww bg-white dark:bg-modal-grey rounded-full`}>
                </div>
                <div className={`w-2 absolute  centeredAbsolute ${size}  z-0  ${bg}`}>

                </div>
            </div>

            <div className="flex flex-col  w-full md:w-4/5 gap-4 md:gap-7">
                <h3 className={` text-[24px] text-center md:text-start md:text-[32px] ${text} dark:text-white`}>IA treinada para te oferecer o melhor</h3>
                <p className="text-[12px] md:text-[16px] md:text-start text-center w-full">Lorem ipsum dolor sit amet consectetur. Urna egestas nisi commodo faucibus quam fermentum luctus faucibus elementum. Egestas mauris viverra libero gravida id a. Adipiscing molestie ut tincidunt hendrerit. Posuere dignissim eu natoque eget facilisis aliquam sit porta. Ultrices mattis vitae aliquam libero tempor fermentum vel.</p>
            </div>
        </div>
    )
}