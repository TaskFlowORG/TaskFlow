import { AllArgsConstructor } from "@/utils";
import { ChatGet } from "../chat/ChatGetDTO";
import { MessageGet } from "../message/MessageGetDTO";
import { SimpleUserGet } from "@/models/user/user/SimpleUserGetDTO";
import { TypeOfChat } from "@/models/enums/TypeOfChat";

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