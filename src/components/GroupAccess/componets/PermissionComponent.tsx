import { Group, GroupPut, OtherUser, Permission, Project } from "@/models";
import { Arrow } from "./Arrow";
import { groupService, userService } from "@/services";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";

interface Props {
    permissions : Permission[]
    group?: Group
    project : Project
}

export const PermissionComponent = ({permissions, group, project}: Props) => {
    const [selectedPermission, setSelectedPermission] = useState<string | "">("");
    const [user, setUser] = useState<OtherUser>()

    useEffect(() =>{
        fetchData()
    })


    const fetchData = async () => {
        const fetchedUser = await userService.findLogged();
        setUser(fetchedUser);
        if (group) {
            const permission = group?.permissions.find(p => p.project.id == project.id )
            
            setSelectedPermission( permission ? permission.name : permissions.find(p => p.isDefault)!.name)
        }
    };

    useEffect(() => {
        fetchData();
        console.log(permissions);

    }, [group?.id]);

    const findPermission = (selectedValue: number) => {
        console.log(selectedValue);

        try {
            if (permissions) {
                const selectedPermission = permissions.find(permission => permission.id === selectedValue);

                if (selectedPermission) {
                    group?.permissions.slice(0, group.permissions.length);
                    savePermission(selectedPermission);
                }
            }
        } catch (error: any) {
            alert('Não foi possível atualizar a permissão do grupo.');
        }
    }

    const savePermission = async (selectedPermission: Permission) => {
        try {
            if (group != undefined) {
                group.permissions = [selectedPermission]
                await groupService.update(new GroupPut(group.id, group.name, group.description, group.permissions, group.users), group.id);
                setSelectedPermission(selectedPermission.name)
            }
        } catch (error: any) {
            alert("Não foi possível atualizar a permissão.");
        }
    }

    useEffect(()=>{
        console.log("aqui", selectedPermission);
        
    },  [selectedPermission])

    const {t} = useTranslation();

    return (
        <>
            <select
                className="flex mr-6 text-primary dark:text-secondary text-center w-[55%] md:w-[45%] h-8 dark:bg-[#3C3C3C] pl-2 pr-8 border-2 rounded-sm border-primary dark:border-secondary appearance-none focus:outline-none"
                name="permission"
                id="permission"
                disabled={group?.owner.id != user?.id}
                onChange={(e) => findPermission(+e.target.value)}
            >
                {!group || (permissions && permissions.length === 0) ? (
                    <option value="" disabled>
                        Permissão
                    </option>
                ) :
                    (
                        permissions.map((p) => (
                            <option key={p.id} value={p.id} selected={p.name == selectedPermission}>
                                {p.name ?? t("withoutname")}
                            </option>
                        ))
                    )}

                {permissions && (
                    permissions.map((p) => {
                        return (
                            <option className="flex justify-center" key={p.id} value={p.id}>
                                {p.name}
                            </option>
                        );
                    })
                )}
            </select>
            <div>
                <Arrow className={"absolute inset-y-5 border-l-[2px] left-[39%] md:left-[85%] flex items-center pointer-events-none"} />
            </div>
        </>
    )
}