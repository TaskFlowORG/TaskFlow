import { Group, OtherUser, Permission } from "@/models";
import { userService } from "@/services";
import { useState } from "react";

interface Props{
    group: Group,
    user: OtherUser
    permissions: Permission[]
}

export const PermissionComponent = ({group, user, permissions}:Props) => {
    const [selectedPermission, setSelectedPermission] = useState<string | "">("");

    const findPermission = (selectedValue: number) => {
        try {
          if (permissions) {
            const selectedPermission = permissions.find(permission => permission.id === selectedValue);
    
            if (selectedPermission) {
              savePermission(selectedPermission);
            }
          }
        } catch (error: any) {
          alert('Não foi possível atualizar a permissão do grupo. Verifique se você possui a permissão necessária');
        }
      }
    
      async function savePermission(selectedPermission: Permission) {
        try {
          if (permissions) {
            await userService.updatePermission(user.username, selectedPermission);
            setSelectedPermission(selectedPermission.name);
    
          }
        } catch (error: any) {
          alert('Não foi possível atualizar a permissão do grupo. Verifique se você possui a permissão necessária');
        }
      }
    return (
        <div className="text-primary dark:text-secondary w-24 flex justify-between ">
            {group.owner && user.username === group.owner.username ? (
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
                </div>
            )}
        </div>
    )
}