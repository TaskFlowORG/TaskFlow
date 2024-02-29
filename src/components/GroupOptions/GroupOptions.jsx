import { putData } from "@/services/http/api";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react"

export const GroupOptions = ({ isOpen, group, user }) => {

    async function deleteUser() {
            const updatedUsers = group.users.filter(u => u.username !== user.username);

            group.users = updatedUsers;
            console.log("lista", updatedUsers)
            await putData("group", group)
    }


    if (isOpen) {
        return <div className="flex bg-[#F2F2F2] w-28 h-24 shadow-md ml-4">
            <div className="flex flex-col justify-around">
                <div className="flex justify-start gap-3 mn">
                    {/* Descobrir como faz para colocar as rotas dentro do OnClick  */}
                    <button>
                        <img src="/img/userPink.svg" />
                    </button>
                    Perfil
                </div>
                <div className="flex justify-start gap-3 mn">
                    <button><img src="/img/chatIcon.svg" /></button>
                    Iniciar chat
                </div>
                <div className="flex justify-start gap-3 mn">
                    <button onClick={deleteUser}><img src="/img/deleteUser.svg" /></button>
                    Remover
                </div>
            </div>
        </div>
    } else {
        return null;
    }
}