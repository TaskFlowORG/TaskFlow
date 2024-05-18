import { archiveToSrc } from "@/functions"
import { OtherUser } from "@/models"
import { t } from "i18next"
import { useTranslation } from "next-i18next"
import Image from "next/image"
import { use, useEffect, useState } from "react"

export const OtherUserComponent = ({user}:{user:OtherUser}) => {
    const [src, setSrc] = useState<string>("")

    useEffect(() => {
        setSrc(archiveToSrc(user.picture))
    }, [user])

    const {t} = useTranslation();
    return (
        <div className="bg-white dark:bg-modal-grey gap-2 rounded-md flex flex-col justify-center items-center p-4 w-min h-min">
            <div className=" w-64  h-16 flex gap-2">
                <div className=" rounded-full relative h-full aspect-square bg-zinc-400">
                    <Image
                        src={src}
                        alt="User Picture"
                        fill
                    />
                </div>
                <div className="flex flex-col">
                    <span style={{opacity: user.name ? 1 : 0.5}} className="w-full truncate font-alata text-p14 text-primary font-bold dark:text-secondary">{user.name ? user.name + " "  + user.surname : t("withoutname")}</span>
                    <span className="w-full truncate font-alata text-mn text-secondary dark:text-primary font-semibold">@{user.username}</span>
                    <span style={{opacity: user.phone ? 1 : 0.5}} className="w-full truncate font-montserrat text-mn text-modal-grey dark:text-white"><span className="font-semibold opacity-100">Phone:</span> {user.phone ?user.phone: t("withoutphone")}</span>
                    <span style={{opacity: user.mail? 1 : 0.5}} className="w-full truncate font-montserrat text-mn text-modal-grey dark:text-white"><span className="font-semibold opacity-100">Mail:</span> {user.mail ? user.mail : t("withoutemail")}</span>
                </div>
            </div>
            <div className="w-64 "> 
                <p className="font-montserrat w-full flex flex-wrap text-modal-grey dark:text-white text-ellipsis whitespace-pre-wrap text-wrap text-p14 overflow-hidden">&2quot;{user.description}&2quot;</p>
            </div>
        </div>
    )
}