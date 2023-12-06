import { User } from "../User";
import { Chat } from "./Chat";

export class Message {

    id: Number ;
    value: String ;
    user: User ;
    dateTime: Date;
    visualized: boolean;

    constructor(id: Number, value: String, user: User, dateTime: string, visualized: boolean) {
        this.id = id;
        this.value = value;
        this.user = user;
        this.dateTime = new Date(dateTime);
        this.visualized = visualized;
    }



}