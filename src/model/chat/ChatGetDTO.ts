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
        this.lastMessage = new Message(lastMessage.id, lastMessage.value, lastMessage.chat, lastMessage.user, new Date(lastMessage.dateTime), lastMessage.visualized);
        this.name = name;
    }
}