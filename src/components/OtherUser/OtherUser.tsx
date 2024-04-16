import { archiveToSrc } from "@/functions"
import { OtherUser } from "@/models"
import { t } from "i18next"
import { useTranslation } from "next-i18next"
import Image from "next/image"

export const OtherUserComponent = ({user}:{user:OtherUser}) => {

    const {t} = useTranslation();
    return (
        <div className="bg-white dark:bg-modal-grey gap-2 rounded-md flex flex-col justify-center items-center p-4 w-min h-min">
            <div className=" w-64  h-16 flex gap-2">
                <div className=" rounded-full relative h-full aspect-square bg-zinc-400">
                    <Image
                        src={archiveToSrc(user.picture)}
                        alt="User Picture"
                        fill
                    />
                </div>
                <div className="flex flex-col">
                    <span style={{opacity: user.name ? 1 : 0.5}} className="w-full truncate text-alata text-[14px] text-primary font-bold dark:text-secondary">{user.name ? user.name + " "  + user.surname : t("withoutname")}</span>
                    <span className="w-full truncate text-alata text-[12px] text-secondary dark:text-primary font-semibold">@{user.username}</span>
                    <span style={{opacity: user.phone ? 1 : 0.5}} className="w-full truncate text-montserrat text-[12px] text-modal-grey"><span className="font-semibold opacity-100">Phone:</span> {user.phone ?user.phone: t("withoutphone")}</span>
                    <span style={{opacity: user.mail? 1 : 0.5}} className="w-full truncate text-montserrat text-[12px] text-modal-grey"><span className="font-semibold opacity-100">Mail:</span> {user.mail ? user.mail : t("withoutemail")}</span>
                </div>
            </div>
            <div className="w-64 ">
                <p className="text-montserrat w-full flex flex-wrap  text-ellipsis whitespace-pre-wrap text-wrap text-[14px] overflow-hidden">{user.description}</p>
            </div>
        </div>
    )
}