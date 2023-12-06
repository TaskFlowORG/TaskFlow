"use client"
import { getData, putData } from "@/services/http/api";
import { useEffect, useState } from "react"

export const UsersGroupList = ({ userId }) => {
    const [user, setUser] = useState({});
    const [permission, setPermission] = useState('');


    useEffect(() => {
        const getUser = async () => {
            const fetchedUser = await getData("user", userId);
            setUser(fetchedUser)
        }
        getUser();
    }, []);

    const handlePermissionChange = (event) => {
        const newPermission = event.target.value;
        setPermission(newPermission);
        updatePermission()

        console.log('Permissão selecionada:', newPermission);
    };

    async function updatePermission(){
        user.permission= "'"+permission + "'"
        await putData('user-group', user);
            alert('Usuário adicionado com sucesso');
    }

    function mostrarId() {
        console.log(userId)
    }

    return (
        <div>
            <div className="">
                <div className="border rounded-md border-[#F04A94] relative px-4 pr-6 bg-[#FCFCFC]  dark:bg-[#3C3C3C] dark:border-[#F76858] h-12 flex items-center justify-between">
                    <div className="flex gap-6">
                        <img className="" src="/img/User.svg" />
                        <p className="whitespace-nowrap dark:text-[#FCFCFC] text-black ">{user.name}</p>
                    </div>
                    <div className="text-[#F04A94] dark:text-[#F76858] w-[120px] flex justify-between ">
                        <p>|</p>
                        <select
                            className='selectGroup mnAlata border-[#F04A94]'
                            name="permission"
                            id="permission"
                            value={permission}
                            onChange={handlePermissionChange}
                        >
                            <option value="" disabled selected>Permissão</option>
                            <option value="CREATE">Adicionar</option>
                            <option value="DELETE">Remover</option>
                            <option value="UPDATE,">Editar</option>
                            <option value=" READ">Ler</option>
                        </select>
                    </div>
                </div>
            </div>
        </div>
    );
};