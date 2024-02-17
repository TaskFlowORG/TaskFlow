import { Message } from "../chat/Message";
import { TaskValue } from "../relations/TaskValue";
import { Log } from "./Log";

export class Task{

    id: null | number;
    name: null| string;
    deleted: null| boolean;
    completed: null| boolean;
    completedDate: null| Date;
    properties:  Array<TaskValue>;
    logs: null| Array<Log>;
    comments: null| Array<Message>;
    
    constructor(id: null | number, name: null | string, deleted: null | boolean, completed: null | boolean, completedDate: null | Date, properties: Array<TaskValue>, logs: null | Array<Log>, comments: null | Array<Message>) {

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