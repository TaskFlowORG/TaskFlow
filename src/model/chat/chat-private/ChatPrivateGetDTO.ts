import { AllArgsConstructor } from "@/utils";
import { Message } from "react-hook-form";
import { Chat } from "../chat/Chat";
import { ChatGet } from "../chat/ChatGetDTO";
import { MessageGet } from "../message/MessageGetDTO";
import { SimpleUserGet } from "@/model/user/user/SimpleUserGetDTO";
import { TypeOfChat } from "@/model/enums/TypeOfChat";

@AllArgsConstructor
export class ChatPrivateGet extends ChatGet {
    users!: SimpleUserGet[]; // Adicionado o operador "!"

    constructor(id: number, messages: MessageGet[], type: TypeOfChat, lastMessage: MessageGet, 
        quantityUnvisualized: number, name: string, picture: string, users: SimpleUserGet[]) {
        super(id, messages, type, lastMessage, quantityUnvisualized, name, picture);
    }

    equals(obj: any): boolean {
        if (obj instanceof ChatPrivateGet) {
            return obj.id === this.id;
        }
        return false;
    }
}