import { ProjectContext } from "@/contexts"
import { archiveToSrc } from "@/functions";
import { OtherUser, Project } from "@/models"
import { userService } from "@/services";
import { useTranslation } from "next-i18next";
import Image from "next/image";
import { useContext, useEffect, useState } from "react"

export const FeaturedUser = () => {
    const {project} = useContext(ProjectContext);
    const [users, setUsers] = useState<OtherUser[]>([]);
    useEffect(() => {
        (async () => {
            if(!project) return;
            const users = await userService.findAll();
            setUsers(users.filter(user => 
                user.permissions.find(permission => permission.project.id === project.id)!=undefined)
                .sort((a, b) => a.points - b.points)
        )
        })()
    }, [project])
    const {t} = useTranslation();
    return (
        <div className="h-1/2 w-full shadow-blur-10 rounded-md p-4">
            <h5 className=" h5 text-primary dark:text-secondary">{t("featured-user")}</h5>
            <span className="w-full flex justify-between border-b-[1px] border-back-grey">
                <p className="p ">{t("name")}</p>
                <p className="p ">{t("points")}</p>
            </span>
            <div className="overflow-y-scroll none-scrollbar max-h-full  gap-1 pt-1 h-full w-full flex flex-col">
                {
                users.length === 0 ? <p className="w-full h-full flex justify-center items-center">{t("no-featured-users")}</p> :
                users.map((user, index) => (
                    <div key={index} className="w-full flex justify-between text-primary dark:text-secondary">
                        <span className="flex gap-2">
                            <div className="w-8 h-8 rounded-full relative overflow-clip bg-zinc-400" >
                                <Image src={archiveToSrc(user.picture)} alt="User Picture" fill />
                            </div>
                            <p className="w-40 truncate" title={user.name + " " + user.surname}>{user.name + " " + user.surname }</p>
                        </span>
                        <div>{user.points ?? 0}</div>
                    </div>
                ))}
            </div>
        </div>
        
    )
}