import { archiveToSrc } from "@/functions"
import { OtherUser } from "@/models"
import Image from "next/image"

export const OtherUserComponent = ({user}:{user:OtherUser}) => {
    return (
        <div className="bg-white dark:bg-modal-grey rounded-md flex flex-col justify-center items-center p-4 w-min h-min">
            <div className=" w-64  h-16 flex gap-2">
                <div className=" rounded-full relative h-full aspect-square bg-zinc-400">
                    <Image
                        src={archiveToSrc(user.picture)}
                        alt="User Picture"
                        fill
                    />
                </div>
                <div className="flex flex-col">
                    <span className="w-full truncate text-alata text-[14px] text-primary dark:text-secondary">{user.name + " "  + user.surname}</span>
                    <span className="w-full truncate text-alata text-[12px] text-secondary dark:text-primary font-semibold">@{user.username}</span>
                    <span className="w-full truncate text-montserrat text-[12px] text-modal-grey"><span className="font-semibold">Phone:</span> {user.phone ?? "Sem Telefone"}</span>
                    <span className="w-full truncate text-montserrat text-[12px] text-modal-grey"><span className="font-semibold">Mail:</span> {user.mail ?? "Sem e-mail"}</span>
                </div>
            </div>
            <div className="w-64 ">
                <p className="text-montserrat w-max whitespace-pre-wrap text-wrap text-[14px] ">{user.description ?? "JASJDFKLAJSDJAKLSDLKASJDLAKSJDLKASJDLKASJDLKAJSDLKAJSDLKASJDLKASJDLAKSJDLAKSJDLAKSJDLAKSJDLAKSJDLKASJDLAKSJDLAKSJDLAKSJDLAKSJDALKSDJALKSJDlk"}</p>
            </div>
        </div>
    )
}