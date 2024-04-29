import React, { useState, useEffect, useRef } from 'react';
import { Group, GroupPut, OtherUser, Permission, Project } from '@/models';
import { groupService, permissionService } from '@/services';
import { Arrow } from './Arrow';

interface Props {
    project: Project;
    groupId: number;
    user: OtherUser;
}

export const GroupAccess = ({ project, groupId, user }: Props) => {
    const [permissions, setPermissions] = useState<Permission[]>([]);
    const [group, setGroup] = useState<Group>();
    const [isEnable, setIsEnable] = useState(false);
    const [name, setName] = useState<string | undefined>(group?.name);
    const [description, setDescription] = useState<string | undefined>(group?.description);
    const [selectedPermission, setSelectedPermission] = useState<string | "">("");

    const refDescription = useRef<HTMLTextAreaElement>(null);
    const refName = useRef<HTMLInputElement>(null);

    const fetchData = async () => {
        const fetchedPermissions = await permissionService.findAll(project.id);
        setPermissions(fetchedPermissions);
        const fetchedGroup = await groupService.findOne(groupId);
        setGroup(fetchedGroup);
        if (fetchedGroup) {
            setName(fetchedGroup?.name || "");
            setDescription(fetchedGroup?.description || "");
            setSelectedPermission(fetchedGroup?.permissions[0]?.name)
        }
    };

    useEffect(() => {
        fetchData();
        console.log(permissions);

    }, [groupId]);

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
                await groupService.update(new GroupPut(groupId, group.name, group.description, group.permissions, group.users), groupId);
                setSelectedPermission(selectedPermission.name)
            }
        } catch (error: any) {
            alert("Não foi possível atualizar a permissão.");
        }
    }

    const updateNameOfAGroup = async () => {
        if (group && name) {
            group.name = name;
            await groupService.patch(new GroupPut(group.id, group.name, group.description, group.permissions, group.users), group.id);
        }
    }

    const updateDescriptionOfAGroup = async () => {
        if (group && description) {
            group.description = description;
            await groupService.patch(new GroupPut(group.id, group.name, group.description, group.permissions, group.users), group.id);
        }
    }

    return (
        <div className="flex pl-8 gap-4 items-start">
            <div>
                <div>
                    <button className="z-30 rounded-full w-24 h-24 bg-cyan-500" onClick={() => { setIsEnable(true) }}>


                    </button>
                </div>
            </div>
            <div className="flex flex-col gap-10">
                <div className="flex flex-col gap-4">
                    <input
                        className="pAlata h3 text-[#333] dark:text-[#FCFCFC] dark:bg-[#3C3C3C]"
                        ref={refName}
                        disabled={project?.owner.id != user?.id}
                        type="text"
                        value={name}
                        onKeyUp={(e) => e.key == "Enter" && refName.current?.blur()}
                        onChange={(e) => setName(e.target.value)}
                        onBlur={updateNameOfAGroup}
                    />
                    <textarea
                        className={`mn whitespace-pre-wrap w-56 md:w-[403px] dark:bg-[#3C3C3C] text-[#333] dark:text-[#FCFCFC] break-words ${isEnable ? '' : 'no-resize h-14'} scrollbar-thin scrollbar-thumb-gray-400 scrollbar-track-gray-200`}
                        ref={refDescription}
                        disabled={project?.owner.id != user?.id}
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        onBlur={updateDescriptionOfAGroup}
                    />
                </div>
                <div className="flex md:justify-end relative">
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
                </div>
            </div>
        </div >
    )
}

