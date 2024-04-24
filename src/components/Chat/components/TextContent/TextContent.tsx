import { Chat, Message } from "@/models"
import { chatService } from "@/services"
import { useEffect, useState } from "react"

export const TextContent = ({message}:{message:Message}) => {


    return (
        <div className="flex">
            <div className="bg-[#E9E7E7] w-5 h-5 rounded-bl-[100%]">
            </div>
            <div className="bg-[#E9E7E7] p-[10px] w-[100%] max-w-[250px] rounded-b-lg rounded-tr-lg">
                {message.value}
            </div>
        </div>
    )
}