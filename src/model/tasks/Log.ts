import { Action } from "../enums/Action";
import { User } from "../User";


export  class Log {

    id: number;
    description: string;
    action: Action;
    user: User;
    datetime: Date;

    constructor(id: number, description: string, action: Action, user: User, datetime: Date) {
        this.id = id;
        this.description = description;
        this.action = action;
        this.user = user;
        this.datetime = datetime;
    }
}


