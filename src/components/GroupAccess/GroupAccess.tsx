import React, { useState, useEffect } from 'react';
import { getListData, putData } from '@/services/http/api';
import { Group, Permission, Project } from '@/models';
import { boolean, set } from 'zod';
import { groupService, permissionService } from '@/services';
import { useTheme } from 'next-themes';

interface Props {
    project: Project;
    group: Group;
}

export const GroupAccess: React.FC<Props> = ({ project, group }) => {
    const [permissions, setPermissions] = useState<Permission[]>([]);
    const [selectedPermission, setSelectedPermission] = useState<number>();
    const [isEnable, setIsEnable] = useState(false);
    const [newName, setNewName] = useState(group.name);
    const [newDescription, setNewDescription] = useState(group.description);
    const { theme } = useTheme();

    useEffect(() => {
        const getLists = async () => {
            const fetchedPermissions = await permissionService.findAll(project.id);
            setPermissions(fetchedPermissions);
        };
        getLists();
    }, [group]);

    const findPermission = async (selectedValue: number) => {
        setSelectedPermission(selectedValue);
        updatePermission(selectedValue);
    };

    const updatePermission = async (selectedValue: number) => {
        console.log(selectedValue)
        console.log(permissions)
        try {
            const selectedPermission = permissions.find(permission => permission.id === selectedValue);
            if (!selectedPermission) {
                throw new Error('Permissão selecionada não encontrada.');
            }

            const hasPermission = group.permissions.some(permission => permission.id === selectedPermission.id);

            if (hasPermission) {
                console.log('Este grupo já possui esta permissão.');
                setSelectedPermission(0);
                alert('Este grupo já possui esta permissão.');
            } else {
                if (group.permissions != null) {
                    group.permissions = []
                }
                group.permissions.push(selectedPermission);
                await groupService.update(group, group.id);
                setSelectedPermission(0);
                alert('Permissão atualizada com sucesso!');
            }
        } catch (error: any) {
            console.error('Erro ao atualizar permissão:', error.message);
            alert('Não foi possível atualizar a permissão do grupo.');
        }
    }

    const updateTheInformationsOFAGroup = () => {
        group.name = newName;
        group.description = newDescription
        groupService.update(group, group.id);
        setIsEnable(false)
    }

    const handleImageClick = () => {
        setIsEnable(true);
    };


    return (
        <div className="flex pl-8  gap-4 items-start">
            <div>
                <div>
                    <button className="z-30 rounded-full w-24 h-24 bg-cyan-500" onClick={handleImageClick}>

                    </button>
                </div>
            </div>
            <div className="flex flex-col gap-10">
                <div className="flex flex-col gap-4">
                    <input
                        className="pAlata h3 placeholder:text-[#333] dark:text-[#FCFCFC]"
                        type="text"
                        value={isEnable ? newName : group.name}
                        onChange={(e) => setNewName(e.target.value)}
                        disabled={!isEnable}
                    />
                    <input
                        className="mn whitespace-pre-wrap w-72 md:w-[403px] placeholder:text-[#333] dark:text-[#FCFCFC]"
                        type="text"
                        value={isEnable ? newDescription : group.description}
                        onChange={(e) => setNewDescription(e.target.value)}
                        disabled={!isEnable}
                    />
                </div>
                <div className="flex md:justify-end">
                    <select
                        className='flex mr-6 text-primary dark:text-secondary text-center w-[35%] ml-4 mnAlata border-2 rounded-sm border-primary dark:border-secondary'
                        name="permission"
                        id="permission"
                        value={selectedPermission}
                        onChange={(e) => findPermission(+e.target.value)}
                    >
                        {group.permissions && group.permissions.length > 0 ? (
                            group.permissions.map((permission) => {
                                setSelectedPermission(permission.id);
                                return (
                                    <option key={permission.id} value="" disabled>{permission.name}</option>
                                )
                            })
                        ) : (
                            <option value="" disabled>Permissão</option>
                        )}

                        {permissions.map(permission => {
                            return (<option className='flex justify-center' key={permission.name} value={permission.id}>
                                {permission.name}
                            </option>
                            )
                        })}
                    </select>
                </div>
                <div className=''>
                    {isEnable ? (
                        <div className='flex justify-between'>
                            <button className="font-alata text-sm rounded z-30 w-20 h-5 bg-primary dark:bg-secondary text-[#FCFCFC]" onClick={() => {
                                setIsEnable(false), setNewName(group.name,
                                ), setNewDescription(group.description)
                            }}>Cancelar</button>
                            <button className="font-alata text-sm rounded z-30 w-16 h-5 bg-primary dark:bg-secondary text-[#FCFCFC]" onClick={() => updateTheInformationsOFAGroup()}>Salvar</button>
                        </div>
                    ) :
                        <div className="flex px-48 md:px-0 md:justify-end">
                            <button className='z-30' onClick={() => setIsEnable(true)}>
                                <div>
                                    <svg xmlns="http://www.w3.org/2000/svg" width="25" height="34" viewBox="0 0 60 64" fill="currentColor" className="text-primary dark:text-secondary stroke-none">
                                        <path d="M27.5 13.3334H15C13.6739 13.3334 12.4021 13.8953 11.4645 14.8955C10.5268 15.8957 10 17.2523 10 18.6668V48.0001C10 49.4146 10.5268 50.7711 11.4645 51.7713C12.4021 52.7715 13.6739 53.3334 15 53.3334H42.5C43.8261 53.3334 45.0979 52.7715 46.0355 51.7713C46.9732 50.7711 47.5 49.4146 47.5 48.0001V34.6668M43.965 9.56277C44.4262 9.05339 44.978 8.64708 45.588 8.36757C46.198 8.08805 46.8541 7.94093 47.518 7.93477C48.1819 7.92862 48.8403 8.06356 49.4548 8.33173C50.0693 8.59989 50.6275 8.99591 51.097 9.49667C51.5664 9.99743 51.9377 10.5929 52.1891 11.2484C52.4405 11.9038 52.567 12.6061 52.5613 13.3142C52.5555 14.0224 52.4176 14.7222 52.1555 15.3729C51.8935 16.0236 51.5125 16.6121 51.035 17.1041L29.57 40.0001H22.5V32.4588L43.965 9.56277Z"
                                        />
                                    </svg>
                                </div>
                            </button>
                        </div>
                    }
                </div>

            </div>

        </div >
    )
}
