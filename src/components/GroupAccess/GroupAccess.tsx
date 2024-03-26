import React, { useState, useEffect } from 'react';
import { getData, getListData, putData } from '@/services/http/api';
import { Project } from '@/models';
import { boolean, set } from 'zod';

interface Permission {
    id: string;
    name: string;
    project: Project
}


interface Group {
    permissions: Permission[];
}

interface Props {
    name: string;
    description: string;
    project: Project;
    group: Group;
}

export const GroupAccess: React.FC<Props> = ({ name, description, project, group }) => {
    const [permissions, setPermissions] = useState<Permission[]>([]);
    const [selectedPermission, setSelectedPermission] = useState<string>("");
    const [isEnable, setIsEnable] = useState(false); // Estado para controlar se o input está habilitado
    const [newName, setNewName] = useState('');

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
            const hasPermission = group.permissions.some(permission => permission.id === selectedPermission.id);

            if (hasPermission) {
                console.log('Este grupo já possui esta permissão.');
                setSelectedPermission("");
                alert('Este grupo já possui esta permissão.');
            } else {
                if (group.permissions != null) {
                    group.permissions = []
                }
                group.permissions = [...group.permissions, selectedPermission];
                await putData("group", group);
                setSelectedPermission("");
                alert('Permissão atualizada com sucesso!');
            }
        } catch (error: any) {
            console.error('Erro ao atualizar permissão:', error.message);
            alert('Não foi possível atualizar a permissão do grupo.');
        }
    }

     const handleButton = () =>{
         if(isEnable){
            setIsEnable(false);
         } else{
            setIsEnable(true);
         }
     }

    const updateTheNameOfAGroup = (name: any) => {
        group.name = newName;
    }

    return (
        <div className="flex pl-8 gap-4 items-start">
            <img className="rounded-full w-24 h-24" src='/img/EllipseTest.svg' />
            <div className="flex flex-col gap-10">
                <div className="flex flex-col gap-4">
                    <input
                        className="pAlata h3 text-[#333] dark:text-[#FCFCFC]"
                        type="text"
                        value={isEnable ? newName : name}
                        onChange={(e) => updateTheNameOfAGroup(setNewName(e.target.value))}
                        disabled={!isEnable}
                    />

                    <input
                        className="mn whitespace-pre-wrap w-72 lg:w-[403px] md:w-[403px] text-[#333] dark:text-[#FCFCFC]"
                        type="text"
                        value={description}
                        defaultValue={description + "..."}
                        disabled={!isEnable}
                    />
                </div>
                <div className="flex justify-end">
                    <select
                        className='flex mr-6 text-[#F04A94] dark:text-[#F76858] text-center w-[35%] ml-4 mnAlata  border-2 rounded-sm border-[#F04A94] dark:border-[#F76858]'
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
                <button className="flex self-end w-5 h-5"> <img src='/img/editar.svg' onClick={() => setIsEnable(true)} /> </button>

            </div>
        </div >
    )
}
