import { AllArgsConstructor } from "@/utils";
import { Message } from "react-hook-form";
import { Chat } from "../chat/Chat";
import { GroupGet } from "@/model/user/group/GroupGetDTO";
import { TypeOfChat } from "@/model/enums/TypeOfChat";


@AllArgsConstructor
export class ChatGroupGet extends Chat {
    group!: GroupGet;
    
    constructor(id: number, messages: Message[], type: TypeOfChat, lastMessage: Message, group: GroupGet) {
        super(id, messages, type, lastMessage);
        this.group = group;
    }

    equals(obj: any): boolean {
        if (obj instanceof ChatGroupGet) {
            return obj.group.id === this.group.id;
        }
        return false;
    }
}