import { Group, GroupPut, OtherUser, Permission, Project } from "@/models";
import { Arrow } from "./Arrow";
import { groupService, userService } from "@/services";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";

interface Props {
    permissions: Permission[]
    group?: Group
    project: Project
}

export const PermissionComponent = ({ permissions, group, project }: Props) => {
    const [selectedPermission, setSelectedPermission] = useState<string | "">("");
    const [sucessPermission, setSucessPermission] = useState<boolean>(false)
    const [text, setText] = useState<string>("")
    const [user, setUser] = useState<OtherUser>()
    const { t } = useTranslation();

    useEffect(() => {
        fetchData()
    })

    useEffect(() => {
        fetchData();
        const timer = setTimeout(() => {
            if (sucessPermission) setSucessPermission(false);
        }, 6000);
        return () => clearTimeout(timer);
    }, [sucessPermission]);


    const fetchData = async () => {
        const fetchedUser = await userService.findLogged();
        setUser(fetchedUser);
        if (group) {
            const permission = group?.permissions.find(p => p.project.id == project.id)
            setSelectedPermission(permission ? permission.name : permissions.find(p => p.isDefault)!.name)
        }
    };

    const savePermission = async (selectedPermission: Permission) => {
        try {
            if (group != undefined) {
                group.permissions = [selectedPermission]
                await groupService.update(new GroupPut(group.id, group.name, group.description, group.permissions, group.users), group.id);
                setSelectedPermission(selectedPermission.name)
                setText("Permissão atualizada com sucesso")
                setSucessPermission(true)
            }
        } catch (error: any) {
            setText("Erro ao atualizada permissão")
            setSucessPermission(true)
        }
    }


    const handleSelectChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const selectedId = parseInt(e.target.value, 10);
        const foundPermission = permissions.find(p => p.id === selectedId);
        if (foundPermission) {
            setSelectedPermission(foundPermission.name);
            savePermission(foundPermission);
        }
    };

    return (
        <>
            <select
                className="flex mr-6 text-primary dark:text-secondary text-center w-[55%] md:w-[45%] h-8 dark:bg-[#3C3C3C] pl-2 pr-8 border-2 rounded-sm border-primary dark:border-secondary appearance-none focus:outline-none"
                name="permission"
                id="permission"
                value={permissions.find(p => p.name === selectedPermission)?.id.toString() || ""}
                disabled={group?.owner.id != user?.id}
                onChange={handleSelectChange}
            >
                {permissions.map(p => (
                    <option key={p.id} value={p.id}>
                        {p.name ?? t("withoutname")}
                    </option>
                ))}
            </select>
            <Arrow className={"absolute inset-y-5 border-l-[2px] left-[39%] md:left-[85%] flex items-center pointer-events-none"} />
            {sucessPermission && (
                <div className="fixed inset-x-0 mx-auto w-72 h-12 flex items-center justify-center bg-[#F2F2F2] text-black rounded shadow-md animate-fadeInOut notification slideUpAppear">
                    {text}
                </div>
            )}
            <div>
                <Arrow className={"absolute inset-y-5 border-l-[2px] left-[39%] md:left-[85%] flex items-center pointer-events-none"} />
            </div>
            {
                sucessPermission && (
                    <div className="fixed inset-x-0  mx-auto w-72 h-12 flex items-center justify-center bg-[#F2F2F2] text-black rounded shadow-md animate-fadeInOut notification slideUpAppear">
                        {text}
                    </div>
                )}
        </>
    )
}