import { AllArgsConstructor } from "@/utils";
import { Group } from "../Group";
import { Message } from "./Message";
import { TypeOfChat } from "../enums/TypeOfChat";
import { Chat } from "./Chat";

@AllArgsConstructor
export class ChatGroup extends Chat {
    group!: Group;
    
    constructor(id: number, messages: Message[], type: TypeOfChat, lastMessage: Message, group: Group) {
        super(id, messages, type, lastMessage);
    }

    equals(obj: any): boolean {
        if (obj instanceof ChatGroup) {
            return obj.group.id === this.group.id;
        }
        return false;
    }
}