import { Group, GroupPut, Permission } from "@/models";
import { Arrow } from "./Arrow";
import { groupService } from "@/services";
import { useEffect, useState } from "react";

interface Props {
    permissions : Permission[]
    group?: Group
}

export const PermissionComponent = ({permissions, group}: Props) => {
    const [selectedPermission, setSelectedPermission] = useState<string | "">("");

    const fetchData = async () => {
        if (group) {
            setSelectedPermission(group?.permissions[0]?.name)
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

    return (
        <>
            <select
                className="flex mr-6 text-primary dark:text-secondary text-center w-[55%] md:w-[45%] h-8 dark:bg-[#3C3C3C] pl-2 pr-8 border-2 rounded-sm border-primary dark:border-secondary appearance-none focus:outline-none"
                name="permission"
                id="permission"
                value={selectedPermission}
                onChange={(e) => findPermission(+e.target.value)}
            >
                {!group || (group.permissions && group.permissions.length === 0) ? (
                    <option value="" disabled selected>
                        Permissão
                    </option>
                ) :
                    (
                        group.permissions.map((p) => (
                            <option key={p.id} value={p.id}>
                                {p.name}
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