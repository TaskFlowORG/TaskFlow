import { Message } from "./Message";

export class ChatGetDTO {

    id: number;
    name: string;
    picture: string;
    messages: Array<Message>;
    quantitityUnvisualized: number;
    lastMessage: Message;

    constructor(id: number, name: string, picture: string, messages: Array<Message>, quantitityUnvisualized: number, lastMessage: Message) {
        this.id = id;
        this.name = name;
        this.picture = picture;
        this.messages = messages;
        this.quantitityUnvisualized = quantitityUnvisualized;
        this.lastMessage = lastMessage;
    }
    
}