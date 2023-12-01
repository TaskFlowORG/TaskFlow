import { Task } from "@/model/tasks/Task";
import { User } from "@/model/User";
import { Property } from "../Property";

export class UserValue {
    taskId: Number;
    propertyId: Number;
    value: Array<User>;
    task: Task;
    property: Property

    constructor(taskId: Number, propertyId: Number,  value: Array<User>, task: Task, property: Property) {
        this.taskId = taskId;
        this.propertyId = propertyId;
        this.value = value;
        this.task = task;
        this.property = property;
    }
}