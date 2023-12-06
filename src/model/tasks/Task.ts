import { Message } from "../chat/Message";
import { TaskValue } from "../relations/TaskValue";
import { Log } from "./Log";

export class Task{
    id: Number;
    name: String;

    deleted: boolean;
    completed: boolean;
    completedDate: Date;
    properties: Array<TaskValue>;
    logs: Array<Log>;
    comments: Array<Message>;
    
    constructor(id: Number, name: String, deleted: boolean, completed: boolean, completedDate: Date, properties: Array<TaskValue>, logs: Array<Log>, comments: Array<Message>) {
        this.id = id;
        this.name = name;
        this.deleted = deleted;
        this.completed = completed;
        this.completedDate = completedDate;
        this.properties = properties;
        this.logs = logs;
        this.comments = comments;
    }
}