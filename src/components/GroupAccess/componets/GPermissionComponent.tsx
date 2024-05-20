import React, { useContext, useEffect, useState } from "react";
import { Group, GroupPut, OtherUser, Permission, Project } from "@/models";
import { groupService, userService } from "@/services";
import { useTranslation } from "react-i18next";
import { Arrow } from "./Arrow";
import { useAsyncThrow } from "@/hooks/useAsyncThrow";
import { UserContext } from "@/contexts/UserContext";

interface Props {
    permissions: Permission[];
    group?: Group;
    project: Project;
}

export const PermissionComponent = ({ permissions, group, project }: Props) => {
    const [selectedPermission, setSelectedPermission] = useState<string | "">("");
    const [successPermission, setSuccessPermission] = useState<boolean>(false);
    const [text, setText] = useState<string>("");
    const { user } = useContext(UserContext);
    const { t } = useTranslation();
    const asynThrow = useAsyncThrow();

    useEffect(() => {
        fetchData();
        const timer = setTimeout(() => {
            if (successPermission) setSuccessPermission(false);
        }, 6000);
        return () => clearTimeout(timer);
    }, [successPermission, group, permissions]);

    const fetchData = async () => {
        if (group) {
            const permission = group.permissions.find(p => p.project.id === project.id);
            setSelectedPermission(permission ? permission.name : permissions.find(p => p.isDefault)?.name || "");
        }
    };

    const savePermission = async (selectedPermission: Permission) => {
        try {
            if (group) {
                group.permissions = [selectedPermission];
                await groupService.update(new GroupPut(group.id, group.name, group.description, group.permissions, group.users), group.id)

                setSelectedPermission(selectedPermission.name);
                setText(t("permissionUpdateSuccess"));
                setSuccessPermission(true);
            }
        } catch (error) {
            setText(t("permissionUpdateError"));
            setSuccessPermission(true);
        }
    };

    const handleSelectChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const selectedId = parseInt(e.target.value, 10);
        const foundPermission = permissions.find(p => p.id === selectedId);
        if (foundPermission) {
            savePermission(foundPermission);
        }
    };

    return (
        <>
            <select
                className="flex mr-6 text-p font-alata text-primary dark:text-secondary text-center w-[55%] md:w-[45%] h-8 dark:bg-[#3C3C3C] pl-2 pr-8 border-2 rounded-sm border-primary dark:border-secondary appearance-none focus:outline-none"
                name="permission"
                id="permission"
                value={permissions.find(p => p.name === selectedPermission)?.id.toString() || ""}
                disabled={group?.owner.id !== user?.id}
                onChange={handleSelectChange}
            >
                {permissions.map(p => (
                    <option key={p.id} value={p.id}>
                        {p.name || t("withoutname")}
                    </option>
                ))}
            </select>
            <Arrow className={"absolute inset-y-5 border-l-[2px] left-[39%] md:left-[85%] flex items-center pointer-events-none"} />
            {successPermission && (
                <div className="fixed inset-x-0 text-p14 font-montserrat mx-auto w-72 h-12 flex items-center justify-center bg-[#F2F2F2] text-black rounded shadow-md animate-fadeInOut notification slideUpAppear">
                    {text}
                </div>
            )}
        </>
    );
};
