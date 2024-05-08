import React, { useState, useEffect, useRef } from 'react';
import { Group, GroupPut, OtherUser, Permission, Project } from '@/models';
import { groupService, permissionService } from '@/services';
import { PermissionComponent } from './componets/GPermissionComponent';
import Image from "next/image";
import { archiveToSrc } from '@/functions';
import { IconEditColoured } from '../icons/PageOtpions/IconEditCoulored';
import { If } from '../If';
import { useTranslation } from 'react-i18next';

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
    const { t } = useTranslation();

    const refDescription = useRef<HTMLTextAreaElement>(null);
    const refName = useRef<HTMLInputElement>(null);

    const fetchData = async () => {
        if (project != null) {
            const fetchedPermissions = await permissionService.findAll(project.id);
            setPermissions(fetchedPermissions);
            console.log(permissions);
            
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


    const updatePicture = async (e: React.ChangeEvent<HTMLInputElement>) => {
        if (group) {
            const file = e.target.files?.[0];
            if (!file) return;
            const updateGroup = await groupService.updatePicture(file, group.id);
            setGroup(updateGroup);
        }
    };

    const updateNameOfAGroup = async () => {
        if (group && name) {
            group.name = name;
            await groupService.update(new GroupPut(group.id, group.name, group.description, group.permissions, group.users), group.id);
        }
    }

    const updateDescriptionOfAGroup = async () => {
        if (group && description) {
            group.description = description;
            await groupService.update(new GroupPut(group.id, group.name, group.description, group.permissions, group.users), group.id);
        }
    }

    return (
        <div className="flex pl-8 gap-4 items-start">
            <div>
                <div className="relative rounded-full w-24 h-24 bg-zinc-300">
                    <div className="absolute inset-0 overflow-hidden rounded-full">
                        <Image
                            className="rounded-full"
                            src={archiveToSrc(group?.picture)}
                            alt="Group Picture"
                            layout="fill"
                            objectFit="cover"
                        />
                    </div>
                    <div>
                    <If condition={group?.owner.id == user?.id}>
                            <span
                                className="absolute rounded-full bottom-1 -right-1 border-2 border-primary 
                                dark:border-secondary h-6 w-6 p-1 flex justify-center items-center  bg-white shadow-blur-10 dark:bg-modal-grey"
                            >
                                <IconEditColoured />
                                <input
                                    onChange={updatePicture}
                                    type="file"
                                    className="w-full h-full absolute cursor-pointer opacity-0"
                                />
                            </span>
                        </If>
                    </div>
                </div>
            </div>

            <div className="flex flex-col gap-10">
                <div className="flex flex-col gap-4">
                    <input
                        className="pAlata text-[#333] text-h3 font-alata dark:text-[#FCFCFC] dark:bg-[#3C3C3C]"
                        ref={refName}
                        disabled={group?.owner.id != user?.id}
                        type="text"
                        value={name || t("withoutname")}
                        onKeyUp={(e) => e.key == "Enter" && refName.current?.blur()}
                        onChange={(e) => setName(e.target.value)}
                        onBlur={updateNameOfAGroup}
                    />
                    <textarea
                        className={`text-p14 font-montserrat whitespace-pre-wrap w-56 md:w-[403px] dark:bg-[#3C3C3C] text-[#333] dark:text-[#FCFCFC] break-words ${isEnable ? '' : 'no-resize h-14'} scrollbar-thin scrollbar-thumb-gray-400 scrollbar-track-gray-200`}
                        ref={refDescription}
                        disabled={group?.owner.id != user?.id}
                        value={description || t("withoutdescription")}
                        onChange={(e) => setDescription(e.target.value)}
                        onBlur={updateDescriptionOfAGroup}
                    />
                </div>
                { project?.id != null && (
                    <div className="flex md:justify-end relative">
                        <PermissionComponent permissions={permissions} group={group} project={project} />
                    </div>
                )}

            </div>
        </div >
    )
}

