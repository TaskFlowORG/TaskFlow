import React, { useState, useEffect } from 'react';
import { getListData, putData } from '@/services/http/api';

export const GroupAccess = ({ name, description, project, group }) => {
    const [permissions, setPermissions] = useState([]);
    const [selectedPermission, setSelectedPermission] = useState("");

    useEffect(() => {
        const getLists = async () => {
            const fetchedPermissions = await getListData("permission");
            setPermissions(fetchedPermissions);
        };
        getLists();
    }, [group]);

    const findPermission = (selectedValue) => {
        setSelectedPermission(selectedValue);
        updatePermission(selectedValue);
    };

    async function updatePermission(selectedValue) {
        try {
            const selectedPermission = permissions.find(permission => permission.name === selectedValue);
            if (!selectedPermission) {
                throw new Error('Permissão selecionada não encontrada.');
            }
            console.log('ID da permissão selecionada:', selectedPermission.id);
            group.permissions = [...group.permissions, selectedPermission];
            await putData("group", group);
            setSelectedPermission("");
            alert('Permissão atualizada com sucesso!');
        } catch (error) {
            console.error('Erro ao atualizar permissão:', error.message);
            alert('Não foi possível atualizar a permissão do grupo.');
        }
    }

    return (
        <div className="flex lg:gap-4 gap-8 items-start">
            <img className="py-4" src="/img/EllipseTest.svg" />
            <div className="flex flex-col gap-10">
                <div className="flex flex-col gap-4">
                    <h3 className="pAlata text-[#333] dark:text-[#FCFCFC]">{name}</h3>
                    <p className="mn whitespace-pre-wrap w-[403px] text-[#333] dark:invert">{description}</p>
                </div>
                <div className="flex justify-center lg:justify-end md:justify-end">
                    <select
                        className='selectGroup w-[75%] mnAlata border-none dark:text-[#F76858] '
                        name="permission"
                        id="permission"
                        value={selectedPermission}
                        onChange={(e) => findPermission(e.target.value)}
                    >
                        <option value="" disabled>Permissão</option>
                        {permissions.map(permission => {
                            if (permission.project.id === project.id) {
                                return (
                                    <option key={permission.name} value={permission.name}>
                                        {permission.name}
                                    </option>
                                );
                            } else {
                                return null;
                            }
                        })}
                    </select>
                </div>

            </div>
        </div>
    )
}