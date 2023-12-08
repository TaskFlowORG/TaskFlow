import { Message } from "./Message";

export class ChatGetDTO {

    id: number;
    name: String;
    picture: String;
    messages: Array<Message>;
    quantitityUnvisualized: Number;
    lastMessage: Message;

    constructor(id: number, name: String, picture: String, messages: Array<Message>, quantitityUnvisualized: Number, lastMessage: Message) {
        this.id = id;
        this.name = name;
        this.picture = picture;
        this.messages = messages;
        this.quantitityUnvisualized = quantitityUnvisualized;
        this.lastMessage = lastMessage;
    }
    
}