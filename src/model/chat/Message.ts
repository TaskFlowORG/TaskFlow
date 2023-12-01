import { Chat } from "./Chat";

export class Message {

    id: Number | undefined;
    value: String | undefined;
    chat: Chat | undefined;
    user: User | undefined;
    dateTime: LocalDateTime;
    visualized: boolean;

    constructor(id: Number, value: String, chat: Chat, user: User, dateTime: LocalDateTime, visualized: boolean) {
        this.id = id;
        this.value = value;
        this.chat = chat;
        this.user = user;
        this.dateTime = dateTime;
        this.visualized = visualized;
    }



}