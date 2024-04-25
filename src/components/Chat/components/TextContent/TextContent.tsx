import { If } from "@/components/If"
import { UserContext } from "@/contexts/UserContext";
import { Chat, Message } from "@/models"
import { useContext } from "react"
export const TextContent = ({ message }: { message: Message }) => {
    const currentDate = new Date();
    const messageDate = new Date(message.dateCreate);
    const daysDifference = Math.floor((currentDate.getTime() - messageDate.getTime()) / (1000 * 3600 * 24)); // Calcula a diferença em dias
    const date = daysDifference > 1 ? `${daysDifference} dias atrás` : messageDate.toLocaleDateString(); // Exibe a data em dias se for maior que 1, caso contrário, mostra a data normalmente
    const hour = messageDate.toLocaleTimeString().slice(0, 5);
    const { user } = useContext(UserContext);

    return (
        <>
            <If condition={message.sender.id === user?.id}>
                <div className="flex flex-row-reverse text-white p py-5 ">
                    <div className=" bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 w-5 h-5 rounded-br-[100%]">
                    </div>
                    <div className="bg-gradient-to-r from-pink-500 via-purple-500 to-indigo-500 p-[10px] h-fit w-fit max-w-[30rem] min-w-[3rem] rounded-b-lg rounded-tl-lg ">
                        <p className="break-all max-w-[30rem]">{message.value}</p>
                    </div>
                    <p>{hour}</p>
                </div>
            </If>
            <If condition={message.sender.id !== user?.id}>
                <div className="flex items-end py-5">
                    <div className="flex text-black p ">
                        <div className="bg-[#E9E7E7] w-5 h-5 rounded-bl-[100%]">
                        </div>
                        <div className="bg-[#E9E7E7] p-[10px] h-fit w-fit max-w-[30rem] min-w-[3rem] rounded-b-lg rounded-tr-lg ">
                            <p className="break-all max-w-[30rem]">{message.value}</p>
                        </div>

                    </div>
                    <div className=" pl-2">
                        <p>{hour}</p>
                    </div>
                </div>
            </If>
        </>
    )
}
