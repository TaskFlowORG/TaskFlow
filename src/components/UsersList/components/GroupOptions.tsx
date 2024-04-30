import { Group, GroupPut, OtherUser } from "@/models";
import { groupService } from "@/services";
import { useTheme } from "next-themes";
import { ChatSvg } from "../svgs/ChatSvg";
import { UserSvg } from "../svgs/UserSvg";
import { RemoveSvg } from "../svgs/RemoveSvg";
import { useState } from "react";

interface Props{
    isOpen: Boolean,
    group: Group,
    user: OtherUser

}

export const GroupOptions = ({ isOpen, group, user }: Props) => {

    async function deleteUser() {
        try {
            if (group != null) {
                const updatedUsers = group.users.filter(u => u.username !== user.username);
                group.users = updatedUsers;
                await groupService.update(new GroupPut(group.id, group.name, group.description, group.permissions, group.users), group.id);
            }
        } catch (error) {
            console.error("Erro ao remover usuário:", error);
            alert("Erro ao remover usuário");
        }
    }
    
    if (isOpen) {
        return <div className="flex bg-[#F2F2F2] text-[#333333] dark:bg-[#333] dark:text-[#FCFCFC] w-28 h-24 shadow-md rounded-md ml-4 mt-1">
            <div className="flex flex-col justify-around ml-2">
                {/* <div className="flex justify-start gap-3 mn">
                    <button className="flex flex-row gap-2">
                        <UserSvg />
                        Perfil
                    </button>
                </div> */}
                <div className="flex justify-start gap-3 mn">
                    <button className="flex flex-row gap-3">
                        <div className="flex ml-[1.2px]">
                            <ChatSvg />
                        </div>
                        Iniciar chat
                    </button>
                </div>
                <div className="flex justify-start gap-3 mn">
                    <button className="flex flex-row gap-2" onClick={deleteUser}>
                        <RemoveSvg />
                        Remover
                    </button>
                </div>
            </div>
        </div>
    } else {
        return null;
    }
}