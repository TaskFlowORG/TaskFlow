import { Task } from "@/model/tasks/Task";
import { Property } from "../Property";

export class Multivalued {
    taskId: Number;
    propertyId: Number;
    value: Array<String>;
    task: Task;
    property: Property

    constructor(taskId: Number, propertyId: Number,  value: Array<String>, task: Task, property: Property) {
        this.taskId = taskId;
        this.propertyId = propertyId;
        this.value = value;
        this.task = task;
        this.property = property;
    }
}