 
import { Chat } from "../chat/Chat";
import { Message } from "../message/Message";
import { TypeOfChat } from "@/models/enums/TypeOfChat";
import { OtherUser } from "@/models/user/user/OtherUser";
import { Archive } from "@/models/others/Archive";

export class ChatPrivate extends Chat {

        constructor(
        public id: number,
        public messages: Message[],
        public type: TypeOfChat,
        public lastMessage: Message,
        public quantityUnvisualized: number,
        public name: string,
        public picture: Archive,
        public users: OtherUser[]) {
            super(id, messages, type, lastMessage, quantityUnvisualized, name, picture);
        }
    equals(obj: any): boolean {
        if (obj instanceof ChatPrivate) {
            return obj.id === this.id;
        }
        return false;
    }
}