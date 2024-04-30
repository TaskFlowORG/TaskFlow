import React, { useState, useEffect, useRef } from 'react';
import { Group, GroupPut, OtherUser, Permission, Project } from '@/models';
import { groupService, permissionService } from '@/services';
import { Arrow } from './Arrow';
import { PermissionComponent } from './PermissionComponent';

interface Props {
    project?: Project;
    groupId: number;
    user: OtherUser;
}

export const GroupAccess = ({ project, groupId, user }: Props) => {
    const [permissions, setPermissions] = useState<Permission[]>([]);
    const [group, setGroup] = useState<Group>();
    const [isEnable, setIsEnable] = useState(false);
    const [name, setName] = useState<string | undefined>(group?.name);
    const [description, setDescription] = useState<string | undefined>(group?.description);

    const refDescription = useRef<HTMLTextAreaElement>(null);
    const refName = useRef<HTMLInputElement>(null);

    const fetchData = async () => {
        if (project != null) {
            const fetchedPermissions = await permissionService.findAll(project.id);
            setPermissions(fetchedPermissions);
        }
        const fetchedGroup = await groupService.findOne(groupId);
        setGroup(fetchedGroup);
        if (fetchedGroup) {
            setName(fetchedGroup?.name || "");
            setDescription(fetchedGroup?.description || "");
        }
    };

    useEffect(() => {
        fetchData();
        console.log(permissions);

    }, [groupId]);


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
                        disabled={group?.owner.id != user?.id}
                        type="text"
                        value={name}
                        onKeyUp={(e) => e.key == "Enter" && refName.current?.blur()}
                        onChange={(e) => setName(e.target.value)}
                        onBlur={updateNameOfAGroup}
                    />
                    <textarea
                        className={`mn whitespace-pre-wrap w-56 md:w-[403px] dark:bg-[#3C3C3C] text-[#333] dark:text-[#FCFCFC] break-words ${isEnable ? '' : 'no-resize h-14'} scrollbar-thin scrollbar-thumb-gray-400 scrollbar-track-gray-200`}
                        ref={refDescription}
                        disabled={group?.owner.id != user?.id}
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        onBlur={updateDescriptionOfAGroup}
                    />
                </div>
                {group?.owner.id === user.id && project?.id != null && (
                    <div className="flex md:justify-end relative">
                        <PermissionComponent permissions={permissions} group={group} />
                    </div>
                )}

            </div>
        </div >
    )
}

