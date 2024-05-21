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
    const [successDelete, setSuccessDelete] = useState<boolean>(false);
    const [text, setText] = useState<string>("");
    const route = useRouter();
    const { t } = useTranslation();

    async function deleteUser() {
        try {
            if (group != null) {
                const updatedUsers = group.users.filter(u => u.username !== showUser.username);
                group.users = [...updatedUsers];
                if (showUser && project) {
                    const updatedPermissions = showUser.permissions.filter(p => p.project.id !== project.id);
                    showUser.permissions = updatedPermissions;
                }
                await groupService.update(new GroupPut(group.id, group.name, group.description, group.permissions, group.users), group.id);

                setGroup({ ...group })
            }
        } catch (error) {
            setText(t("error-delete-user"));
            setSuccessDelete(true);
        }
    }
    async function changeOwner() {
        try {
            deleteUser()
            await groupService.updateOwner(showUser, group.id)
            setGroup({ ...group })
            route.push("/" + user?.username)
        } catch (error) {
            setText(t("error-change-owner"));
            setSuccessDelete(true);

        }
    }

    if (isOpen && group?.owner.username == user?.username) {
        return <div className="flex bg-[#F2F2F2] text-[#333333] dark:bg-[#333] dark:text-[#FCFCFC] w-44 h-16 shadow-md rounded-md ml-4 mt-1">
            <div className="flex flex-col justify-around ml-2">
                <div className="flex justify-start gap-3 text-mn font-montserrat" >
                    <button className="flex flex-row gap-3" onClick={changeOwner}>
                        <OwnerSvg />
                        {t("promover-owner")}
                    </button>
                </div>
                <div className="flex justify-start gap-3 text-mn font-montserrat">
                    <button className="flex flex-row gap-2" onClick={deleteUser}>
                        <RemoveSvg />
                        {t("remove")}
                    </button>
                </div>
            </div>
            {successDelete && (
                <div className="fixed inset-x-0 text-p14 font-montserrat mx-auto w-72 h-12 flex items-center justify-center bg-[#F2F2F2] text-black rounded shadow-md animate-fadeInOut notification slideUpAppear">
                    {text}
                </div>
            )}
        </div>
    } else {
        return null;
    }
}