import { User } from "../User";
import { Chat } from "./Chat";

export class Message {

    id: Number ;
    value: String ;
    chat: Chat ;
    user: User ;
    dateTime: Date;
    visualized: boolean;

    constructor(id: Number, value: String, chat: Chat, user: User, dateTime: Date, visualized: boolean) {
        this.id = id;
        this.value = value;
        this.chat = chat;
        this.user = user;
        this.dateTime = dateTime;
        this.visualized = visualized;
    }



}