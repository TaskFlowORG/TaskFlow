

import { useTheme } from "next-themes";
export function Header() {
    const { theme, setTheme } = useTheme()
    return (


        <div className="h-14 w-full fixed z-[1] bg-white shadow-md flex items-center dark:bg-modal-grey justify-between px-6">
            <img src="/Icon.svg" alt="" className='w-12 h-12 cursor-pointer dark:grayscale dark:brightness-[60]' />


            <div className=" w-1/4 h-full flex space-x-[48px] items-center justify-end">

                <img src="/Assets/themeLight/notification.svg" alt="" className="dark:invert  cursor-pointer" width={"20px"} height={"20px"} />

                <img src="/Assets/Language.svg" alt="" className=" cursor-pointer" width={"20px"} height={"20px"} />

                <img src="/moon.svg" className="dark:hidden  cursor-pointer" alt="" onClick={() => setTheme("dark")} />
                <img src="/sun.svg" className="hidden dark:flex  cursor-pointer" alt="" onClick={() => setTheme("light")} />

                <svg width="26" height="29" viewBox="0 0 26 29" className=" text-primary dark:text-white " fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                    <g id="Profile">
                        <path id="Vector" d="M10 16.7487C15.4233 16.7487 20 17.6299 20 21.03C20 24.4312 15.3933 25.2812 10 25.2812C4.57797 25.2812 0 24.4 0 21C0 17.5987 4.60673 16.7487 10 16.7487ZM10 0.28125C13.6739 0.28125 16.6175 3.22378 16.6175 6.89507C16.6175 10.5664 13.6739 13.5101 10 13.5101C6.32737 13.5101 3.38252 10.5664 3.38252 6.89507C3.38252 3.22378 6.32737 0.28125 10 0.28125Z" fill="" />
                    </g>
                </svg>

            </div>

        </div>

    )

}

