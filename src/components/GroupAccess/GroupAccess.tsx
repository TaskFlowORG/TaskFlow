import React, { useState, useEffect, useRef } from 'react';
import { Group, GroupPut, OtherUser, Permission, Project } from '@/models';
import { groupService, permissionService } from '@/services';
import { PermissionComponent } from './componets/GPermissionComponent';
import Image from "next/image";
import { archiveToSrc } from '@/functions';
import { IconEditColoured } from '../icons/PageOtpions/IconEditCoulored';
import { If } from '../If';
import { useTranslation } from 'react-i18next';
import { useAsyncThrow } from '@/hooks/useAsyncThrow';

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
    const asynThrow = useAsyncThrow();

    const refDescription = useRef<HTMLTextAreaElement>(null);
    const refName = useRef<HTMLInputElement>(null);

    // Definindo o estado do tamanho da tela
    const [screenSize, setScreenSize] = useState<'sm' | 'lg'>('lg');

    useEffect(() => {
        function handleResize() {
            // Atualiza o tamanho da tela quando a janela é redimensionada
            setScreenSize(window.innerWidth <= 640 ? 'sm' : 'lg');
        }

        // Define o tamanho da tela inicialmente quando o componente monta
        handleResize();

        // Adiciona um event listener para monitorar alterações no tamanho da janela
        window.addEventListener('resize', handleResize);

        // Remove o event listener quando o componente é desmontado
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    const fetchData = async () => {
        if (project != null) {
            const fetchedPermissions = await permissionService.findAll(project.id).catch(asynThrow);
            if (fetchedPermissions)
                setPermissions(fetchedPermissions);
        }
        const fetchedGroup = await groupService.findOne(groupId).catch(asynThrow);
        if (fetchedGroup)
            setGroup(fetchedGroup);
        if (fetchedGroup) {
            setName(fetchedGroup?.name || "");
            setDescription(fetchedGroup?.description || "");
        }
    };

    useEffect(() => {
        fetchData();
    }, [groupId]);

    const updatePicture = async (e: React.ChangeEvent<HTMLInputElement>) => {
        if (group) {
            const file = e.target.files?.[0];
            if (!file) return;
            const updateGroup = await groupService.updatePicture(file, group.id).catch(asynThrow);
            if (updateGroup)
                setGroup(updateGroup);
        }
    };

    const updateNameOfAGroup = async () => {
        if (group && name) {
            group.name = name;
            await groupService.update(new GroupPut(group.id, group.name, group.description, group.permissions, group.users), group.id).catch(asynThrow);
        }
    }

    const updateDescriptionOfAGroup = async () => {
        if (group && description) {
            group.description = description;
            await groupService.update(new GroupPut(group.id, group.name, group.description, group.permissions, group.users), group.id).catch(asynThrow);
        }
    }

    const [src, setSrc] = useState<string>("/Assets/noImage.png");
    useEffect(() => {
        setSrc(archiveToSrc(group?.picture));
    }, [group]);

    return (
        <div className={"flex md:pl-48 lg:pl-8 md:gap-4 md:items-start flex-col  items-center   w-full   md:relative justify-center md:left-0  md:flex-row"}>
            <div>
                <div className="relative rounded-full w-24 h-24 bg-zinc-300">
                    <div className="absolute inset-0 overflow-hidden border-2 border-zinc-300 rounded-full">
                        <Image
                            className="rounded-full"
                            src={src}
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
                                    accept="image/*"
                                    className="w-full h-full absolute cursor-pointer opacity-0"
                                />
                            </span>
                        </If>
                    </div>
                </div>
            </div>
    
            <div className={"flex flex-col md:mt-0"}>
                <div className="flex flex-col gap-4">
                    <input
                        className="text-[#333] text-h5 font-pAlata dark:text-[#FCFCFC] bg-transparent"
                        ref={refName}
                        disabled={group?.owner.id != user?.id}
                        type="text"
                        placeholder={t("withoutname")}
                        value={name}
                        onKeyUp={(e) => e.key == "Enter" && refName.current?.blur()}
                        onChange={(e) => setName(e.target.value)}
                        onBlur={updateNameOfAGroup}
                    />
                    <textarea
                        className={`text-p14 font-montserrat whitespace-pre-wrap w-56 md:w-[403px] bg-transparent text-[#333] dark:text-[#FCFCFC] break-words ${isEnable ? '' : 'no-resize h-14'} scrollbar-thin scrollbar-thumb-gray-400 scrollbar-track-gray-200`}
                        ref={refDescription}
                        disabled={group?.owner.id != user?.id}
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        onBlur={updateDescriptionOfAGroup}
                        placeholder={t("withoutdescription")}
                    />
                </div>
                {project?.id != null && (
                    <div className="flex md:justify-end relative">
                        <PermissionComponent permissions={permissions} group={group} project={project} />
                    </div>
                )}
            </div>
        </div>
    );
    
}
