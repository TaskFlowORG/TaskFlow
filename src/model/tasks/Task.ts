import { Message } from "../chat/Message";
import { Log } from "./Log";

export class Task{
    id: Number;
    name: String;
    multiProperties: Array<Multivalued>;
    uniProperties: Array<Univalued>;
    userProperties: Array<UserValue>;
    pages: Array<TaskPage>;
    deleted: boolean;
    logs: Array<Log>;
    comments: Array<Message>;
    
    constructor(id: Number, name: String, multiProperties: Array<Multivalued>, uniProperties: Array<Univalued>, userProperties: Array<UserValue>, pages: Array<TaskPage>, deleted: boolean, logs: Array<Log>, comments: Array<Message>) {
        this.id = id;
        this.name = name;
        this.multiProperties = multiProperties;
        this.uniProperties = uniProperties;
        this.userProperties = userProperties;
        this.pages = pages;
        this.deleted = deleted;
        this.logs = logs;
        this.comments = comments;
    }
}