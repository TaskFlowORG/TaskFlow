import { Message } from "./Message";

export class ChatGetDTO {

    id: Number;
    picture: String;
    quantitityUnvisualized: Number;
    lastMessage: Message;
    name: String;

    constructor(id: Number, picture: String, quantitityUnvisualized: Number, lastMessage: Message, name: String) {
        this.id = id;
        this.picture = picture;
        this.quantitityUnvisualized = quantitityUnvisualized;
        this.lastMessage = lastMessage;
        this.name = name;
    }
}