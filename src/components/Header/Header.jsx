import Image from "next/image"

export default function Header() {

    return(
            <div className="h-[55px] w-full shadow-md px-8 flex  items-center justify-between border bottom-2">
               <img src="/Assets/iconLight.svg" alt="" height={'50px'} width={'50px'}/>

               <div className=" w-1/4 h-full flex space-x-[48px]  items-center justify-end">
                <img src="/Assets/notification.svg" alt="" width={"20px"} hight={"20px"}/>
                <img src="/Assets/Language.svg" alt="" width={"20px"} height={"20px"} />
                <img src="/Assets/themeLight.svg" alt="" width={"20px"} height={"20px"} />
                <img src="/Assets/Profile.svg" alt="" width={"20px"} height={"20px"}/>
               </div>

            </div>


    )
    
}
