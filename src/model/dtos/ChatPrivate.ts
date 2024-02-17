import { AllArgsConstructor } from "@/utils";
import { Chat } from "./Chat";
import { User } from "../User";
import { Message } from "./Message";
import { TypeOfChat } from "../enums/TypeOfChat";

@AllArgsConstructor
export class ChatPrivate extends Chat {
    users!: User[]; // Adicionado o operador "!"

    constructor(id: number, messages: Message[], type: TypeOfChat, lastMessage: Message, users: User[]) {
        super(id, messages, type, lastMessage);
    }

    equals(obj: any): boolean {
        if (obj instanceof ChatPrivate) {
            return obj.id === this.id;
        }
        return false;
    }
}