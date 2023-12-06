import { User } from "../User";
import { Chat } from "./Chat";

export class Message {

    id: Number  ;
    value: String ;
    user: User ;
    dateTime: Date;
    visualized: Boolean;

    constructor(id: Number, value: String, user: User, dateTime: Date, visualized: Boolean) {
        this.id = id;
        this.value = value;
        this.user = user;
        this.dateTime = dateTime;
        this.visualized = visualized;
    }



}