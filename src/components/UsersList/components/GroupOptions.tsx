import { Group, GroupPut, OtherUser, User } from "@/models";
import { groupService, userService } from "@/services";
import { ChatSvg } from "../svgs/ChatSvg";
import { UserSvg } from "../svgs/UserSvg";
import { RemoveSvg } from "../svgs/RemoveSvg";
import { useContext, useEffect, useState } from "react";
import { useRouter } from 'next/navigation';
import { ProjectContext } from "@/contexts";
import { useTranslation } from "react-i18next";

interface Props {
    isOpen: Boolean,
    group: Group,
    user: OtherUser
    setGroup: (group: Group) => void;

}

export const GroupOptions = ({ isOpen, group, user, setGroup }: Props) => {
    const { project } = useContext(ProjectContext);
    const [userLogged, setUserLogged] = useState<OtherUser>()
    const router = useRouter();
    const { t } = useTranslation();

    useEffect(() => {
        fetchData()
    })

    const fetchData = async () => {
        const fetchedUser = await userService.findLogged();
        setUserLogged(fetchedUser);
    }

    async function deleteUser() {
        try {
            if (group != null) {
                const updatedUsers = group.users.filter(u => u.username !== user.username);
                group.users = [...updatedUsers];
                if (userLogged && project) {
                    const updatedPermissions = userLogged.permissions.filter(p => p.project.id !== project.id);
                    userLogged.permissions = updatedPermissions;
                }
                await groupService.update(new GroupPut(group.id, group.name, group.description, group.permissions, group.users), group.id);
                console.log(group.users);
                
                setGroup({...
                    group})
            }
        } catch (error) {
            console.error("Erro ao remover usuário:", error);
            alert("Erro ao remover usuário");
        }
    }

    if (isOpen && group?.owner.username == userLogged?.username) {
        return <div className="flex bg-[#F2F2F2] text-[#333333] dark:bg-[#333] dark:text-[#FCFCFC] w-28 h-16 shadow-md rounded-md ml-4 mt-1">
            <div className="flex flex-col justify-around ml-2">
                <div className="flex justify-start gap-3 text-mn font-montserrat">
                    <button className="flex flex-row gap-3">
                        <div className="flex ml-[1.2px]">
                            <ChatSvg />
                        </div>
                        {t("startChat")}
                    </button>
                </div>
                <div className="flex justify-start gap-3 text-mn font-montserrat">
                    <button className="flex flex-row gap-2" onClick={deleteUser}>
                        <RemoveSvg />
                        {t("remove")}
                    </button>
                </div>
            </div>
        </div>
    } else if (isOpen && group.owner.username != userLogged?.username) {
        return <div className="flex bg-[#F2F2F2] text-[#333333] dark:bg-[#333] dark:text-[#FCFCFC] w-28 h-14 shadow-md rounded-md ml-4 mt-1">
            <div className="flex flex-col mt-4 gap-2 ml-2">
                <div className="flex mt-2 text-mn font-montserrat">
                    <button className="flex flex-row gap-3" onClick={() => router.push("/" + userLogged?.username + "/chat/1")}>
                        <div className="flex ml-[1.2px]">
                            <ChatSvg />
                        </div>
                        {t("startChat")}
                    </button>
                </div>
            </div>
        </div>
    } else {
        return null;
    }
}