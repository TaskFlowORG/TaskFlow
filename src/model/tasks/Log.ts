import { Action } from "../enums/Action";
import { User } from "../User";


export  class Log {

    id: Number;
    description: String;
    action: Action;
    user: User;
    datetime: LocalDateTime;

    constructor(id: Number, description: String, action: Action, user: User, datetime: LocalDateTime) {
        this.id = id;
        this.description = description;
        this.action = action;
        this.user = user;
        this.datetime = datetime;
    }
}


