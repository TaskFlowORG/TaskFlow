import { If } from "@/components/If"
import { UserContext } from "@/contexts/UserContext";
import { Message } from "@/models"
import { useContext } from "react"

export const TextContent = ({ message }: { message: Message }) => {
    const { user } = useContext(UserContext);

    const en = () =>{
        console.log(message.sender.id)
    }

    return (
        <>
            <If condition={message.sender.id == user?.id}>
                <div  className="flex flex-row-reverse text-white p">
                    <div className=" bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 w-5 h-5 rounded-br-[100%]">
                    </div>
                    <div className="bg-gradient-to-r from-pink-500 via-purple-500 to-indigo-500 p-[10px] h-fit w-fit max-w-[30rem] min-w-[3rem] rounded-b-lg rounded-tl-lg ">
                        <p className="break-all max-w-[30rem]">{message.value}</p>
                    </div>
                </div>
            </If>
            <If condition={message.sender.id != user?.id}>
                <div onClick={en} className="flex text-black p">
                    <div className="bg-[#E9E7E7] w-5 h-5 rounded-bl-[100%]">
                    </div>
                    <div className="bg-[#E9E7E7] p-[10px] h-fit w-fit max-w-[30rem] min-w-[3rem] rounded-b-lg rounded-tr-lg ">
                        <p className="break-all max-w-[30rem]">{message.value}</p>
                    </div>
                </div>
            </If>


        </>
    )
}