import { User } from "../User";
import { Chat } from "./Chat";

export class Message {


    id: number;
    value: String ;
    user: User ;
    dateTime: Date;
    visualized: Boolean;

    constructor(id: number, value: String, user: User, dateTime: string, visualized: boolean) {
        this.id = id;
        this.value = value;
        this.user = user;
        this.dateTime = new Date(dateTime);
        this.visualized = visualized;
    }



}