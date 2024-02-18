import { AllArgsConstructor } from "@/utils";
import { Message } from "react-hook-form";
import { Chat } from "../chat/Chat";
import { UserGet } from "@/model/user/user/UserGetDTO";

@AllArgsConstructor
export class ChatPrivatePost {
    users!: UserGet[]; // Adicionado o operador "!"
    
    constructor(users: UserGet[]) {}

}