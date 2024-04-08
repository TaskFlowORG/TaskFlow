 
import { Message } from "../message/Message";
import { TypeOfChat } from "@/models/enums/TypeOfChat";
import { Archive } from "@/models/others/Archive";

export abstract class Chat {

    constructor(
        public id: number,
        public messages: Message[],
        public type: TypeOfChat,
        public lastMessage: Message,
        public quantityUnvisualized: number,
        public name: string,
        public picture: Archive) { }

    equals(obj: any): boolean {
        return obj instanceof Chat
            && obj.id === this.id
    }
}