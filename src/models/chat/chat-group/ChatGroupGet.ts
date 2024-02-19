import { AllArgsConstructor } from "@/utils";
import { ChatGet } from "../chat/ChatGetDTO";
import { GroupGet } from "@/models/user/group/GroupGetDTO";
import { TypeOfChat } from "@/models/enums/TypeOfChat";
import { MessageGet } from "../message/MessageGetDTO";


@AllArgsConstructor
export class ChatGroupGet extends ChatGet {
    group!: GroupGet;

    constructor(id: number, messages: MessageGet[], type: TypeOfChat, lastMessage: MessageGet, 
        quantityUnvisualized: number, name: string, picture: string, group:GroupGet) {
            super(id, messages, type, lastMessage, quantityUnvisualized, name, picture);
        }

    equals(obj: any): boolean {
        if (obj instanceof ChatGroupGet) {
            return obj.group.id === this.group.id;
        }
        return false;
    }
}