 
import { Chat } from "../chat/Chat";
import { Group } from "@/models/user/group/Group";
import { TypeOfChat } from "@/models/enums/TypeOfChat";
import { Message } from "../message/Message";
import { Archive } from "@/models/others/Archive";
import { User } from "next-auth";


export class ChatGroup extends Chat {

    constructor(
        public id: number,
        public messages: Message[],
        public type: TypeOfChat,
        public lastMessage: Message,
        public quantityUnvisualized: number,
        public name: string,
        public picture: Archive,
        public group: Group) {
        super(id, messages, type, lastMessage, quantityUnvisualized, name, picture);
    }
    equals(obj: any): boolean {
        if (obj instanceof ChatGroup) {
            return obj.group.id === this.group.id;
        }
        return false;
    }

}