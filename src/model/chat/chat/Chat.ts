import { TypeOfChat } from "@/model/enums/TypeOfChat";
import { AllArgsConstructor } from "@/utils";
import { Message } from "react-hook-form";

@AllArgsConstructor
export abstract class Chat {
    id!: number;
    messages!: Message[];
    type!: TypeOfChat;
    lastMessage?: Message;

    constructor(id: number, messages: Message[], type: TypeOfChat, lastMessage: Message) {}


    equals(obj: any): boolean {
        return obj instanceof Chat && obj.id === this.id;
    }
}
