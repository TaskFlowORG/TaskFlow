import { Task } from "@/model/tasks/Task";
import { Property } from "../Property";

export class Univalued {
    taskId: Number;
    propertyId: Number;
    value: String;
    task: Task;
    property: Property

    constructor(taskId: Number, propertyId: Number,  value: String, task: Task, property: Property) {
        this.taskId = taskId;
        this.propertyId = propertyId;
        this.value = value;
        this.task = task;
        this.property = property;
    }
}