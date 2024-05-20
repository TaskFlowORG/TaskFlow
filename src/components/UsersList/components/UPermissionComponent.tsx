import React, { useContext, useEffect, useState } from "react";
import { Group, OtherUser, Permission, Project } from "@/models";
import { userService } from "@/services";
import { useTranslation } from "react-i18next";
import { UserContext } from "@/contexts/UserContext";

interface Props {
    group: Group;
    showUser: OtherUser;
    permissions: Permission[];
    project: Project;
}

export const PermissionComponent = ({ group, showUser, permissions, project }: Props) => {
    const [selectedPermission, setSelectedPermission] = useState<string | "">("");
    const { user } = useContext(UserContext);
    const [successPermission, setSuccessPermission] = useState<boolean>(false);
    const [text, setText] = useState<string>("");
    const { t } = useTranslation();

    useEffect(() => {
        findUserPermissionsInGroup();
    }, [user, group, project]);

    useEffect(() => {
        const timer = setTimeout(() => {
            if (successPermission) setSuccessPermission(false);
        }, 6000);
        return () => clearTimeout(timer);
    }, [successPermission]);

    const findUserPermissionsInGroup = () => {
        if (user && group && user.permissions.length > 0) {
            const filteredPermissions = user.permissions.filter(p => p.project.id === project.id);
            console.log(filteredPermissions, "lista de permissões");
            

            if (filteredPermissions.length > 0) {
                setSelectedPermission(filteredPermissions[0].id.toString());
                console.log(selectedPermission, "permissão selecionada");
                
            } else {
                const defaultPermission = permissions.find(p => p.isDefault);
                setSelectedPermission(defaultPermission ? defaultPermission.name : "");
            }
        } else {
            setSelectedPermission("");
        }
    };

    const savePermission = async (selectedPermissionToSave: Permission) => {
        try {
            await userService.updatePermission(showUser.username, selectedPermissionToSave);
            setSelectedPermission(selectedPermissionToSave.id.toString());
            console.log("nova selecionada", selectedPermission);
            
            setText(t("permissionUpdateSuccess"));
            setSuccessPermission(true);
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
        <div className="text-primary dark:text-secondary w-24 flex justify-between">
            {group.owner && showUser.username === group.owner.username ? (
                <div className="flex items-center justify-center w-full">
                    <div>
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" viewBox="0 0 18 18" fill="currentColor" className="text-primary dark:text-secondary stroke-none">
                            <path d="M2.35592 13.3507L0.523193 1.83408L5.56319 7.06892L8.77047 0.787109L11.9777 7.06892L17.0177 1.83408L15.185 13.3507H2.35592ZM15.185 16.4916C15.185 17.1198 14.8185 17.5386 14.2687 17.5386H3.27228C2.72247 17.5386 2.35592 17.1198 2.35592 16.4916V15.4447H15.185V16.4916Z" />
                        </svg>
                    </div>
                </div>
            ) : (
                <div className="pl-4 md:pr-3">
                    <select
                        className="flex w-16 text-primary text-xs dark:text-secondary text-center h-6 dark:bg-[#3C3C3C] border-2 rounded-sm border-primary dark:border-secondary appearance-none focus:outline-none"
                        name="permission"
                        id="permission"
                        disabled={group?.owner.id != user?.id}
                        value={selectedPermission}
                        onChange={handleSelectChange}
                    >
                        {permissions.map(p => (
                            <option key={p.id} value={p.id}>
                                {p.name || t("withoutname")}
                            </option>
                        ))}
                    </select>
                </div>
            )}
            {successPermission && (
                <div className="fixed inset-x-0 text-p14 font-montserrat mx-auto w-72 h-12 flex items-center justify-center bg-[#F2F2F2] text-black rounded shadow-md animate-fadeInOut notification slideUpAppear">
                    {text}
                </div>
            )}
        </div>
    );
};
