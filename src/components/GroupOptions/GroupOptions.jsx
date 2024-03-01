import { putData } from "@/services/http/api";
import { useTheme } from "next-themes";
export const GroupOptions = ({ isOpen, group, user }) => {
    const { theme, setTheme } = useTheme();

    async function deleteUser() {
            const updatedUsers = group.users.filter(u => u.username !== user.username);

            group.users = updatedUsers;
            console.log("lista", updatedUsers)
            await putData("group", group)
    }

    const profile = theme === "dark" ? <img src="/img/userOrange.svg"/> : <img src="/img/userPink.svg/"/>
    const chat = theme === "dark" ? <img src="/img/chatIconD.svg"/> : <img src="/img/chatIconL.svg/"/>
    const deleteIcon = theme === "dark" ? <img src="/img/deleteUserD.svg"/> : <img src="/img/deleteUserL.svg/"/>

    if (isOpen) {
        return <div className="flex bg-[#F2F2F2] text-[#333333] dark:bg-[#333] dark:text-[#FCFCFC] w-28 h-24 shadow-md ml-4">
            <div className="flex flex-col justify-around">
                <div className="flex justify-start gap-3 mn">
                    {/* Descobrir como faz para colocar as rotas dentro do OnClick  */}
                    <button>
                        {profile}
                    </button>
                    Perfil
                </div>
                <div className="flex justify-start gap-3 mn">
                    {chat}
                    Iniciar chat
                </div>
                <div className="flex justify-start gap-3 mn">
                    {deleteIcon}
                    Remover
                </div>
            </div>
        </div>
    } else {
        return null;
    }
}