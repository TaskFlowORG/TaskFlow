import { AllArgsConstructor } from "@/utils";
import { MessageGet } from "../message/MessageGetDTO";
import { TypeOfChat } from "@/models/enums/TypeOfChat";
import { Archive } from "@/models/others/Archive";

@AllArgsConstructor
export abstract class ChatGet {
    id!: number;
    messages!: MessageGet[];
    type!: TypeOfChat;
    lastMessage?: MessageGet;
    quantityUnvisualized!: number;
    name!: string;
    picture!: Archive;

    constructor(id: number, messages: MessageGet[], type: TypeOfChat, lastMessage: MessageGet, 
        quantityUnvisualized: number, name: string, picture: string) {}

    equals(obj: any): boolean {
        return obj instanceof ChatGet
            && obj.id === this.id
        }
}