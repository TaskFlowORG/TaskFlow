import { AllArgsConstructor } from "@/utils";
import { TypeOfChat } from "../enums/TypeOfChat";
import { Message } from "./Message";

@AllArgsConstructor
export abstract class Chat {
    id!: number;
    messages!: Message[];
    type!: TypeOfChat;
    lastMessage?: Message;

    constructor(id: number, messages: Message[], type: TypeOfChat, lastMessage: Message) {
    }

    equals(obj: any): boolean {
        return obj instanceof Chat && obj.id === this.id;
    }
}
