import Image from "next/image"

export default function Header() {

    const theme = "light";
    return (
        <>
            {theme == "light" &&
                <div className="h-[55px] w-full bg-white shadow-md px-8 flex  items-center justify-between border bottom-2">
                    <img src="/Assets/themeLight/iconLight.svg" alt="" height={'50px'} width={'50px'} />

                    <div className=" w-1/4 h-full flex space-x-[48px]  items-center justify-end">
                        <img src="/Assets/themeLight/notification.svg" alt="" width={"20px"} hight={"20px"} />
                        <img src="/Assets/Language.svg" alt="" width={"20px"} height={"20px"} />
                        <img src="/Assets/themeLight/themeLight.svg" alt="" width={"20px"} height={"20px"} />
                        <img src="/Assets/themeLight/Profile.svg" alt="" width={"20px"} height={"20px"} />
                    </div>

                </div>
            }
            {theme == "dark" &&  <div className="h-[55px] w-full bg-back-grey shadow-md px-8 flex  items-center justify-between border bottom-2">
                    <img src="/Assets/themeDark/iconDark.svg" alt="" height={'50px'} width={'50px'} />

                    <div className=" w-1/4 h-full flex space-x-[48px]  items-center justify-end">
                        <img src="/Assets/themeDark/notificationDark.svg" alt="" width={"20px"} hight={"20px"} />
                        <img src="/Assets/Language.svg" alt="" width={"20px"} height={"20px"} />
                        <img src="/Assets/themeDark/themeDark.svg" alt="" width={"20px"} height={"20px"} />
                        <img src="/Assets/themeDark/ProfileDark.svg" alt="" width={"20px"} height={"20px"} />
                    </div>

                </div>
}
        </>

    )

}
