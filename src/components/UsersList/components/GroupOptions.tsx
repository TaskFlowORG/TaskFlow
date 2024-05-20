import { Group, GroupPut, OtherUser, User } from "@/models";
import { groupService, userService } from "@/services";
import { OwnerSvg } from "../svgs/OwnerSvg";
import { RemoveSvg } from "../svgs/RemoveSvg";
import { useContext, useEffect, useState } from "react";
import { useRouter } from 'next/navigation';
import { ProjectContext } from "@/contexts";
import { useTranslation } from "react-i18next";
import { useAsyncThrow } from "@/hooks/useAsyncThrow";
import { UserContext } from "@/contexts/UserContext";

interface Props {
    isOpen: Boolean,
    group: Group,
    showUser: OtherUser
    setGroup: (group: Group) => void;

}

export const GroupOptions = ({ isOpen, group, showUser, setGroup }: Props) => {
    const { project } = useContext(ProjectContext);
    const { user } = useContext(UserContext);
    const route = useRouter();
    const { t } = useTranslation();

    async function deleteUser() {
        try {
            if (group != null) {
                const updatedUsers = group.users.filter(u => u.username !== showUser.username);
                group.users = [...updatedUsers];
                if (user && project) {
                    const updatedPermissions = user.permissions.filter(p => p.project.id !== project.id);
                    user.permissions = updatedPermissions;
                }
                await groupService.update(new GroupPut(group.id, group.name, group.description, group.permissions, group.users), group.id);

                setGroup({
                    ...
                    group
                })
            }
        } catch (error) {
            //Falta error
            console.error("Erro ao remover usuário:", error);
            alert("Erro ao remover usuário");
        }
    }
    async function changeOwner() {
        try {
            deleteUser()
            await groupService.updateOwner(showUser, group.id)
            setGroup({
                ...
                group
            })
            route.push("/" + user?.username)
        } catch (error) {
            console.error("Deu ruim");

        }
    }

    if (isOpen && group?.owner.username == user?.username) {
        return <div className="flex bg-[#F2F2F2] text-[#333333] dark:bg-[#333] dark:text-[#FCFCFC] w-28 h-16 shadow-md rounded-md ml-4 mt-1">
            <div className="flex flex-col justify-around ml-2">
                <div className="flex justify-start gap-3 text-mn font-montserrat" >
                    <button className="flex flex-row gap-2" onClick={changeOwner}>
                        <OwnerSvg />
                        Tornar líder
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
    } else {
        return null;
    }
}