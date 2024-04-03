import React, { useState, useEffect } from 'react';
import { getData, getListData, putData } from '@/services/http/api';
import { Group, Project } from '@/models';
import { boolean, set } from 'zod';
import { PermissionGet } from '@/models/project/permission/PermissionGetDTO';
import { groupService, permissionService } from '@/services';
import { useTheme } from 'next-themes';

interface Permission {
    id: number;
    name: string;
    project: Project
}

interface Props {
    project: Project;
    group: Group;
}

export const GroupAccess: React.FC<Props> = ({project, group }) => {
    const [permissions, setPermissions] = useState<Permission[]>([]);
    const [selectedPermission, setSelectedPermission] = useState<string>("");
    const [isEnable, setIsEnable] = useState(false);
    const [newName, setNewName] = useState(group.name);
    const [newDescription, setNewDescription] = useState(group.description);
    const {theme} = useTheme();

    useEffect(() => {
        const getLists = async () => {
            const fetchedPermissions = await getListData("permission");
            setPermissions(fetchedPermissions);
        };
        getLists();
    }, [group]);

    const findPermission = async (selectedValue: string) => {
        setSelectedPermission(selectedValue);
        updatePermission(selectedValue);
    };

    const updatePermission = async (selectedValue: string) => {
        try {
            const selectedPermission = permissions.find(permission => permission.name === selectedValue);
            if (!selectedPermission) {
                throw new Error('Permissão selecionada não encontrada.');
            }
            const hasPermission = group.permissions.some(permission => permission.name === selectedPermission.name);

            if (hasPermission) {
                console.log('Este grupo já possui esta permissão.');
                setSelectedPermission("");
                alert('Este grupo já possui esta permissão.');
            } else {
                if (group.permissions != null) {
                    group.permissions = []
                }
                group.permissions = [...group.permissions, await permissionService.findOne(selectedPermission.id)];
                await putData("group", group);
                setSelectedPermission("");
                alert('Permissão atualizada com sucesso!');
            }
        } catch (error: any) {
            console.error('Erro ao atualizar permissão:', error.message);
            alert('Não foi possível atualizar a permissão do grupo.');
        }
    }

    const handleButton = () => {
        if (isEnable) {
            setIsEnable(false);
        } else {
            setIsEnable(true);
        }
    }

    const updateTheInformationsOFAGroup = () => {
        group.name = newName;
        group.description = newDescription
        groupService.update(group);
        setIsEnable(false)
    }

    const button = theme === "light" ? '/img/themeLight/edit.svg' : '/img/editar.svg';

    return (
        <div className="flex pl-8 gap-4 items-start">
            <img className="rounded-full w-24 h-24" src='/img/EllipseTest.svg' />
            <div className="flex flex-col gap-10">
                <div className="flex flex-col gap-4">
                    <input
                        className="pAlata h3 text-[#333] dark:text-[#FCFCFC]"
                        type="text"
                        value={isEnable ? newName : group.name}
                        onChange={(e) => setNewName(e.target.value)}
                        disabled={!isEnable}
                    />
                    <input
                        className="mn whitespace-pre-wrap w-72 md:w-[403px] text-[#333] dark:text-[#FCFCFC]"
                        type="text"
                        value={isEnable ? newDescription : group.description}
                        onChange={(e) => setNewDescription(e.target.value)}
                        disabled={!isEnable}
                    />
                </div>
                <div className="flex justify-end">
                    <select
                        className='flex mr-6 text-primary dark:text-secondary text-center w-[35%] ml-4 mnAlata border-2 rounded-sm border-primary dark:border-secondary'
                        name="permission"
                        id="permission"
                        value={selectedPermission}
                        onChange={(e) => findPermission(e.target.value)}
                    >
                        {group.permissions && group.permissions.length > 0 ? (
                            group.permissions.map((permission) => (
                                <option key={permission.id} value="" disabled>{permission.name}</option>
                            ))
                        ) : (
                            <option value="" disabled>Permissão</option>
                        )}

                        {permissions.map(permission => {
                            console.log("group", permission.project.id)
                            console.log("group", project.id)

                            if (permission.project.id === project.id) {
                                return (
                                    <option className='flex justify-center' key={permission.name} value={permission.name}>
                                        {permission.name}
                                    </option>
                                );
                            } else {
                                return null;
                            }
                        })}
                    </select>
                </div>
                <div className=''>
            {isEnable ? (
                    <div className='flex justify-between'>
                        <button className="font-alata text-sm rounded z-30 w-20 h-5 bg-primary dark:bg-secondary text-[#FCFCFC]" onClick={() => {setIsEnable(false), setNewName(group.name,
                            ), setNewDescription(group.description)}}>Cancelar</button>
                        <button className="font-alata text-sm rounded z-30 w-16 h-5 bg-primary dark:bg-secondary text-[#FCFCFC]" onClick={() => updateTheInformationsOFAGroup()}>Salvar</button>
                    </div>
                ) : 
                    <div className="flex justify-end">
                        <button className='z-30'> <img src={button} onClick={() => setIsEnable(true)} /> </button>
                    </div>
                }
            </div>

            </div>
           
        </div >
    )
}
